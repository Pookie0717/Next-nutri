"use client"
import { useEffect, useState, useRef } from 'react';
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Link from "next/link";
import TableTwo from '@/components/Tables/TableTwo';
import { Record } from '@/types/customers';
import agent from '@/api/agent';

const Customers = () => {
  const [records, setRecords] = useState<Record[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [itemsPerPage] = useState<number>(2);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const recordsFetchedRef = useRef<boolean>(false);

  const url = window.location.href; // Get the current page URL
  const pageName: any = url.split('/').pop();

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };
  
  // Fetch records only when page changes and make sure it’s not being called twice
  useEffect(() => {
        
    if (loading || recordsFetchedRef.current) {
        console.warn("Fetch already in progress, skipping...");
        return;
    }
    const response = fetchRecords(currentPage);
    console.log(response);
    }, [currentPage, pageName]); // Fetch records on currentPage or jsonFileName change

  const fetchRecords = async (page: number) => {
    if (loading || recordsFetchedRef.current) {
        console.warn("Fetch already in progress, skipping...");
        return;
    }

    recordsFetchedRef.current = true;
    try {
        console.log("Starting fetchRecords for page:", page);
        setLoading(true);
        const response = await agent.Entities.listAll(pageName, page, itemsPerPage);
        setRecords(response.data.records || []);
        setTotalPages(Math.ceil(response.data.totalRecords / itemsPerPage));
        console.log("Records fetched successfully:", response.data.records);
    } catch (error) {
        console.error('Error fetching records:', error);
        setRecords([]);
    } finally {
        setLoading(false);
        recordsFetchedRef.current = false;
    }
};
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Customers" />
            <div className="flex flex-row gap-10 w-full">
                <div className='w-2/3'>
                    <TableTwo />
                </div>
                <div className='w-1/3 gap-4'>
                    <h2 className='text-2xl mb-3'>Personal Information</h2>
                    <div className='flex justify-between'>
                        <div className='inline-block'>
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white ">Name</label>
                            <input
                            type="text"
                            placeholder="John Doe"
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>
                        <div className='inline-block'>
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white ">Email</label>
                            <input
                            type="email"
                            placeholder="pookiemoney717@gmail.com"
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>
                    </div>
                    <h3 className='text-2xl mt-5 mb-3'>Preferences</h3>
                    <div className='flex'>
                        <select
                            value={selectedOption}
                            onChange={(e) => {
                                setSelectedOption(e.target.value);
                                changeTextColor();
                            }}
                            className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-3 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${
                                isOptionSelected ? "text-black dark:text-white" : ""
                            }`}
                        >
                            <option value="" disabled className="text-body dark:text-bodydark">
                                Select Language
                            </option>
                            <option value="english" className="text-body dark:text-bodydark">
                                English
                            </option>
                            <option value="spanish" className="text-body dark:text-bodydark">
                                Spanish
                            </option>
                        </select>
                    </div>
                    <h3 className='text-2xl mt-5 mb-3'>Additional Info</h3>
                    <div className=''>
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">City</label>
                        <input
                        type="email"
                        placeholder=""
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                    </div>
                    <div className="px-2 py-6 md:px-4 xl:px-6.5 flex justify-end">
                        <button
                        className="inline-flex items-center justify-center bg-primary px-5 py-2 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10 rounded-xl"
                        >
                        Submit
                        </button>
                    </div>
              </div>
            </div>
        </DefaultLayout>
    );
};

export default Customers;

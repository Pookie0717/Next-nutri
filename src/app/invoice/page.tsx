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

const Invoice = () => {
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
            <iframe src="https://react-invoice-generator-a1mi.vercel.app/" className='w-full h-full'></iframe>
        </DefaultLayout>
    );
};

export default Invoice;

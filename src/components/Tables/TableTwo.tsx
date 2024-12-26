import Image from "next/image";
import { Customers } from "@/types/customers";

const cuatomerData: Customers[] = [
  {
    image: "/images/product/product-01.png",
    name: "Apple Watch Series 7",
    email: "Electronics",
    preferredName: "Pookie",
  },
  {
    image: "/images/product/product-02.png",
    name: "Macbook Pro M1",
    email: "Electronics",
    preferredName: "Pookie",
  },
  {
    image: "/images/product/product-03.png",
    name: "Dell Inspiron 15",
    email: "Electronics",
    preferredName: "Pookie",
  },
  {
    image: "/images/product/product-04.png",
    name: "HP Probook 450",
    email: "Electronics",
    preferredName: "Pookie",
  },
];

const TableTwo = () => {
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ">
      <div className="px-4 py-6 md:px-6 xl:px-7.5 flex justify-end">
        <button
          className="inline-flex items-center justify-center bg-primary px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          Create New Record
        </button>
      </div>
      
      <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        {/* <div className="col-span-3 flex items-center">
          <p className="font-medium">Product Name</p>
        </div> */}
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="font-medium">Name</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Email</p>
        </div>
        <div className="col-span-2 flex items-center">
          <p className="font-medium">Preferred Language</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">City</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Actions</p>
        </div>
      </div>

      {cuatomerData.map((customer, key) => (
        <div
          className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={key}
        >
          <div className="col-span-2 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="h-12.5 w-15 rounded-md">
                <Image
                  src={customer.image}
                  width={60}
                  height={50}
                  alt="Product"
                />
              </div>
              <p className="text-sm text-black dark:text-white">
                {customer.name}
              </p>
            </div>
          </div>
          <div className="col-span-1 hidden items-center sm:flex">
            <p className="text-sm text-black dark:text-white">
              {customer.email}
            </p>
          </div>
          <div className="col-span-2 flex items-center">
            <p className="text-sm text-black dark:text-white">
              ${customer.preferredName}
            </p>
          </div>
          {/* <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">{product.sold}</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-meta-3">${product.profit}</p>
          </div> */}
        </div>
      ))}
    </div>
  );
};

export default TableTwo;

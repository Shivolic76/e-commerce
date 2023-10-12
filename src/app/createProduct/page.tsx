"use client";
import React, { useState } from "react";
import { createProduct } from "@/redux/slices/productSlice";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

export default function ProductCreate() {
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();
  const route = useRouter();

  const [newProduct, setNewProduct] = useState({
    title: "",
    category: "",
    description: "",
    price: "",
  });

  const [createStatus, setCreateStatus] = useState({
    isLoading: false,
    isSuccess: false,
    isError: false,
  });

  const handleCreateClick = async () => {
    setCreateStatus({ isLoading: true, isSuccess: false, isError: false });
    try {
      await dispatch(createProduct({ productData: newProduct }));
      setCreateStatus({ isLoading: false, isSuccess: true, isError: false });
      setShowToast(true);
    } catch (error) {
      setCreateStatus({ isLoading: false, isSuccess: false, isError: true });
    }
    setTimeout(() => {
      setShowToast(false);
      route.push("/");
    }, 2000);
  };

  return (
    <div className="container mx-auto p-8 mt-20">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-6 py-4">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            Create New Product
          </h1>
          <p className="text-gray-700 text-xl mb-4">
            Title:
            <input
              type="text"
              value={newProduct.title}
              onChange={(e) =>
                setNewProduct({ ...newProduct, title: e.target.value })
              }
              className="border rounded-md py-2 px-3 w-full focus:outline-none focus:border-blue-500"
            />
          </p>
          <p className="text-gray-700 text-xl mb-4">
            Category:
            <input
              type="text"
              value={newProduct.category}
              onChange={(e) =>
                setNewProduct({ ...newProduct, category: e.target.value })
              }
              className="border rounded-md py-2 px-3 w-full focus:outline-none focus:border-blue-500"
            />
          </p>
          <p className="text-gray-700 text-xl mb-4">
            Description:
            <textarea
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct({ ...newProduct, description: e.target.value })
              }
              className="border rounded-md py-2 px-3 w-full h-32 focus:outline-none focus:border-blue-500 resize-y"
            />
          </p>
          <p className="text-2xl text-indigo-600 mb-4">
            Price:
            <input
              type="text"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
              className="border rounded-md py-2 px-3 w-full focus:outline-none focus:border-blue-500"
            />
          </p>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleCreateClick}
          >
            {createStatus.isLoading
              ? "Creating..."
              : createStatus.isSuccess
              ? "Created"
              : createStatus.isError
              ? "Error"
              : "Create"}
          </button>
        </div>
        {showToast && (
          <div
            id="toast-default"
            className="fixed top-12 right-4 z-50 flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
            role="alert"
          >
            <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-blue-500 bg-blue-100 rounded-lg dark:bg-blue-800 dark:text-blue-200">
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15.147 15.085a7.159 7.159 0 0 1-6.189 3.307A6.713 6.713 0 0 1 3.1 15.444c-2.679-4.513.287-8.737.888-9.548A4.373 4.373 0 0 0 5 1.608c1.287.953 6.445 3.218 5.537 10.5 1.5-1.122 2.706-3.01 2.853-6.14 1.433 1.049 3.993 5.395 1.757 9.117Z"
                />
              </svg>
              <span className="sr-only">Fire icon</span>
            </div>
            <div className="ml-3 text-sm font-normal">
              Product is successfully Created
            </div>
            <button
              type="button"
              className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
              data-dismiss-target="#toast-default"
              aria-label="Close"
            >
              <span className="sr-only">Close</span>
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

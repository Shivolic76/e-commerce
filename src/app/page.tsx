"use client";
import React, { useEffect, useState } from "react";
import {
  categoryProduct,
  fetchContent,
  getProductCategory,
  sortingProduct,
} from "@/redux/slices/productSlice";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "@/components/ProductCard";
import Pagination from "@material-ui/lab/Pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import SubsribeModal from "@/components/SubscribeModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Typography } from "@mui/material";

const sliderImages = [
  "https://images.pexels.com/photos/6214476/pexels-photo-6214476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/6214476/pexels-photo-6214476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/6214476/pexels-photo-6214476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/6214476/pexels-photo-6214476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/6214476/pexels-photo-6214476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/6214476/pexels-photo-6214476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/6214476/pexels-photo-6214476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
];
const Home = () => {
  const dispatch = useDispatch();

  const contents = useSelector((state: any) => state?.products?.contents);
  const productCategories = useSelector(
    (state: any) => state?.products?.productCategory
  );
  const isLoading = useSelector((state: any) => state?.products?.isLoading);
  const order = ["asc", "desc"];
  const [searchQuery, setSearchQuery] = useState("");
  const filteredContents = contents?.filter((product: any) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;
  const totalItems = filteredContents.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const handlePageChange = (event: any, value: any) => {
    setCurrentPage(value);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentItems = filteredContents.slice(startIndex, endIndex);

  const currentCategory = localStorage.getItem("selectedCategory");
  const currentOrder = localStorage.getItem("SelectedOrder");

  const handleCategoryClick = (item: any) => {
    dispatch(categoryProduct(item));
    if (currentCategory === item) {
      localStorage.removeItem("selectedCategory");
    } else {
      localStorage.setItem("selectedCategory", item);
    }
  };

  const handleOrderClick = (item: any) => {
    dispatch(sortingProduct(item));
    if (currentOrder === item) {
      localStorage.removeItem("SelectedOrder");
    } else {
      localStorage.setItem("SelectedOrder", item);
    }
  };

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  const notify = () => {
    toast(
      <div className="flex">
        <div>
          <img
            src="https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c2hvcHBpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
            height="100px"
            width="100px"
          />
        </div>
        <div className="p-1">
          <Typography className="!text-xs text-black text-left !font-semibold">
            Someone in new just bought
          </Typography>
          <Typography className=" !text-sm text-black text-left !font-black">
            Product
          </Typography>
          <Typography className="!text-xs text-black text-left !font-medium">
            2 Minutes ago
          </Typography>
        </div>
      </div>
    );
  };

  useEffect(() => {
    dispatch(fetchContent());
    dispatch(getProductCategory());
    setTimeout(() => {
      setOpen(true);
    }, 10000);

    const notificationInterval = setInterval(notify, 8000);
    return () => {
      clearInterval(notificationInterval);
    };
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-blue-500 border-opacity-60"></div>
      </div>
    );
  }
  return (
    <main className="mt-19">
      <Swiper
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
        loop={true}
      >
        {sliderImages.map((item, index) => (
          <SwiperSlide key={index}>
            <img
              src={item}
              alt={`Slider Image ${index}`}
              width="100%"
              className="h-96"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="m-5 flex flex-wrap md:flex-nowrap px-5 md:px-1 custom_model">
        <div className="max-lg p-2 lg:w-48">
          <div className="mb-2">
            <h2 className="text-lg font-semibold">Categories</h2>
            {productCategories.map((item: any, index: number) => (
              <button
                key={index}
                type="button"
                className={`my-1 px-2 py-1 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white w-full rounded-b-lg ${
                  currentCategory === item ? "border-2 !border-blue-400" : ""
                }`}
                onClick={() => handleCategoryClick(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <div>
            <h2 className="text-lg font-semibold">Sort By</h2>
            {order.map((item: any, index: number) => (
              <button
                key={index}
                type="button"
                className={`my-1 px-2 py-1 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white w-full rounded-b-lg ${
                  currentOrder === item ? "border-2 !border-blue-400" : ""
                }`}
                onClick={() => handleOrderClick(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="md:w-4/2 p-2">
          <div className="mb-2 pl-5 pr-5">
            <input
              type="text"
              placeholder="Search products...."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-2 py-1 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-700 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-2">
            {currentItems?.map((product: any) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
          <Pagination
            className="pagination-custom mt-2"
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
          />
        </div>

        {open && (
          <SubsribeModal
            open={open}
            handleOpen={handleOpen}
            handleClose={handleClose}
          />
        )}
        <ToastContainer position="bottom-left" autoClose={5000} />
      </div>
    </main>
  );
};

export default Home;

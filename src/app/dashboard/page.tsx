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
import TuneIcon from "@mui/icons-material/Tune";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import Pagination from "@material-ui/lab/Pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const sliderImages = [
  "https://images.pexels.com/photos/6214476/pexels-photo-6214476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/6214476/pexels-photo-6214476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/6214476/pexels-photo-6214476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/6214476/pexels-photo-6214476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/6214476/pexels-photo-6214476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/6214476/pexels-photo-6214476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/6214476/pexels-photo-6214476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
];
const DashBoardPage = () => {
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
  const pageSize = 9;
  const totalItems = filteredContents.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  const handlePageChange = (event: any, value: any) => {
    setCurrentPage(value);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const currentItems = filteredContents.slice(startIndex, endIndex);

  useEffect(() => {
    dispatch(fetchContent());
    dispatch(getProductCategory());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-blue-500 border-opacity-60"></div>
      </div>
    );
  }
  return (
    <main className="mt-20">
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
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
      <div className="m-5 flex flex-wrap md:flex-nowrap px-10">
        <div className="md:w-1/4 p-2">
          <div className="mb-2">
            <h2 className="text-lg font-semibold">Categories</h2>
            <button
              type="button"
              className="my-1 px-2 py-1 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white w-full"
              onClick={() => dispatch(fetchContent())}
            >
              All Categories
            </button>
            {productCategories.map((item: any, index: number) => (
              <button
                key={index}
                type="button"
                className={`my-1 px-2 py-1 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white w-full ${
                  index === productCategories.length - 1 ? "rounded-b-lg" : ""
                }`}
                onClick={() => dispatch(categoryProduct(item))}
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
                className={`my-1 px-2 py-1 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white w-full ${
                  index === order.length - 1 ? "rounded-b-lg" : ""
                }`}
                onClick={() => dispatch(sortingProduct(item))}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="md:w-4/2 p-2">
          <div className="mb-2">
            <input
              type="text"
              placeholder="Search products"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-2 py-1 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-700 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
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
      </div>
    </main>
  );
};

export default DashBoardPage;



  //   return (
  //     <main className="mt-20">
  //       <div className="m-5">
  //         <div className="inline-flex rounded-md shadow-sm" role="group">
  //           <button
  //             type="button"
  //             className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
  //             onClick={() => dispatch(fetchContent())}
  //           >
  //             All Categories <TuneIcon className="pl-1" />
  //           </button>
  //           {productCategories.map((item: any, index: number) => (
  //             <button
  //               type="button"
  //               className={`px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white ${
  //                 index === productCategories.length - 1
  //                   ? "border rounded-r-md"
  //                   : "border border-gray-200"
  //               }`}
  //               onClick={() => dispatch(categoryProduct(item))}
  //             >
  //               {item}
  //             </button>
  //           ))}
  //         </div>

  //         <div className="inline-flex rounded-md shadow-sm pl-3" role="group">
  //           <button
  //             type="button"
  //             className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
  //           >
  //             Sort <SortByAlphaIcon className="pl-1" />
  //           </button>
  //           {order.map((item: any, index: number) => (
  //             <button
  //               type="button"
  //               className={`px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white ${
  //                 index === order.length - 1
  //                   ? "border rounded-r-md"
  //                   : "border border-gray-200"
  //               }`}
  //               onClick={() => dispatch(sortingProduct(item))}
  //             >
  //               {item}
  //             </button>
  //           ))}
  //         </div>
  //         <div className="inline-flex rounded-md shadow-sm pl-4" role="group">
  //           {" "}
  //           <input
  //             type="text"
  //             placeholder="Search products"
  //             value={searchQuery}
  //             onChange={(e) => setSearchQuery(e.target.value)}
  //             className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-700 focus:outline-none"
  //           />
  //         </div>
  //       </div>

  //       <Swiper navigation={true} modules={[Navigation]} className="mySwiper" >
  //         {sliderImages.map((item, index) => (
  //           <SwiperSlide>
  //             <img key={index} src={item} width="100%" className="h-72" />
  //           </SwiperSlide>
  //         ))}
  //       </Swiper>
  //       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  //         {currentItems?.map((product: any) => (
  //           <ProductCard key={product.id} {...product} />
  //         ))}
  //       </div>
  //       <Pagination
  //         className="pagination-custom"
  //         count={totalPages}
  //         page={currentPage}
  //         onChange={handlePageChange}
  //       />
  //     </main>
  //   );
  // };
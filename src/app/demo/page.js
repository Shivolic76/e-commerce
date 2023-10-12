"use client";
import { useEffect, useState } from "react";
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
      <div className="m-5">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
            onClick={() => dispatch(fetchContent())}
          >
            All Categories <TuneIcon className="pl-1" />
          </button>
          {productCategories.map((item: any, index: number) => (
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white ${
                index === productCategories.length - 1
                  ? "border rounded-r-md"
                  : "border border-gray-200"
              }`}
              onClick={() => dispatch(categoryProduct(item))}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="inline-flex rounded-md shadow-sm pl-3" role="group">
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
          >
            Sort <SortByAlphaIcon className="pl-1" />
          </button>
          {order.map((item: any, index: number) => (
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white ${
                index === order.length - 1
                  ? "border rounded-r-md"
                  : "border border-gray-200"
              }`}
              onClick={() => dispatch(sortingProduct(item))}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="inline-flex rounded-md shadow-sm pl-4" role="group">
          {" "}
          <input
            type="text"
            placeholder="Search products"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-700 focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* {contents?.map((product: any) => (
          <ProductCard key={product.id} {...product} />
        ))} */}
        {filteredContents?.map((product: any) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </main>
  );
};

export default Home;

"use client";

import { HeartIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useAppSelector } from "../redux/store";
import { useRouter } from "next/navigation";
import { isProductInWishlistSelector } from "@/redux/slices/wishlistSlice";
import { useSelector } from "react-redux";

interface Props {
  className?: string;
}
const WishListBtn = (props: Props) => {
  const totalItems = useSelector((state:any)=>state.wishlist.wishlistItems.length);
  
  const route = useRouter();
  return (
    <div
      className={`${props.className} relative cursor-pointer group group-hover:transition duration-400`}
      onClick={() => route.push("/wishlist")}
    >
      <div className="group-hover:scale-105 transition-transform">
        <HeartIcon className="w-9 text-white-600" />
      </div>
      {!!totalItems && (
        <div
          key={totalItems}
          className="bg-red-500 flex justify-center items-center
        rounded-full w-6 absolute -top-2 -right-2 text-white"
        >
          {totalItems}
        </div>
      )}
    </div>
  );
};

export default WishListBtn;

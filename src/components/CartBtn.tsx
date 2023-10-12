"use client";

import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import React from "react";
import { totalCartItemsSelector } from "../redux/slices/cartSlice";
import { useAppSelector } from "../redux/store";
import { useRouter } from "next/navigation";

interface Props {
  className?: string;
}
const CartBtn = (props: Props) => {
  const totalItems = useAppSelector(totalCartItemsSelector);

  const route = useRouter();
  return (
    <div
      className={`${props.className} relative cursor-pointer group group-hover:transition duration-400`}
      onClick={() => route.push("/cart")}
    >
      <div className="group-hover:scale-105 transition-transform">
        <ShoppingCartIcon className="w-9 text-white-600" />
        
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

export default CartBtn;

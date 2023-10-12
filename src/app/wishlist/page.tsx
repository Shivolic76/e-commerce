"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import WishlistItemCard from "@/components/WishListItemCard";

const WishListPage = () => {
  const route = useRouter();
  const dispatch = useDispatch();
  const wishListItems = useSelector(
    (state: any) => state.wishlist.wishlistItems
  );

  console.log(wishListItems);
  

  return (
    <div>
      {wishListItems.length !== 0 ? (
        <div className="p-2 mt-20">
          {wishListItems.map((item: any) => (
            <WishlistItemCard {...item} />
          ))}
        </div>
      ) : (
        <div className="p-2 mt-20 flex justify-center items-center flex-col">
          <h1 className="text-center text-xl font-semibold">
            Your Wishlist is Empty!!!!!!
          </h1>
          <Button
            className="flex w-auto justify-between !border !rounded items-center !bg-blue-500 !hover:bg-blue-700 !text-white !font-bold !py-2 !px-4 !mr-4"
            onClick={() => route.push("/")}
          >
            Home
          </Button>
        </div>
      )}
    </div>
  );
};

export default WishListPage;

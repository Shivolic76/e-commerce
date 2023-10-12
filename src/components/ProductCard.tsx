"use client";
import { deleteProduct } from "@/redux/slices/productSlice";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddToCartBtn from "./AddToCartButton";
import Rating from "@mui/material/Rating";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  addToWishlist,
  removeFromWishlist,
} from "@/redux/slices/wishlistSlice";

const ProductCard: React.FC = (props: any) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const isItemInWishlist = useSelector((state: any) =>
    state.wishlist.wishlistItems.some((item: any) => item.id === props.id)
  );

  const handleToggleWishlist = () => {
    if (isItemInWishlist) {
      dispatch(removeFromWishlist(props.id));
    } else {
      dispatch(addToWishlist(props));
    }
  };

  return (
    <div className=" relative max-w-sm rounded overflow-hidden shadow-lg border cursor-pointer border-gray-300 m-5 transform transition-transform hover:scale-105" >
      <div className="flex flex-col h-full p-2">
        <div style={{ position: "relative" }} onClick={() => router.push(`/product/${props.id}`)}>
          <IconButton
            onClick={handleToggleWishlist}
            color={isItemInWishlist ? "secondary" : "default"}
            style={{ position: "absolute", top: 2, right: 2 }}
          >
            {isItemInWishlist ? (
              <FavoriteIcon className="text-red-500" />
            ) : (
              <FavoriteIcon className="text-yellow-500" />
            )}
          </IconButton>
          <img
            src={props.image}
            alt={props.title}
            className="object-cover h-48 w-full"
          />
          <div
            className="absolute top-0 left-0 bg-blue-500 text-white px-2 py-1 m-1 rounded-md"
            style={{ zIndex: 1 }}
          >
            {props.category}
          </div>
          <div className=" py-4">
            <div className="font-bold text-xl mb-2" style={{ width: "100%" }}>
              {props.title}
            </div>
            <p className="text-white-700 text-base">
              ${props.price.toFixed(2)}
            </p>
            <Rating
              name="simple-controlled"
              value={props.rating.rate}
              className="text-yellow-500 text-4xl"
            />
          </div>
        </div>
        <div className="flex justify-between items-end h-full">
          <AddToCartBtn product={props} />
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
            onClick={() => dispatch(deleteProduct(props.id))}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

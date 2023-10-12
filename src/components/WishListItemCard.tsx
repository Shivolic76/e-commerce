import { removeFromWishlist } from "@/redux/slices/wishlistSlice";
import React from "react";
import { useDispatch } from "react-redux";
import { increment } from "@/redux/slices/cartSlice";
import AddToCartBtn from "./AddToCartButton";

const WishlistItemCard = (props: any) => {
  const dispatch = useDispatch();
  return (
    <div className="grid grid-cols-4 items-center py-2 border-b">
      <img
        src={props.image}
        width={200}
        height={150}
        alt={props.title}
        className="rounded-md"
      />
      <p className="text-white-600 text-center">{props.title}</p>
      <div className="flex flex-col items-center justify-center gap-3 text-white-600">
        <p>{props.price} $</p>
      </div>
      <div className="flex">
        {" "}
        <AddToCartBtn product={props} />
        <button
          className="!border w-32 border-blue-700 !rounded !bg-blue-500 !hover:bg-blue-700 !text-white !font-bold !py-2 !px-4 !mr-4 ml-3"
          onClick={() => dispatch(removeFromWishlist(props.id))}
        >
          <p>&#xd7;</p>
        </button>
      </div>
    </div>
  );
};

export default WishlistItemCard;

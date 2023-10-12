import React from "react";
import { decrement, increment } from "../redux/slices/cartSlice";
import { useAppDispatch } from "../redux/store";
import QtyBtn from "./QtyBtn";

export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

export interface CartItem {
  product: Product;
  qty: number;
}

interface Props {
  cartItem: CartItem;
}
const CartItemCard = ({ cartItem }: Props) => {
  const dispatch = useAppDispatch();
  
  return (
    <div className="grid grid-cols-4 items-center py-2 border-b">
      <img
        src={cartItem.product.image}
        width={200} 
        height={150}
        alt={cartItem.product.title}
        className="rounded-md"
      />
      <p className="text-white-600 text-center">{cartItem.product.title}</p>
      <div className="flex flex-col items-center justify-center gap-3 text-white-600">
        <p>{cartItem.product.price} $</p>
        <p>&#xd7;</p>
        <QtyBtn
          qty={cartItem.qty}
          onDecrease={() => dispatch(decrement(cartItem.product))}
          onIncrease={() => dispatch(increment(cartItem.product))}
        />
      </div>
      <p className="text-center">{cartItem.qty * cartItem.product.price} $</p>
    </div>
  );
};

export default CartItemCard;

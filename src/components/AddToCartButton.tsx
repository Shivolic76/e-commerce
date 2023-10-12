"use client";
import React from "react";
import {
  decrement,
  increment,
  productQtyInCartSelector,
} from "../redux/slices/cartSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { Button } from "./elements";
import QtyBtn from "./QtyBtn";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

export interface Product {
  id: number;
  name: string;
  price: number;
  imagePath: string;
}

interface Props {
  product: Product;
}

const AddToCartBtn = (props: Props) => {
  const qty = useAppSelector((state) =>
    productQtyInCartSelector(state, props.product.id)
  );
  const dispatch = useAppDispatch();
  if (!qty)
    return (
      <div className="flex justify-center">
        <Button onClick={() => dispatch(increment(props.product))}>
          <AddShoppingCartIcon />
        </Button>
      </div>
    );
  return (
    <QtyBtn
      onDecrease={() => dispatch(decrement(props.product))}
      onIncrease={() => dispatch(increment(props.product))}
      qty={qty}
    />
  );
};

export default AddToCartBtn;

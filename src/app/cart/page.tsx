"use client";
import CartItemCard from "../../components/CartItemCard";
import React, { useEffect, useState } from "react";
import {
  TotalPriceSelector,
  clearCartItems,
} from "../../redux/slices/cartSlice";
import { useAppSelector } from "../../redux/store";
import { Button } from "@mui/material";
import CustomModal from "@/components/Modal";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

const CartPage = () => {
  const route = useRouter();
  const dispatch = useDispatch();
  const cartItems: any = useAppSelector((state) => state.cart.cartItems);

  const totalPrice: any = useAppSelector(TotalPriceSelector);
  const [open, setOpen] = useState(false);
  const [paymentId, setPaymentId] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    localStorage.removeItem("reduxState");
    setOpen(false);
    // route.push("/");
  };
  const PaymentPrice: number = Math.floor(totalPrice * 100);

  const options = {
    key: "rzp_test_HJG5Rtuy8Xh2NB",
    amount: PaymentPrice,
    description: "some description",
    image: "https://cdn.razorpay.com/logos/7K3b6d18wHwKzL_medium.png",
    handler: function (response: any) {
      setPaymentId(response.razorpay_payment_id);
      localStorage.removeItem("reduxState");
      dispatch(clearCartItems());
      setOpen(true);
    },
    prefill: {
      name: "User ",
      contact: "9999999999",
      email: "demo@demo.com",
    },
    notes: {
      address: "some address",
    },
  };

  const openPayModal = () => {
    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div>
      <div className="p-2 mt-20">
        {cartItems.map((item: any) => (
          <CartItemCard cartItem={item} />
        ))}

        <div>
          {cartItems.length === 0 ? (
            <div className="p-2 mt-5 flex justify-center items-center flex-col">
              <h1 className="text-center text-xl font-semibold">
                Your cart is Empty!!!!!!
              </h1>
              <Button
                className="flex w-auto justify-between !border !rounded items-center !bg-blue-500 !hover:bg-blue-700 !text-white !font-bold !py-2 !px-4 !mr-4"
                onClick={() => route.push("/")}
              >
                Home
              </Button>
            </div>
          ) : (
            <div className="flex justify-between p-2 items-center">
              <p className="text-white-600">
                Total Price:{" "}
                <span className="text-white-900 font-bold">{totalPrice} $</span>
              </p>
              <Button
                className="flex justify-between !border !rounded items-center !bg-blue-500 !hover:bg-blue-700 !text-white !font-bold !py-2 !px-4 !mr-4"
                onClick={openPayModal}
              >
                Pay Now
              </Button>
            </div>
          )}
        </div>

        {open && (
          <CustomModal
            open={open}
            handleOpen={handleOpen}
            handleClose={handleClose}
            paymentId={paymentId}
          />
        )}
      </div>
      {/* {cartItems.length !== 0 ? (  ) : (
        <div className="p-2 mt-20 flex justify-center items-center flex-col">
          <h1 className="text-center text-xl font-semibold">
            Your cart is Empty!!!!!!
          </h1>
          <Button
            className="flex w-auto justify-between !border !rounded items-center !bg-blue-500 !hover:bg-blue-700 !text-white !font-bold !py-2 !px-4 !mr-4"
            onClick={() => route.push("/")}
          >
            Home
          </Button>
        </div>
      )} */}
    </div>
  );
};

export default CartPage;

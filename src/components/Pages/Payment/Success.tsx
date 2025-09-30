/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import successImage from "@/assets/payment/payment-success.gif";
import { clearCart } from "@/redux/features/cart/cartSlice";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const Success = () => {
  // const dispatch = useDispatch();

  // // Use effect to get session_id from the URL
  // useEffect(() => {
  //   dispatch(clearCart());
  // }, []);
  return (
    <div className="w-full h-full container py-10 text-center space-y-8 bg-white">
      <Image src={successImage} alt="Success" className="w-72 h-56 mx-auto" />
      {/* Title */}
      <h1 className="text-4xl font-semibold text-green-600">
        Payment Successful!
      </h1>
      <p className="text-xl text-gray-700">Thank you for your order!</p>

      {/* Confirmation Message */}
      <div>
        <p className="text-lg text-gray-700">
          Your order is being processed and will be shipped soon. We will notify
          you once your order has shipped.
        </p>
        <p className="mt-4 text-xl font-semibold text-gray-900">
          Thank you for shopping with us!
        </p>
      </div>
      <div className="mt-4">
        <Link href="/">
          <button className="px-8 py-3 bg-primary text-white rounded-lg transition duration-200">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Success;

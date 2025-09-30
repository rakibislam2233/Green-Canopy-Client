"use client";
import locateImage from "@/assets/markateplace/markateplace.png";
import BreadcrumbComponent from "@/components/UI/BreadcrumbComponent";
import Button from "@/components/UI/Button";
import useUser from "@/hook/useUser";
import {
  clearCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  addToCart,
  selectCart,
  selectTotalPrice,
  ICartItem,
  updateToCart,
} from "@/redux/features/cart/cartSlice";
import { useCreateOrderMutation } from "@/redux/features/order/orderApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Table, TableColumnsType } from "antd";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { FiMinus, FiPlus, FiX } from "react-icons/fi";
import { HiOutlineHome } from "react-icons/hi";
import { PiArrowBendUpLeftLight } from "react-icons/pi";
import { toast } from "sonner";
import InputComponent from "@/components/UI/InputComponent";
import { useApplyCouponMutation } from "@/redux/features/coupon/couponApi";
import { useGetAdditionalChargeQuery } from "@/redux/features/settings/settingsApi";
import Swal from "sweetalert2";
import { useGetProductsQuery } from "@/redux/features/products/productsApi";
import { IProduct, ISize } from "@/types/product";
import { imageBaseUrl } from "@/config/imageBaseUrl";

const breadcrumbItems = [
  {
    href: "/",
    title: (
      <div className="flex gap-2 items-center">
        <HiOutlineHome size={18} />
        <span>Home</span>
      </div>
    ),
  },
  {
    title: "Cart",
  },
];

const Cart = () => {
  const { user } = useUser();
  const cartData = useAppSelector(selectCart);
  const [couponCode, setCouponCode] = useState<string>("");
  const [discountPercentage, setDiscountPercentage] = useState<number>(0);

  // Fetch all products to validate cart data
  const { data: responseData } = useGetProductsQuery(
    { page: 1, limit: 50 },
    {
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    }
  );
  const allProduct = responseData?.data?.attributes?.results;

  const dispatch = useAppDispatch();
  const router = useRouter();
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const { data: additionalChargeData } = useGetAdditionalChargeQuery(undefined);
  const [applyCouponCode] = useApplyCouponMutation();

  // Validate and update cart data based on matched products
  useEffect(() => {
    if (allProduct && cartData.length > 0) {
      cartData.forEach((cartItem) => {
        const matchedProduct = allProduct.find(
          (product: IProduct) => product?._id === cartItem?.id
        );
        if(!matchedProduct) {
          dispatch(removeFromCart(cartItem?.id));
          return
        }
        if (matchedProduct) {
          const selectedSize = matchedProduct?.sizes?.find(
            (size: ISize) => size?.size === cartItem?.size
          );

          if (selectedSize) {
            if (!selectedSize.inStock) {
              dispatch(removeFromCart(matchedProduct?.id));
              return null;
            }
            // Update cart item with the latest product name and price
            dispatch(
              updateToCart({
                ...cartItem,
                name: matchedProduct?.productName,
                slug: matchedProduct?.slug,
                price: selectedSize?.discountPrice || selectedSize?.price,
                image: `${imageBaseUrl}${matchedProduct?.productImages[0]?.imageUrl}`,
                category: matchedProduct?.category,
                stockQuantity: selectedSize?.quantity,
              })
            );
          }
        }
      });
    }
  }, [allProduct, cartData, dispatch]);

  // Calculate totals
  const serviceFee = cartData.length
    ? additionalChargeData?.serviceFee || 0
    : 0;
  const taxFee = cartData.length ? additionalChargeData?.taxFee || 0 : 0;
  const fixedFees = serviceFee + taxFee;
  const totalCartPrice = useAppSelector(selectTotalPrice);
  const discountAmount = (totalCartPrice * discountPercentage) / 100;
  const finalTotalPrice = totalCartPrice - discountAmount + fixedFees;

  const handleCouponCode = async () => {
    try {
      const response = await applyCouponCode({
        couponName: couponCode,
      }).unwrap();

      if (response?.success) {
        toast.success(response?.message);
        setDiscountPercentage(response?.data?.attributes?.discount || 0);
        setCouponCode("");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Invalid coupon code.");
    }
  };

  const handleRemoveCart = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to remove this item from your cart?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3FB249",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeFromCart(id));
      }
    });
  };

  const handleClearToCart = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to clear your cart?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3FB249",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, clear it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(clearCart());
      }
    });
  };

  // Table columns
  const columns: TableColumnsType<ICartItem> = [
    {
      title: <h1 className="uppercase">Product</h1>,
      dataIndex: "image",
      key: "image",
      render: (_, record) => (
        <div className="flex flex-col md:flex-row items-center gap-3">
          <Link href={`/products/${record?.slug}`}>
            <div className="size-20 relative">
              <Image
                fill
                src={`${record?.image}`}
                alt="productImage"
                className="rounded-lg absolute"
              />
            </div>
          </Link>
          <Link href={`/products/${record?.slug}`}>
            <p className="md:text-start text-center hover:underline">
              {record?.name}
            </p>
          </Link>
        </div>
      ),
    },
    {
      title: <h1 className="uppercase">Category</h1>,
      dataIndex: "category",
    },
    {
      title: <h1 className="uppercase">Size</h1>,
      dataIndex: "size",
    },
    {
      title: <h1 className="uppercase">Color</h1>,
      dataIndex: "color",
      render: (_, record) => {
        return (
          <>
            {record?.color !== "N/A" ? (
              <div
                className="size-6 rounded-full"
                style={{ backgroundColor: record?.color }}
              />
            ) : (
              <p className="text-gray-500">N/A</p>
            )}
          </>
        );
      },
    },
    {
      title: <h1 className="uppercase">Price</h1>,
      dataIndex: "price",
      render: (_, record) => (
        <span className="font-semibold">${record?.price?.toFixed(2)}</span>
      ),
    },
    {
      title: <h1 className="uppercase">Quantity</h1>,
      dataIndex: "quantity",
      render: (_, record) => (
        <div className="flex rounded-lg overflow-hidden">
          <button
            onClick={() => dispatch(decrementQuantity(record?.id))}
            disabled={record?.quantity === 1}
            className="px-4 py-3 border-l border-t border-b rounded-l-md border-[#929292]"
          >
            <FiMinus className="size-3" />
          </button>
          <h1 className="border flex justify-center items-center px-5 py-2 text-sm border-[#929292]">
            {record?.quantity}
          </h1>
          <button
            disabled={record?.quantity >= (record?.stockQuantity ?? 0)}
            onClick={() => dispatch(incrementQuantity(record?.id))}
            className="px-4 py-3 border-r border-t border-b rounded-r-md border-[#929292]"
          >
            <FiPlus className="size-3" />
          </button>
        </div>
      ),
    },
    {
      title: <h1 className="uppercase">Total</h1>,
      dataIndex: "totalPrice",
      render: (_, record) => (
        <span className="font-semibold">${record?.totalPrice.toFixed(2)}</span>
      ),
    },
    {
      dataIndex: "id",
      render: (_, record) => (
        <button
          onClick={() => handleRemoveCart(record?.id)}
          className="text-white size-6 rounded-full bg-primary flex justify-center items-center"
        >
          <FiX size={14} />
        </button>
      ),
    },
  ];

  const handleCheckout = async () => {
    if (!user) {
      router.push("/login?redirectUrl=cart");
      return;
    }
    try {
      const response = await createOrder({
        items: cartData,
        totalAmount: finalTotalPrice,
      }).unwrap();
      if (response?.success) {
        window.location.href = response?.data?.attributes?.sessionUrl;
      } else {
        toast.error("Failed to create order.");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "An error occurred.");
    }
  };

  return (
    <section className="w-full">
      <div className="relative w-full h-[200px] md:h-[300px] overflow-hidden">
        <motion.div
          initial={{ scale: 1.3 }}
          animate={{ scale: 1 }}
          transition={{ type: "tween", duration: 1 }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={locateImage}
            alt="Cart"
            layout="fill"
            objectFit="cover"
            quality={100}
            className="absolute inset-0 z-0"
          />
          <div className="absolute inset-0 bg-black opacity-30"></div>
        </motion.div>
        <div className="relative z-10 flex items-center justify-center h-full text-center text-white px-5">
          <motion.h1
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="text-3xl md:text-4xl lg:text-5xl font-semibold"
          >
            Cart
          </motion.h1>
        </div>
      </div>
      <div className="w-full md:container px-5 py-10">
        <BreadcrumbComponent items={breadcrumbItems} />
        <div className="shadow rounded-lg space-y-5 mt-5">
          <div className="overflow-x-auto">
            <Table
              columns={columns}
              dataSource={cartData}
              pagination={false}
              rowKey="id"
            />
          </div>
          <div className="w-full flex flex-wrap justify-between gap-10 px-5">
            <div className="flex flex-wrap gap-8 items-center">
              <Link href="/products">
                <button className="px-5 py-2 rounded-lg border bg-primary text-white duration-300 transition-all flex justify-center items-center gap-3">
                  <PiArrowBendUpLeftLight size={20} />
                  <span>Continue Shopping</span>
                </button>
              </Link>
              <button
                disabled={cartData?.length === 0}
                onClick={handleClearToCart}
                className="px-5 py-2 rounded-lg border hover:bg-primary hover:text-white duration-300 transition-all flex justify-center items-center gap-3"
              >
                <FiX />
                Clear Cart
              </button>
            </div>
            <div className="text-end">
              <h1 className="text-lg font-semibold">
                Sub Total: ${totalCartPrice?.toFixed(2)}
              </h1>
              <h1 className="text-gray-700">
                Discount: -${discountAmount?.toFixed(2)}
              </h1>
              <h1 className="text-gray-700">Tax Fee: ${taxFee?.toFixed(2)}</h1>
              <h1 className="text-gray-700">
                Service Fee: ${serviceFee?.toFixed(2)}
              </h1>
            </div>
          </div>
          <hr />
          <h1 className="text-2xl font-bold text-end px-5">
            Total: ${finalTotalPrice?.toFixed(2)}
          </h1>
          <div className="w-full flex justify-between items-center gap-5 p-5">
            <div className="w-full md:w-1/2 space-y-3">
              <h1>
                Enter a promo code to get discounts on your total purchase.
              </h1>
              <InputComponent
                placeholder="Enter Your Promo Code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
              <button
                disabled={cartData?.length === 0}
                onClick={handleCouponCode}
                className="px-8 py-2 rounded-lg border bg-primary text-white duration-300 transition-all"
              >
                Apply
              </button>
            </div>
            <div>
              <Button
                disabled={cartData?.length === 0}
                onClick={handleCheckout}
                loading={isLoading}
              >
                Order Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;

"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaShoppingCart, FaTrash } from "react-icons/fa";
import Image from "next/image";
import {
  addToWishlist,
  IWishlistItem,
  removeFromWishlist,
} from "@/redux/features/wishlist/wishlistSlice"; // Update import path
import { addToCart, selectCart } from "@/redux/features/cart/cartSlice"; // Assuming this is imported for adding to cart
import NoDataFound from "@/components/NoDataFound/NoDataFound";
import Link from "next/link";
import Swal from "sweetalert2";
import { useGetProductsQuery } from "@/redux/features/products/productsApi";
import { IProduct, ISize } from "@/types/product";
import { imageBaseUrl } from "@/config/imageBaseUrl";
import { useAppSelector } from "@/redux/hooks";

const MyFavorite: React.FC = () => {
  const cartData = useAppSelector(selectCart);
  const dispatch = useDispatch();

  // Access wishlist from Redux state
  const wishlist = useSelector((state: any) => state.wishlist.wishlist); // Get wishlist from Redux state
  // Fetch all products to validate cart data
  const { data: responseData } = useGetProductsQuery(
    { page: 1, limit: 50 },
    {
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    }
  );
  const allProduct = responseData?.data?.attributes?.results;

  // Validate and update cart data based on matched products
  useEffect(() => {
    if (allProduct && wishlist.length > 0) {
      wishlist.forEach((wishlistItem: IWishlistItem) => {
        const matchedProduct = allProduct.find(
          (product: IProduct) => product._id === wishlistItem?.id
        );
        if (!matchedProduct) {
          // If the product is deleted from backend, remove it from wishlist
          dispatch(removeFromWishlist(wishlistItem.id));
          return;
        }
        if (matchedProduct) {
          const selectedSize = matchedProduct.sizes.find(
            (size: ISize) => size?.size === wishlistItem?.size
          );
          if (selectedSize) {
            if (!selectedSize?.inStock) {
              dispatch(removeFromWishlist(matchedProduct?.id));
              return null;
            }
            // Update cart item with the latest product name and price
            dispatch(
              addToWishlist({
                ...wishlistItem,
                name: matchedProduct?.productName,
                slug: matchedProduct.slug,
                price: selectedSize.price,
                image: `${imageBaseUrl}${matchedProduct?.productImages[0]?.imageUrl}`,
                category: matchedProduct.category,
              })
            );
          }
        }
      });
    }
  }, [allProduct, wishlist, dispatch]);

  const handleAddToCart = (item: IWishlistItem) => {
    // You would dispatch the item to your cart here
    const cartItem = {
      id: item.id,
      name: item.name,
      slug: item.slug,
      price: item.price,
      image: item.image,
      size: item.size,
      color: item.color,
      quantity: item.quantity,
      category: item.category,
    };
    dispatch(addToCart(cartItem));
    dispatch(removeFromWishlist(item.id));
  };

  const handleRemoveFromWishlist = (itemId: string) => {
    Swal.fire({
      title: "Are you sure you want to remove this item from your wishlist?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3FB249",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeFromWishlist(itemId)); // Dispatch remove action from Redux wishlist slice
      }
    });
  };
  return (
    <section className="w-full">
      <h1 className="text-2xl md:text-4xl font-semibold border-b py-3.5">
        My Wishlist
      </h1>

      <div>
        {wishlist?.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {wishlist.map((item: IWishlistItem) => {
              const inCartThisProduct = cartData.find(
                (item) => item.id === item?.id
              );
              return (
                <div key={item.id} className="border rounded-lg shadow-lg">
                  <Link href={`/products/${item.slug}`}>
                    <div className="w-full h-56 relative ">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover rounded-t-lg absolute"
                      />
                    </div>
                  </Link>
                  <div className="p-4">
                    <h3 className="font-semibold text-xl">{item.name}</h3>
                    <p className="text-gray-600">Category: {item.category}</p>
                    <p className="text-gray-600">Size: {item.size}</p>
                    <p className="text-gray-600 flex gap-2 items-center">
                      Color:{" "}
                      {item.color !== "N/A" ? (
                        <div
                          className="size-5 rounded-full"
                          style={{ backgroundColor: item.color }}
                        ></div>
                      ) : (
                        <span>N/A</span>
                      )}
                    </p>
                    <p className="text-gray-600">Price: ${item.price}</p>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>

                    <div className="mt-4 flex justify-between">
                      <button
                        disabled={
                          inCartThisProduct &&
                          inCartThisProduct.quantity >= item.stockQuantity
                        }
                        className={`px-5 py-3 border border-gray-300 ${inCartThisProduct &&
                          inCartThisProduct.quantity >= item.stockQuantity ? "bg-gray-300" : "bg-primary"} text-white rounded-lg flex justify-center items-center gap-2`}
                        onClick={() => handleAddToCart(item)}
                      >
                        <FaShoppingCart className="size-5" />
                        Add to Cart
                      </button>
                      <button
                        className="px-5 py-3 border border-primary text-primary rounded-lg flex justify-center items-center gap-2"
                        onClick={() => handleRemoveFromWishlist(item.id)}
                      >
                        <FaTrash className="size-5" />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <NoDataFound />
        )}
      </div>
    </section>
  );
};

export default MyFavorite;

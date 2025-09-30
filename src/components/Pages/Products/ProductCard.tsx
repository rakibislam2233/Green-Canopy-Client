import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  FaStar,
  FaShoppingCart,
  FaHeart,
  FaStarHalfAlt,
  FaRegStar,
} from "react-icons/fa";
import { IProduct } from "@/types/product";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/hooks";
import { addToCart, selectCart } from "@/redux/features/cart/cartSlice";
import { imageBaseUrl } from "@/config/imageBaseUrl";
const ProductCard = ({ product }: { product: IProduct }) => {
  const cartData = useAppSelector(selectCart);
  const inCartThisProduct = cartData.find((item) => item.id === product?._id);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    const cartItem = {
      id: product?._id,
      name: product?.productName,
      slug: product?.slug,
      price: product?.sizes[0]?.discountPrice
        ? product?.sizes[0]?.discountPrice
        : product?.sizes[0]?.price,
      image: product?.productImages[0]?.imageUrl?.startsWith("http")
        ? product?.productImages[0]?.imageUrl
        : `${imageBaseUrl}${product?.productImages[0]?.imageUrl}`,
      size: product?.sizes[0].size,
      color: product?.sizes[0].colors[0] || "N/A",
      quantity: 1,
      category: product?.category,
    };
    dispatch(addToCart(cartItem));
  };

  // Function to render stars based on rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="text-gray-300" />);
    }

    return stars;
  };

  return (
    <motion.div
      key={product._id}
      className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-2 group relative"
    >
      {/* Product Image */}
      <div className="relative h-56 overflow-hidden">
        <Link href={`/products/${product?.slug}`}>
          <Image
            src={
              product?.productImages[0]?.imageUrl?.startsWith("http")
                ? product?.productImages[0]?.imageUrl
                : `${imageBaseUrl}${product?.productImages[0]?.imageUrl}`
            }
            alt={product.productName}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col space-y-2">
          {product.avgReview >= 4.5 && (
            <span className="bg-primary text-white px-3 py-1 rounded-full text-xs font-medium">
              Bestseller
            </span>
          )}
          {product.sizes[0].discountPercentage && (
            <span className="bg-rose-600 text-white px-3 py-1 rounded-full text-xs font-medium">
              -{product.sizes[0].discountPercentage}% OFF
            </span>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="p-2 bg-white rounded-full shadow-lg hover:bg-red-50 transition-colors duration-300">
            <FaHeart className="text-gray-600 hover:text-red-500" />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-primary text-sm font-medium bg-green-50 px-3 py-1 rounded-full">
            {product.category}
          </span>
          <div className="flex items-center space-x-1">
            {renderStars(product?.avgReview)}
            <span className="text-gray-500 text-xs">
              ({product?.avgReview.toFixed(1)})
            </span>
          </div>
        </div>

        <Link href={`/products/${product.slug}`}>
          <h3 className="text-lg font-bold text-gray-800 group-hover:text-primary transition-colors duration-300 mb-2 line-clamp-1">
            {product.productName}
          </h3>
        </Link>

        <p
          className="text-gray-600 text-sm mb-4 line-clamp-2"
          dangerouslySetInnerHTML={{ __html: product.productDescription }}
        ></p>

        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-primary">
                ${product.sizes[0].discountPrice?.toFixed(2) || product.sizes[0].price?.toFixed(2)}
              </span>
              {product.sizes[0].discountPrice && (
                <span className="text-gray-400 line-through text-sm">
                  ${product.sizes[0].price}
                </span>
              )}
            </div>
            <span className="text-xs text-gray-500">
              Size: {product.sizes[0].size}
            </span>
          </div>

          <button
            onClick={() => handleAddToCart()}
            disabled={
              !product?.sizes[0]?.inStock ||
              (inCartThisProduct &&
                inCartThisProduct.quantity >= product?.sizes[0]?.quantity)
            }
            className={`flex items-center px-4 py-2 rounded-full font-medium transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg text-sm  ${
              !product?.sizes[0]?.inStock ||
              (inCartThisProduct &&
                inCartThisProduct.quantity >= product?.sizes[0]?.quantity)
                ? "bg-gray-300 text-gray-500 cursor-not-allowed "
                : "bg-primary text-white hover:bg-secondary"
            }`}
          >
            <FaShoppingCart className="mr-2 text-xs" />
            {inCartThisProduct &&
            inCartThisProduct.quantity >= product?.sizes[0]?.quantity
              ? "Max Quantity Added"
              : !product?.sizes[0]?.inStock
              ? "Out of Stock"
              : "Add to Cart"}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;

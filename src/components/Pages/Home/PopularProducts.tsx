"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa";
import ProductCard from "../Products/ProductCard";
import { useGetProductsQuery } from "@/redux/features/products/productsApi";
import { IProduct } from "@/types/product";

const PopularProductsHome = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage] = useState(4);

  const {
    data: responseData,
    isLoading,
    isError,
  } = useGetProductsQuery({
    page: 1,
    limit: 8,
  });

  // Get the list of products and total results from the API response
  const products = responseData?.data?.attributes?.results || [];
  const totalResults = responseData?.data?.attributes?.totalResults || 0;

  const totalPages = Math.ceil(totalResults / itemsPerPage);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalPages);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalPages) % totalPages);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const getCurrentProducts = () => {
    const startIndex = currentIndex * itemsPerPage;
    return products.slice(startIndex, startIndex + itemsPerPage);
  };

  if (isLoading) {
    return (
      <div className="w-full py-20 bg-gradient-to-b from-gray-50 to-white text-center">
        <p className="text-gray-600 text-lg">Loading products...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full py-20 bg-gradient-to-b from-gray-50 to-white text-center">
        <p className="text-red-600 text-lg">
          Error loading products. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <section className="w-full py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-5">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-semibold text-gray-800">
            Popular <span className="text-primary">Products</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mt-5"></div>
          <p className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto">
            Discover our bestselling trees and plants, loved by gardeners
            everywhere
          </p>
        </motion.div>

        {/* Products Slider */}
        <div className="relative max-w-8xl mx-auto">
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white hover:bg-green-50 border-2 border-primary rounded-full p-3 shadow-lg transition-all duration-300 group z-10"
            disabled={totalPages <= 1}
          >
            <IoIosArrowBack
              size={24}
              className="text-primary group-hover:text-green-700"
            />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white hover:bg-green-50 border-2 border-primary rounded-full p-3 shadow-lg transition-all duration-300 group z-10"
            disabled={totalPages <= 1}
          >
            <IoIosArrowForward
              size={24}
              className="text-primary group-hover:text-green-700"
            />
          </button>

          {/* Products Container */}
          <div className="w-full p-10 overflow-hidden">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {getCurrentProducts().map((product : IProduct, index : number) => (
                <ProductCard key={index} product={product} />
              ))}
            </motion.div>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-primary"
                    : "bg-primary opacity-15"
                }`}
              />
            ))}
          </div>
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <Link
            href="/products"
            className="inline-flex items-center bg-primary text-white px-8 py-3 rounded"
          >
            View All Products
            <FaArrowRight className="ml-2" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default PopularProductsHome;

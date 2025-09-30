"use client";
import { useGetAllCategoryQuery } from "@/redux/features/category/categoryApi";
import { motion } from "framer-motion";
import Image from "next/image";
import { imageBaseUrl } from "@/config/imageBaseUrl";
import Link from "next/link";
import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa";
import PopularCategorySkeleton from "./PopularCategorySkeleton";

export interface ICategory {
  _id: number;
  categoryName: string;
  categoryImage: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const PopularCategory = () => {
  const { data: responseData, isLoading } = useGetAllCategoryQuery(undefined);
  const categoryData = responseData?.data?.attributes?.results;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage] = useState(4); 

  // Use API data if available, otherwise use static data
  const allCategories = (categoryData && categoryData.length > 0) ? categoryData : [];
  const totalPages = Math.ceil(allCategories.length / itemsPerPage);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalPages);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalPages) % totalPages);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const getCurrentCategories = () => {
    const startIndex = currentIndex * itemsPerPage;
    return allCategories.slice(startIndex, startIndex + itemsPerPage);
  };


  if (isLoading) {
    return (
      <section className="w-full py-20 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="container mx-auto px-5">
          <motion.div className="text-center mb-16">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-semibold text-gray-800">
              Popular <span className="text-primary">Categories</span>
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto mt-5"></div>
            <p className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto">
              Discover our wide variety of trees and plants, carefully categorized for your gardening needs
            </p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {Array(6)
              .fill(0)
              .map((_, idx) => (
                <PopularCategorySkeleton key={idx} />
              ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-20 bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="container mx-auto px-5">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-semibold text-gray-800">
            Popular <span className="text-primary">Categories</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mt-5"></div>
          <p className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto">
            Discover our wide variety of trees and plants, carefully categorized for your gardening needs
          </p>
        </motion.div>

        {/* Categories Slider */}
        <div className="relative max-w-7xl mx-auto">
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white hover:bg-green-50 border-2 border-primary rounded-full p-3 shadow-lg transition-all duration-300 group z-10"
          >
            <IoIosArrowBack size={24} className="text-primary group-hover:text-green-700" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white hover:bg-green-50 border-2 border-primary rounded-full p-3 shadow-lg transition-all duration-300 group z-10"
          >
            <IoIosArrowForward size={24} className="text-primary group-hover:text-green-700" />
          </button>

          {/* Categories Container */}
          <div className="w-full p-4 overflow-hidden">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {getCurrentCategories().map((category: ICategory, index: number) => (
                <motion.div
                  key={category._id}
                  className="group"
                >
                  <Link href={`/products?categoryName=${category?.categoryName}`}>
                    <div className="bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 border border-gray-100">
                      {/* Image Section */}
                      <div className="relative h-32 md:h-40 overflow-hidden">
                        <Image
                          src={
                            category?.categoryImage?.startsWith('http') 
                              ? category.categoryImage 
                              : `${imageBaseUrl}${category?.categoryImage}`
                          }
                          alt={category?.categoryName}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                        
                        {/* Explore badge - positioned in top right */}
                        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span className="bg-white/90 text-green-600 px-2 py-1 rounded-full text-xs font-medium shadow-md">
                            Explore
                          </span>
                        </div>
                      
                      </div>
                      
                      {/* Content Section */}
                      <div className="p-4 text-center">
                         <h3 className="font-semibold text-sm md:text-base leading-tight">
                            {category?.categoryName}
                          </h3>
                        <div className="flex items-center justify-center space-x-1 text-xs text-gray-500">
                          <span>View Products</span>
                          <FaArrowRight className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
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
            href="/categories"
            className="inline-flex items-center bg-primary text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl group"
          >
            View All Categories
            <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default PopularCategory;

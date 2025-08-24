"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaStar, FaShoppingCart, FaHeart, FaArrowRight } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IProduct } from "@/types/product";
import ProductCard from "../Products/ProductCard";

const PopularProductsHome = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage] = useState(4); // Show 4 products per slide on homepage

  // Static popular products data using IProduct interface
  const popularProducts: IProduct[] = [
    {
      _id: "1",
      productName: "Japanese Maple - Acer Palmatum",
      slug: "japanese-maple-acer-palmatum",
      productDescription:
        "Beautiful ornamental tree with stunning red foliage. Perfect for small gardens and landscape accents.",
      productImages: [
        {
          _id: "img1",
          imageUrl:
            "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
          file: {},
        },
      ],
      sizes: [
        {
          _id: "size1",
          size: "M",
          price: 89.99,
          inStock: true,
          discountPrice: 79.99,
          discountPercentage: 11,
          quantity: 15,
          colors: ["Green", "Red"],
        },
      ],
      category: "Ornamental Trees",
      avgReview: 4.8,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: "2",
      productName: "Apple Tree - Honeycrisp",
      slug: "apple-tree-honeycrisp",
      productDescription:
        "Premium honeycrisp apple tree producing sweet, crispy apples. Self-pollinating variety perfect for home orchards.",
      productImages: [
        {
          _id: "img2",
          imageUrl:
            "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=400&fit=crop",
          file: {},
        },
      ],
      sizes: [
        {
          _id: "size2",
          size: "M",
          price: 79.99,
          inStock: true,
          discountPrice: 65.99,
          discountPercentage: 17,
          quantity: 12,
          colors: ["Green"],
        },
      ],
      category: "Fruit Trees",
      avgReview: 4.9,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: "3",
      productName: "Pine Tree - Eastern White",
      slug: "pine-tree-eastern-white",
      productDescription:
        "Fast-growing evergreen pine tree. Excellent for windbreaks, privacy screens, and Christmas trees.",
      productImages: [
        {
          _id: "img3",
          imageUrl:
            "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
          file: {},
        },
      ],
      sizes: [
        {
          _id: "size3",
          size: "L",
          price: 125.99,
          inStock: true,
          discountPrice: 115.99,
          discountPercentage: 8,
          quantity: 8,
          colors: ["Green"],
        },
      ],
      category: "Evergreen Trees",
      avgReview: 4.7,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: "4",
      productName: "Cherry Blossom - Kwanzan",
      slug: "cherry-blossom-kwanzan",
      productDescription:
        "Spectacular flowering cherry tree with double pink blooms. Creates a stunning spring display that lasts for weeks.",
      productImages: [
        {
          _id: "img4",
          imageUrl:
            "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&h=400&fit=crop",
          file: {},
        },
      ],
      sizes: [
        {
          _id: "size4",
          size: "M",
          price: 115.99,
          inStock: true,
          discountPrice: 95.99,
          discountPercentage: 17,
          quantity: 6,
          colors: ["Pink", "Green"],
        },
      ],
      category: "Flowering Trees",
      avgReview: 4.6,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: "5",
      productName: "Magnolia Tree - Southern",
      slug: "magnolia-tree-southern",
      productDescription:
        "Elegant southern magnolia with large, fragrant white flowers. Glossy evergreen leaves provide year-round beauty.",
      productImages: [
        {
          _id: "img5",
          imageUrl:
            "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=400&fit=crop",
          file: {},
        },
      ],
      sizes: [
        {
          _id: "size5",
          size: "L",
          price: 130.99,
          inStock: true,
          discountPrice: 110.99,
          discountPercentage: 15,
          quantity: 4,
          colors: ["Green", "White"],
        },
      ],
      category: "Flowering Trees",
      avgReview: 4.8,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: "6",
      productName: "Oak Tree - Quercus Alba",
      slug: "oak-tree-quercus-alba",
      productDescription:
        "Majestic white oak tree, perfect for large landscapes. Provides excellent shade and supports local wildlife.",
      productImages: [
        {
          _id: "img6",
          imageUrl:
            "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop",
          file: {},
        },
      ],
      sizes: [
        {
          _id: "size6",
          size: "S",
          price: 45.99,
          inStock: true,
          discountPrice: 39.99,
          discountPercentage: 13,
          quantity: 10,
          colors: ["Green"],
        },
      ],
      category: "Shade Trees",
      avgReview: 4.5,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: "7",
      productName: "Cedar Tree - Blue Atlas",
      slug: "cedar-tree-blue-atlas",
      productDescription:
        "Stunning blue atlas cedar with unique silvery-blue color. An impressive specimen tree for large landscapes.",
      productImages: [
        {
          _id: "img7",
          imageUrl:
            "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
          file: {},
        },
      ],
      sizes: [
        {
          _id: "size7",
          size: "L",
          price: 145.99,
          inStock: true,
          discountPrice: 135.99,
          discountPercentage: 7,
          quantity: 3,
          colors: ["Blue", "Green"],
        },
      ],
      category: "Evergreen Trees",
      avgReview: 4.9,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: "8",
      productName: "Lemon Tree - Dwarf Meyer",
      slug: "lemon-tree-dwarf-meyer",
      productDescription:
        "Perfect dwarf lemon tree for containers and small spaces. Produces sweet, juicy Meyer lemons year-round.",
      productImages: [
        {
          _id: "img8",
          imageUrl:
            "https://images.unsplash.com/photo-1520637736862-4d197d17c50a?w=400&h=400&fit=crop",
          file: {},
        },
      ],
      sizes: [
        {
          _id: "size8",
          size: "S",
          price: 75.99,
          inStock: true,
          discountPrice: 69.99,
          discountPercentage: 8,
          quantity: 7,
          colors: ["Green"],
        },
      ],
      category: "Fruit Trees",
      avgReview: 4.4,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  const totalPages = Math.ceil(popularProducts.length / itemsPerPage);

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
    return popularProducts.slice(startIndex, startIndex + itemsPerPage);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar
        key={index}
        className={`${
          index < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"
        } text-sm`}
      />
    ));
  };

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
          >
            <IoIosArrowBack
              size={24}
              className="text-primary group-hover:text-green-700"
            />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white hover:bg-green-50 border-2 border-primary rounded-full p-3 shadow-lg transition-all duration-300 group z-10"
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
              {getCurrentProducts().map((product, index) => (
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
                    ? "bg-primary "
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

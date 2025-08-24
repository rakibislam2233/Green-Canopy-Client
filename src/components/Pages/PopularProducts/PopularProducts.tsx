"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaStar, FaShoppingCart, FaHeart, FaEye, FaArrowRight } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import NoDataFound from "@/components/NoDataFound/NoDataFound";

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  category: string;
  description: string;
  inStock: boolean;
  featured: boolean;
  slug: string;
}

const PopularProducts = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage] = useState(8); // Show 8 products per slide
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Static popular products data
  const popularProducts: Product[] = [
    {
      id: 1,
      name: "Japanese Maple Tree",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=400&fit=crop",
      price: 89.99,
      originalPrice: 109.99,
      rating: 4.8,
      reviews: 124,
      category: "Ornamental Trees",
      description: "Beautiful ornamental tree with stunning red foliage perfect for small gardens",
      inStock: true,
      featured: true,
      slug: "japanese-maple-tree"
    },
    {
      id: 2,
      name: "Apple Tree - Honeycrisp",
      image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=400&fit=crop",
      price: 65.99,
      originalPrice: 79.99,
      rating: 4.9,
      reviews: 89,
      category: "Fruit Trees",
      description: "Premium Honeycrisp apple tree that produces sweet, crispy apples",
      inStock: true,
      featured: true,
      slug: "honeycrisp-apple-tree"
    },
    {
      id: 3,
      name: "Blue Spruce Evergreen",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
      price: 125.99,
      rating: 4.7,
      reviews: 67,
      category: "Evergreen Trees",
      description: "Majestic blue spruce perfect for creating natural windbreaks and privacy",
      inStock: true,
      featured: true,
      slug: "blue-spruce-evergreen"
    },
    {
      id: 4,
      name: "Cherry Blossom Tree",
      image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&h=400&fit=crop",
      price: 95.99,
      originalPrice: 115.99,
      rating: 4.6,
      reviews: 156,
      category: "Flowering Trees",
      description: "Beautiful flowering cherry tree with pink blossoms in spring",
      inStock: true,
      featured: true,
      slug: "cherry-blossom-tree"
    },
    {
      id: 5,
      name: "Oak Tree Sapling",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop",
      price: 45.99,
      rating: 4.5,
      reviews: 93,
      category: "Shade Trees",
      description: "Strong oak sapling that will grow into a magnificent shade tree",
      inStock: true,
      featured: false,
      slug: "oak-tree-sapling"
    },
    {
      id: 6,
      name: "Dwarf Lemon Tree",
      image: "https://images.unsplash.com/photo-1520637736862-4d197d17c50a?w=400&h=400&fit=crop",
      price: 75.99,
      rating: 4.4,
      reviews: 78,
      category: "Fruit Trees",
      description: "Compact lemon tree perfect for containers and small spaces",
      inStock: true,
      featured: false,
      slug: "dwarf-lemon-tree"
    },
    {
      id: 7,
      name: "Pine Tree - Eastern White",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
      price: 85.99,
      rating: 4.7,
      reviews: 45,
      category: "Evergreen Trees",
      description: "Fast-growing pine tree excellent for privacy screens",
      inStock: true,
      featured: false,
      slug: "eastern-white-pine"
    },
    {
      id: 8,
      name: "Magnolia Tree",
      image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&h=400&fit=crop",
      price: 110.99,
      originalPrice: 130.99,
      rating: 4.8,
      reviews: 112,
      category: "Flowering Trees",
      description: "Elegant magnolia with large fragrant white flowers",
      inStock: true,
      featured: true,
      slug: "magnolia-tree"
    },
    {
      id: 9,
      name: "Red Maple Tree",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=400&fit=crop",
      price: 95.99,
      rating: 4.6,
      reviews: 87,
      category: "Shade Trees",
      description: "Vibrant red maple with brilliant fall colors",
      inStock: false,
      featured: false,
      slug: "red-maple-tree"
    },
    {
      id: 10,
      name: "Peach Tree - Georgia Belle",
      image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=400&fit=crop",
      price: 69.99,
      rating: 4.5,
      reviews: 65,
      category: "Fruit Trees",
      description: "Sweet Georgia Belle peach tree with juicy summer fruit",
      inStock: true,
      featured: false,
      slug: "georgia-belle-peach-tree"
    },
    {
      id: 11,
      name: "Birch Tree - Paper White",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop",
      price: 78.99,
      rating: 4.3,
      reviews: 54,
      category: "Shade Trees",
      description: "Graceful paper birch with distinctive white bark",
      inStock: true,
      featured: false,
      slug: "paper-white-birch"
    },
    {
      id: 12,
      name: "Cedar Tree - Blue Atlas",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
      price: 145.99,
      rating: 4.9,
      reviews: 32,
      category: "Evergreen Trees",
      description: "Stunning blue atlas cedar with unique needle color",
      inStock: true,
      featured: true,
      slug: "blue-atlas-cedar"
    }
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
    <section className="w-full min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Header Section */}
      <div className="relative w-full h-[300px] overflow-hidden">
        <motion.div
          initial={{ scale: 1.3 }}
          animate={{ scale: 1 }}
          transition={{ type: "tween", duration: 1 }}
          className="absolute inset-0 z-0"
        >
          <Image
            src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1200&h=400&fit=crop"
            alt="Popular Products"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        </motion.div>
        
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
            >
              Popular <span className="text-green-400">Products</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", duration: 0.5, delay: 0.1 }}
              className="text-white/90 text-lg max-w-2xl mx-auto"
            >
              Discover our most loved trees and plants, handpicked by our customers
            </motion.p>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="container mx-auto px-5 py-16">
        {/* Stats and Controls */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-center mb-12"
        >
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              Our Bestsellers
            </h2>
            <p className="text-gray-600">
              {popularProducts.length} premium trees and plants available
            </p>
          </div>

          {/* View Toggle */}
          <div className="flex items-center space-x-2 bg-white rounded-lg p-1 shadow-lg">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-2 rounded-md transition-all duration-300 ${
                viewMode === 'grid'
                  ? 'bg-green-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-green-600'
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-md transition-all duration-300 ${
                viewMode === 'list'
                  ? 'bg-green-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-green-600'
              }`}
            >
              List
            </button>
          </div>
        </motion.div>

        {/* Products Slider */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white hover:bg-green-50 border-2 border-green-200 hover:border-green-300 rounded-full p-3 shadow-lg transition-all duration-300 group z-10"
          >
            <IoIosArrowBack size={24} className="text-green-600 group-hover:text-green-700" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white hover:bg-green-50 border-2 border-green-200 hover:border-green-300 rounded-full p-3 shadow-lg transition-all duration-300 group z-10"
          >
            <IoIosArrowForward size={24} className="text-green-600 group-hover:text-green-700" />
          </button>

          {/* Products Container */}
          <div className="overflow-hidden">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className={`grid gap-6 ${
                viewMode === 'grid'
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                  : 'grid-cols-1'
              }`}
            >
              {getCurrentProducts().map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group relative ${
                    viewMode === 'list' ? 'flex flex-row' : ''
                  }`}
                >
                  {/* Product Image */}
                  <div className={`relative overflow-hidden ${
                    viewMode === 'list' ? 'w-48 h-48' : 'h-56'
                  }`}>
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex flex-col space-y-2">
                      {product.featured && (
                        <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                          Featured
                        </span>
                      )}
                      {product.originalPrice && (
                        <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                          Sale
                        </span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="p-2 bg-white rounded-full shadow-lg hover:bg-green-50 transition-colors duration-300 group">
                        <FaHeart className="text-gray-600 hover:text-red-500" />
                      </button>
                      <button className="p-2 bg-white rounded-full shadow-lg hover:bg-green-50 transition-colors duration-300 group">
                        <FaEye className="text-gray-600 hover:text-green-500" />
                      </button>
                    </div>

                    {/* Stock Status */}
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="bg-red-500 text-white px-4 py-2 rounded-full font-medium">
                          Out of Stock
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {/* Product Info */}
                  <div className={`p-6 flex-1 ${viewMode === 'list' ? 'flex flex-col justify-between' : ''}`}>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-green-600 text-sm font-medium bg-green-50 px-2 py-1 rounded">
                          {product.category}
                        </span>
                        <div className="flex items-center space-x-1">
                          {renderStars(product.rating)}
                          <span className="text-gray-500 text-sm ml-1">({product.reviews})</span>
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-800 group-hover:text-green-600 transition-colors duration-300 mb-2">
                        {product.name}
                      </h3>
                      
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {product.description}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-green-600">
                          ${product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-gray-400 line-through">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>
                      
                      <button 
                        className={`flex items-center px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                          product.inStock
                            ? 'bg-green-500 hover:bg-green-600 text-white hover:scale-105 shadow-lg hover:shadow-xl'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                        disabled={!product.inStock}
                      >
                        <FaShoppingCart className="mr-2" />
                        {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center mt-12 space-x-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-green-500 scale-125"
                    : "bg-green-200 hover:bg-green-300"
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
          className="text-center mt-16"
        >
          <Link
            href="/marketplace"
            className="inline-flex items-center bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl group"
          >
            View All Products
            <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default PopularProducts;
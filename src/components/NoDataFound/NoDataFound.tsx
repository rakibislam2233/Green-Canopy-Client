"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaLeaf, FaHome, FaSearch } from "react-icons/fa";

interface NoDataFoundProps {
  message?: string;
  title?: string;
  showHomeButton?: boolean;
  showSearchButton?: boolean;
}

const NoDataFound = ({ 
  message = "No Data Found", 
  title = "Nothing to Show Here",
  showHomeButton = true,
  showSearchButton = false
}: NoDataFoundProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center justify-center py-16 px-8"
    >
      {/* Animated Icon */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative mb-8"
      >
        <div className="w-32 h-32 bg-gradient-to-br from-primary to-emerald-100 rounded-full flex items-center justify-center shadow-lg">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <FaLeaf className="text-5xl text-white" />
          </motion.div>
        </div>
        
        {/* Decorative circles */}
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-200 rounded-full opacity-60"></div>
        <div className="absolute -bottom-3 -left-3 w-6 h-6 bg-emerald-200 rounded-full opacity-40"></div>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-center max-w-md"
      >
        <h3 className="text-2xl font-bold text-gray-800 mb-3">
          {title}
        </h3>
        <p className="text-gray-600 text-lg leading-relaxed mb-8">
          {message}
        </p>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        {showHomeButton && (
          <Link
            href="/"
            className="flex items-center justify-center bg-primary hover:bg-green-600 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl group"
          >
            <FaHome className="mr-2 group-hover:animate-pulse" />
            Go to Home
          </Link>
        )}
        
        {showSearchButton && (
          <Link
            href="/marketplace"
            className="flex items-center justify-center bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-200 hover:border-green-300 px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg group"
          >
            <FaSearch className="mr-2 group-hover:text-primary" />
            Browse Products
          </Link>
        )}
      </motion.div>

      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-green-200 rounded-full"></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-emerald-200 rounded-full"></div>
        <div className="absolute top-1/2 left-1/6 w-16 h-16 bg-teal-200 rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/3 w-20 h-20 bg-green-100 rounded-full"></div>
      </div>
    </motion.div>
  );
};

export default NoDataFound;

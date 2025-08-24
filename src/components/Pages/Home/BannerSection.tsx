"use client";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Leaf,
  TreePine,
  Flower2,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

// Static banner data with beautiful tree/plant themed content
const bannerData = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
    title: "Nurture Nature's Symphony",
    description:
      "Transform your space into a green paradise with our premium collection of exotic plants and sustainable gardening solutions",
    buttonText: "Explore Plants",
    gradient: "from-green-900/70 via-emerald-800/60 to-transparent",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1574263867128-a3d5c1b1debc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    title: "Breathe Life Into Every Corner",
    description:
      "Discover rare species and air-purifying plants that bring tranquility and fresh oxygen to your living spaces",
    buttonText: "Shop Collection",
    gradient: "from-teal-900/70 via-cyan-800/60 to-transparent",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    title: "Grow Your Green Legacy",
    description:
      "Join our sustainable mission to create healthier environments through eco-friendly plants and organic gardening practices",
    buttonText: "Start Growing",
    gradient: "from-forest-900/70 via-green-700/60 to-transparent",
  },
];

const BannerSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto-slide functionality
  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % bannerData.length);
      }, 6000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  const goToPrevious = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + bannerData.length) % bannerData.length
    );
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % bannerData.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  const currentBanner = bannerData[currentIndex];

  return (
    <section className="relative w-full h-screen overflow-hidden bg-gray-900">
      {/* Background Images with Ken Burns Effect */}
      {bannerData.map((banner, index) => (
        <motion.div
          key={banner.id}
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{
            opacity: index === currentIndex ? 1 : 0,
            scale: index === currentIndex ? 1.05 : 1.1,
          }}
          transition={{
            opacity: { duration: 1.2, ease: "easeInOut" },
            scale: { duration: 8, ease: "linear" },
          }}
          style={{
            backgroundImage: `url(${banner.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
      ))}

      {/* Gradient Overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-r ${currentBanner.gradient} transition-all duration-1000`}
      />

      {/* Animated Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-green-300/20"
            initial={{
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 50,
              rotate: 0,
            }}
            animate={{
              y: -50,
              rotate: 360,
              x: Math.random() * window.innerWidth,
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear",
              delay: i * 2,
            }}
          >
            {i % 3 === 0 ? (
              <Leaf size={24} />
            ) : i % 2 === 0 ? (
              <TreePine size={20} />
            ) : (
              <Flower2 size={22} />
            )}
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center text-white px-6 max-w-6xl mx-auto">
        {/* Logo/Brand Animation */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex items-center gap-3 text-2xl font-bold text-green-300">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <TreePine size={32} />
            </motion.div>
            Green Canopy
          </div>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          key={currentIndex}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          initial={{ opacity: 0, y: 100, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{
            type: "spring",
            duration: 1.2,
            bounce: 0.3,
            delay: 0.3,
          }}
        >
          <span className="bg-gradient-to-r from-green-300 via-emerald-200 to-teal-300 bg-clip-text text-transparent">
            {currentBanner.title}
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          key={`desc-${currentIndex}`}
          className="text-xl md:text-2xl text-gray-200 mb-12 max-w-4xl leading-relaxed"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 0.6,
            ease: "easeOut",
          }}
        >
          {currentBanner.description}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col md:flex-row gap-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <motion.button
            className="bg-gradient-to-r from-primary to-emerald-600  text-white font-semibold py-3 px-8 rounded"
          >
            {currentBanner.buttonText}
          </motion.button>

          <motion.button
            className="bg-white/20 backdrop-blur-sm border-2 border-white/30 hover:bg-white/30 text-white font-semibold py-3 px-8 rounded"
          >
            Learn More
          </motion.button>
        </motion.div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 z-30 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 z-30 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
      >
        <ChevronRight size={24} />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex space-x-3">
        {bannerData.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-white scale-125"
                : "bg-white/50 hover:bg-white/75"
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 right-8 z-30 text-white/70 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center"
        >
          <div className="text-xs mb-2">Scroll Down</div>
          <div className="w-px h-8 bg-gradient-to-b from-white/70 to-transparent"></div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default BannerSection;

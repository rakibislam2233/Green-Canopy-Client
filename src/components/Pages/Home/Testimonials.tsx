"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  message: string;
  rating: number;
  image: string;
}

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Static testimonials data for tree selling business
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Homeowner",
      company: "Residential Customer",
      message: "Hort Spec transformed my backyard with beautiful oak trees and fruit trees. Their expert advice on tree placement and care has made my garden the envy of the neighborhood. The trees are thriving and growing beautifully!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Mike Chen",
      role: "Landscape Contractor",
      company: "GreenScape Designs",
      message: "As a professional landscaper, I rely on Hort Spec for quality trees and plants. Their inventory is excellent, prices are competitive, and the trees always arrive in perfect condition. Highly recommended for commercial projects.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      role: "Property Manager",
      company: "Sunset Communities",
      message: "Hort Spec helped us beautify our entire residential complex with native shade trees. Their team was professional, knowledgeable, and completed the project on time. The results exceeded our expectations!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 4,
      name: "David Thompson",
      role: "Garden Enthusiast",
      company: "Home Gardener",
      message: "I've been buying fruit trees from Hort Spec for three years now. Their Japanese maples and apple trees are exceptional quality. The staff is incredibly knowledgeable and always provides helpful growing tips.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 5,
      name: "Lisa Parker",
      role: "Business Owner",
      company: "Riverside Cafe",
      message: "We wanted to create a beautiful outdoor dining space, and Hort Spec delivered perfectly. They provided stunning ornamental trees that create the perfect ambiance for our customers. Great service and beautiful results!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="w-full py-20 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="container mx-auto px-5">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-semibold text-gray-800">
            What Our <span className="text-green-600">Clients Say</span>
          </h2>
          <div className="w-20 h-1 bg-green-500 mx-auto mt-5"></div>
          <p className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto">
            Hear from satisfied customers who have transformed their spaces with our quality trees and expert services
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-primary-100 to-emerald-100 rounded-full -translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-br from-teal-100 to-primary-100 rounded-full translate-x-12 translate-y-12"></div>
            
            {/* Quote icon */}
            <div className="absolute top-6 left-6 text-green-200">
              <FaQuoteLeft size={40} />
            </div>

            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="relative z-10"
            >
              {/* Testimonial Content */}
              <div className="text-center mb-8">
                <p className="text-gray-700 text-lg md:text-xl leading-relaxed mb-6 italic">
                  {testimonials[currentIndex].message}
                </p>
                
                {/* Star Rating */}
                <div className="flex justify-center mb-6">
                  {[...Array(testimonials[currentIndex].rating)].map((_, index) => (
                    <FaStar key={index} className="text-yellow-400 text-xl mx-1" />
                  ))}
                </div>
              </div>

              {/* Client Info */}
              <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                <div className="relative">
                  <Image
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].name}
                    width={80}
                    height={80}
                    className="rounded-full border-4 border-green-200"
                  />
                </div>
                <div className="text-center md:text-left">
                  <h4 className="text-xl font-bold text-gray-800">
                    {testimonials[currentIndex].name}
                  </h4>
                  <p className="text-green-600 font-medium">
                    {testimonials[currentIndex].role}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {testimonials[currentIndex].company}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white hover:bg-green-50 border-2 border-green-200 hover:border-green-300 rounded-full p-3 shadow-lg transition-all duration-300 group"
          >
            <IoIosArrowBack size={24} className="text-green-600 group-hover:text-green-700" />
          </button>
          
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white hover:bg-green-50 border-2 border-green-200 hover:border-green-300 rounded-full p-3 shadow-lg transition-all duration-300 group"
          >
            <IoIosArrowForward size={24} className="text-green-600 group-hover:text-green-700" />
          </button>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
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
    </section>
  );
};

export default Testimonials;
"use client";
import locateImage from "@/assets/markateplace/markateplace.png";
import image from "@/assets/banner/contactus.png";
import { useGetAllServiceQuery } from "@/redux/features/service/serviceApi";
import { motion } from "framer-motion";
import Image from "next/image";

const AboutUs = () => {
  return (
    <section className="w-full">
      {/* Header Section with Background Image */}
      <div className="relative w-full h-[200px] md:h-[300px] overflow-hidden">
        <motion.div
          initial={{ scale: 1.3 }}
          animate={{ scale: 1 }}
          transition={{ type: "tween", duration: 1 }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={locateImage}
            alt="About Us"
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
            About Us
          </motion.h1>
        </div>
      </div>

      {/* Main About Section */}
      <div className="w-full md:container mx-auto px-5 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
              Growing Dreams, One <span className="text-green-600">Tree</span> at a Time
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Since 2020, Hort Spec has been New Jersey&apos;s premier destination for quality trees, expert horticultural guidance, and exceptional service. We&apos;re more than just a nursery – we&apos;re your partners in creating beautiful, sustainable landscapes.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our passion for horticulture drives everything we do. From helping homeowners select the perfect shade tree to assisting landscape professionals with large commercial projects, we bring expertise, quality, and personalized service to every interaction.
            </p>
            
            {/* Key Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              {[
                { icon: "🌱", title: "Expert Guidance", desc: "Professional horticultural advice" },
                { icon: "🏆", title: "Premium Quality", desc: "Hand-selected, healthy trees" },
                { icon: "🤝", title: "Local Support", desc: "Supporting NJ businesses since 2020" },
                { icon: "🌿", title: "Sustainability", desc: "Eco-friendly practices & native species" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <h4 className="font-semibold text-gray-800">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Images */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="relative h-80 rounded-2xl overflow-hidden shadow-xl">
              <Image
                src={image}
                alt="About Hort Spec"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-xl font-semibold">Professional Service</h3>
                <p className="text-sm opacity-90">Expert tree selection & care</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="relative h-40 rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=200&fit=crop"
                  alt="Tree Care"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-40 rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=300&h=200&fit=crop"
                  alt="Fruit Trees"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
        >
          {[
            { number: "500+", label: "Happy Customers" },
            { number: "1000+", label: "Trees Planted" },
            { number: "4+", label: "Years Experience" },
            { number: "24/7", label: "Expert Support" }
          ].map((stat, index) => (
            <div key={index} className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-3xl md:text-4xl font-bold text-green-600 mb-2">{stat.number}</h3>
              <p className="text-gray-600 font-medium">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl"
          >
            <div className="text-green-600 text-4xl mb-4">🎯</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h3>
            <p className="text-gray-600 leading-relaxed">
              To provide exceptional quality trees and expert horticultural services while supporting local businesses and promoting sustainable landscaping practices throughout New Jersey.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="bg-gradient-to-br from-blue-50 to-teal-50 p-8 rounded-2xl"
          >
            <div className="text-blue-600 text-4xl mb-4">👁️</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Vision</h3>
            <p className="text-gray-600 leading-relaxed">
              To be the leading horticultural platform in New Jersey, creating greener communities while empowering local businesses to thrive in the green industry.
            </p>
          </motion.div>
        </div>
      </div>

    </section>
  );
};

export default AboutUs;

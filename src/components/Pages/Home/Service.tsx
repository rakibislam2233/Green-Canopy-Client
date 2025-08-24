"use client";
import NoDataFound from "@/components/NoDataFound/NoDataFound";
import { imageBaseUrl } from "@/config/imageBaseUrl";
import { useGetAllServiceQuery } from "@/redux/features/service/serviceApi";
import { Spin } from "antd";
import Image from "next/image";
import ServiceSkeleton from "./ServiceSkeleton";
import { motion } from "framer-motion";

export interface IService {
  _id: string;
  serviceName: string;
  serviceImage: string;
  serviceDescription: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
const Service = () => {
  // Static services data for tree selling business
  const staticServices: IService[] = [
    {
      _id: "1",
      serviceName: "Tree Consultation",
      serviceImage: "🌳",
      serviceDescription: "Expert advice on tree selection, placement, and care. Our certified arborists help you choose the perfect trees for your landscape needs and conditions.",
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      __v: 0
    },
    {
      _id: "2",
      serviceName: "Professional Planting",
      serviceImage: "🌱",
      serviceDescription: "Professional tree planting services ensuring proper technique, soil preparation, and optimal growing conditions for long-term tree health.",
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      __v: 0
    },
    {
      _id: "3",
      serviceName: "Tree Care & Maintenance",
      serviceImage: "✂️",
      serviceDescription: "Comprehensive tree care including pruning, fertilization, pest control, and health monitoring to keep your trees thriving year-round.",
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      __v: 0
    },
    {
      _id: "4",
      serviceName: "Landscape Design",
      serviceImage: "🎨",
      serviceDescription: "Custom landscape design services incorporating trees, plants, and hardscaping elements to create beautiful, functional outdoor spaces.",
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      __v: 0
    },
    {
      _id: "5",
      serviceName: "Tree Removal & Pruning",
      serviceImage: "🪚",
      serviceDescription: "Safe and professional tree removal, trimming, and pruning services. We handle dangerous or unwanted trees with proper equipment and expertise.",
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      __v: 0
    },
    {
      _id: "6",
      serviceName: "Emergency Tree Services",
      serviceImage: "🚨",
      serviceDescription: "24/7 emergency tree services for storm damage, fallen trees, and urgent tree-related issues. Quick response to protect your property and safety.",
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      __v: 0
    }
  ];

  const {
    data: responseData,
    isLoading,
    isError,
  } = useGetAllServiceQuery(undefined);
  const apiServices = responseData?.data?.attributes?.results;
  
  // Use API data if available, otherwise use static data
  const allServices = (apiServices && apiServices.length > 0) ? apiServices : staticServices;

  let content = null;

  if (isLoading) {
    content = (
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto p-5">
        {Array(6)
          .fill(0)
          .map((_, idx) => (
            <ServiceSkeleton key={idx} />
          ))}
      </div>
    );
  } else {
    content = (
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto p-5">
        {allServices?.map((service: IService, index: number) => {
          return (
            <motion.div
              key={service?._id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group flex flex-col gap-5 items-center px-8 py-10 bg-white border border-gray-100 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden cursor-pointer"
            >
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary to-emerald-100 rounded-bl-full opacity-50 group-hover:opacity-80 transition-opacity duration-300"></div>
              
              <div className="size-20 bg-gradient-to-br from-primary to-emerald-500 shadow-xl flex items-center justify-center rounded-full group-hover:scale-110 transition-transform duration-300 relative z-10">
                {service?.serviceImage?.startsWith('http') || service?.serviceImage?.startsWith('/') ? (
                  <Image
                    width={40}
                    height={40}
                    src={`${imageBaseUrl}${service?.serviceImage}`}
                    alt="serviceImage"
                    className="mx-auto"
                  />
                ) : (
                  <span className="text-3xl" role="img" aria-label={service?.serviceName}>
                    {service?.serviceImage}
                  </span>
                )}
              </div>
              
              <div className="space-y-3 text-center">
                <h3 className="text-xl font-bold text-gray-800 group-hover:text-green-600 transition-colors duration-300">
                  {service?.serviceName}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {service?.serviceDescription
                    .split(" ")
                    .slice(0, 20)
                    .join(" ")}
                  {service?.serviceDescription.split(" ").length > 20 && "..."}
                </p>
              </div>
              
              {/* Hover effect border */}
              <div className="absolute inset-0 border-2 border-green-400 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.div>
          );
        })}
      </div>
    );
  }

  return (
    <section className="w-full p-5 py-16 bg-gradient-to-b from-white to-gray-50">
      {/* Title Section */}
      <motion.div 
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-semibold text-gray-800">
          Our <span className="text-green-600">Services</span>
        </h1>
        <div className="w-20 h-1 bg-green-500 mx-auto mt-5"></div>
        <p className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto">
          Professional horticulture services to help your garden flourish and your business grow
        </p>
      </motion.div>

      {content}
    </section>
  );
};

export default Service;

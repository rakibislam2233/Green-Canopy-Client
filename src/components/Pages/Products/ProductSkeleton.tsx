import Skeleton from "@/components/UI/Skeleton";
import React from "react";

const ProductSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden animate-pulse">
      {/* Image Skeleton */}
      <div className="h-48 bg-gray-300"></div>
      
      {/* Content Skeleton */}
      <div className="p-6">
        {/* Product Name */}
        <Skeleton width="80%" height="1.5rem" className="mb-2" />
        
        {/* Category */}
        <Skeleton width="40%" height="1rem" className="mb-2" />
        
        {/* Description */}
        <Skeleton width="100%" height="1rem" className="mb-1" />
        <Skeleton width="90%" height="1rem" className="mb-4" />
        
        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex gap-1">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="w-4 h-4 bg-gray-300 rounded"></div>
            ))}
          </div>
          <Skeleton width="30%" height="1rem" />
        </div>
        
        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <Skeleton width="40%" height="1.5rem" />
          <Skeleton width="20%" height="1rem" />
        </div>
        
        {/* Button */}
        <Skeleton width="100%" height="3rem" className="rounded-xl" />
      </div>
    </div>
  );
};

export default ProductSkeleton;
import Skeleton from "@/components/UI/Skeleton";
import React from "react";

const MarketplaceSkeleton = () => {
  return (
    <div className="bg-white border rounded-lg flex flex-col justify-between animate-pulse">
      <div className="w-full h-[220px] bg-gray-300 rounded-t-md"></div>
      <div className="px-5 pt-3">
        <Skeleton width="60%" height="1.5rem" className="mb-2" />
        <Skeleton width="40%" height="1rem" />
        <Skeleton width="80%" height="1rem" className="mt-2" />
        <Skeleton width="70%" height="1rem" className="mt-2" />
      </div>
      <div className="px-5 pb-4">
        <div className="flex justify-between items-center mt-3">
          <Skeleton width="30%" height="1.5rem" />
          <Skeleton width="20%" height="1rem" />
        </div>
        <Skeleton width="100%" height="2.5rem" className="mt-4" />
      </div>
    </div>
  );
};

export default MarketplaceSkeleton;

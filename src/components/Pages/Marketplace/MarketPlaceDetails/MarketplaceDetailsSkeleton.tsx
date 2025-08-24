import Skeleton from "@/components/UI/Skeleton";
import React from "react";

const MarketplaceDetailsSkeleton = () => {
  return (
    <div className="flex flex-col md:flex-row gap-10 animate-pulse">
      <div className="w-full md:w-1/2">
        <div className="w-full bg-gray-300 h-[400px] rounded-md"></div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-5 mt-5">
          <Skeleton width="100%" height="7rem" />
          <Skeleton width="100%" height="7rem" />
          <Skeleton width="100%" height="7rem" />
          <Skeleton width="100%" height="7rem" />
        </div>
      </div>
      <div className="w-full md:w-1/2 space-y-4">
        <Skeleton width="100%" height="2rem" />
        <Skeleton width="30%" height="1.5rem" />
        <Skeleton width="100%" height="1rem" />
        <Skeleton width="20%" height="1rem" />
        <Skeleton width="30%" height="1rem" />
        <Skeleton width="20%" height="1rem" />
        <div className="flex gap-4">
          <Skeleton width="20%" height="1.5rem" />
          <Skeleton width="20%" height="1.5rem" />
        </div>
        <Skeleton width="20%" height="1rem" />
        <div className="flex gap-4">
          <Skeleton width="20%" height="1.5rem" />
          <Skeleton width="20%" height="1.5rem" />
        </div>
        <Skeleton width="20%" height="1rem" />
        <div className="flex gap-1">
          <Skeleton width="10%" height="1.5rem" />
          <Skeleton width="10%" height="1.5rem" />
          <Skeleton width="10%" height="1.5rem" />
        </div>
        <div className="flex gap-4">
          <Skeleton width="30%" height="2rem" />
          <Skeleton width="30%" height="2rem" />
        </div>
      </div>
    </div>
  );
};

export default MarketplaceDetailsSkeleton;

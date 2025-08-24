import Skeleton from "@/components/UI/Skeleton";
import React from "react";

const LocateBusinessSkeleton = () => {
  return (
    <div className="w-full bg-white border rounded-lg animate-pulse">
      <div className="w-full flex gap-3 justify-between items-center bg-slate-100 p-6 rounded-t-md">
       <div className="w-full">
       <Skeleton width="40%" height="1.5rem" className="mb-2" />
       </div>
        <div className="w-full flex justify-end items-center gap-2">
          <Skeleton width="10%" height="1rem" />
          <Skeleton width="12%" height="1rem" />
        </div>
      </div>
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 p-6">
        <div className="w-full col-span-full lg:col-span-4 h-64 lg:h-96 bg-gray-300 rounded-lg"></div>
        <div className="w-full col-span-full lg:col-span-8 space-y-5">
          <Skeleton width="50%" height="2rem" />
          <Skeleton width="70%" height="1rem" />
          <Skeleton width="90%" height="1rem" />
          <Skeleton width="60%" height="1rem" />
          <div className="flex gap-5">
            {[...Array(5)].map((_, index) => (
              <Skeleton
                key={index}
                width="100px"
                height="100px"
                className="rounded-lg"
              />
            ))}
          </div>
          <div className="flex flex-col md:flex-row gap-8 mt-5">
            <div className="space-y-2">
              {[...Array(4)].map((_, index) => (
                <Skeleton key={index} width="60%" height="1rem" />
              ))}
            </div>
            <div className="space-y-2">
              {[...Array(3)].map((_, index) => (
                <Skeleton key={index} width="60%" height="1rem" />
              ))}
            </div>
          </div>
          <div className="flex justify-end">
            <Skeleton width="120px" height="2.5rem" className="rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocateBusinessSkeleton;

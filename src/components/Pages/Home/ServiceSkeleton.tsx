import Skeleton from "@/components/UI/Skeleton";
import React from "react";

const ServiceSkeleton = () => {
  return (
    <div className="flex flex-col gap-5 items-center px-12 py-8 border md:relative rounded-lg">
      <div className="size-16 bg-gray-200 shadow-xl flex items-center justify-center rounded-full -left-0 md:-left-8 top-0 md:top-10 md:absolute">
       
      </div>
      <div className="space-y-2 w-full text-center">
        <Skeleton width="75%" height="1.5rem" className="mx-auto" />
        <Skeleton width="85%" height="1rem" className="mx-auto" />
        <Skeleton width="65%" height="1rem" className="mx-auto" />
      </div>
    </div>
  );
};

export default ServiceSkeleton;

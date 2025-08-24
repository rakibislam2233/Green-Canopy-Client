import Skeleton from '@/components/UI/Skeleton'
import React from 'react'

const PopularCategorySkeleton = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="size-28 md:size-32 mx-auto overflow-hidden rounded-full flex justify-center items-center relative bg-gray-300 animate-pulse"></div>
      <Skeleton width="60%" height="1.2rem" className="mt-4 mx-auto" />
    </div>
  )
}

export default PopularCategorySkeleton
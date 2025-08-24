import { imageBaseUrl } from "@/config/imageBaseUrl";
import { IProductImage } from "@/types/productType";
import Image from "next/image";
import React from "react";

export const Thumb = ({
  selected,
  index,
  onClick,
  productImages,
}: {
  selected: boolean;
  index: number;
  onClick: () => void;
  productImages: IProductImage[];
}) => {
  return (
    <div className="flex-shrink-0 w-[22%] md:w-[25%] xl:w-[15%]">
      <Image
        onClick={onClick}
        src={`${imageBaseUrl}${productImages[index]?.imageUrl}`}
        width={200}
        height={200}
        className={`w-full h-20 md:h-24 object-cover cursor-pointer rounded-lg 
          ${selected ? "border-2 border-primary" : "border-2 border-gray-200"}
          shadow-md`}
        alt={`Thumbnail ${index}`}
      />
    </div>
  );
};

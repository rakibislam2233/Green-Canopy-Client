import { imageBaseUrl } from "@/config/imageBaseUrl";
import { ICompanyImage } from "@/types/companyTyes";
import Image from "next/image";
import React from "react";

export const LocateCarouselThumbsButton = ({
  selected,
  index,
  onClick,
  locateImages,
}: {
  selected: boolean;
  index: number;
  onClick: () => void;
  locateImages: ICompanyImage[];
}) => {
  return (
    <div className="flex-shrink-0 w-[30%]">
      <Image
        onClick={onClick}
        src={`${imageBaseUrl}${locateImages[index]?.imageUrl}`}
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

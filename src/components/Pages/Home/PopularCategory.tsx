"use client";
import { useGetAllCategoryQuery } from "@/redux/features/category/categoryApi";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Image from "next/image"; // Optional for optimized images
import { imageBaseUrl } from "@/config/imageBaseUrl";
import Link from "next/link";
import { useRef } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import PopularCategorySkeleton from "./PopularCategorySkeleton";

export interface ICategory {
  _id: number;
  categoryName: string;
  categoryImage: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const PopularCategory = () => {
  const { data: responseData, isLoading } = useGetAllCategoryQuery(undefined);
  const categoryData = responseData?.data?.attributes?.results;

  // Slick settings for auto slide and responsive behavior
  const settings = {
    infinite: true,
    speed: 500,
    arrows: false, // Disable default arrows, we'll create custom ones
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000, // Increased for better viewing
    pauseOnHover: true, // Pause on hover for better user experience
    pauseOnFocus: true, // Pause when focused
    dots: false,
    cssEase: "ease-in-out", // Smoother animation
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          autoplaySpeed: 3500,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          autoplaySpeed: 3000,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplaySpeed: 2500,
        },
      },
    ],
  };

  // Create a ref for the slider instance
  const sliderRef = useRef<Slider | null>(null);

  // Function to go to the next slide
  const goToNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  // Function to go to the previous slide
  const goToPrev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  return (
    <section className="w-full p-5 py-16 z-0 relative bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Title Section */}
      <div className="text-center mb-12">
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-semibold text-gray-800">
          Popular <span className="text-green-600">Categories</span>
        </h1>
        <div className="w-20 h-1 bg-green-500 mx-auto mt-5"></div>
        <p className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto">
          Discover our wide variety of trees and plants, carefully categorized for your gardening needs
        </p>
      </div>

      <div className="w-full container mx-auto">
        <div className="relative">
          {/* Custom Previous Button */}
          <button
            className=" size-10 absolute left-0 top-1/2 transform -translate-y-1/2 bg-primary text-white p-2 rounded-full z-10"
            onClick={goToPrev}
          >
            <IoIosArrowBack size={24} />
          </button>

          {isLoading ? (
            <Slider {...settings} ref={sliderRef}>
              {Array(4)
                .fill(0)
                .map((_, idx) => (
                  <PopularCategorySkeleton key={idx} />
                ))}
            </Slider>
          ) : (
            <Slider {...settings} ref={sliderRef}>
              {categoryData?.map((category: ICategory, index: number) => (
                <div
                  key={index}
                  className="w-full flex flex-col items-center justify-center group"
                >
                  <Link
                    href={`/marketplace?categoryName=${category?.categoryName}`}
                  >
                    <div className="size-28 md:size-32 mx-auto overflow-hidden rounded-full flex justify-center items-center relative group-hover:scale-110 transition-transform duration-300 shadow-lg group-hover:shadow-xl">
                      <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-emerald-500/20 rounded-full group-hover:from-green-400/30 group-hover:to-emerald-500/30 transition-all duration-300"></div>
                      <Image
                        src={`${imageBaseUrl}${category?.categoryImage}`}
                        alt={category?.categoryName}
                        fill
                        className="object-cover rounded-full"
                      />
                    </div>
                  </Link>
                  <p className="category-name mt-4 text-center font-medium text-gray-700 group-hover:text-green-600 transition-colors duration-300">
                    {category?.categoryName}
                  </p>
                </div>
              ))}
            </Slider>
          )}

          {/* Custom Next Button */}
          <button
            className="size-10 rounded-full absolute right-0 top-1/2 transform -translate-y-1/2 bg-primary text-white p-2 z-10"
            onClick={goToNext}
          >
            <IoIosArrowForward size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default PopularCategory;

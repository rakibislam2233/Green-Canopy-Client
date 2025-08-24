"use client";
import SearchSection from "../Home/SearchSection";
import Image from "next/image";
import locateImage from "@/assets/locate/locate.png";
import LocateBusinessCard from "./LocateBusinessCard";
import React, { useState, useEffect } from "react";
import { useGetAllCompanyQuery } from "@/redux/features/company/companyApi";
import { ICompany } from "@/types/horticultureType";
import NoDataFound from "@/components/NoDataFound/NoDataFound";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { Pagination } from "antd";
import LocateBusinessSkeleton from "./LocateBusinessSkeleton";

const Locate: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [userLocation, setUserLocation] = useState<{
    latitude: number | null;
    longitude: number | null;
  }>({ latitude: null, longitude: null });
  const [locationError, setLocationError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get search parameters from URL
  const searchTerm = searchParams.get("searchTerm");
  const companyType = searchParams.get("companyType");
  const city = searchParams.get("city");
  const state = searchParams.get("state");
  const zipCode = searchParams.get("zipCode");
  const country = searchParams.get("country");
  const nearby = searchParams.get("nearby");

  // Get user location when nearby is enabled
  useEffect(() => {
    if (nearby) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setUserLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
            setLocationError(null);
          },
          (error) => {
            setLocationError("Unable to retrieve your location");
            console.error("Geolocation error:", error);
          }
        );
      } else {
        setLocationError("Geolocation is not supported by your browser");
      }
    }
  }, [nearby]);

  const {
    data: responseData,
    isLoading,
    isError,
    refetch,
  } = useGetAllCompanyQuery({
    page: currentPage,
    searchTerm,
    city,
    state,
    zipCode,
    country,
    companyType,
    latitude:
      nearby && userLocation.latitude ? userLocation.latitude : undefined,
    longitude:
      nearby && userLocation.longitude ? userLocation.longitude : undefined,
    radius: nearby || undefined
  });

  const horticultureData = responseData?.data?.attributes?.results;
  const totalResults = responseData?.data?.attributes?.totalResults;

  // Trigger refetch when search parameters change
  useEffect(() => {
    refetch();
  }, [
    searchTerm,
    currentPage,
    refetch,
    companyType,
    city,
    state,
    zipCode,
    country,
    nearby,
    userLocation.latitude,
    userLocation.longitude,
  ]);

  // Pagination handle function
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (values: Record<string, any>) => {
    const {
      search,
      isMarketplace,
      companyType,
      city,
      state,
      zipCode,
      country,
      nearby,
    } = values;

    if (isMarketplace) {
      router.push(`/marketplace?searchTerm=${search}`);
      return;
    }

    const queryParams: Record<string, string> = {};

    if (search) queryParams.searchTerm = search;
    if (companyType) queryParams.companyType = companyType;
    if (city) queryParams.city = city;
    if (zipCode) queryParams.zipCode = zipCode;
    if (state) queryParams.state = state;
    if (country) queryParams.country = country;
    if (nearby) queryParams.nearby = nearby; // radius value (e.g., "10" for 10 miles/km)

    const queryString = new URLSearchParams(queryParams).toString();
    router.push(`/locate?${queryString}`);
  };

  let content = null;

  if (isLoading) {
    content = (
      <div className="flex flex-col gap-6">
        {[...Array(5)].map((_, index) => (
          <LocateBusinessSkeleton key={index} />
        ))}
      </div>
    );
  } else if (locationError) {
    content = (
      <div className="text-red-500 text-center py-10">{locationError}</div>
    );
  } else if (!isLoading && !isError && horticultureData?.length === 0) {
    content = <NoDataFound />;
  } else if (!isLoading && !isError && horticultureData?.length > 0) {
    content = (
      <>
        {/* Locate a Business Cards */}
        <div className="flex flex-col gap-6">
          {horticultureData?.map((company: ICompany, index: number) => (
            <LocateBusinessCard key={index} item={company} />
          ))}
        </div>
      </>
    );
  }

  console.log(userLocation)

  return (
    <section className="w-full">
      {/* Header Section with Background Image */}
      <div className="relative w-full h-[200px] md:h-[300px] overflow-hidden">
        <motion.div
          initial={{ scale: 1.3 }}
          animate={{ scale: 1 }}
          transition={{ type: "tween", duration: 1 }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={locateImage}
            alt="PrivacyPolicy"
            layout="fill"
            objectFit="cover"
            quality={100}
            className="absolute inset-0 z-0"
          />
          <div className="absolute inset-0 bg-black opacity-30"></div>
        </motion.div>
        <div className="relative z-10 flex items-center justify-center h-full text-center text-white px-5">
          <motion.h1
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="text-3xl md:text-4xl lg:text-5xl font-semibold"
          >
            Locate a Business
          </motion.h1>
        </div>
      </div>

      {/* Search Section */}
      <SearchSection
        onSearch={handleSearch}
        initialIsMarketplace={false}
      />

      {/* Main Content Section */}
      <div className="w-full md:container py-10 px-5">
        {content}
        {/* Pagination */}
        <div className="flex justify-between items-center mt-20">
          <h1 className="text-xl font-semibold text-gray-600">
            Search Results
          </h1>
          <Pagination
            current={currentPage}
            total={totalResults}
            pageSize={10}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </section>
  );
};

export default Locate;

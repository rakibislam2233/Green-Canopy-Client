import { useLoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import {
  FaStar,
  FaRegStar,
  FaPhone,
  FaGlobe,
  FaLandmark,
  FaMailBulk,
  FaMapMarkerAlt,
  FaCity,
} from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import Link from "next/link";
import Loading from "@/components/Loading/Loading";
import { ICompany } from "@/types/horticultureType";
import { imageBaseUrl } from "@/config/imageBaseUrl";
import { Image as AntImage } from "antd";
import { BiBuildingHouse } from "react-icons/bi";
import { IoEarth } from "react-icons/io5";
import Image from "next/image";

const LocateBusinessCard = ({ item }: { item: ICompany }) => {
  const maxStars: number = 5;

  // Load Google Maps API
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: ["places"],
  });

  if (!isLoaded) return <Loading />;
  const handleMarkerIcon = () => {
    if (typeof window !== "undefined" && window.google) {
      return new window.google.maps.Size(40, 40);
    }
    return null; // Fallback in case google maps is not available
  };
  return (
    <div className="w-full bg-white border rounded-lg">
      <div className="flex flex-wrap gap-3 justify-between items-center bg-slate-100 p-6 rounded-t-md">
        <h1 className="text-xl font-semibold text-gray-600">
          {item?.companyName}
        </h1>
        <div className="flex items-center gap-2">
          <span className="text-lg text-gray-600">
            {item?.avgRating} Rating
          </span>
          {/* Render the rating as stars */}
          {[...Array(maxStars)].map((_, index) => (
            <span key={index}>
              {index < Math.floor(item?.avgRating) ? (
                <FaStar className="text-yellow-400" size={18} />
              ) : (
                <FaRegStar className="text-yellow-400" size={18} />
              )}
            </span>
          ))}
        </div>
      </div>
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 p-6">
        {/* Google Map Embed */}
        <div className="w-full col-span-full lg:col-span-4 h-64 lg:h-96 relative rounded-lg overflow-hidden">
          <GoogleMap
            zoom={15}
            center={{
              lat: item?.companyLocation?.coordinates?.[1] ?? 0,
              lng: item?.companyLocation?.coordinates?.[0] ?? 0,

            }}
            mapContainerStyle={{
              width: "100%",
              height: "100%",
            }}
          >
            <Marker
              position={{
                lat: item?.companyLocation?.coordinates?.[1] ?? 0,
                lng: item?.companyLocation?.coordinates?.[0] ?? 0,

              }}
              icon={{
                url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png", // Red marker icon
                scaledSize: handleMarkerIcon(), // Ensuring the size is applied only when google is available
              }}
            />
          </GoogleMap>
        </div>
        <div className="w-full col-span-full lg:col-span-8 space-y-5">
          <div className="flex flex-wrap gap-10 items-center">
            <div className="flex items-center gap-2">
              {item?.authorId?.subscription?.icon && (
                <Image
                  src={`${imageBaseUrl}${item?.authorId?.subscription?.icon}`}
                  alt={item?.companyName}
                  width={50}
                  height={50}
                  className="rounded-full"
                />
              )}
              <Link href={`/locate/${item?.slug}`}>
                <h1 className="text-xl md:text-3xl hover:underline hover:text-primary">
                  {item.companyName}
                </h1>
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <BiBuildingHouse className="text-primary size-5" />
              <p>{item?.companyType}</p>
            </div>
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-primary" />
              <p>{item?.companyInformation?.address}</p>
            </div>
          </div>
          <h1 className="break-words max-w-full">{item?.companyAbout}</h1>
          {/* Photo Thumbnails */}
          <div className="flex flex-wrap gap-5 mt-3">
            {item?.companyImages?.slice(0, 5)?.map((photo, index) => (
              <AntImage
                key={index + 1}
                src={`${imageBaseUrl}${photo?.imageUrl}`}
                alt={`Photo ${index + 1} of ${item?.companyName}`}
                height={100}
                width={100}
                className="rounded-lg absolute"
              />
            ))}
          </div>
          <div className="flex flex-col md:flex-row gap-8 mt-5">
            <div className="space-y-2">
              {item?.companyInformation?.contactNumber && (
                <p className="flex items-center gap-2">
                  <FaPhone className="text-primary" />{" "}
                  {item.companyInformation.contactNumber}
                </p>
              )}
              {item?.companyInformation?.website && (
                <p className="flex items-center gap-2">
                  <FaGlobe className="text-primary" />{" "}
                  <a
                    href={item.companyInformation.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600"
                  >
                    {item.companyInformation.website}
                  </a>
                </p>
              )}
              {item?.companyInformation?.email && (
                <p className="flex items-center gap-2">
                  <SiGmail className="text-primary" />{" "}
                  {item.companyInformation.email}
                </p>
              )}
              {item?.companyInformation?.country && (
                <p className="flex items-center gap-2 text-gray-500">
                  <IoEarth className="text-primary" />{" "}
                  {item.companyInformation.country}
                </p>
              )}
            </div>
            <div className="space-y-2">
              {/* Render address, city, state, and zipCode only if available */}
              {item?.companyInformation?.city && (
                <p className="flex items-center gap-2 text-gray-500">
                  <FaCity className="text-primary" />{" "}
                  {item.companyInformation.city}
                </p>
              )}
              {item?.companyInformation?.state && (
                <p className="flex items-center gap-2 text-gray-500">
                  <FaLandmark className="text-primary" />{" "}
                  {item.companyInformation.state}
                </p>
              )}
              {item?.companyInformation?.zipCode && (
                <p className="flex items-center gap-2 text-gray-500">
                  <FaMailBulk className="text-primary" />{" "}
                  {item.companyInformation.zipCode}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end items-center">
            <Link href={`/locate/${item?.slug}`}>
              <button className="px-8 text-white py-2.5 bg-secondary rounded-lg shadow-md hover:bg-yellow-500 transition ">
                More Info
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocateBusinessCard;

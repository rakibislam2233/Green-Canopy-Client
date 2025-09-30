import Loading from "@/components/Loading/Loading";
import { imageBaseUrl } from "@/config/imageBaseUrl";
import { ICompany } from "@/types/company";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { Image as AntImage } from "antd";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { BiBuildingHouse } from "react-icons/bi";
import {
  FaEnvelope,
  FaExternalLinkAlt,
  FaGlobe,
  FaMapMarkerAlt,
  FaPhone,
  FaRegStar,
  FaStar
} from "react-icons/fa";
import { IoEarth } from "react-icons/io5";

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
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      {/* Header Section */}
      <div className="bg-gradient-to-r from-primary to-green-600 p-6">
        <div className="flex flex-wrap gap-3 justify-between items-start">
          <div className="flex-1">
            <Link href={`/locate/${item?.slug}`}>
              <h1 className="text-2xl font-bold text-white hover:text-gray-100 transition-colors cursor-pointer">
                {item?.companyName}
              </h1>
            </Link>
            <div className="flex items-center gap-2 mt-2">
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-white/20 text-white text-sm rounded-full">
                <BiBuildingHouse size={14} />
                {item?.companyType}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1 mb-1">
              {[...Array(maxStars)].map((_, index) => (
                <span key={index}>
                  {index < Math.floor(item?.avgRating || 0) ? (
                    <FaStar className="text-yellow-300" size={16} />
                  ) : (
                    <FaRegStar className="text-yellow-300" size={16} />
                  )}
                </span>
              ))}
            </div>
            <span className="text-white/90 text-sm">
              {item?.avgRating || 0} Rating
            </span>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Google Map Embed */}
          <div className="col-span-full lg:col-span-6">
            <div className="w-full h-full relative rounded-xl overflow-hidden border border-gray-200">
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
                options={{
                  styles: [
                    {
                      featureType: "poi",
                      elementType: "labels",
                      stylers: [{ visibility: "off" }]
                    }
                  ]
                }}
              >
                <Marker
                  position={{
                    lat: item?.companyLocation?.coordinates?.[1] ?? 0,
                    lng: item?.companyLocation?.coordinates?.[0] ?? 0,
                  }}
                  icon={{
                    url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
                    scaledSize: handleMarkerIcon(),
                  }}
                />
              </GoogleMap>
            </div>
          </div>
          
          {/* Business Information */}
          <div className="col-span-full lg:col-span-6 space-y-6">
            {/* Business Overview */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                {item?.authorId?.image && (
                  <Image
                    src={item.authorId.image.startsWith('http') ? item.authorId.image : `${imageBaseUrl}${item.authorId.image}`}
                    alt={item?.authorId?.fullName || item?.companyName}
                    width={60}
                    height={60}
                    className="rounded-full border-2 border-gray-200"
                  />
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <FaMapMarkerAlt className="text-primary" />
                    <span className="text-sm font-medium">
                      {item?.companyInformation?.address}, {item?.companyInformation?.city}, {item?.companyInformation?.state}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* Description */}
            <div className="space-y-3">
              <p className="text-gray-700 leading-relaxed line-clamp-3">
                {item?.companyAbout}
              </p>
              
              {/* Photo Thumbnails */}
              {item?.companyImages && item.companyImages.length > 0 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {item.companyImages.slice(0, 3).map((image, index) => (
                    <div key={index} className="flex-shrink-0">
                      <AntImage
                        src={image.imageUrl.startsWith('http') ? image.imageUrl : `${imageBaseUrl}${image.imageUrl}`}
                        alt={`${item?.companyName} - ${index + 1}`}
                        height={80}
                        width={80}
                        className="rounded-lg border border-gray-200"
                        preview={{
                          mask: <div className="bg-black/20 flex items-center justify-center text-white text-xs">View</div>
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                {item?.companyInformation?.contactNumber && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <FaPhone className="text-primary text-sm" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Phone</p>
                      <p className="text-sm font-medium text-gray-800">{item.companyInformation.contactNumber}</p>
                    </div>
                  </div>
                )}
                {item?.companyInformation?.email && (
                  <div className="flex items-center gap-3 p-3 overflow-hidden text-ellipsis bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex-shrink-0 flex items-center justify-center">
                      <FaEnvelope className="text-primary text-sm" />
                    </div>
                    <div className="text-ellipsis">
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="text-sm font-medium text-gray-800 text-ellipsis">{item.companyInformation.email}</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="space-y-3">
                {item?.companyInformation?.website && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <FaGlobe className="text-primary text-sm" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500">Website</p>
                      <a
                        href={item.companyInformation.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1"
                      >
                        Visit Website
                        <FaExternalLinkAlt size={10} />
                      </a>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <IoEarth className="text-primary text-sm" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Location</p>
                    <p className="text-sm font-medium text-gray-800">
                      {item?.companyInformation?.zipCode}, {item?.companyInformation?.country}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2">
                {/* Social media links would be added here if available in ICompany interface */}
                <span className="text-sm text-gray-500">Connect with us</span>
              </div>
              <Link href={`/locate/${item?.slug}`}>
                <button className="px-6 py-2.5 bg-gradient-to-r from-primary to-green-600 text-white font-medium rounded-lg shadow-md hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-200 flex items-center gap-2">
                  View Details
                  <FaExternalLinkAlt size={12} />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LocateBusinessCard;

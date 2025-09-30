"use client";
import locateImage from "@/assets/locate/locate.png";
import NoDataFound from "@/components/NoDataFound/NoDataFound";
import { useGetAllCompanyQuery } from "@/redux/features/company/companyApi";
import { ICompany } from "@/types/company";
import { Pagination } from "antd";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { FaLocationArrow, FaMapMarkerAlt } from "react-icons/fa";
import LocateBusinessCard from "./LocateBusinessCard";
import LocateBusinessSkeleton from "./LocateBusinessSkeleton";
import LocateFilters from "./LocateFilters";

interface LocateFilterOptions {
  search: string;
  companyType: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  sortBy: string;
}

const Locate: React.FC = () => {
  const [allCompaniesData, setAllCompaniesData] = useState<ICompany[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [userLocation, setUserLocation] = useState<{
    latitude: number | null;
    longitude: number | null;
  }>({ latitude: null, longitude: null });
  const [locationError, setLocationError] = useState<string | null>(null);
  const [filters, setFilters] = useState<LocateFilterOptions>({
    search: "",
    companyType: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    sortBy: "name",
  });
  
  const itemsPerPage = 10;
  const router = useRouter();
  const searchParams = useSearchParams();

  // Static companies data for demo purposes
  const staticCompanies: ICompany[] = [
    {
      _id: "1",
      companyName: "Green Valley Nursery",
      companyAbout: "Premium tree nursery specializing in native and ornamental trees for New Jersey landscapes.",
      companyType: "Nursery",
      companyLocation: {
        type: "Point",
        coordinates: [-74.6591, 40.3573] // Princeton, NJ coordinates
      },
      companyInformation: {
        companyDescription: "Premium tree nursery specializing in native and ornamental trees for New Jersey landscapes.",
        contactNumber: "(555) 123-4567",
        email: "info@greenvalleynursery.com",
        website: "https://greenvalleynursery.com",
        address: "123 Garden Lane",
        city: "Princeton",
        state: "New Jersey",
        zipCode: "08540",
        country: "United States"
      },
      authorId: {
        _id: "auth1",
        fullName: "John Smith",
        email: "john@greenvalley.com",
        role: "owner",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        subscription: {
          _id: "sub1",
          name: "Premium",
          icon: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=50&h=50&fit=crop"
        }
      },
      companyImages: [{
        imageUrl: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop",
        file: {}
      }],
      avgRating: 4.5,
      slug: "green-valley-nursery",
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      _id: "2",
      companyName: "Oak Tree Landscaping",
      companyAbout: "Professional landscaping services with expertise in tree planting, maintenance, and design.",
      companyType: "Landscaping Service",
      companyLocation: {
        type: "Point",
        coordinates: [-74.7429, 40.2206] // Trenton, NJ coordinates
      },
      companyInformation: {
        companyDescription: "Professional landscaping services with expertise in tree planting, maintenance, and design.",
        contactNumber: "(555) 234-5678",
        email: "contact@oaktreelandscaping.com",
        website: "https://oaktreelandscaping.com",
        address: "456 Maple Avenue",
        city: "Trenton",
        state: "New Jersey",
        zipCode: "08611",
        country: "United States"
      },
      authorId: {
        _id: "auth2",
        fullName: "Sarah Johnson",
        email: "sarah@oaktree.com",
        role: "owner",
        image: "https://images.unsplash.com/photo-1494790108755-2616b612b3c4?w=150&h=150&fit=crop&crop=face",
        subscription: {
          _id: "sub2",
          name: "Standard",
          icon: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=50&h=50&fit=crop"
        }
      },
      companyImages: [{
        imageUrl: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=300&fit=crop",
        file: {}
      }],
      avgRating: 4.2,
      slug: "oak-tree-landscaping",
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      _id: "3",
      companyName: "Evergreen Garden Center",
      companyAbout: "Full-service garden center offering trees, plants, gardening supplies, and expert advice.",
      companyType: "Garden Center",
      companyLocation: {
        type: "Point",
        coordinates: [-74.1724, 40.7357] // Newark, NJ coordinates
      },
      companyInformation: {
        companyDescription: "Full-service garden center offering trees, plants, gardening supplies, and expert advice.",
        contactNumber: "(555) 345-6789",
        email: "help@evergreengarden.com",
        website: "https://evergreengarden.com",
        address: "789 Pine Street",
        city: "Newark",
        state: "New Jersey",
        zipCode: "07102",
        country: "United States"
      },
      authorId: {
        _id: "auth3",
        fullName: "Mike Wilson",
        email: "mike@evergreen.com",
        role: "owner",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        subscription: {
          _id: "sub3",
          name: "Premium",
          icon: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=50&h=50&fit=crop"
        }
      },
      companyImages: [{
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
        file: {}
      }],
      avgRating: 4.8,
      slug: "evergreen-garden-center",
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      _id: "4",
      companyName: "Heritage Tree Service",
      companyAbout: "Professional tree care services including pruning, removal, health assessments, and emergency services.",
      companyType: "Tree Service",
      companyLocation: {
        type: "Point",
        coordinates: [-75.1196, 39.9259] // Camden, NJ coordinates
      },
      companyInformation: {
        companyDescription: "Professional tree care services including pruning, removal, health assessments, and emergency services.",
        contactNumber: "(555) 456-7890",
        email: "service@heritagetreeservice.com",
        website: "https://heritagetreeservice.com",
        address: "321 Cedar Road",
        city: "Camden",
        state: "New Jersey",
        zipCode: "08101",
        country: "United States"
      },
      authorId: {
        _id: "auth4",
        fullName: "David Brown",
        email: "david@heritage.com",
        role: "owner",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
        subscription: {
          _id: "sub4",
          name: "Standard",
          icon: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=50&h=50&fit=crop"
        }
      },
      companyImages: [{
        imageUrl: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&h=300&fit=crop",
        file: {}
      }],
      avgRating: 4.3,
      slug: "heritage-tree-service",
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      _id: "5",
      companyName: "Bloom & Grow Greenhouse",
      companyAbout: "Modern greenhouse facility specializing in growing healthy saplings and providing horticultural consulting.",
      companyType: "Greenhouse",
      companyLocation: {
        type: "Point",
        coordinates: [-74.0776, 40.7282] // Jersey City, NJ coordinates
      },
      companyInformation: {
        companyDescription: "Modern greenhouse facility specializing in growing healthy saplings and providing horticultural consulting.",
        contactNumber: "(555) 567-8901",
        email: "info@bloomgrowgreenhouse.com",
        website: "https://bloomgrowgreenhouse.com",
        address: "654 Greenhouse Way",
        city: "Jersey City",
        state: "New Jersey",
        zipCode: "07302",
        country: "United States"
      },
      authorId: {
        _id: "auth5",
        fullName: "Lisa Garcia",
        email: "lisa@bloomgrow.com",
        role: "owner",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        subscription: {
          _id: "sub5",
          name: "Premium",
          icon: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=50&h=50&fit=crop"
        }
      },
      companyImages: [{
        imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop",
        file: {}
      }],
      avgRating: 4.6,
      slug: "bloom-grow-greenhouse",
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  // Fetch companies from API
  const {
    data: responseData,
    isLoading,
  } = useGetAllCompanyQuery({
    page: 1,
    limit: 50,
  });

  // Get the list of companies from the API response
  const results = responseData?.data?.attributes?.results;

  // Use API data if available, otherwise use static data
  const companiesToShow = (results && results.length > 0) ? results : staticCompanies;

  // Initialize companies data
  useEffect(() => {
    setAllCompaniesData(companiesToShow);
  }, [companiesToShow]);

  // Initialize filters from URL params
  useEffect(() => {
    const searchTerm = searchParams.get("searchTerm") || "";
    const companyType = searchParams.get("companyType") || "";
    const city = searchParams.get("city") || "";
    const state = searchParams.get("state") || "";
    const zipCode = searchParams.get("zipCode") || "";
    const country = searchParams.get("country") || "";
    
    setFilters(prev => ({
      ...prev,
      search: searchTerm,
      companyType: companyType,
      city: city,
      state: state,
      zipCode: zipCode,
      country: country,
    }));
  }, [searchParams]);

  // Apply filters and sorting to companies
  const filteredAndSortedCompanies = useMemo(() => {
    let filtered = [...allCompaniesData];

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(company => 
        company.companyName.toLowerCase().includes(searchLower) ||
        company.companyAbout.toLowerCase().includes(searchLower) ||
        company.companyType.toLowerCase().includes(searchLower) ||
        company.companyInformation.city?.toLowerCase().includes(searchLower) ||
        company.companyInformation.state?.toLowerCase().includes(searchLower)
      );
    }

    // Apply company type filter
    if (filters.companyType && filters.companyType !== "All Types") {
      filtered = filtered.filter(company => company.companyType === filters.companyType);
    }

    // Apply location filters
    if (filters.city) {
      filtered = filtered.filter(company => 
        company.companyInformation.city?.toLowerCase().includes(filters.city.toLowerCase())
      );
    }
    
    if (filters.state) {
      filtered = filtered.filter(company => 
        company.companyInformation.state?.toLowerCase().includes(filters.state.toLowerCase())
      );
    }
    
    if (filters.zipCode) {
      filtered = filtered.filter(company => 
        company.companyInformation.zipCode?.includes(filters.zipCode)
      );
    }
    
    if (filters.country) {
      filtered = filtered.filter(company => 
        company.companyInformation.country?.toLowerCase().includes(filters.country.toLowerCase())
      );
    }

    // Apply sorting
    switch (filters.sortBy) {
      case "name":
        filtered.sort((a, b) => a.companyName.localeCompare(b.companyName));
        break;
      case "name-desc":
        filtered.sort((a, b) => b.companyName.localeCompare(a.companyName));
        break;
      case "location":
        filtered.sort((a, b) => `${a.companyInformation.city}, ${a.companyInformation.state}`.localeCompare(`${b.companyInformation.city}, ${b.companyInformation.state}`));
        break;
      case "type":
        filtered.sort((a, b) => a.companyType.localeCompare(b.companyType));
        break;
      case "newest":
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case "oldest":
        filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      default:
        break;
    }

    return filtered;
  }, [allCompaniesData, filters]);

  // Paginate companies
  const paginatedCompanies = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredAndSortedCompanies.slice(startIndex, endIndex);
  }, [filteredAndSortedCompanies, currentPage, itemsPerPage]);

  const handleFiltersChange = (newFilters: LocateFilterOptions) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
    
    // Update URL params
    const params = new URLSearchParams();
    if (newFilters.search) params.set("searchTerm", newFilters.search);
    if (newFilters.companyType) params.set("companyType", newFilters.companyType);
    if (newFilters.city) params.set("city", newFilters.city);
    if (newFilters.state) params.set("state", newFilters.state);
    if (newFilters.zipCode) params.set("zipCode", newFilters.zipCode);
    if (newFilters.country) params.set("country", newFilters.country);
    
    const newUrl = params.toString() ? `?${params.toString()}` : "";
    router.push(`/locate${newUrl}`, { scroll: false });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Set loading, error, and no data content
  let content: React.ReactNode = null;

  if (isLoading && allCompaniesData.length === 0) {
    content = (
      <div className="flex flex-col gap-6">
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <LocateBusinessSkeleton key={index} />
          ))}
      </div>
    );
  } else if (locationError) {
    content = (
      <div className="text-red-500 text-center py-10">{locationError}</div>
    );
  } else if (paginatedCompanies.length === 0) {
    content = <NoDataFound />;
  } else {
    content = (
      <div className="flex flex-col gap-6">
        {paginatedCompanies.map((company: ICompany, index: number) => (
          <LocateBusinessCard key={company._id} item={company} />
        ))}
      </div>
    );
  }

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
            alt="Locate Business"
            fill
            className="object-cover"
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

      {/* Main Content */}
      <div className="w-full max-w-7xl mx-auto px-5 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar - Filters */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <LocateFilters 
              onFiltersChange={handleFiltersChange}
              initialFilters={filters}
            />
          </div>

          {/* Right Content Area */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {filteredAndSortedCompanies.length} Businesses Found
                </h2>
                {filters.search && (
                  <p className="text-gray-600 text-sm">
                    Showing results for {filters.search}
                  </p>
                )}
                {filters.city && filters.state && (
                  <p className="text-gray-600 text-sm flex items-center gap-1">
                    <FaMapMarkerAlt className="text-primary" />
                    {filters.city}, {filters.state}
                  </p>
                )}
                {filters.companyType && (
                  <p className="text-gray-600 text-sm">
                    Type: {filters.companyType}
                  </p>
                )}
              </div>
            </div>

            {/* Companies List */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {content}
            </motion.div>

            {/* Pagination */}
            {filteredAndSortedCompanies.length > itemsPerPage && (
              <div className="flex justify-center mt-12">
                <Pagination
                  current={currentPage}
                  total={filteredAndSortedCompanies.length}
                  pageSize={itemsPerPage}
                  onChange={handlePageChange}
                  showSizeChanger={false}
                  showQuickJumper
                  showTotal={(total, range) => 
                    `${range[0]}-${range[1]} of ${total} businesses`
                  }
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Locate;
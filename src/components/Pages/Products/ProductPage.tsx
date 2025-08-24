"use client";
import SearchSection from "../Home/SearchSection";
import Image from "next/image";
import locateImage from "@/assets/markateplace/markateplace.png";
import ProductCard from "./ProductCard";
import { useGetProductsQuery } from "@/redux/features/products/productsApi";
import { IProduct } from "@/types/product";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import NoDataFound from "@/components/NoDataFound/NoDataFound";
import { useRouter, useSearchParams } from "next/navigation";
import { Pagination } from "antd";
import ProductSkeleton from "./ProductSkeleton";

// Component Definition
const ProductPage: React.FC = () => {
  const [allProductsData, setAllProductsData] = useState<IProduct[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("searchTerm");
  const categoryName = searchParams.get("categoryName");

  // Static product data with proper IProduct interface
  const staticProducts: IProduct[] = [
    {
      _id: "1",
      productName: "Japanese Maple - Acer Palmatum",
      slug: "japanese-maple-acer-palmatum",
      productDescription: "Beautiful ornamental tree with stunning red foliage. Perfect for small gardens and landscape accents. Known for its vibrant autumn colors and graceful branching pattern.",
      productImages: [
        {
          _id: "img1",
          imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
          file: {}
        }
      ],
      sizes: [
        {
          _id: "size1",
          size: "S",
          price: 45.99,
          inStock: true,
          discountPrice: 39.99,
          discountPercentage: 13,
          quantity: 15,
          colors: ["Green", "Red"]
        },
        {
          _id: "size2", 
          size: "M",
          price: 89.99,
          inStock: true,
          discountPrice: 79.99,
          discountPercentage: 11,
          quantity: 8,
          colors: ["Green", "Red"]
        }
      ],
      category: "Ornamental Trees",
      avgReview: 4.8,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      _id: "2",
      productName: "Oak Tree - Quercus Alba",
      slug: "oak-tree-quercus-alba",
      productDescription: "Majestic white oak tree, perfect for large landscapes. Provides excellent shade and supports local wildlife. A true classic for any property.",
      productImages: [
        {
          _id: "img2",
          imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop",
          file: {}
        }
      ],
      sizes: [
        {
          _id: "size3",
          size: "M",
          price: 125.99,
          inStock: true,
          discountPrice: 109.99,
          discountPercentage: 13,
          quantity: 5,
          colors: ["Green"]
        },
        {
          _id: "size4",
          size: "L",
          price: 189.99,
          inStock: true,
          discountPrice: 169.99,
          discountPercentage: 11,
          quantity: 3,
          colors: ["Green"]
        }
      ],
      category: "Shade Trees",
      avgReview: 4.9,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      _id: "3",
      productName: "Apple Tree - Honeycrisp",
      slug: "apple-tree-honeycrisp",
      productDescription: "Premium honeycrisp apple tree producing sweet, crispy apples. Self-pollinating variety perfect for home orchards. Harvest fresh apples right from your backyard.",
      productImages: [
        {
          _id: "img3",
          imageUrl: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=300&fit=crop",
          file: {}
        }
      ],
      sizes: [
        {
          _id: "size5",
          size: "S",
          price: 65.99,
          inStock: true,
          discountPrice: 55.99,
          discountPercentage: 15,
          quantity: 12,
          colors: ["Green"]
        },
        {
          _id: "size6",
          size: "M",
          price: 95.99,
          inStock: true,
          discountPrice: 85.99,
          discountPercentage: 10,
          quantity: 7,
          colors: ["Green"]
        }
      ],
      category: "Fruit Trees",
      avgReview: 4.7,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      _id: "4",
      productName: "Pine Tree - Eastern White",
      slug: "pine-tree-eastern-white",
      productDescription: "Fast-growing evergreen pine tree. Excellent for windbreaks, privacy screens, and Christmas trees. Soft blue-green needles and graceful pyramidal shape.",
      productImages: [
        {
          _id: "img4",
          imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
          file: {}
        }
      ],
      sizes: [
        {
          _id: "size7",
          size: "M",
          price: 75.99,
          inStock: true,
          discountPrice: 65.99,
          discountPercentage: 13,
          quantity: 10,
          colors: ["Green"]
        },
        {
          _id: "size8",
          size: "L",
          price: 115.99,
          inStock: true,
          discountPrice: 99.99,
          discountPercentage: 14,
          quantity: 6,
          colors: ["Green"]
        }
      ],
      category: "Evergreen Trees",
      avgReview: 4.6,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      _id: "5",
      productName: "Cherry Blossom - Kwanzan",
      slug: "cherry-blossom-kwanzan",
      productDescription: "Spectacular flowering cherry tree with double pink blooms. Creates a stunning spring display that lasts for weeks. Perfect ornamental tree for any landscape.",
      productImages: [
        {
          _id: "img5",
          imageUrl: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&h=300&fit=crop",
          file: {}
        }
      ],
      sizes: [
        {
          _id: "size9",
          size: "S",
          price: 85.99,
          inStock: true,
          discountPrice: 75.99,
          discountPercentage: 12,
          quantity: 9,
          colors: ["Pink", "Green"]
        },
        {
          _id: "size10",
          size: "M",
          price: 125.99,
          inStock: true,
          discountPrice: 109.99,
          discountPercentage: 13,
          quantity: 4,
          colors: ["Pink", "Green"]
        }
      ],
      category: "Flowering Trees",
      avgReview: 4.9,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      _id: "6",
      productName: "Magnolia Tree - Southern",
      slug: "magnolia-tree-southern",
      productDescription: "Elegant southern magnolia with large, fragrant white flowers. Glossy evergreen leaves provide year-round beauty. A true statement tree for any property.",
      productImages: [
        {
          _id: "img6",
          imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop",
          file: {}
        }
      ],
      sizes: [
        {
          _id: "size11",
          size: "M",
          price: 145.99,
          inStock: true,
          discountPrice: 129.99,
          discountPercentage: 11,
          quantity: 6,
          colors: ["Green", "White"]
        },
        {
          _id: "size12",
          size: "L",
          price: 225.99,
          inStock: true,
          discountPrice: 199.99,
          discountPercentage: 12,
          quantity: 3,
          colors: ["Green", "White"]
        }
      ],
      category: "Flowering Trees",
      avgReview: 4.8,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      _id: "7",
      productName: "Willow Tree - Weeping",
      slug: "willow-tree-weeping",
      productDescription: "Graceful weeping willow tree perfect for waterfront properties. Fast-growing with distinctive drooping branches. Creates a peaceful, natural atmosphere.",
      productImages: [
        {
          _id: "img7",
          imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=300&fit=crop",
          file: {}
        }
      ],
      sizes: [
        {
          _id: "size13",
          size: "M",
          price: 95.99,
          inStock: true,
          discountPrice: 85.99,
          discountPercentage: 10,
          quantity: 8,
          colors: ["Green"]
        },
        {
          _id: "size14",
          size: "L",
          price: 155.99,
          inStock: true,
          discountPrice: 139.99,
          discountPercentage: 10,
          quantity: 4,
          colors: ["Green"]
        }
      ],
      category: "Shade Trees",
      avgReview: 4.5,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      _id: "8",
      productName: "Dogwood Tree - Flowering",
      slug: "dogwood-tree-flowering",
      productDescription: "Beautiful native dogwood with white spring flowers and red fall berries. Compact size perfect for smaller yards. Attracts birds and adds seasonal interest.",
      productImages: [
        {
          _id: "img8",
          imageUrl: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop",
          file: {}
        }
      ],
      sizes: [
        {
          _id: "size15",
          size: "S",
          price: 55.99,
          inStock: true,
          discountPrice: 49.99,
          discountPercentage: 11,
          quantity: 11,
          colors: ["Green", "White"]
        },
        {
          _id: "size16",
          size: "M",
          price: 85.99,
          inStock: true,
          discountPrice: 75.99,
          discountPercentage: 12,
          quantity: 6,
          colors: ["Green", "White"]
        }
      ],
      category: "Native Trees",
      avgReview: 4.7,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  // Fetch products based on the current page and search parameters
  const {
    data: responseData,
    isLoading,
    isError,
    refetch,
  } = useGetProductsQuery({
    page: currentPage,
    limit: 8,
    searchTerm,
    categoryName,
  });

  // Get the list of products and total pages from the API response
  const results = responseData?.data?.attributes?.results;
  const totalResults = responseData?.data?.attributes?.totalResults;

  // Use API data if available, otherwise use static data
  const productsToShow = (results && results.length > 0) ? results : staticProducts;

  // Update the products data when results change
  useEffect(() => {
    setAllProductsData(productsToShow);
  }, [results, isLoading, isError, productsToShow]);

  useEffect(() => {
    if (searchTerm) {
      refetch();
    }
  }, [searchTerm, refetch]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  const handleSearch = (values: Record<string, any>) => {
    const {
      search,
      companyType,
      categoryName,
      isMarketplace,
      city,
      state,
      zipCode,
      country,
      nearby,
    } = values;
    if (!isMarketplace) {
      const queryParams: Record<string, string> = {};
      if (search) queryParams.searchTerm = search;
      if (companyType) queryParams.companyType = companyType;
      if (city) queryParams.city = city;
      if (zipCode) queryParams.zipCode = zipCode;
      if (state) queryParams.state = state;
      if (country) queryParams.country = country;
      if (nearby) queryParams.nearby = nearby;
      const queryString = new URLSearchParams(queryParams).toString();
      router.push(`/locate?${queryString}`);
      return;
    }
    setCurrentPage(1);
    const queryParams = new URLSearchParams(window.location.search);
    if (search) {
      queryParams.set("searchTerm", search);
    } else {
      queryParams.delete("searchTerm");
    }
    if (categoryName) {
      queryParams.set("categoryName", categoryName);
    } else {
      queryParams.delete("categoryName");
    }
    window.history.pushState({}, "", `?${queryParams.toString()}`);
  };

  // Set loading, error, and no data content
  let content: React.ReactNode = null;
  if (isLoading && !staticProducts.length) {
    content = (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array(8)
          .fill(0)
          .map((_, index) => (
            <ProductSkeleton key={index} />
          ))}
      </div>
    );
  } else if (allProductsData.length === 0) {
    content = <NoDataFound />;
  } else {
    content = (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {allProductsData?.map((productData: IProduct, index: number) => (
            <ProductCard key={index} product={productData} />
          ))}
        </div>
      </>
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
            alt="Products"
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
            Our Products
          </motion.h1>
        </div>
      </div>

      {/* Search Section */}
      <SearchSection onSearch={handleSearch} initialIsMarketplace />

      {/* Main Product Grid */}
      <div className="w-full md:container px-5 py-10">
        {content}
        <div className="flex justify-between items-center mt-20">
          <h1 className="text-xl font-semibold text-gray-600">
            Search Results
          </h1>
          <Pagination
            current={currentPage}
            total={totalResults || staticProducts.length}
            pageSize={8}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
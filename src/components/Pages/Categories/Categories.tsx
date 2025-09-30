"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useGetAllCategoryQuery } from "@/redux/features/category/categoryApi";
import { imageBaseUrl } from "@/config/imageBaseUrl";
import NoDataFound from "@/components/NoDataFound/NoDataFound";
import { FaLeaf, FaArrowRight } from "react-icons/fa";
import { ICategory } from "../Home/PopularCategory";

const Categories = () => {
  const { data: responseData, isLoading } = useGetAllCategoryQuery(undefined);
  const categoryData = responseData?.data?.attributes?.results;

  // Static categories data as fallback
  const staticCategories: ICategory[] = [
    {
      _id: 1,
      categoryName: "Fruit Trees",
      categoryImage: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=300&h=300&fit=crop",
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      _id: 2,
      categoryName: "Shade Trees",
      categoryImage: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=300&fit=crop",
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      _id: 3,
      categoryName: "Flowering Trees",
      categoryImage: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=300&h=300&fit=crop",
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      _id: 4,
      categoryName: "Evergreen Trees",
      categoryImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop",
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      _id: 5,
      categoryName: "Ornamental Trees",
      categoryImage: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=300&fit=crop",
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      _id: 6,
      categoryName: "Native Trees",
      categoryImage: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=300&h=300&fit=crop",
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      _id: 7,
      categoryName: "Dwarf Trees",
      categoryImage: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=300&fit=crop",
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      _id: 8,
      categoryName: "Palm Trees",
      categoryImage: "https://images.unsplash.com/photo-1520637836862-4d197d17c50a?w=300&h=300&fit=crop",
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  // Use API data if available, otherwise use static data
  const allCategories = (categoryData && categoryData.length > 0) ? categoryData : staticCategories;

  if (isLoading) {
    return (
      <section className="w-full min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
        {/* Header Section */}
        <div className="relative w-full h-[300px] overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=400&fit=crop"
            alt="Tree Categories"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                Tree Categories
              </h1>
              <p className="text-white/90 text-lg max-w-2xl mx-auto">
                Explore our diverse collection of trees for every landscape need
              </p>
            </div>
          </div>
        </div>

        {/* Loading Grid */}
        <div className="container mx-auto px-5 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {Array(8).fill(0).map((_, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Header Section */}
      <div className="relative w-full h-[300px] overflow-hidden">
        <motion.div
          initial={{ scale: 1.3 }}
          animate={{ scale: 1 }}
          transition={{ type: "tween", duration: 1 }}
          className="absolute inset-0 z-0"
        >
          <Image
            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=400&fit=crop"
            alt="Tree Categories"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        </motion.div>
        
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
            >
              Tree <span className="text-green-400">Categories</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", duration: 0.5, delay: 0.1 }}
              className="text-white/90 text-lg max-w-2xl mx-auto"
            >
              Explore our diverse collection of trees for every landscape need
            </motion.p>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="container mx-auto px-5 py-16">
        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center bg-green-100 text-green-700 px-4 py-2 rounded-full mb-4">
            <FaLeaf className="mr-2" />
            <span className="font-medium">{allCategories?.length} Categories Available</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Find Your Perfect Tree
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            From fruit trees to ornamental varieties, we have the perfect tree for every space and purpose.
          </p>
        </motion.div>

        {/* Categories Grid */}
        {allCategories && allCategories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {allCategories.map((category: ICategory, index: number) => (
              <motion.div
                key={category._id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <Link href={`/products?categoryName=${category?.categoryName}`}>
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={
                        category?.categoryImage?.startsWith('http') 
                          ? category.categoryImage 
                          : `${imageBaseUrl}${category?.categoryImage}`
                      }
                      alt={category?.categoryName}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      Explore
                    </div>
                  </div>
                  
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-green-600 transition-colors duration-300 mb-2">
                      {category?.categoryName}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Discover our collection of {category?.categoryName.toLowerCase()}
                    </p>
                    
                    <div className="inline-flex items-center text-green-600 font-medium group-hover:text-green-700 transition-colors duration-300">
                      <span className="mr-2">View Products</span>
                      <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <NoDataFound 
            title="No Categories Available"
            message="We're currently updating our categories. Please check back soon for our amazing tree collections!"
            showSearchButton={true}
            showHomeButton={true}
          />
        )}
      </div>
    </section>
  );
};

export default Categories;
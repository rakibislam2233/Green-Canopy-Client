"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaSearch, FaFilter, FaTimes } from "react-icons/fa";
import { useGetAllCategoryQuery } from "@/redux/features/category/categoryApi";
import { ICategory } from "@/components/Pages/Home/PopularCategory";
import { Select } from "antd";
import InputComponent from "@/components/UI/InputComponent";

interface FilterOptions {
  search: string;
  category: string;
  sortBy: string;
  priceRange: [number, number];
  inStock: boolean;
}

interface ProductFiltersProps {
  onFiltersChange: (filters: FilterOptions) => void;
  initialFilters?: Partial<FilterOptions>;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  onFiltersChange,
  initialFilters = {},
}) => {
  const [filters, setFilters] = useState<FilterOptions>({
    search: initialFilters.search || "",
    category: initialFilters.category || "",
    sortBy: initialFilters.sortBy || "newest",
    priceRange: initialFilters.priceRange || [0, 1000],
    inStock: initialFilters.inStock ?? true,
  });

  const { data: categoryResponse } = useGetAllCategoryQuery(undefined);
  const categoryData = categoryResponse?.data?.attributes?.results || [];

  // Static categories as fallback
  const staticCategories = [
    "All Categories",
    "Fruit Trees",
    "Shade Trees", 
    "Flowering Trees",
    "Evergreen Trees",
    "Ornamental Trees",
    "Native Trees",
    "Dwarf Trees",
    "Palm Trees",
  ];

  const categories = categoryData.length > 0 
    ? ["All Categories", ...categoryData.map((cat: ICategory) => cat.categoryName)]
    : staticCategories;

  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "price-low-high", label: "Price: Low to High" },
    { value: "price-high-low", label: "Price: High to Low" },
    { value: "rating", label: "Highest Rated" },
    { value: "popular", label: "Most Popular" },
    { value: "name-a-z", label: "Name: A to Z" },
    { value: "name-z-a", label: "Name: Z to A" },
  ];

  // Update filters and notify parent
  const updateFilters = (newFilters: Partial<FilterOptions>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  // Handle search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFilters({ search: e.target.value });
  };

  // Handle category change
  const handleCategoryChange = (category: string) => {
    const categoryValue = category === "All Categories" ? "" : category;
    updateFilters({ category: categoryValue });
  };

  // Handle sort change
  const handleSortChange = (value: string) => {
    updateFilters({ sortBy: value });
  };

  // Handle price range change
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, type: "min" | "max") => {
    const value = parseInt(e.target.value) || 0;
    const newPriceRange: [number, number] = [...filters.priceRange];
    if (type === "min") {
      newPriceRange[0] = value;
    } else {
      newPriceRange[1] = value;
    }
    updateFilters({ priceRange: newPriceRange });
  };

  // Clear all filters
  const clearFilters = () => {
    const clearedFilters: FilterOptions = {
      search: "",
      category: "",
      sortBy: "newest",
      priceRange: [0, 1000],
      inStock: true,
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6">
      {/* Filter Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <FaFilter size={16} className="text-primary" />
          Filters
        </h3>
        <button
          onClick={clearFilters}
          className="text-sm text-primary hover:text-green-700 font-medium transition-colors"
        >
          Clear All
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          <FaSearch className="inline mr-2" />
          Search Products
        </label>
        <InputComponent
          placeholder="Search products by name..."
          value={filters.search}
          onChange={handleSearchChange}
        />
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Category
        </label>
        <Select
          placeholder="Select category"
          value={filters.category || "All Categories"}
          onChange={handleCategoryChange}
          className="w-full"
          size="large"
          options={categories.map((category) => ({
            value: category === "All Categories" ? "" : category,
            label: category,
          }))}
        />
      </div>

      {/* Sort By */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Sort By
        </label>
        <Select
          value={filters.sortBy}
          onChange={handleSortChange}
          className="w-full"
          size="large"
          options={sortOptions.map((option) => ({
            value: option.value,
            label: option.label,
          }))}
        />
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Price Range ($)
        </label>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Min Price</label>
              <InputComponent
                type="number"
                placeholder="0"
                value={filters.priceRange[0] || ""}
                onChange={(e) => handlePriceChange(e, "min")}
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Max Price</label>
              <InputComponent
                type="number"
                placeholder="1000"
                value={filters.priceRange[1] || ""}
                onChange={(e) => handlePriceChange(e, "max")}
              />
            </div>
          </div>
          <div className="text-xs text-gray-500 text-center p-2 bg-gray-50 rounded">
            ${filters.priceRange[0]} - ${filters.priceRange[1]}
          </div>
        </div>
      </div>

      {/* Stock Status */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Availability
        </label>
        <label className="flex items-center cursor-pointer hover:bg-gray-50 p-3 rounded-lg border border-gray-200">
          <input
            type="checkbox"
            checked={filters.inStock}
            onChange={(e) => updateFilters({ inStock: e.target.checked })}
            className="mr-3 text-green-600 focus:ring-green-500 rounded"
          />
          <span className="text-sm text-gray-700">Show In Stock Only</span>
        </label>
      </div>

      {/* Active Filters Summary */}
      <div className="pt-4 border-t border-gray-200">
        <div className="flex flex-wrap gap-2">
          {filters.search && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
              Search: {filters.search}
              <button
                onClick={() => updateFilters({ search: "" })}
                className="hover:text-red-500"
              >
                <FaTimes size={10} />
              </button>
            </span>
          )}
          {filters.category && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
              {filters.category}
              <button
                onClick={() => handleCategoryChange("All Categories")}
                className="hover:text-red-500"
              >
                <FaTimes size={10} />
              </button>
            </span>
          )}
          {(filters.priceRange[0] > 0 || filters.priceRange[1] < 1000) && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
              ${filters.priceRange[0]} - ${filters.priceRange[1]}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;
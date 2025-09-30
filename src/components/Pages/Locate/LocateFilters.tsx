"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaSearch, FaFilter, FaTimes, FaMapMarkerAlt, FaBuilding } from "react-icons/fa";
import { useGetCompanyTypesQuery } from "@/redux/features/companyType/companyTypeApi";
import { ICompanyType } from "@/types/companyTyes";
import { Select } from "antd";
import InputComponent from "@/components/UI/InputComponent";

interface LocateFilterOptions {
  search: string;
  companyType: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  sortBy: string;
}

interface LocateFiltersProps {
  onFiltersChange: (filters: LocateFilterOptions) => void;
  initialFilters?: Partial<LocateFilterOptions>;
}

const LocateFilters: React.FC<LocateFiltersProps> = ({
  onFiltersChange,
  initialFilters = {},
}) => {
  const [filters, setFilters] = useState<LocateFilterOptions>({
    search: initialFilters.search || "",
    companyType: initialFilters.companyType || "",
    city: initialFilters.city || "",
    state: initialFilters.state || "",
    zipCode: initialFilters.zipCode || "",
    country: initialFilters.country || "",
    sortBy: initialFilters.sortBy || "name",
  });

  const { data: companyTypeResponseData } = useGetCompanyTypesQuery(5000);
  const companyTypes = companyTypeResponseData?.data?.attributes?.results || [];

  // Static company types as fallback
  const staticCompanyTypes = [
    "All Types",
    "Nursery",
    "Garden Center",
    "Landscaping Service",
    "Tree Service",
    "Plant Retailer",
    "Agricultural Supply",
    "Horticultural Consultant",
    "Greenhouse",
  ];

  const types = companyTypes.length > 0 
    ? ["All Types", ...companyTypes.map((type: ICompanyType) => type.companyTypeName)]
    : staticCompanyTypes;

  const sortOptions = [
    { value: "name", label: "Company Name (A-Z)" },
    { value: "name-desc", label: "Company Name (Z-A)" },
    { value: "location", label: "Location" },
    { value: "type", label: "Company Type" },
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
  ];
  // Update filters and notify parent
  const updateFilters = (newFilters: Partial<LocateFilterOptions>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  // Handle search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFilters({ search: e.target.value });
  };

  // Handle company type change
  const handleCompanyTypeChange = (type: string) => {
    const typeValue = type === "All Types" ? "" : type;
    updateFilters({ companyType: typeValue });
  };

  // Handle input changes
  const handleInputChange = (field: keyof LocateFilterOptions, value: string) => {
    updateFilters({ [field]: value });
  };

  // Clear all filters
  const clearFilters = () => {
    const clearedFilters: LocateFilterOptions = {
      search: "",
      companyType: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      sortBy: "name",
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
          Find Businesses
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
          Search Businesses
        </label>
        <InputComponent
          placeholder="Search by name or service..."
          value={filters.search}
          onChange={handleSearchChange}
        />
      </div>

      {/* Business Type Filter */}
      <div className="mb-6">
        <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
          <FaBuilding className="mr-2 text-primary" />
          Business Type
        </label>
        <Select
          placeholder="Select business type"
          value={filters.companyType || "All Types"}
          onChange={handleCompanyTypeChange}
          className="w-full"
          size="large"
          options={types.map((type) => ({
            value: type === "All Types" ? "" : type,
            label: type,
          }))}
        />
      </div>

      {/* Location Filters */}
      <div className="mb-6">
        <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
          <FaMapMarkerAlt className="mr-2 text-primary" />
          Location
        </label>
        <div className="space-y-3">
          <div>
            <label className="block text-xs text-gray-500 mb-1">City</label>
            <InputComponent
              placeholder="Enter city"
              value={filters.city}
              onChange={(e) => handleInputChange("city", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">State</label>
            <InputComponent
              placeholder="Enter state"
              value={filters.state}
              onChange={(e) => handleInputChange("state", e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Zip Code</label>
              <InputComponent
                placeholder="Zip"
                value={filters.zipCode}
                onChange={(e) => handleInputChange("zipCode", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Country</label>
              <InputComponent
                placeholder="Country"
                value={filters.country}
                onChange={(e) => handleInputChange("country", e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>


      {/* Sort By */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Sort By
        </label>
        <Select
          value={filters.sortBy}
          onChange={(value) => handleInputChange("sortBy", value)}
          className="w-full"
          size="large"
          options={sortOptions.map((option) => ({
            value: option.value,
            label: option.label,
          }))}
        />
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
          {filters.companyType && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
              {filters.companyType}
              <button
                onClick={() => handleCompanyTypeChange("All Types")}
                className="hover:text-red-500"
              >
                <FaTimes size={10} />
              </button>
            </span>
          )}
          {filters.city && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
              {filters.city}
              <button
                onClick={() => handleInputChange("city", "")}
                className="hover:text-red-500"
              >
                <FaTimes size={10} />
              </button>
            </span>
          )}
          {filters.state && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
              {filters.state}
              <button
                onClick={() => handleInputChange("state", "")}
                className="hover:text-red-500"
              >
                <FaTimes size={10} />
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocateFilters;
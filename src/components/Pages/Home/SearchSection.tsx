"use client";
import InputComponent from "@/components/UI/InputComponent";
import { useGetAllCategoryQuery } from "@/redux/features/category/categoryApi";
import { useGetCompanyTypesQuery } from "@/redux/features/companyType/companyTypeApi";
import { ICompanyType } from "@/types/companyTyes";
import { ISearchSectionProps } from "@/types/types";
import { Form, Select, Spin } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { ICategory } from "./PopularCategory";
import { useGetAllCompanyQuery } from "@/redux/features/company/companyApi";
import { IProduct } from "@/types/productType";
import { ICompany } from "@/types/horticultureType";
import { useGetProductsQuery } from "@/redux/features/products/productsApi";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface SearchSectionProps {
  onSearch: (values: {
    isMarketplace: boolean;
    search: string;
    city?: string;
    zipCode?: string;
    state?: string;
    country?: string;
  }) => void;
  initialIsMarketplace?: boolean;
}

const SearchSection: React.FC<SearchSectionProps> = ({
  onSearch = () => {},
  initialIsMarketplace = false,
}) => {
  const [form] = Form.useForm();
  const [isMarketplace, setIsMarketplace] =
    useState<boolean>(initialIsMarketplace);
  const limit = 5000;
  const { data: companyTypeResponseData } = useGetCompanyTypesQuery(limit);
  const companyTypes = companyTypeResponseData?.data?.attributes?.results || [];

  const { data: categoryResponse } = useGetAllCategoryQuery(undefined);
  const categoryData = categoryResponse?.data?.attributes?.results || [];
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  // State for input value (free-form) and search term (for suggestions)
  const [inputValue, setInputValue] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  // Ref for dropdown to detect outside clicks
  const dropdownRef = useRef<HTMLDivElement>(null);

  const productName = searchParams.get("searchTerm");
  const categoryName = searchParams.get("categoryName");
  const companyType = searchParams.get("companyType");
  const city = searchParams.get("city");
  const state = searchParams.get("state");
  const zipCode = searchParams.get("zipCode");
  const country = searchParams.get("country");

  // Marketplace API Call (Products)
  const {
    data: marketplaceData,
    isLoading: isProductsLoading,
    isError: isProductsError,
    refetch: refetchProducts,
  } = useGetProductsQuery(
    { page: 1, limit: 10, searchTerm },
    { skip: !isMarketplace }
  );

  // Company API Call (Businesses)
  const {
    data: responseData,
    isLoading: isCompaniesLoading,
    isError: isCompaniesError,
    refetch: refetchCompanies,
  } = useGetAllCompanyQuery(
    { page: 1, searchTerm },
    { skip: isMarketplace }
  );

  // Extract Suggestions
  const productSuggestions =
    marketplaceData?.data?.attributes?.results?.map(
      (product: IProduct) => product?.productName
    ) || [];
  const companySuggestions =
    responseData?.data?.attributes?.results?.map(
      (company: ICompany) => company?.companyName
    ) || [];

  // Initialize form with query params
  useEffect(() => {
    if (
      productName ||
      categoryName ||
      companyType ||
      city ||
      state ||
      zipCode ||
      country
    ) {
      setInputValue(productName || "");
      setSearchTerm(productName || "");
      form.setFieldsValue({
        search: productName,
        categoryName: categoryName,
        companyType: companyType,
        city: city,
        state: state,
        zipCode: zipCode,
        country: country,
      });
    }
  }, [
    productName,
    categoryName,
    companyType,
    city,
    state,
    zipCode,
    country,
    form,
  ]);

  // Refetch suggestions when searchTerm changes
  useEffect(() => {
    if (searchTerm.trim() !== "") {
      if (isMarketplace) {
        refetchProducts();
      } else {
        refetchCompanies();
      }
    }
  }, [isMarketplace, refetchCompanies, refetchProducts, searchTerm]);

  // Handle outside click to hide suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle Input Change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setSearchTerm(value);
    setShowSuggestions(value.length > 0);
    form.setFieldsValue({ search: value });
  };

  // Handle Suggestion Click
  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    setSearchTerm(suggestion);
    form.setFieldsValue({ search: suggestion });
    setShowSuggestions(false);
  };

  // Handle Form Submission
  const handleSubmit = (values: ISearchSectionProps) => {
    onSearch({ isMarketplace, ...values });
    setShowSuggestions(false); // Hide suggestions on submit
  };

  // Handle Form Reset
  const handleReset = () => {
    form.resetFields();
    setInputValue("");
    setSearchTerm("");
    setShowSuggestions(false); // Hide suggestions on reset
    if (pathName === "/marketplace") {
      router.push("/marketplace");
    } else if (pathName === "/locate") {
      router.push("/locate");
    } else {
      router.push("/");
    }
  };

  return (
    <section className="w-full md:container p-5 my-10">
      <div className="flex gap-5 items-center">
        <button
          className={`px-7 py-3 ${
            isMarketplace
              ? "bg-primary text-white"
              : "bg-[#EEEEEF] text-gray-500"
          } rounded-t-md`}
          onClick={() => setIsMarketplace(true)}
        >
          Marketplace
        </button>
        <button
          className={`px-6 py-3 ${
            !isMarketplace
              ? "bg-primary text-white"
              : "bg-[#EEEEEF] text-gray-500"
          } rounded-t-md`}
          onClick={() => setIsMarketplace(false)}
        >
          Locate a Business
        </button>
      </div>

      {/* Search Form */}
      <div className="w-full bg-primary rounded-b-md px-5 py-8">
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="space-y-4"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Main Search Input */}
            <Form.Item
              label={<h1 className="text-white">Search</h1>}
              name="search"
              className="w-full"
            >
              <div className="relative" ref={dropdownRef}>
                <InputComponent
                  value={inputValue}
                  onChange={handleSearchChange}
                  placeholder={
                    isMarketplace
                      ? "Search for products (e.g., trees, plants, gardening tools)"
                      : "Search for businesses"
                  }
                />
                {/* Search Suggestions Dropdown */}
                {showSuggestions &&
                  (isMarketplace
                    ? productSuggestions.length > 1
                    : companySuggestions.length > 1) && (
                    <ul className="absolute w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1 z-10 max-h-56 overflow-y-auto">
                      {/* Show Loading State */}
                      {(isProductsLoading || isCompaniesLoading) && (
                        <li className="p-3 text-gray-500 flex items-center">
                          <Spin size="small" className="mr-2" />
                          Loading...
                        </li>
                      )}

                      {/* Show Error State */}
                      {(isProductsError || isCompaniesError) && (
                        <li className="p-3 text-red-500">
                          Error fetching data. Try again.
                        </li>
                      )}

                      {/* Show No Results Message when Array is Empty */}
                      {!isProductsLoading &&
                        isMarketplace &&
                        productSuggestions.length === 0 && (
                          <li className="p-3 text-gray-500">
                            No products found
                          </li>
                        )}

                      {!isCompaniesLoading &&
                        !isMarketplace &&
                        companySuggestions.length === 0 && (
                          <li className="p-3 text-gray-500">
                            No companies found
                          </li>
                        )}

                      {/* Render Suggestions */}
                      {(isMarketplace
                        ? productSuggestions
                        : companySuggestions
                      ).map((suggestion: string, index: number) => (
                        <li
                          key={index}
                          className="p-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  )}
              </div>
            </Form.Item>

            {isMarketplace && (
              <>
                <Form.Item
                  label={<h1 className="text-white">Category</h1>}
                  name="categoryName"
                  tooltip="Optional"
                  className="w-full"
                >
                  <Select
                    placeholder="Select category"
                    size="large"
                    options={categoryData?.map((category: ICategory) => ({
                      value: category?.categoryName,
                      label: category?.categoryName,
                    }))}
                  />
                </Form.Item>
                <Form.Item className="w-full md:w-auto">
                  <button
                    type="submit"
                    className="w-full md:w-auto px-12 mt-2 md:mt-7 py-3 bg-secondary text-white rounded transition-colors shadow"
                  >
                    Submit
                  </button>
                </Form.Item>
              </>
            )}
          </div>

          {/* Additional Inputs - Only Show When "Locate a Business" is Selected */}
          {!isMarketplace && (
            <div className="flex flex-col md:flex-row gap-4">
              <Form.Item
                label={<h1 className="text-white">Company Type</h1>}
                name="companyType"
                tooltip="Optional"
                className="w-full"
              >
                <Select
                  placeholder="Select company type"
                  size="large"
                  options={companyTypes?.map((type: ICompanyType) => ({
                    value: type?.companyTypeName,
                    label: type?.companyTypeName,
                  }))}
                />
              </Form.Item>
              <Form.Item
                label={<h1 className="text-white">City</h1>}
                name="city"
                tooltip="Optional"
                className="w-full"
              >
                <InputComponent placeholder="New York" />
              </Form.Item>
              <Form.Item
                label={<h1 className="text-white">Zip Code</h1>}
                name="zipCode"
                tooltip="Optional"
                className="w-full"
              >
                <InputComponent placeholder="540045" />
              </Form.Item>

              <Form.Item
                label={<h1 className="text-white">State</h1>}
                name="state"
                tooltip="Optional"
                className="w-full"
              >
                <InputComponent placeholder="New York" />
              </Form.Item>

              {/* Added Country Field */}
              <Form.Item
                label={<h1 className="text-white">Country</h1>}
                name="country"
                tooltip="Optional"
                className="w-full"
              >
                <InputComponent placeholder="United States" />
              </Form.Item>
              {/* Submit Button */}
              <Form.Item>
                <button
                  type="submit"
                  className="w-full md:w-auto px-12 mt-2 md:mt-7 py-3 bg-secondary text-white rounded transition-colors shadow"
                >
                  Search
                </button>
              </Form.Item>
            </div>
          )}
        </Form>
      </div>
    </section>
  );
};

export default SearchSection;
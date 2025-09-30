"use client";
import BreadcrumbComponent from "@/components/UI/BreadcrumbComponent";
import { imageBaseUrl } from "@/config/imageBaseUrl";
import { addToCart, selectCart } from "@/redux/features/cart/cartSlice";
import { useGetSingleProductQuery } from "@/redux/features/products/productsApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { IProduct, ISize } from "@/types/product";
import { useEffect, useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";
import { HiOutlineHome } from "react-icons/hi";
import "react-image-gallery/styles/css/image-gallery.css"; 
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import {
  addToWishlist,
  selectWishlist,
} from "@/redux/features/wishlist/wishlistSlice";
import { useRouter } from "next/navigation";
import useUser from "@/hook/useUser";
import { toast } from "sonner";
import EmblaCarousel from "./EmblaCarousel";
import ProductDetailsSkeleton from "./ProductDetailsSkeleton";
import ProductCard from "../ProductCard";
const ProductDetails = ({ slug }: { slug: string }) => {
  const { data: responseData, isLoading } = useGetSingleProductQuery(slug, {
    skip: !slug,
  });
  //redux
  const [quantity, setQuantity] = useState<number>(1);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user } = useUser();

  // Product data and related products from the API response
  const productData: IProduct = responseData?.data?.attributes?.product;
  const relatedProducts = responseData?.data?.attributes?.relatedProducts;

  // States for selected size, color, and price
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [discountPrice, setDiscountPrice] = useState<number>(0);
  const [discountPercentage, setDiscountPercentage] = useState<number>(0);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [price, setPrice] = useState<number>(0);
  const [inStock, setInStock] = useState<boolean>(true);
  const [stockQuantity, setStockQuantity] = useState<number>(0);

  const cart = useAppSelector(selectCart);
  const wishlist = useAppSelector(selectWishlist);

  useEffect(() => {
    if (productData?.sizes?.length > 0) {
      setSelectedSize(productData.sizes[0].size);
      setPrice(productData.sizes[0].price);
      setSelectedColor(productData.sizes[0].colors[0]);
      setInStock(productData.sizes[0].inStock);
      setStockQuantity(productData.sizes[0].quantity);
      setDiscountPrice(productData.sizes[0].discountPrice);
      setDiscountPercentage(productData.sizes[0].discountPercentage || 0);
    }
  }, [productData]);

  // Handle size change and update the price based on the selected size
  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
    setQuantity(1);
    const selectedProductSize = productData?.sizes.find(
      (s: ISize) => s.size === size
    );
    if (selectedProductSize) {
      setPrice(selectedProductSize?.price);
      setInStock(selectedProductSize?.inStock);
      setStockQuantity(selectedProductSize?.quantity);
      setDiscountPrice(selectedProductSize?.discountPrice);
      setSelectedColor(selectedProductSize?.colors[0]);
      setDiscountPercentage(selectedProductSize?.discountPercentage || 0);
    }
  };

  // Handle color selection
  const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };

  // Add to cart functionality
  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size!");
      return;
    }
    const cartItem = {
      id: productData?._id,
      name: productData?.productName,
      slug: productData?.slug,
      price: discountPrice > 0 ? discountPrice : price,
      image: `${imageBaseUrl}${productData?.productImages[0]?.imageUrl}`,
      size: selectedSize,
      color: selectedColor || "N/A",
      quantity: quantity,
      category: productData?.category,
    };
    dispatch(addToCart(cartItem));
  };

  // Add to wishlist functionality
  const handleAddToWishlist = () => {
    if (!user) {
      router.push("/login?redirectUrl=/dashboard/my-wishlist");
      return;
    }
    if (!selectedSize) {
      toast.error("Please select a size!");
      return;
    }

    const wishlistItem = {
      id: productData?._id,
      name: productData?.productName,
      slug: productData?.slug,
      price: discountPrice > 0 ? discountPrice : price,
      image: `${imageBaseUrl}${productData?.productImages[0]?.imageUrl}`,
      size: selectedSize,
      color: selectedColor || "N/A",
      quantity: quantity,
      category: productData?.category,
      stockQuantity: stockQuantity,
    };

    dispatch(addToWishlist(wishlistItem)); // Dispatch the action to add to wishlist
  };

  // Check if the item is already in the cart or wishlist
  const isInCart = cart?.find((item) => item?.id === productData?._id);
  const isInWishlist = wishlist?.find((item) => item?.id === productData?._id);

  // Redirect to cart or wishlist if the item is already there
  const handleViewCart = () => {
    router.push("/cart"); // Redirect to cart page
  };

  const handleViewWishlist = () => {
    router.push("/dashboard/my-wishlist");
  };

  const breadcrumbItems = [
    {
      href: "/",
      title: (
        <div className="flex gap-2 items-center">
          <HiOutlineHome size={18} />
          <span>Home</span>
        </div>
      ),
    },
    {
      href: "/products",
      title: "Products",
    },
    {
      title: productData?.productName || "Product",
    },
  ];

  const productImages = productData?.productImages || [];
  const OPTIONS = {};
  const SLIDE_COUNT = productImages?.length;
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys());
  if (isLoading || !productData) {
    return (
      <div className="w-full md:container mx-auto px-5 py-16">
        <ProductDetailsSkeleton />
      </div>
    );
  }
  return (
    <section className="w-full px-5 py-16">
      <div className="w-full md:container mx-auto">
        {/* Breadcrumb */}
        <BreadcrumbComponent items={breadcrumbItems} />
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-10 mt-8">
          <div>
            <EmblaCarousel
              slides={SLIDES}
              options={OPTIONS}
              productImages={productImages}
            />
          </div>
          {/* Right Side - Product Details */}
          <div className="w-full space-y-4">
            <h1 className="text-3xl font-bold">{productData?.productName}</h1>
            <div className="flex justify-between items-center">
              <h1>
                <strong>Category:</strong> {productData?.category}
              </h1>
            </div>
            <div>
              <p
                className="mt-4"
                dangerouslySetInnerHTML={{
                  __html: !showFullDescription
                    ? `${productData?.productDescription.substring(0, 327)}`
                    : productData?.productDescription,
                }}
              />

              <button
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="text-green-500 underline"
              >
                {showFullDescription ? "Read Less" : "Read More"}
              </button>
            </div>

            {discountPrice > 0 ? (
              <div className="space-y-1">
                <p className="text-2xl font-semibold text-green-600">
                  {discountPrice
                    ? `$${discountPrice.toFixed(2)}`
                    : `$${productData?.sizes?.[0].discountPrice}`}
                </p>
                <div className="flex gap-2">
                  <p className="text-lg font-semibold line-through text-gray-500">
                    {price
                      ? `$${price.toFixed(2)}`
                      : `$${productData?.sizes?.[0].price}`}
                  </p>
                  <span>
                    {discountPercentage > 0
                      ? `-${discountPercentage}% off`
                      : `-${productData?.sizes?.[0].discountPercentage}% off`}
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-2xl font-semibold text-green-600">
                {price
                  ? `$${price?.toFixed(2)}`
                  : `$${productData?.sizes?.[0]?.price}`}
              </p>
            )}
            {inStock ? (
              <p className="text-green-600 font-semibold">In Stock</p>
            ) : (
              <p className="text-red-600 font-semibold">Out of Stock</p>
            )}
            {/* Size Selection */}
            <div className="mt-6">
              <p>
                <strong>Select Size:</strong>
              </p>
              <div className="flex gap-4 mt-2">
                {productData?.sizes?.map((size: ISize) => (
                  <div
                    key={size._id}
                    onClick={() => handleSizeChange(size.size)}
                    className={`border px-3 py-1 rounded-lg  flex justify-center items-center cursor-pointer ${
                      selectedSize === size.size
                        ? "bg-green-500 text-white"
                        : "bg-white text-gray-700"
                    }`}
                  >
                    {size.size}
                  </div>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="mt-4">
              <p>
                <strong>Select Color:</strong>
              </p>
              <div className="flex gap-4 mt-2">
                {selectedSize &&
                  // Check if colors exist for the selected size
                  (productData?.sizes?.find(
                    (size: ISize) => size.size === selectedSize
                  )?.colors.length ? (
                    // If colors are available, render them
                    productData?.sizes
                      ?.find((size: ISize) => size.size === selectedSize)
                      ?.colors.map((color: string, index: number) => (
                        <div
                          key={index}
                          style={{ backgroundColor: color }}
                          onClick={() => handleColorChange(color)}
                          className={`size-8 rounded-full flex justify-center items-center cursor-pointer border-2 ${
                            selectedColor === color
                              ? "border-gray-700"
                              : "border"
                          }`}
                        ></div>
                      ))
                  ) : (
                    // If no colors are available, show "Not Available"
                    <p className="text-gray-500">No Color Option Available</p>
                  ))}
              </div>
            </div>
            <div className="mt-4">
              <p>
                <strong>Select Quantity:</strong>
              </p>
              <div className="flex rounded-lg overflow-hidden mt-2">
                <button
                  disabled={quantity <= 1}
                  onClick={() => setQuantity(quantity - 1)}
                  className="px-4 py-3 border-l border-t border-b rounded-l-md border-[#929292]"
                >
                  <FiMinus className="size-3" />
                </button>
                <h1 className="border flex justify-center items-center px-5 py-2 text-sm border-[#929292]">
                  {quantity}
                </h1>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={
                    (productData?.sizes?.find(
                      (size: ISize) => size.size === selectedSize
                    )?.quantity ?? 0) <= quantity
                  }
                  className="px-4 py-3 border-r border-t border-b rounded-r-md border-[#929292]"
                >
                  <FiPlus className="size-3" />
                </button>
              </div>
            </div>
            <div className="mt-6 flex flex-col md:flex-row items-center gap-4">
              {/* Add to Cart or View Cart Button */}
              <button
                onClick={isInCart ? handleViewCart : handleAddToCart}
                disabled={!inStock}
                className={`w-full md:w-fit px-5 rounded-lg text-white py-3 transition-all duration-300 flex ${
                  inStock ? "bg-primary" : "bg-gray-300"
                } justify-center items-center gap-2`}
              >
                <FaShoppingCart className="text-lg size-6" />
                {isInCart ? "View in Cart" : "Add to Cart"}
              </button>

              {/* Add to Wishlist or View Wishlist Button */}
              <button
                onClick={
                  isInWishlist ? handleViewWishlist : handleAddToWishlist
                }
                disabled={!inStock}
                className={`w-full md:w-fit px-5 rounded-lg text-white py-3 transition-all duration-300 flex ${
                  inStock ? "bg-secondary" : "bg-gray-300"
                } justify-center items-center gap-2`}
              >
                <FaHeart className="text-lg size-6" />
                {isInWishlist ? "View in Wishlist" : "Add to Wishlist"}
              </button>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-4">Related Products</h2>
          {relatedProducts?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-8">
              {relatedProducts?.map((product: IProduct) => (
                <div key={product?._id}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <p>No related products found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;

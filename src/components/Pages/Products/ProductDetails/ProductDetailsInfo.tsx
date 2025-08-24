"use client";
import { IProduct, ISize } from "@/types/product";
import React, { useState, useEffect } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";
import { FaHeart, FaShoppingCart, FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addToCart, selectCart } from "@/redux/features/cart/cartSlice";
import { addToWishlist, selectWishlist } from "@/redux/features/wishlist/wishlistSlice";
import { useRouter } from "next/navigation";
import useUser from "@/hook/useUser";
import { toast } from "sonner";
import { imageBaseUrl } from "@/config/imageBaseUrl";
import { motion } from "framer-motion";

interface ProductDetailsInfoProps {
  product: IProduct;
}

const ProductDetailsInfo: React.FC<ProductDetailsInfoProps> = ({ product }) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [price, setPrice] = useState<number>(0);
  const [discountPrice, setDiscountPrice] = useState<number>(0);
  const [discountPercentage, setDiscountPercentage] = useState<number>(0);
  const [inStock, setInStock] = useState<boolean>(true);
  const [stockQuantity, setStockQuantity] = useState<number>(0);

  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user } = useUser();
  const cart = useAppSelector(selectCart);
  const wishlist = useAppSelector(selectWishlist);

  // Initialize first size selection
  useEffect(() => {
    if (product?.sizes?.length > 0) {
      const firstSize = product.sizes[0];
      setSelectedSize(firstSize.size);
      setPrice(firstSize.price);
      setDiscountPrice(firstSize.discountPrice);
      setDiscountPercentage(firstSize.discountPercentage || 0);
      setInStock(firstSize.inStock);
      setStockQuantity(firstSize.quantity);
      setSelectedColor(firstSize.colors[0] || null);
    }
  }, [product]);

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
    setQuantity(1);
    const selectedProductSize = product?.sizes.find((s: ISize) => s.size === size);
    if (selectedProductSize) {
      setPrice(selectedProductSize.price);
      setDiscountPrice(selectedProductSize.discountPrice);
      setDiscountPercentage(selectedProductSize.discountPercentage || 0);
      setInStock(selectedProductSize.inStock);
      setStockQuantity(selectedProductSize.quantity);
      setSelectedColor(selectedProductSize.colors[0] || null);
    }
  };

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };

  const handleQuantityChange = (action: "increase" | "decrease") => {
    if (action === "increase" && quantity < stockQuantity) {
      setQuantity(quantity + 1);
    } else if (action === "decrease" && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size!");
      return;
    }
    
    const cartItem = {
      id: product._id,
      name: product.productName,
      slug: product.slug,
      price: discountPrice > 0 ? discountPrice : price,
      image: product?.productImages[0]?.imageUrl?.startsWith('http')
        ? product?.productImages[0]?.imageUrl
        : `${imageBaseUrl}${product?.productImages[0]?.imageUrl}`,
      size: selectedSize,
      color: selectedColor || "N/A",
      quantity: quantity,
      category: product.category,
    };
    
    dispatch(addToCart(cartItem));
    toast.success("Added to cart successfully!");
  };

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
      id: product._id,
      name: product.productName,
      slug: product.slug,
      price: discountPrice > 0 ? discountPrice : price,
      image: product?.productImages[0]?.imageUrl?.startsWith('http')
        ? product?.productImages[0]?.imageUrl
        : `${imageBaseUrl}${product?.productImages[0]?.imageUrl}`,
      size: selectedSize,
      color: selectedColor || "N/A",
      quantity: quantity,
      category: product.category,
      stockQuantity: stockQuantity,
    };

    dispatch(addToWishlist(wishlistItem));
    toast.success("Added to wishlist successfully!");
  };

  // Function to render stars based on rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="text-yellow-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="text-gray-300" />);
    }
    
    return stars;
  };

  const isInCart = cart?.find((item) => item.id === product._id);
  const isInWishlist = wishlist?.find((item) => item.id === product._id);

  const handleViewCart = () => {
    router.push("/cart");
  };

  const handleViewWishlist = () => {
    router.push("/dashboard/my-wishlist");
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      {/* Product Title and Rating */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-3">
          {product.productName}
        </h1>
        
        <div className="flex items-center gap-4 mb-3">
          <div className="flex items-center gap-1">
            {renderStars(product.avgReview || 0)}
          </div>
          <span className="text-gray-600">
            ({product.avgReview?.toFixed(1) || '0.0'} rating)
          </span>
        </div>
        
        <p className="text-green-600 font-medium">
          {product.category}
        </p>
      </div>

      {/* Price Section */}
      <div className="bg-gray-50 p-4 rounded-lg">
        {discountPrice > 0 ? (
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-green-600">
                ${discountPrice.toFixed(2)}
              </span>
              <span className="text-lg text-gray-400 line-through">
                ${price.toFixed(2)}
              </span>
              <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-sm font-medium">
                -{discountPercentage}% OFF
              </span>
            </div>
          </div>
        ) : (
          <span className="text-2xl font-bold text-green-600">
            ${price.toFixed(2)}
          </span>
        )}
        
        <p className={`mt-2 font-medium ${inStock ? 'text-green-600' : 'text-red-600'}`}>
          {inStock ? `In Stock (${stockQuantity} available)` : 'Out of Stock'}
        </p>
      </div>

      {/* Size Selection */}
      {product.sizes?.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-3">Select Size:</h3>
          <div className="flex gap-3 flex-wrap">
            {product.sizes.map((size: ISize) => (
              <button
                key={size._id}
                onClick={() => handleSizeChange(size.size)}
                className={`px-4 py-2 rounded-lg border-2 font-medium transition-all duration-300 ${
                  selectedSize === size.size
                    ? "border-green-500 bg-green-500 text-white"
                    : "border-gray-300 text-gray-700 hover:border-green-300"
                }`}
              >
                {size.size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Color Selection */}
      {selectedSize && (
        <div>
          <h3 className="text-lg font-semibold mb-3">Select Color:</h3>
          <div className="flex gap-3">
            {product.sizes
              ?.find((size: ISize) => size.size === selectedSize)
              ?.colors?.map((color: string, index: number) => (
                <button
                  key={index}
                  onClick={() => handleColorChange(color)}
                  className={`w-10 h-10 rounded-full border-4 transition-all duration-300 ${
                    selectedColor === color
                      ? "border-gray-800 scale-110"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  style={{ backgroundColor: color.toLowerCase() }}
                  title={color}
                />
              )) || <p className="text-gray-500">No color options available</p>}
          </div>
        </div>
      )}

      {/* Quantity Selection */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Quantity:</h3>
        <div className="flex items-center gap-3">
          <button
            disabled={quantity <= 1}
            onClick={() => handleQuantityChange("decrease")}
            className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FiMinus />
          </button>
          <span className="w-16 h-10 border border-gray-300 rounded-lg flex items-center justify-center font-medium bg-white">
            {quantity}
          </span>
          <button
            onClick={() => handleQuantityChange("increase")}
            disabled={stockQuantity <= quantity}
            className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FiPlus />
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 pt-4">
        <button
          onClick={isInCart ? handleViewCart : handleAddToCart}
          disabled={!inStock}
          className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 ${
            inStock 
              ? "bg-green-600 hover:bg-green-700 hover:shadow-lg" 
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          <FaShoppingCart />
          {isInCart ? "View in Cart" : "Add to Cart"}
        </button>

        <button
          onClick={isInWishlist ? handleViewWishlist : handleAddToWishlist}
          disabled={!inStock}
          className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 ${
            inStock 
              ? "bg-red-500 hover:bg-red-600 hover:shadow-lg" 
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          <FaHeart />
          {isInWishlist ? "View in Wishlist" : "Add to Wishlist"}
        </button>
      </div>

      {/* Product Description */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Description</h3>
        <p className="text-gray-700 leading-relaxed">
          {product.productDescription}
        </p>
      </div>
    </motion.div>
  );
};

export default ProductDetailsInfo;
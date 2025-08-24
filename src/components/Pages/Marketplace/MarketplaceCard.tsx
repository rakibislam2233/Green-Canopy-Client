import { imageBaseUrl } from "@/config/imageBaseUrl";
import { IProduct } from "@/types/productType";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { addToCart, selectCart } from "@/redux/features/cart/cartSlice";
import { useAppSelector } from "@/redux/hooks";

const MarketplaceCard = ({ product }: { product: IProduct }) => {
  const cartData = useAppSelector(selectCart);
  const inCartThisProduct = cartData.find((item) => item.id === product?._id);
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    const cartItem = {
      id: product?._id,
      name: product?.productName,
      slug: product?.slug,
      price: product?.sizes[0]?.discountPrice
        ? product?.sizes[0]?.discountPrice
        : product?.sizes[0]?.price,
      image: `${imageBaseUrl}${product?.productImages[0]?.imageUrl}`,
      size: product?.sizes[0].size,
      color: product?.sizes[0].colors[0] || "N/A",
      quantity: 1,
      category: product?.category,
    };
    dispatch(addToCart(cartItem));
  };

  return (
    <div className="bg-white border rounded-lg flex flex-col justify-between">
      <div className="w-full h-[220px] relative">
        <Link href={`/marketplace/${product?.slug}`}>
          <Image
            src={`${imageBaseUrl}${product?.productImages[0]?.imageUrl}`}
            alt={product.productName}
            layout="fill"
            objectFit="cover"
            className=" absolute rounded-t-md"
          />
        </Link>
      </div>
      <div className="px-5 pt-3">
        <h2 className="text-2xl font-semibold text-primary mb-2">
          {product?.productName}
        </h2>
        <h1 className="text-lg font-semibold">About</h1>
        <p className="text-gray-600 max-w-full break-words">
          {typeof product?.productDescription === "string" &&
          product?.productDescription.length > 124 ? (
            <span>
              <span
                dangerouslySetInnerHTML={{
                  __html: product?.productDescription.substring(0, 148),
                }}
              ></span>{" "}
              <Link href={`/marketplace/${product?.slug}`}>
                <span className="text-primary underline">Read More</span>
              </Link>
            </span>
          ) : (
            <span
              dangerouslySetInnerHTML={{
                __html: product?.productDescription || "",
              }}
            ></span>
          )}
        </p>

        <h1 className=" py-2 font-semibold text-gray-700">
          Category : {product?.category}
        </h1>
      </div>
      <div className="px-5 pb-4">
        <div className="flex justify-between items-center mt-3">
          {product?.sizes[0]?.discountPrice > 0 ? (
            <p className="text-2xl font-semibold text-green-600">
              ${product?.sizes[0]?.discountPrice?.toFixed(2)}
            </p>
          ) : (
            <p className="text-2xl font-semibold text-green-600">
              ${product?.sizes[0]?.price?.toFixed(2)}
            </p>
          )}
          {product?.sizes[0]?.inStock ? (
            <p className="text-green-600 font-semibold">In Stock</p>
          ) : (
            <p className="text-red-600 font-semibold">Out of Stock</p>
          )}
        </div>

        <div className="flex justify-between items-center gap-2 mt-4">
          <button
           disabled={!product?.sizes[0]?.inStock || inCartThisProduct && inCartThisProduct.quantity >= product?.sizes[0]?.quantity}
            onClick={handleAddToCart}
            className={`${
              !product?.sizes[0]?.inStock || inCartThisProduct && inCartThisProduct.quantity >= product?.sizes[0]?.quantity ? "bg-gray-300" : "bg-secondary"
            } text-white py-2 px-4 rounded-lg w-full mt-2`}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceCard;

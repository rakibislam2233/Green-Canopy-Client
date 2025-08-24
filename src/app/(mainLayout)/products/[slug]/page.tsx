import ProductDetails from "@/components/Pages/Products/ProductDetails/ProductDetails";
import { Metadata } from "next";

interface IProductDetails {
  id: string;
  productName: string;
  productDescription: string;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  // Fetch product data based on the dynamic slug
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/product/slug/${params?.slug}`
  );
  const responseData = await res.json();
  const productData: IProductDetails =
    responseData?.data?.attributes?.product;
  return {
    title: `${productData?.productName} - Products | Green Canopy`,
    description: productData?.productDescription,
    keywords: `Products, trees, plants, ${productData?.productDescription}`,
  };
}

const Page = ({ params }: { params: { slug: string } }) => {
  return <ProductDetails slug={params?.slug} />;
};

export default Page;
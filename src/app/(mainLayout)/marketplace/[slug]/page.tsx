import MarketplaceDetailPage from "@/components/Pages/Marketplace/MarketPlaceDetails/MarketplaceDetailed";
import { Metadata } from "next";
interface IMarketPlaceDetails {
  id: string;
  productName: string;
  productDescription: string;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  // Fetch marketPlace data based on the dynamic id
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_IP}/api/v1/product/slug/${params?.slug}`
  );
  const responseData = await res.json();
  const marketPlaceData: IMarketPlaceDetails =
    responseData?.data?.attributes?.product;
  return {
    title: `${marketPlaceData?.productName} - Marketplace | Horticulture Specialists`,
    description: marketPlaceData?.productName,
    keywords: `MarketPlace, details, ${marketPlaceData?.productDescription}`,
  };
}
const Page = ({ params }: { params: { slug: string } }) => {
  return <MarketplaceDetailPage slug={params?.slug} />;
};

export default Page;

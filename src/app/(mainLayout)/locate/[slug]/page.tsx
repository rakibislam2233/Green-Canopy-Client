import LocateDetails from '@/components/Pages/LocateDetails/LocateDetails';
import { Metadata } from 'next';
interface ICompanyDetails {
  id: string;
  companyName: string;
  companyAbout: string;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  // Fetch company data based on the dynamic id
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_IP}/api/v1/company/slug/${params?.slug}`
  );
  const responseData = await res.json();
  const CompanyData : ICompanyDetails = responseData?.data?.attributes?.company;
  return {
    title: `${CompanyData?.companyName} - Locate | Horticulture Specialists`,
    description: CompanyData?.companyName,
    keywords: `company, details, ${CompanyData?.companyAbout}`,
  };
}
const page = ({ params }: { params: { slug: string } }) => {
  return <LocateDetails slug={params?.slug} />;
};

export default page;

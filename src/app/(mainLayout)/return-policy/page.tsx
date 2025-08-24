import ReturnPolicy from "@/components/Pages/ReturnPolicy/ReturnPolicy";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "Return Policy | Horticulture Specialists",
  description: "This is the return policy page for our application",
  keywords: ["return policy", "page", "example"],
};
const page = () => {
  return <ReturnPolicy />;
};

export default page;

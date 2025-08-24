import MyCurrentSubscription from "@/components/Dashboard/Businessman/MyCurrentSubscription/MyCurrentSubscription";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "My Current Subscription - Dashboard | Horticulture Specialists",
  description: "My Current Subscription",
  keywords: "My Current Subscription",
};
const page = () => {
  return <MyCurrentSubscription />;
};

export default page;

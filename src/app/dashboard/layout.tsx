import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import Sidebar from "@/components/Dashboard/Sidebar";
import AuthValidationProviders from "@/lib/AuthValidationProviders";
import DashboardProtectedRoutes from "@/lib/DashboardProtectedRoutes";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Dashboard | Horticulture Specialists",
  description: "This is the dashboard page for our application",
  keywords: ["dashboard", "page", "example"],
};

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthValidationProviders>
      <DashboardProtectedRoutes>
        <DashboardHeader />
        <main className="w-full h-full flex">
          <Sidebar />
          <section className="w-full md:w-[82%] p-5 ml-0 md:ml-[18%]">
            {children}
          </section>
        </main>
      </DashboardProtectedRoutes>
    </AuthValidationProviders>
  );
};

export default layout;

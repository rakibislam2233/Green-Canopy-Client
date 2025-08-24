"use client";
import React, { useEffect } from "react";
import useUser from "@/hook/useUser";
import { useRouter } from "next/navigation";

const DashboardProtectedRoutes = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const { user }: { user: any } = useUser();

  // Redirect to login if the user is not authenticated
  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  // Render children only if the user is authenticated
  if (!user) {
    return null; // Optionally, you can show a loader here while checking authentication
  }

  return <>{children}</>;
};

export default DashboardProtectedRoutes;

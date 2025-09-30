"use client";
import useUser from "@/hook/useUser";
import Image from "next/image";
import { imageBaseUrl } from "@/config/imageBaseUrl";
const DashboardHeader = () => {
  const { user } = useUser();

  return (
    <div className="w-full py-4 px-5 bg-primary text-white sticky top-0 left-0 z-10 ">
      <div className="w-full container flex items-center gap-3 relative">
        <Image
          src={`${imageBaseUrl}${user?.image}`}
          width={60}
          height={60}
          className="rounded-full cursor-pointer object-cover"
          alt="User Profile"
        />
        <div>
          <h1 className="text-xl font-semibold">{user!.fullName}</h1>
          <h1>{user?.email}</h1>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;

"use client";
import { IoSettingsOutline } from "react-icons/io5";
import {
  LuClipboardList,
  LuCopyPlus,
  LuHeart,
  LuLayoutDashboard,
} from "react-icons/lu";
import { HiBars3CenterLeft } from "react-icons/hi2";
import { FiCheckCircle } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
import useUser from "@/hook/useUser";
import ActiveDashboardLink from "./ActiveDashboardLink";
import { imageBaseUrl } from "@/config/imageBaseUrl";
import { Drawer } from "antd";
import { useState } from "react";
import { useRouter } from "next/navigation";
import logo from "@/assets/logo/logo.svg";
import { SiSubstack } from "react-icons/si";
import { useAppDispatch } from "@/redux/hooks";
import { logoutUser } from "@/redux/features/auth/authSlice";

const Sidebar = () => {
  const { user } = useUser();
  const [loginUser, setLoginUser] = useState(user);

  const [visible, setVisible] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const sidebarItems = [
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: <LuLayoutDashboard className="size-6" />,
    },
    ...(user?.role === "businessman"
      ? [
          {
            path: "/dashboard/add-company",
            name: "Add Company Info",
            icon: <LuCopyPlus className="size-7" />,
          },
          {
            path: "/dashboard/my-company",
            name: "My Company",
            icon: <LuClipboardList className="size-6" />,
          },
          {
            path: "/dashboard/my-current-subscription",
            name: "My Current Subscription",
            icon: <SiSubstack className="size-7" />,
          },
        ]
      : []),
    {
      path: "/dashboard/my-wishlist",
      name: "My Wishlist",
      icon: <LuHeart className="size-6" />,
    },
    {
      path: "/dashboard/orders",
      name: "Orders",
      icon: <FiCheckCircle className="size-6" />,
    },
    {
      path: "/dashboard/settings",
      name: "Settings",
      icon: <IoSettingsOutline className="size-6" />,
    },
  ];

  // Function to show or hide the Drawer
  const showDrawer = () => setVisible(true);
  const closeDrawer = () => setVisible(false);

  const handleLogout = () => {
    dispatch(logoutUser());
    setLoginUser(null);
    router.push("/login");
  };

  return (
    <div>
      {/* Mobile/Tablet Sidebar */}
      <div className="md:hidden fixed top-6 left-5 z-50">
        <HiBars3CenterLeft
          className="size-9 text-white cursor-pointer"
          onClick={showDrawer}
        />
      </div>
      <Drawer
        title={
          <div className="flex items-center gap-3">
            <Link href="/">
              <Image
                src={logo}
                alt="Logo"
                width={70}
                height={70}
                className="object-cover rounded-full"
              />
            </Link>
            <h1 className="text-lg italic">Horticulture Specialists</h1>
          </div>
        }
        placement="left"
        onClose={closeDrawer}
        open={visible}
        width={350}
      >
        <div className="flex justify-between items-center bg-[#F8F9FA] rounded-lg">
          <div className="flex items-center gap-3 px-5">
            <div className="size-14 relative">
              <Image
                src={`${imageBaseUrl}${user?.image}`}
                fill
                className="rounded-full cursor-pointer object-cover absolute"
                alt="User Profile"
              />
            </div>
            <div className="flex flex-col">
              <h2 className="text-md font-semibold text-gray-800">{`${
                loginUser && loginUser?.fullName
              }`}</h2>
              <p className="text-sm text-gray-600">{`${
                loginUser && loginUser?.role === "businessman"
                  ? "Business"
                  : "User"
              }`}</p>
            </div>
          </div>
        </div>
        <div className="w-full h-[1px] bg-gray-400 mb-4" />
        <ul className="w-full flex flex-col gap-2">
          {sidebarItems.map((item) => (
            <ActiveDashboardLink
              key={item.name}
              href={item.path}
              label={item.name}
              icon={item.icon}
              closeDrawer={closeDrawer} // Pass closeDrawer to each link
            />
          ))}
        </ul>
        <div className="flex flex-col gap-4 p-2  mt-16">
          <Link
            href="/"
            className="flex items-center bg-primary rounded-lg gap-2 px-5 py-4 text-white text-sm"
            onClick={closeDrawer} // Close the drawer when clicking 'Back to home'
          >
            <span>Back to home</span>
          </Link>
          <button
            className="flex items-center gap-2 bg-gray-100 rounded-lg px-10 py-4 text-rose-500 text-sm"
            onClick={handleLogout}
          >
            <span>Sign Out</span>
          </button>
        </div>
      </Drawer>

      {/* Desktop Sidebar */}
      <div className="w-[50%] md:w-[18%] h-full fixed hidden md:block overflow-y-scroll pb-32 bg-[#FFFFFF]">
        <div className="flex justify-between items-center p-4 bg-[#F8F9FA] rounded-lg">
          <div className="flex items-center gap-3 px-5">
            <div className="size-[50px] relative">
              <Image
                src={`${imageBaseUrl}${loginUser?.image}`}
                fill
                className="rounded-full cursor-pointer object-cover absolute"
                alt="User Profile"
              />
            </div>
            <div className="flex flex-col">
              <h2 className="text-md font-semibold text-gray-800">{`${
                loginUser && loginUser?.fullName
              }`}</h2>
              <p className="text-sm text-gray-600">{`${
                loginUser && loginUser?.role === "businessman"
                  ? "Business"
                  : "User"
              }`}</p>
            </div>
          </div>
        </div>
        <div className="w-full h-[1px] bg-gray-400 mb-4" />
        <ul className="w-full flex flex-col gap-2">
          {sidebarItems.map((item) => (
            <ActiveDashboardLink
              key={item.name}
              href={item.path}
              label={item.name}
              icon={item.icon}
              closeDrawer={closeDrawer} // Pass closeDrawer to each link
            />
          ))}
        </ul>

        <div className="flex flex-col xl:flex-row justify-center gap-4 p-2  mt-6">
          <Link
            href="/"
            onClick={closeDrawer} 
          >
            <button className="flex items-center bg-primary rounded-lg gap-2 px-10 py-4 text-white text-sm">
              Back
            </button>
          </Link>
          <button
            className="flex items-center gap-2 bg-gray-100 rounded-lg px-10 py-4 text-rose-500 text-sm"
            onClick={handleLogout}
          >
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

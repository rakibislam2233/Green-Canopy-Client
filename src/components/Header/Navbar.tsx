"use client";
import logo from "@/assets/logo/logo.png";
import { imageBaseUrl } from "@/config/imageBaseUrl";
import useUser from "@/hook/useUser";
import { logoutUser } from "@/redux/features/auth/authSlice";
import { selectTotalCount } from "@/redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { MenuOutlined } from "@ant-design/icons";
import { Button, Drawer, Dropdown } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoMdCart } from "react-icons/io";
import ActiveLink from "./ActiveLink";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user } = useUser();
  const totalCartQuantity = useAppSelector(selectTotalCount);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const navLink = [
    { label: "Home", href: "/" },
    {
      label: "Products",
      href: "/products",
    },
    { label: "About Us", href: "/about-us" },
    { label: "Contact", href: "/contact-us" },
  ];
  const subNavLinks = [
    { label: "Home", href: "/" },
    {
      label: "Products",
      href: "/products",
    },
    { label: "About Us", href: "/about-us" },
    { label: "Contact", href: "/contact-us" },
  ];
  if (user?.role === "businessman") {
    subNavLinks.push({
      href: "/subscription",
      label: "Subscription",
    });
  }
  const showDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  // handle logout
  const handleLogout = () => {
    dispatch(logoutUser());
    router.push("/login");
  };

  //menu item
  const menuItems = [
    {
      key: "1",
      label: (
        <Link
          href="/dashboard"
          className="cursor-pointer px-4 py-2 text-sm md:text-base"
        >
          Dashboard
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <Link
          href="/dashboard/orders"
          className="cursor-pointer px-4 py-2 text-sm md:text-base"
        >
          Order
        </Link>
      ),
    },
    {
      key: "3",
      label: (
        <Link
          href="/dashboard/settings"
          className="cursor-pointer px-4 py-2 text-sm md:text-base"
        >
          Settings
        </Link>
      ),
    },
    {
      key: "4",
      label: (
        <div
          onClick={handleLogout}
          className="cursor-pointer px-4 py-2 text-sm md:text-base"
        >
          Logout
        </div>
      ),
    },
  ];

  return (
    <nav className="w-full py-2border-b">
      <div className="container mx-auto px-4 md:px-5 flex justify-between items-center">
        {/* logo */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src={logo}
            width={60}
            height={60}
            alt="logo"
            className="rounded-full object-contain sm:w-[70px] sm:h-[70px] md:w-[80px] md:h-[80px]"
          />
        </Link>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex justify-center items-center gap-4 lg:gap-5">
          {navLink.map((link) => (
            <li key={link.href}>
              <ActiveLink href={link.href} label={link.label} key={link.href} />
            </li>
          ))}
        </ul>
        <div className="hidden md:flex items-center gap-4 lg:gap-6">
          <Link href="/cart" className="relative">
            <div className="relative">
              <IoMdCart className="size-6 md:size-7 text-primary" />
              <div className="size-[16px] md:size-[18px] bg-primary rounded-full flex justify-center items-center absolute -top-2 -right-1">
                <h1 className="text-xs text-white">{totalCartQuantity}</h1>
              </div>
            </div>
          </Link>
          {user ? (
            <Dropdown
              menu={{
                items: menuItems,
              }}
              placement="bottomRight"
              arrow
            >
              {user && (
                <div className="size-[40px] md:size-[50px] rounded-full bg-yellow-200 relative cursor-pointer">
                  <Image
                    fill
                    src={`${imageBaseUrl}${user?.image}`}
                    alt="User Image"
                    className="rounded-full cursor-pointer ring ring-primary absolute object-cover"
                  />
                </div>
              )}
            </Dropdown>
          ) : (
            <>
              <Link href="/login">
                <button className="text-white bg-primary px-4 py-2 md:px-6 md:py-2 rounded-lg text-sm md:text-base">
                  Login
                </button>
              </Link>
              <Link href="/register">
                <button className="px-4 py-2 md:px-6 md:py-2 border border-primary text-primary rounded-lg text-sm md:text-base">
                  Register
                </button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Drawer Button */}
        <Button
          type="text"
          className="md:hidden text-xl"
          icon={<MenuOutlined className="text-xl" />}
          onClick={showDrawer}
        />

        {/* Drawer for Mobile Navigation */}
        <Drawer
          title={
            <div className="flex items-center gap-2">
              <Image
                src={logo}
                width={40}
                height={40}
                alt="logo"
                className="rounded-full"
              />
              <span className="text-lg">Green Canopy</span>
            </div>
          }
          placement="right"
          onClose={closeDrawer}
          open={isDrawerOpen}
          className="md:hidden"
        >
          <ul className="flex flex-col gap-4 mb-6">
            {subNavLinks?.map((link) => (
              <li key={link?.href} className="border-b border-gray-200 pb-2">
                <Link
                  href={link?.href}
                  className="text-gray-700 hover:text-gray-900 text-lg font-medium block py-2"
                  onClick={closeDrawer} // Close the drawer on link click
                >
                  {link?.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between py-3 border-b border-gray-200">
              <Link
                href="/cart"
                className="flex items-center gap-3"
                onClick={closeDrawer}
              >
                <IoMdCart className="size-7 text-primary" />
                <span className="text-lg font-medium">Cart</span>
              </Link>
              <div className="size-[22px] bg-primary rounded-full flex justify-center items-center">
                <h1 className="text-xs text-white">
                  {totalCartQuantity ? totalCartQuantity : 0}
                </h1>
              </div>
            </div>

            {user?.fullName ? (
              <>
                <div className="flex items-center gap-4 py-4">
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-3"
                    onClick={closeDrawer}
                  >
                    <div className="size-[60px] rounded-full bg-yellow-200 relative overflow-hidden">
                      <Image
                        fill
                        src={`${imageBaseUrl}${user?.image}`}
                        alt="User Image"
                        className="rounded-full cursor-pointer ring ring-primary absolute object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{user?.fullName}</p>
                      <p className="text-sm text-gray-500">{user?.email}</p>
                    </div>
                  </Link>
                </div>

                <div className="flex flex-col gap-2">
                  <Link href="/dashboard" onClick={closeDrawer}>
                    <button className="w-full text-left text-gray-700 py-2 px-4 hover:bg-gray-100 rounded-lg">
                      Dashboard
                    </button>
                  </Link>
                  <Link href="/dashboard/orders" onClick={closeDrawer}>
                    <button className="w-full text-left text-gray-700 py-2 px-4 hover:bg-gray-100 rounded-lg">
                      Orders
                    </button>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left text-red-600 py-2 px-4 hover:bg-gray-100 rounded-lg"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col gap-4">
                <Link href="/login" onClick={closeDrawer}>
                  <button className="w-full text-white bg-primary hover:bg-green-600 px-6 py-3 rounded-lg text-base">
                    Login
                  </button>
                </Link>
                <Link href="/register" onClick={closeDrawer}>
                  <button className="w-full px-6 py-3 border border-primary text-primary rounded-lg text-base">
                    Register
                  </button>
                </Link>
              </div>
            )}
          </div>
        </Drawer>
      </div>
    </nav>
  );
};

export default Navbar;

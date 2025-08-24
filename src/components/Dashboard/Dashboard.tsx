"use client";
import { imageBaseUrl } from "@/config/imageBaseUrl";
import useUser from "@/hook/useUser";
import { updatedUser } from "@/redux/features/auth/authSlice";
import {
  useUpdateProfileImageMutation,
  useUpdateProfileMutation,
} from "@/redux/features/profile/profileApi";
import { useAppDispatch } from "@/redux/hooks";
import { Form } from "antd";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IoIosCall } from "react-icons/io";
import { IoCameraReverse } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { toast } from "sonner";
import InputComponent from "../UI/InputComponent";

interface FormValues {
  fullName: string;
  email: string;
  phone: string;
}

// Component for viewing profile
const ViewProfile = ({ user, onEdit }: { user: any; onEdit: () => void }) => (
  <div className="w-full">
    <Form layout="vertical" className="mt-5">
      <Form.Item label="Full Name" className="space-y-1">
        <InputComponent readOnly defaultValue={user?.fullName || "N/A"} />
      </Form.Item>
      <Form.Item label="Email" className="space-y-1">
        <InputComponent readOnly defaultValue={user?.email || "N/A"} />
      </Form.Item>
      <Form.Item label="Phone" className="space-y-1">
        <InputComponent readOnly defaultValue={user?.phoneNumber || "N/A"} />
      </Form.Item>
    </Form>

    <button
      className="px-8 rounded-lg py-2 bg-primary text-white mt-5"
      onClick={onEdit}
    >
      Edit
    </button>
  </div>
);

// Component for editing profile
const EditProfile = ({
  initialValues,
  onSave,
  onCancel,
}: {
  initialValues: FormValues;
  onSave: (values: FormValues) => void;
  onCancel: () => void;
}) => (
  <Form
    layout="vertical"
    initialValues={initialValues}
    onFinish={onSave}
    className="mt-5"
  >
    <div className="flex flex-col gap-5">
      <Form.Item
        label="Full Name"
        name="fullName"
        className="space-y-1"
        rules={[{ required: true, message: "Full name is required" }]}
      >
        <input
          type="text"
          className="w-full rounded-lg px-4 py-3 border border-primary outline-none"
          placeholder="Enter full name"
        />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        className="space-y-1"
        rules={[{ type: "email", message: "Please enter a valid email" }]}
      >
        <input
          type="email"
          className="w-full rounded-lg px-4 py-3 border border-primary outline-none"
          readOnly
        />
      </Form.Item>

      <Form.Item
        label="Phone Number"
        name="phone"
        className="space-y-1"
        rules={[{ required: true, message: "Phone number is required" }]}
      >
        <input
          type="text"
          className="w-full rounded-lg px-4 py-3 border border-primary outline-none"
          placeholder="Enter phone number"
        />
      </Form.Item>
    </div>
    <div className="flex gap-3 mt-5">
      <button
        className="px-8 rounded-lg py-2 bg-primary text-white"
        type="submit"
      >
        Save
      </button>
      <button
        className="px-8 rounded-lg py-2 bg-red-600 text-white"
        onClick={onCancel}
      >
        Cancel
      </button>
    </div>
  </Form>
);

// Main Dashboard Component
const Dashboard = () => {
  const { user } = useUser();
  const [initialValues, setInitialValues] = useState<FormValues | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isPreviewImage, setPreviewImage] = useState<string>("");
  const [updateProfile] = useUpdateProfileMutation();
  const [updateProfileImage] = useUpdateProfileImageMutation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      setInitialValues({
        fullName: (user!.fullName as string) || "John Doe",
        email: (user?.email as string) || "john.doe@example.com",
        phone: (user?.phoneNumber as string) || "N/A",
      });
    }
  }, [user]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const validFileExtensions = ["image/jpeg", "image/png"];
    // Filter valid files based on their MIME type
    if (!validFileExtensions.includes(file?.type ?? "")) {
      toast.error(
        `${file?.name} is not a valid image file (only JPG/PNG allowed).`
      );
      return false;
    }
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      try {
        const formData = new FormData();
        formData.append("profileImage", file);
        const res = await updateProfileImage(formData).unwrap();
        dispatch(updatedUser(res?.data?.attributes));
        toast.success("Profile image updated successfully");
      } catch (error: any) {
        toast.error(error?.data?.message);
      }
    }
  };

  const onSave = async (values: FormValues) => {
    try {
      const updatedData = {
        fullName: values.fullName,
        email: values.email,
        phoneNumber: values.phone,
      };
      const res = await updateProfile(updatedData).unwrap();
      dispatch(updatedUser(res?.data?.attributes));
      toast.success("Profile updated successfully");
      setIsEditing(false);
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };

  const onCancel = () => setIsEditing(false);

  return (
    <section className="w-full">
      <h1 className="text-2xl md:text-4xl font-semibold border-b py-3.5">
        My Profile
      </h1>
      <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-5 py-10">
        {/* Profile Picture Section */}
        <div className="col-span-full md:col-span-3 border py-8 rounded-lg">
          <div className="flex justify-center items-center flex-col gap-3 relative">
            {/* Image preview */}
            <div className="size-[110px] relative group">
              <Image
                src={isPreviewImage || `${imageBaseUrl}${user?.image}`}
                fill
                alt="logo"
                className="rounded-full absolute ring-4 ring-primary"
              />
              {/* Hover change label */}
              <label
                htmlFor="profileImage"
                className="absolute flex justify-center items-center  rounded-full bg-primary text-white size-9  top-16 -right-2 cursor-pointer"
              >
                <IoCameraReverse className="size-6" />
              </label>
            </div>
            {/* Hidden file input */}
            <input
              id="profileImage"
              type="file"
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleImageChange}
            />
            <h1 className="text-2xl font-semibold">{`${user?.fullName}`}</h1>
            <p className="text-gray-600">{`${
              user?.role === "businessman" ? "Business" : "User"
            }`}</p>
          </div>
          <div className="w-full h-[1px] bg-gray-200 mt-5"></div>
          <div className="p-5 space-y-5">
            <div className="flex items-center gap-3">
              <div className="size-12 flex-shrink-0 flex justify-center items-center bg-primary rounded-full">
                <MdEmail className="size-5 text-white" />
              </div>
              <p>{`${user?.email}`}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="size-12 flex justify-center items-center bg-primary rounded-full">
                <IoIosCall className="size-5 text-white" />
              </div>
              <p>{`${user?.phoneNumber ? user?.phoneNumber : "N/A"}`}</p>
            </div>
          </div>
        </div>
        {/* Profile Info Section */}
        <div className="col-span-full md:col-span-9 border p-5 rounded-lg">
          {initialValues &&
            (!isEditing ? (
              <ViewProfile user={user} onEdit={() => setIsEditing(true)} />
            ) : (
              <EditProfile
                initialValues={initialValues}
                onSave={onSave}
                onCancel={onCancel}
              />
            ))}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;

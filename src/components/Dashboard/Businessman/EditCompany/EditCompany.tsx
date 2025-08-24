/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useEffect } from "react";
import { Form, Select, Spin } from "antd";
import InputComponent from "@/components/UI/InputComponent";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useLoadScript } from "@react-google-maps/api";
import Button from "@/components/UI/Button";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import {
  useDeleteCompanyImageMutation,
  useGetSingleCompanyByIdQuery,
  useUpdateMyCompanyMutation,
} from "@/redux/features/company/companyApi";
import { imageBaseUrl } from "@/config/imageBaseUrl";
import Loading from "@/components/Loading/Loading";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useGetCompanyTypesQuery } from "@/redux/features/companyType/companyTypeApi";
import { ICompanyImage, ICompanyType } from "@/types/companyTyes";
import Image from "next/image";

// Define types for company information and images
interface FormValues {
  companyName?: string;
  companyType?: string;
  companyLocation?: string;
  companyAbout?: string;
  companyDescription?: string;
  contactNumber?: string;
  email?: string;
  website?: string;
  country?: string;
  city?: string;
  state?: string;
  zipCode?: string;
}

// Google Maps libraries type
const libraries: ("places" | "drawing" | "geometry" | "visualization")[] = [
  "places",
  "drawing",
  "geometry",
  "visualization",
];

const EditCompany: React.FC<{ id: string }> = ({ id }) => {
  const limit = 50000;
  const { data: responseData } = useGetSingleCompanyByIdQuery(id, {
    skip: !id,
  });
  const { data: responseCompanyTypeData } = useGetCompanyTypesQuery(limit);
  const companyTypes: ICompanyType[] | undefined =
    responseCompanyTypeData?.data?.attributes?.results;
  const companyData = responseData?.data?.attributes?.company || {};
  const [form] = Form.useForm<FormValues>();
  const [companyImages, setCompanyImages] = useState<ICompanyImage[]>([]);
  const [uploadNewImages, setUploadNewImages] = useState<File[]>([]);
  const [address, setAddress] = useState<string>("");
  const router = useRouter();
  const [latitude, setLatitude] = useState<number | null>(
    companyData.companyLocation?.latitude ?? null
  );
  const [longitude, setLongitude] = useState<number | null>(
    companyData.companyLocation?.longitude ?? null
  );

  const [removeCompanyImage, { isLoading: imageDeleteLoading }] =
    useDeleteCompanyImageMutation();
  const [updateMyCompany, { isLoading }] = useUpdateMyCompanyMutation();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries,
  });

  useEffect(() => {
    form.setFieldsValue({
      companyName: companyData.companyName || "",
      companyLocation: companyData?.companyInformation?.address || "",
      companyType: companyData.companyType || "",
      companyAbout: companyData.companyAbout || "",
      companyDescription:
        companyData?.companyInformation?.companyDescription || "",
      contactNumber: companyData?.companyInformation?.contactNumber || "",
      email: companyData?.companyInformation?.email || "",
      website: companyData?.companyInformation?.website || "",
      country: companyData?.companyInformation?.country || "",
      city: companyData?.companyInformation?.city || "",
      state: companyData?.companyInformation?.state || "",
      zipCode: companyData?.companyInformation?.zipCode || "",
    });
    const images = companyData?.companyImages?.map((image: ICompanyImage) => ({
      file: image?.file,
      _id: image?._id,
      imageUrl: `${imageBaseUrl}${image?.imageUrl}`,
    })) as ICompanyImage[];
    setCompanyImages(images);
    setLatitude(companyData?.companyLocation?.latitude || null);
    setLongitude(companyData?.companyLocation?.longitude || null);
    setAddress(companyData?.companyInformation?.address || "");
  }, [companyData, form]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []); // Convert FileList to Array
    const validFileExtensions = ["image/jpeg", "image/png"];

    const validFiles = files.filter((file) => {
      if (!validFileExtensions.includes(file.type)) {
        toast.error(
          `${file?.name} is not a valid image file (only JPG/PNG allowed).`
        );
        return false;
      }
      return true;
    });

    if (validFiles.length > 0) {
      const newImages = validFiles.map((file) => ({
        file,
        _id: Date.now() + Math.random(),
        originalFile: file,
        imageUrl: URL.createObjectURL(file),
      })) as ICompanyImage[];
      setUploadNewImages((prev) => [...prev, ...validFiles]);
      setCompanyImages((prev) => [...prev, ...newImages]);
    }
  };

  const handleRemoveImage = async (
    imageId: string,
    originalFile: Record<string, any>
  ) => {
    if (companyImages?.length <= 2) {
      toast.error("You must have at least 2 images");
      return;
    }
    if (originalFile) {
      setCompanyImages(companyImages.filter((img) => img._id !== imageId));
      return;
    }
    try {
      await removeCompanyImage({
        companyId: companyData?._id,
        imageId,
      }).unwrap();
    } catch (error: any) {
      toast.error(error?.data?.message || "Error removing image");
    }
  };

  const onFinish = async (values: FormValues) => {
    const {
      companyName,
      companyType,
      companyAbout,
      companyDescription,
      city,
      contactNumber,
      email,
      country,
      state,
      zipCode,
      website,
    } = values;
    const formData = new FormData();

    const companyLocation = {
      type: "Point",
      coordinates: [longitude, latitude],
    };

    const newCompanyInformation = {
      country: country,
      city: city,
      contactNumber: contactNumber,
      email: email,
      state: state,
      zipCode: zipCode,
      website: website ?? "",
      companyDescription: companyDescription ?? "",
      address: address,
    };

    //company name
    formData.append("companyName", companyName ?? "");
    //company location
    formData.append("companyLocation", JSON.stringify(companyLocation));
    //company type
    formData.append("companyType", companyType ?? "");
    //company about
    formData.append("companyAbout", companyAbout ?? "");
    //company information
    formData.append(
      "companyInformation",
      JSON.stringify(newCompanyInformation)
    );
    uploadNewImages.forEach((image) => {
      formData.append("companyImages", image);
    });
    try {
      const res = await updateMyCompany({
        id: companyData._id,
        data: formData,
      }).unwrap();

      toast.success(res.message);
      router.push("/dashboard/my-company");
    } catch (error: any) {
      toast.error(error?.data?.message || "Error updating company");
    }
  };

  const handlePlaceSelect = (
    autocomplete: google.maps.places.Autocomplete
  ): void => {
    const place = autocomplete.getPlace();
    if (place.geometry) {
      setLatitude(place.geometry.location?.lat() ?? null);
      setLongitude(place.geometry.location?.lng() ?? null);
      form.setFieldsValue({
        companyLocation: place.formatted_address ?? "",
      });
      setAddress(place.formatted_address ?? "");
      const addressComponents = place.address_components;
      const country =
        addressComponents?.find((component) =>
          component.types.includes("country")
        )?.long_name ?? "";
      const city =
        addressComponents?.find((component) =>
          component.types.includes("locality")
        )?.long_name ?? "";

      const state =
        addressComponents?.find((component) =>
          component.types.includes("administrative_area_level_1")
        )?.long_name ?? "";
      let zipCode =
        addressComponents?.find((component) =>
          component.types.includes("postal_code")
        )?.long_name ?? "";

      if (!zipCode) {
        zipCode =
          addressComponents?.find((component) =>
            component.types.includes("administrative_area_level_2")
          )?.long_name ?? "";
      }

      form.setFieldsValue({
        country: country,
        city: city,
        state: state,
        zipCode: zipCode,
      });
    }
  };

  const handleLoadAutocomplete = (
    autocomplete: google.maps.places.Autocomplete
  ): void => {
    if (autocomplete) {
      autocomplete.addListener("place_changed", () =>
        handlePlaceSelect(autocomplete)
      );
    }
  };

  if (!isLoaded) {
    return <Loading />;
  }

  return (
    <section className="w-full">
      <h1 className="text-2xl md:text-4xl font-semibold border-b py-4">
        Edit Company
      </h1>
      <label className="text-gray-700 font-medium my-2 block">
        Company Images
      </label>
      <div className="flex gap-4 flex-wrap items-center mt-5">
        {imageDeleteLoading ? (
          <Spin />
        ) : (
          companyImages?.map((img, index) => (
            <div key={index} className="relative w-24 h-24">
              <Image
                src={`${img?.imageUrl}`}
                alt={`Product-${index}`}
                width={96} // set the width you need
                height={96}
                className="w-full h-full object-cover rounded-lg border"
              />

              <div
                onClick={() =>
                  handleRemoveImage(
                    img?._id as string,
                    img?.originalFile as Record<string, any>
                  )
                }
                className="absolute -top-2 -right-2 size-5 flex justify-center items-center bg-rose-500 text-white rounded-full p-1 cursor-pointer"
              >
                <DeleteOutlined />
              </div>
            </div>
          ))
        )}
        <label
          htmlFor="image-upload"
          className="w-24 h-24 flex items-center justify-center border border-dashed rounded-lg cursor-pointer hover:border-gray-400 transition"
        >
          <PlusOutlined className="text-gray-500 text-xl" />
        </label>
        <input
          id="image-upload"
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageUpload}
          style={{ display: "none" }}
        />
      </div>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
        className="grid grid-cols-1 md:grid-cols-2 gap-4 py-10"
      >
        {/* Company Name */}
        <Form.Item
          label="Company Name"
          name="companyName"
          rules={[{ required: true, message: "Please enter the company name" }]}
        >
          <InputComponent placeholder="Enter company name" />
        </Form.Item>
        {/* Company Location */}
        <Form.Item
          label="Company Location"
          name="companyLocation"
          rules={[
            { required: true, message: "Please enter the company location" },
          ]}
        >
          <InputComponent
            type="text"
            onFocus={(e) => {
              const autocomplete = new window.google.maps.places.Autocomplete(
                e.target
              );
              handleLoadAutocomplete(autocomplete); // Load Autocomplete when focused
            }}
            placeholder="Enter location"
          />
        </Form.Item>
        {/* About the Company */}
        <Form.Item
          label="About the Company (Max 180 characters)"
          name="companyAbout"
          rules={[
            {
              required: true,
              message: "Please provide information about the company",
            },
          ]}
        >
          <InputComponent
            isTextArea
            maxLength={180}
            placeholder="Enter about the company"
            rows={4}
          />
        </Form.Item>
        <Form.Item
          label="Company Description (Max 1500 characters)"
          name="companyDescription"
          rules={[
            {
              required: true,
              message: "Please enter the company description",
            },
          ]}
        >
          <InputComponent
            maxLength={1500}
            isTextArea
            placeholder="Enter description"
            rows={4}
          />
        </Form.Item>
        <Form.Item label="Company Type" name="companyType">
          <Select
            placeholder="Select company type"
            size="large"
            options={companyTypes?.map((type: ICompanyType) => ({
              value: type?.companyTypeName,
              label: type?.companyTypeName,
            }))}
          />
        </Form.Item>
        <Form.Item
          label="Contact Number"
          name="contactNumber"
          rules={[
            {
              required: true,
              message: "Please enter a contact number",
            },
          ]}
        >
          <PhoneInput
            defaultCountry="US"
            value=""
            onChange={() => {}}
            style={{ width: "100%" }}
            international
            className={`w-full border border-gray-200 px-4 py-3 text-[16px] bg-white text-gray-700 rounded-lg focus:border-primary `}
            placeholder="Enter phone number"
          />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please enter an email address",
            },
            {
              type: "email",
              message: "Please enter a valid email address",
            },
          ]}
        >
          <InputComponent placeholder="Enter email" />
        </Form.Item>

        <Form.Item
          label="Website"
          name="website"
          rules={[
            {
              type: "url",
              message: "Please enter a valid URL",
            },
            {
              validator: (_, value) => {
                if (value && !/^https:\/\//.test(value)) {
                  return Promise.reject(
                    new Error("Please enter a URL starting with https://")
                  );
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <InputComponent placeholder="https://example.com" />
        </Form.Item>
        {/* country */}
        <Form.Item
          label="Country"
          name="country"
          rules={[{ required: true, message: "Please enter the country" }]}
        >
          <InputComponent placeholder="Enter country" />
        </Form.Item>
        <Form.Item
          label="City"
          name="city"
          rules={[{ required: true, message: "Please enter a city" }]}
        >
          <InputComponent placeholder="Enter city" />
        </Form.Item>

        <Form.Item
          label="State"
          name="state"
          rules={[{ required: true, message: "Please enter the state" }]}
        >
          <InputComponent placeholder="Enter state" />
        </Form.Item>

        <Form.Item label="ZIP Code" name="zipCode">
          <InputComponent placeholder="Enter ZIP code" />
        </Form.Item>

        <Form.Item className="col-span-full flex justify-end items-center">
          <div className="w-full md:w-56 mt-5">
            <Button type="submit" loading={isLoading}>
              Submit
            </Button>
          </div>
        </Form.Item>
      </Form>
    </section>
  );
};

export default EditCompany;

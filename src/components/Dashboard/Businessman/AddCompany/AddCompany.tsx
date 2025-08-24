/* eslint-disable no-undef */
"use client";
import React, { useState } from "react";
import { Form, Select } from "antd";
import InputComponent from "@/components/UI/InputComponent";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useLoadScript } from "@react-google-maps/api";
import Button from "@/components/UI/Button";
import { useAddCompanyMutation } from "@/redux/features/company/companyApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading/Loading";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useGetCompanyTypesQuery } from "@/redux/features/companyType/companyTypeApi";
import { ICompanyType } from "@/types/companyTyes";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Image from "next/image";

// Define props for the DraggableImage component
interface DraggableImageProps {
  img: string;
  index: number;
  moveImage: (fromIndex: number, toIndex: number) => void;
  handleRemoveImage: (index: number) => void;
  primaryImageIndex: number;
  handleSetPrimaryImage: (index: number) => void;
}

// DraggableImage component
const DraggableImage: React.FC<DraggableImageProps> = ({
  img,
  index,
  moveImage,
  handleRemoveImage,
  primaryImageIndex,
  handleSetPrimaryImage,
}) => {
  const [, ref] = useDrag({
    type: "image",
    item: { index },
  });

  const [, drop] = useDrop({
    accept: "image",
    hover: (item: { index: number }) => {
      if (item.index !== index) {
        moveImage(item.index, index);
        item.index = index;
      }
    },
  });

  return (
    <div {...drop} className="relative w-24 h-24">
      <Image
        src={img}
        alt={`Product-${index}`}
        width={96} // set the width you need
        height={96} // set the height you need
        className={`w-full h-full object-cover rounded-lg border ${
          index === primaryImageIndex ? "border-primary" : "border-gray-200"
        }`}
      />
      <button
        onClick={() => handleRemoveImage(index)}
        className="absolute -top-2 -right-2 size-5 flex justify-center items-center bg-rose-500 text-white rounded-full p-1 cursor-pointer"
      >
        <DeleteOutlined />
      </button>
      <div
        onClick={() => handleSetPrimaryImage(index)}
        className="absolute bottom-1 right-1 bg-primary text-white rounded-full p-1 text-xs cursor-pointer"
      >
        {index === primaryImageIndex ? "Primary" : "Set"}
      </div>
    </div>
  );
};

// Define the form's expected values
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

// Google Maps libraries
const libraries: ("places" | "drawing" | "geometry" | "visualization")[] = [
  "places",
  "drawing",
  "geometry",
  "visualization",
];

// Main AddCompany component
const AddCompany: React.FC = () => {
  const [form] = Form.useForm<FormValues>();
  const [address, setAddress] = useState<string>("");
  const [primaryImageIndex, setPrimaryImageIndex] = useState<number>(0);
  const [companyImages, setCompanyImages] = useState<string[]>([]);
  const [companyFile, setCompanyFiles] = useState<File[]>([]);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const limit = 50000;
  const router = useRouter();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries,
  });

  // API calls
  const { data: responseData } = useGetCompanyTypesQuery(limit);
  const companyTypes: ICompanyType[] | undefined =
    responseData?.data?.attributes?.results;
  const [addCompany, { isLoading }] = useAddCompanyMutation();

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
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

    const imageUrls = validFiles.map((file) => URL.createObjectURL(file));
    setCompanyFiles([...companyFile, ...validFiles]);
    setCompanyImages([...companyImages, ...imageUrls]);
  };

  // Handle drag-and-drop files
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
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

    const imageUrls = validFiles.map((file) => URL.createObjectURL(file));
    setCompanyFiles((prevFiles) => [...prevFiles, ...validFiles]);
    setCompanyImages((prevImages) => [...prevImages, ...imageUrls]);
  };

  // Handle drag over
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  // Move image
  const moveImage = (fromIndex: number, toIndex: number) => {
    const updatedImages = [...companyImages];
    const updatedFiles = [...companyFile];

    const [movedImage] = updatedImages.splice(fromIndex, 1);
    const [movedFile] = updatedFiles.splice(fromIndex, 1);

    updatedImages.splice(toIndex, 0, movedImage);
    updatedFiles.splice(toIndex, 0, movedFile);

    setCompanyImages(updatedImages);
    setCompanyFiles(updatedFiles);
  };

  // Set primary image
  const handleSetPrimaryImage = (index: number) => {
    if (index === 0) return;

    const updatedImages = [...companyImages];
    const updatedFiles = [...companyFile];

    const [selectedImage] = updatedImages.splice(index, 1);
    const [selectedFile] = updatedFiles.splice(index, 1);

    updatedImages.unshift(selectedImage);
    updatedFiles.unshift(selectedFile);

    setCompanyImages(updatedImages);
    setCompanyFiles(updatedFiles);
    setPrimaryImageIndex(0);
  };

  // Remove image
  const handleRemoveImage = (index: number) => {
    const updatedImages = companyImages.filter((_, i) => i !== index);
    const updatedFiles = companyFile.filter((_, i) => i !== index);
    setCompanyImages(updatedImages);
    setCompanyFiles(updatedFiles);
    if (primaryImageIndex === index && updatedImages.length > 0) {
      setPrimaryImageIndex(0);
    } else if (primaryImageIndex > index) {
      setPrimaryImageIndex(primaryImageIndex - 1);
    }
  };

  const onFinish = async (values: FormValues) => {
    const {
      companyName,
      companyType,
      companyAbout,
      companyDescription,
      city,
      country,
      contactNumber,
      email,
      state,
      zipCode,
      website,
    } = values;
    const formData = new FormData();

    const companyLocation = {
      type: 'Point',
      coordinates: [longitude, latitude] 
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
    // Append product images
    companyFile.forEach((image) => {
      formData.append("companyImages", image);
    });
    try {
      const res = await addCompany(formData).unwrap();
      form.resetFields();
      toast.success(res.message);
      router.push("/dashboard/my-company");
    } catch (error: any) {
      toast.error(error?.data?.message);
      router.push("/subscription");
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
      <h1 className="text-2xl md:text-4xl font-semibold border-b py-3.5">
        Add Company
      </h1>
      <div className="mb-6">
        <label className="text-gray-700 font-medium mb-2 block">
          Company Images
        </label>
        <DndProvider backend={HTML5Backend}>
          {/* Drop Zone */}
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="flex flex-wrap gap-4 items-center border border-dashed rounded-lg p-4 cursor-pointer hover:border-gray-400 transition"
          >
            {/* Instructions for the user */}
            {companyImages.length === 0 && (
              <p className="text-gray-500 text-center w-full text-lg">
                Drag and drop your images here <br /> or{" "}
                <label
                  htmlFor="image-upload"
                  className="text-primary cursor-pointer"
                >
                  click
                </label>{" "}
                to browse
              </p>
            )}

            {/* Render Images */}
            {companyImages.map((img, index) => (
              <DraggableImage
                key={index}
                img={img}
                index={index}
                moveImage={moveImage}
                handleRemoveImage={handleRemoveImage}
                primaryImageIndex={primaryImageIndex}
                handleSetPrimaryImage={handleSetPrimaryImage}
              />
            ))}

            {/* Add Image Button */}
            {companyFile.length !== 0 && (
              <label
                htmlFor="image-upload"
                className="w-24 h-24 flex items-center justify-center border border-dashed rounded-lg cursor-pointer hover:border-gray-400 transition"
              >
                <PlusOutlined className="text-gray-500 text-xl" />
              </label>
            )}
            <input
              id="image-upload"
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />
          </div>
        </DndProvider>
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
          <InputComponent maxLength={1500 } isTextArea placeholder="Enter description" rows={4} />
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

export default AddCompany;

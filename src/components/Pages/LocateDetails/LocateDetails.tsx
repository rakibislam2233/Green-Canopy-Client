"use client";
import Loading from "@/components/Loading/Loading";
import Button from "@/components/UI/Button";
import InputComponent from "@/components/UI/InputComponent";
import { imageBaseUrl } from "@/config/imageBaseUrl";
import useUser from "@/hook/useUser";
import {
  useAddCompanyReviewMutation,
  useDeleteCompanyReviewMutation,
  useGetSingleCompanyQuery,
  useUpdateCompanyReviewMutation,
} from "@/redux/features/company/companyApi";
import { ICompany } from "@/types/company";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { Form, Rate } from "antd";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaGlobe, FaPhone, FaRegStar, FaStar } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { toast } from "sonner";
import Swal from "sweetalert2";
import LocateCarousel from "./LocateCarousel";

const LocateDetails = ({ slug }: { slug: string }) => {
  const { user } = useUser();
  const [form] = Form.useForm();
  const router = useRouter();
  const [isEditReview, setIsEditReview] = useState(false);
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [addReview, { isLoading: isReviewLoading }] =
    useAddCompanyReviewMutation();
  const [deleteReview] = useDeleteCompanyReviewMutation();
  const { data: responseData, isLoading } = useGetSingleCompanyQuery(slug, {
    skip: !slug,
  });

  const [updateReview, { isLoading: updateReviewLoading }] =
    useUpdateCompanyReviewMutation();

  const companyData: ICompany = responseData?.data?.attributes?.company;
  const reviewsData = responseData?.data?.attributes?.company?.reviews;
  const isUserAddReview = reviewsData?.some(
    (review: { userId: { _id: string } }) => review.userId?._id === user?._id
  );

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: ["places"],
  });

  if (!isLoaded) return <Loading />;
  const handleMarkerIcon = () => {
    if (typeof window !== "undefined" && window.google) {
      return new window.google.maps.Size(40, 40);
    }
    return null; // Fallback in case google maps is not available
  };

  const handleAddReview = async (values: {
    rating: number;
    comment: string;
  }) => {
    if (!user) {
      router.push(`/login?redirectUrl=locate/${companyData?.slug}`);
      return;
    }
    const data = {
      rating: values.rating,
      comment: values.comment,
      companyId: companyData?._id,
    };

    try {
      const res = await addReview(data).unwrap();
      toast.success(res.message);
      form.resetFields();
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };

  const handleDeleteReview = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this review?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3FB249",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    })
      .then(async (result) => {
        if (result.isConfirmed) {
          const res = await deleteReview(id).unwrap();
          toast.success(res.message);
        }
      })
      .catch((error) => {
        toast.error(error?.data?.message);
      });
  };

  const handleUpdateReview = async (
    id: string,
    values: { rating: number; comment: string }
  ) => {
    try {
      const data = {
        rating: values.rating,
        comment: values.comment,
        reviewId: id,
      };

      const res = await updateReview({ id: id, data }).unwrap();
      toast.success(res.message);
      setIsEditReview(false);
      setEditingReviewId(null);
      form.resetFields();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update review");
    }
  };

  const toggleEditReview = (review: {
    _id: string;
    rating: number;
    comment: string;
  }) => {
    setIsEditReview(true);
    setEditingReviewId(review._id);
    form.setFieldsValue({
      rating: review.rating,
      comment: review.comment,
    });
  };

  const companyImages = companyData?.companyImages || [];
  const OPTIONS = {};
  const SLIDE_COUNT = companyImages?.length;
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys());
  let content = null;

  if (isLoading) {
    content = <Loading />;
  } else {
    content = (
      <div className="w-full md:container mx-auto p-4 sm:p-6 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16">
          {/* Company Details Section */}
          <div className="bg-zinc-50 p-4 sm:p-6 rounded-lg shadow-md">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-3 rounded-t-md border-b-2 border-dashed border-gray-300 gap-5">
              <h1 className="text-lg sm:text-xl font-semibold text-gray-600">
                {companyData?.companyName}
              </h1>
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg text-gray-600">
                  {companyData?.avgRating || 0} Rating
                </span>
                {[...Array(5)]?.map((_, i) => {
                  const ratingValue = companyData?.avgRating;
                  if (i + 1 <= ratingValue) {
                    return (
                      <FaStar key={i} size={16} className="text-yellow-400" />
                    );
                  } else if (i < ratingValue && i + 1 > ratingValue) {
                    return (
                      <FaStar
                        key={i}
                        size={16}
                        className="text-yellow-400"
                        style={{ clipPath: "inset(0 50% 0 0)" }}
                      />
                    );
                  } else {
                    return (
                      <FaRegStar
                        key={i}
                        size={16}
                        className="text-yellow-400"
                      />
                    );
                  }
                })}
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:justify-between md:items-start my-3 gap-5">
              <div className="w-full md:w-1/2 flex flex-col gap-3">
                <LocateCarousel
                  locateImages={companyImages}
                  slides={SLIDES}
                  options={OPTIONS}
                />
              </div>
              <div className="w-full md:w-1/2 space-y-3">
                <h1 className="text-lg sm:text-xl">
                  Company Name:{" "}
                  <span className="text-primary">
                    {companyData?.companyName}
                  </span>
                </h1>
                <div>
                  <h1 className="text-lg font-semibold">About</h1>
                  <p className="break-words max-w-full">
                    {companyData?.companyAbout}
                  </p>

                </div>
              </div>
            </div>
          </div>
          {/* Map Section */}
          <div className="w-full h-64 lg:h-auto relative rounded-lg overflow-hidden">
            <GoogleMap
              zoom={15}
              center={{
                lat: companyData?.companyLocation?.coordinates?.[1] ?? 0, 
                lng: companyData?.companyLocation?.coordinates?.[0] ?? 0, 
              }}
              mapContainerStyle={{
                width: "100%",
                height: "100%",
              }}
            >
              <Marker
                position={{
                  lat: companyData?.companyLocation?.coordinates?.[1] ?? 0, 
                  lng: companyData?.companyLocation?.coordinates?.[0] ?? 0, 
                }}
                icon={{
                  url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png", // Red marker icon
                  scaledSize: handleMarkerIcon(), // Ensuring the size is applied only when google is available
                }}
              />
            </GoogleMap>
          </div>
        </div>

        {/* Additional Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 my-10 md:my-16">
          <div className="space-y-8">
            <div className="bg-zinc-50 p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold">Company Information</h2>
              <div>
                <p className="break-words max-w-full mt-4">
                  {!showFullDescription
                    ? companyData?.companyInformation.companyDescription?.substring(
                        0,
                        243
                      )
                    : companyData?.companyInformation.companyDescription}
                </p>
                <button
                  onClick={() => setShowFullDescription(!showFullDescription)}
                  className="mt-2 text-primary hover:underline"
                >
                  {showFullDescription ? "Show Less" : "Show More"}
                </button>
              </div>
            </div>
            {
              <div className="bg-zinc-50 p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold">Reviews</h2>
                {!isUserAddReview && (
                  <div className="bg-zinc-50 p-6 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold">Add a Review</h2>
                    <Form
                      form={form}
                      layout="vertical"
                      onFinish={handleAddReview} // Call handleAddReview on form submission
                      className="space-y-4 mt-3"
                    >
                      <Form.Item
                        name="rating"
                        label="Your Rating"
                        rules={[
                          {
                            required: true,
                            message: "Please provide a rating",
                          },
                        ]}
                      >
                        <Rate allowHalf />
                      </Form.Item>
                      <Form.Item
                        name="comment"
                        label="Your Comment"
                        rules={[
                          {
                            required: true,
                            message: "Please provide your comment",
                          },
                          {
                            min: 10,
                            message:
                              "Comment must be at least 10 characters long",
                          },
                        ]}
                      >
                        <InputComponent
                          isTextArea
                          rows={3}
                          placeholder="Enter your comment"
                        />
                      </Form.Item>
                      <Button loading={isReviewLoading} type="submit">
                        Submit Review
                      </Button>
                    </Form>
                  </div>
                )}

                {isEditReview && editingReviewId ? (
                  <Form
                    form={form}
                    layout="vertical"
                    onFinish={(values) =>
                      handleUpdateReview(editingReviewId, values)
                    }
                    className="space-y-4 mt-3"
                  >
                    <Form.Item
                      name="rating"
                      label="Your Rating"
                      rules={[
                        { required: true, message: "Please provide a rating" },
                      ]}
                    >
                      <Rate allowHalf />
                    </Form.Item>
                    <Form.Item
                      name="comment"
                      label="Your Comment"
                      rules={[
                        {
                          required: true,
                          message: "Please provide your comment",
                        },
                        {
                          min: 10,
                          message:
                            "Comment must be at least 10 characters long",
                        },
                      ]}
                    >
                      <InputComponent
                        isTextArea
                        rows={3}
                        placeholder="Enter your updated comment"
                      />
                    </Form.Item>
                    <div className="flex gap-3">
                      <Button loading={updateReviewLoading} type="submit">
                        Update Review
                      </Button>
                      <button
                        onClick={() => {
                          setIsEditReview(false);
                          setEditingReviewId(null);
                          form.resetFields();
                        }}
                        className="bg-rose-500 w-full py-2 rounded-lg hover:bg-rose-600 text-white"
                      >
                        Cancel
                      </button>
                    </div>
                  </Form>
                ) : (
                  <div
                    className={`w-full space-y-5 mt-6 h-full  ${
                      reviewsData?.length && "h-[400px]"
                    } overflow-y-scroll scrollbar-hidden`}
                  >
                    {reviewsData?.map(
                      (
                        review: {
                          _id: string;
                          rating: number;
                          userId: {
                            _id: string;
                            image: string;
                            fullName: string;
                          };
                          comment: string;
                          createdAt: string;
                        },
                        index: number
                      ) => (
                        <div
                          key={index}
                          className="flex flex-col items-start gap-4 bg-zinc-100 px-2 py-3 rounded-lg"
                        >
                          <div className="w-full flex justify-between items-center">
                            <div className="size-[60px] rounded-full relative">
                              <Image
                                src={`${imageBaseUrl}${review?.userId?.image}`}
                                alt={review?.userId?.fullName}
                                fill
                                className="object-cover rounded-full absolute"
                              />
                            </div>
                            {/* only can see delete and edit button for reviewer userId and to match with logged in user */}
                            {review?.userId?._id === user?._id && (
                              <div className="flex justify-end gap-3">
                                <button
                                  onClick={() => toggleEditReview(review)}
                                  className="px-6 py-1.5 bg-primary rounded-lg text-white"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() =>
                                    handleDeleteReview(review?._id)
                                  }
                                  className="px-4 py-1.5 bg-rose-500 rounded-lg text-white"
                                >
                                  Delete
                                </button>
                              </div>
                            )}
                          </div>
                          <div className="w-full space-y-2">
                            <div className="flex justify-between items-center gap-4">
                              <p className="font-semibold">
                                {review?.userId?.fullName}
                              </p>
                              <h1 className="text-sm">
                                {review?.createdAt
                                  ? moment(review.createdAt).format(
                                      "DD MMM YYYY"
                                    )
                                  : "N/A"}
                              </h1>
                            </div>
                            <div className="flex items-center space-x-1">
                              {[...Array(5)]?.map((_, i) => {
                                const ratingValue = review.rating;
                                if (i + 1 <= ratingValue) {
                                  return (
                                    <FaStar
                                      key={i}
                                      size={16}
                                      className="text-yellow-400"
                                    />
                                  );
                                } else if (
                                  i < ratingValue &&
                                  i + 1 > ratingValue
                                ) {
                                  return (
                                    <FaStar
                                      key={i}
                                      size={16}
                                      className="text-yellow-400"
                                      style={{ clipPath: "inset(0 50% 0 0)" }}
                                    />
                                  );
                                } else {
                                  return (
                                    <FaRegStar
                                      key={i}
                                      size={16}
                                      className="text-yellow-400"
                                    />
                                  );
                                }
                              })}
                            </div>
                            <p className="text-gray-700 mt-1 text-sm break-words">
                              {review?.comment}
                            </p>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                )}

                {/* Display Existing Reviews */}
              </div>
            }
          </div>

          <div className="space-y-10">
            <div className="bg-zinc-50 p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold">Contact Information</h2>
              <div className="space-y-2 mt-5">
                <p className="flex items-center gap-2">
                  <FaPhone className="text-primary" />{" "}
                  {companyData?.companyInformation?.contactNumber}
                </p>
                {companyData?.companyInformation?.website && (
                  <p className="flex items-center gap-2">
                    <FaGlobe className="text-primary" />{" "}
                    <a
                      href={companyData?.companyInformation?.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600"
                    >
                      {companyData?.companyInformation?.website}
                    </a>
                  </p>
                )}

                <p className="flex items-center gap-2">
                  <SiGmail className="text-primary" />{" "}
                  {companyData?.companyInformation?.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return content;
};

export default LocateDetails;

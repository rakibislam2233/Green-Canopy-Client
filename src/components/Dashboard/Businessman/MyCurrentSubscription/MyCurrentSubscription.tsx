"use client";
import React from "react";
import useUser from "@/hook/useUser";
import { toast } from "sonner";
import moment from "moment";
import { usePurchaseSubscriptionMutation } from "@/redux/features/subscription/subscriptionApi";
import { GiUpgrade } from "react-icons/gi";
import { useGetMyProfileQuery } from "@/redux/features/profile/profileApi";
import { useRouter } from "next/navigation";

interface Subscription {
  _id: string;
  name: string;
  duration: number;
  price: number;
  maxListings: number;
}

const MyCurrentSubscription = () => {
  const [buySubscription] = usePurchaseSubscriptionMutation();
  const router = useRouter();
  const { user } = useUser();
  const { data: responseData } = useGetMyProfileQuery(user?._id, {
    skip: !user,
  });
  const subscribeUser = responseData?.data?.attributes;
  const isSubscribed = subscribeUser?.isSubscribed;
  const subscription = subscribeUser?.subscription as Subscription;
  const isExpired = moment().isAfter(subscribeUser?.subscriptionExpiryDate);

  const handleBuySubscription = async () => {
    try {
      const res = await buySubscription({
        subscriptionId: subscription?._id,
      }).unwrap();
      window.location.href = res.data.attributes;
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  return (
    <div>
      <section className="w-full max-w-xl rounded-xl mx-auto flex flex-col justify-center items-center border border-gray-200 p-5">
        {isSubscribed ? (
          <>
            <div className="flex flex-col justify-center items-center gap-3">
              <h2 className="text-3xl font-semibold text-primary">
                My Current Subscription
              </h2>
              <h1 className="text-2xl font-semibold uppercase italic">
                {subscription?.name}
              </h1>
              <p>
                <strong>Duration:</strong> {subscription?.duration} month(s)
              </p>
              <p>
                <strong>Price:</strong> ${subscription?.price}
              </p>
              <p>
                <strong>Max Listings:</strong> {subscription?.maxListings}
              </p>
              <p>
                <strong>Start Date:</strong>{" "}
                {moment(subscribeUser?.subscriptionStartDate).format(
                  "D MMM YYYY"
                )}
              </p>
              <p>
                <strong>Expiry Date:</strong>{" "}
                {moment(subscribeUser?.subscriptionExpiryDate).format(
                  "D MMM YYYY"
                )}
              </p>
            </div>
            {isExpired && (
              <button
                className="bg-secondary text-white px-4 py-3 rounded-lg my-8 flex flex-col  justify-center items-center gap-1"
                onClick={handleBuySubscription}
              >
                <GiUpgrade size={20} className="animate-bounce" />
                Upgrade Subscription
              </button>
            )}
          </>
        ) : (
          <div className="text-center space-y-3">
            <h2 className="text-xl font-semibold text-red-500">
              No Active Subscription
            </h2>
            <p className="text-gray-600">
              Please buy a subscription to enjoy our services.
            </p>
            <button
              className="bg-primary text-white px-4 py-3 rounded-lg my-8"
              onClick={() => router.push("/subscription")}
            >
              Buy Subscription
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default MyCurrentSubscription;

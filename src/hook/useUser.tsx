"use client";
import { useAppSelector } from "@/redux/hooks";
import { IUser } from "@/types/user.Type";

const useUser = () => {
  const user = useAppSelector((state) => state.auth.user) as IUser | null;

  return {
    isUser: !!user,
    user,
  };
};

export default useUser;

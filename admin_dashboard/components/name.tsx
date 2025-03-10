"use client";

import { useGetUser } from "@/app/hooks";

export const Name = ({ id }: { id: number }) => {
  const user = useGetUser(id);
  return <p>{user.data?.name}</p>;
};

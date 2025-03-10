import { Payment, User } from "@/app/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const toCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

export const groupUsersByMonth = (users: User[] | undefined) => {
  return users?.reduce(
    (acc, user) => {
      const month = format(user.createdAt, "MMMM"); // Format to full month name (e.g., "January")

      if (!acc[month]) {
        acc[month] = [];
      }

      acc[month].push(user);
      return acc;
    },
    {} as Record<string, User[]>,
  );
};
export const groupUsersByAge = (users: User[] | undefined) => {
  return users?.reduce(
    (acc, user) => {
      const month = format(user.createdAt, "MMMM"); // Format to full month name (e.g., "January")

      if (!acc[month]) {
        acc[month] = [];
      }

      acc[month].push(user);
      return acc;
    },
    {} as Record<string, User[]>,
  );
};

export const groupPaymentByMonth = (payment: Payment[] | undefined) => {
  return payment?.reduce(
    (acc, pay) => {
      const month = format(pay.createdAt, "MMMM"); // Format to full month name (e.g., "January")

      if (!acc[month]) {
        acc[month] = [];
      }

      acc[month].push(pay);
      return acc;
    },
    {} as Record<string, Payment[]>,
  );
};

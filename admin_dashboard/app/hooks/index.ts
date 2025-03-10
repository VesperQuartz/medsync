import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getAllAppointment,
  getAllPayment,
  getAllRecords,
  getAllStaff,
  getAllUser,
  getUser,
  getUserRecords,
  login,
  UserPayload,
} from "../services";
import { addDays, isToday, isTomorrow } from "date-fns";

export const useLogin = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: ({ email, password }: UserPayload) =>
      login({ email, password }),
  });
};

export const useGetAllUser = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => getAllUser(),
  });
};

export const useGetUser = (id: number) => {
  return useQuery({
    queryKey: ["users", id],
    queryFn: () => getUser(id),
  });
};

export const useGetAllPatient = () => {
  return useQuery({
    queryKey: ["patient"],
    queryFn: () => getAllUser(),
    select: (data) => data.filter((user) => user.role === "patient"),
  });
};

export const useGetAllStaff = () => {
  return useQuery({
    queryKey: ["staff"],
    queryFn: () => getAllStaff(),
    select: (data) => data.filter((staff) => staff.staff),
  });
};

export const useGetAllAppointment = () => {
  return useQuery({
    queryKey: ["appointment"],
    queryFn: () => getAllAppointment(),
  });
};

export const useGetRecentAppointment = () => {
  const today = isToday(new Date()) || addDays(new Date(), 1);
  return useQuery({
    queryKey: ["appointment-recent"],
    queryFn: () => getAllAppointment(),
    select: (data) => {
      return data.filter(
        (app) =>
          isToday(app?.appointments?.date) === today ||
          isTomorrow(app?.appointments?.date),
      );
    },
  });
};

export const useGetAllPayment = () => {
  return useQuery({
    queryKey: ["payment"],
    queryFn: () => getAllPayment(),
  });
};

export const useGetTotalRevenue = () => {
  return useQuery({
    queryKey: ["revenue"],
    queryFn: () => getAllPayment(),
    select: (data) => data.reduce((acc, payment) => acc + payment.amount, 0),
  });
};

export const useGetMedicalRecords = () => {
  return useQuery({
    queryKey: ["records"],
    queryFn: () => getAllRecords(),
  });
};

export const useGetUserMedicalRecords = (id: number) => {
  return useQuery({
    queryKey: ["records", id],
    queryFn: () => getUserRecords(id),
  });
};

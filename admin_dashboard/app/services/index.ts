import { to } from "await-to-ts";
import { env } from "../config";
import { UserResponse } from "../store";
import {
  AllAppointment,
  AllStaff,
  MedicalRecord,
  Payment,
  User,
} from "../types";

export type UserPayload = {
  email: string;
  password: string;
};

export const login = async ({ email, password }: UserPayload) => {
  const [error, response] = await to(
    fetch(`${env.NEXT_PUBLIC_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }),
  );
  if (error) {
    throw new Error("Failed to login");
  }
  if (!response.ok) {
    throw new Error("Invalid credentials");
  }
  return (await response.json()) as UserResponse;
};

export const getAllUser = async () => {
  const [error, response] = await to(
    fetch(`${env.NEXT_PUBLIC_BASE_URL}/api/users`),
  );
  if (error) {
    throw error;
  }
  if (!response.ok) {
    throw new Error("Cannot fetch users");
  }
  return (await response.json()) as User[];
};

export const getUser = async (id: number) => {
  const [error, response] = await to(
    fetch(`${env.NEXT_PUBLIC_BASE_URL}/api/users/${id}`),
  );
  if (error) {
    throw error;
  }
  if (!response.ok) {
    throw new Error("Cannot fetch users");
  }
  return (await response.json()) as User;
};

export const getAllStaff = async () => {
  const [error, response] = await to(
    fetch(`${env.NEXT_PUBLIC_BASE_URL}/api/staff`),
  );
  if (error) {
    throw error;
  }
  if (!response.ok) {
    throw new Error("Cannot fetch staff");
  }
  return (await response.json()) as AllStaff[];
};

export const getAllAppointment = async () => {
  const [error, response] = await to(
    fetch(`${env.NEXT_PUBLIC_BASE_URL}/api/appointment`),
  );
  if (error) {
    throw error;
  }
  if (!response.ok) {
    throw new Error("Cannot fetch appointment");
  }
  return (await response.json()) as AllAppointment[];
};

export const getAllPayment = async () => {
  const [error, response] = await to(
    fetch(`${env.NEXT_PUBLIC_BASE_URL}/api/payment`),
  );
  if (error) {
    throw error;
  }
  if (!response.ok) {
    throw new Error("Cannot fetch payment");
  }
  return (await response.json()) as Payment[];
};

export const getAllRecords = async () => {
  const [error, response] = await to(
    fetch(`${env.NEXT_PUBLIC_BASE_URL}/api/records`),
  );
  if (error) {
    throw error;
  }
  if (!response.ok) {
    throw new Error("Cannot fetch medical records");
  }
  return (await response.json()) as MedicalRecord[];
};

export const getUserRecords = async (id: number) => {
  const [error, response] = await to(
    fetch(`${env.NEXT_PUBLIC_BASE_URL}/api/records/${id}`),
  );
  if (error) {
    throw error;
  }
  if (!response.ok) {
    throw new Error("Cannot fetch medical records");
  }
  return (await response.json()) as MedicalRecord[];
};

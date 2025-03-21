import { to } from 'await-to-ts';

import {
  AllAppointment,
  AllStaff,
  Appointment,
  AppointmentPayload,
  MedicalRecord,
  Payment,
  PaymentPayload,
  RecordPayload,
  Staff,
  User,
} from '../types';

import { env } from '~/config';
import { UserResponse } from '~/store';

export type UserPayload = {
  email: string;
  password: string;
};

export type UserRegPayload = {
  name: string;
  dateOfBirth: string;
  role: string;
  email: string;
  password: string;
};

export const login = async ({ email, password }: UserPayload) => {
  const [error, response] = await to(
    fetch(`${env.EXPO_PUBLIC_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    }),
  );
  if (error) {
    console.log(error);
    throw new Error('Failed to login');
  }
  if (!response.ok) {
    throw new Error('Invalid credentials');
  }
  return (await response.json()) as UserResponse;
};

export const register = async ({
  email,
  password,
  name,
  role,
  dateOfBirth,
}: UserRegPayload) => {
  const [error, response] = await to(
    fetch(`${env.EXPO_PUBLIC_BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, dateOfBirth, role, name }),
    }),
  );
  if (error) {
    console.log(error);
    throw new Error('Failed to register');
  }
  if (!response.ok) {
    throw new Error('Invalid credentials');
  }
  return (await response.json()) as UserResponse;
};

export const addStaff = async ({
  userId,
  speciality,
}: {
  userId: number;
  speciality: string | undefined;
}) => {
  const [error, response] = await to(
    fetch(`${env.EXPO_PUBLIC_BASE_URL}/api/staff`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, speciality }),
    }),
  );
  if (error) {
    console.log(error);
    throw new Error('Failed to create staff');
  }
  if (!response.ok) {
    throw new Error('Invalid credentials');
  }
  return await response.json();
};

export const getAllUser = async () => {
  const [error, response] = await to(
    fetch(`${env.EXPO_PUBLIC_BASE_URL}/api/users`),
  );
  if (error) {
    throw error;
  }
  if (!response.ok) {
    throw new Error('Cannot fetch users');
  }
  return (await response.json()) as User[];
};

export const getUser = async (id: number | undefined) => {
  const [error, response] = await to(
    fetch(`${env.EXPO_PUBLIC_BASE_URL}/api/users/${id}`),
  );
  if (error) {
    throw error;
  }
  if (!response.ok) {
    throw new Error('Cannot fetch users');
  }
  return (await response.json()) as User;
};

export const getAllStaff = async () => {
  const [error, response] = await to(
    fetch(`${env.EXPO_PUBLIC_BASE_URL}/api/staff`),
  );
  if (error) {
    throw error;
  }
  if (!response.ok) {
    throw new Error('Cannot fetch staff');
  }
  return (await response.json()) as AllStaff[];
};

export const getAllAppointment = async () => {
  const [error, response] = await to(
    fetch(`${env.EXPO_PUBLIC_BASE_URL}/api/appointment`),
  );
  if (error) {
    throw error;
  }
  if (!response.ok) {
    throw new Error('Cannot fetch appointment');
  }
  return (await response.json()) as AllAppointment[];
};

export const getAllDoctorAppointment = async (id: number) => {
  const [error, response] = await to(
    fetch(`${env.EXPO_PUBLIC_BASE_URL}/api/appointment/${id}`),
  );
  if (error) {
    throw error;
  }
  if (!response.ok) {
    throw new Error('Cannot fetch appointment');
  }
  return (await response.json()) as {
    appointments: Appointment;
    staff: Staff;
  }[];
};

export const updateStatus = async (id: number, status: string) => {
  const [error, response] = await to(
    fetch(`${env.EXPO_PUBLIC_BASE_URL}/api/appointment/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    }),
  );
  if (error) {
    throw error;
  }
  if (!response.ok) {
    throw new Error('Cannot update appointment status');
  }
  return (await response.json()) as {
    message: string;
  };
};

export const createAppointment = async ({
  doctorId,
  reason,
  duration,
  patientId,
}: AppointmentPayload) => {
  const [error, response] = await to(
    fetch(`${env.EXPO_PUBLIC_BASE_URL}/api/appointment`, {
      method: 'POST',
      body: JSON.stringify({ doctorId, reason, duration, patientId }),
      headers: {
        'Content-Type': 'application/json',
      },
    }),
  );
  if (error) {
    throw error;
  }
  if (!response.ok) {
    throw new Error('Cannot create appointment');
  }
  return (await response.json()) as Appointment;
};

export const deleteAppointment = async ({ id }: { id: number }) => {
  const [error, response] = await to(
    fetch(`${env.EXPO_PUBLIC_BASE_URL}/api/appointment/${id}`, {
      method: 'DELETE',
      body: JSON.stringify({}),
      headers: {
        'Content-Type': 'application/json',
      },
    }),
  );
  if (error) {
    throw error;
  }
  if (!response.ok) {
    throw new Error('Cannot delete appointment');
  }
  return (await response.json()) as { message: string };
};

export const stripePayment = async ({ amount }: { amount: number }) => {
  const [error, response] = await to(
    fetch(`${env.EXPO_PUBLIC_BASE_URL}/api/payment/stripe`, {
      method: 'POST',
      body: JSON.stringify({
        amount,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }),
  );
  if (error) {
    throw error;
  }
  if (!response.ok) {
    throw new Error('Cannot make payment');
  }
  const { paymentIntent, ephemeralKey, customer } = await response.json();
  return { paymentIntent, ephemeralKey, customer };
};

export const getAllUserAppointment = async (id: number | undefined) => {
  const [error, response] = await to(
    fetch(`${env.EXPO_PUBLIC_BASE_URL}/api/appointment/users/${id}`),
  );
  if (error) {
    throw error;
  }
  if (!response.ok) {
    throw new Error('Cannot fetch user appointment');
  }
  return (await response.json()) as AllAppointment[];
};

export const getAllPayment = async () => {
  const [error, response] = await to(
    fetch(`${env.EXPO_PUBLIC_BASE_URL}/api/payment`),
  );
  if (error) {
    throw error;
  }
  if (!response.ok) {
    throw new Error('Cannot fetch payment');
  }
  return (await response.json()) as Payment[];
};

export const makePayment = async ({
  patientId,
  amount,
  appointmentId,
}: PaymentPayload) => {
  const [error, response] = await to(
    fetch(`${env.EXPO_PUBLIC_BASE_URL}/api/payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ patientId, amount, appointmentId }),
    }),
  );
  if (error) {
    throw error;
  }
  if (!response.ok) {
    throw new Error('Cannot make payment');
  }
  return (await response.json()) as Payment[];
};

export const getAllRecords = async () => {
  const [error, response] = await to(
    fetch(`${env.EXPO_PUBLIC_BASE_URL}/api/records`),
  );
  if (error) {
    throw error;
  }
  if (!response.ok) {
    throw new Error('Cannot fetch medical records');
  }
  return (await response.json()) as MedicalRecord[];
};

export const createRecord = async ({
  patientId,
  doctorId,
  appointmentId,
  diagnosis,
  prescription,
  testResults,
}: RecordPayload) => {
  const [error, response] = await to(
    fetch(`${env.EXPO_PUBLIC_BASE_URL}/api/records`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        patientId,
        doctorId,
        appointmentId,
        diagnosis,
        prescription,
        testResults,
      }),
    }),
  );
  if (error) {
    throw error;
  }
  if (!response.ok) {
    throw new Error('Cannot fetch medical records');
  }
  return (await response.json()) as MedicalRecord[];
};

export const getUserRecords = async (id: number | undefined) => {
  const [error, response] = await to(
    fetch(`${env.EXPO_PUBLIC_BASE_URL}/api/records/${id}`),
  );
  if (error) {
    throw error;
  }
  if (!response.ok) {
    throw new Error('Cannot fetch medical records');
  }
  return (await response.json()) as MedicalRecord[];
};

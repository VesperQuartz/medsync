import { useMutation, useQuery } from '@tanstack/react-query';
import { addDays, isToday, isTomorrow, isAfter } from 'date-fns';

import {
  createAppointment,
  deleteAppointment,
  getAllDoctorAppointment,
  getAllPayment,
  getAllRecords,
  getAllStaff,
  getAllUser,
  getAllUserAppointment,
  updateStatus,
  getUser,
  getUserRecords,
  login,
  makePayment,
  register,
  stripePayment,
  UserPayload,
  UserRegPayload,
  createRecord,
  addStaff,
} from '~/services';
import { useUserStore } from '~/store';
import { AppointmentPayload, PaymentPayload, RecordPayload } from '~/types';

export const useLogin = () => {
  return useMutation({
    mutationKey: ['login'],
    mutationFn: ({ email, password }: UserPayload) =>
      login({ email, password }),
  });
};

export const useRegister = () => {
  return useMutation({
    mutationKey: ['register'],
    mutationFn: ({
      email,
      password,
      name,
      role,
      dateOfBirth,
    }: UserRegPayload) =>
      register({ email, password, name, role, dateOfBirth }),
  });
};

export const useAddStaff = () => {
  return useMutation({
    mutationKey: ['add-staff'],
    mutationFn: ({
      userId,
      speciality,
    }: {
      userId: number;
      speciality: string;
    }) => addStaff({ userId, speciality }),
  });
};

export const useGetAllUser = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => getAllUser(),
  });
};

export const useGetUser = (id: number | undefined) => {
  return useQuery({
    queryKey: ['users', id],
    queryFn: () => getUser(id),
    enabled: !!id,
  });
};

export const useGetAllPatient = () => {
  return useQuery({
    queryKey: ['patient'],
    queryFn: () => getAllUser(),
    select: data => data.filter(user => user.role === 'patient'),
  });
};

export const useGetAllStaff = () => {
  return useQuery({
    queryKey: ['staff'],
    queryFn: () => getAllStaff(),
    select: data => data.filter(staff => staff.staff),
  });
};

export const useGetAllDoctor = () => {
  return useQuery({
    queryKey: ['doctor'],
    queryFn: () => getAllStaff(),
    select: data => data.filter(staff => staff.users.role === 'doctor'),
  });
};

export const useGetStaff = (id: number) => {
  return useQuery({
    queryKey: ['staff', id],
    queryFn: () => getAllStaff(),
    select: data => data.find(staff => staff?.staff?.userId === id),
    enabled: !!id,
  });
};

export const useCreateAppointment = () => {
  return useMutation({
    mutationKey: ['create-appointment'],
    mutationFn: ({
      doctorId,
      reason,
      duration,
      patientId,
    }: AppointmentPayload) =>
      createAppointment({ doctorId, reason, duration, patientId }),
  });
};

export const useDeleteAppointment = () => {
  return useMutation({
    mutationKey: ['delete-appointment'],
    mutationFn: ({ id }: { id: number }) => deleteAppointment({ id }),
  });
};

export const useGetAllUserAppointment = () => {
  const user = useUserStore();
  return useQuery({
    queryKey: ['appointment'],
    queryFn: () => getAllUserAppointment(user.user?.id),
    enabled: !!user.user?.id,
  });
};

export const useGetDoctorAppointment = () => {
  const user = useUserStore();
  return useQuery({
    queryKey: ['appointment-doctor', user.user?.id],
    queryFn: () => getAllDoctorAppointment(user.user!.id),
    enabled: !!user.user?.id,
  });
};

export const useUpdateStatus = () => {
  return useMutation({
    mutationKey: ['status-update'],
    mutationFn: ({ id, status }: { id: number; status: string }) =>
      updateStatus(id, status),
  });
};

export const useCreateRecord = () => {
  return useMutation({
    mutationKey: ['create-record'],
    mutationFn: ({
      patientId,
      doctorId,
      appointmentId,
      diagnosis,
      prescription,
      testResults,
    }: RecordPayload) =>
      createRecord({
        patientId,
        doctorId,
        appointmentId,
        diagnosis,
        prescription,
        testResults,
      }),
  });
};

export const useGetRecentAppointment = () => {
  const user = useUserStore();
  const today =
    isToday(new Date()) || addDays(new Date(), 1) || addDays(new Date(), 2);
  return useQuery({
    queryKey: ['appointment-recent'],
    enabled: !!user.user?.id,
    queryFn: () => getAllUserAppointment(user.user?.id),
    select: data => {
      return data.filter(
        app =>
          isToday(app?.appointments?.date) === today ||
          isTomorrow(app?.appointments?.date) === today ||
          isAfter(app?.appointments?.date, new Date()) === today,
      );
    },
  });
};

export const useGetPastAppointment = () => {
  const user = useUserStore();
  return useQuery({
    queryKey: ['appointment-past'],
    enabled: !!user.user?.id,
    queryFn: () => getAllUserAppointment(user.user?.id),
    select: data => {
      return data.filter(app => app.appointments.status === 'completed');
    },
  });
};

export const useGetAllPayment = () => {
  return useQuery({
    queryKey: ['payment'],
    queryFn: () => getAllPayment(),
  });
};

export const useMakePayment = () => {
  return useMutation({
    mutationKey: ['make-payment'],
    mutationFn: ({ appointmentId, amount, patientId }: PaymentPayload) =>
      makePayment({ appointmentId, amount, patientId }),
  });
};

export const useGetTotalRevenue = () => {
  return useQuery({
    queryKey: ['revenue'],
    queryFn: () => getAllPayment(),
    select: data => data.reduce((acc, payment) => acc + payment.amount, 0),
  });
};

export const useGetMedicalRecords = () => {
  return useQuery({
    queryKey: ['records'],
    queryFn: () => getAllRecords(),
  });
};

export const useGetUserMedicalRecords = (id: number | undefined) => {
  return useQuery({
    queryKey: ['records', id],
    queryFn: () => getUserRecords(id),
    enabled: !!id,
  });
};

export const useStripePay = () => {
  return useMutation({
    mutationKey: ['stripe-pay'],
    mutationFn: ({ amount }: { amount: number }) => stripePayment({ amount }),
  });
};

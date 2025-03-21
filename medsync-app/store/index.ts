import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { AppointmentPayload } from '~/types';
import { zustandStorage } from '~/utils/mmkv';

interface OnBoard {
  hasSeen: boolean;
  setHasSeen: (by: boolean) => void;
}

export type UserResponse = {
  id: number;
  name: string;
  email: string;
  dateOfBirth: string;
  password: string;
  role: string;
  createdAt: string;
  token: string;
};

type UserStoreState = {
  user: UserResponse | undefined;
  setUser: ({
    id,
    name,
    email,
    dateOfBirth,
    password,
    role,
    createdAt,
    token,
  }: UserResponse) => void;
  removeUser: () => void;
};

type AppointmentState = {
  appointment: AppointmentPayload | undefined;
  saveAppointment: ({
    doctorId,
    reason,
    duration,
    patientId,
  }: AppointmentPayload) => void;
  removeAppointment: () => void;
};

export const useOnBoardStore = create<OnBoard>()(
  persist(
    set => ({
      hasSeen: false,
      setHasSeen: by => set(() => ({ hasSeen: by })),
    }),
    {
      name: 'onboard',
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);

export const useUserStore = create<UserStoreState>()(
  persist(
    set => ({
      user: undefined,
      setUser: (user: UserResponse) =>
        set(() => ({
          user,
        })),
      removeUser: () => set(() => ({ user: undefined })),
    }),
    {
      name: 'user',
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);

export const useAppointmentStore = create<AppointmentState>()(
  persist(
    set => ({
      appointment: undefined,
      saveAppointment: (appointment: AppointmentPayload) =>
        set(() => ({
          appointment,
        })),
      removeAppointment: () => set(() => ({ appointment: undefined })),
    }),
    {
      name: 'appointment',
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);

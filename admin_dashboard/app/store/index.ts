import { create } from "zustand";
import { persist } from "zustand/middleware";

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
  user: UserResponse;
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

export const useUserStore = create<UserStoreState>()(
  persist(
    (set) => ({
      user: {} as UserResponse,
      setUser: (user: UserResponse) =>
        set(() => ({
          user,
        })),
      removeUser: () => set(() => ({ user: {} as UserResponse })),
    }),
    {
      name: "user",
    },
  ),
);

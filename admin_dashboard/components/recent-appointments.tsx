"use client";

import { useGetRecentAppointment } from "@/app/hooks";
import { clsx } from "clsx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "./ui/skeleton";
import { format, formatRelative, isToday, isTomorrow } from "date-fns";

export const RecentAppointments = () => {
  const recentAppointments = useGetRecentAppointment();
  if (recentAppointments.isLoading) {
    return <Skeleton className="w-full h-[250px]"></Skeleton>;
  }
  return (
    <div className="space-y-8">
      {recentAppointments.data?.map((appointment) => {
        return (
          <div className="flex items-center" key={appointment.appointments.id}>
            <Avatar className="h-9 w-9">
              <AvatarImage src="/placeholder.svg" alt="Avatar" />
              <AvatarFallback>MS</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">
                {appointment.users.name}
              </p>
              <p className="text-sm text-muted-foreground">
                {appointment.appointments.reason}
              </p>
            </div>
            <div className="ml-auto flex flex-col items-end">
              <Badge
                variant="outline"
                className={clsx("", {
                  "bg-blue-50 capitalize text-blue-700 hover:bg-blue-100":
                    isTomorrow(appointment.appointments.date),
                  "bg-green-100 text-green-800 hover:bg-green-200": isToday(
                    appointment.appointments.date,
                  ),
                })}
              >
                {
                  formatRelative(
                    appointment.appointments.date,
                    new Date(),
                  ).split(" ")[0]
                }
              </Badge>
              <span className="text-sm font-medium mt-1">
                {format(appointment.appointments.date, "HH:mm")}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

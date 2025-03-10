"use client";
import Link from "next/link";
import {
  ArrowUpRight,
  BarChart3,
  Calendar,
  DollarSign,
  Loader2,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Overview } from "@/components/overview";
import { RecentAppointments } from "@/components/recent-appointments";
import { UserNav } from "@/components/user-nav";
import { SidebarTrigger } from "@/components/sidebar-trigger";
import { useUserStore } from "../store";
import {
  useGetAllAppointment,
  useGetAllPatient,
  useGetMedicalRecords,
  useGetRecentAppointment,
  useGetTotalRevenue,
} from "../hooks";
import { toCurrency } from "@/lib/utils";

export default function DashboardPage() {
  const user = useUserStore();
  const patient = useGetAllPatient();
  const appointment = useGetAllAppointment();
  const revenue = useGetTotalRevenue();
  const records = useGetMedicalRecords();
  const todayAppointment = useGetRecentAppointment();
  return (
    <div className="flex min-h-screen flex-col">
      <div className="border-b bg-background sticky top-0 z-10">
        <div className="flex h-16 items-center px-4">
          <SidebarTrigger className="mr-2" />
          <div className="ml-auto flex items-center space-x-4">
            <UserNav />
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
              Dashboard
            </h2>
            <p className="text-muted-foreground">
              Welcome back, {user?.user?.name}
            </p>
          </div>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="patients">Patients</TabsTrigger>
            <TabsTrigger value="staff">Staff</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              <Card className="border-l-4 border-l-blue-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Patients
                  </CardTitle>
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <Users className="h-4 w-4 text-blue-500" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {patient.isLoading ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      (patient.data?.length ?? 0)
                    )}
                  </div>
                  <p className="text-xs text-green-500 flex items-center">
                    <span className="i-lucide-trending-up mr-1"></span>
                  </p>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-indigo-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Appointments
                  </CardTitle>
                  <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                    <Calendar className="h-4 w-4 text-indigo-500" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {appointment.isLoading ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      (appointment.data?.length ?? 0)
                    )}
                  </div>
                  <p className="text-xs text-green-500 flex items-center">
                    <span className="i-lucide-trending-up mr-1"></span>
                  </p>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-green-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                    <DollarSign className="h-4 w-4 text-green-500" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {revenue.isLoading ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      toCurrency(revenue.data ?? 0)
                    )}
                  </div>
                  <p className="text-xs text-green-500 flex items-center">
                    <span className="i-lucide-trending-up mr-1"></span>
                  </p>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-purple-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Treatments
                  </CardTitle>
                  <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                    <BarChart3 className="h-4 w-4 text-purple-500" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {" "}
                    {records.isLoading ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      (records.data?.length ?? 0)
                    )}
                  </div>
                  <p className="text-xs text-green-500 flex items-center">
                    <span className="i-lucide-trending-up mr-1"></span>
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 grid-cols-1 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Patient Overview</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <Overview />
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Upcoming Appointments</CardTitle>
                  <CardDescription>
                    There are {todayAppointment.data?.length} upcoming today
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentAppointments />
                </CardContent>
                <CardFooter>
                  <Link href="/appointments">
                    <Button variant="outline" className="w-full">
                      View All Appointments
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="appointments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Appointments</CardTitle>
                <CardDescription>
                  Manage all scheduled appointments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/appointments">
                  <Button>View Appointments</Button>
                </Link>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="patients" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Patients</CardTitle>
                <CardDescription>Manage all patient records</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/patients">
                  <Button>View Patients</Button>
                </Link>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="staff" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Staff</CardTitle>
                <CardDescription>
                  Manage doctors and staff members
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/staff">
                  <Button>View Staff</Button>
                </Link>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import { SidebarTrigger } from "@/components/sidebar-trigger";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RevenueChart } from "@/components/analytics/revenue-chart";
import { PatientDemographics } from "@/components/analytics/patient-demographics";
import { AppointmentDistribution } from "@/components/analytics/appointment-distribution";
import { DepartmentPerformance } from "@/components/analytics/department-performance";

export const metadata: Metadata = {
  title: "Analytics",
  description: "Hospital performance analytics and insights",
};

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col">
      <div className="border-b bg-background sticky top-0 z-10">
        <div className="flex h-16 items-center px-4">
          <SidebarTrigger className="mr-2" />
          <h1 className="text-xl font-semibold">Analytics</h1>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            Analytics Dashboard
          </h2>
          <p className="text-muted-foreground">
            Key performance indicators and hospital insights
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="patients">Patients</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="departments">Departments</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              <Card className="col-span-1 w-full">
                <CardHeader>
                  <CardTitle>Revenue Trends</CardTitle>
                  <CardDescription>
                    Monthly revenue for the past year
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RevenueChart />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="patients" className="space-y-4">
            <div className="grid gap-4 grid-cols-1">
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Patient Demographics</CardTitle>
                  <CardDescription>Distribution by age group</CardDescription>
                </CardHeader>
                <CardContent className="h-[400px]">
                  <PatientDemographics />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="revenue" className="space-y-4">
            <div className="grid gap-4 grid-cols-1">
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Revenue Trends</CardTitle>
                  <CardDescription>
                    Monthly revenue for the past year
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-[400px]">
                  <RevenueChart />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="departments" className="space-y-4">
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Appointment Distribution</CardTitle>
                  <CardDescription>By department</CardDescription>
                </CardHeader>
                <CardContent>
                  <AppointmentDistribution />
                </CardContent>
              </Card>
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Department Performance</CardTitle>
                  <CardDescription>Revenue by department</CardDescription>
                </CardHeader>
                <CardContent>
                  <DepartmentPerformance />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

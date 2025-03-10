import type React from "react";
import type { Metadata } from "next";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ProgressProviders } from "../providers/progress";

export const metadata: Metadata = {
  title: "Hospital Management System",
  description: "Admin dashboard for hospital management",
};

export default function DasboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProgressProviders>
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AppSidebar />
          <div className="flex-1 flex flex-col">{children}</div>
        </div>
      </SidebarProvider>
    </ProgressProviders>
  );
}

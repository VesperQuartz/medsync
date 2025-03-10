import type { Metadata } from "next";
import { MedicalRecordsTable } from "@/components/medical-records-table";
import { SidebarTrigger } from "@/components/sidebar-trigger";

export const metadata: Metadata = {
  title: "Medical Records",
  description: "Manage patient medical records",
};

export default function MedicalRecordsPage() {
  return (
    <div className="flex flex-col">
      <div className="border-b bg-background sticky top-0 z-10">
        <div className="flex h-16 items-center px-4">
          <SidebarTrigger className="mr-2" />
          <h1 className="text-xl font-semibold">Medical Records</h1>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            Medical Records
          </h2>
        </div>
        <MedicalRecordsTable />
      </div>
    </div>
  );
}

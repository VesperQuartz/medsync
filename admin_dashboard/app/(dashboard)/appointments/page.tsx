import { Button } from "@/components/ui/button";
import { AppointmentTable } from "@/components/appointments-table";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function AppointmentsPage() {
  return (
    <div className="flex flex-col">
      <div className="border-b bg-background sticky top-0 z-10">
        <div className="flex h-16 items-center px-4">
          <SidebarTrigger className="mr-2" />
          <h1 className="text-xl font-semibold">Appointments</h1>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            Appointments
          </h2>
          {/* <div className="flex items-center space-x-2"> */}
          {/*   <Button>Schedule New Appointment</Button> */}
          {/* </div> */}
        </div>
        <AppointmentTable />
      </div>
    </div>
  );
}

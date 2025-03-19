export type AppointmentPayload = {
  doctorId: number;
  patientId: number;
  reason: string;
  duration: number;
};

export type PaymentPayload = {
  patientId: number;
  appointmentId: number;
  amount: number;
};
export type User = {
  id: number;
  name: string;
  email: string;
  dateOfBirth: string;
  role: string;
  createdAt: string;
};

export type Appointment = {
  id: number;
  patientId: number;
  doctorId: number;
  date: string;
  status: string;
  duration: number;
  createdAt: string;
  reason: string;
};

export type Payment = {
  id: number;
  patientId: number;
  appointmentId: number;
  amount: number;
  paymentMethod: string;
  status: string;
  createdAt: string;
};

export type MedicalRecord = {
  id: number;
  patientId: number;
  doctorId: number;
  appointmentId: number;
  diagnosis: string;
  prescription: string;
  testResults: string;
  createdAt: string;
};

export type RecordPayload = {
  patientId: number;
  doctorId: number;
  appointmentId: number;
  diagnosis: string;
  prescription: string;
  testResults: string;
};

export type Staff = {
  id: number;
  userId: number;
  speciality: string;
  shift: string;
  daysAvailable: string;
  createdAt: string;
  available: number;
};

export type AllAppointment = {
  users: User;
  appointments: Appointment;
  staff: Staff;
};

export type AllStaff = {
  users: User;
  staff: Staff;
};

export interface Appointment {
  id: string;
  doctor: {
    name: string;
    specialty: string;
    avatar: string;
  };
  date: string;
  time: string;
  location: {
    building: string;
    room: string;
  };
  type: string;
}

export const appointments: Appointment[] = [
  {
    id: '1',
    doctor: {
      name: 'Dr. Smith',
      specialty: 'Cardiology',
      avatar:
        'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    },
    date: 'March 10',
    time: '10:30 AM',
    location: {
      building: 'Main Ward, Building A',
      room: 'Room 305',
    },
    type: 'Follow up consultation',
  },
  {
    id: '2',
    doctor: {
      name: 'Dr. Kabir',
      specialty: 'Immunology',
      avatar:
        'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    },
    date: 'February 8',
    time: '10:30 AM',
    location: {
      building: 'Main Ward, Building B',
      room: 'Room 105',
    },
    type: 'Follow up consultation',
  },
  {
    id: '3',
    doctor: {
      name: 'Dr. Amin Abubakar',
      specialty: 'Neurology',
      avatar:
        'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    },
    date: 'March 15',
    time: '10:30 AM',
    location: {
      building: 'Building A',
      room: 'Room 300',
    },
    type: 'Follow up consultation',
  },
  {
    id: '4',
    doctor: {
      name: 'Dr. Johnson',
      specialty: 'Dermatology',
      avatar:
        'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    },
    date: 'March 22',
    time: '2:15 PM',
    location: {
      building: 'Outpatient Clinic',
      room: 'Room 112',
    },
    type: 'Routine checkup',
  },
];

export const pastAppointments: Appointment[] = [
  {
    id: '5',
    doctor: {
      name: 'Dr. Patel',
      specialty: 'Orthopedics',
      avatar:
        'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    },
    date: 'January 15',
    time: '9:00 AM',
    location: {
      building: 'Main Ward, Building C',
      room: 'Room 210',
    },
    type: 'Post-surgery follow up',
  },
  {
    id: '6',
    doctor: {
      name: 'Dr. Wilson',
      specialty: 'Ophthalmology',
      avatar:
        'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    },
    date: 'January 3',
    time: '11:45 AM',
    location: {
      building: 'Eye Center',
      room: 'Room 105',
    },
    type: 'Annual eye exam',
  },
];

export const healthMetrics = [
  {
    id: '1',
    title: 'Blood Pressure',
    value: '120/80',
    status: 'Stable',
  },
  {
    id: '2',
    title: 'Heart Rate',
    value: '72 BPM',
    status: 'Stable',
  },
  {
    id: '3',
    title: 'Medication',
    value: '92%',
    status: 'Adherence',
  },
  {
    id: '4',
    title: 'Recent Weight',
    value: '165 LBS',
    status: '',
  },
];

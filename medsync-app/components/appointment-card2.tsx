import { format } from 'date-fns';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';

import StatusBadge from './badge';

import Colors from '~/constants/colors';
import { useGetUser } from '~/hooks/api';
import { Appointment } from '~/types';

interface AppointmentCardProps {
  appointment: Appointment;
  onPress: (appointment: Appointment) => void;
}

export default function AppointmentCard({ appointment, onPress }: AppointmentCardProps) {
  const patient = useGetUser(appointment.patientId);

  if (!patient) {
    return null;
  }

  return (
    <Pressable style={styles.card} onPress={() => onPress(appointment)}>
      <Image
        source={{ uri: 'https://avatar.iran.liara.run/public' }}
        style={styles.avatar}
        className="rounded-full border-2 border-gray-200"
      />
      <View style={styles.content}>
        <Text style={styles.name}>{patient.data?.name}</Text>
        <Text style={styles.complaint}>{appointment.reason}</Text>
        <Text style={styles.date}>{format(appointment.date, 'MMM d, yyyy h:mm a')}</Text>
      </View>
      <StatusBadge status={appointment.status} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  pressed: {
    opacity: 0.9,
    backgroundColor: Colors.surface,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  complaint: {
    fontSize: 14,
    color: Colors.textLight,
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: Colors.textLight,
  },
});

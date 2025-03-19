import { isFuture, isPast, isToday } from 'date-fns';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AppointmentCard from '~/components/appointment-card2';
import SegmentedControl from '~/components/segment-control';
import Colors from '~/constants/colors';
import { useGetDoctorAppointment } from '~/hooks/api';

export default function AppointmentsScreen() {
  const [selectedSegment, setSelectedSegment] = useState(0);
  const appointments = useGetDoctorAppointment();
  const router = useRouter();

  const segments = ['Today', 'Upcoming', 'Past'];

  const filteredAppointments = appointments.data?.filter((appointment) => {
    if (selectedSegment === 0) {
      return isToday(appointment.appointments.date);
    } else if (selectedSegment === 1) {
      return isFuture(appointment.appointments.date) && !isToday(appointment.appointments.date);
    } else {
      return isPast(appointment.appointments.date);
    }
  });

  const handleAppointmentPress = (appointment: any) => {
    router.push(`/appointment/${appointment.id}`);
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <SegmentedControl
        segments={segments}
        selectedIndex={selectedSegment}
        onChange={setSelectedSegment}
      />

      <FlatList
        data={filteredAppointments}
        keyExtractor={(item) => item.appointments.id.toString()}
        renderItem={({ item }) => (
          <AppointmentCard appointment={item.appointments} onPress={handleAppointmentPress} />
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No appointments found</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  listContent: {
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    color: Colors.textLight,
    textAlign: 'center',
  },
});

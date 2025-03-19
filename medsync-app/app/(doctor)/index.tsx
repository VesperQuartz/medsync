import { useQueryClient } from '@tanstack/react-query';
import { isToday, isTomorrow } from 'date-fns';
import { useRouter } from 'expo-router';
import { Calendar, Clock } from 'lucide-react-native';
import { StyleSheet, Text, View, ScrollView, RefreshControl } from 'react-native';

import AppointmentCard from '~/components/appointment-card2';
import Colors from '~/constants/colors';
import { useGetDoctorAppointment } from '~/hooks/api';
import { useUserStore } from '~/store';

const DashboardPage = () => {
  const appointments = useGetDoctorAppointment();
  const router = useRouter();

  const todayAppointments = appointments.data?.filter(
    (appointment) =>
      isToday(appointment.appointments.date) || isTomorrow(appointment.appointments.date)
  );

  const pendingAppointments = todayAppointments?.filter(
    (appointment) => appointment.appointments.status === 'pending'
  );

  const inProgressAppointments = todayAppointments?.filter(
    (appointment) => appointment.appointments.status === 'inprogress'
  );

  const handleAppointmentPress = (appointmentId: string) => {
    router.push(`/appointment/${appointmentId}`);
  };

  const user = useUserStore();
  const queryClient = useQueryClient();

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          enabled={appointments.isLoading}
          refreshing={appointments.isFetching}
          onRefresh={() =>
            queryClient.invalidateQueries({
              queryKey: ['appointment-doctor', user.user?.id],
            })
          }
        />
      }>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello, {user.user?.name}</Text>
        <Text style={styles.date}>Today's Schedule</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <View style={styles.statIconContainer}>
            <Calendar size={24} color={Colors.primary} />
          </View>
          <Text style={styles.statValue}>{todayAppointments?.length ?? 0}</Text>
          <Text style={styles.statLabel}>Total Appointments</Text>
        </View>

        <View style={styles.statCard}>
          <View style={[styles.statIconContainer, { backgroundColor: Colors.inProgress + '20' }]}>
            <Clock size={24} color={Colors.inProgress} />
          </View>
          <Text style={styles.statValue}>{inProgressAppointments?.length ?? 0}</Text>
          <Text style={styles.statLabel}>In Progress</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Pending Appointments</Text>
        {pendingAppointments?.length! > 0 ? (
          pendingAppointments?.map((appointment) => (
            <AppointmentCard
              key={appointment.appointments.id}
              appointment={appointment.appointments}
              onPress={() => handleAppointmentPress(appointment.appointments?.id.toString())}
            />
          ))
        ) : (
          <Text style={styles.emptyText}>No pending appointments for today</Text>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>In Progress</Text>
        {inProgressAppointments?.length! > 0 ? (
          inProgressAppointments?.map((appointment) => (
            <AppointmentCard
              key={appointment.appointments.id}
              appointment={appointment?.appointments}
              onPress={() => handleAppointmentPress(appointment?.appointments!.id.toString())}
            />
          ))
        ) : (
          <Text style={styles.emptyText}>No appointments in progress</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  header: {
    padding: 20,
    backgroundColor: Colors.background,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  date: {
    fontSize: 16,
    color: Colors.textLight,
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: Colors.textLight,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 16,
  },
  emptyText: {
    textAlign: 'center',
    color: Colors.textLight,
    padding: 20,
  },
});
export default DashboardPage;

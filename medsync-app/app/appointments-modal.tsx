import { Stack, useRouter } from 'expo-router';
import { Plus, X } from 'lucide-react-native';
import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';

import { AppointmentCard } from '~/components/appointment-card';
import {
  useGetAllUserAppointment,
  useGetPastAppointment,
  useGetRecentAppointment,
} from '~/hooks/api';

export default function AppointmentsModal() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Upcoming');
  const tabs = ['Upcoming', 'Past', 'All'];
  const allAppointment = useGetAllUserAppointment();
  const pastAppointments = useGetPastAppointment();
  const upcomingAppointments = useGetRecentAppointment();

  const getAppointmentsToShow = () => {
    switch (activeTab) {
      case 'Upcoming':
        return upcomingAppointments?.data;
      case 'Past':
        return pastAppointments?.data;
      case 'All':
        return allAppointment?.data;
      default:
        return [];
    }
  };

  const handleClose = () => {
    router.back();
  };

  const handleAddPress = () => {
    router.push('/add-appointment');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Appointments',
          headerLeft: () => (
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <X size={24} color="#000" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={handleAddPress} style={styles.addHeaderButton}>
              <Plus size={24} color="#4285F4" />
              <Text style={styles.addText}>Add</Text>
            </TouchableOpacity>
          ),
        }}
      />

      <View style={styles.tabsContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}>
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
            {activeTab === tab && <View style={styles.tabIndicator} />}
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.appointmentsContainer}>
          {getAppointmentsToShow()?.map((appointment) => {
            return (
              <View style={styles.card} key={appointment.appointments.id}>
                <AppointmentCard app={appointment} />
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  closeButton: {
    padding: 8,
  },
  addHeaderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  addText: {
    color: '#4285F4',
    fontWeight: '500',
    marginLeft: 4,
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingHorizontal: 16,
  },
  tab: {
    paddingVertical: 12,
    marginRight: 24,
    position: 'relative',
  },
  activeTab: {
    backgroundColor: 'transparent',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
  },
  activeTabText: {
    color: '#000',
    fontWeight: '500',
  },
  tabIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#4285F4',
  },
  scrollView: {
    flex: 1,
  },
  appointmentsContainer: {
    padding: 16,
  },
  appointmentCardContainer: {
    marginBottom: 16,
  },
  gradientCard: {
    borderRadius: 12,
    padding: 16,
    overflow: 'hidden',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#eee',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  appointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  doctorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  doctorAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  doctorText: {
    color: '#fff',
    fontWeight: '500',
  },
  doctorTextDark: {
    color: '#000',
    fontWeight: '500',
  },
  appointmentDetails: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    color: '#fff',
    marginLeft: 8,
  },
  detailTextDark: {
    color: '#666',
    marginLeft: 8,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 12,
  },
  actionButtonsDark: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButtonDark: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  actionButtonTextDark: {
    color: '#4285F4',
    fontSize: 12,
  },
});

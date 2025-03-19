import { useQueryClient } from '@tanstack/react-query';
import { format, formatRelative } from 'date-fns';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Menu, Bell, User, MoreHorizontal, Calendar, UserRound, Plus } from 'lucide-react-native';
import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';

import { NameText } from '~/components/name';
import { useCreateAppointment, useDeleteAppointment, useGetRecentAppointment } from '~/hooks/api';
import { useUserStore } from '~/store';

export default function UserPage() {
  const router = useRouter();
  const [activeMainTab, setActiveMainTab] = useState('Appointment');

  const mainTabs = ['Appointment', 'Results'];
  const appointment = useGetRecentAppointment();
  const deleteAppointment = useDeleteAppointment();
  console.log(appointment.data, 'APP');

  const handleTabPress = (tab: string) => {
    setActiveMainTab(tab);

    if (tab === 'Appointment') {
      router.push('/appointments-modal');
    } else if (tab === 'Results') {
      router.push('/results');
    } else if (tab === 'History') {
      router.push('/history');
    }
  };

  const handleAddPress = () => {
    router.push('/add-appointment');
  };
  const user = useUserStore();
  const reschedule = useCreateAppointment();
  const queryClient = useQueryClient();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Menu size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Dashboard</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton}>
            <Bell size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <User size={24} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.greeting}>
          <Text style={styles.greetingName}>Hello {user.user?.name}!</Text>
          {appointment.data?.at(0) ? (
            <Text style={styles.greetingMessage}>
              Your have an appointment with{' '}
              <NameText id={appointment?.data?.at(0)?.appointments?.doctorId!} />{' '}
              {formatRelative(appointment.data?.[0]?.appointments?.date, new Date())}
            </Text>
          ) : (
            <Text style={styles.greetingMessage}>You have no upcoming appointments</Text>
          )}
        </View>

        <View style={styles.tabsContainer}>
          {mainTabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeMainTab === tab && styles.activeTab]}
              onPress={() => handleTabPress(tab)}>
              <Text style={[styles.tabText, activeMainTab === tab && styles.activeTabText]}>
                {tab}
              </Text>
              {activeMainTab === tab && <View style={styles.tabIndicator} />}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Coming Up</Text>
          {appointment.data?.length === 0 && (
            <Text className="text-xl">
              No upcoming appointments please click on the floating icon to add one
            </Text>
          )}
          {/* {appointment.isLoading && ( */}
          {/*   <View className="flex flex-col gap-2"> */}
          {/*     <Skeleton height={150} width={400} colorMode="light" /> */}
          {/*     <Skeleton height={150} width={400} colorMode="light" /> */}
          {/*     <Skeleton height={150} width={400} colorMode="light" /> */}
          {/*   </View> */}
          {/* )} */}
          {activeMainTab === 'Appointment' &&
            appointment.data?.map((app) => {
              return (
                <View style={styles.appointmentCardContainer}>
                  <LinearGradient
                    colors={['#4285F4', '#2563EB']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.gradientCard}>
                    <View style={styles.appointmentHeader}>
                      <View style={styles.doctorInfo}>
                        <Image
                          source={{ uri: 'https://avatar.iran.liara.run/public' }}
                          style={styles.doctorAvatar}
                        />
                        <NameText className="text-xl text-white" id={app.appointments?.doctorId} />,{' '}
                        <Text className="font-bold">{app.staff?.speciality}</Text>
                      </View>
                      <TouchableOpacity>
                        <MoreHorizontal size={20} color="#fff" />
                      </TouchableOpacity>
                    </View>

                    <View style={styles.appointmentDetails}>
                      <View style={styles.detailRow}>
                        <Calendar size={16} color="#fff" />
                        <Text style={styles.detailText}>
                          {format(app.appointments?.date, 'MMMM d, h:mma')}
                        </Text>
                      </View>

                      {/* <View style={styles.detailRow}> */}
                      {/*   <MapPin size={16} color="#fff" /> */}
                      {/*   <Text style={styles.detailText}> */}
                      {/*     {appointments[0].location.building}, {appointments[0].location.room} */}
                      {/*   </Text> */}
                      {/* </View> */}

                      <View style={styles.detailRow}>
                        <UserRound size={16} color="#fff" />
                        <Text style={styles.detailText}>{app?.appointments?.reason}</Text>
                      </View>
                    </View>

                    <View style={styles.actionButtons}>
                      <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => {
                          reschedule.mutate(
                            {
                              patientId: app.users.id,
                              duration: app.appointments.duration,
                              reason: app.appointments.reason,
                              doctorId: app.appointments.doctorId,
                            },
                            {
                              onSuccess: () => {
                                Alert.alert('Appointment has been rescheduled to another time!');
                                deleteAppointment.mutate(
                                  { id: app.appointments.id },
                                  {
                                    onSettled: () => {
                                      queryClient.invalidateQueries({
                                        queryKey: ['appointment-recent'],
                                      });
                                    },
                                  }
                                );
                                queryClient.invalidateQueries({
                                  queryKey: ['appointment-recent'],
                                });
                              },
                              onError: () => {
                                Alert.alert('Cannot reschedule appointment');
                              },
                            }
                          );
                        }}>
                        <Text style={styles.actionButtonText}>Reschedule</Text>
                      </TouchableOpacity>

                      {/* <TouchableOpacity style={styles.actionButton}> */}
                      {/*   <Text style={styles.actionButtonText}>Cancel</Text> */}
                      {/* </TouchableOpacity> */}
                    </View>
                  </LinearGradient>
                </View>
              );
            })}
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.addButton} onPress={handleAddPress}>
        <Plus size={24} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  headerRight: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 16,
  },
  scrollView: {
    flex: 1,
  },
  greeting: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  greetingName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4285F4',
    marginBottom: 4,
  },
  greetingMessage: {
    fontSize: 16,
    color: '#666',
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
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
  section: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  metricCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  metricTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  metricStatus: {
    fontSize: 14,
    color: '#666',
  },
  appointmentCardContainer: {
    marginBottom: 16,
  },
  gradientCard: {
    borderRadius: 12,
    padding: 16,
    overflow: 'hidden',
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
  addButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#4285F4',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

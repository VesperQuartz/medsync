import { useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { Calendar, MoreHorizontal, UserRound } from 'lucide-react-native';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform, Alert } from 'react-native';

import { NameText, SpecialityText } from './name';

import Colors from '~/constants/colors';
import { useCreateAppointment, useDeleteAppointment } from '~/hooks/api';
import { AllAppointment } from '~/types';

interface AppointmentCardProps {
  app: AllAppointment;
}

export const AppointmentCard = ({ app }: AppointmentCardProps) => {
  const appointment = useCreateAppointment();
  const deleteAppointment = useDeleteAppointment();
  const queryClient = useQueryClient();
  return (
    <>
      <View style={styles.cardHeader}>
        <View style={styles.doctorInfo}>
          <Image source={{ uri: 'https://avatar.iran.liara.run/public' }} style={styles.avatar} />
          <NameText id={app.appointments?.doctorId} />
          <Text>{', '}</Text>
          <SpecialityText id={app.appointments?.doctorId} />
        </View>
        <TouchableOpacity>
          <MoreHorizontal size={20} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.appointmentDetails}>
        <View style={styles.detailItem}>
          <Calendar size={16} color="#666" />
          <Text style={styles.detailText}>{format(app.appointments?.date, 'MMMM d, h:mma')}</Text>
        </View>

        {/* <View style={styles.detailRow}> */}
        {/*   <MapPin size={16} color="#fff" /> */}
        {/*   <Text style={styles.detailText}> */}
        {/*     {appointments[0].location.building}, {appointments[0].location.room} */}
        {/*   </Text> */}
        {/* </View> */}

        <View style={styles.detailItem}>
          <UserRound size={16} color="#666" />
          <Text style={styles.detailText}>{app.appointments?.reason}</Text>
        </View>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.actionButtonDark}
          onPress={() => {
            appointment.mutate(
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
                      onSuccess: () => {
                        console.log('appointment deleted');
                        queryClient.invalidateQueries({
                          queryKey: ['appointment-recent'],
                        });
                      },
                      onError: (error) => {
                        console.log(error);
                      },
                    }
                  );
                  queryClient.invalidateQueries({
                    queryKey: ['appointment-recent'],
                  });
                },
                onError: (error) => {
                  console.log(error);
                  Alert.alert('Cannot reschedule appointment');
                },
              }
            );
          }}>
          <Text style={styles.actionButtonTextDark}>Reschedule</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity style={styles.actionButton}> */}
        {/*   <Text style={styles.actionButtonText}>Cancel</Text> */}
        {/* </TouchableOpacity> */}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.light.cardBg,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
      web: {
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      },
    }),
    borderWidth: 1,
    borderColor: Colors.light.cardBorder,
  },
  cardGradient: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
      web: {
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      },
    }),
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  doctorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
  },
  doctorDetails: {
    flexDirection: 'column',
  },
  doctorName: {
    fontSize: 16,
    fontWeight: '600',
  },
  specialty: {
    fontSize: 14,
  },
  moreBtn: {
    padding: 4,
  },
  appointmentDetails: {
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
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

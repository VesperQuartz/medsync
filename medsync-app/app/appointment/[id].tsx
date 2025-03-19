import { useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import StatusBadge from '~/components/badge';
import { Button } from '~/components/button';
import FormInput from '~/components/form-input';
import { NameText } from '~/components/name';
import Colors from '~/constants/colors';
import { useCreateRecord, useGetDoctorAppointment, useUpdateStatus } from '~/hooks/api';
import { useUserStore } from '~/store';

export default function AppointmentDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const recordCreate = useCreateRecord();
  const user = useUserStore();
  const appointment = useGetDoctorAppointment().data?.find(
    (app) => app.appointments.id === Number(id)
  );

  const [diagnosis, setDiagnosis] = useState('');
  const [prescription, setPrescription] = useState('');
  const [testResults, setTestResults] = useState('');
  const updateStatus = useUpdateStatus();
  const queryClient = useQueryClient();

  if (!appointment) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Appointment not found</Text>
        <Button title="Go Back" onPress={() => router.back()} />
      </View>
    );
  }

  const handleStartAppointment = () => {
    updateStatus.mutate(
      { id: appointment.appointments.id, status: 'inprogress' },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries({
            queryKey: ['appointment-doctor', user.user?.id],
          });
          console.log(data);
        },
        onError: (error) => {
          console.log(error);
        },
      }
    );
  };

  const handleCompleteAppointment = () => {
    if (!diagnosis.trim()) {
      Alert.alert(
        'Missing Information',
        'Please provide a diagnosis before completing the appointment.'
      );
      return;
    }

    recordCreate.mutate({
      appointmentId: appointment.appointments.id,
      diagnosis,
      prescription,
      testResults,
      patientId: appointment.appointments!.patientId,
      doctorId: user.user!.id,
    });

    updateStatus.mutate(
      { id: appointment.appointments.id, status: 'done' },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['appointment-doctor', user.user?.id],
          });
          router.back();
        },
      }
    );
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Appointment Details',
          headerBackTitle: 'Back',
        }}
      />
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.patientCard}>
            {appointment && (
              <Image
                className="border-1 rounded-full border-gray-200"
                source={{ uri: 'https://avatar.iran.liara.run/public' }}
                style={styles.avatar}
              />
            )}
            <View style={styles.patientInfo}>
              <NameText style={styles.patientName} id={appointment.appointments.patientId} />
              <Text style={styles.appointmentDate}>
                {format(appointment.appointments.date, 'MMM d, yyyy h:mm a')}
              </Text>
              <View style={styles.complaintContainer}>
                <Text style={styles.complaintLabel}>Complaint:</Text>
                <Text style={styles.complaintText}>{appointment.appointments.reason}</Text>
              </View>
              <View style={styles.statusContainer}>
                <Text style={styles.statusLabel}>Status:</Text>
                <StatusBadge status={appointment.appointments.status} />
              </View>
            </View>
          </View>

          {appointment.appointments.status === 'pending' ? (
            <View style={styles.actionContainer}>
              <Text style={styles.actionText}>
                Start this appointment to record medical details
              </Text>
              <Button
                title={updateStatus.isPending ? 'Loading...' : 'Start Appointment'}
                onPress={handleStartAppointment}
                style={styles.actionButton}
              />
            </View>
          ) : (
            <View style={styles.formContainer}>
              <Text style={styles.formTitle}>Medical Record</Text>

              <FormInput
                label="Diagnosis"
                value={diagnosis}
                onChangeText={setDiagnosis}
                placeholder="Enter diagnosis"
                multiline
              />

              <FormInput
                label="Prescription"
                value={prescription}
                onChangeText={setPrescription}
                placeholder="Enter prescription details"
                multiline
              />

              <FormInput
                label="Test Results"
                value={testResults}
                onChangeText={setTestResults}
                placeholder="Enter test results"
                multiline
              />

              {appointment.appointments.status === 'inprogress' && (
                <Button
                  title={
                    recordCreate.isPending || updateStatus.isPending
                      ? 'Loading...'
                      : 'Complete Appointment'
                  }
                  onPress={handleCompleteAppointment}
                  style={styles.completeButton}
                />
              )}
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  scrollContent: {
    padding: 16,
  },
  patientCard: {
    flexDirection: 'row',
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  patientInfo: {
    flex: 1,
  },
  patientName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  appointmentDate: {
    fontSize: 14,
    color: Colors.textLight,
    marginBottom: 12,
  },
  complaintContainer: {
    marginBottom: 12,
  },
  complaintLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
    marginBottom: 4,
  },
  complaintText: {
    fontSize: 16,
    color: Colors.text,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
    marginRight: 8,
  },
  actionContainer: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  actionText: {
    fontSize: 16,
    color: Colors.textLight,
    textAlign: 'center',
    marginBottom: 20,
  },
  actionButton: {
    width: '100%',
  },
  formContainer: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 20,
  },
  completeButton: {
    marginTop: 20,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: Colors.error,
    marginBottom: 20,
  },
});

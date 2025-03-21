/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from '@hookform/resolvers/zod';
import { StripeProvider, useStripe } from '@stripe/stripe-react-native';
import { Stack, useRouter } from 'expo-router';
import { ArrowLeft, Clock, ChevronDown } from 'lucide-react-native';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  StyleSheet,
  Platform,
  Alert,
} from 'react-native';
import { z } from 'zod';

import {
  useCreateAppointment,
  useGetAllDoctor,
  useMakePayment,
  useStripePay,
} from '~/hooks/api';
import { useAppointmentStore, useUserStore } from '~/store';
import { generateCalendarDays } from '~/utils';

const consultationTypes = [
  {
    id: '1',
    name: '30 minutes',
    duration: 30,
    price: 50,
    icon: Clock,
  },
  {
    id: '2',
    name: '1 hour',
    duration: 60,
    price: 100,
    icon: Clock,
  },
  {
    id: '3',
    name: '2 hour',
    duration: 120,
    price: 200,
    icon: Clock,
  },
];

const calendarDays = generateCalendarDays(new Date());

const formSchema = z.object({
  reason: z
    .string({
      required_error: 'Please provide a reason for your visit',
    })
    .min(3),
});

const AddAppointmentScreen = () => {
  const router = useRouter();
  const doctor = useGetAllDoctor();
  const payment = useMakePayment();
  const booking = useAppointmentStore();
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [doctorId, setDoctorId] = useState<number | null>(null);
  const [duration, setDuration] = useState<number | null>(null);
  const [selectedConsultation, setSelectedConsultation] = useState<any>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const handleBack = () => {
    if (showConfirmation) {
      setShowConfirmation(false);
    } else {
      router.back();
    }
  };
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const book = useCreateAppointment();
  const handleConfirm = async () => {
    const { error } = await presentPaymentSheet();
    if (error) {
      Alert.alert("Couldn't complete payment", error.message);
    } else {
      console.log(
        {
          reason: booking.appointment?.reason ?? '',
          patientId: booking.appointment!.patientId,
          doctorId: booking.appointment!.doctorId,
          duration: booking.appointment?.duration ?? 50,
        },
        'Payload',
      );
      book.mutate(
        {
          reason: booking.appointment?.reason ?? '',
          patientId: booking.appointment!.patientId,
          doctorId: booking.appointment!.doctorId,
          duration: booking.appointment?.duration ?? 50,
        },
        {
          onSuccess: data => {
            console.log(data, 'After bookment');
            payment.mutate({
              amount: selectedConsultation,
              patientId: booking.appointment!.patientId,
              appointmentId: data.id,
            });
            booking.removeAppointment();
            Alert.alert(
              'Payment successful',
              'Your appointment has been confirmed!',
            );
            router.push('/(users)');
          },
          onError: error => {
            console.log(error, 'pError');
          },
        },
      );
    }
  };
  const pay = useStripePay();
  const user = useUserStore();

  const handleProceedToPayment = form.handleSubmit(async data => {
    console.log(selectedConsultation, 'Price');
    console.log(selectedDoctor, 'Doc');
    pay.mutate(
      { amount: selectedConsultation },
      {
        onSuccess: async data => {
          await initPaymentSheet({
            merchantDisplayName: 'MedSync',
            customerId: data.customer,
            customerEphemeralKeySecret: data.ephemeralKey,
            paymentIntentClientSecret: data.paymentIntent,
            defaultBillingDetails: {
              name: user.user?.name,
            },
          });
        },
      },
    );
    setShowConfirmation(true);
    booking.saveAppointment({
      doctorId: doctorId!,
      reason: data.reason,
      duration: duration!,
      patientId: user.user!.id,
    });
  });

  if (showConfirmation) {
    return (
      <SafeAreaView style={styles.container}>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
        />

        <View style={styles.confirmationContainer}>
          <Text style={styles.confirmationTitle}>Appointment Confirmed!</Text>

          <TouchableOpacity>
            <Text style={styles.viewDetailsText}>View more details</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.paymentButton}
            onPress={handleConfirm}>
            <Text style={styles.paymentButtonText}>Proceed to Payment</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <StripeProvider publishableKey="pk_test_51MC7WtCe9nNOUvz0iWXgPaz1rvBwyecFJ73jlY3PwH7EqoqT5WR3BoEUiyXY8z4ksDxYhnOS09FfGTLcRUHxSeCN00xsbaOX9G">
      <SafeAreaView style={styles.container}>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
        />

        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <ArrowLeft size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Book Appointment</Text>
          <View style={styles.headerRight} />
        </View>

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}>
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Select Doctor</Text>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.doctorsScroll}
              contentContainerStyle={styles.doctorsContainer}>
              {doctor.isLoading && (
                <View className="flex flex-row gap-2">
                  {/* <Skeleton colorMode="light" height={110} width={110} /> */}
                  {/* <Skeleton colorMode="light" height={110} width={110} /> */}
                  {/* <Skeleton colorMode="light" height={110} width={110} /> */}
                  {/* <Skeleton colorMode="light" height={110} width={110} /> */}
                </View>
              )}
              {doctor.data?.map(doc => (
                <TouchableOpacity
                  key={doc.users.id}
                  style={[
                    styles.doctorCard,
                    selectedDoctor === doc.users.id &&
                      styles.selectedDoctorCard,
                  ]}
                  onPress={() => {
                    setSelectedDoctor(doc.users?.id);
                    setDoctorId(doc.users?.id);
                  }}>
                  <View style={styles.doctorCardContent}>
                    <Image
                      source={{ uri: 'https://avatar.iran.liara.run/public' }}
                      style={styles.doctorAvatar}
                    />
                    <Text style={styles.doctorName}>{doc.users?.name}</Text>
                    <Text style={styles.doctorSpecialty}>
                      {doc.staff?.speciality}
                    </Text>
                    <View style={styles.bookButton}>
                      <Text style={styles.bookButtonText}>Book</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Select consultation type</Text>

            <View style={styles.consultationTypesContainer}>
              {consultationTypes.map(type => (
                <TouchableOpacity
                  key={type.id}
                  style={[
                    styles.consultationType,
                    selectedConsultation === type!.price &&
                      styles.selectedConsultationType,
                  ]}
                  onPress={() => {
                    setSelectedConsultation(type.price);
                    setDuration(type.duration);
                  }}>
                  <type.icon
                    size={24}
                    color={
                      selectedConsultation === type.id ? '#4285F4' : '#666'
                    }
                  />
                  <Text
                    style={[
                      styles.consultationTypeName,
                      selectedConsultation === type.id &&
                        styles.selectedConsultationText,
                    ]}>
                    {type.name}
                  </Text>
                  <Text
                    style={[
                      styles.consultationTypePrice,
                      selectedConsultation === type.id &&
                        styles.selectedConsultationText,
                    ]}>
                    ${type.price}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Date/Time</Text>
              <TouchableOpacity style={styles.monthSelector}>
                <Text style={styles.monthText}>March, 2025</Text>
                <ChevronDown size={16} color="#666" />
              </TouchableOpacity>
            </View>

            <View style={styles.calendarContainer}>
              {calendarDays.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.calendarDay,
                    item.selected && styles.selectedCalendarDay,
                  ]}>
                  <Text
                    style={[
                      styles.dayText,
                      item.selected && styles.selectedDayText,
                    ]}>
                    {item.day}
                  </Text>
                  <Text
                    style={[
                      styles.dateText,
                      item.selected && styles.selectedDayText,
                    ]}>
                    {item.date}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Reason for visit</Text>
            <Controller
              control={form.control}
              name="reason"
              render={({ field: { value, onBlur, onChange } }) => {
                return (
                  <TextInput
                    style={styles.reasonInput}
                    placeholder="Describe your symptoms or reason for appointment..."
                    multiline
                    onBlur={onBlur}
                    value={value}
                    textAlignVertical="top"
                    onChangeText={onChange}
                  />
                );
              }}
            />
            {form.formState.errors.reason && (
              <Text>{form.formState.errors.reason.message}</Text>
            )}
          </View>

          <View style={styles.bottomPadding} />
        </ScrollView>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={handleProceedToPayment}>
            <Text style={styles.confirmButtonText}>Confirm Appointment</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </StripeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    marginRight: 40, // To center the title
  },
  headerRight: {
    width: 40, // Same width as back button for balance
  },
  scrollView: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 16,
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    color: '#4285F4',
    marginRight: 4,
    fontSize: 14,
  },
  doctorsScroll: {
    marginBottom: 8,
  },
  doctorsContainer: {
    paddingRight: 16,
  },
  doctorCard: {
    width: 110,
    marginRight: 12,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#4285F4',
  },
  selectedDoctorCard: {
    borderWidth: 2,
    borderColor: '#2563EB',
  },
  doctorCardContent: {
    alignItems: 'center',
    padding: 12,
  },
  doctorAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
  },
  doctorName: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 14,
    textAlign: 'center',
  },
  doctorSpecialty: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    marginBottom: 8,
    textAlign: 'center',
  },
  bookButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  consultationTypesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  consultationType: {
    flex: 1,
    marginHorizontal: 4,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  selectedConsultationType: {
    backgroundColor: 'rgba(66, 133, 244, 0.1)',
    borderWidth: 1,
    borderColor: '#4285F4',
  },
  consultationTypeName: {
    marginTop: 8,
    fontSize: 14,
    color: '#333',
  },
  consultationTypePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 4,
  },
  selectedConsultationText: {
    color: '#4285F4',
  },
  monthSelector: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  monthText: {
    color: '#666',
    marginRight: 4,
    fontSize: 14,
  },
  calendarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  calendarDay: {
    width: 40,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  selectedCalendarDay: {
    backgroundColor: '#4285F4',
  },
  dayText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  dateText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
  },
  selectedDayText: {
    color: '#fff',
  },
  reasonInput: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 16,
    minHeight: 100,
    textAlignVertical: 'top',
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    padding: 16,
    paddingBottom: Platform.OS === 'ios' ? 24 : 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  confirmButton: {
    backgroundColor: '#008000', // Green color as shown in the screenshot
    borderRadius: 24,
    paddingVertical: 16,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomPadding: {
    height: 80, // Extra space at the bottom for scrolling
  },
  confirmationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  confirmationTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4285F4',
    marginBottom: 16,
    textAlign: 'center',
  },
  confirmationText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  viewDetailsText: {
    color: '#4285F4',
    fontSize: 16,
    marginBottom: 32,
  },
  paymentButton: {
    backgroundColor: '#008000',
    borderRadius: 24,
    paddingVertical: 16,
    paddingHorizontal: 24,
    width: '100%',
    alignItems: 'center',
  },
  paymentButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  padded: {
    padding: 16,
  },
});

export default AddAppointmentScreen;

import { zodResolver } from '@hookform/resolvers/zod';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  TouchableWithoutFeedback,
  ScrollView,
  KeyboardAvoidingView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Platform,
} from 'react-native';
import { match } from 'ts-pattern';

import { useAddStaff, useRegister } from '~/hooks/api';
import { signUpSchema } from '~/schema';
import { useUserStore } from '~/store';

const Signup = () => {
  const [role, setRole] = useState('patient');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const user = useUserStore();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      dateOfBirth: new Date(),
      password: '',
      speciality: '',
    },
  });

  const register = useRegister();
  const staff = useAddStaff();

  const onSubmit = form.handleSubmit(data => {
    const theRole = role === 'patient' ? 'patient' : 'doctor';
    register.mutate(
      { ...data, role: theRole, dateOfBirth: data.dateOfBirth.toISOString() },
      {
        onSuccess: d => {
          user.setUser(d);
          match(d.role)
            .with('doctor', () => {
              staff.mutate(
                {
                  userId: d.id,
                  speciality: data?.speciality,
                },
                {
                  onSuccess: () => {
                    router.replace('/(doctor)');
                  },
                },
              );
            })
            .with('patient', () => {
              router.replace('/(users)');
            })
            .otherwise(() => null);
        },
        onError: error => {
          console.error(error);
        },
      },
    );
  });

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled">
            <View style={styles.content}>
              <Text style={styles.headerText}>Sign Up as</Text>

              <View style={styles.toggleContainer}>
                <TouchableOpacity
                  style={[
                    styles.toggleButton,
                    role === 'patient' && styles.activeToggle,
                  ]}
                  onPress={() => setRole('patient')}>
                  <Text style={styles.toggleText}>Patient</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.toggleButton,
                    role === 'staff' && styles.activeToggle,
                  ]}
                  onPress={() => setRole('staff')}>
                  <Text style={styles.toggleText}>Staff</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.formContainer}>
                <Text style={styles.labelText}>Name</Text>
                <Controller
                  control={form.control}
                  name="name"
                  render={({ field: { value, onBlur, onChange } }) => (
                    <TextInput
                      style={styles.input}
                      value={value}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      placeholder="Enter your name"
                    />
                  )}
                />
                {form.formState.errors.name && (
                  <Text style={styles.errorText}>
                    {form.formState.errors.name.message}
                  </Text>
                )}

                <Text style={styles.labelText}>Email</Text>
                <Controller
                  control={form.control}
                  name="email"
                  render={({ field: { value, onBlur, onChange } }) => (
                    <TextInput
                      style={styles.input}
                      value={value}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      placeholder="Enter your email"
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  )}
                />
                {form.formState.errors.email && (
                  <Text style={styles.errorText}>
                    {form.formState.errors.email.message}
                  </Text>
                )}

                {role === 'staff' && (
                  <>
                    <Text style={styles.labelText}>Hospital ID</Text>
                    <Controller
                      control={form.control}
                      name="hospitalId"
                      render={({ field: { value, onBlur, onChange } }) => (
                        <TextInput
                          style={styles.input}
                          value={value}
                          onBlur={onBlur}
                          onChangeText={onChange}
                          placeholder="Enter your hospital ID"
                        />
                      )}
                    />
                    {form.formState.errors.hospitalId && (
                      <Text style={styles.errorText}>
                        {form.formState.errors.hospitalId.message}
                      </Text>
                    )}

                    <Text style={styles.labelText}>Speciality</Text>
                    <Controller
                      control={form.control}
                      name="speciality"
                      render={({ field: { value, onBlur, onChange } }) => (
                        <TextInput
                          style={styles.input}
                          value={value}
                          onBlur={onBlur}
                          onChangeText={onChange}
                          placeholder="Enter your speciality"
                          autoCapitalize="none"
                        />
                      )}
                    />
                    {form.formState.errors.speciality && (
                      <Text style={styles.errorText}>
                        {form.formState.errors.speciality.message}
                      </Text>
                    )}
                  </>
                )}

                <Text style={styles.labelText}>Date of birth</Text>
                <Controller
                  control={form.control}
                  name="dateOfBirth"
                  render={({ field: { value, onChange } }) => (
                    <>
                      <TouchableOpacity
                        style={styles.dateInput}
                        onPress={() => setShowDatePicker(true)}>
                        <Text style={styles.dateText}>
                          {value
                            ? value.toLocaleDateString()
                            : 'Select date of birth'}
                        </Text>
                      </TouchableOpacity>

                      {(showDatePicker || Platform.OS === 'ios') && (
                        <DateTimePicker
                          value={value || new Date()}
                          mode="date"
                          display={
                            Platform.OS === 'ios' ? 'spinner' : 'default'
                          }
                          onChange={(_event, selectedDate) => {
                            const currentDate = selectedDate || value;
                            setShowDatePicker(Platform.OS === 'ios');
                            onChange(currentDate);
                          }}
                        />
                      )}
                    </>
                  )}
                />
                {form.formState.errors.dateOfBirth && (
                  <Text style={styles.errorText}>
                    {form.formState.errors.dateOfBirth.message}
                  </Text>
                )}

                <Text style={styles.labelText}>Password</Text>
                <Controller
                  control={form.control}
                  name="password"
                  render={({ field: { value, onBlur, onChange } }) => (
                    <TextInput
                      style={styles.input}
                      value={value}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      placeholder="Enter your password"
                      secureTextEntry
                    />
                  )}
                />

                {form.formState.errors.password && (
                  <Text style={styles.errorText}>
                    {form.formState.errors.password.message}
                  </Text>
                )}

                <TouchableOpacity
                  style={styles.signupButton}
                  onPress={onSubmit}>
                  <Text style={styles.signupButtonText}>
                    {register.isPending || staff.isPending
                      ? 'Loading...'
                      : 'Register'}
                  </Text>
                </TouchableOpacity>

                <View style={styles.loginContainer}>
                  <Text style={styles.loginText}>
                    Already have an account?{' '}
                  </Text>
                  <Link href="/(auth)/login" asChild>
                    <TouchableOpacity>
                      <Text style={styles.loginLink}>Log In</Text>
                    </TouchableOpacity>
                  </Link>
                </View>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0047AB',
    textAlign: 'center',
    marginBottom: 16,
  },
  toggleContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    overflow: 'hidden',
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  activeToggle: {
    backgroundColor: '#E8F5E9',
  },
  toggleText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
  },
  formContainer: {
    flex: 1,
  },
  labelText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    marginBottom: 16,
  },
  dateInput: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  dateText: {
    fontSize: 16,
    color: '#333333',
  },
  errorText: {
    color: 'red',
    marginBottom: 16,
  },
  signupButton: {
    backgroundColor: '#1B7340',
    borderRadius: 28,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  signupButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    fontSize: 14,
    color: '#666666',
  },
  loginLink: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0047AB',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
});

export default Signup;

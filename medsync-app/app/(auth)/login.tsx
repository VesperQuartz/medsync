import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
import { match } from 'ts-pattern';

import { useLogin } from '~/hooks/api';
import { loginSchema } from '~/schema';
import { useUserStore } from '~/store';

const Login = () => {
  const [role, setRole] = useState('patient');
  const form = useForm({
    resolver: zodResolver(loginSchema),
  });
  const login = useLogin();
  const user = useUserStore();
  const router = useRouter();

  const onSubmit = form.handleSubmit((data) =>
    login.mutate(data, {
      onSuccess: (data) => {
        user.setUser(data);
        match(data.role)
          .with('doctor', () => {
            router.replace('/(doctor)');
          })
          .with('patient', () => {
            router.replace('/(users)');
          })
          .otherwise(() => null);
      },
      onError(error) {
        console.error(error);
      },
    })
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.headerText}>Login as</Text>

        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[styles.toggleButton, role === 'patient' && styles.activeToggle]}
            onPress={() => setRole('patient')}>
            <Text style={styles.toggleText}>Patient</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.toggleButton, role === 'staff' && styles.activeToggle]}
            onPress={() => setRole('staff')}>
            <Text style={styles.toggleText}>Staff</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.labelText}>Email</Text>
          <Controller
            control={form.control}
            name="email"
            render={({ field: { value, onBlur, onChange } }) => {
              return (
                <TextInput
                  style={styles.input}
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  placeholder="Enter your email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              );
            }}
          />{' '}
          {form.formState.errors.email && <Text>{form.formState.errors.email.message}</Text>}
          {role === 'staff' && (
            <>
              <Text style={styles.labelText}>Hospital ID</Text>
              <Controller
                control={form.control}
                name="hospitalId"
                render={({ field: { value, onBlur, onChange } }) => {
                  return (
                    <TextInput
                      style={styles.input}
                      value={value}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      placeholder="Enter your hospital ID"
                      autoCapitalize="none"
                    />
                  );
                }}
              />
              {form.formState.errors.hospitalId && (
                <Text>{form.formState.errors.hospitalId.message}</Text>
              )}
            </>
          )}
          <Text style={styles.labelText}>Password</Text>
          <Controller
            control={form.control}
            name="password"
            render={({ field: { value, onBlur, onChange } }) => {
              return (
                <TextInput
                  style={styles.input}
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  placeholder="Enter your password"
                  secureTextEntry
                />
              );
            }}
          />
          {form.formState.errors.password && <Text>{form.formState.errors.password.message}</Text>}
          <TouchableOpacity style={styles.signupButton} onPress={onSubmit}>
            <Text style={styles.signupButtonText}>{login.isPending ? 'Loading...' : 'Login'}</Text>
          </TouchableOpacity>
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <Link href="/(auth)/signup" asChild>
              <TouchableOpacity>
                <Text style={styles.loginLink}>Sign up</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </View>
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
});

export default Login;

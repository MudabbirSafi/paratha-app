import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { useThemeStore } from '@/store/themeStore';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {
  validateEmail,
  validatePassword,
  validateName,
  validatePasswordMatch,
} from '@/utils/validation';
import { Mail, Lock, User, Phone, MapPin } from 'lucide-react-native';

export default function RegisterScreen() {
  const { theme } = useThemeStore();
  const { register, isLoading } = useAuthStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [nameError, setNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [mobileError, setMobileError] = useState<string | null>(null);
  const [addressError, setAddressError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);

  const validateMobile = (value: string) => {
    if (!value) return 'Mobile number is required';
    if (!/^\d{10}$/.test(value)) return 'Enter a valid 10-digit mobile number';
    return null;
  };

  const validateAddress = (value: string) => {
    if (!value) return 'Address is required';
    if (value.length < 5) return 'Address is too short';
    return null;
  };

  const validateForm = () => {
    const nameValidationError = validateName(name);
    const emailValidationError = validateEmail(email);
    const mobileValidationError = validateMobile(mobile);
    const addressValidationError = validateAddress(address);
    const passwordValidationError = validatePassword(password);
    const confirmPasswordValidationError = validatePasswordMatch(password, confirmPassword);

    setNameError(nameValidationError);
    setEmailError(emailValidationError);
    setMobileError(mobileValidationError);
    setAddressError(addressValidationError);
    setPasswordError(passwordValidationError);
    setConfirmPasswordError(confirmPasswordValidationError);

    return !nameValidationError &&
      !emailValidationError &&
      !mobileValidationError &&
      !addressValidationError &&
      !passwordValidationError &&
      !confirmPasswordValidationError;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;
    const success = await register(name, email, password); // Extend registration as needed
    if (success) {
      router.replace('/(tabs)');
    }
  };

  const navigateToLogin = () => {
    router.push('/auth/login');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { backgroundColor: theme.colors.background },
        ]}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.text, fontFamily: 'Poppins-Bold' }]}>
            Create Account
          </Text>
          <Text
            style={[styles.subtitle, { color: theme.colors.secondaryText, fontFamily: 'Poppins-Regular' }]}
          >
            Sign up to enjoy delicious fast food
          </Text>
        </View>

        <View style={styles.form}>
          <Input
            label="Full Name"
            value={name}
            onChangeText={(text) => {
              setName(text);
              setNameError(null);
            }}
            placeholder="Your full name"
            autoCapitalize="words"
            error={nameError}
            leftIcon={<User size={20} color={theme.colors.icon} />}
          />

          <Input
            label="Email"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setEmailError(null);
            }}
            placeholder="Your email address"
            keyboardType="email-address"
            autoCapitalize="none"
            error={emailError}
            leftIcon={<Mail size={20} color={theme.colors.icon} />}
          />

          <Input
            label="Mobile Number"
            value={mobile}
            onChangeText={(text) => {
              setMobile(text);
              setMobileError(null);
            }}
            placeholder="Your 10-digit mobile number"
            keyboardType="numeric"
            error={mobileError}
            leftIcon={<Phone size={20} color={theme.colors.icon} />}
          />

          <Input
            label="Address"
            value={address}
            onChangeText={(text) => {
              setAddress(text);
              setAddressError(null);
            }}
            placeholder="Your address"
            multiline
            error={addressError}
            leftIcon={<MapPin size={20} color={theme.colors.icon} />}
          />

          <Input
            label="Password"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setPasswordError(null);
            }}
            placeholder="Create a password"
            secureTextEntry
            error={passwordError}
            leftIcon={<Lock size={20} color={theme.colors.icon} />}
          />

          <Input
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text);
              setConfirmPasswordError(null);
            }}
            placeholder="Confirm your password"
            secureTextEntry
            error={confirmPasswordError}
            leftIcon={<Lock size={20} color={theme.colors.icon} />}
          />

          <Button
            title="Register"
            onPress={handleRegister}
            variant="primary"
            isLoading={isLoading}
            fullWidth
            style={styles.registerButton}
          />

          <View style={styles.loginContainer}>
            <Text
              style={[styles.loginText, { color: theme.colors.secondaryText, fontFamily: 'Poppins-Regular' }]}
            >
              Already have an account?{' '}
            </Text>
            <TouchableOpacity onPress={navigateToLogin}>
              <Text
                style={[styles.loginLink, { color: theme.colors.primary, fontFamily: 'Poppins-SemiBold' }]}
              >
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    marginBottom: 32,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  registerButton: {
    marginTop: 12,
    marginBottom: 20,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
  },
  loginText: {
    fontSize: 14,
  },
  loginLink: {
    fontSize: 14,
  },
});

import React, { useState, useEffect } from 'react';
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
  Mail,
  Lock,
  User,
  Phone,
  MapPin,
  CarFront,
  Badge,
  Bike,
  CreditCard,
} from 'lucide-react-native';
import {
  validateEmail,
  validatePassword,
  validateName,
  validatePasswordMatch,
} from '@/utils/validation';

export default function DeliveryRegisterScreen() {
  const { theme } = useThemeStore();
  const { registerDelivery, isLoading, error, clearError } = useAuthStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [nameError, setNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [mobileError, setMobileError] = useState<string | null>(null);
  const [addressError, setAddressError] = useState<string | null>(null);
  const [vehicleTypeError, setVehicleTypeError] = useState<string | null>(null);
  const [licenseNumberError, setLicenseNumberError] = useState<string | null>(
    null
  );
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | null
  >(null);

  // Clear error when component mounts
  useEffect(() => {
    clearError();
  }, [clearError]);

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

  const validateVehicleType = (value: string) => {
    if (!value) return 'Vehicle type is required';
    if (value.length < 2) return 'Vehicle type is too short';
    return null;
  };

  const validateLicenseNumber = (value: string) => {
    if (!value) return 'License number is required';
    if (value.length < 5) return 'License number is too short';
    return null;
  };

  const validateForm = () => {
    const nameValidationError = validateName(name);
    const emailValidationError = validateEmail(email);
    const mobileValidationError = validateMobile(mobile);
    const addressValidationError = validateAddress(address);
    const vehicleTypeValidationError = validateVehicleType(vehicleType);
    const licenseNumberValidationError = validateLicenseNumber(licenseNumber);
    const passwordValidationError = validatePassword(password);
    const confirmPasswordValidationError = validatePasswordMatch(
      password,
      confirmPassword
    );

    setNameError(nameValidationError);
    setEmailError(emailValidationError);
    setMobileError(mobileValidationError);
    setAddressError(addressValidationError);
    setVehicleTypeError(vehicleTypeValidationError);
    setLicenseNumberError(licenseNumberValidationError);
    setPasswordError(passwordValidationError);
    setConfirmPasswordError(confirmPasswordValidationError);

    return (
      !nameValidationError &&
      !emailValidationError &&
      !mobileValidationError &&
      !addressValidationError &&
      !vehicleTypeValidationError &&
      !licenseNumberValidationError &&
      !passwordValidationError &&
      !confirmPasswordValidationError
    );
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    const registerData = {
      name,
      email,
      password,
      phone: mobile,
      address,
      vehicleType,
      licenseNumber,
      userType: 'delivery' as const,
    };

    const success = await registerDelivery(registerData);
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
          <Text
            style={[
              styles.title,
              { color: theme.colors.text, fontFamily: 'Poppins-Bold' },
            ]}
          >
            Register as Delivery Partner
          </Text>
          <Text
            style={[
              styles.subtitle,
              {
                color: theme.colors.secondaryText,
                fontFamily: 'Poppins-Regular',
              },
            ]}
          >
            Join our delivery network and start earning
          </Text>
        </View>

        <View style={styles.form}>
          {error && (
            <View
              style={[
                styles.errorContainer,
                { backgroundColor: 'rgba(239, 68, 68, 0.1)' },
              ]}
            >
              <Text
                style={[
                  styles.errorText,
                  { color: theme.colors.error, fontFamily: 'Poppins-Medium' },
                ]}
              >
                {error}
              </Text>
            </View>
          )}

          <Input
            label="Full Name"
            value={name}
            onChangeText={(text) => {
              setName(text);
              setNameError(null);
              clearError();
            }}
            placeholder="Your full name"
            autoCapitalize="words"
            error={nameError || undefined}
            leftIcon={<User size={20} color={theme.colors.icon} />}
          />

          <Input
            label="Email"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setEmailError(null);
              clearError();
            }}
            placeholder="Your email address"
            keyboardType="email-address"
            autoCapitalize="none"
            error={emailError || undefined}
            leftIcon={<Mail size={20} color={theme.colors.icon} />}
          />

          <Input
            label="Mobile Number"
            value={mobile}
            onChangeText={(text) => {
              setMobile(text);
              setMobileError(null);
              clearError();
            }}
            placeholder="10-digit mobile number"
            keyboardType="phone-pad"
            error={mobileError || undefined}
            leftIcon={<Phone size={20} color={theme.colors.icon} />}
          />

          <Input
            label="Vehicle Type"
            value={vehicleType}
            onChangeText={(text) => {
              setVehicleType(text);
              setVehicleTypeError(null);
              clearError();
            }}
            placeholder="e.g., Motorcycle, Car, Bicycle"
            error={vehicleTypeError || undefined}
            leftIcon={<Bike size={20} color={theme.colors.icon} />}
          />

          <Input
            label="License Number"
            value={licenseNumber}
            onChangeText={(text) => {
              setLicenseNumber(text);
              setLicenseNumberError(null);
              clearError();
            }}
            placeholder="Your driving license number"
            error={licenseNumberError || undefined}
            leftIcon={<CreditCard size={20} color={theme.colors.icon} />}
          />

          <Input
            label="Address"
            value={address}
            onChangeText={(text) => {
              setAddress(text);
              setAddressError(null);
              clearError();
            }}
            placeholder="Your complete address"
            multiline
            numberOfLines={3}
            error={addressError || undefined}
            leftIcon={<MapPin size={20} color={theme.colors.icon} />}
          />

          <Input
            label="Password"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setPasswordError(null);
              clearError();
            }}
            placeholder="Create a password"
            secureTextEntry
            error={passwordError || undefined}
            leftIcon={<Lock size={20} color={theme.colors.icon} />}
          />

          <Input
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text);
              setConfirmPasswordError(null);
              clearError();
            }}
            placeholder="Re-enter password"
            secureTextEntry
            error={confirmPasswordError || undefined}
            leftIcon={<Lock size={20} color={theme.colors.icon} />}
          />

          <Button
            title="Register as Delivery Partner"
            onPress={handleRegister}
            variant="primary"
            isLoading={isLoading}
            fullWidth
            style={styles.registerButton}
          />

          <View style={styles.loginContainer}>
            <Text
              style={[
                styles.loginText,
                {
                  color: theme.colors.secondaryText,
                  fontFamily: 'Poppins-Regular',
                },
              ]}
            >
              Already have an account?{' '}
            </Text>
            <TouchableOpacity onPress={navigateToLogin}>
              <Text
                style={[
                  styles.loginLink,
                  {
                    color: theme.colors.primary,
                    fontFamily: 'Poppins-SemiBold',
                  },
                ]}
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
  },
  title: {
    fontSize: 26,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
  },
  form: {
    width: '100%',
  },
  errorContainer: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    fontSize: 14,
    textAlign: 'center',
  },
  registerButton: {
    marginTop: 16,
    marginBottom: 24,
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

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
  validateEmail,
  validatePassword,
  validateName,
  validatePasswordMatch,
} from '@/utils/validation';
import {
  Mail,
  Lock,
  User,
  Phone,
  MapPin,
  Briefcase,
  Hash,
} from 'lucide-react-native';

export default function RegisterBusinessScreen() {
  const { theme } = useThemeStore();
  const { registerBusiness, isLoading, error, clearError } = useAuthStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [gstNumber, setGstNumber] = useState('');

  const [nameError, setNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [mobileError, setMobileError] = useState<string | null>(null);
  const [addressError, setAddressError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | null
  >(null);
  const [businessNameError, setBusinessNameError] = useState<string | null>(
    null
  );
  const [gstNumberError, setGstNumberError] = useState<string | null>(null);

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

  const validateBusinessName = (value: string) => {
    if (!value) return 'Business name is required';
    return null;
  };

  const validateGstNumber = (value: string) => {
    if (!value) return 'GST number is required';
    if (!/^[0-9A-Z]{15}$/.test(value)) return 'Enter a valid GST number';
    return null;
  };

  const validateForm = () => {
    const nameValError = validateName(name);
    const emailValError = validateEmail(email);
    const mobileValError = validateMobile(mobile);
    const addressValError = validateAddress(address);
    const passwordValError = validatePassword(password);
    const confirmPasswordValError = validatePasswordMatch(
      password,
      confirmPassword
    );
    const businessNameValError = validateBusinessName(businessName);
    const gstNumberValError = validateGstNumber(gstNumber);

    setNameError(nameValError);
    setEmailError(emailValError);
    setMobileError(mobileValError);
    setAddressError(addressValError);
    setPasswordError(passwordValError);
    setConfirmPasswordError(confirmPasswordValError);
    setBusinessNameError(businessNameValError);
    setGstNumberError(gstNumberValError);

    return (
      !nameValError &&
      !emailValError &&
      !mobileValError &&
      !addressValError &&
      !passwordValError &&
      !confirmPasswordValError &&
      !businessNameValError &&
      !gstNumberValError
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
      businessName,
      gstNumber,
      userType: 'business' as const,
    };

    const success = await registerBusiness(registerData);
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
              { color: theme.colors.text, fontWeight: '700' },
            ]}
          >
            Create Business Account
          </Text>
          <Text
            style={[
              styles.subtitle,
              {
                color: theme.colors.textSecondary,
              },
            ]}
          >
            Expand your reach and grow your business
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
                  { color: theme.colors.error, fontWeight: '500' },
                ]}
              >
                {error}
              </Text>
            </View>
          )}
          <Input
            label="Owner's Full Name"
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
            placeholder="Your 10-digit mobile number"
            keyboardType="numeric"
            error={mobileError || undefined}
            leftIcon={<Phone size={20} color={theme.colors.icon} />}
          />
          <Input
            label="Business Address"
            value={address}
            onChangeText={(text) => {
              setAddress(text);
              setAddressError(null);
              clearError();
            }}
            placeholder="Your business address"
            multiline
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
            placeholder="Confirm your password"
            secureTextEntry
            error={confirmPasswordError || undefined}
            leftIcon={<Lock size={20} color={theme.colors.icon} />}
          />
          <Input
            label="Business Name"
            value={businessName}
            onChangeText={(text) => {
              setBusinessName(text);
              setBusinessNameError(null);
              clearError();
            }}
            placeholder="Your business name"
            error={businessNameError || undefined}
            leftIcon={<Briefcase size={20} color={theme.colors.icon} />}
          />
          <Input
            label="GST Number"
            value={gstNumber}
            onChangeText={(text) => {
              setGstNumber(text);
              setGstNumberError(null);
              clearError();
            }}
            placeholder="Your GST number"
            error={gstNumberError || undefined}
            leftIcon={<Hash size={20} color={theme.colors.icon} />}
          />

          <Button
            title="Register"
            onPress={handleRegister}
            isLoading={isLoading}
            fullWidth
            style={styles.registerButton}
          />
          <View style={styles.loginContainer}>
            <Text
              style={[
                styles.loginText,
                {
                  color: theme.colors.textSecondary,
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
                    fontWeight: '600',
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
    fontSize: 28,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6c757d',
  },
  form: {
    width: '100%',
  },
  registerButton: {
    marginTop: 16,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  loginText: {
    fontSize: 14,
  },
  loginLink: {
    fontSize: 14,
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
});

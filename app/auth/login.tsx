import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { useThemeStore } from '@/store/themeStore';
import { useAuthStore, UserType } from '@/store/authStore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { validateEmail, validatePassword } from '@/utils/validation';
import { Mail, Lock, Store, Truck, User } from 'lucide-react-native';

export default function LoginScreen() {
  const { theme } = useThemeStore();
  const { login, isLoading } = useAuthStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<UserType>('customer');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);

  const validateForm = () => {
    const emailValidationError = validateEmail(email);
    const passwordValidationError = validatePassword(password);

    setEmailError(emailValidationError);
    setPasswordError(passwordValidationError);

    return !emailValidationError && !passwordValidationError;
  };

  const handleLogin = async () => {
    setLoginError(null);

    if (!validateForm()) {
      return;
    }

    const success = await login(email, password, userType);

    if (success) {
      // Updated navigation based on user type
      switch (userType) {
        case 'business':
          router.replace('/business/BusinessDashboard');
          break;
        case 'delivery':
          router.replace('/delivery/DeliveryPartnerDashboard');
          break;
        default:
          router.replace('/(customer)');
      }
    } else {
      setLoginError('Invalid email or password. Please try again.');
    }
  };
  const navigateToRegister = () => {
    switch (userType) {
      case 'business':
        router.push('/auth/business-register');
        break;
      case 'delivery':
        router.push('/auth/delivery-register');
        break;
      default:
        router.push('/auth/register');
    }
  };

  const userTypes: { type: UserType; icon: React.ReactNode; label: string }[] = [
    { type: 'customer', icon: <User size={24} />, label: 'Customer' },
    { type: 'business', icon: <Store size={24} />, label: 'Business' },
    { type: 'delivery', icon: <Truck size={24} />, label: 'Delivery' },
  ];

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { backgroundColor: theme.colors.background }
        ]}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.text, fontFamily: 'Poppins-Bold' }]}>
            Welcome Back
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.secondaryText, fontFamily: 'Poppins-Regular' }]}>
            Login to continue ordering delicious parathas
          </Text>
        </View>

        <View style={styles.userTypeContainer}>
          {userTypes.map(({ type, icon, label }) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.userTypeButton,
                {
                  backgroundColor: userType === type ? theme.colors.primary : theme.colors.card,
                  borderColor: theme.colors.border,
                }
              ]}
              onPress={() => setUserType(type)}
            >
              {React.cloneElement(icon as React.ReactElement, {
                color: userType === type ? 'white' : theme.colors.text
              })}
              <Text
                style={[
                  styles.userTypeLabel,
                  {
                    color: userType === type ? 'white' : theme.colors.text,
                    fontFamily: 'Poppins-Medium'
                  }
                ]}
              >
                {label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.form}>
          {loginError && (
            <View style={[styles.errorContainer, { backgroundColor: 'rgba(239, 68, 68, 0.1)' }]}>
              <Text style={[styles.errorText, { color: theme.colors.error, fontFamily: 'Poppins-Medium' }]}>
                {loginError}
              </Text>
            </View>
          )}

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
            label="Password"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setPasswordError(null);
            }}
            placeholder="Your password"
            secureTextEntry
            error={passwordError}
            leftIcon={<Lock size={20} color={theme.colors.icon} />}
          />

          <TouchableOpacity style={styles.forgotPasswordContainer}>
            <Text style={[styles.forgotPasswordText, { color: theme.colors.primary, fontFamily: 'Poppins-Medium' }]}>
              Forgot Password?
            </Text>
          </TouchableOpacity>

          <Button
            title="Login"
            onPress={handleLogin}
            variant="primary"
            isLoading={isLoading}
            fullWidth
            style={styles.loginButton}
          />

          <View style={styles.registerContainer}>
            <Text style={[styles.registerText, { color: theme.colors.secondaryText, fontFamily: 'Poppins-Regular' }]}>
              Don't have an account?{' '}
            </Text>
            <TouchableOpacity onPress={navigateToRegister}>
              <Text style={[styles.registerLink, { color: theme.colors.primary, fontFamily: 'Poppins-SemiBold' }]}>
                Register
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
  },
  userTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  userTypeButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 4,
    borderWidth: 1,
  },
  userTypeLabel: {
    marginTop: 8,
    fontSize: 12,
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
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontSize: 14,
  },
  loginButton: {
    marginBottom: 20,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
  },
  registerText: {
    fontSize: 14,
  },
  registerLink: {
    fontSize: 14,
  },
});
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
import { useAuthStore, UserType } from '@/store/authStore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { validateEmail } from '@/utils/validation';
import { Mail, Lock } from 'lucide-react-native';

export default function LoginScreen() {
  const { theme } = useThemeStore();
  const { login, isLoading, error, clearError, userType } = useAuthStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);

  useEffect(() => {
    clearError();
  }, [clearError]);

  const validateForm = () => {
    const emailValidationError = validateEmail(email);

    setEmailError(emailValidationError);

    return !emailValidationError;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    const success = await login(email, password);
    debugger;
    if (success) {
      if (userType === 'delivery') {
        router.replace('/delivery/DeliveryPartnerDashboard');
      } else {
        router.replace('/(tabs)');
      }
    }
  };

  const navigateToRegister = () => {
    router.push('/auth/register-type');
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
            Welcome Back
          </Text>
          <Text
            style={[
              styles.subtitle,
              {
                color: theme.colors.textSecondary,
                fontWeight: '400',
              },
            ]}
          >
            Login to continue ordering delicious parathas
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
            label="Password"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              clearError();
            }}
            placeholder="Your password"
            secureTextEntry
            error={undefined}
            leftIcon={<Lock size={20} color={theme.colors.icon} />}
          />

          <TouchableOpacity style={styles.forgotPasswordContainer}>
            <Text
              style={[
                styles.forgotPasswordText,
                { color: theme.colors.primary, fontWeight: '500' },
              ]}
            >
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
            <Text
              style={[
                styles.registerText,
                {
                  color: theme.colors.textSecondary,
                  fontWeight: '400',
                },
              ]}
            >
              Don't have an account?{' '}
            </Text>
            <TouchableOpacity onPress={navigateToRegister}>
              <Text
                style={[
                  styles.registerLink,
                  {
                    color: theme.colors.primary,
                    fontWeight: '600',
                  },
                ]}
              >
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

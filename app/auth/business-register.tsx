import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { useThemeStore } from '@/store/themeStore';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Mail, Lock, Building2, Phone, MapPin, BadgeIndianRupee } from 'lucide-react-native';
import { validateEmail, validatePassword, validateName, validatePasswordMatch } from '@/utils/validation';

export default function BusinessRegisterScreen() {
    const { theme } = useThemeStore();
    const { register, isLoading } = useAuthStore();

    const [businessName, setBusinessName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [gstNumber, setGstNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [businessNameError, setBusinessNameError] = useState<string | null>(null);
    const [emailError, setEmailError] = useState<string | null>(null);
    const [phoneError, setPhoneError] = useState<string | null>(null);
    const [addressError, setAddressError] = useState<string | null>(null);
    const [gstError, setGstError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);

    const validateForm = () => {
        const businessNameValidation = validateName(businessName);
        const emailValidation = validateEmail(email);
        const passwordValidation = validatePassword(password);
        const confirmPasswordValidation = validatePasswordMatch(password, confirmPassword);
        const phoneValidation = phone.length === 10 ? null : 'Phone must be 10 digits';
        const addressValidation = address ? null : 'Address is required';
        const gstValidation = gstNumber.length === 15 ? null : 'GST number must be 15 characters';

        setBusinessNameError(businessNameValidation);
        setEmailError(emailValidation);
        setPhoneError(phoneValidation);
        setAddressError(addressValidation);
        setGstError(gstValidation);
        setPasswordError(passwordValidation);
        setConfirmPasswordError(confirmPasswordValidation);

        return !businessNameValidation &&
            !emailValidation &&
            !phoneValidation &&
            !addressValidation &&
            !gstValidation &&
            !passwordValidation &&
            !confirmPasswordValidation;
    };

    const handleRegister = async () => {
        if (!validateForm()) return;

        const success = await register(businessName, email, password, {
            phone,
            address,
            gstNumber,
        });

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
                        Register Your Business
                    </Text>
                    <Text style={[styles.subtitle, { color: theme.colors.secondaryText, fontFamily: 'Poppins-Regular' }]}>
                        Sign up to start selling on the platform
                    </Text>
                </View>

                <View style={styles.form}>
                    <Input
                        label="Business Name"
                        value={businessName}
                        onChangeText={(text) => {
                            setBusinessName(text);
                            setBusinessNameError(null);
                        }}
                        placeholder="Your business name"
                        autoCapitalize="words"
                        error={businessNameError}
                        leftIcon={<Building2 size={20} color={theme.colors.icon} />}
                    />

                    <Input
                        label="Business Email"
                        value={email}
                        onChangeText={(text) => {
                            setEmail(text);
                            setEmailError(null);
                        }}
                        placeholder="Business email address"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        error={emailError}
                        leftIcon={<Mail size={20} color={theme.colors.icon} />}
                    />

                    <Input
                        label="Phone Number"
                        value={phone}
                        onChangeText={(text) => {
                            setPhone(text);
                            setPhoneError(null);
                        }}
                        placeholder="10-digit mobile number"
                        keyboardType="phone-pad"
                        error={phoneError}
                        leftIcon={<Phone size={20} color={theme.colors.icon} />}
                    />

                    <Input
                        label="Business Address"
                        value={address}
                        onChangeText={(text) => {
                            setAddress(text);
                            setAddressError(null);
                        }}
                        placeholder="Your full business address"
                        error={addressError}
                        leftIcon={<MapPin size={20} color={theme.colors.icon} />}
                    />

                    <Input
                        label="GST Number"
                        value={gstNumber}
                        onChangeText={(text) => {
                            setGstNumber(text);
                            setGstError(null);
                        }}
                        placeholder="15-digit GSTIN"
                        error={gstError}
                        leftIcon={<BadgeIndianRupee size={20} color={theme.colors.icon} />}
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
                        placeholder="Re-enter password"
                        secureTextEntry
                        error={confirmPasswordError}
                        leftIcon={<Lock size={20} color={theme.colors.icon} />}
                    />

                    <Button
                        title="Register Business"
                        onPress={handleRegister}
                        variant="primary"
                        isLoading={isLoading}
                        fullWidth
                        style={styles.registerButton}
                    />

                    <View style={styles.loginContainer}>
                        <Text style={[styles.loginText, { color: theme.colors.secondaryText, fontFamily: 'Poppins-Regular' }]}>
                            Already have an account?{' '}
                        </Text>
                        <TouchableOpacity onPress={navigateToLogin}>
                            <Text style={[styles.loginLink, { color: theme.colors.primary, fontFamily: 'Poppins-SemiBold' }]}>
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

import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { useThemeStore } from '@/store/themeStore';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Mail, Lock, User, Phone, MapPin, CarFront, Badge } from 'lucide-react-native';
import { validateEmail, validatePassword, validateName, validatePasswordMatch } from '@/utils/validation';

export default function DeliveryRegisterScreen() {
    const { theme } = useThemeStore();
    const { register, isLoading } = useAuthStore();

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [vehicleType, setVehicleType] = useState('');
    const [licenseNumber, setLicenseNumber] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [fullNameError, setFullNameError] = useState<string | null>(null);
    const [emailError, setEmailError] = useState<string | null>(null);
    const [phoneError, setPhoneError] = useState<string | null>(null);
    const [vehicleTypeError, setVehicleTypeError] = useState<string | null>(null);
    const [licenseError, setLicenseError] = useState<string | null>(null);
    const [addressError, setAddressError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);

    const validateForm = () => {
        const nameValidation = validateName(fullName);
        const emailValidation = validateEmail(email);
        const passwordValidation = validatePassword(password);
        const confirmPasswordValidation = validatePasswordMatch(password, confirmPassword);
        const phoneValidation = phone.length === 10 ? null : 'Phone must be 10 digits';
        const vehicleValidation = vehicleType ? null : 'Vehicle type is required';
        const licenseValidation = licenseNumber ? null : 'License number is required';
        const addressValidation = address ? null : 'Address is required';

        setFullNameError(nameValidation);
        setEmailError(emailValidation);
        setPhoneError(phoneValidation);
        setVehicleTypeError(vehicleValidation);
        setLicenseError(licenseValidation);
        setAddressError(addressValidation);
        setPasswordError(passwordValidation);
        setConfirmPasswordError(confirmPasswordValidation);

        return !nameValidation &&
            !emailValidation &&
            !phoneValidation &&
            !vehicleValidation &&
            !licenseValidation &&
            !addressValidation &&
            !passwordValidation &&
            !confirmPasswordValidation;
    };

    const handleRegister = async () => {
        if (!validateForm()) return;

        const success = await register(fullName, email, password, {
            phone,
            vehicleType,
            licenseNumber,
            address,
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
                        Register as Delivery Partner
                    </Text>
                    <Text style={[styles.subtitle, { color: theme.colors.secondaryText, fontFamily: 'Poppins-Regular' }]}>
                        Sign up to start delivering with us
                    </Text>
                </View>

                <View style={styles.form}>
                    <Input
                        label="Full Name"
                        value={fullName}
                        onChangeText={(text) => {
                            setFullName(text);
                            setFullNameError(null);
                        }}
                        placeholder="Your full name"
                        autoCapitalize="words"
                        error={fullNameError}
                        leftIcon={<User size={20} color={theme.colors.icon} />}
                    />

                    <Input
                        label="Email"
                        value={email}
                        onChangeText={(text) => {
                            setEmail(text);
                            setEmailError(null);
                        }}
                        placeholder="Email address"
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
                        label="Vehicle Type"
                        value={vehicleType}
                        onChangeText={(text) => {
                            setVehicleType(text);
                            setVehicleTypeError(null);
                        }}
                        placeholder="e.g. Bike, Scooter, Car"
                        error={vehicleTypeError}
                        leftIcon={<CarFront size={20} color={theme.colors.icon} />}
                    />

                    <Input
                        label="License Number"
                        value={licenseNumber}
                        onChangeText={(text) => {
                            setLicenseNumber(text);
                            setLicenseError(null);
                        }}
                        placeholder="Your driving license number"
                        error={licenseError}
                        leftIcon={<Badge size={20} color={theme.colors.icon} />}
                    />

                    <Input
                        label="Address"
                        value={address}
                        onChangeText={(text) => {
                            setAddress(text);
                            setAddressError(null);
                        }}
                        placeholder="Your residential address"
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
                        placeholder="Re-enter password"
                        secureTextEntry
                        error={confirmPasswordError}
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

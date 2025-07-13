import { useThemeStore } from '@/store/themeStore';
import { useAddressStore } from '@/store/addressStore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {
  addressService,
  CreateAddressRequest,
} from '@/services/addressService';
import { locationService, LocationData } from '@/services/locationService';

import React, { useState, useEffect } from 'react';

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { router } from 'expo-router';

import {
  ArrowLeft,
  Home,
  Building2,
  Map,
  MapPin,
  Navigation,
} from 'lucide-react-native';

export default function AddressAddScreen() {
  const { theme } = useThemeStore();
  const { addAddress, addresses } = useAddressStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [addressType, setAddressType] = useState<'home' | 'work' | 'other'>(
    'home'
  );
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [isDefault, setIsDefault] = useState(false);

  const [addressError, setAddressError] = useState<string | null>(null);
  const [cityError, setCityError] = useState<string | null>(null);
  const [stateError, setStateError] = useState<string | null>(null);
  const [zipCodeError, setZipCodeError] = useState<string | null>(null);

  // Auto-detect location when component mounts
  useEffect(() => {
    const autoDetectLocation = async () => {
      try {
        const locationData =
          await locationService.getCurrentLocationWithAddress();
        setLatitude(locationData.latitude.toFixed(8));
        setLongitude(locationData.longitude.toFixed(8));
      } catch (error: any) {
        console.log('Auto location detection failed:', error.message);
        // Don't show error alert for auto-detection, just log it
      }
    };

    autoDetectLocation();
  }, []);

  const validateForm = () => {
    let isValid = true;

    // Make street address optional - remove validation
    setAddressError(null);

    if (!city.trim()) {
      setCityError('City is required');
      isValid = false;
    } else {
      setCityError(null);
    }

    if (!state.trim()) {
      setStateError('State is required');
      isValid = false;
    } else {
      setStateError(null);
    }

    if (!zipCode.trim()) {
      setZipCodeError('ZIP code is required');
      isValid = false;
    } else if (!/^\d{5,6}$/.test(zipCode.trim())) {
      setZipCodeError('Enter a valid ZIP code');
      isValid = false;
    } else {
      setZipCodeError(null);
    }

    return isValid;
  };

  const handleGetCurrentLocation = async () => {
    setIsGettingLocation(true);
    try {
      const locationData =
        await locationService.getCurrentLocationWithAddress();

      setAddress(locationData.address || '');
      setCity(locationData.city || '');
      setState(locationData.state || '');
      setZipCode(locationData.zipCode || '');

      const latString = locationData.latitude.toFixed(8);
      const lngString = locationData.longitude.toFixed(8);

      setLatitude(latString);
      setLongitude(lngString);

      // Clear errors
      setAddressError(null);
      setCityError(null);
      setStateError(null);
      setZipCodeError(null);

      Alert.alert(
        'Success',
        `Location coordinates detected successfully!\nLat: ${latString}\nLng: ${lngString}\n\nNote: Address details will need to be filled manually.`
      );
    } catch (error: any) {
      console.error('Location error:', error);
      Alert.alert('Error', error.message || 'Failed to get current location');
    } finally {
      setIsGettingLocation(false);
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const addressData = {
      type: addressType,
      address: address.trim() || '', // Send empty string if no address provided
      city,
      state,
      zipCode,
      latitude: latitude ? parseFloat(latitude) : 0,
      longitude: longitude ? parseFloat(longitude) : 0,
      isDefault: addresses.length === 0, // First address becomes default
    };

    const success = await addAddress(addressData);
    if (success) {
      router.replace('/addresses');
    }
  };

  const addressTypes = [
    { type: 'home' as const, icon: <Home size={24} />, label: 'Home' },
    { type: 'work' as const, icon: <Building2 size={24} />, label: 'Work' },
    { type: 'other' as const, icon: <Map size={24} />, label: 'Other' },
  ];

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.replace('/addresses')}
          >
            <ArrowLeft size={24} color={theme.colors.text} />
          </TouchableOpacity>
          <Text
            style={[
              styles.title,
              { color: theme.colors.text, fontWeight: '700' },
            ]}
          >
            Add New Address
          </Text>
          <View style={styles.headerRight} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          <View style={styles.section}>
            <Text
              style={[
                styles.sectionTitle,
                { color: theme.colors.text, fontWeight: '600' },
              ]}
            >
              Address Type
            </Text>
            <View style={styles.addressTypeContainer}>
              {addressTypes.map(({ type, icon, label }) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.addressTypeButton,
                    {
                      backgroundColor:
                        addressType === type
                          ? theme.colors.primary
                          : theme.colors.card,
                      borderColor: theme.colors.border,
                    },
                  ]}
                  onPress={() => setAddressType(type)}
                >
                  {React.cloneElement(icon, {
                    color: addressType === type ? 'white' : theme.colors.text,
                  })}
                  <Text
                    style={[
                      styles.addressTypeLabel,
                      {
                        color:
                          addressType === type ? 'white' : theme.colors.text,
                        fontWeight: '500',
                      },
                    ]}
                  >
                    {label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            {/* <Button
              title="Get Current Location"
              onPress={handleGetCurrentLocation}
              variant="outline"
              isLoading={isGettingLocation}
              style={styles.locationButton}
              fullWidth
            /> */}
          </View>

          <View style={styles.section}>
            <View style={styles.locationContainer}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                Location Coordinates
              </Text>
              <View style={styles.coordinatesRow}>
                <View style={styles.coordinateInput}>
                  <Input
                    label="Latitude"
                    value={latitude}
                    onChangeText={(text) => {
                      setLatitude(text);
                    }}
                    placeholder="Auto-detected latitude"
                    keyboardType="numeric"
                    leftIcon={<MapPin size={20} color={theme.colors.icon} />}
                    disabled={true} // Disable manual editing
                  />
                </View>
                <View style={styles.coordinateInput}>
                  <Input
                    label="Longitude"
                    value={longitude}
                    onChangeText={(text) => {
                      setLongitude(text);
                    }}
                    placeholder="Auto-detected longitude"
                    keyboardType="numeric"
                    leftIcon={<MapPin size={20} color={theme.colors.icon} />}
                    disabled={true} // Disable manual editing
                  />
                </View>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Address Details
            </Text>

            <Input
              label="Street Address (Optional)"
              value={address}
              onChangeText={(text) => {
                setAddress(text);
                setAddressError(null);
              }}
              placeholder="Enter your street address (optional)"
              multiline
              error={addressError || undefined}
              leftIcon={<MapPin size={20} color={theme.colors.icon} />}
            />

            <Input
              label="City"
              value={city}
              onChangeText={(text) => {
                setCity(text);
                setCityError(null);
              }}
              placeholder="Enter city name"
              error={cityError || undefined}
            />

            <Input
              label="State"
              value={state}
              onChangeText={(text) => {
                setState(text);
                setStateError(null);
              }}
              placeholder="Enter state name"
              error={stateError || undefined}
            />

            <Input
              label="ZIP Code"
              value={zipCode}
              onChangeText={(text) => {
                setZipCode(text);
                setZipCodeError(null);
              }}
              placeholder="Enter ZIP code"
              keyboardType="numeric"
              error={zipCodeError || undefined}
              {...(!zipCodeError && { marginBottom: 0 })}
            />
          </View>

          <View style={styles.section}>
            <TouchableOpacity
              style={styles.defaultContainer}
              onPress={() => setIsDefault(!isDefault)}
            >
              <View
                style={[
                  styles.checkbox,
                  {
                    backgroundColor: isDefault
                      ? theme.colors.primary
                      : 'transparent',
                    borderColor: theme.colors.border,
                  },
                ]}
              >
                {isDefault && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text
                style={[
                  styles.defaultText,
                  { color: theme.colors.text, fontWeight: '500' },
                ]}
              >
                Set as default address
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <Button
            title={isLoading ? 'Adding...' : 'Add Address'}
            onPress={handleSubmit}
            variant="primary"
            disabled={isLoading}
            fullWidth
          />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  backButton: {
    padding: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  headerRight: {
    width: 32,
  },
  content: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 16,
  },
  locationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  locationButton: {
    marginTop: 12,
  },
  locationContainer: {
    marginBottom: 24,
  },
  coordinatesRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  coordinateInput: {
    flex: 1,
  },
  addressTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addressTypeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginHorizontal: 4,
  },
  addressTypeLabel: {
    fontSize: 14,
    marginLeft: 8,
  },
  defaultContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  checkmark: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  defaultText: {
    fontSize: 16,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
});

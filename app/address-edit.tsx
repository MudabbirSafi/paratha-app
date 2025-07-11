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
import { router, useLocalSearchParams } from 'expo-router';
import { useThemeStore } from '@/store/themeStore';
import { useAddressStore } from '@/store/addressStore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {
  addressService,
  Address,
  UpdateAddressRequest,
} from '@/services/addressService';
import { locationService, LocationData } from '@/services/locationService';
import {
  ArrowLeft,
  Home,
  Building2,
  Map,
  MapPin,
  Trash2,
  Navigation,
} from 'lucide-react-native';

export default function AddressEditScreen() {
  const { theme } = useThemeStore();
  const { addresses, updateAddress, deleteAddress } = useAddressStore();
  const { addressId } = useLocalSearchParams<{ addressId: string }>();

  const [isLoading, setIsLoading] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [locationData, setLocationData] = useState<LocationData | null>(null);

  // Find the address to edit
  const address = addresses.find((addr) => addr.id === addressId);

  // Form state
  const [selectedType, setSelectedType] = useState<'home' | 'work' | 'other'>(
    address?.type || 'home'
  );
  const [streetAddress, setStreetAddress] = useState(address?.address || '');
  const [city, setCity] = useState(address?.city || '');
  const [state, setState] = useState(address?.state || '');
  const [zipCode, setZipCode] = useState(address?.zipCode || '');
  const [latitude, setLatitude] = useState(address?.latitude?.toString() || '');
  const [longitude, setLongitude] = useState(
    address?.longitude?.toString() || ''
  );

  // Error states
  const [streetAddressError, setStreetAddressError] = useState<string | null>(
    null
  );
  const [cityError, setCityError] = useState<string | null>(null);
  const [stateError, setStateError] = useState<string | null>(null);
  const [zipCodeError, setZipCodeError] = useState<string | null>(null);

  // Update form when address changes
  useEffect(() => {
    if (address) {
      setSelectedType(address.type);
      setStreetAddress(address.address);
      setCity(address.city);
      setState(address.state);
      setZipCode(address.zipCode);
      setLatitude(address.latitude?.toString() || '');
      setLongitude(address.longitude?.toString() || '');
    }
  }, [address]);

  const handleDelete = async () => {
    if (!addressId) return;

    Alert.alert(
      'Delete Address',
      'Are you sure you want to delete this address?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const success = await deleteAddress(addressId);
            if (success) {
              router.back();
            }
          },
        },
      ]
    );
  };

  const validateForm = () => {
    let isValid = true;

    if (!streetAddress.trim()) {
      setStreetAddressError('Address is required');
      isValid = false;
    } else {
      setStreetAddressError(null);
    }

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

      setStreetAddress(locationData.address || '');
      setCity(locationData.city || '');
      setState(locationData.state || '');
      setZipCode(locationData.zipCode || '');
      setLatitude(locationData.latitude.toString());
      setLongitude(locationData.longitude.toString());

      // Clear errors
      setStreetAddressError(null);
      setCityError(null);
      setStateError(null);
      setZipCodeError(null);

      Alert.alert('Success', 'Location detected successfully!');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to get current location');
    } finally {
      setIsGettingLocation(false);
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const updateData = {
      type: selectedType,
      address: streetAddress,
      city,
      state,
      zipCode,
      latitude: parseFloat(latitude) || 0,
      longitude: parseFloat(longitude) || 0,
    };

    const success = await updateAddress(addressId, updateData);
    if (success) {
      router.back();
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
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color={theme.colors.text} />
          </TouchableOpacity>
          <Text
            style={[
              styles.title,
              { color: theme.colors.text, fontWeight: '700' },
            ]}
          >
            Edit Address
          </Text>
          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <Trash2 size={20} color={theme.colors.error} />
          </TouchableOpacity>
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
                        selectedType === type
                          ? theme.colors.primary
                          : theme.colors.card,
                      borderColor: theme.colors.border,
                    },
                  ]}
                  onPress={() => setSelectedType(type)}
                >
                  {React.cloneElement(icon, {
                    color: selectedType === type ? 'white' : theme.colors.text,
                  })}
                  <Text
                    style={[
                      styles.addressTypeLabel,
                      {
                        color:
                          selectedType === type ? 'white' : theme.colors.text,
                        fontWeight: '500',
                      },
                    ]}
                  >
                    {label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <Button
              title="Get Current Location"
              onPress={handleGetCurrentLocation}
              variant="outline"
              isLoading={isGettingLocation}
              style={styles.locationButton}
              fullWidth
            />
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Address Details
            </Text>

            <Input
              label="Street Address"
              value={streetAddress}
              onChangeText={(text) => {
                setStreetAddress(text);
                setStreetAddressError(null);
              }}
              placeholder="Enter your street address"
              multiline
              error={streetAddressError || undefined}
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
        </ScrollView>

        <View style={styles.footer}>
          <Button
            title={isLoading ? 'Saving...' : 'Save Changes'}
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
  deleteButton: {
    padding: 4,
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
  locationContainer: {
    marginBottom: 24,
  },
  coordinatesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  coordinateInput: {
    flex: 1,
    marginHorizontal: 4,
  },
  locationButton: {
    minWidth: 120,
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
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
});

import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useThemeStore } from '@/store/themeStore';
import { useAddressStore, Address } from '@/store/addressStore';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { addressService } from '@/services/addressService';
import {
  ArrowLeft,
  Plus,
  MapPin,
  Home,
  Building2,
  Map,
} from 'lucide-react-native';

export default function AddressesScreen() {
  const { theme } = useThemeStore();
  const { isAuthenticated } = useAuthStore();
  const { addresses, isLoading, error, loadAddresses, clearError } =
    useAddressStore();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadAddresses();
    setRefreshing(false);
  };

  useEffect(() => {
    // Check authentication first
    if (!isAuthenticated) {
      Alert.alert(
        'Authentication Required',
        'Please log in to manage your addresses.',
        [
          {
            text: 'Login',
            onPress: () => router.replace('/auth/login'),
          },
          {
            text: 'Cancel',
            style: 'cancel',
            onPress: () => router.back(),
          },
        ]
      );
      return;
    }

    loadAddresses();
  }, [loadAddresses, isAuthenticated]);

  // Don't render if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  const handleAddAddress = () => {
    router.push('/address-add');
  };

  const getAddressIcon = (type: string) => {
    switch (type) {
      case 'home':
        return <Home size={20} color={theme.colors.primary} />;
      case 'work':
        return <Building2 size={20} color={theme.colors.primary} />;
      default:
        return <Map size={20} color={theme.colors.primary} />;
    }
  };

  const getAddressTypeLabel = (type: string) => {
    switch (type) {
      case 'home':
        return 'Home';
      case 'work':
        return 'Work';
      default:
        return 'Other';
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.replace('/profile')}
        >
          <ArrowLeft size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text
          style={[
            styles.title,
            { color: theme.colors.text, fontWeight: '700' },
          ]}
        >
          My Addresses
        </Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {error && (
          <View
            style={[
              styles.errorContainer,
              { backgroundColor: 'rgba(239, 68, 68, 0.1)' },
            ]}
          >
            <Text style={[styles.errorText, { color: theme.colors.error }]}>
              {error}
            </Text>
          </View>
        )}

        {isLoading ? (
          <View style={styles.loadingContainer}>
            <Text
              style={[
                styles.loadingText,
                { color: theme.colors.textSecondary },
              ]}
            >
              Loading addresses...
            </Text>
          </View>
        ) : addresses.length === 0 ? (
          <View style={styles.emptyContainer}>
            <MapPin size={64} color={theme.colors.textSecondary} />
            <Text
              style={[
                styles.emptyTitle,
                { color: theme.colors.text, fontWeight: '600' },
              ]}
            >
              No Addresses Yet
            </Text>
            <Text
              style={[
                styles.emptySubtitle,
                {
                  color: theme.colors.textSecondary,
                },
              ]}
            >
              Add your first address to get started
            </Text>
          </View>
        ) : (
          <View style={styles.addressesContainer}>
            {addresses.map((address) => (
              <Card key={address.id} style={styles.addressCard}>
                <View style={styles.addressHeader}>
                  <View style={styles.addressTypeContainer}>
                    {getAddressIcon(address.type)}
                    <Text
                      style={[
                        styles.addressType,
                        {
                          color: theme.colors.text,
                          fontWeight: '500',
                        },
                      ]}
                    >
                      {getAddressTypeLabel(address.type)}
                    </Text>
                    {address.isDefault && (
                      <Badge
                        label="Default"
                        variant="success"
                        style={styles.defaultBadge}
                      />
                    )}
                  </View>
                  <View style={styles.addressActions}></View>
                </View>

                <Text
                  style={[styles.addressText, { color: theme.colors.text }]}
                >
                  {address.address}
                </Text>
                <Text
                  style={[
                    styles.addressDetails,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  {address.city}, {address.state}
                </Text>
                <Text
                  style={[
                    styles.addressDetails,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  {address.zipCode}
                </Text>
                {address.latitude && address.longitude && (
                  <Text
                    style={[
                      styles.coordinates,
                      {
                        color: theme.colors.textSecondary,
                      },
                    ]}
                  >
                    📍 {address.latitude.toFixed(6)},{' '}
                    {address.longitude.toFixed(6)}
                  </Text>
                )}
              </Card>
            ))}
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Add New Address"
          onPress={handleAddAddress}
          variant="primary"
          fullWidth
        />
      </View>
    </SafeAreaView>
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
  errorContainer: {
    margin: 16,
    padding: 12,
    borderRadius: 8,
  },
  errorText: {
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 64,
  },
  emptyTitle: {
    fontSize: 18,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 32,
  },
  addressesContainer: {
    padding: 16,
  },
  addressCard: {
    marginBottom: 16,
    padding: 16,
  },
  addressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  addressTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  addressType: {
    fontSize: 16,
    marginLeft: 8,
  },
  defaultBadge: {
    marginLeft: 8,
  },
  addressActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    padding: 8,
    marginLeft: 4,
  },
  addressText: {
    fontSize: 16,
    marginBottom: 4,
  },
  addressDetails: {
    fontSize: 14,
  },
  coordinates: {
    fontSize: 12,
    marginTop: 4,
    fontFamily: 'Poppins-Regular',
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 64,
  },
  loadingText: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
});

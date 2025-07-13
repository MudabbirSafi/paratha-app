import { useThemeStore } from '@/store/themeStore';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { mockUser, mockOrders } from '@/constants/MockData';
import { formatDateTime } from '@/utils/formatUtils';

import React, { useState, useEffect } from 'react';

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { router } from 'expo-router';

import {
  LogOut,
  ChevronRight,
  MapPin,
  User as UserIcon,
  Moon,
  Sun,
  Bell,
  Edit,
  Save,
  X,
  Laptop,
  Check,
  KeyRound,
} from 'lucide-react-native';

export default function ProfileScreen() {
  const { theme, themeMode, setThemeMode } = useThemeStore();
  const {
    user,
    isAuthenticated,
    logout,
    getProfile,
    updateProfile,
    isLoading,
    error,
  } = useAuthStore();

  const [isThemeModalVisible, setThemeModalVisible] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      getProfile();
    }
  }, [isAuthenticated]);

  // If not authenticated, show login prompt
  if (!isAuthenticated) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <View style={styles.header}>
          <Text
            style={[
              styles.title,
              { color: theme.colors.text, fontWeight: '700' },
            ]}
          >
            Profile
          </Text>
        </View>
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, { color: theme.colors.text }]}>
            Please log in to view your profile
          </Text>
          <Button
            title="Login"
            onPress={() => router.push('/auth/login')}
            variant="primary"
            style={styles.loginButton}
          />
        </View>
      </SafeAreaView>
    );
  }

  const handleLogout = () => {
    console.log('Logout button pressed');
    logout().catch((error) => {
      console.error('Logout error:', error);
    });
  };

  const themeOptions = [
    {
      key: 'light',
      label: 'Light',
      icon: <Sun size={20} color={theme.colors.text} />,
    },
    {
      key: 'dark',
      label: 'Dark',
      icon: <Moon size={20} color={theme.colors.text} />,
    },
    {
      key: 'system',
      label: 'System',
      icon: <Laptop size={20} color={theme.colors.text} />,
    },
  ];

  const menuItems = [
    {
      icon: <UserIcon size={20} color={theme.colors.primary} />,
      title: 'Edit Profile',
      onPress: () => router.push('/profile/edit' as any),
    },
    {
      icon: <KeyRound size={20} color={theme.colors.primary} />,
      title: 'Change Password',
      onPress: () => router.push('/profile/change-password' as any),
    },
    {
      icon: <Laptop size={20} color={theme.colors.primary} />,
      title: 'Theme',
      onPress: () => setThemeModalVisible(true),
    },
    {
      icon: <MapPin size={20} color={theme.colors.primary} />,
      title: 'Addresses',
      onPress: () => router.push('/addresses'),
    },
    {
      icon: <Bell size={20} color={theme.colors.primary} />,
      title: 'Notifications',
      onPress: () => console.log('Notifications pressed'),
    },
  ];

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Modal
        animationType="slide"
        transparent={true}
        visible={isThemeModalVisible}
        onRequestClose={() => setThemeModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View
            style={[
              styles.modalContent,
              { backgroundColor: theme.colors.card },
            ]}
          >
            <Text style={[styles.modalTitle, { color: theme.colors.text }]}>
              Choose Theme
            </Text>
            {themeOptions.map((option) => (
              <TouchableOpacity
                key={option.key}
                style={styles.themeOption}
                onPress={() => {
                  setThemeMode(option.key as 'light' | 'dark' | 'system');
                  setThemeModalVisible(false);
                }}
              >
                {option.icon}
                <Text
                  style={[styles.themeOptionText, { color: theme.colors.text }]}
                >
                  {option.label}
                </Text>
                {themeMode === option.key && (
                  <Check size={20} color={theme.colors.primary} />
                )}
              </TouchableOpacity>
            ))}
            <Button
              title="Cancel"
              onPress={() => setThemeModalVisible(false)}
              variant="ghost"
            />
          </View>
        </View>
      </Modal>

      <View style={styles.header}>
        <Text
          style={[
            styles.title,
            { color: theme.colors.text, fontWeight: '700' },
          ]}
        >
          Profile
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <View style={styles.header}>
          <Text
            style={[
              styles.title,
              { color: theme.colors.text, fontWeight: '700' },
            ]}
          >
            Profile
          </Text>
        </View> */}

        {user && (
          <Card style={styles.profileCard}>
            <View>
              <Text style={[styles.profileName, { color: theme.colors.text }]}>
                {user.name}
              </Text>
              <Text
                style={[
                  styles.profileRole,
                  { color: theme.colors.textSecondary },
                ]}
              >
                {user.role === 'delivery'
                  ? 'Delivery Partner'
                  : user.role === 'business'
                  ? 'Business'
                  : 'Customer'}
              </Text>
              <Text
                style={[
                  styles.profileInfo,
                  { color: theme.colors.textSecondary },
                ]}
              >
                {user.email}
              </Text>
              <Text
                style={[
                  styles.profileInfo,
                  { color: theme.colors.textSecondary },
                ]}
              >
                {user.phone}
              </Text>
            </View>
            <Badge
              label={user.role ? user.role.toUpperCase() : 'User'}
              variant="success"
            />
          </Card>
        )}

        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={item.onPress}
            >
              <View style={styles.menuItemContent}>
                {item.icon}
                <Text
                  style={[styles.menuItemText, { color: theme.colors.text }]}
                >
                  {item.title}
                </Text>
              </View>
              <ChevronRight size={16} color={theme.colors.textSecondary} />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.logoutContainer}>
          <TouchableOpacity
            style={{
              backgroundColor: theme.colors.error,
              paddingVertical: 12,
              paddingHorizontal: 16,
              borderRadius: 8,
              alignItems: 'center',
              width: '100%',
            }}
            onPress={handleLogout}
          >
            <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
  },
  title: {
    fontSize: 28,
  },
  userContainer: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  userAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  userInitial: {
    fontSize: 24,
    color: 'white',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    marginBottom: 2,
  },
  userPhone: {
    fontSize: 14,
    marginBottom: 2,
  },
  userAddress: {
    fontSize: 14,
  },
  editContainer: {
    flex: 1,
  },
  editInput: {
    marginBottom: 8,
  },
  editButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 4,
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
  },
  saveButton: {
    backgroundColor: '#10b981',
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  menuCard: {
    padding: 0,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'transparent',
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 16,
    marginLeft: 16,
  },
  logoutButton: {
    borderColor: '#ef4444',
    borderWidth: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  loginButton: {
    minWidth: 200,
    alignSelf: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  themeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  themeOptionText: {
    fontSize: 16,
    marginLeft: 15,
    flex: 1,
  },
  profileCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginHorizontal: 16,
    padding: 20,
  },
  profileName: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 8,
  },
  profileRole: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  profileInfo: {
    fontSize: 16,
    marginBottom: 4,
  },
  menuContainer: {
    marginHorizontal: 16,
    marginTop: 24,
  },
  logoutContainer: {
    padding: 16,
    alignItems: 'center',
  },
});

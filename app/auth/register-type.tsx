import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useThemeStore } from '@/store/themeStore';
import { Card } from '@/components/ui/Card';
import {
  User,
  Briefcase,
  Bike,
  ChevronRight,
  ArrowLeft,
} from 'lucide-react-native';

export default function RegisterTypeScreen() {
  const { theme } = useThemeStore();

  const userTypes = [
    {
      type: 'Customer',
      description: 'Order delicious food from local restaurants.',
      icon: <User size={24} color={theme.colors.primary} />,
      path: '/auth/register',
    },
    {
      type: 'Business',
      description: 'Grow your business by reaching more customers.',
      icon: <Briefcase size={24} color={theme.colors.primary} />,
      path: '/auth/register-business',
    },
    {
      type: 'Delivery Partner',
      description: 'Earn money by delivering food to customers.',
      icon: <Bike size={24} color={theme.colors.primary} />,
      path: '/auth/register-delivery',
    },
  ];

  return (
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
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Join as a...
        </Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {userTypes.map((userType, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => router.push(userType.path as any)}
          >
            <Card style={styles.card}>
              <View style={styles.cardIcon}>{userType.icon}</View>
              <View style={styles.cardTextContainer}>
                <Text style={[styles.cardTitle, { color: theme.colors.text }]}>
                  {userType.type}
                </Text>
                <Text
                  style={[
                    styles.cardDescription,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  {userType.description}
                </Text>
              </View>
              <ChevronRight size={20} color={theme.colors.textSecondary} />
            </Card>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
  },
  backButton: {
    padding: 8,
  },
  headerRight: {
    width: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  content: {
    padding: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 16,
  },
  cardIcon: {
    marginRight: 16,
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  cardDescription: {
    fontSize: 14,
    marginTop: 4,
  },
});

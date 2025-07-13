import { useAdminStore } from '@/store/adminStore';
import { useAuthStore } from '@/store/authStore';
import { useThemeStore } from '@/store/themeStore';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { globalStyles } from '@/utils/styles';
import { clearAuthToken } from '@/utils/api';
import { router } from 'expo-router';

import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import {
  Search,
  Filter,
  X,
  Users,
  Mail,
  Phone,
  Calendar,
  LogOut,
  ShoppingBag,
} from 'lucide-react-native';

const UsersList = () => {
  const { theme } = useThemeStore();
  const { users, isLoading, error, loadUsers, clearError } = useAdminStore();
  const { logout } = useAuthStore();

  const [refreshing, setRefreshing] = useState(false);
  const [localSearchQuery, setLocalSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [selectedRoleFilter, setSelectedRoleFilter] = useState<string | null>(
    null
  );
  const [activeTab, setActiveTab] = useState<'users' | 'orders'>('users');

  // Debug logging
  console.log('Users List Component State:', {
    usersCount: users.length,
    filteredUsersCount: filteredUsers.length,
    isLoading,
    error,
    users: users.slice(0, 2), // Log first 2 users
  });

  useEffect(() => {
    loadUsers();
  }, []);

  // Filter users locally based on search and role
  useEffect(() => {
    let filtered = users.filter((user) => user.role !== 'admin'); // Exclude admin users

    // Apply role filter
    if (selectedRoleFilter) {
      filtered = filtered.filter((user) => user.role === selectedRoleFilter);
    }

    // Apply search filter
    if (localSearchQuery.trim()) {
      const query = localSearchQuery.toLowerCase();
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query) ||
          (user.phone && user.phone.toLowerCase().includes(query))
      );
    }

    // Sort by join date - latest first
    filtered.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    setFilteredUsers(filtered);
  }, [users, localSearchQuery, selectedRoleFilter]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadUsers();
    setRefreshing(false);
  };

  const handleSearch = () => {
    // Search is handled locally, no API call needed
  };

  const handleClearSearch = () => {
    setLocalSearchQuery('');
  };

  const handleLogout = () => {
    console.log('Logout button pressed in users list');
    // Direct logout without confirmation for testing
    logout()
      .then(() => {
        console.log('Logout completed successfully');
      })
      .catch((error) => {
        console.error('Logout error:', error);
      });
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'error';
      case 'business':
        return 'warning';
      case 'delivery':
        return 'info';
      case 'customer':
        return 'success';
      default:
        return 'default';
    }
  };

  const getRoleColorHex = (role: string) => {
    switch (role) {
      case 'admin':
        return theme.colors.error;
      case 'business':
        return theme.colors.warning;
      case 'delivery':
        return theme.colors.info;
      case 'customer':
        return theme.colors.success;
      default:
        return theme.colors.primary;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const renderUserItem = ({ item }: { item: any }) => (
    <Card style={styles.userCard}>
      <View style={styles.userCardContent}>
        <View style={styles.userHeader}>
          <View style={styles.userInfo}>
            <Text style={[styles.userName, { color: theme.colors.text }]}>
              {item.name}
            </Text>
          </View>
        </View>

        <View style={styles.userDetails}>
          <View style={styles.detailRow}>
            <Mail size={16} color={theme.colors.textSecondary} />
            <Text
              style={[styles.detailText, { color: theme.colors.textSecondary }]}
            >
              {item.email}
            </Text>
          </View>

          {item.phone && (
            <View style={styles.detailRow}>
              <Phone size={16} color={theme.colors.textSecondary} />
              <Text
                style={[
                  styles.detailText,
                  { color: theme.colors.textSecondary },
                ]}
              >
                {item.phone}
              </Text>
            </View>
          )}

          <View style={styles.detailRow}>
            <Calendar size={16} color={theme.colors.textSecondary} />
            <Text
              style={[styles.detailText, { color: theme.colors.textSecondary }]}
            >
              Joined {formatDate(item.date)}
            </Text>
          </View>
        </View>
      </View>

      {/* Large role letter indicator */}
      <View
        style={[
          styles.roleLetterContainer,
          { backgroundColor: getRoleColorHex(item.role) },
        ]}
      >
        <Text style={styles.roleLetter}>
          {item.role.charAt(0).toUpperCase()}
        </Text>
      </View>
    </Card>
  );

  // Pagination removed since we're filtering locally

  const renderTabs = () => (
    <View style={styles.tabsContainer}>
      <TouchableOpacity
        style={[
          styles.tab,
          activeTab === 'users' && styles.activeTab,
          { borderBottomColor: theme.colors.primary },
        ]}
        onPress={() => setActiveTab('users')}
      >
        <Users
          size={20}
          color={
            activeTab === 'users'
              ? theme.colors.primary
              : theme.colors.textSecondary
          }
        />
        <Text
          style={[
            styles.tabText,
            {
              color:
                activeTab === 'users'
                  ? theme.colors.primary
                  : theme.colors.textSecondary,
            },
          ]}
        >
          Users ({filteredUsers.length})
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.tab,
          activeTab === 'orders' && styles.activeTab,
          { borderBottomColor: theme.colors.primary },
        ]}
        onPress={() => setActiveTab('orders')}
      >
        <ShoppingBag
          size={20}
          color={
            activeTab === 'orders'
              ? theme.colors.primary
              : theme.colors.textSecondary
          }
        />
        <Text
          style={[
            styles.tabText,
            {
              color:
                activeTab === 'orders'
                  ? theme.colors.primary
                  : theme.colors.textSecondary,
            },
          ]}
        >
          Orders (0)
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderFilters = () => (
    <View
      style={[
        styles.filtersContainer,
        { backgroundColor: theme.colors.surface },
      ]}
    >
      <View style={styles.searchContainer}>
        <View
          style={[
            styles.searchInputContainer,
            { backgroundColor: theme.colors.card },
          ]}
        >
          <Search size={20} color={theme.colors.textSecondary} />
          <TextInput
            style={[styles.searchInput, { color: theme.colors.text }]}
            placeholder="Search users..."
            placeholderTextColor={theme.colors.textTertiary}
            value={localSearchQuery}
            onChangeText={setLocalSearchQuery}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />
          {localSearchQuery.length > 0 && (
            <TouchableOpacity onPress={handleClearSearch}>
              <X size={20} color={theme.colors.textSecondary} />
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity
          style={[
            styles.filterButton,
            { backgroundColor: theme.colors.primary },
          ]}
          onPress={() => setShowFilters(!showFilters)}
        >
          <Filter size={20} color="white" />
        </TouchableOpacity>
      </View>

      {showFilters && (
        <View style={styles.roleFilters}>
          <Text style={[styles.filterLabel, { color: theme.colors.text }]}>
            Filter by role:
          </Text>
          <View style={styles.roleButtons}>
            {['all', 'customer', 'business', 'delivery'].map((role) => (
              <Button
                key={role}
                title={
                  role === 'all'
                    ? 'All'
                    : role.charAt(0).toUpperCase() + role.slice(1)
                }
                onPress={() =>
                  setSelectedRoleFilter(role === 'all' ? null : role)
                }
                variant={
                  selectedRoleFilter === role ||
                  (role === 'all' && !selectedRoleFilter)
                    ? 'primary'
                    : 'outline'
                }
                size="small"
              />
            ))}
          </View>
          {(selectedRoleFilter || localSearchQuery) && (
            <Button
              title="Clear Filters"
              onPress={() => {
                setSelectedRoleFilter(null);
                setLocalSearchQuery('');
              }}
              variant="ghost"
              size="small"
            />
          )}
        </View>
      )}
    </View>
  );

  if (error) {
    return (
      <View
        style={[
          styles.errorContainer,
          { backgroundColor: theme.colors.background },
        ]}
      >
        <Text style={[styles.errorText, { color: theme.colors.error }]}>
          {error}
        </Text>
        <Button
          title="Try Again"
          onPress={() => loadUsers()}
          variant="primary"
        />
      </View>
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.header}>
        <View style={styles.headerContent}>
          {activeTab === 'users' ? (
            <Users size={24} color={theme.colors.primary} />
          ) : (
            <ShoppingBag size={24} color={theme.colors.primary} />
          )}
          <View>
            <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
              {activeTab === 'users' ? 'Users Management' : 'Orders Management'}
            </Text>
            {activeTab === 'users' && (
              <>
                {selectedRoleFilter && (
                  <Text
                    style={[
                      styles.headerSubtitle,
                      { color: theme.colors.textSecondary },
                    ]}
                  >
                    {selectedRoleFilter.charAt(0).toUpperCase() +
                      selectedRoleFilter.slice(1)}{' '}
                    Users ({filteredUsers.length})
                  </Text>
                )}
                {!selectedRoleFilter && localSearchQuery && (
                  <Text
                    style={[
                      styles.headerSubtitle,
                      { color: theme.colors.textSecondary },
                    ]}
                  >
                    Search Results ({filteredUsers.length})
                  </Text>
                )}
                {!selectedRoleFilter && !localSearchQuery && (
                  <Text
                    style={[
                      styles.headerSubtitle,
                      { color: theme.colors.textSecondary },
                    ]}
                  >
                    All Users ({filteredUsers.length})
                  </Text>
                )}
              </>
            )}
            {activeTab === 'orders' && (
              <Text
                style={[
                  styles.headerSubtitle,
                  { color: theme.colors.textSecondary },
                ]}
              >
                Manage all orders
              </Text>
            )}
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            clearAuthToken().then(() => {
              console.log('Auth token cleared');
              router.replace('/auth/login');
            });
          }}
          style={{ padding: 8 }}
          activeOpacity={0.7}
        >
          <LogOut size={24} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>

      {renderTabs()}
      {activeTab === 'users' && renderFilters()}

      {activeTab === 'users' ? (
        <>
          {isLoading && !refreshing ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={theme.colors.primary} />
              <Text
                style={[
                  styles.loadingText,
                  { color: theme.colors.textSecondary },
                ]}
              >
                Loading users...
              </Text>
            </View>
          ) : (
            <FlatList
              data={filteredUsers}
              renderItem={renderUserItem}
              keyExtractor={(item) => item._id}
              contentContainerStyle={styles.listContainer}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={handleRefresh}
                  colors={[theme.colors.primary]}
                  tintColor={theme.colors.primary}
                />
              }
              ListEmptyComponent={
                <View style={styles.emptyContainer}>
                  <Users size={48} color={theme.colors.textTertiary} />
                  <Text
                    style={[
                      styles.emptyText,
                      { color: theme.colors.textSecondary },
                    ]}
                  >
                    {users.length === 0
                      ? 'No users found'
                      : 'No users match your filters'}
                  </Text>
                  <Text
                    style={[
                      styles.emptySubtext,
                      { color: theme.colors.textTertiary },
                    ]}
                  >
                    {users.length === 0
                      ? 'Loading users...'
                      : 'Try adjusting your search or filters'}
                  </Text>
                </View>
              }
            />
          )}
        </>
      ) : (
        <View style={styles.emptyContainer}>
          <ShoppingBag size={48} color={theme.colors.textTertiary} />
          <Text
            style={[styles.emptyText, { color: theme.colors.textSecondary }]}
          >
            Orders Management
          </Text>
          <Text
            style={[styles.emptySubtext, { color: theme.colors.textTertiary }]}
          >
            Orders functionality coming soon...
          </Text>
        </View>
      )}

      {/* Pagination removed since we're filtering locally */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  headerSubtitle: {
    fontSize: 14,
    fontWeight: '400',
    marginTop: 2,
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    gap: 8,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: 'currentColor',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
  },
  filtersContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  filterButton: {
    padding: 8,
    borderRadius: 8,
  },
  roleFilters: {
    marginTop: 12,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  roleButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 8,
  },
  listContainer: {
    padding: 16,
  },
  userCard: {
    marginBottom: 12,
    position: 'relative',
  },
  userCardContent: {
    paddingRight: '40%', // Leave space for the letter indicator
    zIndex: 1,
  },
  roleLetterContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: '35%',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    opacity: 0.4,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  roleLetter: {
    fontSize: 120,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  userHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  userDetails: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    flex: 1,
  },
  paginationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  pageInfo: {
    alignItems: 'center',
  },
  pageText: {
    fontSize: 14,
    fontWeight: '500',
  },
  totalText: {
    fontSize: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '500',
    marginTop: 12,
  },
  emptySubtext: {
    fontSize: 14,
    marginTop: 4,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
});

export default UsersList;

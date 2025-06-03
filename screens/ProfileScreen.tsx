import React from 'react';
import { View, ScrollView, StyleSheet, Switch } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Text, TouchableOpacity } from '../components/styled';
import { useAuthStore, useSettingsStore } from '../store';
import { auth } from '../services/api';

interface SettingItemProps {
  icon: keyof typeof MaterialIcons.glyphMap;
  label: string;
  onPress?: () => void;
  value?: boolean;
  onValueChange?: (value: boolean) => void;
  showArrow?: boolean;
}

const SettingItem = ({ 
  icon, 
  label, 
  onPress, 
  value, 
  onValueChange, 
  showArrow = true 
}: SettingItemProps) => (
  <TouchableOpacity 
    style={styles.settingItem}
    onPress={onPress}
    disabled={!onPress}
  >
    <View style={styles.settingItemLeft}>
      <MaterialIcons name={icon} size={24} color="#4B5563" />
      <Text style={styles.settingLabel}>{label}</Text>
    </View>
    {onValueChange ? (
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: '#D1D5DB', true: '#93C5FD' }}
        thumbColor={value ? '#3B82F6' : '#fff'}
      />
    ) : showArrow ? (
      <MaterialIcons name="chevron-right" size={24} color="#9CA3AF" />
    ) : null}
  </TouchableOpacity>
);

export const ProfileScreen = ({ navigation }: any) => {
  const { user, token, logout } = useAuthStore();
  const { toggleDarkMode, darkMode, notificationsEnabled, setNotificationsEnabled } = useSettingsStore();

  const handleLogout = async () => {
    try {
      await auth.logout();
      logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleNotificationToggle = (value: boolean) => {
    setNotificationsEnabled(value);
  };

  const handleDarkModeToggle = (value: boolean) => {
    toggleDarkMode();
  };

  if (!token) {
    return (
      <View style={[styles.container, styles.guestContainer]}>
        <Text style={styles.guestTitle}>Welcome to ProConnect</Text>
        <Text style={styles.guestSubtitle}>Sign in to access your profile and bookings</Text>
        <TouchableOpacity 
          style={styles.authButton}
          onPress={() => navigation.navigate('Auth', { screen: 'Login' })}
        >
          <Text style={styles.authButtonText}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.authButton, styles.registerButton]}
          onPress={() => navigation.navigate('Auth', { screen: 'Register' })}
        >
          <Text style={[styles.authButtonText, styles.registerButtonText]}>Create Account</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar} />
          <TouchableOpacity style={styles.editAvatarButton}>
            <MaterialIcons name="edit" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={styles.name}>{user?.name || 'User'}</Text>
        <Text style={styles.email}>{user?.email || ''}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Settings</Text>
        <View style={styles.sectionContent}>
          <SettingItem
            icon="person-outline"
            label="Edit Profile"
            onPress={() => navigation.navigate('EditProfile')}
          />
          <SettingItem
            icon="notifications-none"
            label="Notifications"
            value={notificationsEnabled}
            onValueChange={handleNotificationToggle}
            showArrow={false}
          />
          <SettingItem
            icon="payment"
            label="Payment Methods"
            onPress={() => console.log('Payment Methods')}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App Settings</Text>
        <View style={styles.sectionContent}>
          <SettingItem
            icon="dark-mode"
            label="Dark Mode"
            value={darkMode}
            onValueChange={handleDarkModeToggle}
            showArrow={false}
          />
          <SettingItem
            icon="language"
            label="Language"
            onPress={() => console.log('Language')}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>
        <View style={styles.sectionContent}>
          <SettingItem
            icon="help-outline"
            label="Help Center"
            onPress={() => console.log('Help Center')}
          />
          <SettingItem
            icon="chat-bubble-outline"
            label="Contact Us"
            onPress={() => console.log('Contact Us')}
          />
          <SettingItem
            icon="description"
            label="Terms of Service"
            onPress={() => console.log('Terms of Service')}
          />
          <SettingItem
            icon="privacy-tip"
            label="Privacy Policy"
            onPress={() => console.log('Privacy Policy')}
          />
        </View>
      </View>

      <TouchableOpacity 
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <MaterialIcons name="logout" size={24} color="#EF4444" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  guestContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  guestTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#111827',
  },
  guestSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 30,
  },
  authButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: '100%',
    marginBottom: 12,
    alignItems: 'center',
  },
  authButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  registerButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#3B82F6',
  },
  registerButtonText: {
    color: '#3B82F6',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E5E7EB',
  },
  editAvatarButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#3B82F6',
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: '#6B7280',
  },
  section: {
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 16,
  },
  sectionContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: 16,
    color: '#111827',
    marginLeft: 12,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    marginTop: 24,
    marginBottom: 32,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#EF4444',
    marginLeft: 8,
  },
});

import React from 'react';
import { View, ScrollView, StyleSheet, Switch } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Text, TouchableOpacity } from '../components/styled';

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

export const ProfileScreen = () => {
  const handleLogout = () => {
    // TODO: Implement logout logic
    console.log('Logout');
  };

  const handleNotificationToggle = (value: boolean) => {
    // TODO: Update notification preferences
    console.log('Notifications:', value);
  };

  const handleDarkModeToggle = (value: boolean) => {
    // TODO: Update theme preferences
    console.log('Dark mode:', value);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar} />
          <TouchableOpacity style={styles.editAvatarButton}>
            <MaterialIcons name="edit" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.email}>john.doe@example.com</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Settings</Text>
        <View style={styles.sectionContent}>
          <SettingItem
            icon="person-outline"
            label="Edit Profile"
            onPress={() => console.log('Edit Profile')}
          />
          <SettingItem
            icon="notifications-none"
            label="Notifications"
            value={true}
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
            value={false}
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

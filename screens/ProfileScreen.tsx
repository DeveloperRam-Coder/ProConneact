import React from 'react';
import { View, Text, TouchableOpacity, Switch, ScrollView, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export const ProfileScreen = () => {
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
  };

  const [darkMode, setDarkMode] = React.useState(false);
  const [notifications, setNotifications] = React.useState(true);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
        <View style={styles.avatar}>
          <MaterialIcons name="person" size={48} color="white" />
        </View>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.contactInfo}>{user.email}</Text>
        <Text style={styles.contactInfo}>{user.phone}</Text>
      </View>

      <TouchableOpacity style={styles.row}>
        <Text style={styles.rowText}>Edit Profile</Text>
        <MaterialIcons name="chevron-right" size={24} color="gray" />
      </TouchableOpacity>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>

        <View style={styles.preferenceRow}>
          <Text>Dark Mode</Text>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={darkMode ? '#1E88E5' : '#f4f3f4'}
          />
        </View>

        <View style={styles.preferenceRow}>
          <Text>Notifications</Text>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={notifications ? '#1E88E5' : '#f4f3f4'}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.section}>
        <Text style={styles.rowText}>Help & Support</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.section}>
        <Text style={styles.rowText}>Terms & Conditions</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // bg-white
    padding: 16, // p-4
  },
  profileHeader: {
    alignItems: 'center', // items-center
    marginBottom: 24, // mb-6
  },
  avatar: {
    width: 96, // w-24
    height: 96, // h-24
    borderRadius: 48, // rounded-full
    backgroundColor: '#3B82F6', // primary color (blue)
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16, // mb-4
  },
  name: {
    fontSize: 20, // text-xl
    fontWeight: '700', // font-bold
  },
  contactInfo: {
    color: '#4B5563', // gray-600
  },
  row: {
    flexDirection: 'row', // flex-row
    alignItems: 'center', // items-center
    justifyContent: 'space-between', // justify-between
    paddingVertical: 16, // p-4 vertical
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB', // gray-200
  },
  rowText: {
    fontSize: 18, // text-lg
  },
  section: {
    paddingVertical: 16, // p-4 vertical
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB', // gray-200
  },
  sectionTitle: {
    fontSize: 18, // text-lg
    fontWeight: '600', // font-semibold
    marginBottom: 16, // mb-4
  },
  preferenceRow: {
    flexDirection: 'row', // flex-row
    justifyContent: 'space-between', // justify-between
    alignItems: 'center', // items-center
    marginBottom: 16, // mb-4
  },
  logoutButton: {
    paddingVertical: 16, // p-4 vertical
  },
  logoutText: {
    fontSize: 18, // text-lg
    color: '#EF4444', // red-500
  },
});

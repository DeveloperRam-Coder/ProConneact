import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

type Booking = {
  id: string;
  professional: string;
  service: string;
  date: string;
  time: string;
  status: 'upcoming' | 'past';
};

export const BookingsScreen = () => {
  const bookings: Booking[] = [
    { id: '1', professional: 'John Barber', service: 'Haircut', date: '2024-03-15', time: '10:00 AM', status: 'upcoming' },
    { id: '2', professional: 'Dr. Smith', service: 'Checkup', date: '2024-02-28', time: '2:30 PM', status: 'past' },
    { id: '3', professional: 'Fitness Coach', service: 'PT Session', date: '2024-03-10', time: '8:00 AM', status: 'upcoming' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity style={[styles.tab, styles.activeTab]}>
          <Text style={[styles.tabText, styles.activeTabText]}>Upcoming</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={[styles.tabText, styles.inactiveTabText]}>Past</Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        {bookings.map((booking) => (
          <View key={booking.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.professionalName}>{booking.professional}</Text>
              <Text style={styles.dateTime}>{booking.date} • {booking.time}</Text>
            </View>
            <Text style={styles.service}>{booking.service}</Text>

            {booking.status === 'upcoming' ? (
              <TouchableOpacity style={styles.rescheduleButton}>
                <Text style={styles.rescheduleButtonText}>Reschedule</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.reviewButton}>
                <Text style={styles.reviewButtonText}>Leave Review</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // bg-white
    padding: 16, // p-4
  },
  tabContainer: {
    flexDirection: 'row', // flex-row
    marginBottom: 16, // mb-4
  },
  tab: {
    flex: 1, // flex-1
    alignItems: 'center',
    paddingVertical: 8, // py-2
    borderBottomWidth: 2,
    borderBottomColor: '#E5E7EB', // gray-200 for inactive border
  },
  activeTab: {
    borderBottomColor: '#3B82F6', // primary blue border
  },
  tabText: {
    fontWeight: '600', // font-semibold
    fontSize: 16,
  },
  activeTabText: {
    color: '#3B82F6', // primary blue text
  },
  inactiveTabText: {
    color: '#6B7280', // gray-500 text
  },
  card: {
    marginBottom: 16, // mb-4
    padding: 16, // p-4
    borderWidth: 1,
    borderColor: '#E5E7EB', // gray-200
    borderRadius: 8, // rounded-lg
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8, // mb-2
  },
  professionalName: {
    fontSize: 18, // text-lg
    fontWeight: '600', // font-semibold
  },
  dateTime: {
    color: '#6B7280', // gray-500
  },
  service: {
    color: '#4B5563', // gray-600
    marginBottom: 8, // mb-2
  },
  rescheduleButton: {
    backgroundColor: '#3B82F6', // primary
    paddingVertical: 8, // py-2
    paddingHorizontal: 16, // px-4
    borderRadius: 6, // rounded-md
    alignSelf: 'flex-start', // self-start
  },
  rescheduleButtonText: {
    color: '#fff', // white
    fontWeight: '500', // font-medium
  },
  reviewButton: {
    backgroundColor: '#E0E7FF', // secondary light blue (example)
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  reviewButtonText: {
    color: '#3B82F6', // primary blue
    fontWeight: '500',
  },
});

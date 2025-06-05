import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Text, TouchableOpacity } from '../components/styled';
// Define Booking type here if not exported from '../types'
export interface Booking {
  id: string;
  professionalId: string;
  userId: string;
  service: string;
  date: string;
  time: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  price: number;
}
// import { Booking } from '../types';

type BookingStatus = 'upcoming' | 'past' | 'cancelled';

interface BookingCardProps {
  booking: Booking;
  onCancel: (booking: Booking) => void;
  onReschedule: (booking: Booking) => void;
}

const BookingCard = ({ booking, onCancel, onReschedule }: BookingCardProps) => (
  <View style={styles.bookingCard}>
    <View style={styles.bookingHeader}>
      <Text style={styles.professionalName}>{booking.service}</Text>
      <View style={[
        styles.statusBadge,
        booking.status === 'confirmed' ? styles.statusConfirmed :
        booking.status === 'cancelled' ? styles.statusCancelled :
        styles.statusPending
      ]}>
        <Text style={styles.statusText}>{booking.status}</Text>
      </View>
    </View>

    <View style={styles.bookingDetails}>
      <View style={styles.detailRow}>
        <MaterialIcons name="event" size={20} color="#6B7280" />
        <Text style={styles.detailText}>{booking.date}</Text>
      </View>
      <View style={styles.detailRow}>
        <MaterialIcons name="schedule" size={20} color="#6B7280" />
        <Text style={styles.detailText}>{booking.time}</Text>
      </View>
      <View style={styles.detailRow}>
        <MaterialIcons name="attach-money" size={20} color="#6B7280" />
        <Text style={styles.detailText}>${booking.price}</Text>
      </View>
    </View>

    <View style={styles.bookingActions}>
      {booking.status === 'confirmed' && (
        <>
          <TouchableOpacity 
            style={[styles.actionButton, styles.rescheduleButton]}
            onPress={() => onReschedule(booking)}
          >
            <Text style={styles.actionButtonText}>Reschedule</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.actionButton, styles.cancelButton]}
            onPress={() => onCancel(booking)}
          >
            <Text style={[styles.actionButtonText, styles.cancelButtonText]}>Cancel</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  </View>
);

export const BookingsScreen = () => {
  const [selectedTab, setSelectedTab] = useState<BookingStatus>('upcoming');
  
  // Mock data - in real app, this would come from an API
  const bookings: Booking[] = [
    {
      id: '1',
      professionalId: '1',
      userId: 'user1',
      service: 'Haircut & Styling',
      date: '2024-05-30',
      time: '10:00 AM',
      status: 'confirmed',
      price: 30,
    },
    // Add more bookings
  ];

  const handleCancel = (booking: Booking) => {
    // TODO: Implement cancel booking logic
    console.log('Cancel booking:', booking.id);
  };

  const handleReschedule = (booking: Booking) => {
    // TODO: Implement reschedule booking logic
    console.log('Reschedule booking:', booking.id);
  };

  const filteredBookings = bookings.filter(booking => {
    if (selectedTab === 'upcoming') {
      return ['confirmed', 'pending'].includes(booking.status);
    } else if (selectedTab === 'past') {
      return booking.status === 'completed';
    } else {
      return booking.status === 'cancelled';
    }
  });

  const tabs: { id: BookingStatus; label: string }[] = [
    { id: 'upcoming', label: 'Upcoming' },
    { id: 'past', label: 'Past' },
    { id: 'cancelled', label: 'Cancelled' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.tabs}>
        {tabs.map(tab => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tab,
              selectedTab === tab.id && styles.selectedTab
            ]}
            onPress={() => setSelectedTab(tab.id)}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === tab.id && styles.selectedTabText
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredBookings}
        renderItem={({ item }) => (
          <BookingCard
            booking={item}
            onCancel={handleCancel}
            onReschedule={handleReschedule}
          />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.bookingsList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
  },
  selectedTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#3B82F6',
  },
  tabText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  selectedTabText: {
    color: '#3B82F6',
  },
  bookingsList: {
    padding: 16,
  },
  bookingCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  professionalName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusConfirmed: {
    backgroundColor: '#DEF7EC',
  },
  statusCancelled: {
    backgroundColor: '#FDE8E8',
  },
  statusPending: {
    backgroundColor: '#FEF3C7',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  bookingDetails: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#4B5563',
  },
  bookingActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  actionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  rescheduleButton: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  cancelButton: {
    backgroundColor: '#fff',
    borderColor: '#EF4444',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
  },
  cancelButtonText: {
    color: '#EF4444',
  },
});

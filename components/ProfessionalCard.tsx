import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

type ProfessionalProps = {
  professional: {
    id: string;
    name: string;
    rating: number;
    specialty: string;
  };
};

export const ProfessionalCard = ({ professional }: ProfessionalProps) => {
  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.name}>{professional.name}</Text>
        <View style={styles.ratingContainer}>
          <MaterialIcons name="star" size={16} color="#FFD700" />
          <Text style={styles.ratingText}>{professional.rating}</Text>
        </View>
      </View>
      <Text style={styles.specialty}>{professional.specialty}</Text>
      <TouchableOpacity style={styles.bookButton}>
        <Text style={styles.bookButtonText}>Book Now</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16, // mb-4
    padding: 16, // p-4
    borderWidth: 1,
    borderColor: '#E5E7EB', // Tailwind's gray-200
    borderRadius: 8, // rounded-lg
  },
  header: {
    flexDirection: 'row', // flex-row
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8, // mb-2
  },
  name: {
    fontSize: 18, // text-lg
    fontWeight: '600', // font-semibold
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4, // ml-1
  },
  specialty: {
    color: '#4B5563', // text-gray-600
    marginBottom: 8, // mb-2
  },
  bookButton: {
    backgroundColor: '#3B82F6', // bg-primary (example blue)
    paddingVertical: 8, // py-2
    paddingHorizontal: 16, // px-4
    borderRadius: 6, // rounded-md
    alignSelf: 'flex-start', // self-start
  },
  bookButtonText: {
    color: '#fff', // text-white
    fontWeight: '500', // font-medium
  },
});

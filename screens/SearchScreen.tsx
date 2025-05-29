import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ProfessionalCard } from '../components/ProfessionalCard';

export const SearchScreen = () => {
  const professionals = [
    { id: '1', name: 'John Barber', rating: 4.9, specialty: 'Haircuts', price: '$30', distance: '0.5 mi' },
    { id: '2', name: 'Dr. Smith', rating: 4.8, specialty: 'General Medicine', price: '$100', distance: '1.2 mi' },
    { id: '3', name: 'Math Tutor', rating: 4.7, specialty: 'Algebra', price: '$50', distance: '0.8 mi' },
    { id: '4', name: 'Fitness Coach', rating: 4.6, specialty: 'Weight Loss', price: '$70', distance: '1.5 mi' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <MaterialIcons name="search" size={24} color="gray" />
        <TextInput
          placeholder="Search for professionals"
          style={styles.searchInput}
        />
        <TouchableOpacity>
          <MaterialIcons name="mic" size={24} color="#1E88E5" />
        </TouchableOpacity>
      </View>

      <View style={styles.filterRow}>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Specialty</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Distance</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Price</Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        {professionals.map((professional) => (
          <ProfessionalCard key={professional.id} professional={professional} />
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
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16, // mb-4
    backgroundColor: '#F3F4F6', // gray-100
    borderRadius: 12, // rounded-lg
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  filterRow: {
    flexDirection: 'row',
    marginBottom: 16, // mb-4
  },
  filterButton: {
    marginRight: 8, // mr-2
    paddingVertical: 4, // py-1
    paddingHorizontal: 12, // px-3
    backgroundColor: '#A78BFA', // bg-secondary (e.g., purple-400)
    borderRadius: 9999, // rounded-full
  },
  filterText: {
    color: '#2563EB', // text-primary (blue-600)
  },
});

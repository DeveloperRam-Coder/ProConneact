import React, { useState } from 'react';
import { View, TextInput, FlatList, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Text, TouchableOpacity } from '../components/styled';
import { ProfessionalCard } from '../components/ProfessionalCard';
import { Professional } from '../types';

export const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const filters = [
    { id: 'rating', label: 'Top Rated' },
    { id: 'price_low', label: 'Price: Low to High' },
    { id: 'price_high', label: 'Price: High to Low' },
    { id: 'availability', label: 'Available Today' },
  ];

  // Mock data - in real app, this would come from an API
  const professionals: Professional[] = [
    {
      id: '1',
      name: 'John Barber',
      profession: 'Professional Barber',
      rating: 4.9,
      reviews: 127,
      price: 30,
      avatar: 'https://example.com/avatar1.jpg',
      description: 'Experienced barber specializing in modern and classic cuts',
      specialties: ['Fades', 'Beard Trimming', 'Hot Towel Shave'],
      availability: {
        'Monday': ['9:00', '10:00', '11:00'],
        'Tuesday': ['9:00', '10:00', '11:00'],
      }
    },
  ];

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    // TODO: Implement search logic with API integration
  };

  const handleFilter = (filterId: string) => {
    setSelectedFilter(selectedFilter === filterId ? null : filterId);
    // TODO: Implement filter logic with API integration
  };

  const handleProfessionalPress = (professional: Professional) => {
    // TODO: Navigate to professional detail screen
    console.log('Navigate to professional:', professional.id);
  };

  const handleBookPress = (professional: Professional) => {
    // TODO: Navigate to booking screen
    console.log('Navigate to booking:', professional.id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={24} color="#6B7280" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search professionals..."
          value={searchQuery}
          onChangeText={handleSearch}
          placeholderTextColor="#6B7280"
        />
      </View>

      <FlatList
        horizontal
        data={filters}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filtersContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.filterButton,
              selectedFilter === item.id && styles.filterButtonSelected
            ]}
            onPress={() => handleFilter(item.id)}
          >
            <Text
              style={[
                styles.filterText,
                selectedFilter === item.id && styles.filterTextSelected
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />

      <FlatList
        data={professionals}
        renderItem={({ item }) => (
          <ProfessionalCard
            professional={item}
            onPress={handleProfessionalPress}
            onBook={handleBookPress}
          />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.resultsContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    height: 48,
    marginLeft: 12,
    fontSize: 16,
    color: '#111827',
  },
  filtersContainer: {
    paddingBottom: 16,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    marginRight: 8,
  },
  filterButtonSelected: {
    backgroundColor: '#3B82F6',
  },
  filterText: {
    fontSize: 14,
    color: '#4B5563',
  },
  filterTextSelected: {
    color: '#FFFFFF',
  },
  resultsContainer: {
    paddingBottom: 16,
  },
});

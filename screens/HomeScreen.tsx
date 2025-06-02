import React, { useState } from 'react';
import { View, ScrollView, FlatList, StyleSheet } from 'react-native';
import { CategoryButton } from '../components/CategoryButton';
import { ProfessionalCard } from '../components/ProfessionalCard';
import { Text } from '../components/styled';
import { Category, Professional } from '../types';

export const HomeScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories: Category[] = [
    { id: '1', name: 'Barber', icon: 'content-cut' },
    { id: '2', name: 'Tutor', icon: 'school' },
    { id: '3', name: 'Doctor', icon: 'medical-services' },
    { id: '4', name: 'Trainer', icon: 'fitness-center' },
  ];

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
    {
      id: '2',
      name: 'Dr. Sarah Smith',
      profession: 'General Physician',
      rating: 4.8,
      reviews: 243,
      price: 100,
      avatar: 'https://example.com/avatar2.jpg',
      description: 'Board-certified physician with 15 years of experience',
      specialties: ['General Medicine', 'Preventive Care', 'Family Medicine'],
      availability: {
        'Monday': ['9:00', '10:00', '11:00'],
        'Wednesday': ['13:00', '14:00', '15:00'],
      }
    }
  ];

  const handleCategoryPress = (category: Category) => {
    setSelectedCategory(selectedCategory === category.id ? null : category.id);
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
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, User!</Text>
          <Text style={styles.subGreeting}>Find the perfect professional</Text>
        </View>
        <View style={styles.avatarPlaceholder} />
      </View>

      <Text style={styles.sectionTitle}>Categories</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
        contentContainerStyle={styles.categoriesContent}
      >
        {categories.map((category) => (
          <CategoryButton
            key={category.id}
            category={category}
            onPress={handleCategoryPress}
            isSelected={selectedCategory === category.id}
          />
        ))}
      </ScrollView>

      <View style={styles.professionalsHeader}>
        <Text style={styles.sectionTitle}>Top-Rated Pros</Text>
        <Text style={styles.seeAll}>See All</Text>
      </View>
      
      <FlatList
        data={professionals}
        renderItem={({ item }) => (
          <ProfessionalCard
            professional={item}
            onPress={handleProfessionalPress}
            onBook={handleBookPress}
          />
        )}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        contentContainerStyle={styles.professionalsContent}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  subGreeting: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 4,
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e5e7eb',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  categoriesContainer: {
    marginBottom: 24,
  },
  categoriesContent: {
    paddingRight: 16,
  },
  professionalsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  seeAll: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '500',
  },
  professionalsContent: {
    paddingBottom: 16,
  },
});

import React, { useState, useEffect } from 'react';
import { View, ScrollView, FlatList, StyleSheet } from 'react-native';
import { CategoryButton } from '../components/CategoryButton';
import { ProfessionalCard } from '../components/ProfessionalCard';
import { Text } from '../components/styled';
import { Category, Professional } from '../types';
import { useNavigation } from '@react-navigation/native';
import professionalData from '../data/professionals.json';

export const HomeScreen = () => {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredProfessionals, setFilteredProfessionals] = useState<Professional[]>([]);

  const categories: Category[] = [
    { id: '1', name: 'Barber', icon: 'content-cut' },
    { id: '2', name: 'Tutor', icon: 'school' },
    { id: '3', name: 'Doctor', icon: 'medical-services' },
    { id: '4', name: 'Trainer', icon: 'fitness-center' },
  ];

  // Filter professionals based on selected category
  useEffect(() => {
    if (selectedCategory) {
      const filtered = professionalData.professionals.filter(
        (prof) => prof.categoryId === selectedCategory
      );
      setFilteredProfessionals(filtered);
    } else {
      setFilteredProfessionals(professionalData.professionals);
    }
  }, [selectedCategory]);

  const handleCategoryPress = (category: Category) => {
    setSelectedCategory(selectedCategory === category.id ? null : category.id);
    navigation.navigate(category.name as never);
  };

  const handleProfessionalPress = (professional: Professional) => {
    navigation.navigate('ProfessionalDetail', { professional });
  };

  const handleBookPress = (professional: Professional) => {
    navigation.navigate('Booking', { professional });
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
        data={filteredProfessionals}
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

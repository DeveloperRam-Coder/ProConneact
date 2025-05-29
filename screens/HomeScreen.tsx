import React from 'react';
import { View, Text, ScrollView, FlatList, StyleSheet } from 'react-native';
import { CategoryButton } from '../components/CategoryButton';
import { ProfessionalCard } from '../components/ProfessionalCard';

export const HomeScreen = () => {
  const categories = [
    { id: '1', name: 'Barber', icon: 'content-cut' },
    { id: '2', name: 'Tutor', icon: 'school' },
    { id: '3', name: 'Doctor', icon: 'medical-services' },
    { id: '4', name: 'Trainer', icon: 'fitness-center' },
  ];

  const professionals = [
    { id: '1', name: 'John Barber', rating: 4.9, specialty: 'Haircuts' },
    { id: '2', name: 'Dr. Smith', rating: 4.8, specialty: 'General Medicine' },
    { id: '3', name: 'Math Tutor', rating: 4.7, specialty: 'Algebra' },
    { id: '4', name: 'Fitness Coach', rating: 4.6, specialty: 'Weight Loss' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello, User!</Text>
        <View style={styles.avatarPlaceholder} />
      </View>

      <Text style={styles.sectionTitle}>Categories</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
        contentContainerStyle={{ paddingRight: 16 }}
      >
        {categories.map((category) => (
          <CategoryButton key={category.id} category={category} />
        ))}
      </ScrollView>

      <Text style={styles.sectionTitle}>Top-Rated Pros</Text>
      <FlatList
        data={professionals}
        renderItem={({ item }) => <ProfessionalCard professional={item} />}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // bg-white
    padding: 16, // p-4
  },
  header: {
    flexDirection: 'row', // flex-row
    justifyContent: 'space-between', // justify-between
    alignItems: 'center', // items-center
    marginBottom: 24, // mb-6
  },
  greeting: {
    fontSize: 24, // text-2xl
    fontWeight: '700', // font-bold
  },
  avatarPlaceholder: {
    width: 40, // w-10
    height: 40, // h-10
    borderRadius: 20, // rounded-full
    backgroundColor: '#3B82F6', // primary color (blue)
  },
  sectionTitle: {
    fontSize: 18, // text-lg
    fontWeight: '600', // font-semibold
    marginBottom: 16, // mb-4
  },
  categoriesContainer: {
    marginBottom: 24, // mb-6
  },
});

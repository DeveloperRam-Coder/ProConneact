import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { TouchableOpacity, Text } from './styled';
import { Professional } from '../types';

interface ProfessionalCardProps {
  professional: Professional;
  onPress: (professional: Professional) => void;
  onBook: (professional: Professional) => void;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  flexRow: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 64, height: 64, borderRadius: 32, marginRight: 16 },
  container: { flex: 1 },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
});

export const ProfessionalCard: React.FC<ProfessionalCardProps> = ({
  professional,
  onPress,
  onBook,
}) => (
  <TouchableOpacity style={styles.card} onPress={() => onPress(professional)}>
    <View style={styles.flexRow}>
      <Image
        source={{ uri: professional.avatar }}
        style={styles.avatar}
        contentFit="cover"
        transition={200}
      />
      <View style={styles.container}>
        <Text style={styles.name}>{professional.name}</Text>
        <Text>{professional.profession}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MaterialIcons name="star" size={16} color="#FFD700" />
          <Text>
            {professional.rating} ({professional.reviews} reviews)
          </Text>
        </View>
      </View>
    </View>
    <View>
      <Text numberOfLines={2}>{professional.description}</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginVertical: 8 }}>
        {professional.specialties.map((specialty, index) => (
          <View key={index} style={{ backgroundColor: '#F3F4F6', padding: 4, borderRadius: 4 }}>
            <Text>{specialty}</Text>
          </View>
        ))}
      </View>
      <TouchableOpacity 
        onPress={() => onBook(professional)}
        style={{ backgroundColor: '#3B82F6', padding: 12, borderRadius: 8, alignItems: 'center' }}
      >
        <Text style={{ color: '#ffffff', fontWeight: '600' }}>
          Book Now - ${professional.price}/hr
        </Text>
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
);

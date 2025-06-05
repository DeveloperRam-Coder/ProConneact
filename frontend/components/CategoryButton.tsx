import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import { Category } from '../types';
import { TouchableOpacity, Text } from './styled';

interface CategoryButtonProps {
  category: Category;
  onPress: (category: Category) => void;
  isSelected?: boolean;
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginRight: 16,
  },
  button: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  buttonSelected: {
    backgroundColor: '#3B82F6',
  },
  buttonUnselected: {
    backgroundColor: '#F3F4F6',
  },
  text: {
    fontSize: 14,
  },
  textSelected: {
    color: '#1E88E5',
    fontWeight: '500',
  },
  textUnselected: {
    color: '#757575',
    fontWeight: '400',
  }
});

export const CategoryButton: React.FC<CategoryButtonProps> = ({ 
  category, 
  onPress, 
  isSelected = false 
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        { opacity: isSelected ? 1 : 0.7 }
      ]}
      onPress={() => onPress(category)}
    >
      <TouchableOpacity
        style={[
          styles.button,
          isSelected ? styles.buttonSelected : styles.buttonUnselected
        ]}
      >
        <MaterialIcons 
          name={category.icon as keyof typeof MaterialIcons['glyphMap']}
          size={24} 
          color={isSelected ? '#ffffff' : '#1E88E5'} 
        />
      </TouchableOpacity>
      <Text
        style={[
          styles.text,
          isSelected ? styles.textSelected : styles.textUnselected
        ]}
      >
        {category.name}
      </Text>
    </TouchableOpacity>
  );
};

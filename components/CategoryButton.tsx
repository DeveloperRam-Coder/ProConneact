import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

type CategoryProps = {
  category: {
    id: string;
    name: string;
    icon: string;
  };
};

export const CategoryButton = ({ category }: CategoryProps) => {
  return (
    <TouchableOpacity style={styles.button}>
      <View style={styles.iconWrapper}>
        <MaterialIcons name={category.icon} size={24} color="#1E88E5" />
      </View>
      <Text style={styles.text}>{category.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginRight: 16,
    alignItems: 'center',
  },
  iconWrapper: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#E3F2FD',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
});

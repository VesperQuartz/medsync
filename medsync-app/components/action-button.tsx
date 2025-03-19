import { Plus } from 'lucide-react-native';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';

import Colors from '~/constants/colors';

interface FloatingActionButtonProps {
  onPress: () => void;
  label?: string;
}

export const FloatingActionButton = ({ onPress, label }: FloatingActionButtonProps) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Plus size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.light.actionButton,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    color: Colors.light.actionButton,
    marginRight: 8,
    fontWeight: '600',
    backgroundColor: Colors.light.background,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});

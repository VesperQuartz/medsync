import { MoreHorizontal } from 'lucide-react-native';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import Colors from '~/constants/colors';

interface HealthMetricCardProps {
  title: string;
  value: string;
  status?: string;
}

export const HealthMetricCard = ({ title, value, status }: HealthMetricCardProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.value}>
            {value} {status && <Text style={styles.status}>{status}</Text>}
          </Text>
        </View>
        <TouchableOpacity>
          <MoreHorizontal size={20} color={Colors.light.tint} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.light.cardBg,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.light.cardBorder,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
    color: Colors.light.subtleText,
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
  },
  status: {
    fontSize: 14,
    color: Colors.light.subtleText,
  },
});

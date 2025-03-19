import { StyleSheet, Text, View } from 'react-native';

import Colors from '~/constants/colors';

interface StatusBadgeProps {
  status: string;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const getStatusText = () => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'inprogress':
        return 'In Progress';
      case 'done':
        return 'Done';
      default:
        return status;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'pending':
        return Colors.pending;
      case 'inprogress':
        return Colors.inProgress;
      case 'done':
        return Colors.done;
      default:
        return Colors.textLight;
    }
  };

  return (
    <View style={[styles.badge, { backgroundColor: `${getStatusColor()}20` }]}>
      <Text style={[styles.text, { color: getStatusColor() }]}>{getStatusText()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 12,
    fontWeight: '500',
  },
});

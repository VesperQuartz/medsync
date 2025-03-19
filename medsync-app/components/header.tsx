import { Bell, User, Menu } from 'lucide-react-native';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import Colors from '~/constants/colors';

interface HeaderProps {
  title: string;
  onMenuPress?: () => void;
  onNotificationPress?: () => void;
  onProfilePress?: () => void;
}

export const Header = ({
  title,
  onMenuPress,
  onNotificationPress,
  onProfilePress,
}: HeaderProps) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onMenuPress} style={styles.iconButton}>
        <Menu size={24} color={Colors.light.text} />
      </TouchableOpacity>

      <Text style={styles.title}>{title}</Text>

      <View style={styles.rightIcons}>
        <TouchableOpacity onPress={onNotificationPress} style={styles.iconButton}>
          <Bell size={24} color={Colors.light.text} />
        </TouchableOpacity>

        <TouchableOpacity onPress={onProfilePress} style={styles.iconButton}>
          <User size={24} color={Colors.light.text} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: Colors.light.background,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.text,
  },
  rightIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    padding: 8,
  },
});

import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

import Colors from '~/constants/colors';

interface TabBarProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  scrollable?: boolean;
}

export const TabBar = ({ tabs, activeTab, onTabChange, scrollable = false }: TabBarProps) => {
  const Container = scrollable ? ScrollView : View;
  const containerProps = scrollable
    ? {
        horizontal: true,
        showsHorizontalScrollIndicator: false,
        contentContainerStyle: styles.scrollableContainer,
      }
    : {};

  return (
    <Container style={styles.container} {...containerProps}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab}
          style={[styles.tab, activeTab === tab && styles.activeTab]}
          onPress={() => onTabChange(tab)}>
          <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
          {activeTab === tab && <View style={styles.indicator} />}
        </TouchableOpacity>
      ))}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.divider,
    marginBottom: 16,
  },
  scrollableContainer: {
    paddingRight: 16,
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    position: 'relative',
  },
  activeTab: {
    backgroundColor: 'transparent',
  },
  tabText: {
    fontSize: 14,
    color: Colors.light.subtleText,
    fontWeight: '500',
  },
  activeTabText: {
    color: Colors.light.text,
    fontWeight: '600',
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    left: 16,
    right: 16,
    height: 2,
    backgroundColor: Colors.light.tint,
    borderRadius: 1,
  },
});

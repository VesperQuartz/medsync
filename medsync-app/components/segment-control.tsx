import { StyleSheet, Text, View, Pressable } from 'react-native';

import Colors from '~/constants/colors';

interface SegmentedControlProps {
  segments: string[];
  selectedIndex: number;
  onChange: (index: number) => void;
}

export default function SegmentedControl({
  segments,
  selectedIndex,
  onChange,
}: SegmentedControlProps) {
  return (
    <View style={styles.container}>
      {segments.map((segment, index) => (
        <Pressable
          key={index}
          style={[styles.segment, selectedIndex === index && styles.selectedSegment]}
          onPress={() => onChange(index)}>
          <Text style={[styles.segmentText, selectedIndex === index && styles.selectedSegmentText]}>
            {segment}
          </Text>
          {selectedIndex === index && <View style={styles.indicator} />}
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  segment: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    position: 'relative',
  },
  selectedSegment: {
    backgroundColor: Colors.background,
  },
  segmentText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.textLight,
  },
  selectedSegmentText: {
    color: Colors.primary,
    fontWeight: '600',
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: Colors.primary,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
});

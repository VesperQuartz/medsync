import { Stack } from 'expo-router';
import {
  Search,
  ChevronDown,
  ChevronUp,
  FileText,
  Pill,
} from 'lucide-react-native';
import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';

import { NameText, SpecialityText } from '~/components/name';
import Colors from '~/constants/colors';
import { useGetUserMedicalRecords } from '~/hooks/api';
import { useUserStore } from '~/store';

const ResultScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedRecord, setExpandedRecord] = useState<string | null>(null);

  const toggleRecordExpansion = (recordId: string) => {
    if (expandedRecord === recordId) {
      setExpandedRecord(null);
    } else {
      setExpandedRecord(recordId);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  const user = useUserStore();
  const record = useGetUserMedicalRecords(user.user?.id);

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Medical Result</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color={Colors.light.subtleText} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search result..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>
      {record.data?.length === 0 && (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: Colors.light.subtleText }}>
            No records found
          </Text>
        </View>
      )}
      <ScrollView
        style={styles.recordsList}
        contentContainerStyle={styles.recordsListContent}>
        {record.data?.map(rec => (
          <View key={rec.id} style={styles.recordCard}>
            <TouchableOpacity
              style={styles.recordHeader}
              onPress={() => toggleRecordExpansion(rec.id.toString())}>
              <View style={styles.doctorInfo}>
                <View style={styles.iconContainer}>
                  <FileText size={20} color={Colors.light.tint} />
                </View>
                <View style={styles.doctorDetails}>
                  <NameText id={rec.doctorId} className="" />
                  <Text style={styles.recordDate}>
                    {formatDate(rec.createdAt)}
                  </Text>
                </View>
              </View>
              <View style={styles.specialtyContainer}>
                <SpecialityText id={rec.doctorId} className="" />
                {expandedRecord === rec.id.toString() ? (
                  <ChevronUp size={20} color={Colors.light.tint} />
                ) : (
                  <ChevronDown size={20} color={Colors.light.tint} />
                )}
              </View>
            </TouchableOpacity>

            {expandedRecord === rec.id.toString() && (
              <View style={styles.expandedContent}>
                <View style={styles.divider} />

                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <View style={[styles.sectionIcon, styles.diagnosisIcon]}>
                      <FileText size={16} color={Colors.light.tint} />
                    </View>
                    <Text style={styles.sectionTitle}>Diagnosis</Text>
                  </View>
                  <Text style={styles.sectionContent}>{rec.diagnosis}</Text>
                </View>

                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <View style={[styles.sectionIcon, styles.prescriptionIcon]}>
                      <Pill size={16} color="#10B981" />
                    </View>
                    <Text style={styles.sectionTitle}>Prescription</Text>
                  </View>
                  <Text style={styles.sectionContent}>{rec.prescription}</Text>
                </View>

                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <View
                      style={[styles.sectionIcon, styles.testResultsIcon]}
                    />
                    <Text style={styles.sectionTitle}>Test Results</Text>
                  </View>
                  <Text style={styles.sectionContent}>{rec.testResults}</Text>
                </View>

                <View style={styles.actionsContainer}>
                  <TouchableOpacity style={styles.actionButton}>
                    <Text style={styles.downloadActionText}>Download</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.shareActionButton}>
                    <Text style={styles.shareActionText}>Share</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    color: Colors.light.text,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: Colors.light.text,
  },
  filtersScroll: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  filtersContainer: {
    paddingRight: 8,
  },
  filterButton: {
    marginRight: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
  },
  activeFilterButton: {
    backgroundColor: Colors.light.tint,
  },
  filterText: {
    fontWeight: '500',
    color: '#666',
  },
  activeFilterText: {
    color: '#fff',
  },
  recordsList: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  recordsListContent: {
    paddingBottom: 24,
  },
  recordCard: {
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  recordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  doctorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8F1FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  doctorDetails: {
    marginLeft: 12,
  },
  doctorName: {
    fontWeight: '600',
    fontSize: 16,
    color: Colors.light.text,
  },
  recordDate: {
    fontSize: 14,
    color: Colors.light.subtleText,
    marginTop: 2,
  },
  specialtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  specialtyText: {
    marginRight: 8,
    color: Colors.light.tint,
    fontWeight: '500',
  },
  expandedContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginBottom: 16,
  },
  section: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  diagnosisIcon: {
    backgroundColor: '#E8F1FF',
  },
  prescriptionIcon: {
    backgroundColor: '#D1FAE5',
  },
  testResultsIcon: {
    backgroundColor: '#EDE9FE',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  sectionContent: {
    fontSize: 15,
    color: '#666',
    marginLeft: 40,
    lineHeight: 22,
  },
  actionsContainer: {
    flexDirection: 'row',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    marginRight: 8,
    backgroundColor: '#E8F1FF',
    borderRadius: 8,
  },
  shareActionButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    marginLeft: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  downloadActionText: {
    color: Colors.light.tint,
    fontWeight: '500',
  },
  shareActionText: {
    color: '#666',
    fontWeight: '500',
  },
});
export default ResultScreen;

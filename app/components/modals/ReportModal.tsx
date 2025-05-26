import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import React from 'react';
import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native';

export type ReportType = 'daily' | 'weekly' | 'monthly';

type ReportModalProps = {
  visible: boolean;
  onClose: () => void;
  onGenerateReport: (type: ReportType) => void;
};

export default function ReportModal({ visible, onClose, onGenerateReport }: ReportModalProps) {
  const handleGenerateReport = async (type: ReportType) => {
    onClose();
    await onGenerateReport(type);
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, { maxHeight: 400 }]}>
          <View style={styles.modalHeader}>
            <ThemedText style={styles.modalTitle}>Generate Report</ThemedText>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <IconSymbol name="xmark.circle.fill" size={24} color="#94a3b8" />
            </TouchableOpacity>
          </View>

          <View style={styles.reportOptions}>
            <TouchableOpacity 
              style={styles.reportOption}
              onPress={() => handleGenerateReport('daily')}
            >
              <IconSymbol name="clock.fill" size={24} color="#0284c7" />
              <View style={styles.reportOptionText}>
                <ThemedText style={styles.reportOptionTitle}>Daily Report</ThemedText>
                <ThemedText style={styles.reportOptionDescription}>
                  Generate a report for today's activities
                </ThemedText>
              </View>
              <IconSymbol name="chevron.right" size={20} color="#94a3b8" />
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.reportOption}
              onPress={() => handleGenerateReport('weekly')}
            >
              <IconSymbol name="chart.bar.fill" size={24} color="#0284c7" />
              <View style={styles.reportOptionText}>
                <ThemedText style={styles.reportOptionTitle}>Weekly Report</ThemedText>
                <ThemedText style={styles.reportOptionDescription}>
                  Generate a report for this week
                </ThemedText>
              </View>
              <IconSymbol name="chevron.right" size={20} color="#94a3b8" />
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.reportOption}
              onPress={() => handleGenerateReport('monthly')}
            >
              <IconSymbol name="chart.bar.fill" size={24} color="#0284c7" />
              <View style={styles.reportOptionText}>
                <ThemedText style={styles.reportOptionTitle}>Monthly Report</ThemedText>
                <ThemedText style={styles.reportOptionDescription}>
                  Generate a report for this month
                </ThemedText>
              </View>
              <IconSymbol name="chevron.right" size={20} color="#94a3b8" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    width: '90%',
    maxWidth: 400,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1e293b',
  },
  closeButton: {
    padding: 4,
  },
  reportOptions: {
    padding: 20,
  },
  reportOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    marginBottom: 12,
  },
  reportOptionText: {
    flex: 1,
    marginLeft: 16,
  },
  reportOptionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  reportOptionDescription: {
    fontSize: 14,
    color: '#64748b',
  },
}); 
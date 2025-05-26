import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import React, { useState } from 'react';
import { Alert, Modal, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

export type AddSlotData = {
  zone: string;
  slots: string;
  rate: string;
  type: 'covered' | 'uncovered';
  description: string;
};

type AddSlotModalProps = {
  visible: boolean;
  onClose: () => void;
  onAdd: (data: AddSlotData) => void;
};

export default function AddSlotModal({ visible, onClose, onAdd }: AddSlotModalProps) {
  const [formData, setFormData] = useState<AddSlotData>({
    zone: '',
    slots: '',
    rate: '',
    type: 'covered',
    description: '',
  });

  const handleAdd = () => {
    if (!formData.zone || !formData.slots || !formData.rate) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    onAdd(formData);
    setFormData({
      zone: '',
      slots: '',
      rate: '',
      type: 'covered',
      description: '',
    });
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <ThemedText style={styles.modalTitle}>Add Parking Slots</ThemedText>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <IconSymbol name="xmark.circle.fill" size={24} color="#94a3b8" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalBody}>
            <View style={styles.formGroup}>
              <ThemedText style={styles.inputLabel}>Zone Name *</ThemedText>
              <TextInput
                style={styles.modalInput}
                placeholder="e.g., Zone A"
                value={formData.zone}
                onChangeText={(text) => setFormData(prev => ({ ...prev, zone: text }))}
                placeholderTextColor="#94a3b8"
              />
            </View>

            <View style={styles.formRow}>
              <View style={[styles.formGroup, { flex: 1 }]}>
                <ThemedText style={styles.inputLabel}>Number of Slots *</ThemedText>
                <TextInput
                  style={styles.modalInput}
                  placeholder="e.g., 10"
                  value={formData.slots}
                  onChangeText={(text) => setFormData(prev => ({ ...prev, slots: text }))}
                  keyboardType="numeric"
                  placeholderTextColor="#94a3b8"
                />
              </View>
              <View style={[styles.formGroup, { flex: 1, marginLeft: 12 }]}>
                <ThemedText style={styles.inputLabel}>Hourly Rate ($) *</ThemedText>
                <TextInput
                  style={styles.modalInput}
                  placeholder="e.g., 5"
                  value={formData.rate}
                  onChangeText={(text) => setFormData(prev => ({ ...prev, rate: text }))}
                  keyboardType="numeric"
                  placeholderTextColor="#94a3b8"
                />
              </View>
            </View>

            <View style={styles.formGroup}>
              <ThemedText style={styles.inputLabel}>Slot Type</ThemedText>
              <View style={styles.typeSelector}>
                <TouchableOpacity 
                  style={[
                    styles.typeOption,
                    formData.type === 'covered' && styles.typeOptionSelected
                  ]}
                  onPress={() => setFormData(prev => ({ ...prev, type: 'covered' }))}
                >
                  <ThemedText style={[
                    styles.typeOptionText,
                    formData.type === 'covered' && styles.typeOptionTextSelected
                  ]}>Covered</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[
                    styles.typeOption,
                    formData.type === 'uncovered' && styles.typeOptionSelected
                  ]}
                  onPress={() => setFormData(prev => ({ ...prev, type: 'uncovered' }))}
                >
                  <ThemedText style={[
                    styles.typeOptionText,
                    formData.type === 'uncovered' && styles.typeOptionTextSelected
                  ]}>Uncovered</ThemedText>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.formGroup}>
              <ThemedText style={styles.inputLabel}>Description</ThemedText>
              <TextInput
                style={[styles.modalInput, styles.textArea]}
                placeholder="Add any additional details about these slots..."
                value={formData.description}
                onChangeText={(text) => setFormData(prev => ({ ...prev, description: text }))}
                multiline
                numberOfLines={4}
                placeholderTextColor="#94a3b8"
              />
            </View>
          </ScrollView>

          <View style={styles.modalFooter}>
            <TouchableOpacity 
              style={[styles.modalButton, styles.cancelButton]} 
              onPress={onClose}
            >
              <ThemedText style={styles.cancelButtonText}>Cancel</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.modalButton, styles.addButton]} 
              onPress={handleAdd}
            >
              <ThemedText style={styles.addButtonText}>Add Slots</ThemedText>
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
    maxHeight: '80%',
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
  modalBody: {
    padding: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  formRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748b',
    marginBottom: 8,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#1e293b',
    backgroundColor: '#f8fafc',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  typeSelector: {
    flexDirection: 'row',
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    padding: 4,
  },
  typeOption: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  typeOptionSelected: {
    backgroundColor: '#fff',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  typeOptionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748b',
  },
  typeOptionTextSelected: {
    color: '#0284c7',
  },
  modalFooter: {
    flexDirection: 'row',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f1f5f9',
  },
  addButton: {
    backgroundColor: '#0284c7',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#64748b',
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
  },
}); 
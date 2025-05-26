import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

type VehicleData = {
  plate: string;
  ownerName: string;
  model: string;
  space: string;
};

const initialData: VehicleData = {
  plate: '',
  ownerName: '',
  model: '',
  space: '',
};

// Mock available spaces
const availableSpaces = ['A1', 'B1', 'C2', 'D3'];

export default function CheckIn() {
  const router = useRouter();
  const [vehicleData, setVehicleData] = useState<VehicleData>(initialData);
  const [showSpaces, setShowSpaces] = useState(false);

  const handleInputChange = (field: keyof VehicleData, value: string) => {
    setVehicleData(prev => ({ ...prev, [field]: value }));
  };

  const handleSpaceSelect = (space: string) => {
    setVehicleData(prev => ({ ...prev, space }));
    setShowSpaces(false);
  };

  const handleSubmit = async () => {
    // Validate form
    if (!vehicleData.plate || !vehicleData.ownerName || !vehicleData.model || !vehicleData.space) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      // Generate QR code data
      const qrData = {
        ...vehicleData,
        checkInTime: new Date().toISOString(),
        ticketId: Math.random().toString(36).substring(2, 15),
      };

      // In a real app, this would be sent to the backend
      // For now, we'll just show a success message
      Alert.alert(
        'Check-in Successful',
        `Vehicle checked in to space ${vehicleData.space}\nTicket ID: ${qrData.ticketId}`,
        [
          {
            text: 'OK',
            onPress: () => router.back(),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to check in vehicle');
    }
  };

  return (
    <ThemedView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <IconSymbol name="chevron.left" size={24} color="#fff" />
          </TouchableOpacity>
          <ThemedText style={styles.headerTitle}>Vehicle Check-in</ThemedText>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.form}>
            {/* License Plate */}
            <View style={styles.inputGroup}>
              <ThemedText style={styles.label}>License Plate</ThemedText>
              <TextInput
                style={styles.input}
                value={vehicleData.plate}
                onChangeText={(value) => handleInputChange('plate', value.toUpperCase())}
                placeholder="Enter license plate"
                placeholderTextColor="#94a3b8"
                autoCapitalize="characters"
              />
            </View>

            {/* Owner Name */}
            <View style={styles.inputGroup}>
              <ThemedText style={styles.label}>Owner Name</ThemedText>
              <TextInput
                style={styles.input}
                value={vehicleData.ownerName}
                onChangeText={(value) => handleInputChange('ownerName', value)}
                placeholder="Enter owner name"
                placeholderTextColor="#94a3b8"
              />
            </View>

            {/* Vehicle Model */}
            <View style={styles.inputGroup}>
              <ThemedText style={styles.label}>Vehicle Model</ThemedText>
              <TextInput
                style={styles.input}
                value={vehicleData.model}
                onChangeText={(value) => handleInputChange('model', value)}
                placeholder="Enter vehicle model"
                placeholderTextColor="#94a3b8"
              />
            </View>

            {/* Parking Space */}
            <View style={styles.inputGroup}>
              <ThemedText style={styles.label}>Parking Space</ThemedText>
              <TouchableOpacity
                style={[styles.input, styles.spaceSelector]}
                onPress={() => setShowSpaces(!showSpaces)}
              >
                <ThemedText style={vehicleData.space ? styles.spaceText : styles.placeholderText}>
                  {vehicleData.space || 'Select parking space'}
                </ThemedText>
                <IconSymbol 
                  name={showSpaces ? "chevron.up" : "chevron.down"} 
                  size={20} 
                  color="#64748b" 
                />
              </TouchableOpacity>

              {showSpaces && (
                <View style={styles.spacesList}>
                  {availableSpaces.map((space) => (
                    <TouchableOpacity
                      key={space}
                      style={styles.spaceItem}
                      onPress={() => handleSpaceSelect(space)}
                    >
                      <ThemedText style={styles.spaceItemText}>{space}</ThemedText>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <ThemedText style={styles.submitButtonText}>Check In Vehicle</ThemedText>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#03045e',
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  form: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1e293b',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#1e293b',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  spaceSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  spaceText: {
    fontSize: 16,
    color: '#1e293b',
  },
  placeholderText: {
    fontSize: 16,
    color: '#94a3b8',
  },
  spacesList: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginTop: 4,
    padding: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    zIndex: 1000,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  spaceItem: {
    padding: 12,
    borderRadius: 8,
  },
  spaceItemText: {
    fontSize: 16,
    color: '#1e293b',
  },
  footer: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  submitButton: {
    backgroundColor: '#03045e',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 
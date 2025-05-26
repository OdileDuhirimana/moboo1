import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

type CheckOutData = {
  ticketId: string;
  checkInTime: string;
  plate: string;
  space: string;
};

// Mock data - in a real app this would come from scanning the QR code
const mockTicketData: CheckOutData = {
  ticketId: 'TKT123456',
  checkInTime: '2024-03-20T10:30:00Z',
  plate: 'ABC123',
  space: 'A1',
};

export default function CheckOut() {
  const router = useRouter();
  const [ticketId, setTicketId] = useState('');
  const [ticketData, setTicketData] = useState<CheckOutData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const calculateFee = (checkInTime: string): number => {
    const checkIn = new Date(checkInTime);
    const now = new Date();
    const hours = Math.ceil((now.getTime() - checkIn.getTime()) / (1000 * 60 * 60));
    // Mock fee calculation: $2 per hour with a minimum of $2
    return Math.max(2, hours * 2);
  };

  const handleScanQR = () => {
    // In a real app, this would open the camera to scan QR code
    Alert.alert('QR Scanner', 'Opening camera to scan QR code...');
    // For demo purposes, we'll use mock data
    setTicketData(mockTicketData);
  };

  const handleManualSearch = () => {
    setIsLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      if (ticketId === mockTicketData.ticketId) {
        setTicketData(mockTicketData);
      } else {
        Alert.alert('Error', 'Ticket not found');
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleCheckOut = () => {
    if (!ticketData) return;

    const fee = calculateFee(ticketData.checkInTime);
    Alert.alert(
      'Confirm Check-out',
      `Parking Fee: $${fee.toFixed(2)}\n\nProceed with check-out?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => {
            // In a real app, this would update the backend
            Alert.alert(
              'Check-out Successful',
              'Vehicle has been checked out successfully',
              [
                {
                  text: 'OK',
                  onPress: () => router.back(),
                },
              ]
            );
          },
        },
      ]
    );
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
          <ThemedText style={styles.headerTitle}>Vehicle Check-out</ThemedText>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {!ticketData ? (
            <View style={styles.searchSection}>
              <TouchableOpacity
                style={styles.scanButton}
                onPress={handleScanQR}
              >
                <View style={styles.scanIcon}>
                  <IconSymbol name="qrcode" size={32} color="#03045e" />
                </View>
                <ThemedText style={styles.scanText}>Scan QR Code</ThemedText>
              </TouchableOpacity>

              <View style={styles.divider}>
                <View style={styles.line} />
                <ThemedText style={styles.dividerText}>OR</ThemedText>
                <View style={styles.line} />
              </View>

              <View style={styles.manualSearch}>
                <ThemedText style={styles.label}>Enter Ticket ID</ThemedText>
                <View style={styles.searchInput}>
                  <TextInput
                    style={styles.input}
                    value={ticketId}
                    onChangeText={setTicketId}
                    placeholder="Enter ticket ID"
                    placeholderTextColor="#94a3b8"
                    autoCapitalize="characters"
                  />
                  <TouchableOpacity
                    style={[
                      styles.searchButton,
                      (!ticketId || isLoading) && styles.searchButtonDisabled
                    ]}
                    onPress={handleManualSearch}
                    disabled={!ticketId || isLoading}
                  >
                    <IconSymbol name="magnifyingglass" size={20} color="#fff" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ) : (
            <View style={styles.ticketDetails}>
              <View style={styles.ticketHeader}>
                <IconSymbol name="ticket.fill" size={24} color="#03045e" />
                <ThemedText style={styles.ticketTitle}>Ticket Details</ThemedText>
              </View>

              <View style={styles.detailsGrid}>
                <View style={styles.detailItem}>
                  <ThemedText style={styles.detailLabel}>Ticket ID</ThemedText>
                  <ThemedText style={styles.detailValue}>{ticketData.ticketId}</ThemedText>
                </View>

                <View style={styles.detailItem}>
                  <ThemedText style={styles.detailLabel}>License Plate</ThemedText>
                  <ThemedText style={styles.detailValue}>{ticketData.plate}</ThemedText>
                </View>

                <View style={styles.detailItem}>
                  <ThemedText style={styles.detailLabel}>Parking Space</ThemedText>
                  <ThemedText style={styles.detailValue}>{ticketData.space}</ThemedText>
                </View>

                <View style={styles.detailItem}>
                  <ThemedText style={styles.detailLabel}>Check-in Time</ThemedText>
                  <ThemedText style={styles.detailValue}>
                    {new Date(ticketData.checkInTime).toLocaleString()}
                  </ThemedText>
                </View>

                <View style={styles.detailItem}>
                  <ThemedText style={styles.detailLabel}>Duration</ThemedText>
                  <ThemedText style={styles.detailValue}>
                    {Math.ceil(
                      (new Date().getTime() - new Date(ticketData.checkInTime).getTime()) /
                        (1000 * 60 * 60)
                    )} hours
                  </ThemedText>
                </View>

                <View style={styles.detailItem}>
                  <ThemedText style={styles.detailLabel}>Parking Fee</ThemedText>
                  <ThemedText style={[styles.detailValue, styles.fee]}>
                    ${calculateFee(ticketData.checkInTime).toFixed(2)}
                  </ThemedText>
                </View>
              </View>
            </View>
          )}
        </ScrollView>

        {ticketData && (
          <View style={styles.footer}>
            <TouchableOpacity style={styles.submitButton} onPress={handleCheckOut}>
              <ThemedText style={styles.submitButtonText}>Complete Check-out</ThemedText>
            </TouchableOpacity>
          </View>
        )}
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
  searchSection: {
    padding: 20,
  },
  scanButton: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  scanIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#e0f2fe',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  scanText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 32,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#e2e8f0',
  },
  dividerText: {
    marginHorizontal: 16,
    color: '#64748b',
    fontWeight: '500',
  },
  manualSearch: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1e293b',
    marginBottom: 8,
  },
  searchInput: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#1e293b',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  searchButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#03045e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchButtonDisabled: {
    opacity: 0.5,
  },
  ticketDetails: {
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  ticketHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
  },
  ticketTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
  },
  detailsGrid: {
    gap: 20,
  },
  detailItem: {
    gap: 4,
  },
  detailLabel: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 16,
    color: '#1e293b',
    fontWeight: '500',
  },
  fee: {
    color: '#03045e',
    fontSize: 20,
    fontWeight: '600',
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
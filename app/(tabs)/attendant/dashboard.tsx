import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { Alert, Dimensions, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

// Mock data for parking spaces
const mockSpaces = [
  { id: 'A1', zone: 'A', status: 'available', type: 'covered' },
  { id: 'A2', zone: 'A', status: 'occupied', type: 'covered' },
  { id: 'A3', zone: 'A', status: 'reserved', type: 'covered' },
  { id: 'B1', zone: 'B', status: 'available', type: 'uncovered' },
  { id: 'B2', zone: 'B', status: 'occupied', type: 'uncovered' },
  { id: 'B3', zone: 'B', status: 'maintenance', type: 'uncovered' },
  { id: 'C1', zone: 'C', status: 'available', type: 'covered' },
  { id: 'C2', zone: 'C', status: 'occupied', type: 'covered' },
  { id: 'C3', zone: 'C', status: 'available', type: 'covered' },
];

type SpaceStatus = 'available' | 'occupied' | 'reserved' | 'maintenance';

const statusColors: Record<SpaceStatus, { bg: string; text: string; gradient: string[] }> = {
  available: { 
    bg: '#dcfce7', 
    text: '#16a34a',
    gradient: ['#dcfce7', '#bbf7d0']
  },
  occupied: { 
    bg: '#fee2e2', 
    text: '#dc2626',
    gradient: ['#fee2e2', '#fecaca']
  },
  reserved: { 
    bg: '#fef3c7', 
    text: '#d97706',
    gradient: ['#fef3c7', '#fde68a']
  },
  maintenance: { 
    bg: '#e0e7ff', 
    text: '#4f46e5',
    gradient: ['#e0e7ff', '#c7d2fe']
  },
};

export default function AttendantDashboard() {
  const router = useRouter();
  const [selectedZone, setSelectedZone] = useState<string>('all');

  const handleCheckIn = () => {
    router.push('/attendant/check-in');
  };

  const handleCheckOut = () => {
    router.push('/attendant/check-out');
  };

  const handleScanQR = () => {
    Alert.alert('QR Scanner', 'Opening camera to scan QR code...');
  };

  const statistics = useMemo(() => {
    const spaces = selectedZone === 'all' 
      ? mockSpaces 
      : mockSpaces.filter(space => space.zone === selectedZone);

    const total = spaces.length;
    const available = spaces.filter(s => s.status === 'available').length;
    const occupied = spaces.filter(s => s.status === 'occupied').length;
    const reserved = spaces.filter(s => s.status === 'reserved').length;

    return {
      total,
      available,
      occupied,
      reserved,
      occupancyRate: Math.round((occupied / total) * 100),
    };
  }, [selectedZone]);

  const filteredSpaces = selectedZone === 'all' 
    ? mockSpaces 
    : mockSpaces.filter(space => space.zone === selectedZone);

  const zones = ['all', ...new Set(mockSpaces.map(space => space.zone))];

  return (
    <ThemedView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        {/* Header */}
        <LinearGradient
          colors={['#03045e', '#023e8a']}
          style={styles.header}
        >
          <View>
            <ThemedText style={styles.headerTitle}>
              Parking Overview
            </ThemedText>
            <ThemedText style={styles.headerSubtitle}>
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </ThemedText>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <IconSymbol name="person" size={32} color="#fff" />
          </TouchableOpacity>
        </LinearGradient>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Statistics Cards */}
          <View style={styles.statsContainer}>
            <View style={styles.statsCard}>
              <View style={styles.statsHeader}>
                <IconSymbol name="chart" size={20} color="#03045e" />
                <ThemedText style={styles.statsTitle}>Occupancy Rate</ThemedText>
              </View>
              <ThemedText style={styles.statsValue}>{statistics.occupancyRate}%</ThemedText>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${statistics.occupancyRate}%` }]} />
              </View>
            </View>

            <View style={styles.statsRow}>
              <View style={[styles.miniStatsCard, { backgroundColor: statusColors.available.bg }]}>
                <ThemedText style={[styles.miniStatsValue, { color: statusColors.available.text }]}>
                  {statistics.available}
                </ThemedText>
                <ThemedText style={[styles.miniStatsLabel, { color: statusColors.available.text }]}>
                  Available
                </ThemedText>
              </View>
              <View style={[styles.miniStatsCard, { backgroundColor: statusColors.occupied.bg }]}>
                <ThemedText style={[styles.miniStatsValue, { color: statusColors.occupied.text }]}>
                  {statistics.occupied}
                </ThemedText>
                <ThemedText style={[styles.miniStatsLabel, { color: statusColors.occupied.text }]}>
                  Occupied
                </ThemedText>
              </View>
              <View style={[styles.miniStatsCard, { backgroundColor: statusColors.reserved.bg }]}>
                <ThemedText style={[styles.miniStatsValue, { color: statusColors.reserved.text }]}>
                  {statistics.reserved}
                </ThemedText>
                <ThemedText style={[styles.miniStatsLabel, { color: statusColors.reserved.text }]}>
                  Reserved
                </ThemedText>
              </View>
            </View>
          </View>

          {/* Quick Actions */}
          <View style={styles.quickActions}>
            <TouchableOpacity 
              style={styles.actionButton} 
              onPress={handleCheckIn}
            >
              <LinearGradient
                colors={['#059669', '#047857']}
                style={styles.actionGradient}
              >
                <IconSymbol name="plus" size={24} color="#fff" />
                <ThemedText style={styles.actionText}>Check In</ThemedText>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.actionButton} 
              onPress={handleCheckOut}
            >
              <LinearGradient
                colors={['#dc2626', '#b91c1c']}
                style={styles.actionGradient}
              >
                <IconSymbol name="minus" size={24} color="#fff" />
                <ThemedText style={styles.actionText}>Check Out</ThemedText>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.actionButton} 
              onPress={handleScanQR}
            >
              <LinearGradient
                colors={['#0284c7', '#0369a1']}
                style={styles.actionGradient}
              >
                <IconSymbol name="qr" size={24} color="#fff" />
                <ThemedText style={styles.actionText}>Scan QR</ThemedText>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Section Title */}
          <View style={styles.sectionHeader}>
            <ThemedText style={styles.sectionTitle}>Parking Spaces</ThemedText>
            <TouchableOpacity style={styles.filterButton}>
              <IconSymbol name="filter" size={20} color="#64748b" />
            </TouchableOpacity>
          </View>

          {/* Zone Filter */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.zoneFilter}
            contentContainerStyle={styles.zoneFilterContent}
          >
            {zones.map((zone) => (
              <TouchableOpacity
                key={zone}
                style={[
                  styles.zoneButton,
                  selectedZone === zone && styles.zoneButtonActive
                ]}
                onPress={() => setSelectedZone(zone)}
              >
                <ThemedText style={[
                  styles.zoneButtonText,
                  selectedZone === zone && styles.zoneButtonTextActive
                ]}>
                  {zone.toUpperCase()}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Parking Grid */}
          <View style={styles.parkingGrid}>
            {filteredSpaces.map((space) => (
              <TouchableOpacity 
                key={space.id}
                style={styles.spaceCardWrapper}
                onPress={() => Alert.alert(
                  'Space Details', 
                  `Space ${space.id}\nStatus: ${space.status}\nType: ${space.type}`
                )}
              >
                <LinearGradient
                  colors={statusColors[space.status as SpaceStatus].gradient}
                  style={styles.spaceCard}
                >
                  <ThemedText style={[
                    styles.spaceId,
                    { color: statusColors[space.status as SpaceStatus].text }
                  ]}>
                    {space.id}
                  </ThemedText>
                  <ThemedText style={[
                    styles.spaceStatus,
                    { color: statusColors[space.status as SpaceStatus].text }
                  ]}>
                    {space.status.charAt(0).toUpperCase() + space.status.slice(1)}
                  </ThemedText>
                  <ThemedText style={[
                    styles.spaceType,
                    { color: statusColors[space.status as SpaceStatus].text }
                  ]}>
                    {space.type}
                  </ThemedText>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const { width } = Dimensions.get('window');
const CARD_MARGIN = 12;
const CARD_WIDTH = (width - (32 + CARD_MARGIN * 2)) / 3;

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
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.8,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  statsContainer: {
    padding: 16,
    gap: 16,
  },
  statsCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  statsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  statsTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1e293b',
  },
  statsValue: {
    fontSize: 32,
    fontWeight: '700',
    color: '#03045e',
    marginBottom: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#e2e8f0',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#03045e',
    borderRadius: 2,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  miniStatsCard: {
    flex: 1,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  miniStatsValue: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 4,
  },
  miniStatsLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  actionGradient: {
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  actionText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  zoneFilter: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  zoneFilterContent: {
    paddingRight: 16,
  },
  zoneButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
    marginRight: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  zoneButtonActive: {
    backgroundColor: '#03045e',
  },
  zoneButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748b',
  },
  zoneButtonTextActive: {
    color: '#fff',
  },
  parkingGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    gap: CARD_MARGIN,
  },
  spaceCardWrapper: {
    width: CARD_WIDTH,
    aspectRatio: 1,
    borderRadius: 12,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  spaceCard: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spaceId: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  spaceStatus: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 2,
  },
  spaceType: {
    fontSize: 10,
    opacity: 0.8,
  },
}); 
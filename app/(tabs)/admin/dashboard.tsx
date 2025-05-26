import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { format } from 'date-fns';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import ActivityItem from '../../components/ActivityItem';
import MetricCard from '../../components/dashboard/MetricCard';
import QuickActions, { QuickAction } from '../../components/dashboard/QuickActions';
import SearchBar from '../../components/dashboard/SearchBar';
import ZoneStatus from '../../components/dashboard/ZoneStatus';
import AddSlotModal from '../../components/modals/AddSlotModal';
import ReportModal from '../../components/modals/ReportModal';

// Mock data
const mockData = {
  occupancy: 75,
  revenue: {
    today: 1250,
    weekly: 8750,
    monthly: 35000
  },
  totalVehicles: 42,
  parkingZones: [
    { name: 'Zone A', available: 10, total: 30, hourlyRate: 5 },
    { name: 'Zone B', available: 8, total: 25, hourlyRate: 4 },
    { name: 'Zone C', available: 7, total: 20, hourlyRate: 3 },
  ],
  recentActivity: [
    { id: 1, plate: 'ABC123', time: '10:30 AM', type: 'check-in' as const, zone: 'Zone A', duration: '2h' },
    { id: 2, plate: 'XYZ789', time: '10:25 AM', type: 'check-out' as const, zone: 'Zone B', duration: '3h' },
    { id: 3, plate: 'DEF456', time: '10:15 AM', type: 'check-in' as const, zone: 'Zone C', duration: '1h' },
    { id: 4, plate: 'GHI789', time: '10:00 AM', type: 'check-out' as const, zone: 'Zone A', duration: '4h' },
  ],
};

async function generateReport(type: 'daily' | 'weekly' | 'monthly') {
  try {
    // Mock data - replace with actual API call
    const reportData = {
      period: type,
      generatedAt: new Date(),
      metrics: {
        totalRevenue: mockData.revenue.today,
        occupancyRate: mockData.occupancy,
        totalVehicles: mockData.totalVehicles,
        averageStayDuration: '2.5 hours'
      },
      zoneStats: mockData.parkingZones.map(zone => ({
        name: zone.name,
        occupancy: ((zone.total - zone.available) / zone.total) * 100,
        revenue: zone.hourlyRate * (zone.total - zone.available) * 8, // assuming 8 hours average
        available: zone.available,
        total: zone.total
      }))
    };

    // Create CSV content
    const csvHeader = 'Report Type,Generated At,Total Revenue,Occupancy Rate,Total Vehicles,Average Stay Duration\\n';
    const csvData = `${type},${format(reportData.generatedAt, 'yyyy-MM-dd HH:mm:ss')},$${reportData.metrics.totalRevenue},${reportData.metrics.occupancyRate}%,${reportData.metrics.totalVehicles},${reportData.metrics.averageStayDuration}\\n\\n`;
    
    const zoneHeader = 'Zone Name,Occupancy Rate,Revenue,Available Slots,Total Slots\\n';
    const zoneData = reportData.zoneStats.map(zone => 
      `${zone.name},${zone.occupancy.toFixed(1)}%,$${zone.revenue},${zone.available},${zone.total}`
    ).join('\\n');

    const csvContent = csvHeader + csvData + zoneHeader + zoneData;

    // Generate filename with timestamp
    const timestamp = format(new Date(), 'yyyy-MM-dd_HH-mm');
    const fileName = `parking_report_${type}_${timestamp}.csv`;
    
    // Create the file
    const fileUri = `${FileSystem.documentDirectory}${fileName}`;
    await FileSystem.writeAsStringAsync(fileUri, csvContent);

    // Share the file
    await Sharing.shareAsync(fileUri, {
      mimeType: 'text/csv',
      dialogTitle: `${type.charAt(0).toUpperCase() + type.slice(1)} Parking Report`,
      UTI: 'public.comma-separated-values-text'
    });

  } catch (error) {
    console.error('Error generating report:', error);
    Alert.alert('Error', 'Failed to generate report. Please try again.');
  }
}

export default function AdminDashboard() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);

  const quickActions: QuickAction[] = [
    {
      icon: 'plus.circle.fill',
      label: 'Add Slots',
      color: '#0284c7',
      bgColor: '#e0f2fe',
      onPress: () => setShowAddModal(true),
    },
    {
      icon: 'clock.fill',
      label: 'Pending',
      color: '#d97706',
      bgColor: '#fef3c7',
      badge: '2',
      onPress: () => {},
    },
    {
      icon: 'chart.bar.fill',
      label: 'Reports',
      color: '#16a34a',
      bgColor: '#dcfce7',
      onPress: () => setShowReportModal(true),
    },
    {
      icon: 'gearshape.fill',
      label: 'Settings',
      color: '#6366f1',
      bgColor: '#e0e7ff',
      onPress: () => {},
    },
  ];

  return (
    <ThemedView style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <View>
            <ThemedText type="title" style={styles.headerTitle}>
              Dashboard
            </ThemedText>
            <ThemedText style={styles.headerSubtitle}>
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </ThemedText>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.notificationButton}>
              <IconSymbol name="bell.fill" size={24} color="#fff" />
              <View style={styles.notificationBadge}>
                <ThemedText style={styles.notificationText}>3</ThemedText>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.profileButton}>
              <IconSymbol name="person.crop.circle.fill" size={32} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchWrapper}>
          <SearchBar />
        </View>
      </View>

      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <View style={styles.sectionHeader}>
            <View>
              <ThemedText style={styles.sectionLabel}>Quick Access</ThemedText>
              <ThemedText style={styles.sectionTitle}>
                Manage Parking
              </ThemedText>
            </View>
          </View>
          <View style={styles.quickActionsWrapper}>
            <QuickActions actions={quickActions} />
          </View>
        </View>

        {/* Overview Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <ThemedText style={styles.sectionLabel}>Overview</ThemedText>
              <ThemedText style={styles.sectionTitle}>
                Today's Statistics
              </ThemedText>
            </View>
          </View>
          <View style={styles.metricsGrid}>
            <MetricCard
              title="Occupancy"
              value={`${mockData.occupancy}%`}
              icon="chart.bar.fill"
              color="#2563eb"
              trend="up"
            />
            <MetricCard
              title="Revenue"
              value={`$${mockData.revenue.today}`}
              subtitle="Today"
              icon="plus.circle.fill"
              color="#0284c7"
              trend="up"
            />
            <MetricCard
              title="Vehicles"
              value={mockData.totalVehicles}
              subtitle="Active"
              icon="clock.fill"
              color="#0369a1"
            />
          </View>
        </View>

        {/* Zones Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <ThemedText style={styles.sectionLabel}>Zones</ThemedText>
              <ThemedText style={styles.sectionTitle}>
                Space Availability
              </ThemedText>
            </View>
            <TouchableOpacity style={styles.viewAllButton}>
              <ThemedText style={styles.viewAllText}>View All</ThemedText>
              <IconSymbol name="chevron.right" size={16} color="#2563eb" />
            </TouchableOpacity>
          </View>
          <View style={styles.zonesList}>
            {mockData.parkingZones.map((zone, index) => (
              <ZoneStatus 
                key={index}
                name={zone.name}
                available={zone.available}
                total={zone.total}
              />
            ))}
          </View>
        </View>

        {/* Recent Activity Section */}
        <View style={[styles.section, styles.lastSection]}>
          <View style={styles.sectionHeader}>
            <View>
              <ThemedText style={styles.sectionLabel}>Activity</ThemedText>
              <ThemedText style={styles.sectionTitle}>
                Recent Updates
              </ThemedText>
            </View>
            <TouchableOpacity style={styles.viewAllButton}>
              <ThemedText style={styles.viewAllText}>View All</ThemedText>
              <IconSymbol name="chevron.right" size={16} color="#2563eb" />
            </TouchableOpacity>
          </View>
          <View style={styles.activityList}>
            {mockData.recentActivity.map((activity) => (
              <ActivityItem
                key={activity.id}
                plate={activity.plate}
                time={activity.time}
                type={activity.type}
                zone={activity.zone}
                duration={activity.duration}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      <AddSlotModal 
        visible={showAddModal} 
        onClose={() => setShowAddModal(false)}
        onAdd={(data) => {
          Alert.alert(
            'Success',
            `Added ${data.slots} ${data.type} slots to ${data.zone} at $${data.rate}/hour`,
            [{ text: 'OK', onPress: () => setShowAddModal(false) }]
          );
        }}
      />
      <ReportModal 
        visible={showReportModal} 
        onClose={() => setShowReportModal(false)}
        onGenerateReport={generateReport}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  headerContainer: {
    backgroundColor: '#03045e',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    paddingTop: 60,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 34,
    fontWeight: '700',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    color: '#fff',
    opacity: 0.8,
    fontSize: 16,
    letterSpacing: 0.25,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  profileButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#ef4444',
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#03045e',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    padding: 0,
  },
  notificationText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
    textAlignVertical: 'center',
    includeFontPadding: false,
    lineHeight: 16,
  },
  searchWrapper: {
    paddingHorizontal: 20,
    paddingBottom: 32,
    marginTop: 4,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 24,
  },
  quickActionsContainer: {
    marginBottom: 32,
  },
  quickActionsWrapper: {
    marginTop: 16,
  },
  sectionHeader: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionLabel: {
    fontSize: 13,
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 6,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1e293b',
    letterSpacing: 0.25,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  viewAllText: {
    color: '#2563eb',
    fontSize: 14,
    fontWeight: '500',
    marginRight: 4,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginTop: 8,
  },
  zonesList: {
    marginTop: 8,
    gap: 16,
  },
  activityList: {
    marginTop: 8,
    gap: 12,
  },
  section: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 24,
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  lastSection: {
    marginBottom: 32,
  },
}); 


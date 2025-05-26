import { ThemedText } from '@/components/ThemedText';
import React from 'react';
import { StyleSheet, View } from 'react-native';

type ActivityItemProps = {
  plate: string;
  time: string;
  type: 'check-in' | 'check-out';
  zone: string;
  duration: string;
};

const ActivityItem: React.FC<ActivityItemProps> = ({ plate, time, type, zone, duration }) => {
  return (
    <View style={styles.activityItem}>
      <View style={[styles.statusIndicator, type === 'check-in' ? styles.checkIn : styles.checkOut]} />
      <View style={styles.activityDetails}>
        <View style={styles.activityHeader}>
          <ThemedText style={styles.activityPlate}>
            {plate}
          </ThemedText>
          <ThemedText style={styles.activityTime}>
            {time}
          </ThemedText>
        </View>
        <View style={styles.activityMeta}>
          <View style={styles.activityBadge}>
            <ThemedText style={styles.activityBadgeText}>
              {zone}
            </ThemedText>
          </View>
          {duration && (
            <View style={[styles.activityBadge, styles.durationBadge]}>
              <ThemedText style={styles.activityBadgeText}>
                {duration}
              </ThemedText>
            </View>
          )}
          <View style={[styles.typeBadge, type === 'check-in' ? styles.checkInBadge : styles.checkOutBadge]}>
            <ThemedText style={[styles.typeBadgeText, type === 'check-in' ? styles.checkInText : styles.checkOutText]}>
              {type === 'check-in' ? 'IN' : 'OUT'}
            </ThemedText>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  statusIndicator: {
    width: 4,
    height: 40,
    borderRadius: 2,
    marginRight: 12,
  },
  checkIn: {
    backgroundColor: '#10b981',
  },
  checkOut: {
    backgroundColor: '#f43f5e',
  },
  activityDetails: {
    flex: 1,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  activityPlate: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  activityTime: {
    fontSize: 14,
    color: '#64748b',
  },
  activityMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  activityBadge: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  durationBadge: {
    backgroundColor: '#e5e7eb',
  },
  activityBadgeText: {
    fontSize: 12,
    color: '#64748b',
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  checkInBadge: {
    backgroundColor: '#dcfce7',
  },
  checkOutBadge: {
    backgroundColor: '#fee2e2',
  },
  typeBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  checkInText: {
    color: '#059669',
  },
  checkOutText: {
    color: '#dc2626',
  },
});

export default ActivityItem; 
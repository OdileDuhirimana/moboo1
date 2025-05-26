import { ThemedText } from '@/components/ThemedText';
import React from 'react';
import { StyleSheet, View } from 'react-native';

type ZoneStatusProps = {
  name: string;
  available: number;
  total: number;
};

export default function ZoneStatus({ name, available, total }: ZoneStatusProps) {
  const occupancyPercentage = ((total - available) / total) * 100;
  
  return (
    <View style={styles.zoneItem}>
      <View style={styles.zoneHeader}>
        <ThemedText style={styles.zoneName}>{name}</ThemedText>
        <ThemedText style={styles.zoneCount}>
          {available}/{total}
        </ThemedText>
      </View>
      <View style={styles.progressBarBg}>
        <View 
          style={[
            styles.progressBarFill, 
            { 
              width: `${occupancyPercentage}%`,
              backgroundColor: occupancyPercentage > 80 ? '#F44336' : occupancyPercentage > 60 ? '#FFA000' : '#4CAF50'
            }
          ]} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  zoneItem: {
    marginBottom: 12,
  },
  zoneHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  zoneName: {
    fontSize: 16,
    fontWeight: '500',
  },
  zoneCount: {
    fontSize: 14,
    color: '#666',
  },
  progressBarBg: {
    height: 8,
    backgroundColor: '#f1f5f9',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
}); 
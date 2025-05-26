import { ThemedText } from '@/components/ThemedText';
import { IconSymbol, IconSymbolName } from '@/components/ui/IconSymbol';
import React from 'react';
import { StyleSheet, View } from 'react-native';

type MetricCardProps = {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: IconSymbolName;
  color: string;
  trend?: 'up' | 'down';
};

export default function MetricCard({ title, value, subtitle, icon, color, trend }: MetricCardProps) {
  return (
    <View style={[styles.metricCard, { backgroundColor: color }]}>
      <View style={styles.metricHeader}>
        <IconSymbol name={icon} size={24} color="#fff" />
        {trend && (
          <View style={[styles.trendBadge, { backgroundColor: trend === 'up' ? '#4CAF50' : '#F44336' }]}>
            <IconSymbol 
              name={trend === 'up' ? 'arrow.up' : 'arrow.down'} 
              size={12} 
              color="#fff" 
            />
          </View>
        )}
      </View>
      <ThemedText style={styles.metricTitle} lightColor="#fff" darkColor="#fff">
        {title}
      </ThemedText>
      <ThemedText style={styles.metricValue} lightColor="#fff" darkColor="#fff">
        {value}
      </ThemedText>
      {subtitle && (
        <ThemedText style={styles.metricSubtitle} lightColor="#fff" darkColor="#fff">
          {subtitle}
        </ThemedText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  metricCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  trendBadge: {
    padding: 4,
    borderRadius: 12,
  },
  metricTitle: {
    fontSize: 14,
    opacity: 0.9,
    marginBottom: 8,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  metricSubtitle: {
    fontSize: 12,
    opacity: 0.8,
  },
}); 
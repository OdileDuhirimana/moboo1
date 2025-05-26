import { ThemedText } from '@/components/ThemedText';
import { IconSymbol, IconSymbolName } from '@/components/ui/IconSymbol';
import React from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';

export type QuickAction = {
  icon: IconSymbolName;
  label: string;
  color: string;
  bgColor: string;
  badge?: string;
  onPress: () => void;
};

type QuickActionsProps = {
  actions: QuickAction[];
};

export default function QuickActions({ actions }: QuickActionsProps) {
  return (
    <View style={styles.quickActions}>
      {actions.map((action, index) => (
        <TouchableOpacity 
          key={index} 
          style={styles.quickActionButton}
          onPress={action.onPress}
        >
          <View style={[styles.quickActionIcon, { backgroundColor: action.bgColor }]}>
            <IconSymbol name={action.icon} size={24} color={action.color} />
            {action.badge && (
              <View style={styles.badge}>
                <ThemedText style={styles.badgeText}>{action.badge}</ThemedText>
              </View>
            )}
          </View>
          <ThemedText style={styles.quickActionText}>{action.label}</ThemedText>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 24,
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: -24,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  quickActionButton: {
    alignItems: 'center',
    width: (Dimensions.get('window').width - 96) / 4,
  },
  quickActionIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    position: 'relative',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  quickActionText: {
    fontSize: 13,
    color: '#475569',
    fontWeight: '500',
    textAlign: 'center',
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#ef4444',
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    padding: 0,
  },
  badgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
    textAlignVertical: 'center',
    includeFontPadding: false,
    lineHeight: 16,
  },
}); 
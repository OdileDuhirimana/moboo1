import { IconSymbol } from '@/components/ui/IconSymbol';
import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

type SearchBarProps = {
  onSearch?: (text: string) => void;
  onFilter?: () => void;
  placeholder?: string;
};

export default function SearchBar({ onSearch, onFilter, placeholder = "Search parking slots..." }: SearchBarProps) {
  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchInputWrapper}>
        <IconSymbol name="magnifyingglass" size={20} color="#94a3b8" />
        <TextInput
          style={styles.searchInput}
          placeholder={placeholder}
          placeholderTextColor="#94a3b8"
          onChangeText={onSearch}
        />
      </View>
      <TouchableOpacity style={styles.filterButton} onPress={onFilter}>
        <IconSymbol name="line.3.horizontal.decrease" size={20} color="#03045e" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  searchInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#1e293b',
  },
  filterButton: {
    padding: 12,
    borderLeftWidth: 1,
    borderLeftColor: '#f1f5f9',
  },
}); 
// app/welcome.tsx
import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import ParkingLogo from '@/components/ui/ParkingLogo';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <ThemedView style={styles.container} lightColor="#03045e" darkColor="#03045e">
      <View style={styles.logoContainer}>
        <ParkingLogo size={120} />
      </View>
      <ThemedText type="title" style={styles.title} lightColor="#fff" darkColor="#fff">
        Welcome to ParkWhiz
      </ThemedText>
      <ThemedText style={styles.subtitle} lightColor="#fff" darkColor="#fff">
        Smart parking made easy
      </ThemedText>
      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => router.push('/signup')}
        >
          <ThemedText style={styles.primaryButtonText} lightColor="#03045e" darkColor="#03045e">
            Sign Up
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => router.push('/login')}
        >
          <ThemedText style={styles.secondaryButtonText} lightColor="#fff" darkColor="#fff">
            Log In
          </ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#03045e',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logoContainer: {
    marginBottom: 32,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 40,
    textAlign: 'center',
    color: '#fff',
    opacity: 0.85,
  },
  buttonGroup: {
    width: '100%',
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 40,
    marginBottom: 16,
    width: '100%',
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#03045e',
    fontWeight: 'bold',
    fontSize: 16,
  },
  secondaryButton: {
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 40,
    width: '100%',
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
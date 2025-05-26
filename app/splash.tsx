import { ThemedView } from '@/components/ThemedView';
import ParkingLogo from '@/components/ui/ParkingLogo';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/welcome');
    }, 2000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <ThemedView style={styles.container} lightColor="#03045e" darkColor="#03045e">
      <View style={styles.centerContent}>
        <ParkingLogo size={140} />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#03045e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  logo: {
    width: 140,
    height: 140,
  },
  bottomMessageContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 48,
  },
  messageBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 24,
    paddingVertical: 10,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  messageLogo: {
    width: 32,
    height: 32,
    marginRight: 10,
  },
  messageText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#03045e',
  },
}); 
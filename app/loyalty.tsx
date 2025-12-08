import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Award } from 'lucide-react-native';
import Colors from '@/constants/color';

export default function LoyaltyScreen() {
  const router = useRouter();

  const navigateBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/(tabs)/menu');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={navigateBack} style={styles.backButton}>
          <ChevronLeft size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Loyalty Points</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.pointsContainer}>
          <Award size={80} color={Colors.primary} />
          <Text style={styles.pointsValue}>1,250</Text>
          <Text style={styles.pointsLabel}>Loyalty Points</Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>How to earn points?</Text>
          <Text style={styles.infoText}>
            • 10 points for every Rs. 100 spent{'\n'}
            • 50 points for writing reviews{'\n'}
            • 100 points for referring friends
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderGray,
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.black,
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  pointsContainer: {
    alignItems: 'center',
    backgroundColor: Colors.lightGray,
    padding: 30,
    borderRadius: 16,
    marginBottom: 20,
  },
  pointsValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: Colors.primary,
    marginVertical: 8,
  },
  pointsLabel: {
    fontSize: 16,
    color: Colors.gray,
  },
  infoSection: {
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.borderGray,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.black,
    marginBottom: 12,
  },
  infoText: {
    fontSize: 16,
    color: Colors.gray,
    lineHeight: 24,
  },
});
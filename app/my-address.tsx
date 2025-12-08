import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, MapPin } from 'lucide-react-native';
import Colors from '@/constants/color';

export default function MyAddressScreen() {
  const router = useRouter();

  const handleAddAddress = () => {
    router.push('/add-address');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color={Colors.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Address</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Content - Exactly like your image */}
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.emptyState}>
          <MapPin size={80} color={Colors.gray} />
          <Text style={styles.emptyTitle}>No Address Found</Text>
          <Text style={styles.emptySubtitle}>
            Please add your address for your better experience
          </Text>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={handleAddAddress}
          >
            <Text style={styles.addButtonText}>Add Address</Text>
          </TouchableOpacity>
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
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.black,
  },
  placeholder: {
    width: 32,
  },
  content: {
    flexGrow: 1,
    padding: 20,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 100,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.black,
    marginTop: 24,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: Colors.gray,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
  },
  addButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    minWidth: 200,
    alignItems: 'center',
  },
  addButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});
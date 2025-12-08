// app/add-address.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, MapPin, Search, Navigation } from 'lucide-react-native';
import Colors from '@/constants/color';

export default function AddAddressScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    addressType: 'home',
    deliveryAddress: 'MFM7+W9M, Butwal 32907, Nepal',
    name: 'Suman',
    phone: '9744318379',
    street: '',
  });

  const addressTypes = [
    { id: 'home', label: 'Home' },
    { id: 'office', label: 'Office' },
    { id: 'current', label: 'Your Current Loc' },
  ];

  const popularLocations = [
    'Moti Path',
    'Shikhar Path',
    'Bike Rent Services Butwal',
    'Daddy\'s Kitchen The cafe and Restaurant',
    'sunflow Parkn',
    'Ram Path',
    'Police Training C',
    'wapath',
    'Jansewa path',
    'Google',
    'Royal Enfield Showroom',
    'Kalika wanaw',
  ];

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Validate required fields
    if (!formData.deliveryAddress || !formData.name || !formData.phone) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    // Save address logic here
    Alert.alert('Success', 'Address saved successfully', [
      { text: 'OK', onPress: () => router.back() }
    ]);
  };

  const handleLocationSelect = (location: string) => {
    setFormData(prev => ({
      ...prev,
      deliveryAddress: location
    }));
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
        <Text style={styles.headerTitle}>Add New Address</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        {/* Search Section */}
        <View style={styles.searchSection}>
          <Text style={styles.sectionLabel}>Add the location Correctly</Text>
          <View style={styles.searchContainer}>
            <Search size={20} color={Colors.gray} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search here"
              placeholderTextColor={Colors.gray}
            />
          </View>
        </View>

        {/* Popular Locations */}
        <View style={styles.locationsSection}>
          <Text style={styles.sectionLabel}>Popular Locations</Text>
          <View style={styles.locationsGrid}>
            {popularLocations.map((location, index) => (
              <TouchableOpacity
                key={index}
                style={styles.locationChip}
                onPress={() => handleLocationSelect(location)}
              >
                <Text style={styles.locationText}>{location}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Address Type */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Address Type</Text>
          <View style={styles.addressTypeContainer}>
            {addressTypes.map((type) => (
              <TouchableOpacity
                key={type.id}
                style={[
                  styles.addressTypeButton,
                  formData.addressType === type.id && styles.addressTypeButtonSelected
                ]}
                onPress={() => updateFormData('addressType', type.id)}
              >
                <Text style={[
                  styles.addressTypeText,
                  formData.addressType === type.id && styles.addressTypeTextSelected
                ]}>
                  {type.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Delivery Address */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>
            Delivery Address <Text style={styles.required}>*</Text>
          </Text>
          <View style={styles.addressInputContainer}>
            <MapPin size={20} color={Colors.gray} />
            <TextInput
              style={styles.addressInput}
              value={formData.deliveryAddress}
              onChangeText={(text) => updateFormData('deliveryAddress', text)}
              multiline
              numberOfLines={2}
            />
          </View>
        </View>

        {/* Name */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>
            Name <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            value={formData.name}
            onChangeText={(text) => updateFormData('name', text)}
            placeholder="Enter your name"
          />
        </View>

        {/* Phone */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>
            Phone <Text style={styles.required}>*</Text>
          </Text>
          <View style={styles.phoneInputContainer}>
            <View style={styles.countryCode}>
              <Text style={styles.countryCodeText}>+977 |</Text>
            </View>
            <TextInput
              style={styles.phoneInput}
              value={formData.phone}
              onChangeText={(text) => updateFormData('phone', text)}
              placeholder="Enter phone number"
              keyboardType="phone-pad"
            />
          </View>
        </View>

        {/* Street Name */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Street/Galli Name</Text>
          <TextInput
            style={styles.input}
            value={formData.street}
            onChangeText={(text) => updateFormData('street', text)}
            placeholder="Enter street/galli name"
          />
        </View>

        {/* Spacer for button */}
        <View style={styles.spacer} />
      </ScrollView>

      {/* Save Button */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.saveButton}
          onPress={handleSave}
        >
          <Navigation size={20} color={Colors.white} />
          <Text style={styles.saveButtonText}>Save Location</Text>
        </TouchableOpacity>
      </View>
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
    flex: 1,
    padding: 16,
  },
  searchSection: {
    marginBottom: 24,
  },
  section: {
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 12,
  },
  required: {
    color: Colors.primary,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.lightGray,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: Colors.black,
  },
  locationsSection: {
    marginBottom: 24,
  },
  locationsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  locationChip: {
    backgroundColor: Colors.lightGray,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.borderGray,
  },
  locationText: {
    fontSize: 14,
    color: Colors.black,
  },
  addressTypeContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  addressTypeButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.borderGray,
    backgroundColor: Colors.white,
    alignItems: 'center',
  },
  addressTypeButtonSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  addressTypeText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.gray,
  },
  addressTypeTextSelected: {
    color: Colors.white,
  },
  addressInputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Colors.lightGray,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  addressInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: Colors.black,
    textAlignVertical: 'top',
  },
  input: {
    backgroundColor: Colors.lightGray,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: Colors.black,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.lightGray,
    borderRadius: 12,
    overflow: 'hidden',
  },
  countryCode: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.lightGray,
    borderRightWidth: 1,
    borderRightColor: Colors.borderGray,
  },
  countryCodeText: {
    fontSize: 16,
    color: Colors.gray,
    fontWeight: '500',
  },
  phoneInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: Colors.black,
  },
  spacer: {
    height: 100,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.white,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.lightGray,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 12,
  },
  saveButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});
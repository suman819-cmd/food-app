import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '@/constants/color';
import { Phone, Star } from 'lucide-react-native';
import { DeliveryPerson } from '@/types/delivery';

interface DeliveryPersonCardProps {
  deliveryPerson: DeliveryPerson;
  onCall?: () => void;
}

export const DeliveryPersonCard: React.FC<DeliveryPersonCardProps> = ({ 
  deliveryPerson, 
  onCall 
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={{ uri: deliveryPerson.image || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' }} 
          style={styles.avatar}
        />
        <View style={styles.info}>
          <Text style={styles.name}>{deliveryPerson.name}</Text>
          <View style={styles.ratingContainer}>
            <Star size={14} color="#FFD700" fill="#FFD700" />
            <Text style={styles.rating}>{deliveryPerson.rating}</Text>
          </View>
          {deliveryPerson.vehicle && (
            <Text style={styles.vehicle}>{deliveryPerson.vehicle}</Text>
          )}
          {deliveryPerson.licensePlate && (
            <Text style={styles.licensePlate}>{deliveryPerson.licensePlate}</Text>
          )}
        </View>
        <TouchableOpacity style={styles.callButton} onPress={onCall}>
          <Phone size={20} color={Colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.black,
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  rating: {
    fontSize: 14,
    color: Colors.gray,
    marginLeft: 4,
  },
  vehicle: {
    fontSize: 14,
    color: Colors.gray,
    marginBottom: 2,
  },
  licensePlate: {
    fontSize: 12,
    color: Colors.gray,
    fontFamily: 'monospace',
  },
  callButton: {
    backgroundColor: Colors.primary,
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});
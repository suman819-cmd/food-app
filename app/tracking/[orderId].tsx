import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useDelivery } from '@/providers/DeliveryProvider';
import { OrderStatusStepper } from '@/app/components/OrderStatusStepper';
import { DeliveryPersonCard } from '@/app/components/DeliveryPersonCard';
import { LiveMap } from '@/app/components/LiveMap';

export default function OrderTrackingScreen() {
  const { orderId } = useLocalSearchParams();
  const { trackOrder } = useDelivery();
  
  const order = trackOrder(orderId as string);

  if (!order) {
    return (
      <View style={styles.container}>
        <Text>Order not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Order Status Stepper */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Order Status</Text>
        <OrderStatusStepper currentStatus={order.status} />
      </View>

      {/* Delivery Person Info */}
      {order.deliveryPerson && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Delivery Partner</Text>
          <DeliveryPersonCard deliveryPerson={order.deliveryPerson} />
        </View>
      )}

      {/* Live Map */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Live Tracking</Text>
        <LiveMap 
          restaurantLocation={order.restaurantLocation}
          customerLocation={order.customerLocation}
          currentLocation={order.currentLocation}
        />
      </View>

      {/* Estimated Delivery */}
      <View style={styles.section}>
        <Text style={styles.estimatedDelivery}>
          Estimated Delivery: {order.estimatedDelivery}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  section: {
    padding: 16,
    marginBottom: 8,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  estimatedDelivery: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
});
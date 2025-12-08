import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '@/constants/color';
import { OrderStatus } from '@/types/delivery';

interface OrderStatusStepperProps {
  currentStatus: OrderStatus;
}

const statusSteps: { status: OrderStatus; label: string; description: string }[] = [
  { status: 'confirmed', label: 'Confirmed', description: 'Order confirmed' },
  { status: 'preparing', label: 'Preparing', description: 'Restaurant preparing your food' },
  { status: 'ready', label: 'Ready', description: 'Food is ready for pickup' },
  { status: 'picked_up', label: 'Picked Up', description: 'Delivery partner picked up your order' },
  { status: 'on_the_way', label: 'On the Way', description: 'Your food is on the way' },
  { status: 'arrived', label: 'Arrived', description: 'Delivery partner has arrived' },
  { status: 'delivered', label: 'Delivered', description: 'Order delivered successfully' },
];

export const OrderStatusStepper: React.FC<OrderStatusStepperProps> = ({ currentStatus }) => {
  const currentIndex = statusSteps.findIndex(step => step.status === currentStatus);

  return (
    <View style={styles.container}>
      {statusSteps.map((step, index) => {
        const isCompleted = index < currentIndex;
        const isCurrent = index === currentIndex;
        const isUpcoming = index > currentIndex;

        return (
          <View key={step.status} style={styles.stepContainer}>
            {/* Step Circle */}
            <View style={[
              styles.circle,
              isCompleted && styles.completedCircle,
              isCurrent && styles.currentCircle,
              isUpcoming && styles.upcomingCircle
            ]}>
              {isCompleted ? (
                <Text style={styles.checkmark}>✓</Text>
              ) : (
                <Text style={[
                  styles.circleText,
                  isCurrent && styles.currentCircleText,
                  isUpcoming && styles.upcomingCircleText
                ]}>
                  {index + 1}
                </Text>
              )}
            </View>

            {/* Step Content */}
            <View style={styles.stepContent}>
              <Text style={[
                styles.stepLabel,
                isCompleted && styles.completedLabel,
                isCurrent && styles.currentLabel,
                isUpcoming && styles.upcomingLabel
              ]}>
                {step.label}
              </Text>
              <Text style={styles.stepDescription}>
                {step.description}
              </Text>
            </View>

            {/* Connector Line (except for last step) */}
            {index < statusSteps.length - 1 && (
              <View style={[
                styles.connector,
                isCompleted ? styles.completedConnector : styles.upcomingConnector
              ]} />
            )}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  circle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    zIndex: 2,
  },
  completedCircle: {
    backgroundColor: Colors.primary,
  },
  currentCircle: {
    backgroundColor: Colors.primary,
    borderWidth: 3,
    borderColor: '#FFD700',
  },
  upcomingCircle: {
    backgroundColor: Colors.lightGray,
    borderWidth: 2,
    borderColor: Colors.borderGray,
  },
  circleText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  currentCircleText: {
    color: Colors.white,
  },
  upcomingCircleText: {
    color: Colors.gray,
  },
  checkmark: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  stepContent: {
    flex: 1,
    paddingBottom: 24,
  },
  stepLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  completedLabel: {
    color: Colors.primary,
  },
  currentLabel: {
    color: Colors.black,
    fontWeight: 'bold',
  },
  upcomingLabel: {
    color: Colors.gray,
  },
  stepDescription: {
    fontSize: 14,
    color: Colors.gray,
    lineHeight: 18,
  },
  connector: {
    position: 'absolute',
    left: 16,
    top: 32,
    bottom: -8,
    width: 2,
    zIndex: 1,
  },
  completedConnector: {
    backgroundColor: Colors.primary,
  },
  upcomingConnector: {
    backgroundColor: Colors.borderGray,
  },
});
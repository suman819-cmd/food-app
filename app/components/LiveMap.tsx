import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Colors from '@/constants/color';
import { MapPin, Navigation } from 'lucide-react-native';

interface Location {
  lat: number;
  lng: number;
}

interface LiveMapProps {
  restaurantLocation: Location;
  customerLocation: Location;
  currentLocation?: Location;
}

const { width } = Dimensions.get('window');

export const LiveMap: React.FC<LiveMapProps> = ({ 
  restaurantLocation, 
  customerLocation, 
  currentLocation 
}) => {
  // For now, we'll create a simplified map visualization
  // In a real app, you'd integrate with Google Maps or Mapbox

  return (
    <View style={styles.container}>
      {/* Map Placeholder */}
      <View style={styles.mapPlaceholder}>
        <View style={styles.mapPoints}>
          {/* Restaurant Point */}
          <View style={[styles.point, styles.restaurantPoint]}>
            <MapPin size={16} color={Colors.white} />
          </View>
          
          {/* Delivery Path */}
          <View style={styles.deliveryPath} />
          
          {/* Current Location Point (if available) */}
          {currentLocation && (
            <View style={[styles.point, styles.deliveryPoint]}>
              <Navigation size={16} color={Colors.white} />
            </View>
          )}
          
          {/* Customer Point */}
          <View style={[styles.point, styles.customerPoint]}>
            <MapPin size={16} color={Colors.white} />
          </View>
        </View>
        
        <Text style={styles.mapPlaceholderText}>
          {currentLocation ? 'Live Tracking Active' : 'Preparing your order'}
        </Text>
      </View>

      {/* Map Legend */}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, styles.restaurantDot]} />
          <Text style={styles.legendText}>Restaurant</Text>
        </View>
        {currentLocation && (
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, styles.deliveryDot]} />
            <Text style={styles.legendText}>Delivery Partner</Text>
          </View>
        )}
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, styles.customerDot]} />
          <Text style={styles.legendText}>Your Location</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
  },
  mapPlaceholder: {
    height: 200,
    backgroundColor: Colors.lightGray,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    overflow: 'hidden',
  },
  mapPoints: {
    width: '80%',
    height: '60%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
  },
  point: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  restaurantPoint: {
    backgroundColor: '#EF4444',
  },
  deliveryPoint: {
    backgroundColor: Colors.primary,
    position: 'absolute',
    left: '40%', // Simulate moving delivery
  },
  customerPoint: {
    backgroundColor: '#10B981',
  },
  deliveryPath: {
    position: 'absolute',
    top: '50%',
    left: '10%',
    right: '10%',
    height: 3,
    backgroundColor: Colors.primary,
    opacity: 0.5,
  },
  mapPlaceholderText: {
    marginTop: 16,
    fontSize: 14,
    color: Colors.gray,
    fontWeight: '500',
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  restaurantDot: {
    backgroundColor: '#EF4444',
  },
  deliveryDot: {
    backgroundColor: Colors.primary,
  },
  customerDot: {
    backgroundColor: '#10B981',
  },
  legendText: {
    fontSize: 12,
    color: Colors.gray,
  },
});
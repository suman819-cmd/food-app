export type OrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "ready"
  | "picked_up"
  | "on_the_way"
  | "arrived"
  | "delivered"
  | "cancelled";

export interface DeliveryPerson {
  id: string;
  name: string;
  phone: string;
  image?: string;
  vehicle?: string;
  licensePlate?: string;
  rating: number;
}

export interface Location {
  lat: number;
  lng: number;
}

export interface OrderTracking {
  orderId: string;
  status: OrderStatus;
  estimatedDelivery: string;
  deliveryPerson?: DeliveryPerson;
  currentLocation?: Location;
  restaurantLocation: Location;
  customerLocation: Location;
  timeline: {
    status: OrderStatus;
    timestamp: string;
    description: string;
  }[];
}

// Helper function to get status description
export const getStatusDescription = (status: OrderStatus): string => {
  const descriptions: Record<OrderStatus, string> = {
    pending: "Order has been placed",
    confirmed: "Order confirmed by restaurant",
    preparing: "Restaurant is preparing your food",
    ready: "Food is ready for pickup",
    picked_up: "Delivery partner picked up your order",
    on_the_way: "Your food is on the way to you",
    arrived: "Delivery partner has arrived at your location",
    delivered: "Order has been delivered successfully",
    cancelled: "Order has been cancelled",
  };
  return descriptions[status];
};

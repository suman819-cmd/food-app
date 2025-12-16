import { useApp } from "@/providers/AppProvider";
import {
  OrderStatus,
  OrderTracking,
  getStatusDescription,
} from "@/types/delivery";
import React, { createContext, useContext, useEffect, useState } from "react";

interface DeliveryContextType {
  activeDeliveries: OrderTracking[];
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  trackOrder: (orderId: string) => OrderTracking | undefined;
  updateDeliveryLocation: (
    orderId: string,
    location: { lat: number; lng: number }
  ) => void;
}

const DeliveryContext = createContext<DeliveryContextType | undefined>(
  undefined
);

// Map your order statuses to delivery tracking statuses
const mapOrderStatusToTrackingStatus = (status: string): OrderStatus => {
  const statusMap: Record<string, OrderStatus> = {
    pending: "pending",
    confirmed: "confirmed",
    preparing: "preparing",
    "out-for-delivery": "on_the_way",
    delivered: "delivered",
    cancelled: "cancelled",
  };
  return statusMap[status] || "pending";
};

export const DeliveryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { orders } = useApp();
  const [activeDeliveries, setActiveDeliveries] = useState<OrderTracking[]>([]);

  // Sync delivery tracking with orders from AppProvider
  useEffect(() => {
    const deliveryData: OrderTracking[] = orders.map((order) => {
      // Map the order status to tracking status
      const trackingStatus = mapOrderStatusToTrackingStatus(order.status);

      // Generate tracking data based on order status
      const baseTracking: OrderTracking = {
        orderId: order.id,
        status: trackingStatus,
        estimatedDelivery: getEstimatedDelivery(trackingStatus),
        restaurantLocation: { lat: 28.6129, lng: 77.2295 }, // Default location
        customerLocation: { lat: 28.6448, lng: 77.2167 }, // Default location
        timeline: generateTimeline(trackingStatus, order.createdAt),
      };

      // Add delivery person for active orders
      if (
        ["preparing", "ready", "picked_up", "on_the_way", "arrived"].includes(
          trackingStatus
        )
      ) {
        baseTracking.deliveryPerson = getDeliveryPerson();
      }

      // Add current location for orders in delivery
      if (["picked_up", "on_the_way", "arrived"].includes(trackingStatus)) {
        baseTracking.currentLocation = getCurrentLocation(trackingStatus);
      }

      return baseTracking;
    });

    setActiveDeliveries(deliveryData);
  }, [orders]);

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setActiveDeliveries((prev) =>
      prev.map((order) =>
        order.orderId === orderId
          ? {
              ...order,
              status,
              timeline: [
                ...order.timeline,
                {
                  status,
                  timestamp: new Date().toISOString(),
                  description: getStatusDescription(status),
                },
              ],
            }
          : order
      )
    );
  };

  const updateDeliveryLocation = (
    orderId: string,
    location: { lat: number; lng: number }
  ) => {
    setActiveDeliveries((prev) =>
      prev.map((order) =>
        order.orderId === orderId
          ? { ...order, currentLocation: location }
          : order
      )
    );
  };

  const trackOrder = (orderId: string) => {
    return activeDeliveries.find((order) => order.orderId === orderId);
  };

  return (
    <DeliveryContext.Provider
      value={{
        activeDeliveries,
        updateOrderStatus,
        trackOrder,
        updateDeliveryLocation,
      }}
    >
      {children}
    </DeliveryContext.Provider>
  );
};

// Helper functions
const getEstimatedDelivery = (status: OrderStatus): string => {
  const estimates: Record<OrderStatus, string> = {
    pending: "30-40 min",
    confirmed: "25-35 min",
    preparing: "20-30 min",
    ready: "15-25 min",
    picked_up: "10-20 min",
    on_the_way: "5-15 min",
    arrived: "1-5 min",
    delivered: "Delivered",
    cancelled: "Cancelled",
  };
  return estimates[status];
};

const getDeliveryPerson = () => {
  const deliveryPersons = [
    {
      id: "dp-1",
      name: "Raj Kumar",
      phone: "+91 9876543210",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      vehicle: "Motorcycle",
      licensePlate: "DL01AB1234",
      rating: 4.8,
    },
    {
      id: "dp-2",
      name: "Amit Sharma",
      phone: "+91 9876543211",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      vehicle: "Scooter",
      licensePlate: "DL01CD5678",
      rating: 4.9,
    },
    {
      id: "dp-3",
      name: "Suresh Patel",
      phone: "+91 9876543212",
      image:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face",
      vehicle: "Motorcycle",
      licensePlate: "DL01EF9012",
      rating: 4.7,
    },
  ];
  return deliveryPersons[Math.floor(Math.random() * deliveryPersons.length)];
};

const getCurrentLocation = (status: OrderStatus) => {
  // Simulate moving locations based on status
  const baseLat = 28.6129;
  const baseLng = 77.2295;
  const targetLat = 28.6448;
  const targetLng = 77.2167;

  // Progress map for all statuses
  const progressMap: Record<OrderStatus, number> = {
    pending: 0,
    confirmed: 0,
    preparing: 0,
    ready: 0.1,
    picked_up: 0.2,
    on_the_way: 0.6,
    arrived: 0.9,
    delivered: 1,
    cancelled: 0,
  };

  const progress = progressMap[status] || 0;

  return {
    lat: baseLat + (targetLat - baseLat) * progress,
    lng: baseLng + (targetLng - baseLng) * progress,
  };
};

const generateTimeline = (status: OrderStatus, createdAt: string) => {
  const baseTime = new Date(createdAt);
  const timeline = [
    {
      status: "confirmed" as OrderStatus,
      timestamp: new Date(baseTime.getTime() + 2 * 60000).toISOString(),
      description: "Order confirmed by restaurant",
    },
    {
      status: "preparing" as OrderStatus,
      timestamp: new Date(baseTime.getTime() + 5 * 60000).toISOString(),
      description: "Restaurant started preparing your food",
    },
  ];

  if (
    ["ready", "picked_up", "on_the_way", "arrived", "delivered"].includes(
      status
    )
  ) {
    timeline.push({
      status: "ready" as OrderStatus,
      timestamp: new Date(baseTime.getTime() + 15 * 60000).toISOString(),
      description: "Food is ready for pickup",
    });
  }

  if (["picked_up", "on_the_way", "arrived", "delivered"].includes(status)) {
    timeline.push({
      status: "picked_up" as OrderStatus,
      timestamp: new Date(baseTime.getTime() + 20 * 60000).toISOString(),
      description: "Delivery partner picked up your order",
    });
  }

  if (["on_the_way", "arrived", "delivered"].includes(status)) {
    timeline.push({
      status: "on_the_way" as OrderStatus,
      timestamp: new Date(baseTime.getTime() + 25 * 60000).toISOString(),
      description: "Your food is on the way to you",
    });
  }

  if (["arrived", "delivered"].includes(status)) {
    timeline.push({
      status: "arrived" as OrderStatus,
      timestamp: new Date(baseTime.getTime() + 35 * 60000).toISOString(),
      description: "Delivery partner has arrived at your location",
    });
  }

  if (status === "delivered") {
    timeline.push({
      status: "delivered" as OrderStatus,
      timestamp: new Date(baseTime.getTime() + 40 * 60000).toISOString(),
      description: "Order delivered successfully",
    });
  }

  return timeline.filter((item) => {
    const statusOrder: OrderStatus[] = [
      "confirmed",
      "preparing",
      "ready",
      "picked_up",
      "on_the_way",
      "arrived",
      "delivered",
    ];
    return statusOrder.indexOf(item.status) <= statusOrder.indexOf(status);
  });
};

export const useDelivery = () => {
  const context = useContext(DeliveryContext);
  if (!context) {
    throw new Error("useDelivery must be used within a DeliveryProvider");
  }
  return context;
};

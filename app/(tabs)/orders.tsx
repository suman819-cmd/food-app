// import Colors from "@/constants/color";
// import { useApp } from "@/providers/AppProvider";
// import { Stack } from "expo-router";
// import { Clock, MapPin, Package } from "lucide-react-native";
// import { useState } from "react";
// import {
//   Pressable,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

// export default function OrdersScreen() {
//   const { orders } = useApp();
//   const [activeFilter, setActiveFilter] = useState<
//     "all" | "active" | "completed"
//   >("all");

//   const activeOrders = orders.filter((o) =>
//     ["pending", "confirmed", "preparing", "out-for-delivery"].includes(o.status)
//   );
//   const completedOrders = orders.filter((o) =>
//     ["delivered", "cancelled"].includes(o.status)
//   );

//   const filteredOrders =
//     activeFilter === "all"
//       ? orders
//       : activeFilter === "active"
//       ? activeOrders
//       : completedOrders;

//   return (
//     <SafeAreaView style={styles.container} edges={["top"]}>
//       <Stack.Screen options={{ headerShown: false }} />
//       <View style={styles.header}>
//         <Text style={styles.title}>My Orders</Text>
//         <View style={styles.filterContainer}>
//           <TouchableOpacity
//             style={[
//               styles.filterButton,
//               activeFilter === "all" && styles.filterButtonActive,
//             ]}
//             onPress={() => setActiveFilter("all")}
//           >
//             <Text
//               style={[
//                 styles.filterText,
//                 activeFilter === "all" && styles.filterTextActive,
//               ]}
//             >
//               All
//             </Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[
//               styles.filterButton,
//               activeFilter === "active" && styles.filterButtonActive,
//             ]}
//             onPress={() => setActiveFilter("active")}
//           >
//             <Text
//               style={[
//                 styles.filterText,
//                 activeFilter === "active" && styles.filterTextActive,
//               ]}
//             >
//               Active
//             </Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[
//               styles.filterButton,
//               activeFilter === "completed" && styles.filterButtonActive,
//             ]}
//             onPress={() => setActiveFilter("completed")}
//           >
//             <Text
//               style={[
//                 styles.filterText,
//                 activeFilter === "completed" && styles.filterTextActive,
//               ]}
//             >
//               Completed
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       <ScrollView
//         style={styles.content}
//         contentContainerStyle={{ paddingBottom: 100, padding: 16 }}
//       >
//         {filteredOrders.length === 0 ? (
//           <View style={styles.emptyState}>
//             <View style={styles.emptyIconContainer}>
//               <Package size={60} color={Colors.gray} />
//             </View>
//             <Text style={styles.emptyTitle}>
//               {activeFilter === "all"
//                 ? "No Orders Yet"
//                 : activeFilter === "active"
//                 ? "No Active Orders"
//                 : "No Completed Orders"}
//             </Text>
//             <Text style={styles.emptySubtext}>
//               {activeFilter === "all"
//                 ? "Start ordering your favorite food!"
//                 : activeFilter === "active"
//                 ? "All your orders are completed"
//                 : "You haven't completed any orders yet"}
//             </Text>
//           </View>
//         ) : (
//           filteredOrders.map((order) => (
//             <Pressable key={order.id} style={styles.orderCard}>
//               <View style={styles.orderHeader}>
//                 <Text style={styles.orderId}>#{order.id.slice(-6)}</Text>
//                 <View style={[styles.statusBadge, styles[order.status]]}>
//                   <Text style={styles.statusText}>
//                     {order.status.replace("-", " ")}
//                   </Text>
//                 </View>
//               </View>

//               <View style={styles.restaurantRow}>
//                 <Text style={styles.restaurantName} numberOfLines={1}>
//                   {order.restaurant.name}
//                 </Text>
//               </View>

//               <View style={styles.orderMeta}>
//                 <View style={styles.metaItem}>
//                   <Package size={14} color={Colors.gray} />
//                   <Text style={styles.metaText}>
//                     {order.items.length} items
//                   </Text>
//                 </View>
//                 <View style={styles.metaItem}>
//                   <Clock size={14} color={Colors.gray} />
//                   <Text style={styles.metaText}>
//                     {new Date(order.createdAt).toLocaleDateString()}
//                   </Text>
//                 </View>
//               </View>

//               <View style={styles.orderFooter}>
//                 <View>
//                   <Text style={styles.totalLabel}>Total Amount</Text>
//                   <Text style={styles.total}>Rs. {order.total}</Text>
//                 </View>
//                 {[
//                   "pending",
//                   "confirmed",
//                   "preparing",
//                   "out-for-delivery",
//                 ].includes(order.status) && (
//                   <TouchableOpacity style={styles.trackButton}>
//                     <MapPin size={16} color={Colors.white} />
//                     <Text style={styles.trackButtonText}>Track</Text>
//                   </TouchableOpacity>
//                 )}
//               </View>
//             </Pressable>
//           ))
//         )}
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Colors.white,
//   },
//   header: {
//     padding: 16,
//     backgroundColor: Colors.white,
//     borderBottomWidth: 1,
//     borderBottomColor: Colors.borderGray,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: "bold" as const,
//     color: Colors.black,
//     marginBottom: 16,
//   },
//   filterContainer: {
//     flexDirection: "row",
//     gap: 8,
//   },
//   filterButton: {
//     flex: 1,
//     paddingVertical: 10,
//     paddingHorizontal: 16,
//     borderRadius: 24,
//     backgroundColor: Colors.lightGray,
//     alignItems: "center",
//   },
//   filterButtonActive: {
//     backgroundColor: Colors.primary,
//   },
//   filterText: {
//     fontSize: 14,
//     fontWeight: "600" as const,
//     color: Colors.gray,
//   },
//   filterTextActive: {
//     color: Colors.white,
//   },
//   content: {
//     flex: 1,
//     backgroundColor: Colors.lightGray,
//   },
//   emptyState: {
//     alignItems: "center",
//     justifyContent: "center",
//     paddingTop: 100,
//     paddingHorizontal: 32,
//   },
//   emptyIconContainer: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     backgroundColor: Colors.white,
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 24,
//     elevation: 2,
//     shadowColor: Colors.black,
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.08,
//     shadowRadius: 4,
//   },
//   emptyTitle: {
//     fontSize: 22,
//     fontWeight: "bold" as const,
//     color: Colors.black,
//     marginBottom: 8,
//     textAlign: "center",
//   },
//   emptySubtext: {
//     fontSize: 15,
//     color: Colors.gray,
//     textAlign: "center",
//     lineHeight: 22,
//   },
//   orderCard: {
//     padding: 16,
//     backgroundColor: Colors.white,
//     borderRadius: 16,
//     marginBottom: 12,
//     elevation: 2,
//     shadowColor: Colors.black,
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.08,
//     shadowRadius: 4,
//   },
//   orderHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 14,
//   },
//   orderId: {
//     fontSize: 14,
//     fontWeight: "600" as const,
//     color: Colors.gray,
//     letterSpacing: 0.5,
//   },
//   statusBadge: {
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 16,
//   },
//   statusText: {
//     fontSize: 11,
//     fontWeight: "bold" as const,
//     color: Colors.white,
//     textTransform: "capitalize" as const,
//   },
//   pending: {
//     backgroundColor: "#F59E0B",
//   },
//   confirmed: {
//     backgroundColor: "#3B82F6",
//   },
//   preparing: {
//     backgroundColor: "#8B5CF6",
//   },
//   "out-for-delivery": {
//     backgroundColor: "#10B981",
//   },
//   delivered: {
//     backgroundColor: Colors.success,
//   },
//   cancelled: {
//     backgroundColor: Colors.primary,
//   },
//   restaurantRow: {
//     marginBottom: 12,
//   },
//   restaurantName: {
//     fontSize: 18,
//     fontWeight: "700" as const,
//     color: Colors.black,
//   },
//   orderMeta: {
//     flexDirection: "row",
//     gap: 16,
//     marginBottom: 14,
//   },
//   metaItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 6,
//   },
//   metaText: {
//     fontSize: 13,
//     color: Colors.gray,
//   },

//   orderFooter: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "flex-end",
//     paddingTop: 14,
//     borderTopWidth: 1,
//     borderTopColor: Colors.borderGray,
//   },
//   totalLabel: {
//     fontSize: 12,
//     color: Colors.gray,
//     marginBottom: 4,
//   },
//   total: {
//     fontSize: 20,
//     fontWeight: "bold" as const,
//     color: Colors.primary,
//   },
//   trackButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 6,
//     backgroundColor: Colors.primary,
//     paddingHorizontal: 16,
//     paddingVertical: 10,
//     borderRadius: 24,
//     elevation: 2,
//     shadowColor: Colors.black,
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.2,
//     shadowRadius: 2,
//   },
//   trackButtonText: {
//     color: Colors.white,
//     fontSize: 14,
//     fontWeight: "600" as const,
//   },
// });















import Colors from "@/constants/color";
import { useApp } from "@/providers/AppProvider";
import { useDelivery } from "@/providers/DeliveryProvider";
import { Stack, useRouter } from "expo-router";
import { Clock, MapPin, Package } from "lucide-react-native";
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OrdersScreen() {
  const { orders } = useApp();
  const { trackOrder } = useDelivery();
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<
    "all" | "active" | "completed"
  >("all");

  const activeOrders = orders.filter((o) =>
    ["pending", "confirmed", "preparing", "out-for-delivery", "picked_up", "on_the_way", "arrived"].includes(o.status)
  );
  const completedOrders = orders.filter((o) =>
    ["delivered", "cancelled"].includes(o.status)
  );

  const filteredOrders =
    activeFilter === "all"
      ? orders
      : activeFilter === "active"
      ? activeOrders
      : completedOrders;

  const handleTrackOrder = (orderId: string) => {
    // Navigate to tracking screen
    router.push(`/tracking/${orderId}`);
  };

  const getStatusColor = (status: string) => {
    const statusColors: { [key: string]: string } = {
      'pending': '#F59E0B',
      'confirmed': '#3B82F6',
      'preparing': '#8B5CF6',
      'ready': '#10B981',
      'picked_up': '#10B981',
      'on_the_way': '#10B981',
      'arrived': '#10B981',
      'out-for-delivery': '#10B981',
      'delivered': Colors.success,
      'cancelled': Colors.primary,
    };
    return statusColors[status] || Colors.gray;
  };

  const getStatusText = (status: string) => {
    const statusTexts: { [key: string]: string } = {
      'pending': 'Pending',
      'confirmed': 'Confirmed',
      'preparing': 'Preparing',
      'ready': 'Ready',
      'picked_up': 'Picked Up',
      'on_the_way': 'On the Way',
      'arrived': 'Arrived',
      'out-for-delivery': 'Out for Delivery',
      'delivered': 'Delivered',
      'cancelled': 'Cancelled',
    };
    return statusTexts[status] || status;
  };

  const canTrackOrder = (status: string) => {
    return ['confirmed', 'preparing', 'ready', 'picked_up', 'on_the_way', 'arrived', 'out-for-delivery'].includes(status);
  };

  const getEstimatedDelivery = (orderId: string) => {
    const trackingInfo = trackOrder(orderId);
    return trackingInfo?.estimatedDelivery || 'Calculating...';
  };

  const getDeliveryPerson = (orderId: string) => {
    const trackingInfo = trackOrder(orderId);
    return trackingInfo?.deliveryPerson;
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.header}>
        <Text style={styles.title}>My Orders</Text>
        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={[
              styles.filterButton,
              activeFilter === "all" && styles.filterButtonActive,
            ]}
            onPress={() => setActiveFilter("all")}
          >
            <Text
              style={[
                styles.filterText,
                activeFilter === "all" && styles.filterTextActive,
              ]}
            >
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              activeFilter === "active" && styles.filterButtonActive,
            ]}
            onPress={() => setActiveFilter("active")}
          >
            <Text
              style={[
                styles.filterText,
                activeFilter === "active" && styles.filterTextActive,
              ]}
            >
              Active
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              activeFilter === "completed" && styles.filterButtonActive,
            ]}
            onPress={() => setActiveFilter("completed")}
          >
            <Text
              style={[
                styles.filterText,
                activeFilter === "completed" && styles.filterTextActive,
              ]}
            >
              Completed
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={{ paddingBottom: 100, padding: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {filteredOrders.length === 0 ? (
          <View style={styles.emptyState}>
            <View style={styles.emptyIconContainer}>
              <Package size={60} color={Colors.gray} />
            </View>
            <Text style={styles.emptyTitle}>
              {activeFilter === "all"
                ? "No Orders Yet"
                : activeFilter === "active"
                ? "No Active Orders"
                : "No Completed Orders"}
            </Text>
            <Text style={styles.emptySubtext}>
              {activeFilter === "all"
                ? "Start ordering your favorite food!"
                : activeFilter === "active"
                ? "All your orders are completed"
                : "You haven't completed any orders yet"}
            </Text>
          </View>
        ) : (
          filteredOrders.map((order) => {
            const deliveryPerson = getDeliveryPerson(order.id);
            const estimatedDelivery = getEstimatedDelivery(order.id);
            const canTrack = canTrackOrder(order.status);

            return (
              <Pressable key={order.id} style={styles.orderCard}>
                <View style={styles.orderHeader}>
                  <Text style={styles.orderId}>#{order.id.slice(-6)}</Text>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) }]}>
                    <Text style={styles.statusText}>
                      {getStatusText(order.status)}
                    </Text>
                  </View>
                </View>

                <View style={styles.restaurantRow}>
                  <Text style={styles.restaurantName} numberOfLines={1}>
                    {order.restaurant.name}
                  </Text>
                </View>

                {/* Delivery Info */}
                {canTrack && (
                  <View style={styles.deliveryInfo}>
                    <View style={styles.deliveryMeta}>
                      <Text style={styles.estimatedDelivery}>
                        Est. Delivery: {estimatedDelivery}
                      </Text>
                      {deliveryPerson && (
                        <Text style={styles.deliveryPerson}>
                          Delivery Partner: {deliveryPerson.name}
                        </Text>
                      )}
                    </View>
                  </View>
                )}

                <View style={styles.orderMeta}>
                  <View style={styles.metaItem}>
                    <Package size={14} color={Colors.gray} />
                    <Text style={styles.metaText}>
                      {order.items.length} items
                    </Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Clock size={14} color={Colors.gray} />
                    <Text style={styles.metaText}>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </Text>
                  </View>
                </View>

                <View style={styles.orderFooter}>
                  <View>
                    <Text style={styles.totalLabel}>Total Amount</Text>
                    <Text style={styles.total}>Rs. {order.total}</Text>
                  </View>
                  {canTrack ? (
                    <TouchableOpacity 
                      style={styles.trackButton}
                      onPress={() => handleTrackOrder(order.id)}
                    >
                      <MapPin size={16} color={Colors.white} />
                      <Text style={styles.trackButtonText}>Track Order</Text>
                    </TouchableOpacity>
                  ) : order.status === 'delivered' ? (
                    <TouchableOpacity 
                      style={styles.reorderButton}
                      onPress={() => console.log('Reorder:', order.id)}
                    >
                      <Text style={styles.reorderButtonText}>Reorder</Text>
                    </TouchableOpacity>
                  ) : null}
                </View>

                {/* Progress Bar for Active Orders */}
                {canTrack && (
                  <View style={styles.progressContainer}>
                    <View style={styles.progressBar}>
                      <View 
                        style={[
                          styles.progressFill,
                          { 
                            width: `${getProgressPercentage(order.status)}%`,
                            backgroundColor: getStatusColor(order.status)
                          }
                        ]} 
                      />
                    </View>
                    <View style={styles.progressLabels}>
                      <Text style={styles.progressLabel}>Ordered</Text>
                      <Text style={styles.progressLabel}>Preparing</Text>
                      <Text style={styles.progressLabel}>On the Way</Text>
                      <Text style={styles.progressLabel}>Delivered</Text>
                    </View>
                  </View>
                )}
              </Pressable>
            );
          })
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

// Helper function to calculate progress percentage
const getProgressPercentage = (status: string): number => {
  const statusWeights: { [key: string]: number } = {
    'pending': 10,
    'confirmed': 20,
    'preparing': 40,
    'ready': 60,
    'picked_up': 70,
    'on_the_way': 85,
    'arrived': 95,
    'out-for-delivery': 85,
    'delivered': 100,
    'cancelled': 0,
  };
  return statusWeights[status] || 0;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    padding: 16,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderGray,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold" as const,
    color: Colors.black,
    marginBottom: 16,
  },
  filterContainer: {
    flexDirection: "row",
    gap: 8,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 24,
    backgroundColor: Colors.lightGray,
    alignItems: "center",
  },
  filterButtonActive: {
    backgroundColor: Colors.primary,
  },
  filterText: {
    fontSize: 14,
    fontWeight: "600" as const,
    color: Colors.gray,
  },
  filterTextActive: {
    color: Colors.white,
  },
  content: {
    flex: 1,
    backgroundColor: Colors.lightGray,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 100,
    paddingHorizontal: 32,
  },
  emptyIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    elevation: 2,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: "bold" as const,
    color: Colors.black,
    marginBottom: 8,
    textAlign: "center",
  },
  emptySubtext: {
    fontSize: 15,
    color: Colors.gray,
    textAlign: "center",
    lineHeight: 22,
  },
  orderCard: {
    padding: 16,
    backgroundColor: Colors.white,
    borderRadius: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  orderId: {
    fontSize: 14,
    fontWeight: "600" as const,
    color: Colors.gray,
    letterSpacing: 0.5,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 11,
    fontWeight: "bold" as const,
    color: Colors.white,
    textTransform: "capitalize" as const,
  },
  restaurantRow: {
    marginBottom: 12,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: Colors.black,
  },
  // New delivery info styles
  deliveryInfo: {
    marginBottom: 12,
  },
  deliveryMeta: {
    gap: 4,
  },
  estimatedDelivery: {
    fontSize: 14,
    fontWeight: "600" as const,
    color: Colors.primary,
  },
  deliveryPerson: {
    fontSize: 12,
    color: Colors.gray,
  },
  orderMeta: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 14,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  metaText: {
    fontSize: 13,
    color: Colors.gray,
  },
  orderFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: Colors.borderGray,
  },
  totalLabel: {
    fontSize: 12,
    color: Colors.gray,
    marginBottom: 4,
  },
  total: {
    fontSize: 20,
    fontWeight: "bold" as const,
    color: Colors.primary,
  },
  trackButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    elevation: 2,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  trackButtonText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: "600" as const,
  },
  reorderButton: {
    backgroundColor: Colors.lightGray,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
  },
  reorderButtonText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: "600" as const,
  },
  // Progress bar styles
  progressContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.borderGray,
  },
  progressBar: {
    height: 6,
    backgroundColor: Colors.lightGray,
    borderRadius: 3,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressLabel: {
    fontSize: 10,
    color: Colors.gray,
    fontWeight: '500' as const,
  },
});
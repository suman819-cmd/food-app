import Colors from "@/constants/color";
import { useApp } from "@/providers/AppProvider";
import { Stack, useRouter } from "expo-router";
import {
  ChevronLeft,
  Minus,
  Plus,
  Tag,
  Ticket,
  Trash2,
} from "lucide-react-native";
import { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CartScreen() {
  const router = useRouter();
  const { cart, cartTotal, removeFromCart, updateCartItemQuantity } = useApp();
  const [showCouponInput, setShowCouponInput] = useState(false);
  const deliveryFee = 50;
  const finalTotal = cartTotal + deliveryFee;

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <ChevronLeft size={24} color={Colors.black} />
        </TouchableOpacity>
        <Text style={styles.title}>My Cart</Text>
        <View style={{ width: 24 }} />
      </View>

      {cart.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>🛒</Text>
          <Text style={styles.emptyText}>Your cart is empty</Text>
          <TouchableOpacity
            style={styles.shopButton}
            onPress={() => router.push("/")}
          >
            <Text style={styles.shopButtonText}>Start Shopping</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <ScrollView
            style={styles.content}
            contentContainerStyle={{ paddingBottom: 200 }}
          >
            {cart.length > 0 && (
              <View style={styles.restaurantInfo}>
                <Image
                  source={{ uri: cart[0].image }}
                  style={styles.restaurantLogo}
                />
                <View style={styles.restaurantDetails}>
                  <Text style={styles.restaurantName}>
                    {cart[0].restaurantName}
                  </Text>
                  <Text style={styles.restaurantMeta}>
                    ★ 3.8 (25+) • 55-60 min (2.00 km)
                  </Text>
                </View>
              </View>
            )}

            {cart.map((item) => (
              <View key={item.id} style={styles.cartItem}>
                <Image source={{ uri: item.image }} style={styles.itemImage} />
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName} numberOfLines={2}>
                    {item.name}
                  </Text>
                  <View style={styles.itemMetaRow}>
                    {item.isVeg && (
                      <View style={styles.vegBadge}>
                        <View style={styles.vegDot} />
                      </View>
                    )}
                    <Text style={styles.itemPrice}>Rs. {item.price}</Text>
                  </View>
                </View>
                <View style={styles.quantityControls}>
                  <View style={styles.quantityDisplay}>
                    <Pressable
                      style={styles.quantityButton}
                      onPress={() =>
                        updateCartItemQuantity(item.id, item.quantity - 1)
                      }
                      android_ripple={{ color: Colors.white, borderless: true }}
                    >
                      <Minus size={16} color={Colors.white} />
                    </Pressable>
                    <Text style={styles.quantityText}>{item.quantity}</Text>
                    <Pressable
                      style={styles.quantityButton}
                      onPress={() =>
                        updateCartItemQuantity(item.id, item.quantity + 1)
                      }
                      android_ripple={{ color: Colors.white, borderless: true }}
                    >
                      <Plus size={16} color={Colors.white} />
                    </Pressable>
                  </View>
                  <Pressable
                    style={styles.deleteButton}
                    onPress={() => removeFromCart(item.id)}
                  >
                    <Trash2 size={18} color={Colors.primary} />
                  </Pressable>
                </View>
              </View>
            ))}

            <TouchableOpacity
              style={styles.addMoreButton}
              onPress={() => router.push("/")}
            >
              <Plus size={20} color={Colors.primary} />
              <Text style={styles.addMoreText}>Add more items</Text>
            </TouchableOpacity>

            <View style={styles.couponSection}>
              <View style={styles.couponHeader}>
                <View style={styles.couponHeaderLeft}>
                  <Ticket size={20} color={Colors.primary} />
                  <Text style={styles.couponTitle}>Apply Coupon</Text>
                </View>
                <TouchableOpacity
                  onPress={() => setShowCouponInput(!showCouponInput)}
                >
                  <Text style={styles.couponAction}>
                    {showCouponInput ? "Cancel" : "View"}
                  </Text>
                </TouchableOpacity>
              </View>
              {showCouponInput && (
                <View style={styles.couponInputContainer}>
                  <View style={styles.couponInput}>
                    <Tag size={18} color={Colors.gray} />
                    <Text style={styles.couponInputText}>
                      Enter coupon code
                    </Text>
                  </View>
                  <TouchableOpacity style={styles.applyCouponButton}>
                    <Text style={styles.applyCouponText}>Apply</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            <View style={styles.billDetails}>
              <Text style={styles.billTitle}>Bill Details</Text>
              <View style={styles.billRow}>
                <Text style={styles.billLabel}>Item Total</Text>
                <Text style={styles.billValue}>Rs. {cartTotal}</Text>
              </View>
              <View style={styles.billRow}>
                <Text style={styles.billLabel}>Delivery Fee</Text>
                <Text style={styles.billValue}>Rs. {deliveryFee}</Text>
              </View>
              <View style={[styles.billRow, styles.billRowTotal]}>
                <Text style={styles.billLabelTotal}>To Pay</Text>
                <Text style={styles.billValueTotal}>Rs. {finalTotal}</Text>
              </View>
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <View style={styles.footerContent}>
              <View style={styles.totalFooter}>
                <Text style={styles.footerLabel}>Total Amount</Text>
                <Text style={styles.footerTotal}>Rs. {finalTotal}</Text>
              </View>
              <TouchableOpacity
                style={styles.checkoutButton}
                onPress={() => router.push("/checkout")}
                activeOpacity={0.8}
              >
                <Text style={styles.checkoutButtonText}>
                  Proceed to Checkout
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderGray,
  },
  backButton: {
    padding: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold" as const,
    color: Colors.black,
  },
  content: {
    flex: 1,
    backgroundColor: Colors.lightGray,
  },
  restaurantInfo: {
    flexDirection: "row",
    padding: 16,
    alignItems: "center",
    backgroundColor: Colors.white,
    marginBottom: 8,
    elevation: 1,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  restaurantLogo: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  restaurantDetails: {
    marginLeft: 12,
    flex: 1,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: Colors.black,
    marginBottom: 4,
  },
  restaurantMeta: {
    fontSize: 12,
    color: Colors.gray,
  },
  cartItem: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: Colors.white,
    marginBottom: 1,
    alignItems: "flex-start",
  },
  itemImage: {
    width: 90,
    height: 90,
    borderRadius: 12,
  },
  itemInfo: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },
  itemMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 6,
  },
  itemName: {
    fontSize: 15,
    fontWeight: "600" as const,
    color: Colors.black,
  },
  vegBadge: {
    borderWidth: 1,
    borderColor: "#10B981",
    width: 16,
    height: 16,
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  vegDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#10B981",
  },
  itemPrice: {
    fontSize: 15,
    fontWeight: "bold" as const,
    color: Colors.black,
  },
  quantityControls: {
    alignItems: "center",
    gap: 10,
  },
  quantityButton: {
    padding: 4,
  },
  deleteButton: {
    padding: 8,
  },
  quantityDisplay: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.primary,
    borderRadius: 24,
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 10,
    elevation: 2,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  quantityText: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: "bold" as const,
    minWidth: 24,
    textAlign: "center",
  },
  addMoreButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    gap: 8,
    backgroundColor: Colors.white,
    marginBottom: 8,
  },
  addMoreText: {
    fontSize: 15,
    fontWeight: "600" as const,
    color: Colors.primary,
  },
  couponSection: {
    backgroundColor: Colors.white,
    padding: 16,
    marginBottom: 8,
  },
  couponHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  couponHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  couponTitle: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: Colors.black,
  },
  couponAction: {
    fontSize: 14,
    fontWeight: "600" as const,
    color: Colors.primary,
  },
  couponInputContainer: {
    flexDirection: "row",
    gap: 12,
    marginTop: 12,
  },
  couponInput: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: Colors.lightGray,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  couponInputText: {
    fontSize: 14,
    color: Colors.gray,
  },
  applyCouponButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    justifyContent: "center",
  },
  applyCouponText: {
    fontSize: 14,
    fontWeight: "600" as const,
    color: Colors.white,
  },
  billDetails: {
    backgroundColor: Colors.white,
    padding: 16,
    marginBottom: 8,
  },
  billTitle: {
    fontSize: 16,
    fontWeight: "700" as const,
    color: Colors.black,
    marginBottom: 12,
  },
  billRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  billLabel: {
    fontSize: 14,
    color: Colors.gray,
  },
  billValue: {
    fontSize: 14,
    color: Colors.black,
    fontWeight: "500" as const,
  },
  billRowTotal: {
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.borderGray,
  },
  billLabelTotal: {
    fontSize: 16,
    fontWeight: "700" as const,
    color: Colors.black,
  },
  billValueTotal: {
    fontSize: 16,
    fontWeight: "700" as const,
    color: Colors.primary,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.white,
    paddingBottom: 80,
    elevation: 8,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  footerContent: {
    padding: 16,
  },
  totalFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  footerLabel: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: Colors.black,
  },
  footerTotal: {
    fontSize: 22,
    fontWeight: "bold" as const,
    color: Colors.primary,
  },
  checkoutButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 28,
    alignItems: "center",
    elevation: 4,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  checkoutButtonText: {
    color: Colors.white,
    fontSize: 17,
    fontWeight: "bold" as const,
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  emptyIcon: {
    fontSize: 80,
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 18,
    color: Colors.gray,
    marginBottom: 24,
    textAlign: "center",
  },
  shopButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 28,
    elevation: 2,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  shopButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "bold" as const,
  },
});

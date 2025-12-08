import Colors from "@/constants/color";
import { restaurants } from "@/mocks/restaurents";
import { useApp } from "@/providers/AppProvider";
import { Stack, useRouter } from "expo-router";
import {
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  MapPin,
} from "lucide-react-native";
import { useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type PaymentMethod = "esewa" | "khalti" | "visa" | "pay-half" | "cash";

const paymentMethods = [
  {
    id: "esewa" as const,
    name: "eSewa",
    logo: "https://esewa.com.np/common/images/esewa_og.jpg",
    description: "Want quicker delivery? Choose online payment",
  },
  {
    id: "khalti" as const,
    name: "Khalti",
    logo: "https://khalti.com/static/khalti-logo.png",
    description: "Want quicker delivery? Choose online payment",
  },
  {
    id: "visa" as const,
    name: "Visa/Mastercard",
    logo: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100&h=60&fit=crop",
    description: "Want quicker delivery? Choose online payment",
  },
  {
    id: "pay-half" as const,
    name: "Pay Half Amount",
    logo: null,
    description: "Pay half now, rest on delivery",
  },
  {
    id: "cash" as const,
    name: "Cash on Delivery",
    logo: null,
    description: null,
  },
];

export default function CheckoutScreen() {
  const router = useRouter();
  const { cart, cartTotal } = useApp();
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>("cash");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [changeAmount, setChangeAmount] = useState("");
  const [deliveryAddress] = useState(
    "P8F6+7FW, Rayamajhi Marga, Kathmandu 44600, Nepal"
  );

  const deliveryFee = 99;
  const finalTotal = cartTotal + deliveryFee;

  const handlePlaceOrder = () => {
    console.log("Order placed with payment method:", selectedPayment);
    console.log("Change amount:", changeAmount);
  };

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
        <Text style={styles.title}>Checkout</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        {cart.length > 0 && (
          <View style={styles.restaurantCard}>
            <Image
              source={{ uri: restaurants[0].logo }}
              style={styles.restaurantLogo}
            />
            <View style={styles.restaurantInfo}>
              <Text style={styles.restaurantName}>
                {cart[0].restaurantName}
              </Text>
              <Text style={styles.restaurantMeta}>
                ★ 3.8 (25+) • 55-60 min (2.00 km)
              </Text>
            </View>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Address</Text>
          <TouchableOpacity style={styles.addressCard}>
            <MapPin size={20} color={Colors.primary} />
            <View style={styles.addressContent}>
              <Text style={styles.addressLabel}>Home</Text>
              <Text style={styles.addressText}>{deliveryAddress}</Text>
            </View>
            <ChevronDown size={20} color={Colors.gray} />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Option</Text>
          <View style={styles.deliveryOptionCard}>
            <View style={styles.radioOuter}>
              <View style={styles.radioInner} />
            </View>
            <View style={styles.deliveryOptionContent}>
              <Text style={styles.deliveryOptionTitle}>Home Delivery</Text>
              <Text style={styles.deliveryOptionCharge}>
                Charge: +Rs. {deliveryFee}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <TouchableOpacity
            style={styles.paymentSelectCard}
            onPress={() => setShowPaymentModal(true)}
          >
            <Text style={styles.paymentSelectText}>Choose Payment Method</Text>
            <ChevronDown size={20} color={Colors.gray} />
          </TouchableOpacity>

          {selectedPayment && (
            <View style={styles.selectedPaymentCard}>
              <CheckCircle2 size={20} color={Colors.primary} />
              <Text style={styles.selectedPaymentText}>
                {paymentMethods.find((p) => p.id === selectedPayment)?.name}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bill Details</Text>
          <View style={styles.billCard}>
            <View style={styles.billRow}>
              <Text style={styles.billLabel}>Item Total</Text>
              <Text style={styles.billValue}>Rs. {cartTotal}</Text>
            </View>
            <View style={styles.billRow}>
              <Text style={styles.billLabel}>Delivery Fee</Text>
              <Text style={styles.billValue}>Rs. {deliveryFee}</Text>
            </View>
            <View style={[styles.billRow, styles.billRowTotal]}>
              <Text style={styles.billLabelTotal}>Total Bill</Text>
              <Text style={styles.billValueTotal}>Rs. {finalTotal}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.footerContent}>
          <View>
            <Text style={styles.footerLabel}>Total Bill</Text>
            <Text style={styles.footerTotal}>Rs. {finalTotal}</Text>
          </View>
          <TouchableOpacity
            style={styles.placeOrderButton}
            onPress={handlePlaceOrder}
            activeOpacity={0.8}
          >
            <Text style={styles.placeOrderButtonText}>Place Order</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        visible={showPaymentModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowPaymentModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>Choose Payment Method</Text>

            <Text style={styles.modalTotalLabel}>Total Bill</Text>
            <Text style={styles.modalTotal}>Rs. {finalTotal}</Text>

            <Text style={styles.onlinePaymentNote}>
              Want quicker delivery? Choose online payment
            </Text>

            <ScrollView style={styles.paymentMethodsList}>
              {paymentMethods.slice(0, 3).map((method) => (
                <TouchableOpacity
                  key={method.id}
                  style={styles.paymentMethodItem}
                  onPress={() => setSelectedPayment(method.id)}
                >
                  <View style={styles.paymentMethodIcon}>
                    {method.logo && (
                      <Image
                        source={{ uri: method.logo }}
                        style={styles.paymentLogo}
                      />
                    )}
                  </View>
                  <Text style={styles.paymentMethodName}>{method.name}</Text>
                  <View
                    style={[
                      styles.radioOuterModal,
                      selectedPayment === method.id &&
                        styles.radioOuterSelected,
                    ]}
                  >
                    {selectedPayment === method.id && (
                      <View style={styles.radioInnerModal} />
                    )}
                  </View>
                </TouchableOpacity>
              ))}

              <TouchableOpacity
                style={styles.paymentMethodItem}
                onPress={() => setSelectedPayment("pay-half")}
              >
                <Text style={styles.paymentMethodName}>Pay Half Amount</Text>
                <View
                  style={[
                    styles.radioOuterModal,
                    selectedPayment === "pay-half" && styles.radioOuterSelected,
                  ]}
                >
                  {selectedPayment === "pay-half" && (
                    <View style={styles.radioInnerModal} />
                  )}
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.paymentMethodItem, styles.codItem]}
                onPress={() => setSelectedPayment("cash")}
              >
                <Text style={styles.paymentMethodName}>Cash on Delivery</Text>
                <View
                  style={[
                    styles.radioOuterModal,
                    selectedPayment === "cash" && styles.radioOuterSelected,
                  ]}
                >
                  {selectedPayment === "cash" && (
                    <View style={styles.radioInnerModal} />
                  )}
                </View>
              </TouchableOpacity>

              {selectedPayment === "cash" && (
                <View style={styles.changeAmountSection}>
                  <Text style={styles.changeAmountLabel}>
                    Change Amount (Rs.)
                  </Text>
                  <Text style={styles.changeAmountHint}>
                    Add cash amount for change
                  </Text>
                  <TextInput
                    style={styles.changeAmountInput}
                    placeholder="Amount"
                    placeholderTextColor={Colors.gray}
                    value={changeAmount}
                    onChangeText={setChangeAmount}
                    keyboardType="numeric"
                  />
                </View>
              )}

              <TouchableOpacity style={styles.seeLessButton}>
                <Text style={styles.seeLessText}>See Less</Text>
              </TouchableOpacity>
            </ScrollView>

            <TouchableOpacity
              style={styles.selectButton}
              onPress={() => setShowPaymentModal(false)}
            >
              <Text style={styles.selectButtonText}>Select</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightGray,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: Colors.white,
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
  },
  restaurantCard: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderGray,
    alignItems: "center",
  },
  restaurantLogo: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  restaurantInfo: {
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
  section: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700" as const,
    color: Colors.black,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  addressCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
  },
  addressContent: {
    flex: 1,
  },
  addressLabel: {
    fontSize: 15,
    fontWeight: "600" as const,
    color: Colors.black,
    marginBottom: 4,
  },
  addressText: {
    fontSize: 13,
    color: Colors.gray,
  },
  deliveryOptionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: Colors.primary,
    marginHorizontal: 16,
    borderRadius: 12,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.primary,
  },
  deliveryOptionContent: {
    flex: 1,
  },
  deliveryOptionTitle: {
    fontSize: 15,
    fontWeight: "600" as const,
    color: Colors.black,
    marginBottom: 2,
  },
  deliveryOptionCharge: {
    fontSize: 13,
    color: Colors.gray,
  },
  paymentSelectCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginHorizontal: 16,
    borderRadius: 12,
  },
  paymentSelectText: {
    fontSize: 15,
    color: Colors.gray,
  },
  selectedPaymentCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 16,
    marginTop: 8,
    borderRadius: 12,
    gap: 10,
  },
  selectedPaymentText: {
    fontSize: 15,
    fontWeight: "600" as const,
    color: Colors.black,
  },
  billCard: {
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  billRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
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
    backgroundColor: Colors.white,
    paddingBottom: 20,
    elevation: 8,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  footerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  footerLabel: {
    fontSize: 14,
    color: Colors.gray,
    marginBottom: 4,
  },
  footerTotal: {
    fontSize: 22,
    fontWeight: "bold" as const,
    color: Colors.primary,
  },
  placeOrderButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 28,
    elevation: 4,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  placeOrderButtonText: {
    color: Colors.white,
    fontSize: 17,
    fontWeight: "bold" as const,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 8,
    paddingHorizontal: 20,
    paddingBottom: 32,
    maxHeight: "85%",
  },
  modalHandle: {
    width: 40,
    height: 4,
    backgroundColor: Colors.borderGray,
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold" as const,
    color: Colors.black,
    textAlign: "center",
    marginBottom: 20,
  },
  modalTotalLabel: {
    fontSize: 14,
    color: Colors.gray,
    textAlign: "center",
    marginBottom: 4,
  },
  modalTotal: {
    fontSize: 28,
    fontWeight: "bold" as const,
    color: Colors.primary,
    textAlign: "center",
    marginBottom: 24,
  },
  onlinePaymentNote: {
    fontSize: 14,
    fontWeight: "600" as const,
    color: Colors.black,
    marginBottom: 16,
  },
  paymentMethodsList: {
    maxHeight: 400,
  },
  paymentMethodItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderGray,
  },
  paymentMethodIcon: {
    width: 50,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  paymentLogo: {
    width: 50,
    height: 30,
    resizeMode: "contain",
  },
  paymentMethodName: {
    flex: 1,
    fontSize: 15,
    color: Colors.black,
  },
  radioOuterModal: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: Colors.gray,
    justifyContent: "center",
    alignItems: "center",
  },
  radioOuterSelected: {
    borderColor: Colors.primary,
  },
  radioInnerModal: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.primary,
  },
  codItem: {
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginTop: 12,
  },
  changeAmountSection: {
    marginTop: 16,
    marginBottom: 8,
  },
  changeAmountLabel: {
    fontSize: 15,
    fontWeight: "600" as const,
    color: Colors.black,
    marginBottom: 4,
  },
  changeAmountHint: {
    fontSize: 13,
    color: Colors.gray,
    marginBottom: 12,
  },
  changeAmountInput: {
    borderWidth: 1,
    borderColor: Colors.borderGray,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: Colors.black,
  },
  seeLessButton: {
    paddingVertical: 16,
    alignItems: "center",
  },
  seeLessText: {
    fontSize: 15,
    color: Colors.primary,
    fontWeight: "600" as const,
  },
  selectButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 28,
    alignItems: "center",
    marginTop: 20,
    elevation: 4,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  selectButtonText: {
    color: Colors.white,
    fontSize: 17,
    fontWeight: "bold" as const,
  },
});

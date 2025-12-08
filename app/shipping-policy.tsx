import Colors from "@/constants/color";
import { Stack, useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ShippingPolicyScreen() {
  const router = useRouter();

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
        <Text style={styles.title}>Shipping Policy</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        <View style={styles.updatedInfo}>
          <Text style={styles.updatedText}>
            Updated Date: 25th Nov-2024, Time: 10:00 PM
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Shipping Policy for BhojMandu</Text>

        <Text style={styles.paragraph}>
          At BhojMandu, we prioritize delivering your orders efficiently and
          reliably. The following terms outline our shipping policy for a
          seamless delivery experience:
        </Text>

        <Text style={styles.heading}>1. Delivery Services</Text>
        <Text style={styles.paragraph}>
          BhojMandu ensures prompt and professional food delivery services,
          aiming to meet the expectations of our users.
        </Text>

        <Text style={styles.heading}>2. Delivery Areas</Text>
        <Text style={styles.paragraph}>
          We currently provide delivery services within designated geographic
          regions. Users can verify service availability in their area by
          entering the delivery address on the BhojMandu app.
        </Text>

        <Text style={styles.heading}>3. Order Processing Time</Text>
        <Text style={styles.paragraph}>
          Orders are processed immediately upon confirmation. Estimated delivery
          times are displayed during order placement and may vary based on
          factors such as distance, traffic, and restaurant preparation time.
        </Text>

        <Text style={styles.heading}>4. Delivery Partners</Text>
        <Text style={styles.paragraph}>
          To fulfill food orders, BhojMandu collaborates with reliable delivery
          partners. While we strive to meet delivery timelines, certain factors
          like traffic, weather, or restaurant delays may affect schedules.
        </Text>

        <Text style={styles.heading}>5. Delivery Confirmation</Text>
        <Text style={styles.paragraph}>
          Delivery is deemed complete once the order is handed over to the user
          at the specified delivery address. Users are encouraged to verify
          their orders upon receipt and immediately inform customer support in
          case of any issues.
        </Text>

        <Text style={styles.heading}>6. Delivery Charges</Text>
        <Text style={styles.paragraph}>
          Delivery charges vary based on distance, order value, and promotional
          offers. The exact delivery fee will be displayed at checkout before
          order confirmation.
        </Text>

        <Text style={styles.heading}>7. Failed Deliveries</Text>
        <Text style={styles.paragraph}>
          In cases where delivery cannot be completed due to:
        </Text>
        <View style={styles.bulletPoints}>
          <Text style={styles.bulletPoint}>
            • Incorrect or incomplete address provided by the user
          </Text>
          <Text style={styles.bulletPoint}>
            • User unavailability at the delivery location
          </Text>
          <Text style={styles.bulletPoint}>• Refusal to accept the order</Text>
        </View>
        <Text style={styles.paragraph}>
          The order will be marked as undelivered. BhojMandu reserves the right
          to charge for the delivery attempt, and no refunds will be issued for
          such cases.
        </Text>

        <Text style={styles.heading}>8. Order Tracking</Text>
        <Text style={styles.paragraph}>
          Users can track their orders in real-time through the BhojMandu app.
          Notifications will be sent at key milestones, including order
          confirmation, preparation, dispatch, and delivery.
        </Text>

        <Text style={styles.heading}>9. Special Instructions</Text>
        <Text style={styles.paragraph}>
          Users may provide special delivery instructions (e.g., gate codes,
          landmark details) at checkout. While we strive to follow these
          instructions, BhojMandu cannot guarantee compliance in all cases.
        </Text>

        <Text style={styles.heading}>10. Contactless Delivery</Text>
        <Text style={styles.paragraph}>
          For safety and convenience, BhojMandu offers contactless delivery
          options. Orders will be left at the specified location (e.g.,
          doorstep), and users will be notified upon delivery.
        </Text>

        <Text style={styles.heading}>11. Damaged or Missing Items</Text>
        <Text style={styles.paragraph}>
          If you receive a damaged or incomplete order, please contact our
          customer support team immediately with relevant details and photos. We
          will investigate and resolve the issue promptly.
        </Text>

        <Text style={styles.heading}>12. Delays and Exceptions</Text>
        <Text style={styles.paragraph}>
          BhojMandu is not liable for delays caused by factors beyond our
          control, including but not limited to:
        </Text>
        <View style={styles.bulletPoints}>
          <Text style={styles.bulletPoint}>• Extreme weather conditions</Text>
          <Text style={styles.bulletPoint}>• Traffic congestion</Text>
          <Text style={styles.bulletPoint}>
            • Restaurant preparation delays
          </Text>
          <Text style={styles.bulletPoint}>• Technical issues</Text>
        </View>
        <Text style={styles.paragraph}>
          In such cases, users will be notified of any significant delays.
        </Text>

        <Text style={styles.heading}>13. Customer Support</Text>
        <Text style={styles.paragraph}>
          For questions or concerns about deliveries, please reach out to us:
        </Text>
        <View style={styles.contactInfo}>
          <Text style={styles.contactText}>Email: support@bhojmandu.com</Text>
          <Text style={styles.contactText}>Phone: +977 9744318379</Text>
          <Text style={styles.contactText}>
            Operating Hours: 9:00 AM - 9:00 PM (Daily)
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            By using BhojMandu, you acknowledge and agree to this Shipping
            Policy. We are committed to providing a reliable and efficient
            delivery experience.
          </Text>
        </View>
      </ScrollView>
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
    paddingHorizontal: 20,
    backgroundColor: Colors.white,
  },
  updatedInfo: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderGray,
    marginBottom: 20,
  },
  updatedText: {
    fontSize: 13,
    color: Colors.gray,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: Colors.black,
    marginBottom: 16,
  },
  heading: {
    fontSize: 16,
    fontWeight: "700" as const,
    color: Colors.black,
    marginTop: 24,
    marginBottom: 12,
  },
  paragraph: {
    fontSize: 14,
    color: "#444",
    lineHeight: 22,
    marginBottom: 12,
  },
  bulletPoints: {
    marginLeft: 8,
    marginBottom: 12,
  },
  bulletPoint: {
    fontSize: 14,
    color: "#444",
    lineHeight: 22,
    marginBottom: 6,
  },
  contactInfo: {
    marginTop: 8,
    marginLeft: 8,
    marginBottom: 16,
  },
  contactText: {
    fontSize: 14,
    color: Colors.primary,
    marginBottom: 4,
  },
  footer: {
    marginTop: 24,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.borderGray,
  },
  footerText: {
    fontSize: 14,
    color: "#444",
    lineHeight: 22,
    fontStyle: "italic",
  },
});

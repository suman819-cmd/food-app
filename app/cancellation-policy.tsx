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

export default function CancellationPolicyScreen() {
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
        <Text style={styles.title}>Cancellation Policy</Text>
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

        <Text style={styles.sectionTitle}>
          Cancellation Policy for BhojMandu
        </Text>

        <Text style={styles.paragraph}>
          At BhojMandu, we are committed to delivering a reliable and
          satisfactory experience to our users. Below are the terms and
          conditions governing order cancellations:
        </Text>

        <Text style={styles.heading}>1. Order Cancellation by BhojMandu</Text>
        <View style={styles.bulletPoints}>
          <Text style={styles.bulletPoint}>
            • BhojMandu reserves the right to refuse or cancel any transaction
            or order under the following circumstances:
          </Text>
          <View style={styles.nestedBullets}>
            <Text style={styles.nestedBullet}>
              ○ The listed price or service details are incorrect.
            </Text>
            <Text style={styles.nestedBullet}>
              ○ The restaurant or service provider is unable to fulfill the
              order due to unavailability.
            </Text>
            <Text style={styles.nestedBullet}>
              ○ The user&apos;s delivery address is outside the designated
              service areas supported by BhojMandu.
            </Text>
          </View>
          <Text style={styles.bulletPoint}>
            • If a payment has already been processed in such cases, the amount
            will be refunded to the original payment method.
          </Text>
        </View>

        <Text style={styles.heading}>2. User-Initiated Cancellations</Text>
        <View style={styles.bulletPoints}>
          <Text style={styles.bulletPoint}>
            • Once an order has been placed,{" "}
            <Text style={styles.bold}>
              BhojMandu does not accept user-initiated cancellation requests
            </Text>
            .
          </Text>
          <Text style={styles.bulletPoint}>
            • However, if a cancellation request is made{" "}
            <Text style={styles.bold}>
              before the order is processed by the restaurant
            </Text>
            , it will be reviewed and approved at the sole discretion of
            BhojMandu.
          </Text>
        </View>

        <Text style={styles.heading}>
          3. Delivery Policy Related to Cancellations
        </Text>
        <View style={styles.bulletPoints}>
          <Text style={styles.bulletPoint}>
            • Ownership and risk of the order transfer to the user upon delivery
            and acceptance at the specified address.
          </Text>
          <Text style={styles.bulletPoint}>
            • BhojMandu ensures delivery to the correct address provided by the
            user but cannot be held responsible for:
          </Text>
          <View style={styles.nestedBullets}>
            <Text style={styles.nestedBullet}>
              ○ Incorrect or incomplete addresses supplied by the user.
            </Text>
            <Text style={styles.nestedBullet}>
              ○ Claims by unauthorized individuals at the delivery location.
            </Text>
          </View>
          <Text style={styles.bulletPoint}>
            • BhojMandu reserves the right to provide an alternate or similar
            order in situations beyond its control, and such actions are not
            grounds for order cancellation or refunds.
          </Text>
        </View>

        <Text style={styles.heading}>4. Refund Process</Text>
        <View style={styles.bulletPoints}>
          <Text style={styles.bulletPoint}>
            • Refunds for canceled orders (where applicable) will be processed
            within 5-7 business days.
          </Text>
          <Text style={styles.bulletPoint}>
            • Refunds will be credited to the original payment method used
            during the transaction.
          </Text>
          <Text style={styles.bulletPoint}>
            • For cash on delivery (COD) orders, no refund is applicable if the
            order has been delivered and accepted.
          </Text>
        </View>

        <Text style={styles.heading}>5. Force Majeure</Text>
        <Text style={styles.paragraph}>
          BhojMandu is not liable for delays or cancellations caused by
          unforeseen circumstances such as natural disasters, extreme weather
          conditions, strikes, or other events beyond reasonable control. In
          such cases, users will be notified promptly, and refunds will be
          processed if applicable.
        </Text>

        <Text style={styles.heading}>6. Customer Support</Text>
        <Text style={styles.paragraph}>
          For any queries or issues related to cancellations, please contact us:
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
            By placing an order with BhojMandu, you acknowledge and agree to
            this Cancellation Policy.
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
  bold: {
    fontWeight: "600" as const,
    color: Colors.black,
  },
  bulletPoints: {
    marginLeft: 8,
    marginBottom: 12,
  },
  bulletPoint: {
    fontSize: 14,
    color: "#444",
    lineHeight: 22,
    marginBottom: 8,
  },
  nestedBullets: {
    marginLeft: 16,
    marginTop: 4,
  },
  nestedBullet: {
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

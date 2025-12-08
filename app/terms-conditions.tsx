import Colors from "@/constants/color";
import { Stack, useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TermsConditionsScreen() {
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
        <Text style={styles.title}>Terms & Conditions</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        <View style={styles.updatedInfo}>
          <Text style={styles.updatedText}>
            Updated Date: 7th Jan-2025, Time: 19:30 PM
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Users&apos; Terms & Conditions</Text>

        <Text style={styles.paragraph}>
          Welcome to Foodapp! Before using our services, please read and
          understand these{" "}
          <Text style={styles.bold}>User Terms and Conditions</Text>. By
          accessing our website (
          <Text
            style={styles.link}
            onPress={() => Linking.openURL("https://foodapp.com")}
          >
            https://foodapp.com
          </Text>
          ) or using the FoodApp Food Delivery App, you agree to comply with
          these terms. If you do not agree, refrain from using our services.
        </Text>

        <Text style={styles.heading}>1. User Conduct</Text>
        <Text style={styles.paragraph}>
          When using FoodApp, you agree to:
        </Text>
        <View style={styles.bulletPoints}>
          <Text style={styles.bulletPoint}>
            • Abide by all applicable laws and regulations.
          </Text>
          <Text style={styles.bulletPoint}>
            • Respect the rights of others.
          </Text>
          <Text style={styles.bulletPoint}>
            • Refrain from activities that disrupt the proper functioning of our
            services.
          </Text>
        </View>

        <Text style={styles.heading}>2. Account Registration</Text>
        <View style={styles.bulletPoints}>
          <Text style={styles.bulletPoint}>
            • You may need to register an account to access certain features.
          </Text>
          <Text style={styles.bulletPoint}>
            • Provide accurate and complete information during registration.
          </Text>
          <Text style={styles.bulletPoint}>
            • You are responsible for maintaining the confidentiality of your
            account credentials.
          </Text>
        </View>

        <Text style={styles.heading}>3. Placing Orders</Text>
        <View style={styles.bulletPoints}>
          <Text style={styles.bulletPoint}>
            • Ensure all order details, including delivery address and contact
            information, are accurate.
          </Text>
          <Text style={styles.bulletPoint}>
            • Report any discrepancies or issues promptly to Foodapp.
          </Text>
        </View>

        <Text style={styles.heading}>
          4. Details We Collect and Their Purpose
        </Text>
        <Text style={styles.paragraph}>
          When you use the food app, we collect certain details to provide
          and enhance our services effectively. The details we collect and their
          purposes are as follows:
        </Text>

        <Text style={styles.subheading}>Personal Information:</Text>
        <View style={styles.bulletPoints}>
          <Text style={styles.bulletPoint}>
            • Name: To personalize your experience.
          </Text>
          <Text style={styles.bulletPoint}>
            • Contact Number: To communicate order updates and delivery details.
          </Text>
          <Text style={styles.bulletPoint}>
            • Email Address: For account verification and promotional
            communications.
          </Text>
        </View>

        <Text style={styles.subheading}>Order Information:</Text>
        <View style={styles.bulletPoints}>
          <Text style={styles.bulletPoint}>
            • Order History: To track past orders and provide personalized
            recommendations.
          </Text>
          <Text style={styles.bulletPoint}>
            • Preferences: To understand your food preferences and improve
            recommendations.
          </Text>
        </View>

        <Text style={styles.subheading}>Location Data:</Text>
        <View style={styles.bulletPoints}>
          <Text style={styles.bulletPoint}>
            • Delivery Address: To ensure accurate and timely delivery.
          </Text>
          <Text style={styles.bulletPoint}>
            • GPS Data (if enabled): To provide location-based services and
            optimize delivery routes.
          </Text>
        </View>

        <Text style={styles.subheading}>Payment Information:</Text>
        <View style={styles.bulletPoints}>
          <Text style={styles.bulletPoint}>
            • Transaction Details: To process payments securely and maintain
            order records.
          </Text>
        </View>

        <Text style={styles.heading}>5. Privacy and Data Security</Text>
        <Text style={styles.paragraph}>
          We value your privacy and are committed to protecting your data. All
          information collected is handled in accordance with our Privacy
          Policy. We use secure methods to store and process your data and do
          not share your personal information with third parties without your
          consent, except as required by law.
        </Text>

        <Text style={styles.heading}>6. Payment Terms</Text>
        <View style={styles.bulletPoints}>
          <Text style={styles.bulletPoint}>
            • Payments can be made through various methods, including online
            payment gateways and cash on delivery.
          </Text>
          <Text style={styles.bulletPoint}>
            • Ensure sufficient funds or cash are available at the time of order
            placement or delivery.
          </Text>
          <Text style={styles.bulletPoint}>
            • Foodapp is not responsible for payment failures due to bank or
            payment gateway issues.
          </Text>
        </View>

        <Text style={styles.heading}>7. Refunds and Cancellations</Text>
        <Text style={styles.paragraph}>
          Refunds and cancellations are subject to our Cancellation Policy.
          Please refer to the policy for detailed terms.
        </Text>

        <Text style={styles.heading}>8. Limitation of Liability</Text>
        <Text style={styles.paragraph}>
          Foodapp is not liable for any indirect, incidental, or consequential
          damages arising from the use of our services. This includes, but is
          not limited to, delays caused by external factors, incorrect
          information provided by users, or issues beyond our control.
        </Text>

        <Text style={styles.heading}>9. Modifications to Terms</Text>
        <Text style={styles.paragraph}>
          Foodapp reserves the right to modify these terms and conditions at
          any time. Users will be notified of significant changes, and continued
          use of our services constitutes acceptance of the updated terms.
        </Text>

        <Text style={styles.heading}>10. Contact Us</Text>
        <Text style={styles.paragraph}>
          For questions or concerns regarding these terms, please contact us at:
        </Text>
        <View style={styles.contactInfo}>
          <Text style={styles.contactText}>Email: support@foodapp.com</Text>
          <Text style={styles.contactText}>Phone: +977 9744318379</Text>
        </View>

        <Text style={styles.footerText}>
          By using Foodapp, you acknowledge that you have read, understood,
          and agreed to these Terms and Conditions.
        </Text>
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
  subheading: {
    fontSize: 15,
    fontWeight: "600" as const,
    color: Colors.black,
    marginTop: 16,
    marginBottom: 8,
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
  link: {
    color: Colors.primary,
    textDecorationLine: "underline",
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
  },
  contactText: {
    fontSize: 14,
    color: Colors.primary,
    marginBottom: 4,
  },
  footerText: {
    fontSize: 14,
    color: "#444",
    lineHeight: 22,
    marginTop: 24,
    fontStyle: "italic",
  },
});

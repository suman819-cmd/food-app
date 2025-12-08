// app/helpsupport.tsx
import React from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  Linking, 
  TouchableOpacity, 
  StyleSheet,
  Alert 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { ChevronLeft, Phone, Mail, MapPin } from 'lucide-react-native';
import Colors from '@/constants/color';

export default function HelpSupportScreen() {
  const router = useRouter();

  // Safe navigation function
  const navigateBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      // Fallback to home
      router.replace('/(tabs)/(home)');
    }
  };

  const handlePhoneCall = () => {
    Linking.openURL('tel:+9779813104240');
  };

  const handleEmail = () => {
    Linking.openURL('mailto:support@bhojmandu.com');
  };

  const handleAddress = async () => {
    const address = 'China Town Rd 35, Kathmandu 44600, Nepal';
    const url = `https://maps.google.com/?q=${encodeURIComponent(address)}`;
    
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', 'Unable to open maps app');
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to open maps app');
    }
  };

  return (
    <>
      <Stack.Screen 
        options={{
          headerShown: false,
        }} 
      />
      
      <View style={styles.container}>
        {/* Custom Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={navigateBack} style={styles.backButton}>
            <ChevronLeft size={28} color={Colors.black} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Help & Support</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Header Section */}
          <View style={styles.heroSection}>
            <View style={styles.heroIcon}>
              <Ionicons name="help-circle" size={40} color={Colors.primary} />
            </View>
            <Text style={styles.title}>How can we help you?</Text>
            <Text style={styles.subtitle}>
              We are here to help! Contact our support team for solutions, answers to your queries and concerns.
            </Text>
          </View>

          {/* Contact Cards Section */}
          <View style={styles.cardsContainer}>
            {/* Phone Card */}
            <TouchableOpacity style={styles.contactCard} onPress={handlePhoneCall}>
              <View style={[styles.cardIcon, { backgroundColor: '#FFE6E6' }]}>
                <Phone size={24} color={Colors.primary} />
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>Call Support</Text>
                <Text style={styles.cardDescription}>
                  Talk directly with our customer support executive
                </Text>
                <Text style={styles.cardValue}>+977 9813104240</Text>
              </View>
              <View style={styles.cardArrow}>
                <Ionicons name="chevron-forward" size={20} color={Colors.gray} />
              </View>
            </TouchableOpacity>

            {/* Email Card */}
            <TouchableOpacity style={styles.contactCard} onPress={handleEmail}>
              <View style={[styles.cardIcon, { backgroundColor: '#E6F3FF' }]}>
                <Mail size={24} color={Colors.primary} />
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>Email Support</Text>
                <Text style={styles.cardDescription}>
                  Send us an email and get response within 2 hours
                </Text>
                <Text style={styles.cardValue}>support@foodapp.com</Text>
              </View>
              <View style={styles.cardArrow}>
                <Ionicons name="chevron-forward" size={20} color={Colors.gray} />
              </View>
            </TouchableOpacity>

            {/* Address Card */}
            <TouchableOpacity style={styles.contactCard} onPress={handleAddress}>
              <View style={[styles.cardIcon, { backgroundColor: '#E6FFE6' }]}>
                <MapPin size={24} color={Colors.primary} />
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>Visit Us</Text>
                <Text style={styles.cardDescription}>
                  Find our physical location and visit us
                </Text>
                <Text style={styles.cardValue} numberOfLines={2}>
                  China Town Rd 35, Kathmandu 44600, Nepal
                </Text>
              </View>
              <View style={styles.cardArrow}>
                <Ionicons name="chevron-forward" size={20} color={Colors.gray} />
              </View>
            </TouchableOpacity>
          </View>

          {/* FAQ Section */}
          <View style={styles.faqSection}>
            <Text style={styles.faqTitle}>Frequently Asked Questions</Text>
            
            <View style={styles.faqItem}>
              <View style={styles.faqQuestion}>
                <Text style={styles.faqQuestionText}>How do I track my order?</Text>
                <Ionicons name="chevron-down" size={20} color={Colors.gray} />
              </View>
            </View>

            <View style={styles.faqItem}>
              <View style={styles.faqQuestion}>
                <Text style={styles.faqQuestionText}>What are your delivery hours?</Text>
                <Ionicons name="chevron-down" size={20} color={Colors.gray} />
              </View>
            </View>

            <View style={styles.faqItem}>
              <View style={styles.faqQuestion}>
                <Text style={styles.faqQuestionText}>How can I cancel my order?</Text>
                <Ionicons name="chevron-down" size={20} color={Colors.gray} />
              </View>
            </View>

            <View style={styles.faqItem}>
              <View style={styles.faqQuestion}>
                <Text style={styles.faqQuestionText}>Do you offer refunds?</Text>
                <Ionicons name="chevron-down" size={20} color={Colors.gray} />
              </View>
            </View>
          </View>

          {/* Support Hours */}
          <View style={styles.supportHours}>
            <View style={styles.hoursHeader}>
              <Ionicons name="time-outline" size={20} color={Colors.primary} />
              <Text style={styles.hoursTitle}>Support Hours</Text>
            </View>
            <View style={styles.hoursGrid}>
              <View style={styles.hourItem}>
                <Text style={styles.hourDay}>Monday - Friday</Text>
                <Text style={styles.hourTime}>9:00 AM - 8:00 PM</Text>
              </View>
              <View style={styles.hourItem}>
                <Text style={styles.hourDay}>Saturday - Sunday</Text>
                <Text style={styles.hourTime}>10:00 AM - 6:00 PM</Text>
              </View>
            </View>
          </View>

          {/* Additional spacing at bottom */}
          <View style={styles.bottomSpacing} />
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderGray,
    elevation: 2,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.black,
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  heroSection: {
    padding: 24,
    backgroundColor: Colors.white,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderGray,
  },
  heroIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.black,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: Colors.gray,
    lineHeight: 22,
    textAlign: 'center',
  },
  cardsContainer: {
    padding: 20,
    gap: 16,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    elevation: 3,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: Colors.borderGray,
  },
  cardIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.black,
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: Colors.gray,
    marginBottom: 6,
    lineHeight: 18,
  },
  cardValue: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.primary,
  },
  cardArrow: {
    marginLeft: 8,
  },
  faqSection: {
    padding: 20,
    backgroundColor: Colors.white,
    marginTop: 8,
  },
  faqTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.black,
    marginBottom: 16,
  },
  faqItem: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
  },
  faqQuestion: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  faqQuestionText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
    flex: 1,
  },
  supportHours: {
    margin: 20,
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    borderWidth: 1,
    borderColor: Colors.borderGray,
  },
  hoursHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  hoursTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.black,
    marginLeft: 8,
  },
  hoursGrid: {
    gap: 12,
  },
  hourItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  hourDay: {
    fontSize: 15,
    color: Colors.gray,
    fontWeight: '500',
  },
  hourTime: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.black,
  },
  bottomSpacing: {
    height: 30,
  },
});
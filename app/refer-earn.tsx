import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Copy, Share2, Gift } from "lucide-react-native";
import Colors from '@/constants/color';

export default function ReferEarnScreen() {
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);

  const referralCode = "S8MVCE6DN7";

  const handleCopyCode = () => {
    Alert.alert('Copied!', 'Referral code copied to clipboard');
  };

  const handleShare = () => {
    Alert.alert('Share', 'Share feature coming soon!');
  };

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);
  const handleDelete = () => {
    closeMenu();
    Alert.alert('Delete', 'Profile or data will be deleted!', [{ text: 'OK' }]);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ChevronLeft size={28} color={Colors.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Refer & Earn</Text>
        <TouchableOpacity style={styles.menuButton} onPress={openMenu}>
          <Text style={styles.menuText}>⋮</Text>
        </TouchableOpacity>
      </View>

      {/* Triple-dot Menu Modal */}
      <Modal
        visible={menuVisible}
        transparent
        animationType="fade"
        onRequestClose={closeMenu}
      >
        <TouchableOpacity style={styles.modalOverlay} onPress={closeMenu}>
          <View style={styles.menuModal}>
            <TouchableOpacity onPress={handleDelete} style={styles.menuItem}>
              <Text style={styles.menuItemText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={closeMenu} style={styles.menuItem}>
              <Text style={[styles.menuItemText, { color: '#666' }]}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.heroIcon}>
            <Gift size={48} color={Colors.primary} />
          </View>
          <Text style={styles.heroTitle}>Earn More by Referring Friends!</Text>
          <Text style={styles.heroSubtitle}>Copy your code, share it with your friends</Text>
        </View>

        {/* Referral Code Section */}
        <View style={styles.codeSection}>
          <Text style={styles.sectionLabel}>Your personal code - T&C Applied</Text>
          <View style={styles.codeContainer}>
            <Text style={styles.referralCode}>{referralCode}</Text>
            <TouchableOpacity style={styles.copyButton} onPress={handleCopyCode}>
              <Copy size={20} color={Colors.white} />
              <Text style={styles.copyButtonText}>Copy</Text>
            </TouchableOpacity>
          </View>

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>OR SHARE</Text>
            <View style={styles.divider} />
          </View>

          {/* Share Button */}
          <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
            <Share2 size={24} color={Colors.black} />
            <Text style={styles.shareButtonText}>Share with Friends</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 24,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderGray,
  },
  backButton: { padding: 8 },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.black,
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
  },
  menuButton: { padding: 8 },
  menuText: { fontSize: 24, color: Colors.black },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  menuModal: {
    backgroundColor: '#fff',
    marginTop: 50,
    marginRight: 10,
    borderRadius: 8,
    width: 160,
    paddingVertical: 8,
    elevation: 5,
  },
  menuItem: { paddingVertical: 12, paddingHorizontal: 16 },
  menuItemText: { fontSize: 16, color: '#D90000', fontWeight: '600' },
  content: { flex: 1, padding: 20, backgroundColor: Colors.lightGray },
  heroSection: {
    alignItems: 'center',
    padding: 32,
    margin: 16,
    borderRadius: 20,
    backgroundColor: Colors.white,
    elevation: 4,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  heroIcon: { marginBottom: 16 },
  heroTitle: { fontSize: 20, fontWeight: 'bold', color: Colors.black, textAlign: 'center', marginBottom: 8 },
  heroSubtitle: { fontSize: 16, color: Colors.gray, textAlign: 'center', lineHeight: 22 },
  codeSection: {
    padding: 24,
    margin: 16,
    borderRadius: 20,
    backgroundColor: Colors.white,
    elevation: 4,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  sectionLabel: { fontSize: 14, color: Colors.gray, textAlign: 'center', marginBottom: 16 },
  codeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.borderGray,
    backgroundColor: Colors.lightGray,
    marginBottom: 20,
  },
  referralCode: { fontSize: 24, fontWeight: 'bold', color: Colors.black, letterSpacing: 2 },
  copyButton: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8, backgroundColor: Colors.primary },
  copyButtonText: { color: Colors.white, fontSize: 14, fontWeight: '600' },
  dividerContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 20 },
  divider: { flex: 1, height: 1, backgroundColor: Colors.borderGray },
  dividerText: { fontSize: 12, fontWeight: '600', color: Colors.gray, marginHorizontal: 12, textTransform: 'uppercase' },
  shareButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12, padding: 16, borderRadius: 12, borderWidth: 1, borderColor: Colors.borderGray, backgroundColor: Colors.lightGray },
  shareButtonText: { fontSize: 16, fontWeight: '600', color: Colors.black },
});

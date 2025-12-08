import Colors from "@/constants/color";
import { useApp } from "@/providers/AppProvider";
import { useAuth } from "@/providers/AuthProvider";
import { Stack, useRouter } from "expo-router";
import {
  Award,
  Bell,
  ChevronRight,
  FileText,
  HelpCircle,
  LogOut,
  MapPin,
  Package,
  Settings,
  Ticket,
  User,
  Users,
  Wallet,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MenuScreen() {
  const { orders } = useApp();
  const { user, logout } = useAuth();
  const router = useRouter();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Mock user data for demo
  const userData = {
    name: user?.fullName || "Guest User",
    email: user?.email || "guest@example.com",
    joinedDate: "2024",
    loyaltyPoints: 1250,
    walletBalance: 500,
  };

  const accountItems = [
    {
      icon: User,
      label: "Edit Profile",
      route: "/edit-profile",
      color: "#64748B",
    },
    {
      icon: MapPin,
      label: "My Address",
      route: "/my-address",
      color: "#64748B",
    },
    {
      icon: Bell,
      label: "Notifications",
      route: "/notifications",
      color: "#64748B",
    },
    {
      icon: Settings,
      label: "Settings",
      route: "/settings",
      color: "#64748B",
    },
  ];

  const promoItems = [
    { icon: Ticket, label: "Coupons", route: "/coupons", color: "#64748B" },
    {
      icon: Award,
      label: "Loyalty Points",
      route: "/loyalty",
      badge: `${userData.loyaltyPoints}`,
      color: "#64748B",
    },
    {
      icon: Wallet,
      label: "My Wallet",
      route: "/wallet",
      badge: `Rs. ${userData.walletBalance}`,
      color: "#64748B",
    },
  ];

  const moreItems = [
    {
      icon: Users,
      label: "Refer & Earn",
      route: "/refer-earn",
      color: "#64748B",
    },
    {
      icon: HelpCircle,
      label: "Help & Support",
      route: "/helpsupport", // Updated route to match your file
      color: "#64748B",
    },
    {
      icon: FileText,
      label: "Terms & Conditions",
      route: "/terms-conditions",
      color: "#64748B",
    },
  ];

  const handleLogoutConfirm = async () => {
    try {
      setShowLogoutModal(false);
      await logout();
      // Logout will automatically redirect to login screen
    } catch (error) {
      console.error('Logout error:', error);
      Alert.alert('Error', 'Failed to logout. Please try again.');
    }
  };

  const handleLogoutPress = () => {
    setShowLogoutModal(true);
  };

  const handleCancelLogout = () => {
    setShowLogoutModal(false);
  };

  // const handleRoutePress = (route: string) => {
  //   // Handle Help & Support navigation
  //   if (route === '/helpsupport') {
  //     router.push('/helpsupport');
  //     return;
  //   }
    
  //   // Handle other existing routes
  //   if (route === '/wallet') {
  //     router.push('/wallet');
  //   } else if (route === '/refer-earn') {
  //     router.push('/refer-earn');
  //   } else if (route === '/terms-conditions') {
  //     router.push('/terms-conditions');
  //   } else if (route === '/edit-profile') {
  //     router.push('/edit-profile');
  //   } else if (route === '/my-address') {
  //     router.push('/my-address');
  //   } else if (route === '/settings') {
  //     router.push('/settings');
  //   } else {
  //     console.log('Navigating to:', route);
  //     // For other routes, show coming soon message
  //     Alert.alert(
  //       'Coming Soon',
  //       'This feature is coming soon!',
  //       [{ text: 'OK' }]
  //     );
  //   }



const handleRoutePress = (route: string) => {
  console.log('Navigating to:', route);
  
  try {
    switch (route) {
      case '/helpsupport':
      case '/edit-profile':
      case '/wallet':
      case '/refer-earn':
      case '/my-address':
      case '/settings':
      case '/notifications':
      case '/coupons':
      case '/loyalty':
      case '/terms-conditions':
        router.push(route);
        break;
      default:
        Alert.alert('Coming Soon', 'This feature is coming soon!', [{ text: 'OK' }]);
    }
  } catch (error) {
    console.error('Navigation error:', error);
    Alert.alert('Error', 'Failed to navigate. Please try again.');
  }
};

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.header}>
        <View style={styles.headerGradient} />
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{
                uri: user?.fullName 
                  ? `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullName)}&size=160&background=FF6B35&color=fff`
                  : "https://ui-avatars.com/api/?name=Guest&size=160&background=666666&color=fff",
              }}
              style={styles.profileImage}
            />
          </View>
          <Text style={styles.userName}>{userData.name}</Text>
          <Text style={styles.userEmail}>{userData.email}</Text>
          <View style={styles.joinedBadge}>
            <Text style={styles.joinedText}>
              Member since {userData.joinedDate}
            </Text>
          </View>
        </View>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Package size={20} color={Colors.primary} />
            </View>
            <Text style={styles.statValue}>{orders.length}</Text>
            <Text style={styles.statLabel}>Orders</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Award size={20} color="#F59E0B" />
            </View>
            <Text style={styles.statValue}>{userData.loyaltyPoints}</Text>
            <Text style={styles.statLabel}>Points</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Wallet size={20} color="#10B981" />
            </View>
            <Text style={styles.statValue}>Rs. {userData.walletBalance}</Text>
            <Text style={styles.statLabel}>Wallet</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.menuList}>
            {accountItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.menuItem}
                onPress={() => handleRoutePress(item.route)}
                activeOpacity={0.7}
              >
                <View style={styles.menuItemLeft}>
                  <View
                    style={[
                      styles.iconContainer,
                      { backgroundColor: `${item.color}15` },
                    ]}
                  >
                    <item.icon size={20} color={item.color} />
                  </View>
                  <Text style={styles.menuItemText}>{item.label}</Text>
                </View>
                <ChevronRight size={20} color={Colors.gray} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Rewards & Offers</Text>
          <View style={styles.menuList}>
            {promoItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.menuItem}
                onPress={() => handleRoutePress(item.route)}
                activeOpacity={0.7}
              >
                <View style={styles.menuItemLeft}>
                  <View
                    style={[
                      styles.iconContainer,
                      { backgroundColor: `${item.color}15` },
                    ]}
                  >
                    <item.icon size={20} color={item.color} />
                  </View>
                  <View style={styles.menuItemTextContainer}>
                    <Text style={styles.menuItemText}>{item.label}</Text>
                    {item.badge && (
                      <Text style={styles.menuItemBadge}>{item.badge}</Text>
                    )}
                  </View>
                </View>
                <ChevronRight size={20} color={Colors.gray} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>More</Text>
          <View style={styles.menuList}>
            {moreItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.menuItem}
                onPress={() => handleRoutePress(item.route)}
                activeOpacity={0.7}
              >
                <View style={styles.menuItemLeft}>
                  <View
                    style={[
                      styles.iconContainer,
                      { backgroundColor: `${item.color}15` },
                    ]}
                  >
                    <item.icon size={20} color={item.color} />
                  </View>
                  <Text style={styles.menuItemText}>{item.label}</Text>
                </View>
                <ChevronRight size={20} color={Colors.gray} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity 
          style={styles.logoutButton} 
          onPress={handleLogoutPress}
          activeOpacity={0.7}
        >
          <LogOut size={22} color={Colors.primary} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>Version 1.0.0</Text>
      </ScrollView>

      {/* Logout Confirmation Modal */}
      <Modal
        visible={showLogoutModal}
        transparent
        animationType="fade"
        onRequestClose={handleCancelLogout}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <LogOut size={24} color={Colors.primary} />
              <Text style={styles.modalTitle}>Logout</Text>
            </View>
            
            <Text style={styles.modalMessage}>
              Are you sure you want to logout?
            </Text>
            
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={handleCancelLogout}
                activeOpacity={0.7}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleLogoutConfirm}
                activeOpacity={0.7}
              >
                <Text style={styles.confirmButtonText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    position: "relative",
    backgroundColor: Colors.white,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderGray,
  },
  headerGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 120,
    backgroundColor: Colors.primary,
  },
  profileSection: {
    alignItems: "center",
    paddingTop: 32,
    paddingHorizontal: 16,
  },
  profileImageContainer: {
    padding: 4,
    backgroundColor: Colors.white,
    borderRadius: 50,
    elevation: 4,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    marginBottom: 12,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.black,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: Colors.gray,
    marginBottom: 12,
  },
  joinedBadge: {
    backgroundColor: Colors.lightGray,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  joinedText: {
    fontSize: 12,
    color: Colors.gray,
    fontWeight: "500",
  },
  content: {
    flex: 1,
    backgroundColor: Colors.lightGray,
  },
  statsContainer: {
    flexDirection: "row",
    margin: 16,
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  statCard: {
    flex: 1,
    alignItems: "center",
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.lightGray,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  statDivider: {
    width: 1,
    backgroundColor: Colors.borderGray,
    marginHorizontal: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.black,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    color: Colors.gray,
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: Colors.gray,
    marginBottom: 12,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  menuList: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    overflow: "hidden",
    elevation: 1,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderGray,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  menuItemTextContainer: {
    flex: 1,
  },
  menuItemText: {
    fontSize: 15,
    fontWeight: "500",
    color: Colors.black,
    marginBottom: 2,
  },
  menuItemBadge: {
    fontSize: 12,
    color: Colors.gray,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    margin: 16,
    marginTop: 8,
    padding: 16,
    backgroundColor: Colors.white,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: Colors.primary,
    elevation: 1,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.primary,
  },
  versionText: {
    textAlign: "center",
    fontSize: 12,
    color: Colors.gray,
    marginBottom: 100,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContainer: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 24,
    width: "100%",
    maxWidth: 320,
    elevation: 8,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.black,
  },
  modalMessage: {
    fontSize: 16,
    color: Colors.gray,
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 22,
  },
  modalButtons: {
    flexDirection: "row",
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButton: {
    backgroundColor: Colors.lightGray,
    borderWidth: 1,
    borderColor: Colors.borderGray,
  },
  confirmButton: {
    backgroundColor: Colors.primary,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.gray,
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.white,
  },
});
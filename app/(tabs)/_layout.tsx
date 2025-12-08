import { Tabs, useRouter } from "expo-router";
import { Home, Heart, ShoppingBag, Menu as MenuIcon, Package } from "lucide-react-native";
import React from "react";
import { View, TouchableOpacity, StyleSheet, Text, Platform } from "react-native";
import { useApp } from "@/providers/AppProvider";
import Colors from "@/constants/color";

function CartButton() {
  const router = useRouter();
  const { cartItemCount } = useApp();

  return (
    <TouchableOpacity
      style={styles.cartButton}
      onPress={() => router.push('/cart')}
      activeOpacity={0.8}
    >
      <ShoppingBag size={28} color={Colors.white} />
      {cartItemCount > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {cartItemCount > 99 ? '99+' : cartItemCount}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

export default function TabLayout() {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors.primary,
          tabBarInactiveTintColor: Colors.gray,
          headerShown: false,
          tabBarStyle: {
            height: Platform.OS === 'ios' ? 88 : 60,
            paddingTop: 8,
            paddingBottom: Platform.OS === 'ios' ? 24 : 8,
            borderTopWidth: 0,
            elevation: 8,
            shadowColor: Colors.black,
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            backgroundColor: Colors.white,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
          },
        }}
      >
        <Tabs.Screen
          name="(home)"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="wishlists"
          options={{
            title: "Wishlist",
            tabBarIcon: ({ color, size }) => <Heart size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="cart"
          options={{
            href: null, // Hide from tab bar
          }}
        />
        <Tabs.Screen
          name="orders"
          options={{
            title: "Orders",
            tabBarIcon: ({ color, size }) => <Package size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="menu"
          options={{
            title: "Menu",
            tabBarIcon: ({ color, size }) => <MenuIcon size={size} color={color} />,
          }}
        />
      </Tabs>
      <CartButton />
    </>
  );
}

const styles = StyleSheet.create({
  cartButton: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 48 : 30,
    alignSelf: 'center',
    backgroundColor: Colors.primary,
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    zIndex: 1000,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: Colors.white,
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 6,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  badgeText: {
    color: Colors.primary,
    fontSize: 12,
    fontWeight: 'bold',
  },
});
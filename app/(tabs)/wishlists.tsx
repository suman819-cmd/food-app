import Colors from "@/constants/color";
import { foodItems, restaurants } from "@/mocks/restaurents";
import { useApp } from "@/providers/AppProvider";
import { Stack } from "expo-router";
import { Heart, Plus, Star } from "lucide-react-native";
import { useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export default function WishlistScreen() {
  const [activeTab, setActiveTab] = useState<"food" | "restaurants">("food");
  const {
    wishlistFoods,
    wishlistRestaurants,
    toggleFoodWishlist,
    toggleRestaurantWishlist,
    addToCart,
  } = useApp();

  const wishlistedFoods = foodItems.filter((item) =>
    wishlistFoods.includes(item.id)
  );
  const wishlistedRestaurants = restaurants.filter((restaurant) =>
    wishlistRestaurants.includes(restaurant.id)
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.header}>
        <Text style={styles.title}>Wishlist</Text>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "food" && styles.activeTab]}
          onPress={() => setActiveTab("food")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "food" && styles.activeTabText,
            ]}
          >
            Food
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "restaurants" && styles.activeTab]}
          onPress={() => setActiveTab("restaurants")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "restaurants" && styles.activeTabText,
            ]}
          >
            Restaurants
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={{ paddingBottom: 100, padding: 16 }}
      >
        {activeTab === "food" ? (
          wishlistedFoods.length > 0 ? (
            <View style={styles.foodGrid}>
              {wishlistedFoods.map((item) => (
                <Pressable key={item.id} style={styles.foodCard}>
                  <Image
                    source={{ uri: item.image }}
                    style={styles.foodImage}
                  />
                  <TouchableOpacity
                    style={styles.heartButton}
                    onPress={() => toggleFoodWishlist(item.id)}
                    activeOpacity={0.7}
                  >
                    <Heart
                      size={20}
                      color={Colors.primary}
                      fill={Colors.primary}
                    />
                  </TouchableOpacity>
                  {item.discount && (
                    <View style={styles.discountBadge}>
                      <Text style={styles.discountText}>
                        {item.discount}% OFF
                      </Text>
                    </View>
                  )}
                  <View style={styles.foodInfo}>
                    <Text style={styles.restaurantLabel} numberOfLines={1}>
                      {item.restaurantName}
                    </Text>
                    <Text style={styles.foodName} numberOfLines={2}>
                      {item.name}
                    </Text>
                    <View style={styles.ratingRow}>
                      <Star size={14} color="#FFC107" fill="#FFC107" />
                      <Text style={styles.rating}>{item.rating}</Text>
                      <Text style={styles.reviewCount}>
                        ({item.reviewCount}+)
                      </Text>
                    </View>
                    <View style={styles.priceRow}>
                      <Text style={styles.price}>Rs. {item.price}</Text>
                      <Pressable
                        style={styles.addToCartButton}
                        onPress={() => addToCart(item)}
                        android_ripple={{ color: Colors.white }}
                      >
                        <Plus size={18} color={Colors.white} />
                      </Pressable>
                    </View>
                  </View>
                </Pressable>
              ))}
            </View>
          ) : (
            <View style={styles.emptyState}>
              <View style={styles.emptyIconContainer}>
                <Text style={styles.emptyIcon}>🍽️</Text>
              </View>
              <Text style={styles.emptyTitle}>No Favorite Foods Yet</Text>
              <Text style={styles.emptyText}>
                Start adding your favorite dishes to see them here
              </Text>
            </View>
          )
        ) : wishlistedRestaurants.length > 0 ? (
          <View style={styles.restaurantList}>
            {wishlistedRestaurants.map((restaurant) => (
              <Pressable key={restaurant.id} style={styles.restaurantCard}>
                <Image
                  source={{ uri: restaurant.logo }}
                  style={styles.restaurantLogo}
                />
                <View style={styles.restaurantInfo}>
                  <Text style={styles.restaurantName} numberOfLines={1}>
                    {restaurant.name}
                  </Text>
                  <Text style={styles.cuisines} numberOfLines={1}>
                    {restaurant.cuisines.join(", ")}
                  </Text>
                  <View style={styles.restaurantMeta}>
                    <Star size={12} color="#FFC107" fill="#FFC107" />
                    <Text style={styles.metaRating}>{restaurant.rating}</Text>
                    <Text style={styles.metaDivider}>•</Text>
                    <Text style={styles.metaText}>
                      {restaurant.deliveryTime}
                    </Text>
                    <Text style={styles.metaDivider}>•</Text>
                    <Text style={styles.metaText}>{restaurant.distance}</Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.heartButtonRestaurant}
                  onPress={() => toggleRestaurantWishlist(restaurant.id)}
                  activeOpacity={0.7}
                >
                  <Heart
                    size={22}
                    color={Colors.primary}
                    fill={Colors.primary}
                  />
                </TouchableOpacity>
              </Pressable>
            ))}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <View style={styles.emptyIconContainer}>
              <Text style={styles.emptyIcon}>🏠</Text>
            </View>
            <Text style={styles.emptyTitle}>No Favorite Restaurants Yet</Text>
            <Text style={styles.emptyText}>
              Start adding restaurants to your wishlist
            </Text>
          </View>
        )}
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
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderGray,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold" as const,
    color: Colors.black,
    textAlign: "center",
  },
  tabContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderGray,
    backgroundColor: Colors.white,
  },
  tab: {
    flex: 1,
    paddingVertical: 18,
    alignItems: "center",
    borderBottomWidth: 3,
    borderBottomColor: "transparent",
  },
  activeTab: {
    borderBottomColor: Colors.primary,
  },
  tabText: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: Colors.gray,
  },
  activeTabText: {
    color: Colors.primary,
  },
  content: {
    flex: 1,
    backgroundColor: Colors.lightGray,
  },
  foodGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  foodCard: {
    width: (width - 44) / 2,
    backgroundColor: Colors.white,
    borderRadius: 16,
    overflow: "hidden",
    elevation: 3,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  foodImage: {
    width: "100%",
    height: 140,
    resizeMode: "cover",
  },
  foodInfo: {
    padding: 12,
  },
  restaurantLabel: {
    fontSize: 10,
    color: Colors.gray,
    marginBottom: 4,
    textTransform: "uppercase" as const,
  },
  foodName: {
    fontSize: 14,
    fontWeight: "600" as const,
    color: Colors.black,
    marginBottom: 6,
    minHeight: 36,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 4,
  },
  rating: {
    fontSize: 12,
    fontWeight: "600" as const,
    color: Colors.black,
  },
  reviewCount: {
    fontSize: 11,
    color: Colors.gray,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontSize: 16,
    fontWeight: "bold" as const,
    color: Colors.primary,
  },
  heartButton: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: Colors.white,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    zIndex: 1,
  },
  discountBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: Colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    zIndex: 1,
  },
  discountText: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: "bold" as const,
  },
  addToCartButton: {
    backgroundColor: Colors.primary,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  restaurantList: {
    gap: 12,
  },

  restaurantCard: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: Colors.white,
    borderRadius: 16,
    alignItems: "center",
    elevation: 2,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  restaurantLogo: {
    width: 72,
    height: 72,
    borderRadius: 16,
  },
  restaurantInfo: {
    flex: 1,
    marginLeft: 12,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: "700" as const,
    color: Colors.black,
    marginBottom: 6,
  },
  cuisines: {
    fontSize: 13,
    color: Colors.gray,
    marginBottom: 6,
  },
  restaurantMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  metaRating: {
    fontSize: 12,
    fontWeight: "600" as const,
    color: Colors.black,
  },
  metaText: {
    fontSize: 11,
    color: Colors.gray,
  },
  metaDivider: {
    fontSize: 11,
    color: Colors.gray,
  },
  heartButtonRestaurant: {
    padding: 8,
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
    backgroundColor: Colors.lightGray,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  emptyIcon: {
    fontSize: 60,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: "bold" as const,
    color: Colors.black,
    marginBottom: 8,
    textAlign: "center",
  },
  emptyText: {
    fontSize: 15,
    color: Colors.gray,
    textAlign: "center",
    lineHeight: 22,
  },
});

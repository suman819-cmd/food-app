import Colors from "@/constants/color";
import { cuisines } from "@/mocks/cuisin";
import { foodItems, restaurants } from "@/mocks/restaurents";
import { useApp } from "@/providers/AppProvider";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { ChevronLeft, Heart, Mic, Plus, Search } from "lucide-react-native";
import { useMemo, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export default function SearchResultsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const initialQuery = (params.query as string) || "";
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const { isFoodInWishlist, toggleFoodWishlist, addToCart } = useApp();

  const filteredResults = useMemo(() => {
    if (!searchQuery.trim()) {
      return { foods: foodItems, restaurants: restaurants };
    }

    const query = searchQuery.toLowerCase();

    const matchedCuisine = cuisines.find((c) =>
      c.name.toLowerCase().includes(query)
    );

    const filteredRestaurants = restaurants.filter((r) => {
      const nameMatch = r.name.toLowerCase().includes(query);
      const cuisineMatch = r.cuisines.some((c) =>
        c.toLowerCase().includes(query)
      );
      const cuisineIdMatch = matchedCuisine
        ? r.cuisines.some((c) =>
            c.toLowerCase().includes(matchedCuisine.name.toLowerCase())
          )
        : false;
      return nameMatch || cuisineMatch || cuisineIdMatch;
    });

    const filteredFoods = foodItems.filter((f) => {
      const nameMatch = f.name.toLowerCase().includes(query);
      const descMatch = f.description.toLowerCase().includes(query);
      const restaurantInFiltered = filteredRestaurants.some(
        (r) => r.id === f.restaurantId
      );
      return nameMatch || descMatch || restaurantInFiltered;
    });

    return { foods: filteredFoods, restaurants: filteredRestaurants };
  }, [searchQuery]);

  const renderFoodItem = (item: (typeof foodItems)[0]) => {
    const inWishlist = isFoodInWishlist(item.id);

    return (
      <TouchableOpacity
        key={item.id}
        style={styles.foodCard}
        onPress={() => console.log("Food item:", item.id)}
      >
        <Image source={{ uri: item.image }} style={styles.foodImage} />
        <TouchableOpacity
          style={styles.wishlistButton}
          onPress={() => toggleFoodWishlist(item.id)}
        >
          <Heart
            size={20}
            color={inWishlist ? Colors.primary : Colors.white}
            fill={inWishlist ? Colors.primary : "transparent"}
          />
        </TouchableOpacity>
        {item.discount && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{item.discount}.0% OFF</Text>
          </View>
        )}
        <View style={styles.foodInfo}>
          <Text style={styles.restaurantName} numberOfLines={1}>
            {item.restaurantName}
          </Text>
          <Text style={styles.foodName} numberOfLines={1}>
            {item.name}
          </Text>
          <View style={styles.foodFooter}>
            <View style={styles.ratingContainer}>
              <Text style={styles.rating}>★ {item.rating}</Text>
              <Text style={styles.reviewCount}>({item.reviewCount})</Text>
            </View>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => addToCart(item)}
            >
              <Plus size={18} color={Colors.primary} />
            </TouchableOpacity>
          </View>
          <Text style={styles.price}>Rs. {item.price}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderRestaurant = (restaurant: (typeof restaurants)[0]) => (
    <TouchableOpacity key={restaurant.id} style={styles.restaurantCard}>
      <Image
        source={{ uri: restaurant.coverImage }}
        style={styles.restaurantCover}
      />
      <View style={styles.restaurantOverlay} />
      <Image source={{ uri: restaurant.logo }} style={styles.restaurantLogo} />
      <View style={styles.restaurantInfo}>
        <Text style={styles.restaurantTitle} numberOfLines={1}>
          {restaurant.name}
        </Text>
        <View style={styles.restaurantMeta}>
          <Text style={styles.metaText}>★ {restaurant.rating}</Text>
          <Text style={styles.metaDot}>•</Text>
          <Text style={styles.metaText}>{restaurant.deliveryTime}</Text>
          <Text style={styles.metaDot}>•</Text>
          <Text style={styles.metaText}>{restaurant.distance}</Text>
        </View>
        <Text style={styles.restaurantCuisines} numberOfLines={1}>
          {restaurant.cuisines.join(" • ")}
        </Text>
      </View>
    </TouchableOpacity>
  );

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
        <View style={styles.searchBar}>
          <Search size={20} color={Colors.gray} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for food or restaurants"
            placeholderTextColor={Colors.gray}
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus
          />
          <Mic size={20} color={Colors.gray} />
        </View>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        {searchQuery.trim() === "" && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🔍</Text>
            <Text style={styles.emptyText}>
              Search for your favorite food or restaurants
            </Text>
            <Text style={styles.emptySubtext}>
              Try searching for cuisines like Indian, Chinese, etc.
            </Text>
          </View>
        )}

        {searchQuery.trim() !== "" &&
          filteredResults.foods.length === 0 &&
          filteredResults.restaurants.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>😕</Text>
              <Text style={styles.emptyText}>No results found</Text>
              <Text style={styles.emptySubtext}>
                Try searching for something else
              </Text>
            </View>
          )}

        {filteredResults.restaurants.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Restaurants ({filteredResults.restaurants.length})
            </Text>
            <View style={styles.restaurantsList}>
              {filteredResults.restaurants.map(renderRestaurant)}
            </View>
          </View>
        )}

        {filteredResults.foods.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Food Items ({filteredResults.foods.length})
            </Text>
            <View style={styles.foodGrid}>
              {filteredResults.foods.map(renderFoodItem)}
            </View>
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
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderGray,
    gap: 8,
  },
  backButton: {
    padding: 4,
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.lightGray,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: Colors.black,
  },
  content: {
    flex: 1,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 80,
    paddingHorizontal: 32,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600" as const,
    color: Colors.black,
    marginBottom: 8,
    textAlign: "center",
  },
  emptySubtext: {
    fontSize: 14,
    color: Colors.gray,
    textAlign: "center",
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold" as const,
    color: Colors.black,
    marginBottom: 16,
  },
  restaurantsList: {
    gap: 16,
  },
  restaurantCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    overflow: "hidden",
    elevation: 3,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  restaurantCover: {
    width: "100%",
    height: 140,
    resizeMode: "cover",
  },
  restaurantOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 140,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  restaurantLogo: {
    position: "absolute",
    top: 100,
    left: 16,
    width: 80,
    height: 80,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: Colors.white,
  },
  restaurantInfo: {
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  restaurantTitle: {
    fontSize: 16,
    fontWeight: "700" as const,
    color: Colors.black,
    marginBottom: 6,
  },
  restaurantMeta: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  metaText: {
    fontSize: 13,
    color: Colors.gray,
  },
  metaDot: {
    fontSize: 13,
    color: Colors.gray,
    marginHorizontal: 6,
  },
  restaurantCuisines: {
    fontSize: 13,
    color: Colors.gray,
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
    shadowOpacity: 0.12,
    shadowRadius: 6,
  },
  foodImage: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },
  wishlistButton: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "rgba(0,0,0,0.3)",
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  discountBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: Colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  discountText: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: "bold" as const,
  },
  foodInfo: {
    padding: 12,
  },
  restaurantName: {
    fontSize: 11,
    color: Colors.gray,
    marginBottom: 4,
  },
  foodName: {
    fontSize: 14,
    fontWeight: "600" as const,
    color: Colors.black,
    marginBottom: 8,
  },
  foodFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
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
  addButton: {
    backgroundColor: Colors.white,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold" as const,
    color: Colors.primary,
  },
});

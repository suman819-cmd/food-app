// import AddToCartModal from "@/app/components/AddToCartModal";
// import NotificationModal from "@/app/components/NotificationModal";
// import Colors from "@/constants/color";
// import { cuisines } from "@/mocks/cuisin";
// import { foodItems, restaurants } from "@/mocks/restaurents";
// import { useApp } from "@/providers/AppProvider";
// import { useRouter } from "expo-router";
// import {
//   ChevronRight,
//   Flame,
//   Heart,
//   MapPin,
//   Mic,
//   Search,
//   Filter,
//   Star,
//   Clock,
// } from "lucide-react-native";
// import React, { useCallback, useEffect, useRef, useState, useMemo } from "react";
// import {
//   Animated,
//   Dimensions,
//   FlatList,
//   Image,
//   Pressable,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
//   Modal,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

// const { width } = Dimensions.get("window");
// const BANNER_WIDTH = width - 32;

// // Filter types
// type RestaurantFilter = 'all' | 'veg' | 'nonveg' | 'discounted';
// type SortOption = 'all' | 'takeaway' | 'delivery' | 'dinein' | 'latest' | 'popular';

// // Dummy restaurants data with string IDs
// const allRestaurants = [
//   {
//     id: "1",
//     name: "Royal Cakes",
//     cuisine: "Cake, Bakery, Desserts",
//     rating: 5.0,
//     reviewCount: 3,
//     deliveryTime: "55-60 min",
//     distance: "1.3 KM",
//     image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=200&fit=crop",
//     isDiscounted: true,
//     isVeg: true,
//     isNonVeg: false,
//     deliveryType: ['delivery', 'takeaway'],
//     isTopRated: true,
//     discount: "20% OFF",
//     tags: ["Cakes", "Desserts", "Bakery"]
//   },
//   {
//     id: "2",
//     name: "Taste of Heaven",
//     cuisine: "Indian, Chinese, Nepali Dish",
//     rating: 3.1,
//     reviewCount: 7,
//     deliveryTime: "55-60 min",
//     distance: "1.5 KM",
//     image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&h=200&fit=crop",
//     isDiscounted: false,
//     isVeg: true,
//     isNonVeg: true,
//     deliveryType: ['delivery', 'dinein'],
//     isTopRated: false,
//     tags: ["Indian", "Chinese", "Nepali"]
//   },
//   {
//     id: "3",
//     name: "Cholia Chhen- Newari Kitchen",
//     cuisine: "Newari Cuisine, Nepali Dish, Fast Food",
//     rating: 4.7,
//     reviewCount: 30,
//     deliveryTime: "55-60 min",
//     distance: "1.7 KM",
//     image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=300&h=200&fit=crop",
//     isDiscounted: true,
//     isVeg: true,
//     isNonVeg: true,
//     specialTag: "DELICIOUS CHOILA",
//     deliveryType: ['delivery', 'takeaway', 'dinein'],
//     isTopRated: true,
//     discount: "15% OFF",
//     tags: ["Newari", "Traditional", "Spicy"]
//   },
//   {
//     id: "4",
//     name: "Pizza Palace",
//     cuisine: "Italian, Pizza, Fast Food",
//     rating: 4.3,
//     reviewCount: 45,
//     deliveryTime: "40-45 min",
//     distance: "2.1 KM",
//     image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&h=200&fit=crop",
//     isDiscounted: true,
//     isVeg: true,
//     isNonVeg: true,
//     deliveryType: ['delivery', 'takeaway'],
//     isTopRated: true,
//     discount: "25% OFF",
//     tags: ["Pizza", "Italian", "Fast Food"]
//   },
//   {
//     id: "5",
//     name: "Burger Hub",
//     cuisine: "American, Burgers, Fast Food",
//     rating: 4.5,
//     reviewCount: 28,
//     deliveryTime: "35-40 min",
//     distance: "1.8 KM",
//     image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=300&h=200&fit=crop",
//     isDiscounted: false,
//     isVeg: true,
//     isNonVeg: true,
//     deliveryType: ['delivery', 'takeaway', 'dinein'],
//     isTopRated: false,
//     tags: ["Burgers", "American", "Fast Food"]
//   },
//   {
//     id: "6",
//     name: "Sushi Master",
//     cuisine: "Japanese, Sushi, Asian",
//     rating: 4.8,
//     reviewCount: 62,
//     deliveryTime: "50-55 min",
//     distance: "2.5 KM",
//     image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=300&h=200&fit=crop",
//     isDiscounted: true,
//     isVeg: true,
//     isNonVeg: true,
//     deliveryType: ['dinein'],
//     isTopRated: true,
//     discount: "10% OFF",
//     tags: ["Sushi", "Japanese", "Healthy"]
//   },
//   {
//     id: "7",
//     name: "Momo Magic",
//     cuisine: "Nepali, Tibetan, Fast Food",
//     rating: 4.6,
//     reviewCount: 89,
//     deliveryTime: "30-35 min",
//     distance: "1.2 KM",
//     image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=300&h=200&fit=crop",
//     isDiscounted: true,
//     isVeg: true,
//     isNonVeg: true,
//     deliveryType: ['delivery', 'takeaway'],
//     isTopRated: false,
//     discount: "30% OFF",
//     tags: ["Momo", "Nepali", "Street Food"]
//   },
//   {
//     id: "8",
//     name: "Thakali Bhojanalaya",
//     cuisine: "Nepali, Thakali, Traditional",
//     rating: 4.9,
//     reviewCount: 120,
//     deliveryTime: "45-50 min",
//     distance: "2.3 KM",
//     image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300&h=200&fit=crop",
//     isDiscounted: false,
//     isVeg: true,
//     isNonVeg: true,
//     deliveryType: ['dinein'],
//     isTopRated: true,
//     tags: ["Thakali", "Traditional", "Nepali"]
//   },
//   {
//     id: "9",
//     name: "Cafe Delight",
//     cuisine: "Coffee, Bakery, Snacks",
//     rating: 4.2,
//     reviewCount: 34,
//     deliveryTime: "25-30 min",
//     distance: "0.8 KM",
//     image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=300&h=200&fit=crop",
//     isDiscounted: true,
//     isVeg: true,
//     isNonVeg: false,
//     deliveryType: ['takeaway', 'dinein'],
//     isTopRated: false,
//     discount: "20% OFF",
//     tags: ["Coffee", "Bakery", "Snacks"]
//   },
//   {
//     id: "10",
//     name: "BBQ Nation",
//     cuisine: "Barbecue, Grill, Non-Veg",
//     rating: 4.4,
//     reviewCount: 76,
//     deliveryTime: "60-65 min",
//     distance: "2.8 KM",
//     image: "https://images.unsplash.com/photo-1558036117-15e82a2c9a9a?w=300&h=200&fit=crop",
//     isDiscounted: true,
//     isVeg: false,
//     isNonVeg: true,
//     deliveryType: ['delivery', 'dinein'],
//     isTopRated: true,
//     discount: "15% OFF",
//     tags: ["BBQ", "Grill", "Non-Veg"]
//   }
// ];

// export default function HomeScreen() {
//   const router = useRouter();
//   const { isFoodInWishlist, toggleFoodWishlist, addToCart } = useApp();
//   const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
//   const [selectedItem, setSelectedItem] = useState<(typeof foodItems)[0] | null>(null);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [isNotificationModalVisible, setIsNotificationModalVisible] = useState(false);
//   const [scrollProgress, setScrollProgress] = useState(0);
//   const [activeFeaturedIndex, setActiveFeaturedIndex] = useState(0);
  
//   // Restaurant filter states
//   const [activeFilter, setActiveFilter] = useState<RestaurantFilter>('all');
//   const [showSortModal, setShowSortModal] = useState(false);
//   const [activeSort, setActiveSort] = useState<SortOption>('all');
  
//   // Typing animation states
//   const [displayedText, setDisplayedText] = useState("");
//   const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
//   const [isDeleting, setIsDeleting] = useState(false);
//   const [typingSpeed, setTypingSpeed] = useState(100);
  
//   const scaleAnim = useRef(new Animated.Value(1)).current;
//   const flatListRef = useRef<FlatList>(null);
//   const featuredScrollRef = useRef<ScrollView>(null);
//   const autoScrollTimer = useRef<NodeJS.Timeout | null>(null);
//   const typingTimer = useRef<NodeJS.Timeout | null>(null);
  
//   const searchPhrases = [
//     "Browse today's best deals and combos",
//     "Search for pizza, burger, momo...",
//     "Find restaurants near you",
//     "Order your favorite food",
//     "Get 50% off on first order",
//     "Try our special dishes",
//     "Fast delivery available",
//     "Explore different cuisines"
//   ];

//   const featuredItems = [
//     {
//       id: "1",
//       image: "https://images.unsplash.com/photo-1606788075763-2e6f252c9cbb?w=400&h=400&fit=crop",
//       title: "Party Pack-1",
//       description: "Perfect combo for family gatherings with delicious variety",
//       price: "Rs. 1,499"
//     },
//     {
//       id: "2",
//       image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=400&fit=crop",
//       title: "Chicken Nuggets",
//       description: "19 pcs crispy chicken nuggets with special sauce",
//       price: "Rs. 599"
//     },
//     {
//       id: "3",
//       image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&h=400&fit=crop",
//       title: "Family Combo",
//       description: "Special family meal deal for 4 people",
//       price: "Rs. 2,199"
//     },
//     {
//       id: "4",
//       image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=400&fit=crop",
//       title: "Lunch Special",
//       description: "Quick and delicious lunch with free drink",
//       price: "Rs. 899"
//     }
//   ];

//   // Use useMemo for filtered restaurants to prevent unnecessary recalculations
//   const filteredRestaurants = useMemo(() => {
//     let filtered = allRestaurants;
    
//     // Apply food type filter
//     if (activeFilter === 'veg') {
//       filtered = filtered.filter(restaurant => restaurant.isVeg);
//     } else if (activeFilter === 'nonveg') {
//       filtered = filtered.filter(restaurant => restaurant.isNonVeg);
//     } else if (activeFilter === 'discounted') {
//       filtered = filtered.filter(restaurant => restaurant.isDiscounted);
//     }
    
//     // Apply sort filter
//     if (activeSort === 'takeaway') {
//       filtered = filtered.filter(restaurant => restaurant.deliveryType.includes('takeaway'));
//     } else if (activeSort === 'delivery') {
//       filtered = filtered.filter(restaurant => restaurant.deliveryType.includes('delivery'));
//     } else if (activeSort === 'dinein') {
//       filtered = filtered.filter(restaurant => restaurant.deliveryType.includes('dinein'));
//     } else if (activeSort === 'latest') {
//       filtered = [...filtered].reverse(); // Simple reverse for demo
//     } else if (activeSort === 'popular') {
//       filtered = [...filtered].sort((a, b) => b.reviewCount - a.reviewCount);
//     }
//     // No additional filtering for 'all'
    
//     return filtered;
//   }, [activeFilter, activeSort]);

//   const trendingFoods = useMemo(() => 
//     foodItems.filter((item) => item.tags?.includes("Trending")).slice(0, 5), 
//   []);
  
//   const bannerData = useMemo(() => trendingFoods.slice(0, 3), [trendingFoods]);

//   // Typing animation effect
//   useEffect(() => {
//     const type = () => {
//       const currentPhrase = searchPhrases[currentPhraseIndex];
      
//       if (!isDeleting) {
//         // Typing forward
//         if (displayedText.length < currentPhrase.length) {
//           setDisplayedText(currentPhrase.substring(0, displayedText.length + 1));
//           setTypingSpeed(100);
//         } else {
//           // Finished typing, wait then start deleting
//           setTypingSpeed(1500);
//           setIsDeleting(true);
//         }
//       } else {
//         // Deleting
//         if (displayedText.length > 0) {
//           setDisplayedText(currentPhrase.substring(0, displayedText.length - 1));
//           setTypingSpeed(50);
//         } else {
//           // Finished deleting, move to next phrase
//           setIsDeleting(false);
//           setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % searchPhrases.length);
//           setTypingSpeed(500);
//         }
//       }
//     };

//     typingTimer.current = setTimeout(type, typingSpeed);

//     return () => {
//       if (typingTimer.current) {
//         clearTimeout(typingTimer.current);
//       }
//     };
//   }, [displayedText, isDeleting, currentPhraseIndex, typingSpeed]);

//   // Auto scroll functionality
//   useEffect(() => {
//     const startAutoScroll = () => {
//       autoScrollTimer.current = setInterval(() => {
//         setCurrentBannerIndex((prevIndex) => {
//           const nextIndex = (prevIndex + 1) % bannerData.length;
//           if (flatListRef.current) {
//             flatListRef.current.scrollToIndex({
//               index: nextIndex,
//               animated: true,
//             });
//           }
//           return nextIndex;
//         });
//       }, 3000);
//     };

//     const stopAutoScroll = () => {
//       if (autoScrollTimer.current) {
//         clearInterval(autoScrollTimer.current);
//         autoScrollTimer.current = null;
//       }
//     };

//     startAutoScroll();

//     return () => {
//       stopAutoScroll();
//     };
//   }, [bannerData.length]);

//   const handleManualScroll = (event: any) => {
//     const index = Math.round(event.nativeEvent.contentOffset.x / (BANNER_WIDTH + 8));
//     setCurrentBannerIndex(index);

//     if (autoScrollTimer.current) {
//       clearInterval(autoScrollTimer.current);
//     }
//     autoScrollTimer.current = setInterval(() => {
//       setCurrentBannerIndex((prevIndex) => {
//         const nextIndex = (prevIndex + 1) % bannerData.length;
//         if (flatListRef.current) {
//           flatListRef.current.scrollToIndex({
//             index: nextIndex,
//             animated: true,
//           });
//         }
//         return nextIndex;
//       });
//     }, 3000);
//   };

//   const handleFeaturedScroll = (event: any) => {
//     const x = event.nativeEvent.contentOffset.x;
//     const itemWidth = 220 + 16;
//     const activeIndex = Math.round(x / itemWidth);
//     setActiveFeaturedIndex(activeIndex);
    
//     // Calculate progress for the line
//     const totalScrollableWidth = itemWidth * (featuredItems.length - 1);
//     const progress = Math.min(Math.max(x / totalScrollableWidth, 0), 1);
//     setScrollProgress(progress);
//   };

//   const handleAddToCartPress = useCallback((item: (typeof foodItems)[0]) => {
//     setSelectedItem(item);
//     setIsModalVisible(true);
//   }, []);

//   const handleModalAddToCart = useCallback(
//     (item: (typeof foodItems)[0], quantity: number, selectedOption?: string) => {
//       for (let i = 0; i < quantity; i++) {
//         addToCart(item);
//       }
//       if (selectedOption) {
//         console.log("Selected option:", selectedOption);
//       }
//       Animated.sequence([
//         Animated.timing(scaleAnim, {
//           toValue: 0.95,
//           duration: 100,
//           useNativeDriver: true,
//         }),
//         Animated.timing(scaleAnim, {
//           toValue: 1,
//           duration: 100,
//           useNativeDriver: true,
//         }),
//       ]).start();
//     },
//     [addToCart, scaleAnim]
//   );

//   const handleNotificationPress = useCallback(() => {
//     setIsNotificationModalVisible(true);
//   }, []);

//   const handleReferPress = useCallback(() => {
//     router.push("/refer-earn");
//   }, [router]);

//   const handleFilterPress = useCallback((filter: RestaurantFilter) => {
//     setActiveFilter(filter);
//   }, []);

//   const handleSortPress = useCallback((sort: SortOption) => {
//     setActiveSort(sort);
//     setShowSortModal(false);
//   }, []);

//   // Fixed: Use search results instead of non-existent restaurant route
//   const handleOrderNowPress = useCallback((restaurantId: string) => {
//     console.log("Order now pressed for restaurant:", restaurantId);
//     router.push(`/search-results?query=${encodeURIComponent(restaurantId)}`);
//   }, [router]);

//   const renderBannerItem = useCallback(({ item, index }: { item: (typeof foodItems)[0]; index: number }) => (
//     <Pressable
//       style={[styles.bannerItem, { marginLeft: index === 0 ? 16 : 8 }]}
//       onPress={() => console.log("Banner item:", item.id)}
//     >
//       <Image source={{ uri: item.image }} style={styles.bannerImage} />
//       <View style={styles.bannerOverlay} />
//       <View style={styles.bannerContent}>
//         <Image source={{ uri: restaurants[0].logo }} style={styles.bannerLogo} />
//         <Text style={styles.bannerTitle} numberOfLines={2}>
//           {item.name}
//         </Text>
//         <View style={styles.bannerPriceRow}>
//           <Text style={styles.bannerPrice}>Rs. {item.price}</Text>
//           {item.discount && (
//             <View style={styles.bannerDiscountBadge}>
//               <Text style={styles.bannerDiscountText}>{item.discount}% OFF</Text>
//             </View>
//           )}
//         </View>
//         <TouchableOpacity style={styles.bannerButton} activeOpacity={0.8}>
//           <Text style={styles.bannerButtonText}>Order Now</Text>
//         </TouchableOpacity>
//       </View>
//     </Pressable>
//   ), []);

//   const renderCuisineItem = useCallback(({ item }: { item: (typeof cuisines)[0] }) => (
//     <TouchableOpacity
//       style={styles.cuisineItem}
//       onPress={() =>
//         router.push(`/search-results?query=${encodeURIComponent(item.name)}`)
//       }
//     >
//       <View style={styles.cuisineImageContainer}>
//         <Image source={{ uri: item.image }} style={styles.cuisineImage} />
//         <View style={styles.cuisineTriangle} />
//       </View>
//       <Text style={styles.cuisineName}>{item.name}</Text>
//     </TouchableOpacity>
//   ), [router]);

//   const renderTrendingItem = useCallback(({ item }: { item: (typeof trendingFoods)[0] }) => (
//     <TouchableOpacity 
//       style={styles.trendingCard}
//       onPress={() => handleAddToCartPress(item)}
//     >
//       <Image source={{ uri: item.image }} style={styles.trendingImage} />
//       <View style={styles.trendingBadge}>
//         <Flame size={12} color={Colors.white} />
//         <Text style={styles.trendingBadgeText}>Trending</Text>
//       </View>
//       <Text style={styles.trendingName}>{item.name}</Text>
//     </TouchableOpacity>
//   ), [handleAddToCartPress]);

//   const renderFoodItem = useCallback((item: (typeof foodItems)[0]) => {
//     const inWishlist = isFoodInWishlist(item.id);
//     return (
//       <TouchableOpacity
//         key={item.id}
//         style={styles.foodCard}
//         onPress={() => handleAddToCartPress(item)}
//       >
//         <Image source={{ uri: item.image }} style={styles.foodImage} />
//         <TouchableOpacity
//           style={styles.wishlistButton}
//           onPress={() => toggleFoodWishlist(item.id)}
//         >
//           <Heart
//             size={20}
//             color={inWishlist ? Colors.primary : Colors.white}
//             fill={inWishlist ? Colors.primary : "transparent"}
//           />
//         </TouchableOpacity>
//         {item.discount && (
//           <View style={styles.discountBadge}>
//             <Text style={styles.discountText}>{item.discount}.0% OFF</Text>
//           </View>
//         )}
//         <View style={styles.foodInfo}>
//           <Text style={styles.restaurantLabel} numberOfLines={1}>
//             {item.restaurantName}
//           </Text>
//           <Text style={styles.foodName} numberOfLines={1}>
//             {item.name}
//           </Text>
//           <View style={styles.foodFooter}>
//             <View style={styles.ratingContainer}>
//               <Text style={styles.rating}>★ {item.rating}</Text>
//               <Text style={styles.reviewCount}>({item.reviewCount})</Text>
//             </View>
//           </View>
//           <Text style={styles.price}>Rs. {item.price}</Text>
//         </View>
//       </TouchableOpacity>
//     );
//   }, [isFoodInWishlist, handleAddToCartPress, toggleFoodWishlist]);

//   const renderRestaurantItem = useCallback((restaurant: typeof allRestaurants[0]) => (
//     <View key={restaurant.id} style={styles.restaurantCard}>
//       {/* Restaurant Header with Image */}
//       <View style={styles.restaurantHeader}>
//         <Image source={{ uri: restaurant.image }} style={styles.restaurantImage} />
//         <View style={styles.restaurantHeaderContent}>
//           <View style={styles.restaurantTitleRow}>
//             <Text style={styles.restaurantName}>{restaurant.name}</Text>
//             {restaurant.isTopRated && (
//               <View style={styles.topRatedBadge}>
//                 <Star size={12} color={Colors.white} />
//                 <Text style={styles.topRatedText}>Top Rated</Text>
//               </View>
//             )}
//           </View>
//           <Text style={styles.restaurantCuisine}>{restaurant.cuisine}</Text>
          
//           {/* Tags */}
//           <View style={styles.tagsContainer}>
//             {restaurant.tags?.slice(0, 2).map((tag, index) => (
//               <View key={index} style={styles.tag}>
//                 <Text style={styles.tagText}>{tag}</Text>
//               </View>
//             ))}
//           </View>
//         </View>
//       </View>

//       {/* Rating and Delivery Info */}
//       <View style={styles.restaurantInfoRow}>
//         <View style={styles.ratingContainer}>
//           <Star size={14} color="#FFD700" fill="#FFD700" />
//           <Text style={styles.restaurantRating}>{restaurant.rating}</Text>
//           <Text style={styles.restaurantReviewCount}>({restaurant.reviewCount})</Text>
//         </View>
        
//         <View style={styles.deliveryInfo}>
//           <Clock size={14} color={Colors.gray} />
//           <Text style={styles.deliveryTime}>{restaurant.deliveryTime}</Text>
//           <Text style={styles.distance}>• {restaurant.distance}</Text>
//         </View>
//       </View>

//       {/* Discount Badge if available */}
//       {restaurant.isDiscounted && restaurant.discount && (
//         <View style={styles.discountContainer}>
//           <Text style={styles.discountText}>🎉 {restaurant.discount} on all orders</Text>
//         </View>
//       )}

//       {/* Special Tag with Order Now Button */}
//       <View style={styles.actionRow}>
//         {restaurant.specialTag ? (
//           <View style={styles.specialTagContainer}>
//             <Text style={styles.specialTagText}>{restaurant.specialTag}</Text>
//           </View>
//         ) : (
//           <View style={styles.placeholder} />
//         )}
        
//         <TouchableOpacity 
//           style={styles.orderNowButton}
//           onPress={() => handleOrderNowPress(restaurant.id)}
//         >
//           <Text style={styles.orderNowText}>Order Now</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Divider */}
//       <View style={styles.divider} />
//     </View>
//   ), [handleOrderNowPress]);

//   const SortModal = useCallback(() => (
//     <Modal
//       visible={showSortModal}
//       transparent
//       animationType="fade"
//       onRequestClose={() => setShowSortModal(false)}
//     >
//       <TouchableOpacity 
//         style={styles.modalOverlay}
//         activeOpacity={1}
//         onPress={() => setShowSortModal(false)}
//       >
//         <View style={styles.sortModalContent}>
//           <Text style={styles.sortModalTitle}>Sort By</Text>
//           {(['all', 'takeaway', 'delivery', 'dinein', 'latest', 'popular'] as SortOption[]).map((sortOption) => (
//             <TouchableOpacity
//               key={sortOption}
//               style={[
//                 styles.sortOption,
//                 activeSort === sortOption && styles.activeSortOption
//               ]}
//               onPress={() => handleSortPress(sortOption)}
//             >
//               <Text style={[
//                 styles.sortOptionText,
//                 activeSort === sortOption && styles.activeSortOptionText
//               ]}>
//                 {sortOption.charAt(0).toUpperCase() + sortOption.slice(1)}
//               </Text>
//               {activeSort === sortOption && (
//                 <View style={styles.sortCheckmark}>
//                   <Text>✓</Text>
//                 </View>
//               )}
//             </TouchableOpacity>
//           ))}
//         </View>
//       </TouchableOpacity>
//     </Modal>
//   ), [showSortModal, activeSort, handleSortPress]);

//   return (
//     <SafeAreaView style={styles.container} edges={["top"]}>
//       <View style={styles.header}>
//         <View style={styles.locationContainer}>
//           <MapPin size={20} color={Colors.white} />
//           <View style={styles.locationTextContainer}>
//             <Text style={styles.locationLabel}>Your Current Location</Text>
//             <Text style={styles.locationAddress} numberOfLines={1}>
//               P8F6+7FW, Rayamajhi Marga, Kathmandu 44600, Nepal
//             </Text>
//           </View>
//         </View>
//         <TouchableOpacity style={styles.notificationButton} onPress={handleNotificationPress}>
//           <View style={styles.notificationDot} />
//           <Text style={styles.notificationIcon}>🔔</Text>
//         </TouchableOpacity>
//       </View>

//       <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
//         <View style={styles.searchContainer}>
//           <TouchableOpacity
//             style={styles.searchBar}
//             onPress={() => router.push("/search-results")}
//             activeOpacity={0.7}
//           >
//             <Search size={20} color={Colors.gray} />
//             <View style={styles.searchTextContainer}>
//               <Text style={styles.searchPlaceholder}>
//                 {displayedText}
//                 <Text style={styles.cursor}>|</Text>
//               </Text>
//             </View>
//             <Mic size={20} color={Colors.gray} />
//           </TouchableOpacity>
//         </View>

//         {/* Banner Section */}
//         <View style={styles.bannerSection}>
//           <FlatList
//             ref={flatListRef}
//             data={bannerData}
//             renderItem={renderBannerItem}
//             keyExtractor={(item) => item.id}
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             snapToInterval={BANNER_WIDTH + 8}
//             decelerationRate="fast"
//             contentContainerStyle={{ paddingRight: 16 }}
//             onMomentumScrollEnd={handleManualScroll}
//             onScrollBeginDrag={() => {
//               if (autoScrollTimer.current) clearInterval(autoScrollTimer.current);
//             }}
//             getItemLayout={(data, index) => ({
//               length: BANNER_WIDTH + 8,
//               offset: (BANNER_WIDTH + 8) * index,
//               index,
//             })}
//           />
//           <View style={styles.pagination}>
//             {bannerData.map((_, idx) => (
//               <View
//                 key={idx}
//                 style={[styles.dot, currentBannerIndex === idx && styles.activeDot]}
//               />
//             ))}
//           </View>
//         </View>

//         {/* Trending */}
//         <View style={styles.section}>
//           <View style={styles.sectionHeader}>
//             <Text style={styles.sectionTitle}>What's Your Craving Today?</Text>
//             <TouchableOpacity>
//               <ChevronRight size={24} color={Colors.primary} />
//             </TouchableOpacity>
//           </View>
//           <FlatList
//             data={trendingFoods}
//             renderItem={renderTrendingItem}
//             keyExtractor={(item) => item.id}
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             contentContainerStyle={styles.trendingList}
//           />
//         </View>

//         {/* Cuisine */}
//         <View style={styles.section}>
//           <View style={styles.sectionHeader}>
//             <Text style={styles.sectionTitle}>Cuisine</Text>
//             <TouchableOpacity>
//               <ChevronRight size={24} color={Colors.primary} />
//             </TouchableOpacity>
//           </View>
//           <FlatList
//             data={cuisines}
//             renderItem={renderCuisineItem}
//             keyExtractor={(item) => item.id}
//             numColumns={4}
//             scrollEnabled={false}
//             contentContainerStyle={styles.cuisineGrid}
//           />
//         </View>

//         {/* Restaurant Promo */}
//         <View style={styles.restaurantPromo}>
//           <Text style={styles.promoIcon}>🍽️</Text>
//           <View style={styles.promoContent}>
//             <Text style={styles.promoTitle}>Find Restaurants Nearby</Text>
//             <Text style={styles.promoSubtitle}>Restaurant Near from You</Text>
//           </View>
//           <TouchableOpacity style={styles.promoButton}>
//             <Text style={styles.promoButtonText}>See Location</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Refer Banner */}
//         <TouchableOpacity style={styles.referBanner} onPress={handleReferPress} activeOpacity={0.8}>
//           <Image
//             source={{ uri: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=200&h=200&fit=crop" }}
//             style={styles.referImage}
//           />
//           <View style={styles.referContent}>
//             <Text style={styles.referText}>Earn Rs. 50 when you Refer an Friend</Text>
//           </View>
//           <View style={styles.referButton}>
//             <Text style={styles.referButtonText}>Refer Now</Text>
//           </View>
//         </TouchableOpacity>

//         {/* Popular Foods */}
//         <View style={styles.section}>
//           <View style={styles.sectionHeader}>
//             <Text style={styles.sectionTitle}>Popular Foods Nearby</Text>
//             <TouchableOpacity>
//               <ChevronRight size={24} color={Colors.primary} />
//             </TouchableOpacity>
//           </View>
//           <View style={styles.foodGrid}>
//             {foodItems.slice(0, 6).map((item) => (
//               <React.Fragment key={item.id}>
//                 {renderFoodItem(item)}
//               </React.Fragment>
//             ))}
//           </View>
//         </View>

//         {/* Featured Items */}
//         <View style={styles.featuredSection}>
//           <View style={styles.sectionHeader}>
//             <Text style={styles.sectionTitle}>Featured Items</Text>
//             <TouchableOpacity>
//               <ChevronRight size={24} color={Colors.primary} />
//             </TouchableOpacity>
//           </View>
          
//           <ScrollView
//             ref={featuredScrollRef}
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             scrollEventThrottle={16}
//             onScroll={handleFeaturedScroll}
//             contentContainerStyle={styles.featuredScrollContent}
//             snapToInterval={220 + 16}
//             decelerationRate="fast"
//           >
//             {featuredItems.map((item, index) => {
//               const isActive = activeFeaturedIndex === index;
//               const scale = isActive ? 1 : 0.92;
//               const opacity = isActive ? 1 : 0.8;
              
//               return (
//                 <Animated.View
//                   key={item.id}
//                   style={[
//                     styles.featuredCard,
//                     {
//                       transform: [{ scale }],
//                       opacity,
//                     },
//                   ]}
//                 >
//                   <View style={styles.featuredImageContainer}>
//                     <Image
//                       source={{ uri: item.image }}
//                       style={styles.featuredImage}
//                     />
//                     <View style={styles.featuredOverlay} />
//                     <View style={styles.featuredBadge}>
//                       <Text style={styles.featuredBadgeText}>Featured</Text>
//                     </View>
//                   </View>
//                   <View style={styles.featuredContent}>
//                     <Text style={styles.featuredTitle}>{item.title}</Text>
//                     <Text style={styles.featuredDescription} numberOfLines={2}>
//                       {item.description}
//                     </Text>
//                     <View style={styles.featuredPriceRow}>
//                       <Text style={styles.featuredPrice}>{item.price}</Text>
//                       <TouchableOpacity style={styles.featuredOrderButton}>
//                         <Text style={styles.featuredOrderText}>Order</Text>
//                       </TouchableOpacity>
//                     </View>
//                   </View>
//                 </Animated.View>
//               );
//             })}
//           </ScrollView>

//           {/* Bottom Progress Line */}
//           <View style={styles.bottomProgressContainer}>
//             <View style={styles.progressLineBackground}>
//               <Animated.View 
//                 style={[
//                   styles.progressLineFill,
//                   { width: `${scrollProgress * 100}%` }
//                 ]} 
//               />
//             </View>
//             <View style={styles.progressDots}>
//               {featuredItems.map((_, index) => (
//                 <View
//                   key={index}
//                   style={[
//                     styles.progressDot,
//                     activeFeaturedIndex === index && styles.activeProgressDot
//                   ]}
//                 />
//               ))}
//             </View>
//           </View>
//         </View>

//         {/* All Restaurants Section */}
//         <View style={styles.allRestaurantsSection}>
//           <View style={styles.sectionHeader}>
//             <Text style={styles.sectionTitle}>All Restaurants</Text>
//             <TouchableOpacity 
//               style={styles.filterButton}
//               onPress={() => setShowSortModal(true)}
//             >
//               <Filter size={20} color={Colors.primary} />
//             </TouchableOpacity>
//           </View>

//           {/* Top Rated Filters */}
//           <View style={styles.filtersContainer}>
//             <Text style={styles.filtersTitle}>Top Rated</Text>
//             <View style={styles.filterChips}>
//               <TouchableOpacity 
//                 style={[
//                   styles.filterChip,
//                   activeFilter === 'all' && styles.activeFilterChip
//                 ]}
//                 onPress={() => handleFilterPress('all')}
//               >
//                 <Text style={[
//                   styles.filterChipText,
//                   activeFilter === 'all' && styles.activeFilterChipText
//                 ]}>All</Text>
//               </TouchableOpacity>
//               <TouchableOpacity 
//                 style={[
//                   styles.filterChip,
//                   activeFilter === 'discounted' && styles.activeFilterChip
//                 ]}
//                 onPress={() => handleFilterPress('discounted')}
//               >
//                 <Text style={[
//                   styles.filterChipText,
//                   activeFilter === 'discounted' && styles.activeFilterChipText
//                 ]}>Discounted</Text>
//               </TouchableOpacity>
//               <TouchableOpacity 
//                 style={[
//                   styles.filterChip,
//                   activeFilter === 'veg' && styles.activeFilterChip
//                 ]}
//                 onPress={() => handleFilterPress('veg')}
//               >
//                 <Text style={[
//                   styles.filterChipText,
//                   activeFilter === 'veg' && styles.activeFilterChipText
//                 ]}>Veg</Text>
//               </TouchableOpacity>
//               <TouchableOpacity 
//                 style={[
//                   styles.filterChip,
//                   activeFilter === 'nonveg' && styles.activeFilterChip
//                 ]}
//                 onPress={() => handleFilterPress('nonveg')}
//               >
//                 <Text style={[
//                   styles.filterChipText,
//                   activeFilter === 'nonveg' && styles.activeFilterChipText
//                 ]}>Non-Veg</Text>
//               </TouchableOpacity>
//             </View>
//           </View>

//           {/* Restaurants List */}
//           <View style={styles.restaurantsList}>
//             {filteredRestaurants.map(renderRestaurantItem)}
//           </View>
//         </View>

//         {/* Sponsored Restaurants */}
//         <View style={styles.section}>
//           <View style={styles.sectionHeader}>
//             <Text style={styles.sectionTitle}>Sponsored Restaurants</Text>
//             <Text style={styles.sectionSubtitle}>✨</Text>
//           </View>
//           <Text style={styles.sectionDescription}>See our most popular restaurants</Text>
//         </View>

//         <View style={{ height: 100 }} />
//       </ScrollView>

//       <AddToCartModal
//         visible={isModalVisible}
//         onClose={() => setIsModalVisible(false)}
//         item={selectedItem}
//         onAddToCart={handleModalAddToCart}
//       />

//       <NotificationModal
//         visible={isNotificationModalVisible}
//         onClose={() => setIsNotificationModalVisible(false)}
//       />

//       <SortModal />
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Colors.white,
//   },
//   scrollView: {
//     flex: 1,
//   },
//   header: {
//     backgroundColor: Colors.primary,
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },
//   locationContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     flex: 1,
//   },
//   locationTextContainer: {
//     marginLeft: 8,
//     flex: 1,
//   },
//   locationLabel: {
//     color: Colors.white,
//     fontSize: 12,
//     fontWeight: "600" as const,
//   },
//   locationAddress: {
//     color: Colors.white,
//     fontSize: 11,
//     opacity: 0.9,
//   },
//   notificationButton: {
//     position: "relative",
//     marginLeft: 12,
//   },
//   notificationDot: {
//     position: "absolute",
//     top: 0,
//     right: 0,
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//     backgroundColor: "#FFF",
//     zIndex: 1,
//   },
//   notificationIcon: {
//     fontSize: 24,
//   },
//   searchContainer: {
//     padding: 16,
//     backgroundColor: Colors.white,
//   },
//   searchBar: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: Colors.lightGray,
//     borderRadius: 28,
//     paddingHorizontal: 18,
//     paddingVertical: 14,
//     gap: 12,
//     elevation: 1,
//     shadowColor: Colors.black,
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.05,
//     shadowRadius: 2,
//   },
//   searchTextContainer: {
//     flex: 1,
//     justifyContent: "center",
//   },
//   searchPlaceholder: {
//     fontSize: 14,
//     color: Colors.gray,
//   },
//   cursor: {
//     color: Colors.primary,
//     fontWeight: "bold",
//   },
//   bannerSection: {
//     marginBottom: 24,
//   },
//   bannerItem: {
//     width: BANNER_WIDTH,
//     height: 200,
//     borderRadius: 20,
//     overflow: "hidden",
//     marginRight: 8,
//     elevation: 4,
//     shadowColor: Colors.black,
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.15,
//     shadowRadius: 8,
//   },
//   bannerImage: {
//     width: "100%",
//     height: "100%",
//     resizeMode: "cover",
//   },
//   bannerOverlay: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: "rgba(0,0,0,0.25)",
//   },
//   bannerContent: {
//     position: "absolute",
//     left: 20,
//     bottom: 20,
//   },
//   bannerLogo: {
//     width: 44,
//     height: 44,
//     borderRadius: 22,
//     marginBottom: 8,
//     borderWidth: 2,
//     borderColor: Colors.white,
//   },
//   bannerTitle: {
//     color: Colors.white,
//     fontSize: 20,
//     fontWeight: "bold" as const,
//     marginBottom: 6,
//     textShadowColor: "rgba(0,0,0,0.6)",
//     textShadowOffset: { width: 0, height: 1 },
//     textShadowRadius: 4,
//     maxWidth: BANNER_WIDTH - 80,
//   },
//   bannerPriceRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 8,
//     marginBottom: 10,
//   },
//   bannerPrice: {
//     color: Colors.white,
//     fontSize: 18,
//     fontWeight: "bold" as const,
//     textShadowColor: "rgba(0,0,0,0.6)",
//     textShadowOffset: { width: 0, height: 1 },
//     textShadowRadius: 4,
//   },
//   bannerDiscountBadge: {
//     backgroundColor: "#FFC107",
//     paddingHorizontal: 8,
//     paddingVertical: 3,
//     borderRadius: 8,
//   },
//   bannerDiscountText: {
//     color: Colors.black,
//     fontSize: 11,
//     fontWeight: "bold" as const,
//   },
//   bannerButton: {
//     backgroundColor: Colors.white,
//     paddingHorizontal: 24,
//     paddingVertical: 10,
//     borderRadius: 24,
//     alignSelf: "flex-start",
//     elevation: 2,
//     shadowColor: Colors.black,
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//   },
//   bannerButtonText: {
//     color: Colors.primary,
//     fontSize: 14,
//     fontWeight: "bold" as const,
//   },
//   pagination: {
//     flexDirection: "row",
//     justifyContent: "center",
//     marginTop: 12,
//     gap: 6,
//   },
//   dot: {
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//     backgroundColor: Colors.borderGray,
//   },
//   activeDot: {
//     backgroundColor: Colors.primary,
//     width: 24,
//   },
//   section: {
//     paddingHorizontal: 16,
//     marginBottom: 24,
//   },
//   sectionHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 16,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "bold" as const,
//     color: Colors.black,
//   },
//   sectionSubtitle: {
//     fontSize: 20,
//   },
//   sectionDescription: {
//     fontSize: 14,
//     color: Colors.gray,
//     marginTop: -8,
//   },
//   trendingList: {
//     gap: 12,
//   },
//   trendingCard: {
//     width: 100,
//     alignItems: "center",
//   },
//   trendingImage: {
//     width: 88,
//     height: 88,
//     borderRadius: 44,
//     marginBottom: 8,
//   },
//   trendingBadge: {
//     position: "absolute",
//     top: 0,
//     right: 6,
//     backgroundColor: Colors.primary,
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 6,
//     paddingVertical: 2,
//     borderRadius: 12,
//     gap: 2,
//   },
//   trendingBadgeText: {
//     color: Colors.white,
//     fontSize: 10,
//     fontWeight: "600" as const,
//   },
//   trendingName: {
//     fontSize: 12,
//     fontWeight: "500" as const,
//     color: Colors.black,
//     textAlign: "center",
//   },
//   cuisineGrid: {
//     gap: 12,
//   },
//   cuisineItem: {
//     flex: 1,
//     maxWidth: (width - 48) / 4,
//     alignItems: "center",
//     marginBottom: 16,
//   },
//   cuisineImageContainer: {
//     position: "relative",
//     marginBottom: 8,
//   },
//   cuisineImage: {
//     width: 72,
//     height: 72,
//     borderRadius: 36,
//   },
//   cuisineTriangle: {
//     position: "absolute",
//     bottom: -8,
//     left: "50%",
//     marginLeft: -8,
//     width: 0,
//     height: 0,
//     backgroundColor: "transparent",
//     borderStyle: "solid",
//     borderLeftWidth: 8,
//     borderRightWidth: 8,
//     borderTopWidth: 12,
//     borderLeftColor: "transparent",
//     borderRightColor: "transparent",
//     borderTopColor: Colors.primary,
//   },
//   cuisineName: {
//     fontSize: 12,
//     fontWeight: "500" as const,
//     color: Colors.black,
//     textAlign: "center",
//   },
//   restaurantPromo: {
//     marginHorizontal: 16,
//     marginBottom: 24,
//     backgroundColor: "#FFF5E6",
//     borderRadius: 20,
//     padding: 20,
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 12,
//     elevation: 2,
//     shadowColor: Colors.black,
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.08,
//     shadowRadius: 4,
//   },
//   promoIcon: {
//     fontSize: 40,
//   },
//   promoContent: {
//     flex: 1,
//   },
//   promoTitle: {
//     fontSize: 16,
//     fontWeight: "bold" as const,
//     color: Colors.black,
//     marginBottom: 4,
//   },
//   promoSubtitle: {
//     fontSize: 12,
//     color: Colors.gray,
//   },
//   promoButton: {
//     backgroundColor: Colors.primary,
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 20,
//   },
//   promoButtonText: {
//     color: Colors.white,
//     fontSize: 12,
//     fontWeight: "600" as const,
//   },
//   referBanner: {
//     marginHorizontal: 16,
//     marginBottom: 24,
//     backgroundColor: Colors.primary,
//     borderRadius: 20,
//     padding: 20,
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 12,
//     elevation: 3,
//     shadowColor: Colors.black,
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.15,
//     shadowRadius: 6,
//   },
//   referImage: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//   },
//   referContent: {
//     flex: 1,
//   },
//   referText: {
//     color: Colors.white,
//     fontSize: 14,
//     fontWeight: "600" as const,
//   },
//   referButton: {
//     backgroundColor: Colors.white,
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 20,
//   },
//   referButtonText: {
//     color: Colors.primary,
//     fontSize: 12,
//     fontWeight: "bold" as const,
//   },
//   foodGrid: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     gap: 12,
//   },
//   foodCard: {
//     width: (width - 44) / 2,
//     backgroundColor: Colors.white,
//     borderRadius: 16,
//     overflow: "hidden",
//     elevation: 3,
//     shadowColor: Colors.black,
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.12,
//     shadowRadius: 6,
//   },
//   foodImage: {
//     width: "100%",
//     height: 150,
//     resizeMode: "cover",
//   },
//   wishlistButton: {
//     position: "absolute",
//     top: 8,
//     left: 8,
//     backgroundColor: "rgba(0,0,0,0.3)",
//     width: 32,
//     height: 32,
//     borderRadius: 16,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   discountBadge: {
//     position: "absolute",
//     top: 8,
//     right: 8,
//     backgroundColor: Colors.primary,
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 12,
//   },
//   discountBadgeText: {
//     color: Colors.white,
//     fontSize: 10,
//     fontWeight: "bold" as const,
//   },
//   foodInfo: {
//     padding: 12,
//   },
//   restaurantLabel: {
//     fontSize: 11,
//     color: Colors.gray,
//     marginBottom: 4,
//   },
//   foodName: {
//     fontSize: 14,
//     fontWeight: "600" as const,
//     color: Colors.black,
//     marginBottom: 8,
//   },
//   foodFooter: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 8,
//   },
//   ratingContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 4,
//   },
//   rating: {
//     fontSize: 12,
//     fontWeight: "600" as const,
//     color: Colors.black,
//   },
//   reviewCount: {
//     fontSize: 11,
//     color: Colors.gray,
//   },
//   addButton: {
//     backgroundColor: Colors.white,
//     width: 28,
//     height: 28,
//     borderRadius: 14,
//     justifyContent: "center",
//     alignItems: "center",
//     elevation: 2,
//     shadowColor: Colors.black,
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.2,
//     shadowRadius: 2,
//   },
//   price: {
//     fontSize: 16,
//     fontWeight: "bold" as const,
//     color: Colors.primary,
//   },
//   featuredSection: {
//     paddingHorizontal: 16,
//     marginBottom: 24,
//   },
//   featuredScrollContent: {
//     paddingRight: 16,
//   },
//   featuredCard: {
//     width: 220,
//     marginRight: 16,
//     borderRadius: 20,
//     backgroundColor: Colors.white,
//     overflow: "hidden",
//     elevation: 6,
//     shadowColor: Colors.black,
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.2,
//     shadowRadius: 12,
//     transform: [{ perspective: 1000 }],
//   },
//   featuredImageContainer: {
//     position: "relative",
//     height: 180,
//   },
//   featuredImage: {
//     width: "100%",
//     height: "100%",
//     resizeMode: "cover",
//   },
//   featuredOverlay: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: "rgba(0,0,0,0.1)",
//   },
//   featuredBadge: {
//     position: "absolute",
//     top: 12,
//     left: 12,
//     backgroundColor: Colors.primary,
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     borderRadius: 10,
//   },
//   featuredBadgeText: {
//     color: Colors.white,
//     fontSize: 11,
//     fontWeight: "bold" as const,
//   },
//   featuredContent: {
//     padding: 16,
//   },
//   featuredTitle: {
//     fontSize: 18,
//     fontWeight: "bold" as const,
//     color: Colors.black,
//     marginBottom: 6,
//   },
//   featuredDescription: {
//     fontSize: 13,
//     color: Colors.gray,
//     marginBottom: 12,
//     lineHeight: 18,
//   },
//   featuredPriceRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   featuredPrice: {
//     fontSize: 18,
//     fontWeight: "bold" as const,
//     color: Colors.primary,
//   },
//   featuredOrderButton: {
//     backgroundColor: Colors.primary,
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 14,
//   },
//   featuredOrderText: {
//     color: Colors.white,
//     fontSize: 13,
//     fontWeight: "600" as const,
//   },
//   bottomProgressContainer: {
//     marginTop: 20,
//     alignItems: "center",
//   },
//   progressLineBackground: {
//     width: 120,
//     height: 4,
//     backgroundColor: Colors.borderGray,
//     borderRadius: 2,
//     overflow: "hidden",
//     marginBottom: 8,
//   },
//   progressLineFill: {
//     height: 4,
//     backgroundColor: Colors.primary,
//     borderRadius: 2,
//   },
//   progressDots: {
//     flexDirection: "row",
//     gap: 8,
//   },
//   progressDot: {
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//     backgroundColor: Colors.borderGray,
//   },
//   activeProgressDot: {
//     backgroundColor: Colors.primary,
//     width: 12,
//     height: 12,
//   },
//   allRestaurantsSection: {
//     paddingHorizontal: 16,
//     marginBottom: 24,
//   },
//   filterButton: {
//     padding: 8,
//     borderRadius: 8,
//     backgroundColor: Colors.lightGray,
//   },
//   filtersContainer: {
//     marginBottom: 16,
//   },
//   filtersTitle: {
//     fontSize: 16,
//     fontWeight: "bold" as const,
//     color: Colors.black,
//     marginBottom: 8,
//   },
//   filterChips: {
//     flexDirection: "row",
//     gap: 8,
//   },
//   filterChip: {
//     backgroundColor: Colors.lightGray,
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 20,
//   },
//   activeFilterChip: {
//     backgroundColor: Colors.primary,
//   },
//   filterChipText: {
//     fontSize: 14,
//     color: Colors.black,
//     fontWeight: "500" as const,
//   },
//   activeFilterChipText: {
//     color: Colors.white,
//   },
//   restaurantsList: {
//     backgroundColor: Colors.white,
//     borderRadius: 12,
//     overflow: "hidden",
//     elevation: 2,
//     shadowColor: Colors.black,
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//   },
//   restaurantCard: {
//     padding: 16,
//     backgroundColor: Colors.white,
//   },
//   restaurantHeader: {
//     flexDirection: 'row',
//     marginBottom: 12,
//   },
//   restaurantImage: {
//     width: 80,
//     height: 80,
//     borderRadius: 12,
//     marginRight: 12,
//   },
//   restaurantHeaderContent: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   restaurantTitleRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 4,
//     flexWrap: 'wrap',
//   },
//   restaurantName: {
//     fontSize: 18,
//     fontWeight: "bold" as const,
//     color: Colors.black,
//     marginRight: 8,
//     flexShrink: 1,
//   },
//   topRatedBadge: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#FFD700',
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 8,
//     gap: 4,
//   },
//   topRatedText: {
//     fontSize: 10,
//     color: Colors.black,
//     fontWeight: "bold" as const,
//   },
//   restaurantCuisine: {
//     fontSize: 14,
//     color: Colors.gray,
//     marginBottom: 8,
//   },
//   tagsContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     gap: 6,
//   },
//   tag: {
//     backgroundColor: Colors.lightGray,
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 6,
//   },
//   tagText: {
//     fontSize: 10,
//     color: Colors.gray,
//     fontWeight: "500" as const,
//   },
//   restaurantInfoRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   restaurantRating: {
//     fontSize: 14,
//     fontWeight: "600" as const,
//     color: Colors.black,
//     marginLeft: 4,
//   },
//   restaurantReviewCount: {
//     fontSize: 12,
//     color: Colors.gray,
//     marginLeft: 2,
//   },
//   deliveryInfo: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 4,
//   },
//   deliveryTime: {
//     fontSize: 12,
//     color: Colors.gray,
//   },
//   distance: {
//     fontSize: 12,
//     color: Colors.gray,
//   },
//   discountContainer: {
//     backgroundColor: '#FFE8E8',
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 8,
//     marginBottom: 12,
//     alignSelf: 'flex-start',
//   },
//   discountText: {
//     fontSize: 12,
//     color: Colors.primary,
//     fontWeight: "600" as const,
//   },
//   actionRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   specialTagContainer: {
//     backgroundColor: Colors.primary,
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 8,
//   },
//   specialTagText: {
//     fontSize: 12,
//     color: Colors.white,
//     fontWeight: "bold" as const,
//   },
//   placeholder: {
//     flex: 1,
//   },
//   orderNowButton: {
//     backgroundColor: Colors.primary,
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     borderRadius: 20,
//     minWidth: 100,
//     alignItems: 'center',
//   },
//   orderNowText: {
//     color: Colors.white,
//     fontSize: 14,
//     fontWeight: "bold" as const,
//   },
//   divider: {
//     height: 1,
//     backgroundColor: Colors.borderGray,
//     marginTop: 8,
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   sortModalContent: {
//     backgroundColor: Colors.white,
//     borderRadius: 16,
//     padding: 20,
//     width: '80%',
//     maxWidth: 300,
//   },
//   sortModalTitle: {
//     fontSize: 18,
//     fontWeight: "bold" as const,
//     color: Colors.black,
//     marginBottom: 16,
//     textAlign: 'center',
//   },
//   sortOption: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     borderRadius: 8,
//     marginBottom: 8,
//   },
//   activeSortOption: {
//     backgroundColor: Colors.primary + '20',
//   },
//   sortOptionText: {
//     fontSize: 16,
//     color: Colors.black,
//   },
//   activeSortOptionText: {
//     color: Colors.primary,
//     fontWeight: "600" as const,
//   },
//   sortCheckmark: {
//     color: Colors.primary,
//     fontSize: 16,
//     fontWeight: "bold" as const,
//   },
// });














import AddToCartModal from "@/app/components/AddToCartModal";
import NotificationModal from "@/app/components/NotificationModal";
import Colors from "@/constants/color";
import { cuisines } from "@/mocks/cuisin";
import { foodItems, restaurants } from "@/mocks/restaurents";
import { useApp } from "@/providers/AppProvider";
import { useRouter } from "expo-router";
import {
  ChevronRight,
  Flame,
  Heart,
  MapPin,
  Mic,
  Search,
  Filter,
  Star,
  Clock,
} from "lucide-react-native";
import React, { useCallback, useEffect, useRef, useState, useMemo } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");
const BANNER_WIDTH = width - 32;

// Filter types
type RestaurantFilter = 'all' | 'veg' | 'nonveg' | 'discounted';
type SortOption = 'all' | 'takeaway' | 'delivery' | 'dinein' | 'latest' | 'popular';

// Dummy restaurants data with string IDs
const allRestaurants = [
  {
    id: "1",
    name: "Royal Cakes",
    cuisine: "Cake, Bakery, Desserts",
    rating: 5.0,
    reviewCount: 3,
    deliveryTime: "55-60 min",
    distance: "1.3 KM",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=200&fit=crop",
    isDiscounted: true,
    isVeg: true,
    isNonVeg: false,
    deliveryType: ['delivery', 'takeaway'],
    isTopRated: true,
    discount: "20% OFF",
    tags: ["Cakes", "Desserts", "Bakery"]
  },
  {
    id: "2",
    name: "Taste of Heaven",
    cuisine: "Indian, Chinese, Nepali Dish",
    rating: 3.1,
    reviewCount: 7,
    deliveryTime: "55-60 min",
    distance: "1.5 KM",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&h=200&fit=crop",
    isDiscounted: false,
    isVeg: true,
    isNonVeg: true,
    deliveryType: ['delivery', 'dinein'],
    isTopRated: false,
    tags: ["Indian", "Chinese", "Nepali"]
  },
  {
    id: "3",
    name: "Cholia Chhen- Newari Kitchen",
    cuisine: "Newari Cuisine, Nepali Dish, Fast Food",
    rating: 4.7,
    reviewCount: 30,
    deliveryTime: "55-60 min",
    distance: "1.7 KM",
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=300&h=200&fit=crop",
    isDiscounted: true,
    isVeg: true,
    isNonVeg: true,
    specialTag: "DELICIOUS CHOILA",
    deliveryType: ['delivery', 'takeaway', 'dinein'],
    isTopRated: true,
    discount: "15% OFF",
    tags: ["Newari", "Traditional", "Spicy"]
  },
  {
    id: "4",
    name: "Pizza Palace",
    cuisine: "Italian, Pizza, Fast Food",
    rating: 4.3,
    reviewCount: 45,
    deliveryTime: "40-45 min",
    distance: "2.1 KM",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&h=200&fit=crop",
    isDiscounted: true,
    isVeg: true,
    isNonVeg: true,
    deliveryType: ['delivery', 'takeaway'],
    isTopRated: true,
    discount: "25% OFF",
    tags: ["Pizza", "Italian", "Fast Food"]
  },
  {
    id: "5",
    name: "Burger Hub",
    cuisine: "American, Burgers, Fast Food",
    rating: 4.5,
    reviewCount: 28,
    deliveryTime: "35-40 min",
    distance: "1.8 KM",
    image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=300&h=200&fit=crop",
    isDiscounted: false,
    isVeg: true,
    isNonVeg: true,
    deliveryType: ['delivery', 'takeaway', 'dinein'],
    isTopRated: false,
    tags: ["Burgers", "American", "Fast Food"]
  },
  {
    id: "6",
    name: "Sushi Master",
    cuisine: "Japanese, Sushi, Asian",
    rating: 4.8,
    reviewCount: 62,
    deliveryTime: "50-55 min",
    distance: "2.5 KM",
    image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=300&h=200&fit=crop",
    isDiscounted: true,
    isVeg: true,
    isNonVeg: true,
    deliveryType: ['dinein'],
    isTopRated: true,
    discount: "10% OFF",
    tags: ["Sushi", "Japanese", "Healthy"]
  },
  {
    id: "7",
    name: "Momo Magic",
    cuisine: "Nepali, Tibetan, Fast Food",
    rating: 4.6,
    reviewCount: 89,
    deliveryTime: "30-35 min",
    distance: "1.2 KM",
    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=300&h=200&fit=crop",
    isDiscounted: true,
    isVeg: true,
    isNonVeg: true,
    deliveryType: ['delivery', 'takeaway'],
    isTopRated: false,
    discount: "30% OFF",
    tags: ["Momo", "Nepali", "Street Food"]
  },
  {
    id: "8",
    name: "Thakali Bhojanalaya",
    cuisine: "Nepali, Thakali, Traditional",
    rating: 4.9,
    reviewCount: 120,
    deliveryTime: "45-50 min",
    distance: "2.3 KM",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300&h=200&fit=crop",
    isDiscounted: false,
    isVeg: true,
    isNonVeg: true,
    deliveryType: ['dinein'],
    isTopRated: true,
    tags: ["Thakali", "Traditional", "Nepali"]
  },
  {
    id: "9",
    name: "Cafe Delight",
    cuisine: "Coffee, Bakery, Snacks",
    rating: 4.2,
    reviewCount: 34,
    deliveryTime: "25-30 min",
    distance: "0.8 KM",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=300&h=200&fit=crop",
    isDiscounted: true,
    isVeg: true,
    isNonVeg: false,
    deliveryType: ['takeaway', 'dinein'],
    isTopRated: false,
    discount: "20% OFF",
    tags: ["Coffee", "Bakery", "Snacks"]
  },
  {
    id: "10",
    name: "BBQ Nation",
    cuisine: "Barbecue, Grill, Non-Veg",
    rating: 4.4,
    reviewCount: 76,
    deliveryTime: "60-65 min",
    distance: "2.8 KM",
    image: "https://images.unsplash.com/photo-1558036117-15e82a2c9a9a?w=300&h=200&fit=crop",
    isDiscounted: true,
    isVeg: false,
    isNonVeg: true,
    deliveryType: ['delivery', 'dinein'],
    isTopRated: true,
    discount: "15% OFF",
    tags: ["BBQ", "Grill", "Non-Veg"]
  }
];

export default function HomeScreen() {
  const router = useRouter();
  const { isFoodInWishlist, toggleFoodWishlist, addToCart } = useApp();
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState<(typeof foodItems)[0] | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isNotificationModalVisible, setIsNotificationModalVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeFeaturedIndex, setActiveFeaturedIndex] = useState(0);
  
  // Restaurant filter states
  const [activeFilter, setActiveFilter] = useState<RestaurantFilter>('all');
  const [showSortModal, setShowSortModal] = useState(false);
  const [activeSort, setActiveSort] = useState<SortOption>('all');
  
  // Typing animation states
  const [displayedText, setDisplayedText] = useState("");
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);
  
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const flatListRef = useRef<FlatList>(null);
  const featuredScrollRef = useRef<ScrollView>(null);
  const autoScrollTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const typingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  const searchPhrases = [
    "Browse today's best deals and combos",
    "Search for pizza, burger, momo...",
    "Find restaurants near you",
    "Order your favorite food",
    "Get 50% off on first order",
    "Try our special dishes",
    "Fast delivery available",
    "Explore different cuisines"
  ];

  const featuredItems = [
    {
      id: "1",
      image: "https://images.unsplash.com/photo-1606788075763-2e6f252c9cbb?w=400&h=400&fit=crop",
      title: "Party Pack-1",
      description: "Perfect combo for family gatherings with delicious variety",
      price: "Rs. 1,499"
    },
    {
      id: "2",
      image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=400&fit=crop",
      title: "Chicken Nuggets",
      description: "19 pcs crispy chicken nuggets with special sauce",
      price: "Rs. 599"
    },
    {
      id: "3",
      image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&h=400&fit=crop",
      title: "Family Combo",
      description: "Special family meal deal for 4 people",
      price: "Rs. 2,199"
    },
    {
      id: "4",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=400&fit=crop",
      title: "Lunch Special",
      description: "Quick and delicious lunch with free drink",
      price: "Rs. 899"
    }
  ];

  // Use useMemo for filtered restaurants to prevent unnecessary recalculations
  const filteredRestaurants = useMemo(() => {
    let filtered = allRestaurants;
    
    // Apply food type filter
    if (activeFilter === 'veg') {
      filtered = filtered.filter(restaurant => restaurant.isVeg);
    } else if (activeFilter === 'nonveg') {
      filtered = filtered.filter(restaurant => restaurant.isNonVeg);
    } else if (activeFilter === 'discounted') {
      filtered = filtered.filter(restaurant => restaurant.isDiscounted);
    }
    
    // Apply sort filter
    if (activeSort === 'takeaway') {
      filtered = filtered.filter(restaurant => restaurant.deliveryType.includes('takeaway'));
    } else if (activeSort === 'delivery') {
      filtered = filtered.filter(restaurant => restaurant.deliveryType.includes('delivery'));
    } else if (activeSort === 'dinein') {
      filtered = filtered.filter(restaurant => restaurant.deliveryType.includes('dinein'));
    } else if (activeSort === 'latest') {
      filtered = [...filtered].reverse(); // Simple reverse for demo
    } else if (activeSort === 'popular') {
      filtered = [...filtered].sort((a, b) => b.reviewCount - a.reviewCount);
    }
    // No additional filtering for 'all'
    
    return filtered;
  }, [activeFilter, activeSort]);

  const trendingFoods = useMemo(() => 
    foodItems.filter((item) => item.tags?.includes("Trending")).slice(0, 5), 
  []);
  
  const bannerData = useMemo(() => trendingFoods.slice(0, 3), [trendingFoods]);

  // Typing animation effect
  useEffect(() => {
    const type = () => {
      const currentPhrase = searchPhrases[currentPhraseIndex];
      
      if (!isDeleting) {
        // Typing forward
        if (displayedText.length < currentPhrase.length) {
          setDisplayedText(currentPhrase.substring(0, displayedText.length + 1));
          setTypingSpeed(100);
        } else {
          // Finished typing, wait then start deleting
          setTypingSpeed(1500);
          setIsDeleting(true);
        }
      } else {
        // Deleting
        if (displayedText.length > 0) {
          setDisplayedText(currentPhrase.substring(0, displayedText.length - 1));
          setTypingSpeed(50);
        } else {
          // Finished deleting, move to next phrase
          setIsDeleting(false);
          setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % searchPhrases.length);
          setTypingSpeed(500);
        }
      }
    };

    typingTimer.current = setTimeout(type, typingSpeed);

    return () => {
      if (typingTimer.current) {
        clearTimeout(typingTimer.current);
      }
    };
  }, [displayedText, isDeleting, currentPhraseIndex, typingSpeed]);

  // Auto scroll functionality
  useEffect(() => {
    const startAutoScroll = () => {
      autoScrollTimer.current = setInterval(() => {
        setCurrentBannerIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % bannerData.length;
          if (flatListRef.current) {
            flatListRef.current.scrollToIndex({
              index: nextIndex,
              animated: true,
            });
          }
          return nextIndex;
        });
      }, 3000);
    };

    const stopAutoScroll = () => {
      if (autoScrollTimer.current) {
        clearInterval(autoScrollTimer.current);
        autoScrollTimer.current = null;
      }
    };

    startAutoScroll();

    return () => {
      stopAutoScroll();
    };
  }, [bannerData.length]);

  const handleManualScroll = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / (BANNER_WIDTH + 8));
    setCurrentBannerIndex(index);

    if (autoScrollTimer.current) {
      clearInterval(autoScrollTimer.current);
    }
    autoScrollTimer.current = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % bannerData.length;
        if (flatListRef.current) {
          flatListRef.current.scrollToIndex({
            index: nextIndex,
            animated: true,
          });
        }
        return nextIndex;
      });
    }, 3000);
  };

  const handleFeaturedScroll = (event: any) => {
    const x = event.nativeEvent.contentOffset.x;
    const itemWidth = 220 + 16;
    const activeIndex = Math.round(x / itemWidth);
    setActiveFeaturedIndex(activeIndex);
    
    // Calculate progress for the line
    const totalScrollableWidth = itemWidth * (featuredItems.length - 1);
    const progress = Math.min(Math.max(x / totalScrollableWidth, 0), 1);
    setScrollProgress(progress);
  };

  const handleAddToCartPress = useCallback((item: (typeof foodItems)[0]) => {
    setSelectedItem(item);
    setIsModalVisible(true);
  }, []);

  const handleModalAddToCart = useCallback(
    (item: any, quantity: number, selectedOption?: string) => {
      for (let i = 0; i < quantity; i++) {
        addToCart(item);
      }
      if (selectedOption) {
        console.log("Selected option:", selectedOption);
      }
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 0.95,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
    },
    [addToCart, scaleAnim]
  );

  const handleNotificationPress = useCallback(() => {
    setIsNotificationModalVisible(true);
  }, []);

  const handleReferPress = useCallback(() => {
    router.push("/refer-earn");
  }, [router]);

  const handleFilterPress = useCallback((filter: RestaurantFilter) => {
    setActiveFilter(filter);
  }, []);

  const handleSortPress = useCallback((sort: SortOption) => {
    setActiveSort(sort);
    setShowSortModal(false);
  }, []);

  // Fixed: Use search results instead of non-existent restaurant route
  const handleOrderNowPress = useCallback((restaurantId: string) => {
    console.log("Order now pressed for restaurant:", restaurantId);
    router.push(`/search-results?query=${encodeURIComponent(restaurantId)}`);
  }, [router]);

  const renderBannerItem = useCallback(({ item, index }: { item: (typeof foodItems)[0]; index: number }) => (
    <Pressable
      style={[styles.bannerItem, { marginLeft: index === 0 ? 16 : 8 }]}
      onPress={() => console.log("Banner item:", item.id)}
    >
      <Image source={{ uri: item.image }} style={styles.bannerImage} />
      <View style={styles.bannerOverlay} />
      <View style={styles.bannerContent}>
        <Image source={{ uri: restaurants[0].logo }} style={styles.bannerLogo} />
        <Text style={styles.bannerTitle} numberOfLines={2}>
          {item.name}
        </Text>
        <View style={styles.bannerPriceRow}>
          <Text style={styles.bannerPrice}>Rs. {item.price}</Text>
          {item.discount && (
            <View style={styles.bannerDiscountBadge}>
              <Text style={styles.bannerDiscountText}>{item.discount}% OFF</Text>
            </View>
          )}
        </View>
        <TouchableOpacity style={styles.bannerButton} activeOpacity={0.8}>
          <Text style={styles.bannerButtonText}>Order Now</Text>
        </TouchableOpacity>
      </View>
    </Pressable>
  ), []);

  const renderCuisineItem = useCallback(({ item }: { item: (typeof cuisines)[0] }) => (
    <TouchableOpacity
      style={styles.cuisineItem}
      onPress={() =>
        router.push(`/search-results?query=${encodeURIComponent(item.name)}`)
      }
    >
      <View style={styles.cuisineImageContainer}>
        <Image source={{ uri: item.image }} style={styles.cuisineImage} />
        <View style={styles.cuisineTriangle} />
      </View>
      <Text style={styles.cuisineName}>{item.name}</Text>
    </TouchableOpacity>
  ), [router]);

  const renderTrendingItem = useCallback(({ item }: { item: (typeof trendingFoods)[0] }) => (
    <TouchableOpacity 
      style={styles.trendingCard}
      onPress={() => handleAddToCartPress(item)}
    >
      <Image source={{ uri: item.image }} style={styles.trendingImage} />
      <View style={styles.trendingBadge}>
        <Flame size={12} color={Colors.white} />
        <Text style={styles.trendingBadgeText}>Trending</Text>
      </View>
      <Text style={styles.trendingName}>{item.name}</Text>
    </TouchableOpacity>
  ), [handleAddToCartPress]);

  const renderFoodItem = useCallback((item: (typeof foodItems)[0]) => {
    const inWishlist = isFoodInWishlist(item.id);
    return (
      <TouchableOpacity
        key={item.id}
        style={styles.foodCard}
        onPress={() => handleAddToCartPress(item)}
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
          <Text style={styles.restaurantLabel} numberOfLines={1}>
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
          </View>
          <Text style={styles.price}>Rs. {item.price}</Text>
        </View>
      </TouchableOpacity>
    );
  }, [isFoodInWishlist, handleAddToCartPress, toggleFoodWishlist]);

  const renderRestaurantItem = useCallback((restaurant: typeof allRestaurants[0]) => (
    <View key={restaurant.id} style={styles.restaurantCard}>
      {/* Restaurant Header with Image */}
      <View style={styles.restaurantHeader}>
        <Image source={{ uri: restaurant.image }} style={styles.restaurantImage} />
        <View style={styles.restaurantHeaderContent}>
          <View style={styles.restaurantTitleRow}>
            <Text style={styles.restaurantName}>{restaurant.name}</Text>
            {restaurant.isTopRated && (
              <View style={styles.topRatedBadge}>
                <Star size={12} color={Colors.white} />
                <Text style={styles.topRatedText}>Top Rated</Text>
              </View>
            )}
          </View>
          <Text style={styles.restaurantCuisine}>{restaurant.cuisine}</Text>
          
          {/* Tags */}
          <View style={styles.tagsContainer}>
            {restaurant.tags?.slice(0, 2).map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Rating and Delivery Info */}
      <View style={styles.restaurantInfoRow}>
        <View style={styles.ratingContainer}>
          <Star size={14} color="#FFD700" fill="#FFD700" />
          <Text style={styles.restaurantRating}>{restaurant.rating}</Text>
          <Text style={styles.restaurantReviewCount}>({restaurant.reviewCount})</Text>
        </View>
        
        <View style={styles.deliveryInfo}>
          <Clock size={14} color={Colors.gray} />
          <Text style={styles.deliveryTime}>{restaurant.deliveryTime}</Text>
          <Text style={styles.distance}>• {restaurant.distance}</Text>
        </View>
      </View>

      {/* Discount Badge if available */}
      {restaurant.isDiscounted && restaurant.discount && (
        <View style={styles.discountContainer}>
          <Text style={styles.discountText}>🎉 {restaurant.discount} on all orders</Text>
        </View>
      )}

      {/* Special Tag with Order Now Button */}
      <View style={styles.actionRow}>
        {restaurant.specialTag ? (
          <View style={styles.specialTagContainer}>
            <Text style={styles.specialTagText}>{restaurant.specialTag}</Text>
          </View>
        ) : (
          <View style={styles.placeholder} />
        )}
        
        <TouchableOpacity 
          style={styles.orderNowButton}
          onPress={() => handleOrderNowPress(restaurant.id)}
        >
          <Text style={styles.orderNowText}>Order Now</Text>
        </TouchableOpacity>
      </View>

      {/* Divider */}
      <View style={styles.divider} />
    </View>
  ), [handleOrderNowPress]);

  const SortModal = useCallback(() => (
    <Modal
      visible={showSortModal}
      transparent
      animationType="fade"
      onRequestClose={() => setShowSortModal(false)}
    >
      <TouchableOpacity 
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={() => setShowSortModal(false)}
      >
        <View style={styles.sortModalContent}>
          <Text style={styles.sortModalTitle}>Sort By</Text>
          {(['all', 'takeaway', 'delivery', 'dinein', 'latest', 'popular'] as SortOption[]).map((sortOption) => (
            <TouchableOpacity
              key={sortOption}
              style={[
                styles.sortOption,
                activeSort === sortOption && styles.activeSortOption
              ]}
              onPress={() => handleSortPress(sortOption)}
            >
              <Text style={[
                styles.sortOptionText,
                activeSort === sortOption && styles.activeSortOptionText
              ]}>
                {sortOption.charAt(0).toUpperCase() + sortOption.slice(1)}
              </Text>
              {activeSort === sortOption && (
                <View style={styles.sortCheckmark}>
                  <Text style={styles.sortCheckmarkText}>✓</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </TouchableOpacity>
    </Modal>
  ), [showSortModal, activeSort, handleSortPress]);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <View style={styles.locationContainer}>
          <MapPin size={20} color={Colors.white} />
          <View style={styles.locationTextContainer}>
            <Text style={styles.locationLabel}>Your Current Location</Text>
            <Text style={styles.locationAddress} numberOfLines={1}>
              P8F6+7FW, Rayamajhi Marga, Kathmandu 44600, Nepal
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.notificationButton} onPress={handleNotificationPress}>
          <View style={styles.notificationDot} />
          <Text style={styles.notificationIcon}>🔔</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        <View style={styles.searchContainer}>
          <TouchableOpacity
            style={styles.searchBar}
            onPress={() => router.push("/search-results")}
            activeOpacity={0.7}
          >
            <Search size={20} color={Colors.gray} />
            <View style={styles.searchTextContainer}>
              <Text style={styles.searchPlaceholder}>
                {displayedText}
                <Text style={styles.cursor}>|</Text>
              </Text>
            </View>
            <Mic size={20} color={Colors.gray} />
          </TouchableOpacity>
        </View>

        {/* Banner Section */}
        <View style={styles.bannerSection}>
          <FlatList
            ref={flatListRef}
            data={bannerData}
            renderItem={renderBannerItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={BANNER_WIDTH + 8}
            decelerationRate="fast"
            contentContainerStyle={{ paddingRight: 16 }}
            onMomentumScrollEnd={handleManualScroll}
            onScrollBeginDrag={() => {
              if (autoScrollTimer.current) clearInterval(autoScrollTimer.current);
            }}
            getItemLayout={(data, index) => ({
              length: BANNER_WIDTH + 8,
              offset: (BANNER_WIDTH + 8) * index,
              index,
            })}
          />
          <View style={styles.pagination}>
            {bannerData.map((_, idx) => (
              <View
                key={idx}
                style={[styles.dot, currentBannerIndex === idx && styles.activeDot]}
              />
            ))}
          </View>
        </View>

        {/* Trending */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Whats Your Craving Today?</Text>
            <TouchableOpacity>
              <ChevronRight size={24} color={Colors.primary} />
            </TouchableOpacity>
          </View>
          <FlatList
            data={trendingFoods}
            renderItem={renderTrendingItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.trendingList}
          />
        </View>

        {/* Cuisine */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Cuisine</Text>
            <TouchableOpacity>
              <ChevronRight size={24} color={Colors.primary} />
            </TouchableOpacity>
          </View>
          <FlatList
            data={cuisines}
            renderItem={renderCuisineItem}
            keyExtractor={(item) => item.id}
            numColumns={4}
            scrollEnabled={false}
            contentContainerStyle={styles.cuisineGrid}
          />
        </View>

        {/* Restaurant Promo */}
        <View style={styles.restaurantPromo}>
          <Text style={styles.promoIcon}>🍽️</Text>
          <View style={styles.promoContent}>
            <Text style={styles.promoTitle}>Find Restaurants Nearby</Text>
            <Text style={styles.promoSubtitle}>Restaurant Near from You</Text>
          </View>
          <TouchableOpacity style={styles.promoButton}>
            <Text style={styles.promoButtonText}>See Location</Text>
          </TouchableOpacity>
        </View>

        {/* Refer Banner */}
        <TouchableOpacity style={styles.referBanner} onPress={handleReferPress} activeOpacity={0.8}>
          <Image
            source={{ uri: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=200&h=200&fit=crop" }}
            style={styles.referImage}
          />
          <View style={styles.referContent}>
            <Text style={styles.referText}>Earn Rs. 50 when you Refer an Friend</Text>
          </View>
          <View style={styles.referButton}>
            <Text style={styles.referButtonText}>Refer Now</Text>
          </View>
        </TouchableOpacity>

        {/* Popular Foods */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular Foods Nearby</Text>
            <TouchableOpacity>
              <ChevronRight size={24} color={Colors.primary} />
            </TouchableOpacity>
          </View>
          <View style={styles.foodGrid}>
            {foodItems.slice(0, 6).map((item) => (
              <React.Fragment key={item.id}>
                {renderFoodItem(item)}
              </React.Fragment>
            ))}
          </View>
        </View>

        {/* Featured Items */}
        <View style={styles.featuredSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Items</Text>
            <TouchableOpacity>
              <ChevronRight size={24} color={Colors.primary} />
            </TouchableOpacity>
          </View>
          
          <ScrollView
            ref={featuredScrollRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={handleFeaturedScroll}
            contentContainerStyle={styles.featuredScrollContent}
            snapToInterval={220 + 16}
            decelerationRate="fast"
          >
            {featuredItems.map((item, index) => {
              const isActive = activeFeaturedIndex === index;
              const scale = isActive ? 1 : 0.92;
              const opacity = isActive ? 1 : 0.8;
              
              return (
                <Animated.View
                  key={item.id}
                  style={[
                    styles.featuredCard,
                    {
                      transform: [{ scale }],
                      opacity,
                    },
                  ]}
                >
                  <View style={styles.featuredImageContainer}>
                    <Image
                      source={{ uri: item.image }}
                      style={styles.featuredImage}
                    />
                    <View style={styles.featuredOverlay} />
                    <View style={styles.featuredBadge}>
                      <Text style={styles.featuredBadgeText}>Featured</Text>
                    </View>
                  </View>
                  <View style={styles.featuredContent}>
                    <Text style={styles.featuredTitle}>{item.title}</Text>
                    <Text style={styles.featuredDescription} numberOfLines={2}>
                      {item.description}
                    </Text>
                    <View style={styles.featuredPriceRow}>
                      <Text style={styles.featuredPrice}>{item.price}</Text>
                      <TouchableOpacity style={styles.featuredOrderButton}>
                        <Text style={styles.featuredOrderText}>Order</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Animated.View>
              );
            })}
          </ScrollView>

          {/* Bottom Progress Line */}
          <View style={styles.bottomProgressContainer}>
            <View style={styles.progressLineBackground}>
              <Animated.View 
                style={[
                  styles.progressLineFill,
                  { width: `${scrollProgress * 100}%` }
                ]} 
              />
            </View>
            <View style={styles.progressDots}>
              {featuredItems.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.progressDot,
                    activeFeaturedIndex === index && styles.activeProgressDot
                  ]}
                />
              ))}
            </View>
          </View>
        </View>

        {/* All Restaurants Section */}
        <View style={styles.allRestaurantsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>All Restaurants</Text>
            <TouchableOpacity 
              style={styles.filterButton}
              onPress={() => setShowSortModal(true)}
            >
              <Filter size={20} color={Colors.primary} />
            </TouchableOpacity>
          </View>

          {/* Top Rated Filters */}
          <View style={styles.filtersContainer}>
            <Text style={styles.filtersTitle}>Top Rated</Text>
            <View style={styles.filterChips}>
              <TouchableOpacity 
                style={[
                  styles.filterChip,
                  activeFilter === 'all' && styles.activeFilterChip
                ]}
                onPress={() => handleFilterPress('all')}
              >
                <Text style={[
                  styles.filterChipText,
                  activeFilter === 'all' && styles.activeFilterChipText
                ]}>All</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[
                  styles.filterChip,
                  activeFilter === 'discounted' && styles.activeFilterChip
                ]}
                onPress={() => handleFilterPress('discounted')}
              >
                <Text style={[
                  styles.filterChipText,
                  activeFilter === 'discounted' && styles.activeFilterChipText
                ]}>Discounted</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[
                  styles.filterChip,
                  activeFilter === 'veg' && styles.activeFilterChip
                ]}
                onPress={() => handleFilterPress('veg')}
              >
                <Text style={[
                  styles.filterChipText,
                  activeFilter === 'veg' && styles.activeFilterChipText
                ]}>Veg</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[
                  styles.filterChip,
                  activeFilter === 'nonveg' && styles.activeFilterChip
                ]}
                onPress={() => handleFilterPress('nonveg')}
              >
                <Text style={[
                  styles.filterChipText,
                  activeFilter === 'nonveg' && styles.activeFilterChipText
                ]}>Non-Veg</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Restaurants List */}
          <View style={styles.restaurantsList}>
            {filteredRestaurants.map(renderRestaurantItem)}
          </View>
        </View>

        {/* Sponsored Restaurants */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Sponsored Restaurants</Text>
            <Text style={styles.sectionSubtitle}>✨</Text>
          </View>
          <Text style={styles.sectionDescription}>See our most popular restaurants</Text>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      <AddToCartModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        item={selectedItem}
        onAddToCart={handleModalAddToCart}
      />

      <NotificationModal
        visible={isNotificationModalVisible}
        onClose={() => setIsNotificationModalVisible(false)}
      />

      <SortModal />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  locationTextContainer: {
    marginLeft: 8,
    flex: 1,
  },
  locationLabel: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: "600" as const,
  },
  locationAddress: {
    color: Colors.white,
    fontSize: 11,
    opacity: 0.9,
  },
  notificationButton: {
    position: "relative",
    marginLeft: 12,
  },
  notificationDot: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FFF",
    zIndex: 1,
  },
  notificationIcon: {
    fontSize: 24,
  },
  searchContainer: {
    padding: 16,
    backgroundColor: Colors.white,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.lightGray,
    borderRadius: 28,
    paddingHorizontal: 18,
    paddingVertical: 14,
    gap: 12,
    elevation: 1,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  searchTextContainer: {
    flex: 1,
    justifyContent: "center",
  },
  searchPlaceholder: {
    fontSize: 14,
    color: Colors.gray,
  },
  cursor: {
    color: Colors.primary,
    fontWeight: "bold",
  },
  bannerSection: {
    marginBottom: 24,
  },
  bannerItem: {
    width: BANNER_WIDTH,
    height: 200,
    borderRadius: 20,
    overflow: "hidden",
    marginRight: 8,
    elevation: 4,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  bannerImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  bannerOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.25)",
  },
  bannerContent: {
    position: "absolute",
    left: 20,
    bottom: 20,
  },
  bannerLogo: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: Colors.white,
  },
  bannerTitle: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: "bold" as const,
    marginBottom: 6,
    textShadowColor: "rgba(0,0,0,0.6)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
    maxWidth: BANNER_WIDTH - 80,
  },
  bannerPriceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },
  bannerPrice: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: "bold" as const,
    textShadowColor: "rgba(0,0,0,0.6)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  bannerDiscountBadge: {
    backgroundColor: "#FFC107",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  bannerDiscountText: {
    color: Colors.black,
    fontSize: 11,
    fontWeight: "bold" as const,
  },
  bannerButton: {
    backgroundColor: Colors.white,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 24,
    alignSelf: "flex-start",
    elevation: 2,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  bannerButtonText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: "bold" as const,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 12,
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.borderGray,
  },
  activeDot: {
    backgroundColor: Colors.primary,
    width: 24,
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold" as const,
    color: Colors.black,
  },
  sectionSubtitle: {
    fontSize: 20,
  },
  sectionDescription: {
    fontSize: 14,
    color: Colors.gray,
    marginTop: -8,
  },
  trendingList: {
    gap: 12,
  },
  trendingCard: {
    width: 100,
    alignItems: "center",
  },
  trendingImage: {
    width: 88,
    height: 88,
    borderRadius: 44,
    marginBottom: 8,
  },
  trendingBadge: {
    position: "absolute",
    top: 0,
    right: 6,
    backgroundColor: Colors.primary,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 12,
    gap: 2,
  },
  trendingBadgeText: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: "600" as const,
  },
  trendingName: {
    fontSize: 12,
    fontWeight: "500" as const,
    color: Colors.black,
    textAlign: "center",
  },
  cuisineGrid: {
    gap: 12,
  },
  cuisineItem: {
    flex: 1,
    maxWidth: (width - 48) / 4,
    alignItems: "center",
    marginBottom: 16,
  },
  cuisineImageContainer: {
    position: "relative",
    marginBottom: 8,
  },
  cuisineImage: {
    width: 72,
    height: 72,
    borderRadius: 36,
  },
  cuisineTriangle: {
    position: "absolute",
    bottom: -8,
    left: "50%",
    marginLeft: -8,
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderTopWidth: 12,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: Colors.primary,
  },
  cuisineName: {
    fontSize: 12,
    fontWeight: "500" as const,
    color: Colors.black,
    textAlign: "center",
  },
  restaurantPromo: {
    marginHorizontal: 16,
    marginBottom: 24,
    backgroundColor: "#FFF5E6",
    borderRadius: 20,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    elevation: 2,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  promoIcon: {
    fontSize: 40,
  },
  promoContent: {
    flex: 1,
  },
  promoTitle: {
    fontSize: 16,
    fontWeight: "bold" as const,
    color: Colors.black,
    marginBottom: 4,
  },
  promoSubtitle: {
    fontSize: 12,
    color: Colors.gray,
  },
  promoButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  promoButtonText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: "600" as const,
  },
  referBanner: {
    marginHorizontal: 16,
    marginBottom: 24,
    backgroundColor: Colors.primary,
    borderRadius: 20,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    elevation: 3,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  referImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  referContent: {
    flex: 1,
  },
  referText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: "600" as const,
  },
  referButton: {
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  referButtonText: {
    color: Colors.primary,
    fontSize: 12,
    fontWeight: "bold" as const,
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
  discountBadgeText: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: "bold" as const,
  },
  foodInfo: {
    padding: 12,
  },
  restaurantLabel: {
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
  featuredSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  featuredScrollContent: {
    paddingRight: 16,
  },
  featuredCard: {
    width: 220,
    marginRight: 16,
    borderRadius: 20,
    backgroundColor: Colors.white,
    overflow: "hidden",
    elevation: 6,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    transform: [{ perspective: 1000 }],
  },
  featuredImageContainer: {
    position: "relative",
    height: 180,
  },
  featuredImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  featuredOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  featuredBadge: {
    position: "absolute",
    top: 12,
    left: 12,
    backgroundColor: Colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  featuredBadgeText: {
    color: Colors.white,
    fontSize: 11,
    fontWeight: "bold" as const,
  },
  featuredContent: {
    padding: 16,
  },
  featuredTitle: {
    fontSize: 18,
    fontWeight: "bold" as const,
    color: Colors.black,
    marginBottom: 6,
  },
  featuredDescription: {
    fontSize: 13,
    color: Colors.gray,
    marginBottom: 12,
    lineHeight: 18,
  },
  featuredPriceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  featuredPrice: {
    fontSize: 18,
    fontWeight: "bold" as const,
    color: Colors.primary,
  },
  featuredOrderButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 14,
  },
  featuredOrderText: {
    color: Colors.white,
    fontSize: 13,
    fontWeight: "600" as const,
  },
  bottomProgressContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  progressLineBackground: {
    width: 120,
    height: 4,
    backgroundColor: Colors.borderGray,
    borderRadius: 2,
    overflow: "hidden",
    marginBottom: 8,
  },
  progressLineFill: {
    height: 4,
    backgroundColor: Colors.primary,
    borderRadius: 2,
  },
  progressDots: {
    flexDirection: "row",
    gap: 8,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.borderGray,
  },
  activeProgressDot: {
    backgroundColor: Colors.primary,
    width: 12,
    height: 12,
  },
  allRestaurantsSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  filterButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: Colors.lightGray,
  },
  filtersContainer: {
    marginBottom: 16,
  },
  filtersTitle: {
    fontSize: 16,
    fontWeight: "bold" as const,
    color: Colors.black,
    marginBottom: 8,
  },
  filterChips: {
    flexDirection: "row",
    gap: 8,
  },
  filterChip: {
    backgroundColor: Colors.lightGray,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  activeFilterChip: {
    backgroundColor: Colors.primary,
  },
  filterChipText: {
    fontSize: 14,
    color: Colors.black,
    fontWeight: "500" as const,
  },
  activeFilterChipText: {
    color: Colors.white,
  },
  restaurantsList: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    overflow: "hidden",
    elevation: 2,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  restaurantCard: {
    padding: 16,
    backgroundColor: Colors.white,
  },
  restaurantHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  restaurantImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 12,
  },
  restaurantHeaderContent: {
    flex: 1,
    justifyContent: 'center',
  },
  restaurantTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    flexWrap: 'wrap',
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: "bold" as const,
    color: Colors.black,
    marginRight: 8,
    flexShrink: 1,
  },
  topRatedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFD700',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  topRatedText: {
    fontSize: 10,
    color: Colors.black,
    fontWeight: "bold" as const,
  },
  restaurantCuisine: {
    fontSize: 14,
    color: Colors.gray,
    marginBottom: 8,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  tag: {
    backgroundColor: Colors.lightGray,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  tagText: {
    fontSize: 10,
    color: Colors.gray,
    fontWeight: "500" as const,
  },
  restaurantInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  restaurantRating: {
    fontSize: 14,
    fontWeight: "600" as const,
    color: Colors.black,
    marginLeft: 4,
  },
  restaurantReviewCount: {
    fontSize: 12,
    color: Colors.gray,
    marginLeft: 2,
  },
  deliveryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  deliveryTime: {
    fontSize: 12,
    color: Colors.gray,
  },
  distance: {
    fontSize: 12,
    color: Colors.gray,
  },
  discountContainer: {
    backgroundColor: '#FFE8E8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 12,
    alignSelf: 'flex-start',
  },
  discountText: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: "600" as const,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  specialTagContainer: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  specialTagText: {
    fontSize: 12,
    color: Colors.white,
    fontWeight: "bold" as const,
  },
  placeholder: {
    flex: 1,
  },
  orderNowButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    minWidth: 100,
    alignItems: 'center',
  },
  orderNowText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: "bold" as const,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.borderGray,
    marginTop: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sortModalContent: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    width: '80%',
    maxWidth: 300,
  },
  sortModalTitle: {
    fontSize: 18,
    fontWeight: "bold" as const,
    color: Colors.black,
    marginBottom: 16,
    textAlign: 'center',
  },
  sortOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  activeSortOption: {
    backgroundColor: Colors.primary + '20',
  },
  sortOptionText: {
    fontSize: 16,
    color: Colors.black,
  },
  activeSortOptionText: {
    color: Colors.primary,
    fontWeight: "600" as const,
  },
  sortCheckmark: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sortCheckmarkText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: "bold" as const,
  },
});
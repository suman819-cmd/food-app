import {
  Address,
  CartItem,
  Coupon,
  FoodItem,
  Order,
  Restaurant,
  User,
} from "@/types/index";
import createContextHook from "@nkzw/create-context-hook";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useMemo, useState } from "react";

// Mock restaurants data matching your homepage
const mockRestaurants = [
  {
    id: "1",
    name: "Royal Cakes",
    cuisine: "Cake, Bakery, Desserts",
    cuisines: ["Cake", "Bakery", "Desserts"],
    rating: 5.0,
    reviewCount: 3,
    deliveryTime: "55-60 min",
    distance: "1.3 KM",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=200&fit=crop",
    logo: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=80&h=80&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&h=300&fit=crop",
    address: "P8F6+7FW, Rayamajhi Marga, Kathmandu 44600",
    menu: [],
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
    name: "Taste of India",
    cuisine: "Indian, Chinese, Nepali Dish",
    cuisines: ["Indian", "Chinese", "Nepali"],
    rating: 3.1,
    reviewCount: 7,
    deliveryTime: "55-60 min",
    distance: "1.5 KM",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&h=200&fit=crop",
    logo: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=80&h=80&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=300&fit=crop",
    address: "P8F6+7FW, Rayamajhi Marga, Kathmandu 44600",
    menu: [],
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
    cuisines: ["Newari", "Nepali", "Fast Food"],
    rating: 4.7,
    reviewCount: 30,
    deliveryTime: "55-60 min",
    distance: "1.7 KM",
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=300&h=200&fit=crop",
    logo: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=80&h=80&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&h=300&fit=crop",
    address: "P8F6+7FW, Rayamajhi Marga, Kathmandu 44600",
    menu: [],
    isDiscounted: true,
    isVeg: true,
    isNonVeg: true,
    deliveryType: ['delivery', 'takeaway', 'dinein'],
    isTopRated: true,
    discount: "15% OFF",
    tags: ["Newari", "Traditional", "Spicy"]
  }
];

// Mock food items matching your homepage
const mockFoodItems = [
  {
    id: "1",
    name: "Chocolate Cake",
    price: 450,
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=150&h=150&fit=crop",
    restaurantName: "Royal Cakes",
    rating: 4.8,
    reviewCount: 23,
    discount: 20,
    tags: ["Cake", "Dessert", "Sweet"]
  },
  {
    id: "2",
    name: "Butter Chicken",
    price: 380,
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=150&h=150&fit=crop",
    restaurantName: "Taste of India",
    rating: 4.5,
    reviewCount: 45,
    discount: 15,
    tags: ["Indian", "Spicy", "Main Course"]
  },
  {
    id: "3",
    name: "Newari Platter",
    price: 650,
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=150&h=150&fit=crop",
    restaurantName: "Cholia Chhen- Newari Kitchen",
    rating: 4.9,
    reviewCount: 67,
    discount: 10,
    tags: ["Newari", "Traditional", "Combo"]
  }
];

// Mock orders data with proper statuses that match your Order type
const mockOrders: Order[] = [
  {
    id: "order-1",
    status: "out-for-delivery", // Use your actual status
    items: [{
      ...mockFoodItems[0],
      quantity: 1,
      description: "Delicious chocolate cake", // Add a description
      restaurantId: mockRestaurants[0].id
    }],
    total: 450,
    createdAt: new Date().toISOString(),
    deliveryAddress: {
      id: "addr-1",
      title: "Home", // Use 'title' instead of 'name'
      address: "P8F6+7FW, Rayamajhi Marga, Kathmandu 44600",
      // Remove 'type' and 'isDefault' as they don't exist in your Address type
    },
    restaurant: mockRestaurants[0],
  },
  {
    id: "order-2",
    status: "preparing", // Use your actual status
    items: [
      {
        ...mockFoodItems[1],
        quantity: 2,
        description: "Classic butter chicken",
        restaurantId: mockRestaurants[1].id
      },
      {
        ...mockFoodItems[2],
        quantity: 1,
        description: "Authentic Newari platter",
        restaurantId: mockRestaurants[2].id
      }
    ],
    total: 1030,
    createdAt: new Date(Date.now() - 15 * 60000).toISOString(), // 15 mins ago
    deliveryAddress: {
      id: "addr-1",
      title: "Home",
      address: "P8F6+7FW, Rayamajhi Marga, Kathmandu 44600",
    },
    restaurant: mockRestaurants[1],
  },
  {
    id: "order-3",
    status: "delivered", // Use your actual status
    items: [{
      ...mockFoodItems[2],
      quantity: 1,
      description: "Traditional Newari combo",
      restaurantId: mockRestaurants[2].id
    }],
    total: 650,
    createdAt: new Date(Date.now() - 24 * 60 * 60000).toISOString(), // 1 day ago
    deliveryAddress: {
      id: "addr-1",
      title: "Home",
      address: "P8F6+7FW, Rayamajhi Marga, Kathmandu 44600",
    },
    restaurant: mockRestaurants[2],
  },
];

export const [AppProvider, useApp] = createContextHook(() => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlistFoods, setWishlistFoods] = useState<string[]>([]);
  const [wishlistRestaurants, setWishlistRestaurants] = useState<string[]>([]);
  const [orders, setOrders] = useState<Order[]>(mockOrders); // Initialize with mock orders
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  const [user, setUser] = useState<User | null>({
    id: "1",
    name: "Suman",
    email: "shumanbashyal@gmail.com",
    phone: "+977 9744318379",
    joinedDate: "24 Nov, 2025",
    totalOrders: mockOrders.length, // Set based on mock orders
    loyaltyPoints: 150,
    walletBalance: 500,
  });

  useEffect(() => {
    loadPersistedData();
  }, []);

  const savePersistedData = useCallback(async () => {
    try {
      await Promise.all([
        AsyncStorage.setItem("cart", JSON.stringify(cart)),
        AsyncStorage.setItem("wishlistFoods", JSON.stringify(wishlistFoods)),
        AsyncStorage.setItem(
          "wishlistRestaurants",
          JSON.stringify(wishlistRestaurants)
        ),
        AsyncStorage.setItem("orders", JSON.stringify(orders)),
        AsyncStorage.setItem("addresses", JSON.stringify(addresses)),
      ]);
    } catch (error) {
      console.error("Error saving persisted data:", error);
    }
  }, [cart, wishlistFoods, wishlistRestaurants, orders, addresses]);

  useEffect(() => {
    savePersistedData();
  }, [savePersistedData]);

  const loadPersistedData = async () => {
    try {
      const [
        cartData,
        wishlistFoodsData,
        wishlistRestaurantsData,
        ordersData,
        addressesData,
      ] = await Promise.all([
        AsyncStorage.getItem("cart"),
        AsyncStorage.getItem("wishlistFoods"),
        AsyncStorage.getItem("wishlistRestaurants"),
        AsyncStorage.getItem("orders"),
        AsyncStorage.getItem("addresses"),
      ]);

      if (cartData) setCart(JSON.parse(cartData));
      if (wishlistFoodsData) setWishlistFoods(JSON.parse(wishlistFoodsData));
      if (wishlistRestaurantsData)
        setWishlistRestaurants(JSON.parse(wishlistRestaurantsData));
      if (ordersData) {
        setOrders(JSON.parse(ordersData));
      } else {
        // If no orders in storage, use mock orders
        setOrders(mockOrders);
      }
      if (addressesData) {
        const parsedAddresses = JSON.parse(addressesData);
        setAddresses(parsedAddresses);
        if (parsedAddresses.length > 0) {
          setSelectedAddress(parsedAddresses[0]);
        }
      }
    } catch (error) {
      console.error("Error loading persisted data:", error);
    }
  };

  const addToCart = (item: FoodItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((i) => i.id !== itemId));
  };

  const updateCartItemQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
    } else {
      setCart((prev) =>
        prev.map((i) => (i.id === itemId ? { ...i, quantity } : i))
      );
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleFoodWishlist = (foodId: string) => {
    setWishlistFoods((prev) => {
      if (prev.includes(foodId)) {
        return prev.filter((id) => id !== foodId);
      }
      return [...prev, foodId];
    });
  };

  const toggleRestaurantWishlist = (restaurantId: string) => {
    setWishlistRestaurants((prev) => {
      if (prev.includes(restaurantId)) {
        return prev.filter((id) => id !== restaurantId);
      }
      return [...prev, restaurantId];
    });
  };

  const isFoodInWishlist = (foodId: string) => wishlistFoods.includes(foodId);
  const isRestaurantInWishlist = (restaurantId: string) =>
    wishlistRestaurants.includes(restaurantId);

  const cartTotal = useMemo(() => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cart]);

  const cartItemCount = useMemo(() => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  }, [cart]);

  const placeOrder = (
    deliveryAddress: Address,
    paymentMethod: string,
    restaurant: Restaurant
  ) => {
    const order: Order = {
      id: `order-${Date.now()}`,
      items: [...cart],
      total: cartTotal,
      status: "confirmed", // Start with confirmed status for tracking
      createdAt: new Date().toISOString(),
      deliveryAddress,
      restaurant,
    };

    setOrders((prev) => [order, ...prev]);
    setUser((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        totalOrders: prev.totalOrders + 1,
        loyaltyPoints: prev.loyaltyPoints + Math.floor(cartTotal / 10),
      };
    });
    clearCart();
    setSelectedCoupon(null);
    return order;
  };

  const addAddress = (address: Address) => {
    setAddresses((prev) => [...prev, address]);
    if (!selectedAddress) {
      setSelectedAddress(address);
    }
  };

  const removeAddress = (addressId: string) => {
    setAddresses((prev) => prev.filter((addr) => addr.id !== addressId));
    if (selectedAddress?.id === addressId) {
      setSelectedAddress(addresses[0] || null);
    }
  };

  // Add function to update order status (for delivery tracking)
  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status } : order
      )
    );
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    clearCart,
    cartTotal,
    cartItemCount,
    wishlistFoods,
    wishlistRestaurants,
    toggleFoodWishlist,
    toggleRestaurantWishlist,
    isFoodInWishlist,
    isRestaurantInWishlist,
    user,
    setUser,
    orders,
    placeOrder,
    updateOrderStatus, // Add this function
    addresses,
    selectedAddress,
    setSelectedAddress,
    addAddress,
    removeAddress,
    selectedCoupon,
    setSelectedCoupon,
  };
});
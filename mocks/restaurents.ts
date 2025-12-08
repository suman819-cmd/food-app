import { FoodItem, Restaurant } from "@/types";

export const restaurants: Restaurant[] = [
  {
    id: "1",
    name: "Maya Lounge and Restro Machhapokhari",
    logo: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=200&h=200&fit=crop",
    coverImage:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=400&fit=crop",
    rating: 4.3,
    reviewCount: 7,
    deliveryTime: "55-60 min",
    distance: "2.00 km",
    cuisines: ["Nepali", "Chinese", "Indian"],
    address: "Machhapokhari, Kathmandu",
    menu: [],
  },
  {
    id: "2",
    name: "Om Tandoori Restaurant",
    logo: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=200&h=200&fit=crop",
    coverImage:
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&h=400&fit=crop",
    rating: 4.4,
    reviewCount: 12,
    deliveryTime: "40-45 min",
    distance: "1.50 km",
    cuisines: ["Indian", "Tandoori", "Chinese"],
    address: "Lazimpat, Kathmandu",
    menu: [],
  },
  {
    id: "3",
    name: "Koyla Tandoori Restaurant",
    logo: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=200&h=200&fit=crop",
    coverImage:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=400&fit=crop",
    rating: 4.0,
    reviewCount: 9,
    deliveryTime: "45-50 min",
    distance: "2.50 km",
    cuisines: ["Indian", "Biryani", "Tandoori"],
    address: "Durbar Marg, Kathmandu",
    menu: [],
  },
];

const cuisineMapping: Record<string, string[]> = {
  "1": ["Indian"],
  "2": ["Nepali Dish", "Indian"],
  "3": ["Fast Food"],
  "4": ["Italian"],
  "5": ["Chinese"],
  "6": ["Soft Drinks"],
  "7": ["Sweets"],
  "8": ["Cake"],
  "9": ["Newari Cuisine"],
  "10": ["Sea Food"],
  "11": ["Korean"],
  "12": ["Grocery"],
  "13": ["Japanese"],
};

export const foodItems: FoodItem[] = [
  {
    id: "1",
    name: "Chicken Steam Momo",
    description: "Delicious steamed chicken dumplings served with spicy sauce",
    price: 240,
    image:
      "https://images.unsplash.com/photo-1625998370185-52948b8e0bce?w=600&h=600&fit=crop",
    rating: 4.3,
    reviewCount: 7,
    restaurantId: "1",
    restaurantName: "Maya Lounge and Restro Machhapokhari",
    tags: ["Trending"],
  },
  {
    id: "2",
    name: "Chicken Biryani",
    description: "Aromatic rice with tender chicken pieces",
    price: 550,
    image:
      "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&h=600&fit=crop",
    rating: 4.4,
    reviewCount: 12,
    restaurantId: "2",
    restaurantName: "Om Tandoori Restaurant",
    discount: 25,
    tags: ["Trending"],
  },
  {
    id: "3",
    name: "Corn Pizza",
    description: "Delicious corn pizza with cheese",
    price: 385,
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=600&fit=crop",
    rating: 3.8,
    reviewCount: 25,
    restaurantId: "1",
    restaurantName: "Maya Lounge and Restro Machhapokhari",
    isVeg: true,
  },
  {
    id: "4",
    name: "Chicken Pizza",
    description: "Loaded chicken pizza with special sauce",
    price: 395,
    image:
      "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=600&h=600&fit=crop",
    rating: 3.8,
    reviewCount: 11,
    restaurantId: "1",
    restaurantName: "Maya Lounge and Restro Machhapokhari",
  },
  {
    id: "5",
    name: "Chicken Golden Delight Pizza",
    description: "Special golden pizza with chicken toppings",
    price: 450,
    image:
      "https://images.unsplash.com/photo-1571407970349-bc81e7e96b47?w=600&h=600&fit=crop",
    rating: 4.5,
    reviewCount: 18,
    restaurantId: "1",
    restaurantName: "Maya Lounge and Restro Machhapokhari",
    tags: ["Featured"],
  },
  {
    id: "6",
    name: "Hyderabadi Chicken Biryani",
    description: "Authentic Hyderabadi style biryani",
    price: 650,
    image:
      "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=600&h=600&fit=crop",
    rating: 4.7,
    reviewCount: 32,
    restaurantId: "2",
    restaurantName: "Om Tandoori Restaurant",
    tags: ["Trending"],
  },
  {
    id: "7",
    name: "Buff Chowmein",
    description: "Spicy buffalo meat noodles",
    price: 210,
    image:
      "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=600&h=600&fit=crop",
    rating: 5.0,
    reviewCount: 1,
    restaurantId: "1",
    restaurantName: "Maya Lounge and Restro Machhapokhari",
  },
  {
    id: "8",
    name: "Chicken Dum Biryani",
    description: "Slow cooked dum style biryani",
    price: 580,
    image:
      "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&h=600&fit=crop",
    rating: 4.6,
    reviewCount: 24,
    restaurantId: "3",
    restaurantName: "Koyla Tandoori Restaurant",
    tags: ["Trending"],
  },
  {
    id: "9",
    name: "Roti Items",
    description: "Various Indian breads",
    price: 120,
    image:
      "https://images.unsplash.com/photo-1604329759269-b29f8e2c5be0?w=600&h=600&fit=crop",
    rating: 4.2,
    reviewCount: 8,
    restaurantId: "2",
    restaurantName: "Om Tandoori Restaurant",
    isVeg: true,
    tags: ["Trending"],
  },
  {
    id: "10",
    name: "Curry Items",
    description: "Selection of Indian curries",
    price: 280,
    image:
      "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=600&h=600&fit=crop",
    rating: 4.3,
    reviewCount: 15,
    restaurantId: "2",
    restaurantName: "Om Tandoori Restaurant",
    tags: ["Trending"],
  },
  {
    id: "11",
    name: "Margherita Pizza",
    description: "Classic Italian pizza",
    price: 420,
    image:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&h=600&fit=crop",
    rating: 4.5,
    reviewCount: 20,
    restaurantId: "1",
    restaurantName: "Maya Lounge and Restro Machhapokhari",
    isVeg: true,
  },
  {
    id: "12",
    name: "Sushi Platter",
    description: "Fresh sushi selection",
    price: 890,
    image:
      "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=600&h=600&fit=crop",
    rating: 4.8,
    reviewCount: 35,
    restaurantId: "2",
    restaurantName: "Om Tandoori Restaurant",
  },
];

restaurants.forEach((restaurant) => {
  restaurant.menu = foodItems.filter(
    (item) => item.restaurantId === restaurant.id
  );
});

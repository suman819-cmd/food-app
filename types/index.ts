export interface Cuisine {
  id: string;
  name: string;
  image: string;
}

export interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  reviewCount: number;
  restaurantId: string;
  restaurantName: string;
  isVeg?: boolean;
  discount?: number;
  tags?: string[];
}

export interface Restaurant {
  id: string;
  name: string;
  logo: string;
  coverImage: string;
  rating: number;
  reviewCount: number;
  deliveryTime: string;
  distance: string;
  cuisines: string[];
  address: string;
  menu: FoodItem[];
}

export interface CartItem extends FoodItem {
  quantity: number;
}

export interface Address {
  id: string;
  title: string;
  address: string;
  isCurrentLocation?: boolean;
}

export interface Coupon {
  id: string;
  code: string;
  title: string;
  discount: string;
  minPurchase: number;
  validFrom: string;
  validTo: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status:
    | "pending"
    | "confirmed"
    | "preparing"
    | "out-for-delivery"
    | "delivered"
    | "cancelled";
  createdAt: string;
  deliveryAddress: Address;
  restaurant: Restaurant;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  profileImage?: string;
  joinedDate: string;
  totalOrders: number;
  loyaltyPoints: number;
  walletBalance: number;
}

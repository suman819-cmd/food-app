import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Pressable,
  ScrollView,
  Image,
} from 'react-native';
import { X, Minus, Plus, Star } from 'lucide-react-native';
import Colors from '@/constants/color';

interface FoodItem {
  id: string;
  name: string;
  price: number;
  image: string;
  restaurantName: string;
  rating: number;
  reviewCount: number;
  discount?: number;
}

interface AddToCartModalProps {
  visible: boolean;
  onClose: () => void;
  item: FoodItem | null;
  onAddToCart: (item: FoodItem, quantity: number, selectedOption?: string) => void;
}

export default function AddToCartModal({ visible, onClose, item, onAddToCart }: AddToCartModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const slideAnim = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    if (visible) {
      setQuantity(1);
      setSelectedOption('');
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 300,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const handleClose = () => {
    Animated.timing(slideAnim, {
      toValue: 300,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      onClose();
    });
  };

  const handleAddToCart = () => {
    if (item) {
      onAddToCart(item, quantity, selectedOption);
      handleClose();
    }
  };

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  if (!item) return null;

  const totalAmount = item.price * quantity;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <Pressable style={styles.backdrop} onPress={handleClose} />
        <Animated.View 
          style={[
            styles.modalContainer,
            {
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>25% OFF on entire menu</Text>
              </View>
              <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
                <X size={24} color={Colors.black} />
              </TouchableOpacity>
            </View>

            {/* Food Info */}
            <View style={styles.foodInfoSection}>
              <Text style={styles.bestReviewed}>Best Reviewed food</Text>
              
              <View style={styles.foodHeader}>
                <View style={styles.foodTextInfo}>
                  <Text style={styles.foodName}>{item.name}</Text>
                  <Text style={styles.restaurantName}>{item.restaurantName}</Text>
                  
                  <View style={styles.ratingContainer}>
                    <View style={styles.stars}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={16}
                          color={Colors.primary}
                          fill={Colors.primary}
                        />
                      ))}
                    </View>
                    <Text style={styles.ratingText}>★★★★★</Text>
                  </View>
                  
                  <Text style={styles.price}>Rs. {item.price}</Text>
                </View>
                
                <Image source={{ uri: item.image }} style={styles.foodImage} />
              </View>
            </View>

            <View style={styles.divider} />

            {/* Portion Selection */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Select</Text>
              <Text style={styles.sectionSubtitle}>Select One</Text>
              
              <View style={styles.optionsContainer}>
                <TouchableOpacity
                  style={[
                    styles.optionButton,
                    selectedOption === '120gm' && styles.optionButtonSelected,
                  ]}
                  onPress={() => setSelectedOption('120gm')}
                >
                  <View style={styles.optionRadio}>
                    <View
                      style={[
                        styles.radioCircle,
                        selectedOption === '120gm' && styles.radioCircleSelected,
                      ]}
                    />
                  </View>
                  <View style={styles.optionInfo}>
                    <Text style={styles.optionText}>- 120 gm (1 Person)</Text>
                    <Text style={styles.optionPrice}>+Rs. 0</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.optionButton,
                    selectedOption === '360gm' && styles.optionButtonSelected,
                  ]}
                  onPress={() => setSelectedOption('360gm')}
                >
                  <View style={styles.optionRadio}>
                    <View
                      style={[
                        styles.radioCircle,
                        selectedOption === '360gm' && styles.radioCircleSelected,
                      ]}
                    />
                  </View>
                  <View style={styles.optionInfo}>
                    <Text style={styles.optionText}>- 360 gm (3 Person)</Text>
                    <Text style={styles.optionPrice}>+Rs. 670</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.divider} />

            {/* Quantity and Total */}
            <View style={styles.quantitySection}>
              <View style={styles.quantityContainer}>
                <Text style={styles.quantityLabel}>Quantity</Text>
                <View style={styles.quantityControls}>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={decreaseQuantity}
                  >
                    <Minus size={20} color={Colors.primary} />
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{quantity}</Text>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={increaseQuantity}
                  >
                    <Plus size={20} color={Colors.primary} />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.totalContainer}>
                <Text style={styles.totalLabel}>Total Amount:</Text>
                <Text style={styles.totalAmount}>Rs. {totalAmount}</Text>
              </View>
            </View>
          </ScrollView>

          {/* Add to Cart Button */}
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.addToCartButton}
              onPress={handleAddToCart}
            >
              <Text style={styles.addToCartText}>Add To Cart - Rs. {totalAmount}</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '80%',
  },
  content: {
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderGray,
  },
  discountBadge: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  discountText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 4,
  },
  foodInfoSection: {
    paddingVertical: 16,
  },
  bestReviewed: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.gray,
    marginBottom: 12,
  },
  foodHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  foodTextInfo: {
    flex: 1,
    marginRight: 12,
  },
  foodName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.black,
    marginBottom: 4,
  },
  restaurantName: {
    fontSize: 14,
    color: Colors.gray,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  stars: {
    flexDirection: 'row',
    marginRight: 8,
  },
  ratingText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  foodImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.borderGray,
    marginVertical: 8,
  },
  section: {
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.black,
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: Colors.gray,
    marginBottom: 12,
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.borderGray,
    borderRadius: 12,
    backgroundColor: Colors.white,
  },
  optionButtonSelected: {
    borderColor: Colors.primary,
    backgroundColor: '#F0F8FF',
  },
  optionRadio: {
    marginRight: 12,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.borderGray,
  },
  radioCircleSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary,
  },
  optionInfo: {
    flex: 1,
  },
  optionText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.black,
    marginBottom: 4,
  },
  optionPrice: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '600',
  },
  quantitySection: {
    paddingVertical: 16,
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  quantityLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.black,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.black,
    minWidth: 30,
    textAlign: 'center',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.borderGray,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.black,
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.borderGray,
    backgroundColor: Colors.white,
  },
  addToCartButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  addToCartText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
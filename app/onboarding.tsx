import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
  Animated,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '@/constants/color';

const { width, height } = Dimensions.get('window');

const onboardingSlides = [
  {
    id: 1,
    title: 'Welcome to FoodApp',
    description: 'Discover the best food from your favorite restaurants around you',
    image: '🍕',
    backgroundColor: Colors.primary,
    imageSize: 140,
  },
  {
    id: 2,
    title: 'Fast Delivery',
    description: 'Get your food delivered quickly and hot to your doorstep',
    image: '🚚',
    backgroundColor: '',
    imageSize: 130,
  },
  {
    id: 3,
    title: 'Easy Ordering',
    description: 'Order your favorite food with just a few taps on your phone',
    image: '📱',
    backgroundColor: '',
    imageSize: 120,
  },
  {
    id: 4,
    title: 'Ready to Order?',
    description: 'Join thousands of happy customers enjoying great food',
    image: '🎉',
    backgroundColor: Colors.primary,
    imageSize: 140,
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const handleNext = () => {
    // Fade out animation
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      const nextSlide = currentSlide + 1;
      if (nextSlide < onboardingSlides.length) {
        flatListRef.current?.scrollToIndex({ 
          index: nextSlide,
          animated: true 
        });
        setCurrentSlide(nextSlide);
        // Fade in animation
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      } else {
        // Redirect to welcome page instead of home
        router.replace('/(auth)/welcome');
      }
    });
  };

  const handleSkip = () => {
    // Redirect to welcome page instead of home
    router.replace('/(auth)/welcome');
  };

  const goToSlide = (index: number) => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      flatListRef.current?.scrollToIndex({ 
        index,
        animated: true 
      });
      setCurrentSlide(index);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );

  const onMomentumScrollEnd = (event: any) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentSlide(slideIndex);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    const inputRange = [
      (index - 1) * width,
      index * width,
      (index + 1) * width,
    ];

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.8, 1, 0.8],
      extrapolate: 'clamp',
    });

    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.5, 1, 0.5],
      extrapolate: 'clamp',
    });

    return (
      <View style={[styles.slide, { backgroundColor: item.backgroundColor }]}>
        <Animated.View 
          style={[
            styles.slideContent,
            {
              transform: [{ scale }],
              opacity,
            }
          ]}
        >
          {/* ✅ FIXED: Emoji properly wrapped in Text component */}
          <Text style={[styles.emoji, { fontSize: item.imageSize }]}>
            {item.image}
          </Text>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </Animated.View>
      </View>
    );
  };

  const renderPagination = () => {
    return (
      <View style={styles.paginationContainer}>
        {/* Progress Bar */}
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBar}>
            <Animated.View 
              style={[
                styles.progressFill,
                {
                  width: scrollX.interpolate({
                    inputRange: [0, width * (onboardingSlides.length - 1)],
                    outputRange: ['0%', '100%'],
                    extrapolate: 'clamp',
                  }),
                }
              ]} 
            />
          </View>
        </View>

        {/* Dots and Buttons */}
        <View style={styles.bottomSection}>
          {/* Dots */}
          <View style={styles.pagination}>
            {onboardingSlides.map((_, index) => {
              const inputRange = [
                (index - 1) * width,
                index * width,
                (index + 1) * width,
              ];

              const dotWidth = scrollX.interpolate({
                inputRange,
                outputRange: [8, 24, 8],
                extrapolate: 'clamp',
              });

              const opacity = scrollX.interpolate({
                inputRange,
                outputRange: [0.4, 1, 0.4],
                extrapolate: 'clamp',
              });

              const scale = scrollX.interpolate({
                inputRange,
                outputRange: [0.8, 1.2, 0.8],
                extrapolate: 'clamp',
              });

              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => goToSlide(index)}
                  activeOpacity={0.7}
                >
                  <Animated.View
                    style={[
                      styles.dot,
                      {
                        width: dotWidth,
                        opacity: opacity,
                        transform: [{ scale }],
                      },
                    ]}
                  />
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            {currentSlide < onboardingSlides.length - 1 && (
              <TouchableOpacity 
                style={styles.skipButton} 
                onPress={handleSkip}
                activeOpacity={0.7}
              >
                <Text style={styles.skipText}>Skip</Text>
              </TouchableOpacity>
            )}
            
            <TouchableOpacity 
              style={[
                styles.nextButton,
                currentSlide === onboardingSlides.length - 1 && styles.getStartedButton
              ]} 
              onPress={handleNext}
              activeOpacity={0.8}
            >
              <Text style={[
                styles.nextButtonText,
                currentSlide === onboardingSlides.length - 1 && styles.getStartedText
              ]}>
                {currentSlide === onboardingSlides.length - 1 ? 'Get Started 🎉' : 'Next →'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={onboardingSlides[currentSlide].backgroundColor} />
      
      <Animated.View style={{ opacity: fadeAnim, flex: 1 }}>
        <FlatList
          ref={flatListRef}
          data={onboardingSlides}
          renderItem={renderItem}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll}
          onMomentumScrollEnd={onMomentumScrollEnd}
          scrollEventThrottle={16}
          bounces={false}
          decelerationRate="fast"
          keyExtractor={(item) => item.id.toString()}
        />
      </Animated.View>
      
      {renderPagination()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  slide: {
    width,
    height: height - 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideContent: {
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emoji: {
    marginBottom: 40,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.white,
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    lineHeight: 38,
  },
  description: {
    fontSize: 18,
    color: Colors.white,
    textAlign: 'center',
    lineHeight: 26,
    opacity: 0.95,
    fontWeight: '500',
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingBottom: 40,
    backgroundColor: 'transparent',
  },
  progressBarContainer: {
    marginBottom: 25,
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.white,
    borderRadius: 2,
  },
  bottomSection: {
    alignItems: 'center',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.white,
    marginHorizontal: 6,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  skipButton: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  skipText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
    opacity: 0.9,
  },
  nextButton: {
    backgroundColor: Colors.white,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 25,
    minWidth: 140,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  getStartedButton: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#D90000',
  },
  nextButtonText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  getStartedText: {
    color: '#000',
    fontWeight: '800',
  },
});
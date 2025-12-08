// import React, { useEffect, useRef } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Animated,
//   Easing,
//   Dimensions,
//   Image,
// } from 'react-native';
// import { useRouter } from 'expo-router';
// import Colors from '@/constants/color';

// const { width, height } = Dimensions.get('window');

// export default function SplashScreen() {
//   const router = useRouter();
  
//   // Animation values for 3D falling letters
//   const letterAnimations = useRef(
//     "FoodApp".split('').map(() => ({
//       scale: new Animated.Value(0),
//       translateY: new Animated.Value(-200),
//       rotateX: new Animated.Value(-90),
//       opacity: new Animated.Value(0),
//     }))
//   ).current;

//   const circleScale = useRef(new Animated.Value(0)).current;
//   const circleOpacity = useRef(new Animated.Value(0)).current;
//   const textOpacity = useRef(new Animated.Value(0)).current;
//   const backgroundColor = useRef(new Animated.Value(0)).current;
//   const loadingDotsOpacity = useRef(new Animated.Value(0)).current;
//   const chefScale = useRef(new Animated.Value(0)).current;
//   const messageOpacity = useRef(new Animated.Value(0)).current;
//   const messageScale = useRef(new Animated.Value(0)).current;
//   const messageBounce = useRef(new Animated.Value(0)).current;

//   const appName = "FoodApp";
//   const appNameChars = appName.split('');

//   // Messages for the speech bubble
//   const messages = [
//     "Hey User! 👋",
//     "Welcome! 🎉",
//     "Ready to eat? 🍕",
//     "Let's cook! 👨‍🍳",
//     "Hungry? 😋",
//     "Food time! 🍽️",
//     "Yummy! 😍",
//     "Let's feast! 🎊"
//   ];

//   useEffect(() => {
//     startAnimation();
//   }, []);

//   const startAnimation = () => {
//     // Reset all animations
//     letterAnimations.forEach(anim => {
//       anim.scale.setValue(0);
//       anim.translateY.setValue(-200);
//       anim.rotateX.setValue(-90);
//       anim.opacity.setValue(0);
//     });
    
//     circleScale.setValue(0);
//     circleOpacity.setValue(0);
//     textOpacity.setValue(0);
//     backgroundColor.setValue(0);
//     loadingDotsOpacity.setValue(0);
//     chefScale.setValue(0);
//     messageOpacity.setValue(0);
//     messageScale.setValue(0);
//     messageBounce.setValue(0);

//     // Main animation sequence
//     Animated.sequence([
//       // Phase 1: Circle emergence and growth
//       Animated.parallel([
//         Animated.timing(circleOpacity, {
//           toValue: 1,
//           duration: 600,
//           easing: Easing.out(Easing.cubic),
//           useNativeDriver: true,
//         }),
//         Animated.timing(circleScale, {
//           toValue: 0.3,
//           duration: 800,
//           easing: Easing.out(Easing.back(1.5)),
//           useNativeDriver: true,
//         }),
//       ]),

//       // Phase 2: Continuous circle expansion
//       Animated.parallel([
//         Animated.timing(circleScale, {
//           toValue: 8,
//           duration: 1200,
//           easing: Easing.out(Easing.cubic),
//           useNativeDriver: true,
//         }),
//         Animated.timing(backgroundColor, {
//           toValue: 1,
//           duration: 1000,
//           easing: Easing.out(Easing.cubic),
//           useNativeDriver: false,
//         }),
//       ]),

//       // Phase 3: 3D Falling Letters Animation
//       Animated.delay(300),

//     ]).start(() => {
//       // Start the 3D falling letters animation
//       startFallingLettersAnimation();
//     });

//     // Message bounce animation
//     setTimeout(() => {
//       Animated.loop(
//         Animated.sequence([
//           Animated.timing(messageBounce, {
//             toValue: 1,
//             duration: 1200,
//             easing: Easing.inOut(Easing.cubic),
//             useNativeDriver: true,
//           }),
//           Animated.timing(messageBounce, {
//             toValue: 0,
//             duration: 1200,
//             easing: Easing.inOut(Easing.cubic),
//             useNativeDriver: true,
//           }),
//         ])
//       ).start();
//     }, 4500);
//   };

//   const startFallingLettersAnimation = () => {
//     // Create staggered falling animation for each letter
//     const letterAnimationsSequence = letterAnimations.map((anim, index) => {
//       return Animated.sequence([
//         Animated.delay(index * 200), // Stagger each letter by 200ms
//         Animated.parallel([
//           // Falling down animation
//           Animated.timing(anim.translateY, {
//             toValue: 0,
//             duration: 800,
//             easing: Easing.out(Easing.back(1.5)),
//             useNativeDriver: true,
//           }),
//           // 3D rotation from top
//           Animated.timing(anim.rotateX, {
//             toValue: 0,
//             duration: 800,
//             easing: Easing.out(Easing.cubic),
//             useNativeDriver: true,
//           }),
//           // Scale up animation
//           Animated.timing(anim.scale, {
//             toValue: 1,
//             duration: 600,
//             easing: Easing.out(Easing.back(1.2)),
//             useNativeDriver: true,
//           }),
//           // Fade in animation
//           Animated.timing(anim.opacity, {
//             toValue: 1,
//             duration: 400,
//             easing: Easing.out(Easing.cubic),
//             useNativeDriver: true,
//           }),
//         ]),
//       ]);
//     });

//     // Start all letter animations
//     Animated.stagger(100, letterAnimationsSequence).start(() => {
//       // After letters have fallen, show chef and other elements
//       showRemainingElements();
//     });
//   };

//   const showRemainingElements = () => {
//     Animated.parallel([
//       // Chef image appears with bounce
//       Animated.timing(chefScale, {
//         toValue: 1,
//         duration: 800,
//         easing: Easing.out(Easing.back(1.7)),
//         useNativeDriver: true,
//       }),
//       // Message box appears
//       Animated.parallel([
//         Animated.timing(messageOpacity, {
//           toValue: 1,
//           duration: 600,
//           easing: Easing.out(Easing.cubic),
//           useNativeDriver: true,
//         }),
//         Animated.timing(messageScale, {
//           toValue: 1,
//           duration: 700,
//           easing: Easing.out(Easing.back(1.5)),
//           useNativeDriver: true,
//         }),
//       ]),
//       // Loading dots appear
//       Animated.timing(loadingDotsOpacity, {
//         toValue: 1,
//         duration: 500,
//         easing: Easing.out(Easing.cubic),
//         useNativeDriver: true,
//       }),
//       // Tagline appears
//       Animated.timing(textOpacity, {
//         toValue: 1,
//         duration: 600,
//         easing: Easing.out(Easing.cubic),
//         useNativeDriver: true,
//       }),
//     ]).start(() => {
//       // Extended final pause then navigate
//       setTimeout(() => {
//         router.replace('/onboarding');
//       }, 3000);
//     });
//   };

//   // Interpolate background color from white to red
//   const backgroundColorInterpolate = backgroundColor.interpolate({
//     inputRange: [0, 1],
//     outputRange: [Colors.white, Colors.primary],
//   });

//   // Chef bounce effect
//   const chefBounce = chefScale.interpolate({
//     inputRange: [0, 0.5, 1],
//     outputRange: [0, 1.2, 1],
//   });

//   // Message box scale
//   const messageBoxScale = messageScale.interpolate({
//     inputRange: [0, 1],
//     outputRange: [0.8, 1],
//   });

//   // Message bounce effect
//   const messageBounceEffect = messageBounce.interpolate({
//     inputRange: [0, 1],
//     outputRange: [0, -3],
//   });

//   // 3D Falling Letters Component
//   const FallingLetters = () => {
//     return (
//       <View style={styles.lettersContainer}>
//         {appNameChars.map((char, index) => {
//           const anim = letterAnimations[index];
          
//           const letterTransform = [
//             { translateY: anim.translateY },
//             { scale: anim.scale },
//             { 
//               rotateX: anim.rotateX.interpolate({
//                 inputRange: [-90, 0],
//                 outputRange: ['-90deg', '0deg'],
//               })
//             },
//           ];

//           return (
//             <Animated.Text
//               key={index}
//               style={[
//                 styles.fallingLetter,
//                 {
//                   opacity: anim.opacity,
//                   transform: letterTransform,
//                   textShadowColor: `rgba(0, 0, 0, ${0.3 + (index * 0.1)})`,
//                 }
//               ]}
//             >
//               {char}
//             </Animated.Text>
//           );
//         })}
//       </View>
//     );
//   };

//   // Animated Message Box Component
//   const MessageBox = () => {
//     const [currentMessageIndex, setCurrentMessageIndex] = React.useState(0);
//     const messageTextOpacity = useRef(new Animated.Value(1)).current;

//     useEffect(() => {
//       const timer = setTimeout(() => {
//         const changeMessage = () => {
//           Animated.timing(messageTextOpacity, {
//             toValue: 0,
//             duration: 400,
//             easing: Easing.out(Easing.cubic),
//             useNativeDriver: true,
//           }).start(() => {
//             setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
//             Animated.timing(messageTextOpacity, {
//               toValue: 1,
//               duration: 400,
//               easing: Easing.out(Easing.cubic),
//               useNativeDriver: true,
//             }).start();
//           });
//         };

//         const messageInterval = setInterval(changeMessage, 2200);
//         return () => clearInterval(messageInterval);
//       }, 4500);

//       return () => clearTimeout(timer);
//     }, []);

//     return (
//       <Animated.View 
//         style={[
//           styles.messageContainer,
//           {
//             opacity: messageOpacity,
//             transform: [
//               { scale: messageBoxScale },
//               { translateY: messageBounceEffect }
//             ]
//           }
//         ]}
//       >
//         <View style={styles.messageBubble}>
//           <Animated.Text style={[styles.messageText, { opacity: messageTextOpacity }]}>
//             {messages[currentMessageIndex]}
//           </Animated.Text>
//           <View style={styles.messageTail} />
//         </View>
//       </Animated.View>
//     );
//   };

//   // Simplified Loading Dots
//   const LoadingDots = () => {
//     return (
//       <Animated.View style={[styles.loadingContainer, { opacity: loadingDotsOpacity }]}>
//         <View style={styles.loadingDots}>
//           <View style={styles.dot} />
//           <View style={styles.dot} />
//           <View style={styles.dot} />
//         </View>
//       </Animated.View>
//     );
//   };

//   return (
//     <Animated.View style={[styles.container, { backgroundColor: backgroundColorInterpolate }]}>
//       {/* Animated Circle */}
//       <Animated.View
//         style={[
//           styles.circle,
//           {
//             transform: [{ scale: circleScale }],
//             opacity: circleOpacity,
//           },
//         ]}
//       />

//       {/* 3D Falling Letters */}
//       <FallingLetters />

//       {/* Chef Image Container */}
//       <Animated.View 
//         style={[
//           styles.chefContainer,
//           {
//             transform: [{ scale: chefBounce }],
//             opacity: chefScale,
//           }
//         ]}
//       >
//         {/* Chef Image */}
//         <Image
//           source={{ 
//             uri: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=200&h=200&fit=crop&crop=face' 
//           }}
//           style={styles.chefImage}
//         />
        
//         {/* Message Box */}
//         <MessageBox />
//       </Animated.View>

//       {/* Tagline */}
//       <Animated.View style={[styles.textContainer, { opacity: textOpacity }]}>
//         <Animated.Text style={[styles.tagline, { opacity: textOpacity }]}>
//           Delivering Happiness
//         </Animated.Text>
//       </Animated.View>

//       {/* Simplified Loading Dots */}
//       <LoadingDots />
//     </Animated.View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: Colors.white,
//   },
//   circle: {
//     position: 'absolute',
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     backgroundColor: Colors.primary,
//     shadowColor: Colors.primary,
//     shadowOffset: { width: 0, height: 0 },
//     shadowOpacity: 0.6,
//     shadowRadius: 25,
//     elevation: 15,
//   },
//   lettersContainer: {
//     position: 'absolute',
//     top: height * 0.3,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     zIndex: 20,
//   },
//   fallingLetter: {
//     fontSize: 52,
//     fontWeight: '900',
//     color: Colors.white,
//     textShadowOffset: { width: 3, height: 3 },
//     textShadowRadius: 10,
//     letterSpacing: 2,
//     marginHorizontal: 2,
//     transform: [{ perspective: 1000 }], // Enable 3D perspective
//   },
//   chefContainer: {
//     position: 'absolute',
//     top: height * 0.15,
//     alignItems: 'center',
//     zIndex: 5,
//   },
//   chefImage: {
//     width: 140,
//     height: 140,
//     borderRadius: 70,
//     borderWidth: 4,
//     borderColor: Colors.white,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//     elevation: 8,
//     backgroundColor: '#f0f0f0',
//   },
//   messageContainer: {
//     position: 'absolute',
//     top: -50,
//     right: -30,
//     alignItems: 'center',
//   },
//   messageBubble: {
//     backgroundColor: 'white',
//     paddingHorizontal: 16,
//     paddingVertical: 10,
//     borderRadius: 20,
//     borderBottomLeftRadius: 5,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.3,
//     shadowRadius: 6,
//     elevation: 5,
//     minWidth: 120,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   messageText: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: Colors.primary,
//     textAlign: 'center',
//   },
//   messageTail: {
//     position: 'absolute',
//     bottom: -8,
//     right: 15,
//     width: 0,
//     height: 0,
//     backgroundColor: 'transparent',
//     borderStyle: 'solid',
//     borderLeftWidth: 8,
//     borderRightWidth: 8,
//     borderTopWidth: 10,
//     borderLeftColor: 'transparent',
//     borderRightColor: 'transparent',
//     borderTopColor: 'white',
//     transform: [{ rotate: '30deg' }],
//   },
//   textContainer: {
//     alignItems: 'center',
//     zIndex: 10,
//     marginTop: height * 0.15,
//   },
//   tagline: {
//     fontSize: 18,
//     color: Colors.white,
//     fontWeight: '600',
//     textShadowColor: 'rgba(0, 0, 0, 0.4)',
//     textShadowOffset: { width: 1, height: 1 },
//     textShadowRadius: 4,
//     letterSpacing: 1,
//   },
//   loadingContainer: {
//     position: 'absolute',
//     bottom: 80,
//   },
//   loadingDots: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   dot: {
//     width: 10,
//     height: 10,
//     borderRadius: 5,
//     backgroundColor: Colors.white,
//     marginHorizontal: 6,
//     shadowColor: Colors.white,
//     shadowOffset: { width: 0, height: 0 },
//     shadowOpacity: 0.5,
//     shadowRadius: 3,
//     elevation: 3,
//   },
// });














import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  Dimensions,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import Colors from '@/constants/color';

const { width, height } = Dimensions.get('window');

export default function SplashScreen() {
  const router = useRouter();
  
  // Animation values for 3D falling letters
  const letterAnimations = useRef(
    "FoodApp".split('').map(() => ({
      scale: new Animated.Value(0),
      translateY: new Animated.Value(-200),
      rotateX: new Animated.Value(-90),
      opacity: new Animated.Value(0),
    }))
  ).current;

  const circleScale = useRef(new Animated.Value(0)).current;
  const circleOpacity = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const backgroundColor = useRef(new Animated.Value(0)).current;
  const loadingDotsOpacity = useRef(new Animated.Value(0)).current;
  const chefScale = useRef(new Animated.Value(0)).current;
  const messageOpacity = useRef(new Animated.Value(0)).current;
  const messageScale = useRef(new Animated.Value(0)).current;
  const messageBounce = useRef(new Animated.Value(0)).current;

  const appName = "FoodApp";
  const appNameChars = appName.split('');

  // Messages for the speech bubble
  const messages = [
    "Hey User! 👋",
    "Welcome! 🎉",
    "Ready to eat? 🍕",
    "Let's cook! 👨‍🍳",
    "Hungry? 😋",
    "Food time! 🍽️",
    "Yummy! 😍",
    "Let's feast! 🎊"
  ];

  useEffect(() => {
    startAnimation();
  }, []);

  const startAnimation = () => {
    // Reset all animations
    letterAnimations.forEach(anim => {
      anim.scale.setValue(0);
      anim.translateY.setValue(-200);
      anim.rotateX.setValue(-90);
      anim.opacity.setValue(0);
    });
    
    circleScale.setValue(0);
    circleOpacity.setValue(0);
    textOpacity.setValue(0);
    backgroundColor.setValue(0);
    loadingDotsOpacity.setValue(0);
    chefScale.setValue(0);
    messageOpacity.setValue(0);
    messageScale.setValue(0);
    messageBounce.setValue(0);

    // Main animation sequence
    Animated.sequence([
      // Phase 1: Circle emergence and growth
      Animated.parallel([
        Animated.timing(circleOpacity, {
          toValue: 1,
          duration: 600,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(circleScale, {
          toValue: 0.3,
          duration: 800,
          easing: Easing.out(Easing.back(1.5)),
          useNativeDriver: true,
        }),
      ]),

      // Phase 2: Continuous circle expansion
      Animated.parallel([
        Animated.timing(circleScale, {
          toValue: 8,
          duration: 1200,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(backgroundColor, {
          toValue: 1,
          duration: 1000,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: false,
        }),
      ]),

      // Phase 3: 3D Falling Letters Animation
      Animated.delay(300),

    ]).start(() => {
      // Start the 3D falling letters animation
      startFallingLettersAnimation();
    });

    // Message bounce animation
    setTimeout(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(messageBounce, {
            toValue: 1,
            duration: 1200,
            easing: Easing.inOut(Easing.cubic),
            useNativeDriver: true,
          }),
          Animated.timing(messageBounce, {
            toValue: 0,
            duration: 1200,
            easing: Easing.inOut(Easing.cubic),
            useNativeDriver: true,
          }),
        ])
      ).start();
    }, 4500);
  };

  const startFallingLettersAnimation = () => {
    // Create staggered falling animation for each letter
    const letterAnimationsSequence = letterAnimations.map((anim, index) => {
      return Animated.sequence([
        Animated.delay(index * 200), // Stagger each letter by 200ms
        Animated.parallel([
          // Falling down animation
          Animated.timing(anim.translateY, {
            toValue: 0,
            duration: 800,
            easing: Easing.out(Easing.back(1.5)),
            useNativeDriver: true,
          }),
          // 3D rotation from top
          Animated.timing(anim.rotateX, {
            toValue: 0,
            duration: 800,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
          // Scale up animation
          Animated.timing(anim.scale, {
            toValue: 1,
            duration: 600,
            easing: Easing.out(Easing.back(1.2)),
            useNativeDriver: true,
          }),
          // Fade in animation
          Animated.timing(anim.opacity, {
            toValue: 1,
            duration: 400,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
        ]),
      ]);
    });

    // Start all letter animations
    Animated.stagger(100, letterAnimationsSequence).start(() => {
      // After letters have fallen, show chef and other elements
      showRemainingElements();
    });
  };

  const showRemainingElements = () => {
    Animated.parallel([
      // Chef image appears with bounce
      Animated.timing(chefScale, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.back(1.7)),
        useNativeDriver: true,
      }),
      // Message box appears
      Animated.parallel([
        Animated.timing(messageOpacity, {
          toValue: 1,
          duration: 600,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(messageScale, {
          toValue: 1,
          duration: 700,
          easing: Easing.out(Easing.back(1.5)),
          useNativeDriver: true,
        }),
      ]),
      // Loading dots appear
      Animated.timing(loadingDotsOpacity, {
        toValue: 1,
        duration: 500,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      // Tagline appears
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 600,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Extended final pause then navigate
      setTimeout(() => {
        router.replace('/onboarding');
      }, 3000);
    });
  };

  // Interpolate background color from white to red
  const backgroundColorInterpolate = backgroundColor.interpolate({
    inputRange: [0, 1],
    outputRange: [Colors.white, Colors.primary],
  });

  // Chef bounce effect
  const chefBounce = chefScale.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 1.2, 1],
  });

  // Message box scale
  const messageBoxScale = messageScale.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1],
  });

  // Message bounce effect
  const messageBounceEffect = messageBounce.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -3],
  });

  // 3D Falling Letters Component
  const FallingLetters = () => {
    return (
      <View style={styles.lettersContainer}>
        {appNameChars.map((char, index) => {
          const anim = letterAnimations[index];
          
          const letterTransform = [
            { translateY: anim.translateY },
            { scale: anim.scale },
            { 
              rotateX: anim.rotateX.interpolate({
                inputRange: [-90, 0],
                outputRange: ['-90deg', '0deg'],
              })
            },
          ];

          return (
            <Animated.Text
              key={index}
              style={[
                styles.fallingLetter,
                {
                  opacity: anim.opacity,
                  transform: letterTransform,
                  textShadowColor: `rgba(0, 0, 0, ${0.3 + (index * 0.1)})`,
                }
              ]}
            >
              {char}
            </Animated.Text>
          );
        })}
      </View>
    );
  };

  // Animated Message Box Component
  const MessageBox = () => {
    const [currentMessageIndex, setCurrentMessageIndex] = React.useState(0);
    const messageTextOpacity = useRef(new Animated.Value(1)).current;

    useEffect(() => {
      const timer = setTimeout(() => {
        const changeMessage = () => {
          Animated.timing(messageTextOpacity, {
            toValue: 0,
            duration: 400,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }).start(() => {
            setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
            Animated.timing(messageTextOpacity, {
              toValue: 1,
              duration: 400,
              easing: Easing.out(Easing.cubic),
              useNativeDriver: true,
            }).start();
          });
        };

        const messageInterval = setInterval(changeMessage, 2200);
        return () => clearInterval(messageInterval);
      }, 4500);

      return () => clearTimeout(timer);
    }, []);

    return (
      <Animated.View 
        style={[
          styles.messageContainer,
          {
            opacity: messageOpacity,
            transform: [
              { scale: messageBoxScale },
              { translateY: messageBounceEffect }
            ]
          }
        ]}
      >
        <View style={styles.messageBubble}>
          <Animated.Text style={[styles.messageText, { opacity: messageTextOpacity }]}>
            {messages[currentMessageIndex]}
          </Animated.Text>
          <View style={styles.messageTail} />
        </View>
      </Animated.View>
    );
  };

  // Loading Dots Component
  const LoadingDots = () => {
    const dot1Opacity = useRef(new Animated.Value(0)).current;
    const dot2Opacity = useRef(new Animated.Value(0)).current;
    const dot3Opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      if (loadingDotsOpacity._value > 0) {
        const animateDots = () => {
          Animated.sequence([
            Animated.timing(dot1Opacity, {
              toValue: 1,
              duration: 300,
              useNativeDriver: true,
            }),
            Animated.timing(dot2Opacity, {
              toValue: 1,
              duration: 300,
              useNativeDriver: true,
            }),
            Animated.timing(dot3Opacity, {
              toValue: 1,
              duration: 300,
              useNativeDriver: true,
            }),
            Animated.timing(dot1Opacity, {
              toValue: 0,
              duration: 300,
              useNativeDriver: true,
            }),
            Animated.timing(dot2Opacity, {
              toValue: 0,
              duration: 300,
              useNativeDriver: true,
            }),
            Animated.timing(dot3Opacity, {
              toValue: 0,
              duration: 300,
              useNativeDriver: true,
            }),
          ]).start(() => animateDots());
        };

        animateDots();
      }
    }, [loadingDotsOpacity]);

    return (
      <Animated.View style={[styles.loadingContainer, { opacity: loadingDotsOpacity }]}>
        <View style={styles.loadingDots}>
          <Animated.View style={[styles.dot, { opacity: dot1Opacity }]} />
          <Animated.View style={[styles.dot, { opacity: dot2Opacity }]} />
          <Animated.View style={[styles.dot, { opacity: dot3Opacity }]} />
        </View>
        <Text style={styles.loadingText}>Loading delicious food...</Text>
      </Animated.View>
    );
  };

  return (
    <Animated.View style={[styles.container, { backgroundColor: backgroundColorInterpolate }]}>
      {/* Animated Circle */}
      <Animated.View
        style={[
          styles.circle,
          {
            transform: [{ scale: circleScale }],
            opacity: circleOpacity,
          },
        ]}
      />

      {/* 3D Falling Letters */}
      <FallingLetters />

      {/* Chef Image Container */}
      <Animated.View 
        style={[
          styles.chefContainer,
          {
            transform: [{ scale: chefBounce }],
            opacity: chefScale,
          }
        ]}
      >
        {/* Chef Image */}
        <Image
          source={{ 
            uri: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=200&h=200&fit=crop&crop=face' 
          }}
          style={styles.chefImage}
        />
        
        {/* Message Box */}
        <MessageBox />
      </Animated.View>

      {/* Tagline */}
      <Animated.View style={[styles.textContainer, { opacity: textOpacity }]}>
        <Text style={styles.tagline}>
          Delivering Happiness
        </Text>
      </Animated.View>

      {/* Loading Dots */}
      <LoadingDots />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  circle: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 25,
    elevation: 15,
  },
  lettersContainer: {
    position: 'absolute',
    top: height * 0.3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 20,
  },
  fallingLetter: {
    fontSize: 52,
    fontWeight: '900',
    color: Colors.white,
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 10,
    letterSpacing: 2,
    marginHorizontal: 2,
    transform: [{ perspective: 1000 }],
  },
  chefContainer: {
    position: 'absolute',
    top: height * 0.15,
    alignItems: 'center',
    zIndex: 5,
  },
  chefImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 4,
    borderColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    backgroundColor: '#f0f0f0',
  },
  messageContainer: {
    position: 'absolute',
    top: -50,
    right: -30,
    alignItems: 'center',
  },
  messageBubble: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderBottomLeftRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
    minWidth: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.primary,
    textAlign: 'center',
  },
  messageTail: {
    position: 'absolute',
    bottom: -8,
    right: 15,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderTopWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: 'white',
    transform: [{ rotate: '30deg' }],
  },
  textContainer: {
    alignItems: 'center',
    zIndex: 10,
    marginTop: height * 0.15,
  },
  tagline: {
    fontSize: 18,
    color: Colors.white,
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
    letterSpacing: 1,
  },
  loadingContainer: {
    position: 'absolute',
    bottom: 80,
    alignItems: 'center',
  },
  loadingDots: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.white,
    marginHorizontal: 6,
    shadowColor: Colors.white,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 3,
  },
  loadingText: {
    fontSize: 14,
    color: Colors.white,
    fontWeight: '500',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});
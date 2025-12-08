import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Pressable,
  ScrollView,
} from 'react-native';
import { X } from 'lucide-react-native';
import Colors from '@/constants/color';

interface Notification {
  id: string;
  date: string;
  title: string;
  time: string;
  message: string;
}

interface NotificationModalProps {
  visible: boolean;
  onClose: () => void;
}

const notifications: Notification[] = [
  {
    id: '1',
    date: '24 Nov, 2025',
    title: 'Why fight your cravings?',
    time: '13:49',
    message: 'BhojMandu is the solution.... order now! 😊😊'
  },
  {
    id: '2',
    date: '16 Nov, 2025',
    title: 'Crispy, juicy and tasty',
    time: '15:16',
    message: 'Grab your favorite food on BhojMandu 💬😊 Order Now!'
  },
  {
    id: '3',
    date: '22 Nov, 2025',
    title: 'Saturday cravings?',
    time: '18:05',
    message: 'Tap to order your weekend favorites on BhojMandu!'
  },
  {
    id: '4',
    date: '22 Nov, 2025',
    title: 'Saturday? BhojMandu!',
    time: '15:53',
    message: 'Weekend fuel loading... 😊😊'
  },
  {
    id: '5',
    date: '14 Nov, 2025',
    title: 'Craving Delicious Biryani?',
    time: '18:12',
    message: 'Get 50% off on all matka biryani from Koyla Tandoori Restaurant on BhojMandu 😊😊'
  },
  {
    id: '6',
    date: '19 Nov, 2025',
    title: 'NPL Fever?',
    time: '17:34',
    message: 'Fuel the match with hot deals on BhojMandu 💬😊 Order Now !!'
  }
];

export default function NotificationModal({ visible, onClose }: NotificationModalProps) {
  const slideAnim = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    if (visible) {
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

  const groupNotificationsByDate = () => {
    const grouped: { [key: string]: Notification[] } = {};
    notifications.forEach(notification => {
      if (!grouped[notification.date]) {
        grouped[notification.date] = [];
      }
      grouped[notification.date].push(notification);
    });
    return grouped;
  };

  const groupedNotifications = groupNotificationsByDate();

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
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Notification</Text>
            <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
              <X size={24} color={Colors.black} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {Object.entries(groupedNotifications).map(([date, dateNotifications]) => (
              <View key={date} style={styles.dateSection}>
                {/* Date Header */}
                <View style={styles.dateHeader}>
                  <View style={styles.dateLine} />
                  <Text style={styles.dateText}>{date}</Text>
                  <View style={styles.dateLine} />
                </View>

                {/* Notifications for this date */}
                {dateNotifications.map((notification, index) => (
                  <View key={notification.id} style={styles.notificationCard}>
                    <View style={styles.notificationHeader}>
                      <Text style={styles.notificationTitle} numberOfLines={1}>
                        {notification.title}
                      </Text>
                      <Text style={styles.notificationTime}>{notification.time}</Text>
                    </View>
                    <Text style={styles.notificationMessage}>
                      {notification.message}
                    </Text>
                    
                    {/* Divider between notifications (except last one) */}
                    {index < dateNotifications.length - 1 && (
                      <View style={styles.divider} />
                    )}
                  </View>
                ))}
              </View>
            ))}
            
            <View style={styles.bottomSpacer} />
          </ScrollView>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderGray,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.black,
  },
  closeButton: {
    padding: 4,
  },
  content: {
    paddingHorizontal: 20,
  },
  dateSection: {
    marginVertical: 16,
  },
  dateHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  dateLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.borderGray,
  },
  dateText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.gray,
    marginHorizontal: 12,
  },
  notificationCard: {
    backgroundColor: Colors.white,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.black,
    flex: 1,
    marginRight: 12,
  },
  notificationTime: {
    fontSize: 12,
    color: Colors.gray,
    fontWeight: '500',
  },
  notificationMessage: {
    fontSize: 14,
    color: Colors.gray,
    lineHeight: 20,
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.borderGray,
    marginVertical: 16,
  },
  bottomSpacer: {
    height: 20,
  },
});
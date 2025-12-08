import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Moon, Bell, Lock, Globe } from 'lucide-react-native';
import Colors from '@/constants/color';

export default function SettingsScreen() {
  const router = useRouter();
  const [settings, setSettings] = useState({
    darkMode: false,
    notifications: true,
    language: 'English',
  });

  const toggleSetting = (setting: string) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting as keyof typeof prev]
    }));
  };

  const handleChangePassword = () => {
    Alert.alert('Change Password', 'Password change feature coming soon!');
  };

  const handleLanguageChange = () => {
    Alert.alert('Language', 'Language selection feature coming soon!');
  };

  const settingsItems = [
    {
      icon: Moon,
      label: 'Dark Mode',
      description: 'Switch to dark theme',
      type: 'toggle',
      value: settings.darkMode,
      onPress: () => toggleSetting('darkMode'),
      color: '#8B5CF6',
    },
    {
      icon: Bell,
      label: 'Notification',
      description: 'Manage your notifications',
      type: 'toggle',
      value: settings.notifications,
      onPress: () => toggleSetting('notifications'),
      color: '#3B82F6',
    },
    {
      icon: Lock,
      label: 'Change Password',
      description: 'Update your password',
      type: 'navigation',
      onPress: handleChangePassword,
      color: '#EF4444',
    },
    {
      icon: Globe,
      label: 'Language',
      description: 'App language: English',
      type: 'navigation',
      onPress: handleLanguageChange,
      color: '#10B981',
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color={Colors.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.settingsList}>
          {settingsItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.settingItem}
              onPress={item.onPress}
              activeOpacity={0.7}
            >
              <View style={styles.settingLeft}>
                <View
                  style={[
                    styles.iconContainer,
                    { backgroundColor: `${item.color}15` },
                  ]}
                >
                  <item.icon size={20} color={item.color} />
                </View>
                <View style={styles.settingTextContainer}>
                  <Text style={styles.settingLabel}>{item.label}</Text>
                  <Text style={styles.settingDescription}>{item.description}</Text>
                </View>
              </View>
              
              {item.type === 'toggle' ? (
                <Switch
                  value={item.value}
                  onValueChange={item.onPress}
                  trackColor={{ false: Colors.lightGray, true: `${item.color}80` }}
                  thumbColor={item.value ? item.color : Colors.white}
                />
              ) : (
                <View style={styles.arrowContainer}>
                  <Text style={styles.arrow}>›</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appVersion}>Version 1.0.0</Text>
          <Text style={styles.appCopyright}>© 2024 FoodApp. All rights reserved.</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.black,
  },
  placeholder: {
    width: 32,
  },
  content: {
    flex: 1,
    backgroundColor: Colors.lightGray,
  },
  settingsList: {
    margin: 16,
    backgroundColor: Colors.white,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderGray,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingTextContainer: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 14,
    color: Colors.gray,
  },
  arrowContainer: {
    padding: 4,
  },
  arrow: {
    fontSize: 20,
    color: Colors.gray,
    fontWeight: 'bold',
  },
  appInfo: {
    alignItems: 'center',
    padding: 20,
    marginTop: 20,
  },
  appVersion: {
    fontSize: 14,
    color: Colors.gray,
    marginBottom: 4,
  },
  appCopyright: {
    fontSize: 12,
    color: Colors.gray,
  },
});
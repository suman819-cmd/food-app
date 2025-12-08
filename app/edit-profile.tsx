import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Image,
  Modal,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/providers/AuthProvider';
import { User, Mail, ChevronDown, ChevronLeft } from 'lucide-react-native';

const EditProfile = () => {
  const router = useRouter();
  const { user, updateUser } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);
  const [countryCode, setCountryCode] = useState('+977');
  const [phoneNumber, setPhoneNumber] = useState('9744318379');
  const [menuVisible, setMenuVisible] = useState(false);

  const countryFlags = {
    '+977': '🇳🇵', '+91': '🇮🇳', '+1': '🇺🇸', '+44': '🇬🇧',
    '+86': '🇨🇳', '+81': '🇯🇵', '+82': '🇰🇷', '+65': '🇸🇬',
    '+60': '🇲🇾', '+971': '🇦🇪', '+966': '🇸🇦', '+92': '🇵🇰',
    '+880': '🇧🇩', '+94': '🇱🇰', '+855': '🇰🇭',
  };

  useEffect(() => {
    if (user) {
      const phone = user.phone || '+977 | 9744318379';
      const [code, number] = phone.split(' | ');

      setFormData({
        name: user.fullName || 'Suman',
        phone: phone,
        email: user.email || 'shumanbashyal@gmail.com',
      });

      if (code && number) {
        setCountryCode(code);
        setPhoneNumber(number);
      }
    }
  }, [user]);

  // Simple and reliable navigation function
  const navigateBack = () => {
    console.log('Navigating back to menu');
    // Always use replace to ensure we go to menu tab
    router.replace('/(tabs)/menu');
  };

  const handleUpdate = async () => {
    if (!formData.name.trim() || !formData.email.trim() || !phoneNumber.trim()) {
      Alert.alert('Error', 'Please fill all required fields.');
      return;
    }

    setLoading(true);
    try {
      const fullPhone = `${countryCode} | ${phoneNumber}`;
      console.log('Updating user profile...');
      
      // Update user profile
      await updateUser({
        fullName: formData.name,
        email: formData.email,
        phone: fullPhone,
      });
      
      console.log('Profile updated successfully');
      
      // Show success message and navigate immediately
      Alert.alert('Success', 'Profile updated successfully');
      
      // Navigate back immediately without waiting for OK button
      navigateBack();
      
    } catch (error: any) {
      console.error('Update profile error:', error);
      Alert.alert('Error', error.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = () => {
    Alert.alert('Upload Photo', 'This feature will allow you to upload a profile photo', [{ text: 'OK' }]);
  };

  const handleCountryCodeChange = () => {
    Alert.alert(
      'Change Country Code',
      'Select your country code:',
      Object.keys(countryFlags).map(code => ({
        text: `${countryFlags[code]} ${code}`,
        onPress: () => setCountryCode(code),
      })).concat({ text: 'Cancel', style: 'cancel' })
    );
  };

  const getCountryFlag = (code: string) => countryFlags[code] || '🏳️';

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);
  const handleDelete = () => {
    closeMenu();
    Alert.alert('Delete Profile', 'Profile will be deleted!', [{ text: 'OK' }]);
  };

  // Handle back button
  const handleBackPress = () => {
    navigateBack();
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <ChevronLeft size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Edit Profile</Text>
        <TouchableOpacity onPress={openMenu} style={styles.menuButton}>
          <Text style={styles.menuText}>⋮</Text>
        </TouchableOpacity>
      </View>

      {/* Triple-dot Menu Modal */}
      <Modal
        visible={menuVisible}
        transparent
        animationType="fade"
        onRequestClose={closeMenu}
      >
        <TouchableOpacity style={styles.modalOverlay} onPress={closeMenu}>
          <View style={styles.menuModal}>
            <TouchableOpacity onPress={handleDelete} style={styles.menuItem}>
              <Text style={styles.menuItemText}>Delete Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={closeMenu} style={styles.menuItem}>
              <Text style={[styles.menuItemText, { color: '#666' }]}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Photo Upload */}
        <View style={styles.profilePhotoSection}>
          <TouchableOpacity onPress={handleImageUpload} style={styles.profileImageContainer}>
            <Image
              source={{
                uri: user?.fullName 
                  ? `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullName)}&size=200&background=FF6B35&color=fff`
                  : "https://ui-avatars.com/api/?name=User&size=200&background=666666&color=fff",
              }}
              style={styles.profileImage}
            />
            <View style={styles.cameraIcon}>
              <Text style={styles.cameraIconText}>📷</Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.uploadText}>Tap to upload photo</Text>
        </View>

        {/* Name Field */}
        <View style={styles.inputSection}>
          <Text style={styles.label}>Name *</Text>
          <View style={styles.inputContainer}>
            <View style={styles.prefixContainer}>
              <User size={26} color="#666" />
            </View>
            <TextInput
              style={styles.input}
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
              placeholder="Enter your name"
              placeholderTextColor="#999"
            />
          </View>
        </View>

        {/* Phone Field */}
        <View style={styles.inputSection}>
          <Text style={styles.label}>Phone *</Text>
          <View style={styles.inputContainer}>
            <TouchableOpacity 
              style={styles.countryCodeContainer}
              onPress={handleCountryCodeChange}
            >
              <View style={styles.flagContainer}>
                <Text style={styles.flag}>{getCountryFlag(countryCode)}</Text>
              </View>
              <Text style={styles.countryCodeText}>{countryCode}</Text>
              <ChevronDown size={20} color="#666" />
            </TouchableOpacity>
            <View style={styles.phoneDivider} />
            <TextInput
              style={styles.phoneInput}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              placeholder="Your phone number"
              placeholderTextColor="#999"
              keyboardType="phone-pad"
            />
          </View>
        </View>

        {/* Email Field */}
        <View style={styles.inputSection}>
          <Text style={styles.label}>E-mail *</Text>
          <View style={styles.inputContainer}>
            <View style={styles.prefixContainer}>
              <Mail size={26} color="#666" />
            </View>
            <TextInput
              style={styles.input}
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              placeholder="Your email address"
              placeholderTextColor="#999"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        </View>

        {/* Update Button */}
        <TouchableOpacity 
          style={[styles.updateButton, loading && styles.updateButtonDisabled]} 
          onPress={handleUpdate}
          disabled={loading}
        >
          <Text style={styles.updateButtonText}>
            {loading ? 'Updating...' : 'Update Profile'}
          </Text>
        </TouchableOpacity>

        {/* Extra spacing for better scroll */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#FFFFFF' 
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  backButton: { 
    padding: 8 
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  menuButton: { 
    padding: 8 
  },
  menuText: { 
    fontSize: 24, 
    color: '#000000' 
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  menuModal: {
    backgroundColor: '#fff',
    marginTop: 50,
    marginRight: 10,
    borderRadius: 8,
    width: 160,
    paddingVertical: 8,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  menuItem: { 
    paddingVertical: 12, 
    paddingHorizontal: 16 
  },
  menuItemText: { 
    fontSize: 16, 
    color: '#D90000', 
    fontWeight: '600' 
  },
  content: { 
    flex: 1, 
    padding: 20 
  },
  profilePhotoSection: { 
    alignItems: 'center', 
    marginBottom: 30 
  },
  profileImageContainer: { 
    position: 'relative', 
    marginBottom: 8 
  },
  profileImage: { 
    width: 100, 
    height: 100, 
    borderRadius: 50, 
    borderWidth: 3, 
    borderColor: '#FF6B35' 
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#FF6B35',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  cameraIconText: { 
    fontSize: 14 
  },
  uploadText: { 
    fontSize: 14, 
    color: '#666' 
  },
  inputSection: { 
    marginBottom: 24 
  },
  label: { 
    fontSize: 16, 
    fontWeight: '600', 
    color: '#000000', 
    marginBottom: 8 
  },
  inputContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    borderWidth: 1, 
    borderColor: '#D1D1D1', 
    borderRadius: 8, 
    backgroundColor: '#FFFFFF', 
    overflow: 'hidden',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  prefixContainer: { 
    paddingHorizontal: 12, 
    paddingVertical: 14, 
    backgroundColor: '#F8F8F8', 
    borderRightWidth: 1, 
    borderRightColor: '#D1D1D1' 
  },
  countryCodeContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 12, 
    paddingVertical: 14, 
    backgroundColor: '#F8F8F8' 
  },
  flagContainer: { 
    marginRight: 8 
  },
  flag: { 
    fontSize: 20 
  },
  countryCodeText: { 
    fontSize: 16, 
    color: '#000000', 
    marginRight: 4 
  },
  phoneDivider: { 
    width: 1, 
    height: 20, 
    backgroundColor: '#D1D1D1', 
    marginHorizontal: 8 
  },
  phoneInput: { 
    flex: 1, 
    padding: 14, 
    fontSize: 16, 
    color: '#000000' 
  },
  input: { 
    flex: 1, 
    padding: 14, 
    fontSize: 16, 
    color: '#000000' 
  },
  updateButton: { 
    backgroundColor: '#D90000', 
    paddingVertical: 16, 
    borderRadius: 8, 
    alignItems: 'center', 
    marginTop: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  updateButtonDisabled: { 
    backgroundColor: '#CCCCCC' 
  },
  updateButtonText: { 
    color: '#FFFFFF', 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
  bottomSpacing: {
    height: 40,
  },
});

export default EditProfile;
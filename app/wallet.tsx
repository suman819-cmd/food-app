import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Filter, Plus, X, Check } from 'lucide-react-native';
import Colors from '@/constants/color';

export default function WalletScreen() {
  const router = useRouter();
  const [showAddFundModal, setShowAddFundModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [amount, setAmount] = useState('');
  const [selectedPayment, setSelectedPayment] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [walletBalance, setWalletBalance] = useState(500);

  // Mock transaction data
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      type: 'added',
      amount: 1000,
      description: 'Added via eSewa',
      date: '2024-01-15',
      time: '14:30',
      status: 'completed'
    },
    {
      id: 2,
      type: 'order',
      amount: -250,
      description: 'Food order payment',
      date: '2024-01-14',
      time: '19:15',
      status: 'completed'
    },
    {
      id: 3,
      type: 'referral',
      amount: 50,
      description: 'Earned by referral',
      date: '2024-01-13',
      time: '10:00',
      status: 'completed'
    },
    {
      id: 4,
      type: 'cashback',
      amount: 25,
      description: 'Cashback from order',
      date: '2024-01-12',
      time: '16:45',
      status: 'completed'
    },
    {
      id: 5,
      type: 'loyalty',
      amount: 100,
      description: 'Converted from loyalty points',
      date: '2024-01-10',
      time: '11:20',
      status: 'completed'
    },
    {
      id: 6,
      type: 'added',
      amount: 500,
      description: 'Added via Khalti',
      date: '2024-01-08',
      time: '09:30',
      status: 'completed'
    }
  ]);

  const paymentMethods = [
    { id: 'esewa', name: 'eSewa', icon: '🏦' },
    { id: 'khalti', name: 'Khalti', icon: '💳' },
    { id: 'card', name: 'Visa/Mastercard', icon: '💳' },
  ];

  const filterOptions = [
    { id: 'all', label: 'All Transactions' },
    { id: 'order', label: 'Order Transactions' },
    { id: 'loyalty', label: 'Converted from Loyalty Point' },
    { id: 'added', label: 'Added via Payment Method' },
    { id: 'referral', label: 'Earned by Referral' },
    { id: 'cashback', label: 'Cashback Transaction' },
  ];

  const handleAddFund = async () => {
    if (!amount || !selectedPayment) {
      Alert.alert('Error', 'Please enter amount and select payment method');
      return;
    }

    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }

    setIsLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsLoading(false);
      setShowAddFundModal(false);
      const newBalance = walletBalance + amountNum;
      setWalletBalance(newBalance);
      
      // Add new transaction
      const newTransaction = {
        id: transactions.length + 1,
        type: 'added',
        amount: amountNum,
        description: `Added via ${selectedPayment}`,
        date: new Date().toISOString().split('T')[0],
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        status: 'completed'
      };
      
      setTransactions([newTransaction, ...transactions]);
      setAmount('');
      setSelectedPayment('');
      Alert.alert('Success', `Rs. ${amount} added to your wallet successfully!`);
    }, 2000);
  };

  const filteredTransactions = transactions.filter(transaction => {
    if (selectedFilter === 'all') return true;
    return transaction.type === selectedFilter;
  });

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'added':
        return '💳';
      case 'order':
        return '🛒';
      case 'referral':
        return '👥';
      case 'cashback':
        return '💰';
      case 'loyalty':
        return '⭐';
      default:
        return '📊';
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'added':
        return '#10B981';
      case 'order':
        return '#EF4444';
      case 'referral':
        return '#8B5CF6';
      case 'cashback':
        return '#F59E0B';
      case 'loyalty':
        return '#EC4899';
      default:
        return Colors.gray;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const applyFilter = (filterId: string) => {
    setSelectedFilter(filterId);
    setShowFilterModal(false);
  };

  const clearFilter = () => {
    setSelectedFilter('all');
    setShowFilterModal(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
      
      {/* Header - Moved slightly down */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => router.back()}
          >
            <ChevronLeft size={28} color={Colors.black} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Wallet</Text>
          <View style={styles.placeholder} />
        </View>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Wallet Amount Section */}
        <View style={styles.amountSection}>
          <Text style={styles.amountLabel}>Your Wallet Amount</Text>
          
          {/* Amount with Plus Icon */}
          <View style={styles.amountContainer}>
            <Text style={styles.amount}>Rs. {walletBalance}</Text>
            <TouchableOpacity 
              style={styles.plusButton}
              onPress={() => setShowAddFundModal(true)}
            >
              <Plus size={24} color={Colors.primary} />
            </TouchableOpacity>
          </View>
          
          {/* Add Fund Button */}
          <TouchableOpacity 
            style={styles.addFundButton}
            onPress={() => setShowAddFundModal(true)}
          >
            <Plus size={20} color={Colors.white} />
            <Text style={styles.addFundText}>Add Fund</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.divider} />

        {/* Wallet History Section */}
        <View style={styles.historySection}>
          <View style={styles.historyHeader}>
            <Text style={styles.historyTitle}>Wallet History</Text>
            <TouchableOpacity 
              style={styles.filterButton}
              onPress={() => setShowFilterModal(true)}
            >
              <Filter size={18} color={Colors.primary} />
              <Text style={styles.filterText}>
                {selectedFilter === 'all' ? 'Filter' : 
                 filterOptions.find(f => f.id === selectedFilter)?.label}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Transactions List */}
          {filteredTransactions.length > 0 ? (
            <View style={styles.transactionsList}>
              {filteredTransactions.map((transaction) => (
                <View key={transaction.id} style={styles.transactionItem}>
                  <View style={styles.transactionLeft}>
                    <View 
                      style={[
                        styles.transactionIcon,
                        { backgroundColor: `${getTransactionColor(transaction.type)}15` }
                      ]}
                    >
                      <Text style={styles.transactionIconText}>
                        {getTransactionIcon(transaction.type)}
                      </Text>
                    </View>
                    <View style={styles.transactionDetails}>
                      <Text style={styles.transactionDescription}>
                        {transaction.description}
                      </Text>
                      <Text style={styles.transactionDate}>
                        {formatDate(transaction.date)} • {transaction.time}
                      </Text>
                    </View>
                  </View>
                  <Text 
                    style={[
                      styles.transactionAmount,
                      { 
                        color: transaction.amount > 0 ? '#10B981' : '#EF4444'
                      }
                    ]}
                  >
                    {transaction.amount > 0 ? '+' : ''}Rs. {Math.abs(transaction.amount)}
                  </Text>
                </View>
              ))}
            </View>
          ) : (
            /* Empty State */
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No transactions found!</Text>
              <Text style={styles.emptyStateSubtext}>
                {selectedFilter === 'all' 
                  ? 'Your wallet transactions will appear here'
                  : `No ${filterOptions.find(f => f.id === selectedFilter)?.label.toLowerCase()} found`
                }
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Add Fund Modal */}
      <Modal
        visible={showAddFundModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowAddFundModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add Fund to Wallet</Text>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setShowAddFundModal(false)}
              >
                <X size={24} color={Colors.gray} />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalSubtitle}>
              Add fund Form secured Digital payment gateways
            </Text>

            <ScrollView 
              style={styles.modalContent}
              showsVerticalScrollIndicator={false}
            >
              {/* Amount Input */}
              <View style={styles.inputSection}>
                <Text style={styles.inputLabel}>Enter Amount... (Rs.)</Text>
                <TextInput
                  style={styles.amountInput}
                  placeholder="Ex: 100.00"
                  placeholderTextColor={Colors.gray}
                  keyboardType="decimal-pad"
                  value={amount}
                  onChangeText={setAmount}
                />
              </View>

              {/* Payment Methods */}
              <View style={styles.paymentSection}>
                <Text style={styles.paymentTitle}>
                  Choose Payment Method (Pay Online & Get Reward Points)
                </Text>
                
                <View style={styles.paymentMethods}>
                  {paymentMethods.map((method) => (
                    <TouchableOpacity
                      key={method.id}
                      style={[
                        styles.paymentMethod,
                        selectedPayment === method.id && styles.selectedPaymentMethod
                      ]}
                      onPress={() => setSelectedPayment(method.id)}
                    >
                      <View style={styles.radioContainer}>
                        <View style={[
                          styles.radio,
                          selectedPayment === method.id && styles.radioSelected
                        ]}>
                          {selectedPayment === method.id && (
                            <View style={styles.radioInner} />
                          )}
                        </View>
                      </View>
                      <Text style={styles.paymentMethodText}>{method.icon} {method.name}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {isLoading && (
                  <View style={styles.loadingContainer}>
                    <Text style={styles.loadingText}>Processing payment...</Text>
                  </View>
                )}
              </View>

              {/* Add Fund Button */}
              <TouchableOpacity 
                style={[
                  styles.submitButton,
                  (!amount || !selectedPayment || isLoading) && styles.submitButtonDisabled
                ]}
                onPress={handleAddFund}
                disabled={!amount || !selectedPayment || isLoading}
              >
                <Text style={styles.submitButtonText}>
                  {isLoading ? 'Processing...' : 'Add Fund'}
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Filter Modal */}
      <Modal
        visible={showFilterModal}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setShowFilterModal(false)}
      >
        <View style={styles.filterModalOverlay}>
          <View style={styles.filterModalContainer}>
            {/* Modal Header */}
            <View style={styles.filterModalHeader}>
              <Text style={styles.filterModalTitle}>Filter Transactions</Text>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setShowFilterModal(false)}
              >
                <X size={24} color={Colors.gray} />
              </TouchableOpacity>
            </View>

            <ScrollView 
              style={styles.filterModalContent}
              showsVerticalScrollIndicator={false}
            >
              {filterOptions.map((option) => (
                <TouchableOpacity
                  key={option.id}
                  style={styles.filterOption}
                  onPress={() => applyFilter(option.id)}
                >
                  <Text style={styles.filterOptionText}>{option.label}</Text>
                  {selectedFilter === option.id && (
                    <Check size={20} color={Colors.primary} />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>

            <View style={styles.filterModalFooter}>
              <TouchableOpacity 
                style={styles.clearFilterButton}
                onPress={clearFilter}
              >
                <Text style={styles.clearFilterText}>Clear Filter</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  // Updated Header Styles - Moved slightly down
  header: {
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderGray,
    paddingTop: 50, // Added padding to move header down
    elevation: 2,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    fontSize: 20, // Slightly larger
    fontWeight: 'bold',
    color: Colors.black,
    letterSpacing: 0.5, // Better typography
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  amountSection: {
    padding: 30, // Increased padding
    alignItems: 'center',
    backgroundColor: '#F8FAFC', // Light background for contrast
    margin: 20, // Added margin
    borderRadius: 20, // Rounded corners
    elevation: 4,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  amountLabel: {
    fontSize: 16,
    color: Colors.gray,
    marginBottom: 16,
    fontWeight: '500',
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24, // Increased spacing
  },
  amount: {
    fontSize: 42, // Larger amount
    fontWeight: 'bold',
    color: Colors.primary,
    marginRight: 16, // More spacing
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  plusButton: {
    width: 52, // Slightly larger
    height: 52,
    borderRadius: 26,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.primary,
    elevation: 4,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  addFundButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10, // More spacing
    backgroundColor: Colors.primary,
    paddingHorizontal: 32, // Wider button
    paddingVertical: 16, // Taller button
    borderRadius: 30, // More rounded
    elevation: 6,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  addFundText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700', // Bolder
    letterSpacing: 0.5,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.borderGray,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  historySection: {
    padding: 20,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24, // More spacing
  },
  historyTitle: {
    fontSize: 20, // Larger
    fontWeight: 'bold',
    color: Colors.black,
    letterSpacing: 0.3,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8, // More spacing
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12, // More rounded
    borderWidth: 1.5,
    borderColor: Colors.primary + '30',
    backgroundColor: Colors.white,
    elevation: 2,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  filterText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '600',
  },
  transactionsList: {
    gap: 16, // More spacing between items
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20, // More padding
    backgroundColor: Colors.white,
    borderRadius: 16, // More rounded
    borderWidth: 1,
    borderColor: Colors.borderGray,
    elevation: 3,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  transactionIcon: {
    width: 48, // Larger icon
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16, // More spacing
  },
  transactionIconText: {
    fontSize: 18, // Larger emoji
  },
  transactionDetails: {
    flex: 1,
  },
  transactionDescription: {
    fontSize: 15, // Slightly larger
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 6, // More spacing
    lineHeight: 20,
  },
  transactionDate: {
    fontSize: 13,
    color: Colors.gray,
    opacity: 0.8,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.3,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80, // More vertical spacing
    paddingHorizontal: 20,
  },
  emptyStateText: {
    fontSize: 18, // Larger
    color: Colors.gray,
    marginBottom: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: Colors.gray,
    opacity: 0.7,
    textAlign: 'center',
    lineHeight: 20,
  },

  // Add Fund Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Darker overlay
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 24, // More rounded
    borderTopRightRadius: 24,
    maxHeight: '85%', // Slightly taller
    elevation: 10,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24, // More padding
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderGray,
  },
  modalTitle: {
    fontSize: 20, // Larger
    fontWeight: 'bold',
    color: Colors.black,
    letterSpacing: 0.3,
  },
  closeButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: Colors.lightGray,
  },
  modalSubtitle: {
    fontSize: 14,
    color: Colors.gray,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 24,
    paddingHorizontal: 24,
    lineHeight: 20,
  },
  modalContent: {
    padding: 24,
  },
  inputSection: {
    marginBottom: 28, // More spacing
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 12, // More spacing
    letterSpacing: 0.3,
  },
  amountInput: {
    borderWidth: 1.5,
    borderColor: Colors.borderGray,
    borderRadius: 16, // More rounded
    padding: 18, // More padding
    fontSize: 18, // Larger text
    backgroundColor: Colors.lightGray,
    fontWeight: '500',
  },
  paymentSection: {
    marginBottom: 28, // More spacing
  },
  paymentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 20, // More spacing
    letterSpacing: 0.3,
    lineHeight: 22,
  },
  paymentMethods: {
    gap: 16, // More spacing
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20, // More padding
    borderWidth: 1.5,
    borderColor: Colors.borderGray,
    borderRadius: 16, // More rounded
    backgroundColor: Colors.white,
    elevation: 2,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  selectedPaymentMethod: {
    borderColor: Colors.primary,
    backgroundColor: `${Colors.primary}15`, // More subtle background
    elevation: 4,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  radioContainer: {
    marginRight: 16, // More spacing
  },
  radio: {
    width: 24, // Larger radio
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.borderGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: {
    borderColor: Colors.primary,
  },
  radioInner: {
    width: 12, // Larger inner circle
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.primary,
  },
  paymentMethodText: {
    fontSize: 16,
    color: Colors.black,
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  loadingContainer: {
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    fontSize: 15,
    color: Colors.gray,
    fontWeight: '500',
  },
  submitButton: {
    backgroundColor: Colors.primary,
    padding: 20, // More padding
    borderRadius: 16, // More rounded
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 30, // More bottom spacing
    elevation: 6,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  submitButtonDisabled: {
    backgroundColor: Colors.borderGray,
    elevation: 0,
    shadowOpacity: 0,
  },
  submitButtonText: {
    color: Colors.white,
    fontSize: 18, // Larger text
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },

  // Filter Modal Styles
  filterModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Darker overlay
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  filterModalContainer: {
    backgroundColor: Colors.white,
    borderRadius: 24, // More rounded
    width: '100%',
    maxWidth: 400,
    maxHeight: '70%',
    elevation: 12,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
  },
  filterModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24, // More padding
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderGray,
  },
  filterModalTitle: {
    fontSize: 20, // Larger
    fontWeight: 'bold',
    color: Colors.black,
    letterSpacing: 0.3,
  },
  filterModalContent: {
    padding: 24,
  },
  filterOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18, // More padding
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderGray,
  },
  filterOptionText: {
    fontSize: 16,
    color: Colors.black,
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  filterModalFooter: {
    padding: 24, // More padding
    borderTopWidth: 1,
    borderTopColor: Colors.borderGray,
  },
  clearFilterButton: {
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: Colors.lightGray,
  },
  clearFilterText: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
});
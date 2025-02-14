import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Alert, 
  TouchableOpacity, 
  Modal,
  Image 
} from 'react-native';
import Header from '../../../components/header';
import { rw, rh, rf } from '../../../Service/responsive';
import LinearStepIndicator from '../../../components/Stepper/LinearIndicatorStepper';
import TextInputField from '../../../components/Inputs/TextInputField';
import apiClient from '../../../Service/apiClient';
import CustomButtons from '../../../components/Buttons/CustomButtons';

const OutletDetailsScreen = ({ navigation, route }) => {
  const { mobile } = route.params;

  // Outlet details fields
  const [name, setName] = useState('');
  const [gstNumber, setGstNumber] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [stateValue, setStateValue] = useState('');
  const [pincode, setPincode] = useState('');
  const [landmark, setLandmark] = useState('');

  // Loading and error states
  const [isLoading, setIsLoading] = useState(false);
  const [isPinCodeLoading, setPinCodeLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  // New state: Pin Code Validity
  const [isPinCodeValid, setIsPinCodeValid] = useState(false);

  // Modal state for successful registration
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Validate inputs including GST Number
  const validateInputs = () => {
    let validationErrors = {};

    if (!name.trim()) validationErrors.name = 'Outlet name is required';
    if (!pincode || !/^\d{6}$/.test(pincode))
      validationErrors.pincode = 'Pincode is required and should be 6 digits';
    if (!address.trim()) validationErrors.address = 'Address is required';
    if (!city.trim()) validationErrors.city = 'City is required';
    if (!stateValue.trim()) validationErrors.state = 'State is required';
    if (!landmark.trim()) validationErrors.landmark = 'Landmark is required';

    if (!gstNumber.trim()) {
      validationErrors.gstNumber = 'GST Number is required';
    } else {
      // Regular expression for validating Indian GSTIN
      const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9A-Z]{1}Z[0-9A-Z]{1}$/;
      if (!gstRegex.test(gstNumber)) {
        validationErrors.gstNumber = 'Please enter a valid GST Number';
      }
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  // Remove GST error when a valid GST number is filled
  useEffect(() => {
    const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9A-Z]{1}Z[0-9A-Z]{1}$/;
    if (gstRegex.test(gstNumber)) {
      setErrors(prev => ({ ...prev, gstNumber: '' }));
    }
  }, [gstNumber]);

  // Remove Outlet Name error when name is filled
  useEffect(() => {
    if (name.trim()) {
      setErrors(prev => ({ ...prev, name: '' }));
    }
  }, [name]);

  // Fetch postal details by pincode and update isPinCodeValid accordingly
  const fetchPincodeData = async (pin) => {
    try {
      setPinCodeLoading(true);
      const response = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
      const json = await response.json();

      if (
        json &&
        json[0]?.Status === "Success" &&
        Array.isArray(json[0].PostOffice) &&
        json[0].PostOffice.length > 0
      ) {
        const postOffice = json[0].PostOffice[0];
        // Auto-fill city and state (address is not auto-filled)
        setCity(postOffice.District || '');
        setStateValue(postOffice.State || '');
        setIsPinCodeValid(true);
        // Remove error messages for pincode, city and state
        setErrors(prev => ({ ...prev, pincode: '', city: '', state: '' }));
      } else {
        // Clear auto-filled fields for manual entry
        setCity('');
        setStateValue('');
        setIsPinCodeValid(false);
        setErrors(prev => ({ ...prev, pincode: 'Invalid pin code' }));
      }
    } catch (error) {
      console.error('Error fetching pincode data:', error);
      setCity('');
      setStateValue('');
      setIsPinCodeValid(false);
      setErrors(prev => ({ ...prev, pincode: 'Invalid pin code' }));
    } finally {
      setPinCodeLoading(false);
    }
  };

  useEffect(() => {
    if (pincode.length === 6) {
      fetchPincodeData(pincode);
    } else {
      // If pincode is not 6 digits, clear auto-filled city and state and remove any pin code error
      setCity('');
      setStateValue('');
      setIsPinCodeValid(false);
      setErrors(prev => ({ ...prev, pincode: '' }));
    }
  }, [pincode]);

  const handleAddressBlur = () => {
    // Optional: If you want to check address for a 6-digit number, you can keep this logic.
    const match = address.match(/\b\d{6}\b/);
    if (match) {
      fetchPincodeData(match[0]);
    }
  };

  // If API auto-fills city & state, disable manual editing for these fields
  const isAutoFilled = pincode.length === 6 && isPinCodeValid && city.trim() !== '' && stateValue.trim() !== '';

  // Submit details via API
  const handleSubmit = async () => {
    setIsSubmitted(true);

    // Validate other inputs first
    if (!validateInputs()) {
      return;
    }

    // Check if pincode is 6 digits and API validated it
    if (pincode.length === 6 && !isPinCodeValid) {
      setErrors(prev => ({ ...prev, pincode: 'Invalid pin code' }));
      return;
    }

    setIsLoading(true);
    try {
      const response = await apiClient.post('/registerOutlet', {
        mobile,
        name,
        gst_number: gstNumber,
        address,
        city,
        state: stateValue,
        pincode,
        landmark,
      });
      const { status, msg } = response.data;
      if (status === 1) {
        setIsModalVisible(true);
      } else {
        Alert.alert('Error', msg);
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Modal close and continue shopping
  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handleContinueShopping = async () => {
    handleModalClose();
    navigation.replace('B2BBottomNavigator');
  };

  return (
    <View style={styles.container}>
      <Header title="Outlet Details" />
      <View style={styles.ContentContaine}>
        <LinearStepIndicator steps={[1, 2]} currentStep={2} />
        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          <View style={{ marginTop: rh(2) }}>
            <Text style={{ fontWeight: 'bold', fontSize: rf(2), color: '#272727' }}>
              Enter Your Outlet Details
            </Text>
            <View style={{ paddingVertical: rh(1) }}>
              <TextInputField
                placeholder="Outlet Name"
                value={name}
                onChange={setName}
                maxLength={30}
                errorMessage={isSubmitted && errors.name}
              />
              <TextInputField
                placeholder="GST Number"
                value={gstNumber}
                onChange={setGstNumber}
                maxLength={15}
                errorMessage={isSubmitted && errors.gstNumber}
              />
              <TextInputField
                placeholder="Pin Code"
                value={pincode}
                onChange={setPincode}
                keyboardType="numeric"
                maxLength={6}
                errorMessage={isSubmitted && errors.pincode}
                loading={isPinCodeLoading}
              />
              <TextInputField
                placeholder="Address"
                value={address}
                onChange={setAddress}
                maxLength={30}
                errorMessage={isSubmitted && errors.address}
              />
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ width: rw(45) }}>
                  <TextInputField
                    placeholder="City"
                    value={city}
                    onChange={setCity}
                    maxLength={20}
                    errorMessage={isSubmitted && errors.city}
                    loading={isPinCodeLoading}
                    editable={!isAutoFilled}
                  />
                </View>
                <View style={{ width: rw(45) }}>
                  <TextInputField
                    placeholder="State"
                    value={stateValue}
                    onChange={setStateValue}
                    maxLength={20}
                    errorMessage={isSubmitted && errors.state}
                    loading={isPinCodeLoading}
                    editable={!isAutoFilled}
                  />
                </View>
              </View>
              <TextInputField
                placeholder="Landmark"
                value={landmark}
                onChange={setLandmark}
                errorMessage={isSubmitted && errors.landmark}
              />
            </View>
          </View>
        </ScrollView>
        <View style={styles.floatingButtonContainer}>
          <CustomButtons 
            onPress={handleSubmit} 
            title="Submit"
            loading={isLoading}
          />
        </View>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={handleModalClose}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Image 
              source={require('../../../assets/SuccessTick.png')} 
              style={{ width: 40, height: 40 }} 
            />
            <Text style={styles.modalTitle}>
              Registration Successful!
            </Text>
            <Text style={styles.modalMessage}>
              You're all set! Start exploring and make the most of your new account.
            </Text>
            <TouchableOpacity 
              style={styles.modalButton} 
              onPress={handleContinueShopping}
            >
              <Text style={styles.modalButtonText}>Continue Shopping</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ContentContaine: {
    flex: 1,
    paddingVertical: rh(1),
    paddingHorizontal: rw(4),
    backgroundColor: '#F3F3F3',
  },
  scrollContainer: {
    paddingBottom: rh(20),
  },
  floatingButtonContainer: {
    width: rw(100),
    padding: rw(2),
    paddingHorizontal: rw(5),
    paddingBottom: rh(2),
    backgroundColor: 'white',
    position: 'absolute',
    bottom: rh(0),
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%', 
    backgroundColor: 'white', 
    borderRadius: 10, 
    padding: 20, 
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: rf(2), 
    fontWeight: 'bold', 
    color: '#272727', 
    marginBottom: 8, 
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: rf(2), 
    color: '#9D9D9D', 
    textAlign: 'center', 
    marginBottom: 16,
  },
  modalButton: {
    width: '90%', 
    backgroundColor: '#FF3131', 
    paddingVertical: 12, 
    borderRadius: 10,
  },
  modalButtonText: {
    color: 'white', 
    fontWeight: 'bold', 
    textAlign: 'center',
  },
});

export default OutletDetailsScreen;

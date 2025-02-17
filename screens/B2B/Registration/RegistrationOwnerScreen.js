import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  Animated,
} from 'react-native';
import Checkbox from 'expo-checkbox';
import Header from '../../../components/header';
import { rw, rh, rf } from '../../../Service/responsive';
import LinearStepIndicator from '../../../components/Stepper/LinearIndicatorStepper';
import TextInputField from '../../../components/Inputs/TextInputField';
import apiClient from '../../../Service/apiClient';
import CustomButtons from '../../../components/Buttons/CustomButtons';

const RegistrationOwnerScreen = ({ navigation, route }) => {
  const { mobile } = route.params;

  // Owner details fields
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [ownerMobile, setOwnerMobile] = useState(''); // will store only 10-digit number
  const [selectedBusinessType, setSelectedBusinessType] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const businessTypes = ['Restaurant', 'Sweet Shop', 'Catering', 'Hotel', 'Kirana Store', 'Others'];

  const [formErrors, setFormErrors] = useState({});
  const shakeAnimation = useRef(new Animated.Value(0)).current;

  const handleOwnerMobileChange = (text) => {
    setOwnerMobile(text);
  };
  

  // Prefill ownerMobile using the mobile number from route params (if available)
  useEffect(() => {
    if (mobile) {
      handleOwnerMobileChange(mobile);
    }
  }, [mobile]);

  // Validate form fields
  const validateForm = () => {
    const errors = {};

    // Validate first name
    if (!fname.trim()) errors.fname = 'First name is required';

    // Validate last name
    if (!lname.trim()) errors.lname = 'Last name is required';

    // Validate email using a basic regex
    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) { 
      errors.email = 'Email is invalid';
    }

    // Validate mobile number (only 10-digit numbers allowed)
    if (!ownerMobile) {
      errors.ownerMobile = 'Mobile number is required';
    } else if (!/^[6-9]\d{9}$/.test(ownerMobile)) {
      errors.ownerMobile = 'Please enter a valid 10-digit mobile number.';
    }
    
    // Validate business type
    if (!selectedBusinessType) {
      errors.businessType = 'Please select a business type';

      // Shake animation trigger for business type
      Animated.sequence([
        Animated.timing(shakeAnimation, { toValue: -10, duration: 100, useNativeDriver: true }),
        Animated.timing(shakeAnimation, { toValue: 10, duration: 100, useNativeDriver: true }),
        Animated.timing(shakeAnimation, { toValue: -5, duration: 100, useNativeDriver: true }),
        Animated.timing(shakeAnimation, { toValue: 5, duration: 100, useNativeDriver: true }),
        Animated.timing(shakeAnimation, { toValue: 0, duration: 100, useNativeDriver: true }),
      ]).start();
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // useEffect to remove fname error when first name is filled
  useEffect(() => {
    if (fname.trim()) {
      setFormErrors(prevErrors => ({ ...prevErrors, fname: '' }));
    }
  }, [fname]);

  // useEffect to remove lname error when last name is filled
  useEffect(() => {
    if (lname.trim()) {
      setFormErrors(prevErrors => ({ ...prevErrors, lname: '' }));
    }
  }, [lname]);

  // useEffect to remove email error when a valid email is filled
  useEffect(() => {
    if (email && /\S+@\S+\.\S+/.test(email)) {
      setFormErrors(prevErrors => ({ ...prevErrors, email: '' }));
    }
  }, [email]);

  // useEffect to remove mobile number error when a valid number is filled
  useEffect(() => {
    if (ownerMobile && /^[6-9]\d{9}$/.test(ownerMobile)) {
      setFormErrors(prevErrors => ({ ...prevErrors, ownerMobile: '' }));
    }
  }, [ownerMobile]);

  const handleBusinessTypeSelection = (type) => {
    setSelectedBusinessType(type);
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
  
    setIsLoading(true);
  
    const ownerDetails = {
      mobile, // from route params
      fname,
      lname,
      email,
      business_type: selectedBusinessType,
      owner_mobile: ownerMobile,
    };
  
    try {
      const response = await apiClient.post('/registerOwner', ownerDetails);
      console.log(response.data);
      if (response.data?.status === 1) {
        navigation.navigate('OutletDetailsScreen', { mobile });
      } else if (response.data?.status === 0) {
        if (response.data.msg === "Email Already Registered") {
          setFormErrors(prevErrors => ({
            ...prevErrors,
            email: response.data.msg,
          }));
        } else {
          Alert.alert('Registration Failed', response.data.msg || 'Please try again.');
        }
      } else {
        Alert.alert('Unexpected Response', 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response) {
        Alert.alert('Server Error', error.response.data?.msg || 'Something went wrong on the server.');
      } else {
        Alert.alert('Network Error', 'Please check your internet connection and try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <View style={styles.container}>
      <Header title="Register" />
      <View style={styles.ContentContaine}>
        <LinearStepIndicator steps={[1, 2]} currentStep={0} />

        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.informationCard}>
            <View>
              <Text style={{ fontWeight: '600', fontSize: rf(2.3) }}>
                Register Your Business on UnderOneRoof
              </Text>
              <Text style={{ marginTop: rh(1), color: '#9D9D9D', fontSize: rf(1.8) }}>
                Get started by providing some{'\n'}basic information about your{'\n'}business.
              </Text>
            </View>
            <View style={{ position: 'absolute', right: 0, bottom: 0 }}>
              <Image
                source={require('../../../assets/Character/Group.png')}
                style={{ width: rw(30), height: rw(35) }}
              />
            </View>
          </View>

          <View style={{ marginTop: rh(2) }}>
            <Text style={{ fontWeight: 'bold', fontSize: rf(2), color: '#272727' }}>
              Enter Owner Details
            </Text>
            <View style={{ paddingVertical: rh(1) }}>
              <TextInputField
                placeholder="First Name"
                value={fname}
                onChange={setFname}
                errorMessage={formErrors.fname}
                maxLength={25}
              />
              <TextInputField
                placeholder="Last Name"
                value={lname}
                onChange={setLname}
                errorMessage={formErrors.lname}
                maxLength={25}
              />
              <TextInputField
                placeholder="Mobile Number"
                keyboardType="phone-pad"
                value={ownerMobile}
                onChange={setOwnerMobile}
                errorMessage={formErrors.ownerMobile}
                maxLength={10}
              />
              <TextInputField
                placeholder="Email"
                value={email}
                onChange={setEmail}
                errorMessage={formErrors.email}
                maxLength={50}
              />
            </View>
          </View>

          <View style={styles.checkboxContainer}>
            <View
              style={{
                borderBottomWidth: 1,
                borderColor: '#DFDFDF',
                marginBottom: rh(2),
                paddingBottom: rh(1),
              }}
            >
              <Animated.Text
                style={[
                  {
                    fontWeight: '400',
                    fontSize: rf(2),
                    color: '#717171',
                  },
                  { transform: [{ translateX: shakeAnimation }] },
                ]}
              >
                Business Type
              </Animated.Text>
            </View>

            <FlatList
              data={businessTypes}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.checkboxItem}
                  onPress={() => handleBusinessTypeSelection(item)}
                >
                  <Checkbox
                    value={selectedBusinessType === item}
                    onValueChange={() => handleBusinessTypeSelection(item)}
                    color={selectedBusinessType === item ? '#FF3131' : undefined}
                    style={{ borderRadius: 5 }}
                  />
                  <Text style={styles.checkboxLabel}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </ScrollView>

        <View style={styles.floatingButtonContainer}>
          <CustomButtons
            onPress={handleSubmit}
            title="Next"
            disabled={isLoading}
            loading={isLoading}
          />
        </View>
      </View>
    </View>
  );
};

export default RegistrationOwnerScreen;

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
  informationCard: {
    height: rh(17),
    paddingTop: rh(1),
    paddingHorizontal: rw(3),
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: rh(1),
  },
  checkboxContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: rw(3),
    marginBottom: rh(15),
  },
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: rh(1.5),
  },
  checkboxLabel: {
    fontSize: rf(2),
    color: '#717171',
    marginLeft: rw(2),
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
});

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
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

  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [ownerMobile, setOwnerMobile] = useState('');
  const [selectedBusinessType, setSelectedBusinessType] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  


  const businessTypes = ['Restaurant', 'Sweet Shop', 'Catering', 'Hotel', 'Kirana Store', 'Others'];

  const handleBusinessTypeSelection = (type) => {
    setSelectedBusinessType(type); // Only one type can be selected
  };
  
  const [formErrors, setFormErrors] = useState({});
  const validateForm = () => {
    const errors = {};
  
    // First name and last name validation
    if (!fname) errors.fname = 'First name is required';
    else if (fname.length < 3) errors.fname = 'First name must be at least 3 characters';
  
    if (!lname) errors.lname = 'Last name is required';
    else if (lname.length < 3) errors.lname = 'Last name must be at least 3 characters';
  
    // Email validation with proper format check
    if (!email) errors.email = 'Email is required';
    else if (email.length < 3) errors.email = 'Email must be at least 3 characters';
    else {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!emailRegex.test(email)) {
        errors.email = 'Please enter a valid email address';
      }
    }
  
    // Mobile number validation (exactly 10 digits)
    if (!ownerMobile) errors.ownerMobile = 'Mobile number is required';
    else if (ownerMobile.length !== 10) errors.ownerMobile = 'Mobile number must be exactly 10 digits';
  
    // Business type validation
    if (!selectedBusinessType) errors.businessType = 'Please select a business type';
  
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = async () => {
    // Form validation
    if (!validateForm()) {
      return;
    }
  
    // Start loading state
    setIsLoading(true);
  
    // Prepare owner details
    const ownerDetails = {
      mobile,
      fname,
      lname,
      email,
      business_type: selectedBusinessType,
      owner_mobile: ownerMobile,
    };
  
    try {
      console.log(ownerDetails);
      // API request to register the owner
      const response = await apiClient.post('/registerOwner', ownerDetails);
  
      // Check if the registration is successful
      if (response.data.status === 1) {
        // Navigate to BusinessDetails screen with response data
        navigation.navigate('OutletDetailsScreen', { mobile: mobile });
      } else {
        // Show error alert if the status is not successful
        Alert.alert('Error', response.data.msg || 'Registration failed. Please try again.');
      }
    } catch (error) {
      // Show error alert in case of API failure
      Alert.alert('Error', 'Something went wrong. Please try again later.');
    } finally {
      // Stop loading state
      setIsLoading(false);
    }
  };
  
  return (
    <View style={styles.container}>
      <Header title="Register" />
      <View style={styles.ContentContaine}>
        <LinearStepIndicator steps={[1, 2, 3]} currentStep={0} />

        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.informationCard}>
            <View>
              <Text style={{ fontWeight: '600', fontSize: rf(2.3) }}>
                Register Your Business on UnderOneRoof
              </Text>
              <Text style={{ marginTop: rh(1), color: '#9D9D9D', fontSize: rf(1.8) }}>
                Get started by providing some {'\n'} basic information about your {'\n'} business.
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
                minLength={0}
              />
              <TextInputField
                placeholder="Last Name"
                value={lname}
                onChange={setLname}
                errorMessage={formErrors.lname}
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
              <Text style={{fontWeight: '400', fontSize: rf(2), color: '#717171' }}>
                Business Type
              </Text>
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
                    color={selectedBusinessType === item ? '#FF3131' : undefined}
                    style={{ borderRadius: 5 }}
                  />
                  <Text style={styles.checkboxLabel}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </ScrollView>

        {/* Floating Button */}
        <View style={{width:rw(100), padding:rw(2), paddingHorizontal:rw(5), paddingBottom:rh(2), backgroundColor:"white", position: 'absolute',bottom: rh(0)}}>
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
        paddingBottom: rh(20), // Prevent content overlap with the button
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
        marginBottom:rh(15)
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
    floatingButton: {
        position: 'absolute',
        bottom: rh(5),
        alignSelf: 'center',
        backgroundColor: '#FF3131',
        paddingVertical: rh(1.7),
        paddingHorizontal: rw(20),
        borderRadius: 10,
    }
});

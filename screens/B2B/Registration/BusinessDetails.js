import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  Image,
  StyleSheet,
} from 'react-native';
import { rw, rh, rf } from '../../../Service/responsive';
import Checkbox from 'expo-checkbox';
import Header from '../../../components/header';
import LinearStepIndicator from '../../../components/Stepper/LinearIndicatorStepper';
import TextInputField from '../../../components/Inputs/TextInputField';
import FileUploadField from '../../../components/Inputs/FileUploadField';
import apiClient from '../../../Service/apiClient';
import CustomButtons from '../../../components/Buttons/CustomButtons';
import AsyncStorage from '@react-native-async-storage/async-storage';


const BusinessDetails = ({ navigation, route }) => {
  const { mobile } = route.params;

  const [isGstRegistered, setIsGstRegistered] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [panNumber, setPanNumber] = useState('');
  const [firmName, setFirmName] = useState('');
  const [gstNumber, setGstNumber] = useState('');
  const [gstDoc, setGstDoc] = useState(null);
  const [panDoc, setPanDoc] = useState(null);
  const [fssai, setFssai] = useState('');
  
  const [formErrors, setFormErrors] = useState({});
  
  const handleFileSelection = (type, file) => {
    const selectedFile = file.assets[0];
    if (type === 'pan') {
      console.log(selectedFile);
      setPanDoc(selectedFile);
    } else if (type === 'gst') {
      setGstDoc(selectedFile);
    }
  };
  
  const validateForm = () => {
    const errors = {};
  
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!panNumber) {
      errors.panNumber = 'PAN Number is required.';
    } else if (!panRegex.test(panNumber)) {
      errors.panNumber = 'Please enter a valid PAN Number (e.g. ABCDE1234F).';
    }
  
    if (!firmName) errors.firmName = 'Firm Name is required.';
  
    if (!gstNumber && !fssai) {
      errors.gstNumber = 'Either GST Number or FSSAI Number is required.';
      errors.fssai = 'Either FSSAI Number or GST Number is required.';
    } else {
      if (gstNumber && fssai) {
        delete errors.gstNumber;
        delete errors.fssai;
      }
    }
  
    if (isGstRegistered) {
      if (!gstNumber) {
        errors.gstNumber = 'GST Number is required if GST registered.';
      }
      if (!gstDoc) {
        errors.gstDoc = 'GST document is required.';  
      }
    }
  
    if (!panDoc) errors.panDoc = 'PAN document is required.';
    if (!gstDoc) errors.gstDoc = 'GST/FSSAI document is required.';  
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  
  
  const handleSubmit = async () => {
    if (!validateForm()) return;
  
    const formData = new FormData();
    formData.append('mobile', mobile);
    formData.append('pan_number', panNumber);
    formData.append('firm_name', firmName);
    formData.append('gst_number', gstNumber);
    formData.append('gst_registered', isGstRegistered ? '1' : '0');
    formData.append('fssai', fssai);
  
    formData.append('pan_doc', {
      uri: panDoc.uri,
      type: panDoc.type || 'application/octet-stream',
      name: panDoc.name || 'pan_doc.jpg',
    });
    formData.append('gst_doc', {
      uri: gstDoc?.uri,
      type: gstDoc?.type || 'application/octet-stream',
      name: gstDoc?.name || 'gst_doc.jpg',
    });
  
    console.log('FormData:', formData);
  
    try {
      setIsLoading(true);
      const response = await apiClient.post('/registerBusiness', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
 
      if (response.data.status == 1) {
        setIsModalVisible(true);
      } else {
        alert('Registration failed. Please try again.');
      }
    } catch (error) {
      if (error.response) {
        console.log('Response Error:', error.response);
      } else if (error.request) {
        console.log('Request Error:', error.request);
      } else {
        console.log('General Error:', error.message);
      }
      alert('Error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handleContinueShopping = async () => {
    handleModalClose();
    await AsyncStorage.setItem('ShoppingMode',  'wholesale');
    navigation.replace('B2BBottomNavigator');
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <Header title="Business details" />
      <View style={{ flex: 1, paddingVertical: 10, paddingHorizontal: 16, backgroundColor: '#F3F3F3' }}>
        <LinearStepIndicator steps={[1, 2]} currentStep={2} />
        <ScrollView style={{ marginBottom: 60 }} showsVerticalScrollIndicator={false}>
          <View style={{ marginTop: 16 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#272727' }}>
              Enter Your Business Details
            </Text>
            <View style={{ paddingVertical: 10 }}>
              <TextInputField
                placeholder="Enter PAN Number"
                value={panNumber}
                onChange={setPanNumber}
                errorMessage={formErrors.panNumber}
                maxLength={10}
              />

              <TextInputField
                placeholder="Firm Name"
                value={firmName}
                onChange={setFirmName}
                errorMessage={formErrors.firmName}
              />

              <TextInputField
                placeholder="Enter GST Number"
                value={gstNumber}
                onChange={setGstNumber}
                errorMessage={formErrors.gstNumber}
              />

              <View style={{ marginTop: 12 }}>
                <View style={{ flexDirection: 'row', gap: 16, marginBottom: 8 }}>
                <Checkbox
                    value={isGstRegistered}
                    onValueChange={setIsGstRegistered}
                    color={isGstRegistered ? '#FF3131' : undefined}
                    style={{ borderRadius: 5 }}
                  />
                  <Text style={{ fontSize: 16, color: '#272727' }}>
                    I am not GST registered?
                  </Text>
                </View>
                {formErrors.isGstRegistered && <Text style={{ color: 'red', fontSize: 14 }}>{formErrors.isGstRegistered}</Text>}

             
                <TextInputField
                  placeholder="Enter FSSAI Number"
                  value={fssai}
                  onChange={setFssai}
                  errorMessage={formErrors.fssai}
                />
               
              </View>

              <View style={{gap:rh(2)}}>
                  <View>
                  <FileUploadField
                    title="Upload PAN Document"
                    onFileSelect={(file) => handleFileSelection('pan', file)}
                  />
                  {formErrors.panDoc && <Text style={{margin:rw(1), color: 'red', fontSize: 14 }}>{formErrors.panDoc}</Text>}
                  </View>
                  <View>
                  <FileUploadField
                    title="Upload GST/FSSAI Document"
                    onFileSelect={(file) => handleFileSelection('gst', file)}
                  />
                  {formErrors.gstDoc && <Text style={{ margin: rw(1), color: 'red', fontSize: 14 }}>{formErrors.gstDoc}</Text>}
                </View>

              </View>
            </View>
          </View>
        </ScrollView>

        {/* Floating Button */}
        <View style={{ width: rw(100), padding: 16, backgroundColor: 'white', position: 'absolute', bottom: 0, justifyContent:"center" }}>
          <CustomButtons
            onPress={handleSubmit}
            title="Submit"
            disabled={isLoading}
            loading={isLoading}
          />
        </View>
      </View>

      {/* Registration Success Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={handleModalClose}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ width: '80%', backgroundColor: 'white', borderRadius: 10, padding: 20, alignItems: 'center' }}>
            <Image source={require('../../../assets/SuccessTick.png')} style={{ width: 40, height: 40 }} />
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#272727', marginBottom: 8, textAlign: 'center' }}>
              Registration Successful!
            </Text>
            <Text style={{ fontSize: 16, color: '#9D9D9D', textAlign: 'center', marginBottom: 16 }}>
              You're all set! Start exploring and make the most of your new account.
            </Text>
            <TouchableOpacity style={{ width: '90%', backgroundColor: '#FF3131', paddingVertical: 12, borderRadius: 10 }} onPress={handleContinueShopping}>
              <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Continue Shopping</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default BusinessDetails;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  ContentContainer: {
    flex: 1,
    paddingVertical: rh(1),
    paddingHorizontal: rw(4),
    backgroundColor: '#F3F3F3',
  },
  scrollContainer: {
    marginBottom: rh(10), // Prevent overlap with footer
  },
  sectionContainer: {
    marginTop: rh(2),
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: rf(2),
    color: '#272727',
  },
  inputGroup: {
    paddingVertical: rh(1),
  },
  checkbox: {
    borderRadius: 5,
  },
  checkboxLabel: {
    fontSize: rf(2),
    color: '#272727',
  },
  errorText: {
    color: 'red',
    fontSize: rf(1.6),
    marginTop: rh(0.5),
  },
  footer: {
    padding: rw(2),
    paddingBottom: rh(2),
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    bottom: 0,
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
    padding: rw(5),
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: rf(2),
    fontWeight: 'bold',
    color: '#272727',
    marginBottom: rh(1),
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: rf(2),
    color: '#9D9D9D',
    textAlign: 'center',
    marginBottom: rh(2),
  },
  modalButton: {
    width: '90%',
    backgroundColor: '#FF3131',
    paddingVertical: rh(1.5),
    borderRadius: 10,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});


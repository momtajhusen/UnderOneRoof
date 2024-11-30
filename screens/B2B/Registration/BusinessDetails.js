import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Image
} from 'react-native';
import Checkbox from 'expo-checkbox';
import Header from '../../../components/header';
import { rw, rh, rf } from '../../../Service/responsive';
import LinearStepIndicator from '../../../components/Stepper/LinearIndicatorStepper';
import TextInputField from '../../../components/Inputs/TextInputField';
import FileUploadField from '../../../components/Inputs/FileUploadField';

const BusinessDetails = () => {
  const [isGstRegistered, setIsGstRegistered] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleFileSelection = (file) => {
    console.log('Selected file: ', file);
  };

  const handleSubmit = () => {
    // Show the modal on submit
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    // Add navigation logic if needed
    console.log('Continue Shopping');
  };

  return (
    <View style={styles.container}>
      <Header title="Business details" />
      <View style={styles.ContentContainer}>
        <LinearStepIndicator steps={[1, 2, 3]} currentStep={2} />

        <ScrollView
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Enter Your Business Details</Text>
            <View style={styles.inputGroup}>
              <TextInputField placeholder="Enter PAN Number" />
              <TextInputField placeholder="Firm Name" />
              <TextInputField placeholder="Enter GST Number" />
              <View style={{ marginTop: rh(1.5) }}>
                <View
                  style={{
                    flexDirection: 'row',
                    gap: rw(2),
                    marginBottom: rh(1),
                  }}
                >
                  <Checkbox
                    value={isGstRegistered}
                    onValueChange={setIsGstRegistered}
                    color={isGstRegistered ? '#FF3131' : undefined}
                    style={styles.checkbox}
                  />
                  <Text style={styles.checkboxLabel}>
                    I am not GST registered?
                  </Text>
                </View>
                <TextInputField placeholder="Enter GST Number" />
              </View>

              <View>
                <FileUploadField
                  title="Upload PAN Document"
                  onFileSelect={handleFileSelection}
                />
                <FileUploadField
                  title="Upload GST/FSSAI Document"
                  onFileSelect={handleFileSelection}
                />
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Fixed Footer with Button */}
        <View style={[styles.footer, { width: rw(100) }]}>
          <TouchableOpacity style={styles.nextButton} onPress={handleSubmit}>
            <Text style={styles.nextButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Registration Success Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={handleModalClose}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {/* <View style={styles.modalIcon}>
              <Text style={styles.iconText}>✓</Text>
            </View> */}
            <Image source={require('../../../assets/SuccessTick.png')} style={{width:rw(10), height:rw(10)}} />
            <Text style={styles.modalTitle}>Registration Successful!</Text>
            <Text style={styles.modalMessage}>
              You're all set! Start exploring and make the most of your new
              account.
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleModalClose}
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
  footer: {
    padding: rw(2),
    paddingBottom: rh(2),
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    bottom: 0,
  },
  nextButton: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: 'red',
    paddingVertical: rh(1.7),
    borderRadius: 10,
  },
  nextButtonText: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
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
  modalIcon: {
    width: rw(10),
    height: rw(10),
    backgroundColor: '#4CAF50',
    borderRadius: rw(7.5),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: rh(2),
  },
  iconText: {
    color: 'white',
    fontSize: rf(3),
    fontWeight: 'bold',
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

export default BusinessDetails;

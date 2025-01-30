// import libraries
import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ImageBackground, Image, Alert } from 'react-native';
import { rw, rh, rf } from '../../Service/responsive';
import apiClient from '../../Service/apiClient';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppContext } from '../../context/AppContext';

// create a component
const DeleteAccountAlert = ({ isModalVisible, toggleModal }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const navigation = useNavigation();

  const { dispatch } = useContext(AppContext);
  
  // Function to handle account deletion
  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      const response = await apiClient.get('/deleteAccount');
      if (response?.data?.status === 1) {

        // Reset all application state
        dispatch({ type: 'RESET_STATE' });

        // Remove all keys from AsyncStorage
        await AsyncStorage.clear();

        Alert.alert(
          'Account Deleted',
          'Your account has been successfully deleted. We’re sad to see you go! If you change your mind, you’re always welcome to join us again.',
          [
            {
              text: 'OK',
              onPress: () => {
                toggleModal();
                navigation.replace('SignupOrLogin');
              },
            },
          ]
        );
      } else {
        Alert.alert('Error', 'Failed to delete the account. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting account:', error);
      Alert.alert('Error', 'Something went wrong. Please try again later.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={isModalVisible}
      onRequestClose={toggleModal}
    >
      <View style={styles.modalContainer}>
        <ImageBackground
          source={require('../../assets/RectangleDeleteAccount.png')}
          style={styles.modalContent}
          imageStyle={styles.frameImage}
        >
          {/* Icon at the top */}
          <View style={styles.iconContainer}>
            <Image source={require('../../assets/InfoIcon.png')} style={styles.icon} />
          </View>

          {/* Confirmation Text */}
          <Text style={styles.text}>Are you sure?</Text>
          <Text style={{ fontSize: rf(2), textAlign: 'center', color: '#717171' }}>
            You want to delete your account permanently.
          </Text>
          <Text
            style={{
              fontSize: rf(2),
              width: rw(75),
              textAlign: 'center',
              color: '#717171',
              marginTop: rh(2),
              fontStyle: 'italic',
            }}
          >
            All your data, including account information and preferences, will be permanently removed.
          </Text>

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.cancelButton, isDeleting && { opacity: 0.7 }]}
              onPress={handleDeleteAccount}
              disabled={isDeleting}
            >
              <Text style={styles.cancelButtonText}>
                {isDeleting ? 'Deleting...' : 'Delete Account'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.logoutButton} onPress={toggleModal}>
              <Text style={styles.logoutButtonText}>Keep Account</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    </Modal>
  );
  
};

// define your styles
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',  
  },
  modalContent: {
    width: rw(90), 
    height: rh(40), 
    alignItems: 'center',
    padding: rw(5), 
    overflow:"hidden"
  },
  frameImage: {
    resizeMode: 'stretch', 
    borderRadius: rw(3), 
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: rh(-1.5), 
    zIndex: 1,
  },
  icon: {
    marginRight:rw(0.5),
    width: rw(16), 
    height: rw(16),
  },
  text: {
    fontSize: rf(2.5),  
    color: '#333333',
    textAlign: 'center',
    marginVertical: rh(1),  
    fontWeight:"bold",
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    position: 'absolute',
    bottom: rh(2), 
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#e0e0e0',
    paddingVertical: rh(1.5),  
    borderRadius: rw(2),  
    marginRight: rw(2.5),
    alignItems: 'center',
  },
  logoutButton: {
    flex: 1,
    backgroundColor: '#ff4d4d',
    paddingVertical: rh(1.5),
    borderRadius: rw(2),
    marginLeft: rw(2.5),
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#333',
    fontSize: rf(1.8), 
    fontWeight:"bold",
  },
  logoutButtonText: {
    color: '#ffffff',
    fontSize: rf(1.8),
    fontWeight:"bold"
  },
});

export default DeleteAccountAlert;
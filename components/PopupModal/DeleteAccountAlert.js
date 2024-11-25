// import libraries
import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { rw, rh, rf } from '../../Service/responsive';

// create a component
const DeleteAccountAlert = ({ isModalVisible, toggleModal }) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={isModalVisible}
      onRequestClose={toggleModal}  // This is for Android back button
    >
      <View style={styles.modalContainer}>
        <ImageBackground 
          source={require('../../assets/RectangleDeleteAccount.png')} // Update with your image path
          style={styles.modalContent}
          imageStyle={styles.frameImage} // Styles to control the frame image shape
        >
          {/* Icon at the top */}
          <View style={styles.iconContainer}>
            <Image source={require('../../assets/InfoIcon.png')} style={styles.icon} />
          </View>

          {/* Confirmation Text */}
          <Text style={styles.text}>Are you sure?</Text>
          <Text style={{fontSize:rf(2), textAlign:"center", color:"#717171"}}>You want to delete your account permanently.</Text>

          <Text style={{fontSize:rf(2), textAlign:"center", color:"#717171", marginTop:rh(2)}}>All your data, including account information and preferences, will be permanently removed.</Text>



          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={toggleModal}>
              <Text style={styles.cancelButtonText}>Delete Account</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.logoutButton} onPress={() => {/* Add logout functionality here */}}>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Background overlay
  },
  modalContent: {
    width: rw(90), // Responsive width (e.g., 80% of screen width)
    height: rh(40), // Responsive height (e.g., 30% of screen height)
    alignItems: 'center',
    padding: rw(5), // Padding based on screen width
    overflow:"hidden"
  },
  frameImage: {
    resizeMode: 'stretch', // Stretches the frame to fit the modal content
    borderRadius: rw(3), // Border radius based on screen width
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: rh(-1.5), // Positioned above the text
    zIndex: 1,
  },
  icon: {
    marginRight:rw(0.5),
    width: rw(16), // Icon size based on screen width
    height: rw(16),
  },
  text: {
    fontSize: rf(2.5), // Responsive font size
    color: '#333333',
    textAlign: 'center',
    marginVertical: rh(1), // Vertical margin based on screen height
    fontWeight:"bold",
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    position: 'absolute',
    bottom: rh(2), // Positioned at the bottom of the frame
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#e0e0e0',
    paddingVertical: rh(1.5), // Padding based on screen height
    borderRadius: rw(2), // Border radius based on screen width
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
    fontSize: rf(2), // Responsive font size
    fontWeight:"bold",
  },
  logoutButtonText: {
    color: '#ffffff',
    fontSize: rf(2),
    fontWeight:"bold"
  },
});

export default DeleteAccountAlert;
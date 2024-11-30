// import libraries
import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { rw, rh, rf } from '../../Service/responsive';

// create a component
const LogOutAlert = ({ isModalVisible, toggleModal }) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={isModalVisible}
      onRequestClose={toggleModal}  // This is for Android back button
    >
      <View style={styles.modalContainer}>
        <ImageBackground 
          source={require('../../assets/Rectangle31.png')} // Update with your image path
          style={styles.modalContent}
          imageStyle={styles.frameImage} // Styles to control the frame image shape
        >
          {/* Icon at the top */}
          <View style={styles.iconContainer}>
            <Image source={require('../../assets/logout.png')} style={styles.icon} />
          </View>

          {/* Confirmation Text */}
          <Text style={styles.text}>Are you sure you want to {'\n'} log out?</Text>

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={toggleModal}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.logoutButton} onPress={() => {/* Add logout functionality here */}}>
              <Text style={styles.logoutButtonText}>Log Out</Text>
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
    height: rh(25), // Responsive height (e.g., 30% of screen height)
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
    marginTop: -rh(2.5), // Positioned above the text
    zIndex: 1,
  },
  icon: {
    width: rw(18), // Icon size based on screen width
    height: rw(18),
  },
  text: {
    fontSize: rf(2), // Responsive font size
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
    fontSize: rf(1.8), // Responsive font size
    fontWeight:"bold",
  },
  logoutButtonText: {
    color: '#ffffff',
    fontSize: rf(1.8),
    fontWeight:"bold"
  },
});

export default LogOutAlert;

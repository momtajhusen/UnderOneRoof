// Import required libraries
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import ImageView from 'react-native-image-viewing';
import { useNavigation } from '@react-navigation/native'; // Import for navigation

const ProductImageView = ({ route }) => {
  const { images, selectedIndex } = route.params; // Receive images and initial index via props
  const [visible, setVisible] = useState(true); // Modal initially visible
  const [currentIndex, setCurrentIndex] = useState(selectedIndex || 0);

  // React Navigation hook to navigate when modal is closed
  const navigation = useNavigation();

  // Map images to ensure the correct format for ImageView
  const formattedImages = images.map((image) => ({
    uri: image.img, // Use img as the source for uri
  }));

  // Close modal and navigate to a specific screen (e.g., 'Home')
  const handleCloseModal = () => {
    setVisible(false); // Hide the modal
    navigation.goBack(); // Navigate back to the previous screen
  };

  return (
    <View style={styles.container}>
      {/* ImageView Modal */}
      <ImageView
        images={formattedImages} // Pass formatted images
        imageIndex={currentIndex} // Pass the current image index
        visible={visible}
        onRequestClose={handleCloseModal} // Close modal and navigate back
        onImageIndexChange={(index) => setCurrentIndex(index)} // Update current index on image change
        swipeToCloseEnabled={true} // Enable swipe to close (optional)
        FooterComponent={({ imageIndex }) => (
          <View style={styles.pagination}>
            {formattedImages.map((_, index) => (
              <View
                key={index}
                style={[ 
                  styles.paginationDot,
                  index === imageIndex && styles.paginationDotActive,
                ]}
              />
            ))}
          </View>
        )}
        backgroundColor="#000"
      />
    </View>
  );
};

// Define styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'gray',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: 'white',
  },
});

export default ProductImageView;

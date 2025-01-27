import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import Collapsible from "react-native-collapsible";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import * as ImagePicker from "expo-image-picker";
import { rh, rw, rf } from "../../Service/responsive";
import apiClient from "../../Service/apiClient";

const CollapsibleReviewCard = ({ p_id, review, review_image, rating, imageUri, title }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [currentReview, setCurrentReview] = useState(review || ""); // Default review
  const [currentRating, setCurrentRating] = useState(rating || 0); // Default rating
  const [selectedImages, setSelectedImages] = useState([]); // Store selected images

  // Initialize `selectedImages` with `review_image`
  useEffect(() => {
    if (review_image && Array.isArray(review_image)) {
      const initialImages = review_image.map((uri) => ({ uri }));
      setSelectedImages(initialImages);
    }
  }, [review_image]);

  const handleStarPress = (index) => {
    setCurrentRating(index + 1); // Update the rating when a star is clicked
  };

  const handleSelectImages = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true, // Enable multiple image selection
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      setSelectedImages([...selectedImages, ...result.assets]);
    }
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1); // Remove the image at the given index
    setSelectedImages(updatedImages);
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("pid", p_id);
      formData.append("rating", currentRating);
      formData.append("review", currentReview);

      selectedImages.forEach((image, index) => {
        if (!review_image?.includes(image.uri)) {
          formData.append("image[]", {
            uri: image.uri,
            type: "image/jpeg",
            name: `image${index + 1}.jpg`,
          });
        }
      });

      const response = await apiClient.post("/addReview", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response.data);
      if (response.data.status === 1) {
        Alert.alert("Success", response.data.title);
        setCurrentReview("");
        setCurrentRating(0);
        setSelectedImages([]);
      } else {
        Alert.alert("Error", response.data.message || "Failed to submit review.");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      Alert.alert("Error", "An error occurred while submitting the review.");
    }
  };

  return (
    <View style={styles.cardContainer}>
      {/* Header */}
      <TouchableOpacity
        style={styles.headerContainer}
        onPress={() => setIsCollapsed(!isCollapsed)}
      >
        <View style={{ flexDirection: "row" }}>
          <Image source={{ uri: imageUri }} style={styles.productImage} />
          <View style={{ marginLeft: rw(2), gap: rh(0.5) }}>
            <Text style={styles.title}>{title}</Text>
            {/* Stars */}
            <View style={styles.starsContainer}>
              {[...Array(5)].map((_, index) => (
                <TouchableOpacity key={index} onPress={() => handleStarPress(index)}>
                  <MaterialIcons
                    name="star"
                    color={index < currentRating ? "#FF3131" : "#DFDFDF"}
                    size={rf(3)}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        <MaterialIcons
          name={isCollapsed ? "expand-more" : "expand-less"}
          size={24}
          color="#888"
        />
      </TouchableOpacity>

      {/* Collapsible Content */}
      <Collapsible collapsed={isCollapsed}>
        <View style={styles.contentContainer}>
          <View style={styles.inputContainer}>
            {/* Text Input */}
            <TextInput
              placeholder="Tell Us What You Think"
              style={styles.textInput}
              multiline
              value={currentReview}
              onChangeText={(text) => setCurrentReview(text)}
            />

            {/* Add Image Button */}
            <View style={{ flexDirection: "row", gap: rw(2), alignItems: "center" }}>
              <TouchableOpacity style={styles.addImageButton} onPress={handleSelectImages}>
                <MaterialIcons name="camera-alt" size={rf(2.5)} color="#FF7A7A" />
                <Text style={styles.addImageText}>Add Images</Text>
              </TouchableOpacity>
            </View>

            {/* Selected Images */}
            <ScrollView
              horizontal
              style={styles.selectedImagesContainer}
              showsHorizontalScrollIndicator={false}
            >
              {selectedImages.map((image, index) => (
                <View key={index} style={styles.imageWrapper}>
                  <Image source={{ uri: image.uri }} style={styles.selectedImage} />
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => handleRemoveImage(index)}
                  >
                    <MaterialIcons name="cancel" size={20} color="#FF7A7A" />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>

          {/* Submit Button */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit Review</Text>
          </TouchableOpacity>
        </View>
      </Collapsible>
    </View>
  );
};

export default CollapsibleReviewCard;


const styles = StyleSheet.create({
  cardContainer: {
    borderWidth: 1,
    borderColor: "#EEE",
    borderRadius: 10,
    backgroundColor: "#FFF",
    paddingVertical: rh(1),
    paddingHorizontal: rw(2),
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  productImage: {
    width: rw(15),
    height: rw(15),
    borderRadius: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  contentContainer: {
    marginTop: 10,
  },
  starsContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 5,
    padding: rw(2),
  },
  textInput: {
    height: rh(15),
    textAlignVertical: "top",
  },
  addImageButton: {
    flexDirection: "row",
    width: rw(35),
    alignItems: "center",
    backgroundColor: "#FFF5F5",
    borderColor: "#FF7A7A",
    borderRadius: 5,
    padding: 10,
    height: rh(5),
  },
  addImageText: {
    color: "#FF7A7A",
    marginLeft: 5,
    fontSize: rf(2),
  },
  selectedImagesContainer: {
    marginTop: 10,
    flexDirection: "row",
  },
  imageWrapper: {
    position: "relative",
    marginRight: 10,
  },
  selectedImage: {
    width: rw(15),
    height: rw(15),
    borderRadius: 8,
  },
  cancelButton: {
    position: "absolute",
    top: -3,
    right: -4,
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 2,
    elevation: 2,
  },
  submitButton: {
    backgroundColor: "#FF7A7A",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop:rh(0.5),
  },
  submitButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
});
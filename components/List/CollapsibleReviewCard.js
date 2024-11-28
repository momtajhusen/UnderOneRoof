import React, { useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import Collapsible from "react-native-collapsible";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { rh, rw, rf } from "../../Service/responsive";

const CollapsibleReviewCard = ({ imageUri, title, onSubmit }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <View style={styles.cardContainer}>
      {/* Header */}
      <TouchableOpacity
        style={styles.headerContainer}
        onPress={() => setIsCollapsed(!isCollapsed)}
      >
        <View style={{flexDirection:"row"}}>
            <Image source={{ uri: imageUri }} style={styles.productImage} />
            <View style={{marginLeft:rw(2), gap:rh(0.5)}}>
                <Text style={styles.title}>{title}</Text>
                {/* Stars */}
                <View style={styles.starsContainer}>
                    {[...Array(5)].map((_, index) => (
                        <MaterialIcons
                        key={index}
                        name="star"
                        color="#DFDFDF"
                        size={rf(3)}
                        />
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
                autoFocus={true}
            />

          {/* Add Image Button */}
          <TouchableOpacity style={styles.addImageButton}>
            <MaterialIcons name="camera-alt" size={rf(2.5)} color="#FF7A7A" />
            <Text style={styles.addImageText}>Add Image</Text>
          </TouchableOpacity>
        </View>

        </View>
      </Collapsible>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderWidth: 1,
    borderColor: "#EEE",
    borderRadius: 10,
    backgroundColor: "#FFF",
    paddingVertical:rh(1),
    paddingHorizontal:rw(2)
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent:"space-between",
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
  inputContainer:{
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 5,
    padding:rw(2)
  },
  textInput: {
    height:rh(15),
    textAlignVertical: "top",
  },
  addImageButton: {
    flexDirection: "row",
    width:rw(35),
    alignItems: "center",
    backgroundColor: "#FFF5F5",
    borderColor: "#FF7A7A",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  addImageText: {
    color: "#FF7A7A",
    marginLeft: 5,
    fontSize: rf(2),
  },
  submitButton: {
    backgroundColor: "#FF7A7A",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  submitText: {
    color: "#FFF",
    fontWeight: "bold",
  },
});

export default CollapsibleReviewCard;

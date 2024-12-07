// Import libraries
import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import Header from "../../../components/header";
import { rw, rh, rf } from "../../../Service/responsive";
import TextInputField from "../../../components/Inputs/TextInputField";

// Create a component
const B2BEditAddress = () => {
  const saveOptions = [
    { id: 1, label: "Home", isActive: true },
    { id: 2, label: "Work", isActive: false },
    { id: 3, label: "Office", isActive: false },
    { id: 4, label: "Hotel", isActive: false },
    { id: 5, label: "Other", isActive: false },
  ];

  const renderSaveOption = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.saveOptionContainer,
        { backgroundColor: item.isActive ? "#272727" : "#FFFFFF" },
      ]}
    >
      <Text
        style={[
          styles.saveOptionText,
          { color: item.isActive ? "white" : "black" },
        ]}
      >
        {item.label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header title="Edit Address" />
      <View style={styles.contentContainer}>
        <TextInputField placeholder="First Name" />
        <TextInputField placeholder="Last Name" />
        <TextInputField placeholder="Mobile Number" />
        <TextInputField placeholder="Alternative Number" />
        <View style={styles.rowContainer}>
          <View style={styles.halfInput}>
            <TextInputField placeholder="City" />
          </View>
          <View style={styles.halfInput}>
            <TextInputField placeholder="State" />
          </View>
        </View>
        <TextInputField placeholder="Pin Code" />
        <TextInputField placeholder="House no. and building" />
        <TextInputField placeholder="Landmark" />

        {/* Save As Section */}
        <View style={styles.saveAsContainer}>
          <Text style={styles.saveAsTitle}>Save as</Text>
          <FlatList
            data={saveOptions}
            renderItem={renderSaveOption}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            contentContainerStyle={styles.saveOptionsList}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
    </View>
  );
};

// Define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingVertical: rh(1),
    paddingHorizontal: rw(5),
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfInput: {
    width: "49%",
    gap: 5,
  },
  saveAsContainer: {
    backgroundColor: "#FFF4E6",
    padding: rw(2),
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "white",
    marginTop:rh(2)
  },
  saveAsTitle: {
    fontWeight: "bold",
    fontSize: rf(2),
  },
  saveOptionsList: {
    paddingTop: rh(1),
    gap: rw(2),
  },
  saveOptionContainer: {
    paddingVertical: rw(2),
    paddingHorizontal: rw(3),
    borderRadius: 10,
  },
  saveOptionText: {
    textAlign: "center",
  },
});

// Make this component available to the app
export default B2BEditAddress;

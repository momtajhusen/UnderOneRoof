// Import libraries
import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, ScrollView } from "react-native";
import Header from "../../../../components/header";
import { rw, rh, rf } from "../../../../Service/responsive";
import TextInputField from "../../../../components/Inputs/TextInputField";
import SaveButton from "../../../../components/Buttons/CustomButtons";
import apiClient from "../../../../Service/apiClient"; 

// Create a component
const AddAddress = ({ navigation }) => {
// Add the new field in the initial state
const [formData, setFormData] = useState({
  fname: "",
  lname: "",
  mobile_prefix: "+91",
  mobile: "",
  alternative_number: "",
  email: "",
  address_line1: "",
  address_line2: "",
  country: "India",
  state: "",
  city: "",
  pincode: "",
  address_type: "Home",
  landmark:"",
});

  const [errors, setErrors] = useState({});

  const [saveOptions, setSaveOptions] = useState([
    { id: 1, label: "Home", isActive: true },
    { id: 2, label: "Work", isActive: false },
    { id: 3, label: "Office", isActive: false },
    { id: 4, label: "Hotel", isActive: false },
    { id: 5, label: "Other", isActive: false },
  ]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" })); // Clear error on input change
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};
  
    console.log(formData); // Add this line to debug formData
  
    if (!formData.fname.trim()) {
      isValid = false;
      newErrors.fname = "First name is required.";
    }
    if (!formData.lname.trim()) {
      isValid = false;
      newErrors.lname = "Last name is required.";
    }
    if (!formData.mobile.trim() || formData.mobile.trim().length !== 10 || isNaN(formData.mobile.trim())) {
      isValid = false;
      newErrors.mobile = "Valid 10-digit mobile number is required.";
    }
    
    if (
      formData.alternative_number.trim() &&
      (formData.alternative_number.trim().length !== 10 || isNaN(formData.alternative_number.trim()))
    ) {
      isValid = false;
      newErrors.alternative_number = "Alternative mobile number must be 10 digits.";
    }    
    if (!formData.email.trim() || !/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/i.test(formData.email)) {
      isValid = false;
      newErrors.email = "Valid email address is required.";
    }
    if (!formData.address_line1.trim()) {
      isValid = false;
      newErrors.address_line1 = "Address Line 1 is required.";
    }
    if (!formData.city.trim()) {
      isValid = false;
      newErrors.city = "City is required.";
    }
    if (!formData.state.trim()) {
      isValid = false;
      newErrors.state = "State is required.";
    }
    if (!formData.pincode.trim() || formData.pincode.length !== 6) {
      isValid = false;
      newErrors.pincode = "Valid 6-digit PIN code is required.";
    }
  
    setErrors(newErrors);
    return isValid;
  };
  

  const handleSaveOptionClick = (selectedOption) => {
    setSaveOptions((prev) =>
      prev.map((option) => ({
        ...option,
        isActive: option.id === selectedOption.id,
      }))
    );
    handleInputChange("address_type", selectedOption.label);
  };

  const handleSaveAddress = async () => {
    if (!validateForm()) return;

    try {
      const response = await apiClient.post("/addAddress", formData);
      if (response.status === 200) {
        Alert.alert("Success", "Address saved successfully!");
        navigation.navigate('AddressBook');
      } else {
        Alert.alert("Error", "Failed to save address.");
      }
    } catch (error) {
      Alert.alert("Error", error.message || "An error occurred while saving.");
    }
  };

  const renderSaveOption = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleSaveOptionClick(item)}
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
      <Header title="Add Address" />
      <ScrollView>
      <View style={styles.contentContainer}>
        <TextInputField
          placeholder="First Name"
          value={formData.fname}
          onChange={(text) => handleInputChange("fname", text)}
          errorMessage={errors.fname}
        />
        <TextInputField
          placeholder="Last Name"
          value={formData.lname}
          onChange={(text) => handleInputChange("lname", text)}
          errorMessage={errors.lname}
        />
        <TextInputField
          placeholder="Mobile Number"
          keyboardType="numeric"
          maxLength={10}
          value={formData.mobile}
          onChange={(text) => handleInputChange("mobile", text)}
          errorMessage={errors.mobile}
        />
        <TextInputField
          placeholder="Alternative Mobile Number"
          keyboardType="numeric"
          maxLength={10}
          value={formData.alternative_number}
          onChange={(text) => handleInputChange("alternative_number", text)}
          errorMessage={errors.alternative_number}
        />
        <TextInputField
          placeholder="Email"
          keyboardType="email-address"
          value={formData.email}
          onChange={(text) => handleInputChange("email", text)}
          errorMessage={errors.email}
        />
        <View style={styles.rowContainer}>
          <View style={styles.halfInput}>
            <TextInputField
              placeholder="City"
              value={formData.city}
              onChange={(text) => handleInputChange("city", text)}
              errorMessage={errors.city}
            />
          </View>
          <View style={styles.halfInput}>
            <TextInputField
              placeholder="State"
              value={formData.state}
              onChange={(text) => handleInputChange("state", text)}
              errorMessage={errors.state}
            />
          </View>
        </View>
        <TextInputField
          placeholder="Pin Code"
          keyboardType="numeric"
          maxLength={6}
          value={formData.pincode}
          onChange={(text) => handleInputChange("pincode", text)}
          errorMessage={errors.pincode}
        />
        <TextInputField
          placeholder="House no. and building"
          value={formData.address_line1}
          onChange={(text) => handleInputChange("address_line1", text)}
          errorMessage={errors.address_line1}
        />
        <TextInputField
          placeholder="Landmark"
          value={formData.landmark}
          onChange={(text) => handleInputChange("landmark", text)}
        />

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

        <SaveButton
          title="Save"
          onPress={handleSaveAddress}
          btnStyle={{ marginTop: rh(3) }}
        />
      </View>
      </ScrollView>
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
    marginTop: rh(2),
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
export default AddAddress;

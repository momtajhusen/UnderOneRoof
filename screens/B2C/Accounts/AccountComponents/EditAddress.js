import React, { useState, useEffect, useContext } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  Alert, 
  ScrollView 
} from "react-native";
import Header from "../../../../components/header";
import { rw, rh, rf } from "../../../../Service/responsive";
import TextInputField from "../../../../components/Inputs/TextInputField";
import SaveButton from "../../../../components/Buttons/CustomButtons";
import apiClient from "../../../../Service/apiClient"; 
import { AppContext } from "../../../../context/AppContext";

const EditAddress = ({ navigation, route }) => {
  const item = route.params?.item || null;
  const { dispatch } = useContext(AppContext);

  const [formData, setFormData] = useState({
    aid: null,
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
    landmark: "",
  });

  const [errors, setErrors] = useState({});
  const [isPinCodeLoading, setIsPinCodeLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // New state: PIN code validity
  const [isPinCodeValid, setIsPinCodeValid] = useState(false);

  const [saveOptions, setSaveOptions] = useState([
    { id: 1, label: "Home", isActive: true },
    { id: 2, label: "Work", isActive: false },
    { id: 3, label: "Office", isActive: false },
    { id: 4, label: "Hotel", isActive: false },
    { id: 5, label: "Other", isActive: false },
  ]);

  // Pre-fill form data from item when component mounts
  useEffect(() => {
    if (item) {
      setFormData({
        aid: item.aid,
        fname: item.fname || "",
        lname: item.lname || "",
        mobile_prefix: item.mobile_prefix || "+91",
        mobile: item.mobile || "",
        alternative_number: item.alternative_number || "",
        email: item.email || "",
        address_line1: item.address_line1 || "",
        address_line2: item.address_line2 || "",
        country: item.country || "India",
        state: item.state || "",
        city: item.city || "",
        pincode: item.pincode || "",
        address_type: item.address_type || "Home",
        landmark: item.landmark || "",
      });

      // Update save options based on item.address_type
      setSaveOptions((prev) =>
        prev.map((option) => ({
          ...option,
          isActive: option.label === item.address_type,
        }))
      );
    }
  }, [item]);

  // Handler to update formData and clear error for that field
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  // Fetch postal details using PIN code to auto-fill city and state,
  // and update isPinCodeValid accordingly.
  const fetchPincodeData = async (pin) => {
    try {
      setIsPinCodeLoading(true);
      const response = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
      const json = await response.json();
      if (
        json &&
        json[0]?.Status === "Success" &&
        Array.isArray(json[0].PostOffice) &&
        json[0].PostOffice.length > 0
      ) {
        const postOffice = json[0].PostOffice[0];
        // Auto-fill city and state.
        handleInputChange("city", postOffice.District || "");
        handleInputChange("state", postOffice.State || "");
        setIsPinCodeValid(true);
        // Remove errors for PIN, city and state.
        setErrors((prev) => ({ ...prev, pincode: "", city: "", state: "" }));
      } else {
        // Clear auto-filled fields and mark PIN as invalid.
        handleInputChange("city", "");
        handleInputChange("state", "");
        setIsPinCodeValid(false);
        setErrors(prev => ({ ...prev, pincode: "Invalid pin code" }));
      }
    } catch (error) {
      console.error("Error fetching pincode data:", error);
      handleInputChange("city", "");
      handleInputChange("state", "");
      setIsPinCodeValid(false);
      setErrors(prev => ({ ...prev, pincode: "Invalid pin code" }));
    } finally {
      setIsPinCodeLoading(false);
    }
  };

  // When PIN code reaches 6 digits, call API.
  useEffect(() => {
    if (formData.pincode.trim().length === 6) {
      fetchPincodeData(formData.pincode.trim());
    } else {
      // Clear auto-filled fields and reset PIN validity.
      handleInputChange("city", "");
      handleInputChange("state", "");
      setIsPinCodeValid(false);
      setErrors((prev) => ({ ...prev, pincode: "" }));
    }
  }, [formData.pincode]);

  // useEffect: Remove mobile error when valid 10-digit number is entered.
  useEffect(() => {
    if (
      formData.mobile.trim().length === 10 &&
      !isNaN(formData.mobile.trim())
    ) {
      setErrors((prev) => ({ ...prev, mobile: "" }));
    }
  }, [formData.mobile]);

  // useEffect: Remove email error when a valid email is entered.
  useEffect(() => {
    if (
      formData.email.trim() &&
      /^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/i.test(formData.email)
    ) {
      setErrors((prev) => ({ ...prev, email: "" }));
    }
  }, [formData.email]);

  // Determine if city and state are auto-filled.
  const isAutoFilled =
    formData.pincode.trim().length === 6 &&
    isPinCodeValid &&
    formData.city.trim() !== "" &&
    formData.state.trim() !== "";

  // Validate form fields.
  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.fname.trim()) {
      isValid = false;
      newErrors.fname = "First name is required.";
    }
    if (!formData.lname.trim()) {
      isValid = false;
      newErrors.lname = "Last name is required.";
    }
    if (
      !formData.mobile.trim() ||
      formData.mobile.trim().length !== 10 ||
      isNaN(formData.mobile.trim())
    ) {
      isValid = false;
      newErrors.mobile = "Valid 10-digit mobile number is required.";
    }
    if (
      formData.alternative_number.trim() &&
      (formData.alternative_number.trim().length !== 10 ||
        isNaN(formData.alternative_number.trim()))
    ) {
      isValid = false;
      newErrors.alternative_number =
        "Alternative mobile number must be 10 digits.";
    }
    if (
      !formData.email.trim() ||
      !/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/i.test(formData.email)
    ) {
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
    if (
      !formData.pincode.trim() ||
      formData.pincode.trim().length !== 6 ||
      isNaN(formData.pincode.trim())
    ) {
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
    // Prevent update if PIN code is 6 digits but not valid.
    if (formData.pincode.trim().length === 6 && !isPinCodeValid) {
      setErrors(prev => ({ ...prev, pincode: "Invalid pin code" }));
      return;
    }
    setIsLoading(true);
    try {
      const response = await apiClient.post("/updateAddress", formData);
      if (response.status === 200) {
        Alert.alert("Success", "Address updated successfully!");
        navigation.navigate("AddressBook");
        dispatch({
          type: "GLOBAL_REFRESH",
          payload: { reFresh: Math.ceil(Math.random() * 100) },
        });
      } else {
        Alert.alert("Error", "Failed to save address.");
      }
    } catch (error) {
      Alert.alert("Error", error.message || "An error occurred while saving.");
    } finally {
      setIsLoading(false);
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
      <Header title="Edit Address" />
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
            keyboardType="phone-pad"
            maxLength={10}
            value={formData.mobile}
            onChange={(text) => handleInputChange("mobile", text)}
            errorMessage={errors.mobile}
          />
          <TextInputField
            placeholder="Alternative Mobile Number"
            keyboardType="phone-pad"
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
          <TextInputField
            placeholder="Pin Code"
            keyboardType="numeric"
            maxLength={6}
            value={formData.pincode}
            onChange={(text) => handleInputChange("pincode", text)}
            errorMessage={errors.pincode}
            loading={isPinCodeLoading}
          />
          <View style={styles.rowContainer}>
            <View style={styles.halfInput}>
              <TextInputField
                placeholder="City"
                value={formData.city}
                onChange={(text) => handleInputChange("city", text)}
                errorMessage={errors.city}
                loading={isPinCodeLoading}
                editable={!isAutoFilled}
              />
            </View>
            <View style={styles.halfInput}>
              <TextInputField
                placeholder="State"
                value={formData.state}
                onChange={(text) => handleInputChange("state", text)}
                errorMessage={errors.state}
                loading={isPinCodeLoading}
                editable={!isAutoFilled}
              />
            </View>
          </View>
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
            title="Update"
            onPress={handleSaveAddress}
            btnStyle={{ marginTop: rh(3) }}
            loading={isLoading}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  contentContainer: {
    paddingVertical: rh(1),
    paddingHorizontal: rw(5),
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfInput: { width: "49%", gap: 5 },
  saveAsContainer: {
    backgroundColor: "#FFF4E6",
    padding: rw(2),
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "white",
    marginTop: rh(2),
  },
  saveAsTitle: { fontWeight: "bold", fontSize: rf(2) },
  saveOptionsList: { paddingTop: rh(1), gap: rw(2) },
  saveOptionContainer: {
    paddingVertical: rw(2),
    paddingHorizontal: rw(3),
    borderRadius: 10,
  },
  saveOptionText: { textAlign: "center" },
});

export default EditAddress;

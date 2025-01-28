import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import Header from '../../../components/header';
import { rw, rh, rf } from '../../../Service/responsive';
import LinearStepIndicator from '../../../components/Stepper/LinearIndicatorStepper';
import TextInputField from '../../../components/Inputs/TextInputField';
import apiClient from '../../../Service/apiClient';
import CustomButtons from '../../../components/Buttons/CustomButtons';

const OutletDetailsScreen = ({ navigation, route }) => {
    const { mobile } = route.params;

    // State variables for input fields
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [pincode, setPincode] = useState('');
    const [landmark, setLandmark] = useState('');
    
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errors, setErrors] = useState({});

    // Validation function
    const validateInputs = () => {
        let validationErrors = {};
        
        if (!name) validationErrors.name = 'Outlet name is required';
        if (!address) validationErrors.address = 'Address is required';
        if (!city) validationErrors.city = 'City is required';
        if (!state) validationErrors.state = 'State is required';
        if (!pincode || !/^\d{6}$/.test(pincode)) validationErrors.pincode = 'Pincode is required and should be 6 digits';
        if (!landmark) validationErrors.landmark = 'Landmark is required';

        setErrors(validationErrors);

        // Return false if there are errors, true if no errors
        return Object.keys(validationErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async () => {
        setIsSubmitted(true); 
        
        if (!validateInputs()) {
            return;  // Don't proceed if validation fails
        }

        setIsLoading(true);

        // API request to register the outlet
        try {
            const response = await apiClient.post('/registerOutlet', {
                mobile,
                name,
                address,
                city,
                state,
                pincode,
                landmark,
            });
            const { status, msg, data } = response.data;

            if (status === 1) {
                navigation.navigate('BusinessDetails', { mobile: mobile });  
            } else {
                Alert.alert('Error', msg);
            }
        } catch (error) {
            Alert.alert('Error', 'Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Header title="Outlet Details" />
            <View style={styles.ContentContaine}>
                <LinearStepIndicator steps={[1, 2, 3]} currentStep={1} />

                <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                    <View style={{ marginTop: rh(2) }}>
                        <Text style={{ fontWeight: 'bold', fontSize: rf(2), color: '#272727' }}>
                            Enter Your Outlet Details
                        </Text>
                        <View style={{ paddingVertical: rh(1) }}>
                            <TextInputField
                                placeholder="Outlet Name"
                                value={name}
                                onChange={setName}
                                maxLength={30}
                                errorMessage={isSubmitted && errors.name}
                            />
                            <TextInputField
                                placeholder="Address"
                                value={address}
                                onChange={setAddress}
                                maxLength={30}
                                errorMessage={isSubmitted && errors.address}
                            />
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ width: rw(45) }}>
                                    <TextInputField
                                        placeholder="City"
                                        value={city}
                                        onChange={setCity}
                                        maxLength={20}
                                        errorMessage={isSubmitted && errors.city}
                                    />
                                </View>
                                <View style={{ width: rw(45) }}>
                                    <TextInputField
                                        placeholder="State"
                                        value={state}
                                        onChange={setState}
                                        maxLength={20}
                                        errorMessage={isSubmitted && errors.state}
                                    />
                                </View>
                            </View>
                            <TextInputField
                                placeholder="Pin Code"
                                value={pincode}
                                onChange={setPincode}
                                keyboardType="numeric"
                                maxLength={6}
                                errorMessage={isSubmitted && errors.pincode}
                            />
                            <TextInputField
                                placeholder="Landmark"
                                value={landmark}
                                onChange={setLandmark}
                                errorMessage={isSubmitted && errors.landmark}
                            />
                        </View>
                    </View>
                </ScrollView>

                {/* Floating Button */}
                <View style={{ width: rw(100), padding: rw(2), paddingHorizontal: rw(5), paddingBottom: rh(2), backgroundColor: "white", position: 'absolute', bottom: rh(0) }}>
                    <CustomButtons 
                        onPress={handleSubmit} 
                        title="Next"
                        disabled={isLoading}  
                        loading={isLoading}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    ContentContaine: {
        flex: 1,
        paddingVertical: rh(1),
        paddingHorizontal: rw(4),
        backgroundColor: '#F3F3F3',
    },
    scrollContainer: {
        paddingBottom: rh(20),
    },
});

export default OutletDetailsScreen;

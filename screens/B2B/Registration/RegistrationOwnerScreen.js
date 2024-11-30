// Import necessary libraries
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import CheckBox from '@react-native-community/checkbox'; // Or use your preferred checkbox library
import Header from '../../../components/header';
import { rw, rh, rf } from '../../../Service/responsive';
import LinearStepIndicator from '../../../components/Stepper/LinearIndicatorStepper';
import TextInputField from '../../../components/Inputs/TextInputField';

const RegistrationOwnerScreen = () => {
    const [selectedBusinessTypes, setSelectedBusinessTypes] = useState([]);

    // List of business types
    const businessTypes = [
        'Restaurant',
        'Sweet Shop',
        'Catering',
        'Hotel',
        'Kirana Store',
        'Others',
    ];

    // Function to toggle selection
    const toggleSelection = (type) => {
        setSelectedBusinessTypes((prev) =>
            prev.includes(type)
                ? prev.filter((item) => item !== type)
                : [...prev, type]
        );
    };

    return (
        <View style={styles.container}>
            <Header title="Register" />
            <View style={styles.ContentContaine}>
                <LinearStepIndicator steps={[1, 2, 3]} currentStep={0} />

                <View style={styles.informationCard}>
                    <View>
                        <Text style={{ fontWeight: '600', fontSize: rf(2.3) }}>
                            Register Your Business on UnderOneRoof
                        </Text>
                        <Text style={{ marginTop: rh(1), color: '#9D9D9D', fontSize: rf(1.8) }}>
                            Get started by providing some {'\n'} basic information about your {'\n'} business.
                        </Text>
                    </View>
                    <View style={{ position: 'absolute', right: 0, bottom: 0 }}>
                        <Image
                            source={require('../../../assets/Character/Group.png')}
                            style={{ width: rw(30), height: rw(35) }}
                        />
                    </View>
                </View>

                <View style={{ marginTop: rh(2) }}>
                    <Text style={{ fontWeight: 'bold', fontSize: rf(2), color: '#272727' }}>
                        Enter Owner Details
                    </Text>
                    <View style={{ paddingVertical: rh(1) }}>
                        <TextInputField placeholder="First Name" />
                        <TextInputField placeholder="Last Name" />
                        <TextInputField placeholder="Mobile Number" />
                        <TextInputField placeholder="Email" />
                    </View>
                </View>

                <View style={{ marginTop: rh(2) }}>
                    <Text style={{ fontWeight: 'bold', fontSize: rf(2), color: '#272727' }}>
                        Business Type
                    </Text>
                    <View style={styles.checkboxContainer}>
                        <FlatList
                            data={businessTypes}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.checkboxItem}
                                    onPress={() => toggleSelection(item)}
                                >
                                    <CheckBox
                                        value={selectedBusinessTypes.includes(item)}
                                        onValueChange={() => toggleSelection(item)}
                                    />
                                    <Text style={styles.checkboxLabel}>{item}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
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
    informationCard: {
        height: rh(17),
        paddingTop: rh(1),
        paddingHorizontal: rw(3),
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        borderRadius: 10,
        overflow: 'hidden',
        marginTop: rh(1),
    },
    checkboxContainer: {
        marginTop: rh(1),
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: rw(3),
    },
    checkboxItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: rh(1),
    },
    checkboxLabel: {
        fontSize: rf(2),
        color: '#272727',
        marginLeft: rw(2),
    },
});

export default RegistrationOwnerScreen;

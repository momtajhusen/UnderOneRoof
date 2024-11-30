import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import Checkbox from 'expo-checkbox'; // Importing Expo Checkbox
import Header from '../../../components/header';
import { rw, rh, rf } from '../../../Service/responsive';
import LinearStepIndicator from '../../../components/Stepper/LinearIndicatorStepper';
import TextInputField from '../../../components/Inputs/TextInputField';

const OutletDetailsScreen = ({navigation}) => {
 
 

 
    return (
        <View style={styles.container}>
            <Header title="Outlet Details" />
            <View style={styles.ContentContaine}>
                <LinearStepIndicator steps={[1, 2, 3]} currentStep={1} />

                <ScrollView
                    style={styles.scrollContainer}
                    showsVerticalScrollIndicator={false}
                >
 

                    <View style={{ marginTop: rh(2) }}>
                        <Text style={{ fontWeight: 'bold', fontSize: rf(2), color: '#272727' }}>
                           Enter Your Outlet Details
                        </Text>
                        <View style={{ paddingVertical: rh(1) }}>
                            <TextInputField placeholder="Outlet Name" />
                            <TextInputField placeholder="Address" />
                            <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                                <View style={{width:rw(45)}}>
                                <TextInputField placeholder="City" />
                                </View>
                                <View style={{width:rw(45)}}>
                                <TextInputField placeholder="State" />
                                </View>
                            </View>
                            <TextInputField placeholder="Pin Code" />
                            <TextInputField placeholder="Landmark" />
                        </View>
                    </View>
                </ScrollView>

                {/* Floating Button */}
                <View style={{width:rw(100), padding:rw(2), paddingBottom:rh(2), backgroundColor:"white", position: 'absolute',bottom: rh(0)}}>
                    <TouchableOpacity onPress={()=>navigation.navigate('BusinessDetails')} style={{width:"90%", alignSelf: 'center',backgroundColor: 'red',paddingVertical: rh(1.7), borderRadius: 10}}>
                        <Text style={{fontWeight: 'bold',textAlign: 'center',color: 'white',}}>Next</Text>
                    </TouchableOpacity>
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

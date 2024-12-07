import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import Checkbox from 'expo-checkbox'; 
import Header from '../../../components/header';
import { rw, rh, rf } from '../../../Service/responsive';
import LinearStepIndicator from '../../../components/Stepper/LinearIndicatorStepper';
import TextInputField from '../../../components/Inputs/TextInputField';

const B2BRequestProductsScreen = ({navigation}) => {
 
 
    return (
        <View style={styles.container}>
            <Header title="Request Product" />
            <View style={styles.ContentContaine}>

                <ScrollView
                    style={styles.scrollContainer}
                    showsVerticalScrollIndicator={false}  
                >
                    <View style={styles.informationCard}>
                        <View>
                            <Text style={{ fontWeight: '600', fontSize: rf(2.3) }}>
                               Can't Find What You're {'\n'}Looking For?
                            </Text>
                            <Text style={{ marginTop: rh(1), color: '#9D9D9D', fontSize: rf(1.8) }}>
                               Let us know the item or service {'\n'}you need, and we'll work on {'\n'}making it available for you!
                            </Text>
                        </View>
                        <View style={{ position: 'absolute', right: 0, bottom: 0 }}>
                            <Image
                                source={require('../../../assets/Character/products1.png')}
                                style={{ width: rw(30), height: rw(35) }}
                            />
                        </View>
                    </View>

                    <View style={{ marginTop: rh(2) }}>
                        <Text style={{ fontWeight: 'bold', fontSize: rf(2), color: '#272727' }}>
                           Explain Product what you want 
                        </Text>
                        <View style={{ paddingVertical: rh(1) }}>
                            <TextInputField placeholder="Your mobile number" />
                            <TextInputField placeholder="Enter the product name" />
                            <TextInputField placeholder="Product Category" />
                            <TextInputField placeholder="Email" />
                        </View>
                    </View>
 
                </ScrollView>

                {/* Floating Button */}
                <View style={{width:rw(100), padding:rw(2), paddingBottom:rh(2), backgroundColor:"white", position: 'absolute',bottom: rh(0)}}>
                    <TouchableOpacity style={{width:"90%", alignSelf: 'center',backgroundColor: 'red',paddingVertical: rh(1.7), borderRadius: 10}}>
                        <Text style={{fontWeight: 'bold',textAlign: 'center',color: 'white',}}>Submit</Text>
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
        paddingBottom: rh(20), // Prevent content overlap with the button
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
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: rw(3),
        marginBottom:rh(10)
    },
    checkboxItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: rh(1.5),
    },
    checkboxLabel: {
        fontSize: rf(2),
        color: '#717171',
        marginLeft: rw(2),
    },
    floatingButton: {
        position: 'absolute',
        bottom: rh(5),
        alignSelf: 'center',
        backgroundColor: '#FF3131',
        paddingVertical: rh(1.7),
        paddingHorizontal: rw(20),
        borderRadius: 10,
    }
});

export default B2BRequestProductsScreen;

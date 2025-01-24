import React, { useState, useRef, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, ActivityIndicator } from 'react-native';
import Modal from 'react-native-modal';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import apiClient from '../../Service/apiClient';
import { AppContext } from '../../context/AppContext';

const PaymentMethodModal = ({ isVisible, toggleModal }) => {
      const { state } = useContext(AppContext);


      console.log('type '+state.shoppingMode);
      console.log('user ID '+state.userId);

    
    const navigation = useNavigation();

    const [selectedOption, setSelectedOption] = useState(null);

    const [isLoading, setIsLoading] = useState(null);


    // Animation references
    const shakeTextRef = useRef(null);
    const radioButtonRef1 = useRef(null);
    const radioButtonRef2 = useRef(null);

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };

    const handlePayNow = () => {
        if (!selectedOption) {
            shakeTextRef.current.shake(2000);
            radioButtonRef1.current.fadeIn(2000);
            radioButtonRef2.current.fadeIn(2000);
        } else if (selectedOption === 'PayOnDelivery') {
            placeOrder();
        } else if (selectedOption === 'PayOnline') {
            alert('Online payment is currently under development. Please try Pay on Delivery.');
        }
    };

    const placeOrder = async () => {
        setIsLoading(true);
        try {
            const aid = state.selectAddressData[0].aid;
            const response = await apiClient.post('/checkout', {
                address_id: aid,
                payment_type: 'cod',
            });
            
            console.log(response.data);
            if (response.data.title == 'Order Successfully') {
                navigation.navigate('OrderPlaced', { data: response.data.data });
                toggleModal();
            } else {
                alert('Error occurred. Please try again.');
            }
        } catch (error) {
            console.error(error);
            alert('Something went wrong. Please check your connection or try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' }}>
            <Modal
                isVisible={isVisible}
                onBackdropPress={toggleModal}
                style={{ justifyContent: 'flex-end', margin: 0 }}
                backdropOpacity={0.4}
            >
                <View style={{
                    backgroundColor: '#FFF',
                    padding: 20,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.3,
                    shadowRadius: 4,
                    elevation: 5,
                }}>
                    <Animatable.Text
                        ref={shakeTextRef}
                        style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            marginBottom: 20,
                            color: '#000',
                        }}
                    >
                        Select Payment Method:
                    </Animatable.Text>

                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: '#F8F8F8',
                            borderRadius: 10,
                            padding: 15,
                            marginBottom: 15,
                        }}
                        onPress={() => handleOptionSelect('PayOnline')}
                    >
                        <Animatable.View ref={radioButtonRef1} style={{ marginRight: 10 }}>
                            <MaterialIcons
                                name={selectedOption === 'PayOnline' ? 'radio-button-checked' : 'radio-button-unchecked'}
                                size={24}
                                color="#000"
                            />
                        </Animatable.View>
                        <Text style={{ fontSize: 16, color: '#000', flex: 1 }}>Pay Online</Text>
                        <Image source={require('../../assets/2147224712.png')} style={{ width: 40, height: 30 }} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: '#F8F8F8',
                            borderRadius: 10,
                            padding: 15,
                            marginBottom: 15,
                        }}
                        onPress={() => handleOptionSelect('PayOnDelivery')}
                    >
                        <Animatable.View ref={radioButtonRef2} style={{ marginRight: 10 }}>
                            <MaterialIcons
                                name={selectedOption === 'PayOnDelivery' ? 'radio-button-checked' : 'radio-button-unchecked'}
                                size={24}
                                color="#000"
                            />
                        </Animatable.View>
                        <Text style={{ fontSize: 16, color: '#000', flex: 1 }}>Pay on Delivery</Text>
                        <Image source={require('../../assets/cod-icon.png')} style={{ width: 40, height: 30 }} />
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                        <TouchableOpacity
                            style={{
                                flex: 1,
                                marginRight: 10,
                                backgroundColor: '#E0E0E0',
                                padding: 15,
                                borderRadius: 10,
                                alignItems: 'center',
                            }}
                            onPress={toggleModal}
                        >
                            <Text style={{ color: '#000', fontWeight: 'bold' }}>Cancel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                flex: 1,
                                backgroundColor: isLoading ? '#D3D3D3' : '#FF4D4D',
                                padding: 15,
                                borderRadius: 10,
                                alignItems: 'center',
                                justifyContent: 'center',
                                opacity: isLoading ? 0.6 : 1,
                            }}
                            onPress={!isLoading ? handlePayNow : null}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <ActivityIndicator size="small" color="#FF4D4D" />
                            ) : (
                                <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Pay Now</Text>
                            )}
                        </TouchableOpacity>

                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default PaymentMethodModal;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalContent: {
        backgroundColor: '#FFF',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#000',
    },
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8F8F8',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
    },
    radio: {
        marginRight: 10,
    },
    optionText: {
        fontSize: 16,
        color: '#000',
        flex: 1,
    },
    optionIcons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    cancelButton: {
        flex: 1,
        marginRight: 10,
        backgroundColor: '#E0E0E0',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    cancelText: {
        color: '#000',
        fontWeight: 'bold',
    },
    payButton: {
        flex: 1,
        backgroundColor: '#FF4D4D',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    payText: {
        color: '#FFF',
        fontWeight: 'bold',
    },
});
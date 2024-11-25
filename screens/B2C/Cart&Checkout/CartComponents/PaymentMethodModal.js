import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

const { width } = Dimensions.get('window');

const PaymentMethodModal = ({ isVisible, toggleModal }) => {
    const navigation = useNavigation();

    const [selectedOption, setSelectedOption] = useState(null);

    // Animation references
    const shakeTextRef = useRef(null);
    const radioButtonRef1 = useRef(null);
    const radioButtonRef2 = useRef(null);


    // Function to handle option selection
    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };

    const handlePayNow = () => {
        if (!selectedOption) {
            shakeTextRef.current.shake(2000);  
            radioButtonRef1.current.fadeIn(2000); 
            radioButtonRef2.current.fadeIn(2000);  

        } else {
            toggleModal();
            setSelectedOption(null);
            navigation.navigate('OrderPlaced');
        }
    };

    return (
        <View style={styles.mainContainer}>
            {/* Payment Modal */}
            <Modal
                isVisible={isVisible}
                onBackdropPress={toggleModal}
                style={styles.modal}
                backdropOpacity={0.4}
            >
                <View style={styles.modalContent}>
                    {/* Title with shake animation */}
                    <Animatable.Text
                        ref={shakeTextRef}
                        style={styles.title}
                    >
                        Select Payment Method:
                    </Animatable.Text>

                    {/* Pay Online Option */}
 
                        <TouchableOpacity
                            style={styles.optionContainer}
                            onPress={() => handleOptionSelect('PayOnline')}
                        >
                            <Animatable.View ref={radioButtonRef1}  style={styles.radio}>
                                <MaterialIcons
                                    name={selectedOption === 'PayOnline' ? 'radio-button-checked' : 'radio-button-unchecked'}
                                    size={24}
                                    color="#000"
                                />
                            </Animatable.View>
                            <Text style={styles.optionText}>Pay Online</Text>
                            <View style={styles.optionIcons}>
                                <MaterialCommunityIcons name="credit-card" size={24} color="#000" />
                            </View>
                        </TouchableOpacity>

                        {/* Pay on Delivery Option */}
                        <TouchableOpacity
                            style={styles.optionContainer}
                            onPress={() => handleOptionSelect('PayOnDelivery')}
                        >
                            <Animatable.View ref={radioButtonRef2}  style={styles.radio}>
                                <MaterialIcons
                                    name={selectedOption === 'PayOnDelivery' ? 'radio-button-checked' : 'radio-button-unchecked'}
                                    size={24}
                                    color="#000"
                                />
                            </Animatable.View>
                            <Text style={styles.optionText}>Pay on Delivery</Text>
                            <MaterialCommunityIcons name="cash" size={24} color="#000" style={styles.icon} />
                        </TouchableOpacity>

                    {/* Buttons */}
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.cancelButton} onPress={toggleModal}>
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.payButton}
                            onPress={handlePayNow}
                        >
                            <Text style={styles.payText}>Pay Now</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

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
    icon: {
        marginLeft: 5,
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

export default PaymentMethodModal;

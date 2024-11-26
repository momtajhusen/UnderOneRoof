import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { rw, rh, rf } from '../../Service/responsive';

const SortByModal = ({ isVisible, toggleModal, options }) => {

    const [selectedOption, setSelectedOption] = useState(options[0]);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [customDate, setCustomDate] = useState(null);

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        if (option === 'Custom Date') {
            setShowDatePicker(true);
        } else {
            setShowDatePicker(false);
        }
    };

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || customDate;
        setShowDatePicker(false);
        setCustomDate(currentDate);
    };

    const handleClear = () => {
        setSelectedOption(null);
        setCustomDate(null);
        toggleModal();
    };

    const handleApply = () => {
        // Apply logic here
        alert(`Selected: ${selectedOption}${customDate ? ` (${customDate.toLocaleDateString()})` : ''}`);
        toggleModal();
    };

    return (
        <Modal
            isVisible={isVisible}
            onBackdropPress={toggleModal}
            style={styles.modal}
            backdropOpacity={0.4}
            animationIn="slideInUp"
            animationOut="slideOutDown"
        >
            <View style={styles.modalContent}>
                <View style={{flexDirection: 'row', borderBottomWidth:1, borderColor:"#DFDFDF", paddingBottom:rh(1), marginBottom:rh(1)}}>
                  <Text style={styles.title}>Sort by</Text>
                  <MaterialIcons name="swap-vert" size={25} color="black" />
                </View>
                {options.map((option, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.optionContainer}
                        onPress={() => handleOptionSelect(option)}
                    >
                        <Text style={styles.optionText}>{option}</Text>
                        <MaterialIcons
                            name={
                                selectedOption === option
                                    ? 'radio-button-checked'
                                    : 'radio-button-unchecked'
                            }
                            size={24}
                            color={selectedOption === option ? 'red' : '#000'}
                        />
                    </TouchableOpacity>
                ))}

                {showDatePicker && (
                    <DateTimePicker
                        value={customDate || new Date()}
                        mode="date"
                        display="default"
                        onChange={handleDateChange}
                    />
                )}

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
                        <Text style={styles.clearText}>Clear All</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
                        <Text style={styles.applyText}>Apply</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalContent: {
        backgroundColor: '#FFF',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
        header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: rh(2),
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', // Right-side alignment
        marginBottom: 15,
    },
    optionText: {
        fontSize: 16,
        color: '#000',
        flex: 1,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    clearButton: {
        backgroundColor: '#E0E0E0',
        paddingVertical: 12,
        paddingHorizontal: rw(15),
        borderRadius: 10,
    },
    clearText: {
        fontWeight: 'bold',
        color: '#000',
    },
    applyButton: {
        backgroundColor: '#FF4D4D',
        paddingVertical: 12,
        paddingHorizontal: rw(15),
        borderRadius: 10,
    },
    applyText: {
        fontWeight: 'bold',
        color: '#FFF',
    },
});

export default SortByModal;

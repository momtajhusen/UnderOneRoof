//import liraries
import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { rw, rh, rf } from '../../Service/responsive';
import { MaterialIcons } from '@expo/vector-icons';

// create a component
const SearchInput = () => {
    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <MaterialIcons 
                    name="search" 
                    size={rf(3.5)} 
                    color="#777" 
                    style={styles.icon} 
                />
                <TextInput 
                    style={styles.input} 
                    placeholder="Search for items..."
                    placeholderTextColor="#aaa"
                    autoFocus={true} // Automatically focuses on input
                />
            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        width: '95%',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: rw(3),
        paddingHorizontal: rw(3),
        paddingVertical: rh(1),
        elevation: 2, // Subtle shadow
    },
    icon: {
        marginRight: rw(1),
    },
    input: {
        flex: 1,
        fontSize: rf(2),
        paddingVertical: 0,
    },
});

//make this component available to the app
export default SearchInput;

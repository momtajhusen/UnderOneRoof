//import liraries
import React from 'react';
import { View, TextInput, StyleSheet, ActivityIndicator } from 'react-native';
import { rw, rh, rf } from '../../Service/responsive';
import { MaterialIcons } from '@expo/vector-icons';

// create a component
const SearchInput = ({ autoFocus, value, loading, onChange, placeholder = "Search here.." }) => {
    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                {loading ? (
                    <ActivityIndicator 
                        size={rf(3.5)} 
                        color="#777" 
                        style={styles.icon} 
                    />
                ) : (
                    <MaterialIcons 
                        name="search" 
                        size={rf(3.5)} 
                        color="#777" 
                        style={styles.icon} 
                    />
                )}
                <TextInput 
                    style={styles.input}
                    value={value} 
                    placeholder={placeholder}
                    placeholderTextColor="#aaa"
                    autoFocus={autoFocus}
                    onChangeText={(text) => onChange(text)}
                />
            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: rw(3),
        paddingHorizontal: rw(3),
        paddingVertical: rh(1),
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

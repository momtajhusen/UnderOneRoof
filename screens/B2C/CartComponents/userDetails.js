// import libraries
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { rw, rh, rf } from '../../../Service/responsive';

// create a component
const UserDetails = () => {
    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <View style={styles.locationContainer}>
                    <MaterialIcons name="fmd-good" size={rf(4)} color="#FF3131" style={styles.locationIcon} />
                    <Text style={{fontWeight:"bold", marginRight:rw(1)}}>Delivery To:</Text>
                    <Text style={styles.locationText}>Home</Text>
                </View>
                <TouchableOpacity style={{paddingRight:rw(3)}}>
                    <Text style={styles.changeText}>Change</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.detailsContainer}>
                <Text style={styles.userName}>Aman Shukla</Text>
                <Text style={styles.address}>
                    A-123, Green Park Main, Near Hauz Khas Metro Station, New Delhi - 110016, India.
                </Text>
                <View style={styles.contactRow}>
                    <Text style={styles.contactName}>Phone number:</Text>
                    <Text style={styles.contactNumber}>+91 7867543425</Text>
                </View>
            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        width:rw(90),
        marginLeft:rw(2.5),
        backgroundColor: "white",
        paddingHorizontal:rw(1),
        paddingVertical:rh(1),
        borderRadius: rw(5),
        // elevation: 3, // for subtle shadow on Android
        // shadowColor: "#000", // shadow for iOS
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.1,
        // shadowRadius: 5,
        marginTop: rh(2),
    },
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    locationContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal:rw(1),
        paddingRight:rw(3),
    },
    locationIcon: {
        marginRight: rw(2),
    },
    locationText: {
        paddingHorizontal: rw(2),
        backgroundColor: "#E9E9E9",
        borderRadius: rw(1),
        color: "#4A4A4A",
        fontWeight: "bold",
    },
    changeText: {
        color: "#FF3131",
        fontWeight: "bold",
        fontSize: rf(2),
    },
    detailsContainer: {
        paddingVertical: rh(0),
        paddingHorizontal:rw(8),
    },
    userName: {
        fontWeight: "bold",
        fontSize: rf(2.2),
        color: "#333",
        marginBottom: rh(0.5),
    },
    address: {
        fontSize: rf(1.8),
        color: "#717171",
        lineHeight: rh(2.5),
    },
    contactRow: {
        flexDirection: "row",
        marginTop: rh(1),
        alignItems: "center",
    },
    contactName: {
        fontWeight: "bold",
        color: "#333",
        marginRight: rw(2),
    },
    contactNumber: {
        color: "#717171",
        fontSize: rf(1.8),
    },
});

export default UserDetails;

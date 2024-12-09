//import liraries
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { rw, rh, rf } from '../../../../Service/responsive';

// create a component
const ProceedDetails = ({btnText, onPress, weight="100g", price="199", mrpprice="250" }) => {
    return (
        <View style={styles.container}>
            <View style={styles.priceDetails}>
                <Text style={styles.weightText}>{weight}</Text>
                <Text style={styles.priceText}>
                    ₹{price} <Text style={styles.mrpText}> MRP </Text><Text style={styles.mrpPrice}> ₹{mrpprice}</Text>
                </Text>
            </View>
            <TouchableOpacity onPress={onPress} style={styles.btn}>
                <Text style={styles.btnText}>{btnText}</Text>
            </TouchableOpacity>
        </View>
    );
};

//make this component available to the app
export default ProceedDetails;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: rh(10),
        paddingHorizontal: rw(5),
        backgroundColor: "white",
    },
    priceDetails: {
        justifyContent: "center",
    },
    weightText: {
        color: "#717171",
        fontSize: rf(1.5),
    },
    priceText: {
        fontWeight: "bold",
        fontSize: rf(2),
        color: "#000",
    },
    mrpText: {
        fontWeight: "normal",
        fontSize: rf(1.5),
        color: "#717171",
    },
    mrpPrice:{
        fontWeight: "normal",
        fontSize: rf(1.5),
        color: "#717171",
        textDecorationLine: "line-through",
    },
    btn: {
        backgroundColor: "#FF3131",
        borderRadius: 10,
        paddingVertical: rh(1),
        paddingHorizontal: rw(15),
        alignItems: "center",
        justifyContent: "center",
    },
    btnText: {
        color: "white",
        fontSize: rf(2),
        fontWeight: "bold",
    },
});

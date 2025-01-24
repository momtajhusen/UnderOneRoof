import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { rw, rh, rf } from '../../Service/responsive';
import { generateInvoice } from '../../utility/generateInvoice';

const OrderSummary = ({ OrderData }) => {
    return (
        <View style={styles.container}>
            <View style={{ gap: rh(0.5) }}>
                <View>
                    <Text style={styles.title}>Order Summary</Text>
                    <Text style={{ fontSize: rf(1.5), color: "#9D9D9D" }}>
                        {OrderData.order[0].order_date} | {OrderData.order[0].order_time}
                    </Text>
                </View>
                <TouchableOpacity
                    style={{
                        flexDirection: "row",
                        padding: rw(1.5),
                        borderRadius: 5,
                        gap: rw(2),
                        alignItems: "center",
                        borderWidth: 1,
                        borderColor: "#DFDFDF",
                        width: rw(40),
                    }}
                    onPress={() => generateInvoice(OrderData)}
                >
                    <Text style={{ fontWeight: "600" }}>Download Invoice</Text>
                    <Image
                        source={require('../../assets/download.png')}
                        style={{ width: rw(5), height: rw(5) }}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        borderRadius: 10,
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    title: {
        fontWeight: "bold",
        fontSize: rf(2.4),
    },
});

export default OrderSummary;

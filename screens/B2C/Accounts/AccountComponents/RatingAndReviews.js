import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { rw, rh, rf } from '../../../../Service/responsive';
import Header from '../../../../components/header';
import * as Animatable from 'react-native-animatable';
import CollapsibleReviewCard from '../../../../components/List/CollapsibleReviewCard';

const RatingAndReviews = () => {
    const [modalVisible, setModalVisible] = useState(false);

    const handleSubmit = () => {
        setModalVisible(true);  
    };

    const handleModalClose = () => {
        setModalVisible(false);  
    };

    return (
        <View style={{ flex: 1 }}>
            <Header title="Rating And Reviews" />
            <ScrollView>
                <View style={styles.container}>
                    <View
                        style={{
                            backgroundColor: "white",
                            paddingRight: rw(10),
                            width: rw(100),
                            borderRadius: 10,
                            padding: rw(2.5),
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                    >
                        <View>
                            <Text style={{ fontWeight: "bold", fontSize: rf(2.5) }}>
                                Help Others Shop with {'\n'}Confidence!
                            </Text>
                            <Text style={{ color: "#9D9D9D" }}>Share Your Review!</Text>
                            <View style={{ marginTop: rh(0.5), flexDirection: "row", justifyContent: "flex-start" }}>
                                <MaterialIcons name="star" color="#DFDFDF" size={rf(4)} />
                                <MaterialIcons name="star" color="#DFDFDF" size={rf(4)} />
                                <MaterialIcons name="star" color="#DFDFDF" size={rf(4)} />
                                <MaterialIcons name="star" color="#DFDFDF" size={rf(4)} />
                                <MaterialIcons name="star" color="#DFDFDF" size={rf(4)} />
                            </View>
                        </View>
                        <Animatable.Image
                            animation="bounceInRight"
                            duration={4000}
                            source={require('../../../../assets/GiftOnTheWay.png')}
                            style={{ width: rw(30), height: rw(30) }}
                        />
                    </View>
                    <View style={{ gap: rh(0.5) }}>
                        <Text style={{ marginLeft: rw(3), color: "#717171" }}>
                            Please tell us about items you have ordered.{' '}
                        </Text>
                        <CollapsibleReviewCard
                            imageUri="https://plus.unsplash.com/premium_photo-1683798464819-d1376249293e?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            title="Premium Roasted Almonds"
                            onSubmit={() => alert("Review Submitted!")}
                        />
                        <CollapsibleReviewCard
                            imageUri="https://plus.unsplash.com/premium_photo-1683798464819-d1376249293e?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            title="Premium Roasted Almonds"
                            onSubmit={() => alert("Review Submitted!")}
                        />
                        <CollapsibleReviewCard
                            imageUri="https://plus.unsplash.com/premium_photo-1683798464819-d1376249293e?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            title="Premium Roasted Almonds"
                            onSubmit={() => alert("Review Submitted!")}
                        />
                    </View>
                </View>
            </ScrollView>

            <View style={{ backgroundColor: "white", paddingHorizontal: rw(5), paddingVertical: rh(1) }}>
                <TouchableOpacity
                    style={{ backgroundColor: "#FF3131", paddingVertical: rh(2), borderRadius: 10 }}
                    onPress={handleSubmit}
                >
                    <Text style={{ color: "white", fontWeight: "bold", textAlign: "center" }}>Submit</Text>
                </TouchableOpacity>
            </View>

            {/* Modal Implementation */}
            <Modal
                transparent={true}
                visible={modalVisible}
                animationType="fade"
                onRequestClose={handleModalClose}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Thank You</Text>
                        <View style={{ flexDirection: "row", justifyContent: "center", marginVertical: rh(1) }}>
                            <MaterialIcons name="star" size={rf(5)} color="red" />
                            <MaterialIcons name="star" size={rf(5)} color="red" />
                            <MaterialIcons name="star" size={rf(5)} color="red" />
                            <MaterialIcons name="star" size={rf(5)} color="red" />
                            <MaterialIcons name="star" size={rf(5)} color="#DFDFDF" />
                        </View>
                        <Text style={styles.modalText}>
                            Thanks for your review! Your feedback is invaluable to us. We're glad you're enjoying the
                            app.
                        </Text>
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={handleModalClose}
                        >
                            <Text style={styles.buttonText}>Continue</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: rh(2),
        paddingHorizontal: rw(3),
        paddingBottom: rh(8),
        gap: rh(1),
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: rw(85),
        backgroundColor: 'white',
        borderRadius: 10,
        padding: rw(5),
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: rf(2.5),
        fontWeight: 'bold',
        marginBottom: rh(1),
    },
    modalText: {
        fontSize: rf(2),
        color: '#717171',
        textAlign: 'center',
        marginVertical: rh(2),
    },
    modalButton: {
        backgroundColor: '#FF3131',
        paddingVertical: rh(1.5),
        paddingHorizontal: rw(10),
        borderRadius: 10,
        width:"100%"
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default RatingAndReviews;

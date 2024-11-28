//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Animated, ScrollView} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { rw, rh, rf } from '../../../../Service/responsive';
import Header from '../../../../components/header';
import * as Animatable from 'react-native-animatable';
import CollapsibleReviewCard from '../../../../components/List/CollapsibleReviewCard';

// create a component
const RatingAndReviews = () => {
    return (
        <View>
            <Header title="Rating And Reviews" />
            <ScrollView>
                <View style={styles.container}>
                    <View style={{backgroundColor:"white", paddingRight:rw(10), width:rw(100), borderRadius:10, padding:rw(2.5), flexDirection:"row", justifyContent:"space-between"}}>
                        <View>
                            <Text style={{fontWeight:"bold", fontSize:rf(2.5)}}>Help Others Shop with {'\n'}Confidence!</Text>
                            <Text style={{color:"#9D9D9D"}}>Share Your Review!</Text>
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
                        style={{width:rw(30), height:rw(30)}}
                        />
                    </View>
                    <View style={{gap:rh(0.5)}}>
                        <Text style={{marginLeft:rw(3), color:"#717171"}}>Please tell us about items you have ordered. </Text>
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

        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        paddingVertical:rh(2),
        paddingHorizontal:rw(3),
        paddingBottom:rh(8),
        gap:rh(1)
    },
});

//make this component available to the app
export default RatingAndReviews;

//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert} from 'react-native';
import Header from '../../../../components/header';
import { rw, rh, rf } from '../../../../Service/responsive';
import { MaterialIcons } from '@expo/vector-icons';
import OrderSummary from '../../../../components/List/OrderSummary';
import OrderItems from '../../../../components/List/OrderItems';
import PriceDetails from '../../Cart&Checkout/CartComponents/PriceDetails';
import * as Clipboard from 'expo-clipboard';

// create a component
const OrderDetails = ({navigation}) => {

    const copyToClipboard = () => {
        const orderId = "#834982930-343";
        Clipboard.setString(orderId);
      };

    return (
        <View style={styles.container}>
               <Header title="Orders Detail" />
               <ScrollView>
                <View style={styles.ContentContainer}>

                    {/* Order Summary */}
                    <View>
                        <OrderSummary />
                    </View>

                    {/* Order Items LIst */}
                    <View>
                        <OrderItems />
                    </View>

                    <View style={{padding:rw(3), backgroundColor:"white", borderRadius:10, flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
                       <View style={{flexDirection:"row", gap:rw(2), alignItems:"center"}}>
                         <Image source={require('../../../../assets/account/star.png')} style={{width:rw(6), height:rw(6)}} />
                         <Text style={{fontWeight:"bold"}}>Loved It? Let Us Know!</Text>
                       </View>
                       <TouchableOpacity onPress={()=>navigation.navigate('RatingAndReviews')} style={{width:rw(25), paddingVertical:rh(1), borderRadius:10, backgroundColor:"#FF3131"}}>
                          <Text style={{color:"white", textAlign:"center"}}>Rate Now</Text>
                       </TouchableOpacity>
                    </View>

                    {/* Price Details */}
                    <View>
                        <PriceDetails promoCode={false} saveMessage={false} />
                    </View>

                    {/* Payment Mode */}
                    <View style={{padding:rw(3), backgroundColor:"white", borderRadius:10}}>
                        <View style={{flexDirection:"row", gap:5, alignItems:"center"}}>
                            <MaterialIcons name="credit-card" size={rf(3)} color="#9D9D9D" />
                            <Text style={{color:"#9D9D9D", fontSize:rf(2)}}>Payment Mode</Text>
                        </View>
                        <View style={{padding:rw(2), backgroundColor:"#FFEAEA", borderRadius:10, marginTop:rh(1)}}>
                            <View style={{flexDirection:"row", gap:rw(2)}}>
                                <Text style={{fontWeight:"bold", fontSize:18}}>Payment Completed</Text>
                                <MaterialIcons name="check-circle" size={rf(3)} color="#44B200" />
                            </View>
                            <Text style={{color:"#868686"}}>Pre-Paid Order</Text>
                        </View>
                    </View>

                    {/* Order Summary  */}
                    <View style={{backgroundColor:"white", padding:rw(3), borderRadius:10, marginBottom:rh(1)}}>
                        <View>
                            <Text style={{fontWeight:"600", fontSize:rf(2.4)}}>Order Summary</Text>
                        </View>
                        <View style={{gap:rh(2)}}>
                            <View>
                                <Text style={{color:"#717171"}}>Order id:</Text>
                                <View style={{flexDirection:"row", gap:rw(2)}}>
                                   <Text style={{color:"#717171", fontWeight:"bold"}}>#834982930-343</Text>
                                    <TouchableOpacity onPress={copyToClipboard}>
                                       <MaterialIcons name="content-copy" size={15}/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View>
                                <Text style={{color:"#717171"}}>Order Date:</Text>
                                <Text style={{color:"#717171", fontWeight:"bold"}}>19 October, 2024</Text>
                            </View>
                            <View>
                                <Text style={{color:"#717171"}}>Delivery To:</Text>
                                <Text style={{color:"#717171", fontWeight:"bold"}}>Aman Shukla,
                                A-123, Green Park Main, Near Hauz Khas Metro Station, New Delhi - 110016, India.</Text>
                            </View>
                            <View>
                                <Text style={{color:"#717171"}}>Delivery Date:</Text>
                                <Text style={{color:"#717171", fontWeight:"bold"}}>24 October, 2024</Text>
                            </View>
                        </View>
                    </View>

                </View>
               </ScrollView>

               <View style={{backgroundColor:"white", paddingHorizontal:rw(5), paddingVertical:rh(1)}}>
                   <TouchableOpacity style={{backgroundColor:"#FF3131", paddingVertical:rh(2), borderRadius:10}}>
                           <Text style={{color:"white", fontWeight:"bold", textAlign:"center"}}>Get It Again</Text>
                   </TouchableOpacity>
               </View>

        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
       flex:1,
    },
    ContentContainer:{
        flex:1,
        gap:rh(1),
        paddingHorizontal:rw(4),
        paddingVertical:rw(1),
    }
});

//make this component available to the app
export default OrderDetails;

//import liraries
import React, {useEffect, useContext } from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView, Image, TouchableOpacity,  BackHandler} from 'react-native';
import { rw, rh, rf } from '../../../Service/responsive';
import { MaterialIcons } from '@expo/vector-icons';
import UserDetails from '../../B2C/Cart&Checkout/CartComponents/userDetails';
import PriceDetails from '../../B2C/Cart&Checkout/CartComponents/PriceDetails';
import { useNavigation } from '@react-navigation/native';
import OrderItems from '../../../components/List/OrderItems';
import { useFocusEffect } from "@react-navigation/native";
import { AppContext } from '../../../context/AppContext';
import * as Animatable from 'react-native-animatable';


// create a component
const B2BOrderPlaced = ({route}) => {

  const { data } = route.params;
  const { state, dispatch } = useContext(AppContext);
  const navigation = useNavigation();
  

   useFocusEffect(() => {
      StatusBar.setBackgroundColor("green");
    });

 // Handle back button press
 const handleBackPress = () => {
  navigation.navigate("B2BBottomNavigator"); 
  dispatch({
   type: 'SET_ORDER_NAVIGATION',
   payload: {
      orderNavigation: 'orderPlacedB2B',
   },
 });
  return true; 
};

// Add event listener on mount, remove on unmount
// useEffect(() => {
//   const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
//   return () => {
//     backHandler.remove();  
//   };
// }, []);

    return (
        <View style={styles.container}>
            {/* StatusBar */}
            <StatusBar barStyle="dark-content" backgroundColor="#EAF6EC" />

          <ScrollView>
             <View style={styles.successContainer}>
                 <TouchableOpacity onPress={() => navigation.goBack()} style={{paddingHorizontal: rw(4)}}>
                   <MaterialIcons name="arrow-back" size={rf(3)} color="white" />
                 </TouchableOpacity>
                 <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
                    <Animatable.Image 
                      animation="zoomIn"
                      delay={100}
                      source={require('../../../assets/Frame2147224831.png')} 
                      style={{width:rw(40), height:rw(40)}} 
                    />
                    <View style={{flexDirection:"row", gap:rw(2), alignItems:"center"}}>
                       <Text style={{fontSize:rf(4), fontWeight:"bold", color:"#28A745"}}>Order Confirmed !</Text>
                    </View>
                    <View style={{backgroundColor:"#05940033", marginVertical:rh(1), padding:rw(3), borderRadius:10}}>
                       <Text style={{fontSize:rf(2), color:"#28A745"}}>Our team will contact you soon</Text>
                    </View>
                 </View>
             </View>
             <View style={styles.detailsContainer}>
                  <View style={{flexDirection:"row", alignItems:"center", marginLeft:rw(2.5)}}>
                      <Text style={{fontWeight:"bold", fontSize:rf(2)}}>Order ID : </Text>
                      <Text style={{fontWeight:"normal"}}>#{data.oid}</Text>
                  </View>

                  <View style={{ marginVertical: rh(1) }}>
                     <UserDetails userData={state.selectAddressData} />
                  </View>


                  {/* <View style={{flexDirection:"row", gap:rw(3), backgroundColor:"white", marginBottom:rh(1), padding:rw(2), paddingHorizontal:rw(5), borderRadius:10}}>
                     <Image source={require('../../../assets/FastTruckicon.png')} style={{width:rw(8), height:rh(3)}} />
                     <View style={{flexDirection:"row", alignItems:"center", gap:rw(2)}}> 
                        <Text>Estimated Delivery by</Text>
                        <Text style={{fontWeight:"bold"}}>24, October, 2024</Text>
                     </View>
                  </View> */}
 
             </View>
           </ScrollView>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EAF6EC',
    },
    successContainer:{
        height:rh(40),
        backgroundColor:"#EAF6EC",
    },
    detailsContainer:{
      height:rh(60),
      backgroundColor:"#F3F3F3",
      borderTopLeftRadius:30,
      borderTopRightRadius:30, 
      paddingHorizontal:rw(3),
      paddingVertical:rh(2),
      paddingBottom:rh(1)
    }
});

//make this component available to the app
export default B2BOrderPlaced;



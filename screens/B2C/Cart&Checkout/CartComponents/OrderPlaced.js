//import liraries
import React, {useEffect, useContext } from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView, Image, TouchableOpacity, BackHandler} from 'react-native';
import { rw, rh, rf } from '../../../../Service/responsive';
import { MaterialIcons } from '@expo/vector-icons';
import UserDetails from './userDetails';
import PriceDetails from './PriceDetails';
import { useNavigation } from '@react-navigation/native';
import OrderItems from '../../../../components/List/OrderItems';
import { useFocusEffect } from "@react-navigation/native";
import { AppContext } from '../../../../context/AppContext';

// create a component
const OrderPlaced = ({route}) => {
   const { data } = route.params;
   const { state } = useContext(AppContext);


    // Handle back button press
    const handleBackPress = () => {
     navigation.navigate("BottomNavigator");  
     return true; 
   };
   
   // Add event listener on mount, remove on unmount
   useEffect(() => {
     const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
     return () => {
       backHandler.remove();  
     };
   }, []);
   



   useFocusEffect(() => {
      StatusBar.setBackgroundColor("green");
    });

  const navigation = useNavigation();

    return (
        <View style={styles.container}>
            {/* StatusBar */}
            <StatusBar barStyle="dark-content" backgroundColor="green" />

          <ScrollView>
             <View style={styles.successContainer}>
                 <TouchableOpacity onPress={() => navigation.goBack()} style={{paddingHorizontal: rw(4)}}>
                   <MaterialIcons name="arrow-back" size={rf(3)} color="white" />
                 </TouchableOpacity>
                 <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
                    <View style={{flexDirection:"row", gap:rw(2), alignItems:"center"}}>
                       <MaterialIcons name="check-circle" size={35} color="white" />
                       <Text style={{fontSize:rf(4), fontWeight:"bold", color:"#FFFFFF"}}>Order Confirmed !</Text>
                    </View>
                    <View style={{backgroundColor:"#FEFEFE33", marginVertical:rh(1), padding:rw(3), borderRadius:10}}>
                       <Text style={{fontSize:rf(2), color:"#FFFFFF"}}>Your order has been successfully placed</Text>
                    </View>
                 </View>
             </View>
             <View style={styles.detailsContainer}>
                  <View style={{flexDirection:"row", marginLeft:rw(2.5)}}>
                      <Text style={{fontWeight:"bold", fontSize:rf(2)}}>Order ID : </Text>
                      <Text style={{fontWeight:"normal"}}>#8912937981230</Text>
                  </View>

                  <View style={{marginVertical:rh(1)}}>
                    <UserDetails  userData={state.selectAddressData} />
                  </View>

                  <View style={{flexDirection:"row", gap:rw(3), backgroundColor:"white", marginBottom:rh(1), padding:rw(2), paddingHorizontal:rw(5), borderRadius:10}}>
                     <Image source={require('../../../../assets/FastTruckicon.png')} style={{width:rw(8), height:rh(3)}} />
                     <View style={{flexDirection:"row", alignItems:"center", gap:rw(2)}}> 
                        <Text>Estimated Delivery by</Text>
                        <Text style={{fontWeight:"bold"}}>24, October, 2024</Text>
                     </View>
                  </View>

                  <View>
                     <OrderItems data={data} /> 
                  </View>

                  <View style={{marginVertical:rh(1)}}>
                         <PriceDetails data={state.viewCartData} promoCode={false} style={{ backgroundColor: "green" }} />
                  </View>

                  <View style={{marginBottom:rh(1), padding:rw(3), backgroundColor:"white", borderRadius:10}}>
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
                  
             </View>
           </ScrollView>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'green',
    },
    successContainer:{
        height:rh(25),
        backgroundColor:"green",
    },
    detailsContainer:{
      // height:rh(75),
      backgroundColor:"white",
      borderTopLeftRadius:30,
      borderTopRightRadius:30,
      backgroundColor:"#F3F3F3",  
      paddingHorizontal:rw(3),
      paddingVertical:rh(2),
      paddingBottom:rh(1)
    }
});

//make this component available to the app
export default OrderPlaced;



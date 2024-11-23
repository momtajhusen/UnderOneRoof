//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { rw, rh, rf } from '../../../Service/responsive';
import IconBtnList from '../../../components/List/IconBtnList';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import Header from '../../../components/header';

// create a component
const AccountMenuList = () => {

  const navigation = useNavigation();

    return (
        <View>
            <Header title="Help & Support" />
            <View style={styles.container}>
               <View style={{flexDirection:"row", alignItems:"center", gap:rw(5), marginBottom:rh(2)}}>
                   <Image source={require('../../../assets/support.png')} style={{width:rw(14), height:rw(14)}} />
                   <Text style={{fontSize:rf(2.5), fontWeight:"bold"}}>How can we assist {'\n'}you today?</Text>
               </View> 

               <View style={{gap:rh(1)}}>
                    <TouchableOpacity style={{flexDirection:"row", backgroundColor:"white", borderRadius:10, padding:10, alignItems:"center", justifyContent:"space-between"}}>
                       <View style={{flexDirection:"row", alignItems:"center"}}>
                            <MaterialIcons style={{color:"#FF9100", marginRight:rw(2)}} name="contact-support" size={40} color="black" />
                            <View>
                                <Text style={{fontWeight:"bold"}}>FAQs</Text>
                                <Text style={{color:"#717171"}}>Find answers to common questions</Text>
                            </View>
                        </View>
                        <MaterialIcons name="arrow-forward-ios" size={rf(2)} style={{color:"#717171"}}/>
                    </TouchableOpacity>

                    <TouchableOpacity style={{flexDirection:"row", backgroundColor:"white", borderRadius:10, padding:10, alignItems:"center", justifyContent:"space-between"}}>
                       <View style={{flexDirection:"row", alignItems:"center"}}>
                            <MaterialIcons style={{color:"#FF9100", marginRight:rw(2)}} name="mark-email-unread" size={40} color="black" />
                            <View>
                                <Text style={{fontWeight:"bold"}}>Email Us</Text>
                                <Text style={{width:rw(70), color:"#717171"}}>For detailed queries, drop us an email and we'll get back to you soon.</Text>
                            </View>
                        </View>
                        <MaterialIcons name="arrow-forward-ios" size={rf(2)} style={{color:"#717171"}}/>
                    </TouchableOpacity>

                    <TouchableOpacity style={{flexDirection:"row", backgroundColor:"white", borderRadius:10, padding:10, alignItems:"center", justifyContent:"space-between"}}>
                        <View style={{flexDirection:"row", alignItems:"center"}}>
                            <MaterialIcons style={{color:"#FF9100", marginRight:rw(2)}} name="wifi-calling-3" size={40} color="black" />
                            <View>
                                <Text style={{fontWeight:"bold"}}>FAQs</Text>
                                <Text style={{color:"#717171", width:rw(60)}}>Prefer to speak to us directly? Give us a call</Text>
                            </View>
                        </View>
                        <MaterialIcons name="arrow-forward-ios" size={rf(2)} style={{color:"#717171"}}/>
                    </TouchableOpacity>

               </View>
            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        paddingHorizontal:rw(4),
        paddingVertical:rh(1),
        borderRadius:10,
        marginTop:rh(1.5)
    },
});

//make this component available to the app
export default AccountMenuList;

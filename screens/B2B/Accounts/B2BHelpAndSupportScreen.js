//import liraries
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Linking } from 'react-native';
import { rw, rh, rf } from '../../../Service/responsive';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import Header from '../../../components/header';
import apiClient from '../../../Service/apiClient';

// create a component
const B2BHelpAndSupport = ({navigation}) => {

  const [supportEmail, setSupportEmail] = useState(null);
  const [supportNumber, setSupportNumber] = useState(null);


      // Fetch profile data from API
    const supportEmailRequest = async () => {
        try {
        const responseEmail = await apiClient.get('/support_email');
        const responseNumber = await apiClient.get('/support_mobile');

        setSupportEmail(responseEmail.data.data.support.email);
        setSupportNumber(responseNumber.data.data.support.mobile);
        } catch (error) {
        console.error('Error fetching profile data:', error);
        } finally {
        setLoading(false);
        }
    };

      // Email Open Function
        const openEmail = () => {
            const emailUrl = `mailto:${supportEmail}`;
            Linking.openURL(emailUrl).catch((err) => console.error("Could not open email", err));
        };

        // Call Open Function
        const openCall = () => {
            const callUrl = `tel:${supportNumber}`;
            Linking.openURL(callUrl).catch((err) => console.error("Could not open call", err));
        };


    useEffect(() => {
        supportEmailRequest();
      }, []);


    return (
        <View>
            <Header title="Help & Support" />
            <View style={styles.container}>
               <View style={{flexDirection:"row", alignItems:"center", gap:rw(5), marginBottom:rh(2)}}>
                   <Image source={require('../../../assets/support.png')} style={{width:rw(14), height:rw(14)}} />
                   <Text style={{fontSize:rf(2.5), fontWeight:"bold"}}>How can we assist {'\n'}you today?</Text>
               </View> 

               <View style={{gap:rh(1)}}>
                    <TouchableOpacity onPress={()=>navigation.navigate('FAQs')} style={{flexDirection:"row", backgroundColor:"white", borderRadius:10, padding:10, alignItems:"center", justifyContent:"space-between"}}>
                       <View style={{flexDirection:"row", alignItems:"center"}}>
                            <MaterialIcons style={{color:"#FF9100", marginRight:rw(2)}} name="contact-support" size={40} color="black" />
                            <View>
                                <Text style={{fontWeight:"bold"}}>FAQs</Text>
                                <Text style={{color:"#717171"}}>Find answers to common questions</Text>
                            </View>
                        </View>
                        <MaterialIcons name="arrow-forward-ios" size={rf(2)} style={{color:"#717171"}}/>
                    </TouchableOpacity>

                    {/* Email Support */}
                    <TouchableOpacity 
                        onPress={openEmail}
                        style={{
                        flexDirection: "row",
                        backgroundColor: "white",
                        borderRadius: 10,
                        padding: 10,
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: 10
                        }}
                    >
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <MaterialIcons style={{ color: "#FF9100", marginRight: 10 }} name="mark-email-unread" size={40} />
                        <View>
                            <Text style={{ fontWeight: "bold" }}>Email Us</Text>
                            <Text style={{ width: 200, color: "#717171" }}>
                            For detailed queries, drop us an email and we'll get back to you soon.
                            </Text>
                        </View>
                        </View>
                        <MaterialIcons name="arrow-forward-ios" size={20} style={{ color: "#717171" }} />
                    </TouchableOpacity>

                    {/* Call Support */}
                    <TouchableOpacity 
                        onPress={openCall}
                        style={{
                        flexDirection: "row",
                        backgroundColor: "white",
                        borderRadius: 10,
                        padding: 10,
                        alignItems: "center",
                        justifyContent: "space-between"
                        }}
                    >
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <MaterialIcons style={{ color: "#FF9100", marginRight: 10 }} name="wifi-calling-3" size={40} />
                        <View>
                            <Text style={{ fontWeight: "bold" }}>Call Us</Text>
                            <Text style={{ color: "#717171", width: 200 }}>
                            Prefer to speak to us directly? Give us a call.
                            </Text>
                        </View>
                        </View>
                        <MaterialIcons name="arrow-forward-ios" size={20} style={{ color: "#717171" }} />
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
export default B2BHelpAndSupport;

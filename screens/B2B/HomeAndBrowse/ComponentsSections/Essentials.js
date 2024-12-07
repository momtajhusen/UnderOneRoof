
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { rw, rh, rf } from '../../../../Service/themes/responsive';
 
const Essentials = () => {
    return (
        <View style={styles.container}>
            <View>
                <Text style={{position:"absolute", left:"33%", top:rh(0.5), zIndex:100, color:"#FF9100", fontSize:rf(2.5), fontWeight:"bold"}}>Essentials</Text>
                <Image source={require('../../../../assets/Rectangle 27.png')} style={styles.image} />
                <View style={{position:"absolute", gap:rh(1), top:"10%",  width:rw(90), paddingHorizontal:rw(2)}}>
                    {/* List Items  */}
                    <View style={{flexDirection:"row", gap:20}}>
                        <View style={{width:rw(25), justifyContent:"center", alignItems:"center"}}>
                            <View style={{backgroundColor:"#FFFFFF", width:rw(25), height:rh(11), justifyContent:"centre", alignItems:"center", borderRadius:10}}>
                                <Image source={require('../../../../assets/items/image3.png')} style={{width:rw(18), height:rw(20), marginTop:rh(1)}} ></Image>
                            </View>
                            <Text style={{textAlign:"center", marginTop:rh(0.5), fontSize:rf(1.8), fontWeight:"500"}}>Surface Cleaners</Text>
                        </View>
                        <View style={{width:rw(25), justifyContent:"center", alignItems:"center"}}>
                            <View style={{backgroundColor:"#FFFFFF", width:rw(25), height:rh(11), justifyContent:"centre", alignItems:"center", borderRadius:10}}>
                                <Image source={require('../../../../assets/items/image34.png')} style={{width:rw(18), height:rw(20), marginTop:rh(1)}} ></Image>
                            </View>
                            <Text style={{textAlign:"center", marginTop:rh(0.5), fontSize:rf(1.8), fontWeight:"500"}}>Dishwashing Liquids</Text>
                        </View>
                        <View style={{width:rw(25), justifyContent:"center", alignItems:"center"}}>
                            <View style={{backgroundColor:"#FFFFFF", width:rw(25), height:rh(11), justifyContent:"centre", alignItems:"center", borderRadius:10}}>
                                <Image source={require('../../../../assets/items/image4543.png')} style={{width:rw(18), height:rw(20), marginTop:rh(1)}} ></Image>
                            </View>
                            <Text style={{textAlign:"center", marginTop:rh(0.5), fontSize:rf(1.8), fontWeight:"500"}}>Glass Cleaners</Text>
                        </View>
                    </View>

                    {/* container List Items  */}
                    <View style={{flexDirection:"row", justifyContent:"center", marginTop:10, gap:20}}>
                      <View style={{width:"45%", justifyContent:"center"}}>
                        <View style={{backgroundColor:"#FFFFFF", justifyContent:"center", alignItems:"center", borderRadius:10}}>
                           <Image source={require('../../../../assets/items/image322.png')} style={{width:rw(35), height:rw(25), marginTop:rh(1)}} />
                        </View>
                        <Text style={{textAlign:"center", marginTop:rh(1), fontSize:rf(1.8), fontWeight:"500"}}>Laundry Detergents</Text>
                      </View>
                      <View style={{width:"45%", justifyContent:"center"}}>
                        <View style={{backgroundColor:"#FFFFFF", justifyContent:"center", alignItems:"center", borderRadius:10}}>
                           <Image source={require('../../../../assets/items/image345.png')} style={{width:rw(35), height:rw(25), marginTop:rh(1)}} />
                        </View>
                        <Text style={{textAlign:"center", marginTop:rh(1), fontSize:rf(1.8), fontWeight:"500"}}>Cleaning Tools</Text>
                      </View>
                    </View>

 
                </View>
            </View>
        </View>
    );
};

 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: rw(90), 
        height: rw(90),  
        resizeMode: 'cover',  
    },
});

 
export default Essentials;

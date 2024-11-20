//import liraries
import React, { useEffect } from 'react';
import { View, Text,  Image, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import { rw, rh } from '../../Service/responsive';

// create a component
const SplashScreen = () => {
    const navigation = useNavigation();

    useEffect(() => {
        setTimeout(() => {
            navigation.replace('SignupOrLogin');
          }, 3000);
    }, []);

    return (
        <View  style={styles.container}>
            <Animatable.Image
                animation="zoomIn"
                source={require('../../assets/auth/image 45.png')}
                style={styles.logo}
                resizeMode="contain"
            />
        </View>
    );
};
 
//make this component available to the app
export default SplashScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:"yellow",
    },
    logo: {
      width: rw(60),  // Adjusted width for responsiveness
      height: rh(30), // Adjusted height for responsiveness
    },
  });

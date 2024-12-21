//import libraries
import React, { useEffect } from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import { rw, rh } from '../../../Service/responsive';
import AsyncStorage from '@react-native-async-storage/async-storage';

// create a component
const SplashScreen = () => {
    const navigation = useNavigation();

    useEffect(() => {
        const checkAuthToken = async () => {
            try {
                const token = await AsyncStorage.getItem('authToken');
                const ShoppingMode = await AsyncStorage.getItem('ShoppingMode');
                setTimeout(() => {
                    if (token) {
                        if (ShoppingMode === 'wholesale') {
                            navigation.replace('B2BBottomNavigator');
                        } else if (ShoppingMode === 'retail') {
                            navigation.replace('BottomNavigator');
                        } else {
                            navigation.replace('ShoppingMode');
                        }
                    } else {
                        navigation.replace('SignupOrLogin');
                    }
                }, 3000);
            } catch (error) {
                console.error("Error reading token:", error);
            }
        };

        checkAuthToken();
    }, [navigation]);

    useEffect(() => {
        StatusBar.setBackgroundColor("yellow");
    }, []);

    return (
        <View style={styles.container}>
            <Animatable.Image
                animation="zoomIn"
                delay={20}
                source={require('../../../assets/auth/logo.png')}
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
        backgroundColor: "yellow",
    },
    logo: {
        width: rw(60),
        height: rh(30),
    },
});

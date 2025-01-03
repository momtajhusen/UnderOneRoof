import React, { useEffect, useContext } from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import { rw, rh } from '../../../Service/responsive';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppContext } from '../../../context/AppContext';

const SplashScreen = () => {
    const navigation = useNavigation();
    const { state, dispatch } = useContext(AppContext);

 
    useEffect(() => {
        const checkAuthToken = async () => {
            try {
                const token = await AsyncStorage.getItem('authToken');
                const userId = await AsyncStorage.getItem('userId');
                const userNumber = await AsyncStorage.getItem('userNumber');
                const ShoppingMode = await AsyncStorage.getItem('ShoppingMode');

                setTimeout(() => {
                    if (token) {

                        // if (ShoppingMode === 'wholesale') {
                            navigation.replace('ShoppingMode', { mobile: userNumber, userId: userId });
                        // } else if (ShoppingMode === 'retail') {
                        //     navigation.replace('BottomNavigator');
                        // } else {
                        //     navigation.replace('ShoppingMode');
                        // }


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
        // Retrieve selected address from AsyncStorage
        const getSelectedAddress = async () => {
            try {
                const storedAddress = await AsyncStorage.getItem('selectedAddress');
                if (storedAddress) {
                    const item = JSON.parse(storedAddress);
                    // Dispatch the selected address data to the app context
                    dispatch({
                        type: 'SELECT_ADDRESS_DATA',
                        payload: { selectAddressData: item },
                    });
                }
            } catch (error) {
                console.error("Error retrieving selected address:", error);
            }
        };

        getSelectedAddress();
    }, [dispatch]);

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

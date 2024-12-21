import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ActivityIndicator } from 'react-native';
import { rw, rh, rf } from '../../../Service/responsive';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { useFocusEffect } from "@react-navigation/native";
import apiClient from '../../../Service/apiClient';  
import AsyncStorage from '@react-native-async-storage/async-storage';


const ShoppingMode = ({ navigation, route }) => {
  const { mobile } = route.params;
  const [loadingType, setLoadingType] = useState(null); // State to manage loading

  useFocusEffect(() => {
    StatusBar.setBackgroundColor('#f3f3f3');  
  });

  const handleModeSelect = async (type) => {
    setLoadingType(type); // Set the loading state for the selected type
    try {
      const response = await apiClient.post('/selectFlow', { mobile, type });
      console.log(response.data);
      if (response.data.status === 1) {
        if (type === 'wholesale') {
          await AsyncStorage.setItem('ShoppingMode',  'wholesale');
          navigation.navigate('RegistrationOwnerScreen', {mobile: mobile});
        } else if (type === 'retail') {
          await AsyncStorage.setItem('ShoppingMode',  'retail');
          navigation.navigate('BottomNavigator');
        }
      } else {
        alert(response.data.msg || 'Something went wrong!');
      }
    } catch (error) {
      console.error(error);
      alert('Failed to select shopping mode. Please try again.');
    } finally {
      setLoadingType(null); // Reset the loading state
    }
  };

  return (
    <View style={styles.container}>
      {/* Title and Description */}
      <View>
        <Text style={styles.titleText}>Choose Your Shopping Mode</Text>
        <Text style={styles.descriptionText}>
          Select how you'd like to shop: buy in bulk for your business or choose everyday items for personal use.
        </Text>
      </View>

      {/* Shopping Mode Options */}
      <View style={styles.optionsContainer}>
        {/* Wholesale Mode */}
        <TouchableOpacity onPress={() => handleModeSelect('wholesale')}>
          <LinearGradient
            colors={['#FFF0DC', '#FFFFFF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.listContainer}
          >
            <View style={styles.iconRow}>
              <Animatable.View animation="fadeInLeft" duration={800} delay={20}>
                <MaterialIcons name="storefront" size={rf(5)} style={{ color: "#FF9100" }} />
              </Animatable.View>
              {loadingType === 'wholesale' ? (
                <ActivityIndicator size="small" color="#000000" />
              ) : (
                <MaterialIcons name="arrow-forward" size={rf(3)} style={{ color: "#000000" }} />
              )}
            </View>
            <Text style={styles.listTitle}>Wholesale for Businesses</Text>
            <Text style={styles.listDescription}>
              Buy large quantities at lower prices, just for businesses!
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Retail Mode */}
        <TouchableOpacity onPress={() => handleModeSelect('retail')}>
          <LinearGradient
            colors={['#FFDCDC', '#FFFFFF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.listContainer}
          >
            <View style={styles.iconRow}>
              <Animatable.View animation="fadeInLeft" duration={800} delay={20}>
                <MaterialCommunityIcons name="cart" size={rf(5)} style={{ color: "#FF5454" }} />
              </Animatable.View>
              {loadingType === 'retail' ? (
                <ActivityIndicator size="small" color="#000000" />
              ) : (
                <MaterialIcons name="arrow-forward" size={rf(3)} />
              )}
            </View>
            <Text style={styles.listTitle}>Shop Retail Items</Text>
            <Text style={styles.listDescription}>
              Shop everyday items for your home and personal use, one at a time!
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ShoppingMode;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: rh(5)
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: rf(2.5),
    color: '#272727',
  },
  descriptionText: {
    marginTop: rh(1),
    color: '#717171',
  },
  optionsContainer: {
    marginTop: rh(2),
  },
  listContainer: {
    padding: 10,
    marginVertical: rh(1),
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    overflow: "hidden",
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: rh(1),
  },
  listTitle: {
    fontSize: rf(2.5),
    fontWeight: 'bold',
    color: '#272727',
  },
  listDescription: {
    fontSize: rf(2.2),
    color: '#717171',
    marginTop: rh(0.5)
  },
});

import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { rw, rh, rf } from '../../../Service/responsive';
import OrderOrWishlist from './AccountComponents/OrderOrWishlist';
import AccountMenuList from './AccountComponents/AccountMenuList';
import Header from '../../../components/header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppContext } from '../../../context/AppContext';
import apiClient from '../../../Service/apiClient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import { LinearGradient } from 'expo-linear-gradient';

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const AccountScreen = ({ navigation }) => {
  const { state } = useContext(AppContext);

  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isScreenLoaded, setIsScreenLoaded] = useState(false); // New state to track screen load

  useEffect(() => {
    const checkAuthToken = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        console.log('User Token:', token);
      } catch (error) {
        console.error('Error reading token:', error);
      }
    };
    checkAuthToken();
  }, [navigation]);

  // Fetch profile data from API
  const fetchProfileData = async () => {
    try {
      const response = await apiClient.get('/viewprofile');
      console.log(response.data);
      setProfileData(response.data.data.viewProfile);
    } catch (error) {
      console.error('Error fetching profile data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Trigger API call only after screen is fully loaded
  useEffect(() => {
      fetchProfileData();
  }, [state.reFresh]);

  // Set `isScreenLoaded` to true after screen rendering
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsScreenLoaded(true);
    }, 0); // Ensure slight delay for rendering
    return () => clearTimeout(timer);
  }, []);

  return (
    <View>
      <Header />
      <ScrollView>
        <View style={styles.container}>
          {/* Account Profile */}
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ marginRight: rw(3) }}>
              {loading ? (
                <ShimmerPlaceholder
                  style={{
                    width: rw(15),
                    height: rw(15),
                    borderRadius: 10,
                  }}
                />
              ) : (
                <Image
                  source={
                    profileData?.avatar
                      ? { uri: profileData.avatar }
                      : require('../../../assets/account/user.png')
                  }
                  style={{ width: rw(15), height: rw(15), borderRadius: 10 }}
                />
              )}
            </View>
            <View>
              {loading ? (
                <>
                  <ShimmerPlaceholder
                    style={{
                      width: rw(40),
                      height: rh(2.5),
                      marginBottom: rh(0.5),
                    }}
                  />
                  <ShimmerPlaceholder
                    style={{ width: rw(30), height: rh(2) }}
                  />
                </>
              ) : (
                <>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: rf(2.5),
                      marginBottom: rh(0.3),
                    }}
                  >
                    {profileData?.name || 'N/A'}
                  </Text>
                  <Text style={{ fontSize: rf(2), color: '#717171' }}>
                    {profileData?.mobile || 'N/A'}
                  </Text>
                </>
              )}
            </View>
          </View>
          {/* Order Or Wishlist */}
          <View>
            <OrderOrWishlist
              onPressOrder={() => navigation.navigate('Orders')}
              onPressWishlist={() => navigation.navigate('Wishlist')}
            />
          </View>
          {/* Account Menu List */}
          <View>
            <AccountMenuList />
            <Text
              style={{
                textAlign: 'center',
                marginTop: rh(3),
                fontSize: rf(2),
                color: '#717171',
              }}
            >
              V5.54
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default AccountScreen;


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: rw(4),
    marginTop: rh(1),
  },
});

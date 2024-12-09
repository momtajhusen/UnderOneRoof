//import liraries
import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomNavigator from './BottomNavigation';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SplashScreen from '../screens/B2C/Auth/splash';
import HomeScreen from '../screens/B2C/HomeAndBrowse/HomeScreen';
import CategoryScreen from '../screens/B2C/Categorys/CategorysScreen';
import CartScreen from '../screens/B2C/Cart&Checkout/CartScreen';
import AccountScreen from '../screens/B2C/Accounts/AccountScreen';
import SignupOrLogin from '../screens/B2C/Auth/SignupOrLogin';
import VerifyOtp from '../screens/B2C/Auth/VerifyOtp';
import ShoppingMode from '../screens/B2C/Auth/ShoppingMode';
import AddressBook from '../screens/B2C/Cart&Checkout/CartComponents/AddressBook';
import HelpSupport from '../screens/B2C/Accounts/AccountComponents/HelpSupport';
import TermsConditions from '../screens/B2C/Accounts/AccountComponents/TermsConditions';
import PrivacyPolicy from '../screens/B2C/Accounts/AccountComponents/PrivacyPolicy';
import Checkout from '../screens/B2C/Cart&Checkout/CartComponents/Checkout';
import OrderPlaced from '../screens/B2C/Cart&Checkout/CartComponents/OrderPlaced';
import SearchScreen from '../screens/B2C/Cart&Checkout/CartComponents/SearchScreen';
import Orders from '../screens/B2C/Accounts/AccountComponents/Orders';
import B2BOrders from '../screens/B2B/Accounts/B2BOrders';
import Wishlist from '../screens/B2C/Accounts/AccountComponents/Wishlist';
import MyProfile from '../screens/B2C/Accounts/AccountComponents/MyProfile';
import ProductListing from '../screens/B2C/HomeAndBrowse/HomeComponents/ProductListing';
import B2BProductListing from '../screens/B2B/HomeAndBrowse/B2BProductList';
import ProductDetail from '../screens/B2C/HomeAndBrowse/HomeComponents/ProductDetail';
import AllRating from '../screens/B2C/HomeAndBrowse/HomeComponents/AllRating';
import OrderDetails from '../screens/B2C/Accounts/AccountComponents/OrdersDetail';
import RatingAndReviews from '../screens/B2C/Accounts/AccountComponents/RatingAndReviews';
import EditAddress from '../screens/B2C/Accounts/AccountComponents/EditAddress';
import FAQs from '../screens/B2C/Accounts/AccountComponents/FAQs';



// B2B Navigation 
import RegistrationOwnerScreen from '../screens/B2B/Registration/RegistrationOwnerScreen';
import OutletDetailsScreen from '../screens/B2B/Registration/OutletDetailsScreen';
import BusinessDetails from '../screens/B2B/Registration/BusinessDetails';
import B2BAddressBook from '../screens/B2B/Accounts/B2BAddressBooksScreen';
import B2BRatingAndReviews from '../screens/B2B/Accounts/B2BRatingsAndReviewsScreen';
import B2BBottomNavigator from './B2BBottomNavigation'; 
import B2BSearchScreen from '../screens/B2B/HomeAndBrowse/B2BSearchScreen';
import B2BOrderDetails from '../screens/B2B/Accounts/B2BOrdersDetailsScreen';
import B2BEditAddress from '../screens/B2B/Accounts/B2BAddressEditScreen';
import B2BMyProfile from '../screens/B2B/Accounts/B2BMyProfileScreen';
import B2BHelpAndSupport from '../screens/B2B/Accounts/B2BHelpAndSupportScreen';
import B2BPrivacyPolicy from '../screens/B2B/Accounts/B2BPrivacyPolicy';
import B2BTermsConditions from '../screens/B2B/Accounts/B2BTermsConditions';
import B2BRequestProductsScreen from '../screens/B2B/Accounts/B2BRequestProductsScreen';
import B2BSelectAddressScreen from '../screens/B2B/CartAndCheckout/B2BSelectAddressScreen';
import B2BCheckOutScreen from '../screens/B2B/CartAndCheckout/B2BCheckOutScreen';
import B2BOrderPlaced from '../screens/B2B/CartAndCheckout/B2BOrderPlacedScreen';
import B2BProceedDetails from '../screens/B2B/HomeAndBrowse/B2BProductDetails';

const Stack = createNativeStackNavigator();

// create a component
const StackNavigation = () => {

    const navigation = useNavigation();
  
    return (
        <Stack.Navigator> 


        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="BottomNavigator" component={BottomNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="B2BBottomNavigator" component={B2BBottomNavigator} options={{ headerShown: false }} />


        {/* Screen navigation  */}
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CategoryScreen" component={CategoryScreen} />
        <Stack.Screen name="CartScreen" component={CartScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AccountScreen" component={AccountScreen} options={{ headerShown: false }} />
        {/* Auth navigation  */}
        <Stack.Screen name="SignupOrLogin" component={SignupOrLogin} options={{ headerShown: false }} />
        <Stack.Screen name="VerifyOtp" component={VerifyOtp} options={{ headerShown: false }} />
        <Stack.Screen name="ShoppingMode" component={ShoppingMode} options={{ headerShown: false }} />
        
        <Stack.Screen name="AddressBook" component={AddressBook} options={{ headerShown: false }} />
        <Stack.Screen name="HelpSupport" component={HelpSupport} options={{ headerShown: false }} />
        <Stack.Screen name="TermsConditions" component={TermsConditions} options={{ headerShown: false }} />
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} options={{ headerShown: false }} />

        <Stack.Screen name="Checkout" component={Checkout} options={{ headerShown: false }} />
        <Stack.Screen name="OrderPlaced" component={OrderPlaced} options={{ headerShown: false }} />
        <Stack.Screen name="SearchScreen" component={SearchScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Orders" component={Orders} options={{ headerShown: false }} />
        <Stack.Screen name="Wishlist" component={Wishlist} options={{ headerShown: false }} />
        <Stack.Screen name="MyProfile" component={MyProfile} options={{ headerShown: false }} />
        <Stack.Screen name="ProductListing" component={ProductListing} options={{ headerShown: false }} />
        <Stack.Screen name="ProductDetail" component={ProductDetail} options={{ headerShown: false }} />
        <Stack.Screen name="AllRating" component={AllRating} options={{ headerShown: false }} />
        <Stack.Screen name="OrderDetails" component={OrderDetails} options={{ headerShown: false }} />
        <Stack.Screen name="RatingAndReviews" component={RatingAndReviews} options={{ headerShown: false }} />
        <Stack.Screen name="EditAddress" component={EditAddress} options={{ headerShown: false }} />
        <Stack.Screen name="FAQs" component={FAQs} options={{ headerShown: false }} />

        {/*  B2B Navigation  */}
        <Stack.Screen name="RegistrationOwnerScreen" component={RegistrationOwnerScreen} options={{ headerShown: false }} />
        <Stack.Screen name="OutletDetailsScreen" component={OutletDetailsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="BusinessDetails" component={BusinessDetails} options={{ headerShown: false }} />
        <Stack.Screen name="B2BProductListing" component={B2BProductListing} options={{ headerShown: false }} />
        <Stack.Screen name="B2BSearchScreen" component={B2BSearchScreen} options={{ headerShown: false }} />
        <Stack.Screen name="B2BOrders" component={B2BOrders} options={{ headerShown: false }} />
        <Stack.Screen name="B2BOrderDetails" component={B2BOrderDetails} options={{ headerShown: false }} />
        <Stack.Screen name="B2BAddressBook" component={B2BAddressBook} options={{ headerShown: false }} />
        <Stack.Screen name="B2BEditAddress" component={B2BEditAddress} options={{ headerShown: false }} />
        <Stack.Screen name="B2BRatingAndReviews" component={B2BRatingAndReviews} options={{ headerShown: false }} />
        <Stack.Screen name="B2BMyProfile" component={B2BMyProfile} options={{ headerShown: false }} />
        <Stack.Screen name="B2BHelpAndSupport" component={B2BHelpAndSupport} options={{ headerShown: false }} />
        <Stack.Screen name="B2BPrivacyPolicy" component={B2BPrivacyPolicy} options={{ headerShown: false }} />
        <Stack.Screen name="B2BTermsConditions" component={B2BTermsConditions} options={{ headerShown: false }} />
        <Stack.Screen name="B2BRequestProductsScreen" component={B2BRequestProductsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="B2BSelectAddressScreen" component={B2BSelectAddressScreen} options={{ headerShown: false }} />
        <Stack.Screen name="B2BCheckOutScreen" component={B2BCheckOutScreen} options={{ headerShown: false }} />
        <Stack.Screen name="B2BOrderPlaced" component={B2BOrderPlaced} options={{ headerShown: false }} />
        <Stack.Screen name="B2BProceedDetails" component={B2BProceedDetails} options={{ headerShown: false }} />
        

        
     </Stack.Navigator>
    );
};

//make this component available to the app
export default StackNavigation;

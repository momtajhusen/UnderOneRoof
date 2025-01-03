// Import libraries
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { rw, rh } from '../../../../Service/responsive';
import IconBtnList from '../../../../components/List/IconBtnList';
import { useNavigation } from '@react-navigation/native';
import LogOutAlert from '../../../../components/PopupModal/LogoutAlert';
import DeleteAccountAlert from '../../../../components/PopupModal/DeleteAccountAlert';

// Create the component
const B2BAccountMenuList = () => {
  const [isModalVisibleLogOut, setIsModalVisibleLogOut] = useState(false);
  const [isModalVisibleDeleteAccount, setIsModalVisibleDeleteAccount] = useState(false);

  const navigation = useNavigation();

  // Toggle modal visibility for Log Out
  const toggleLogOutAlertModal = () => {
    setIsModalVisibleLogOut(!isModalVisibleLogOut);
  };

  // Toggle modal visibility for Delete Account
  const toggleDeleteAccountAlertModal = () => {
    setIsModalVisibleDeleteAccount(!isModalVisibleDeleteAccount);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Other Information</Text>
      <View style={styles.menuList}>
      <IconBtnList ListStyle={{borderRadius:10, marginBottom:5 }} icon={require('../../../../assets/bag-2.png')} onPress={() => navigation.navigate('Orders')} text="Orders" />
        <IconBtnList ListStyle={{borderRadius:10, marginBottom:5 }} icon={require('../../../../assets/account/user.png')} onPress={() => navigation.navigate('B2BMyProfile')} text="Your Profile" />
        <IconBtnList ListStyle={{borderRadius:10, marginBottom:5 }} icon={require('../../../../assets/account/location.png')} onPress={() => navigation.navigate('AddressBook')} text="Address Book" />
        <IconBtnList ListStyle={{borderRadius:10, marginBottom:5 }} icon={require('../../../../assets/account/sms-search.png')} onPress={() => navigation.navigate('B2BRequestProductsScreen')} text="Request Product" />
        <IconBtnList ListStyle={{borderRadius:10, marginBottom:5 }} icon={require('../../../../assets/account/HelpCircle.png')} onPress={() => navigation.navigate('B2BHelpAndSupport')} text="Help & Support" />
        <IconBtnList ListStyle={{borderRadius:10, marginBottom:5 }} icon={require('../../../../assets/account/Group26.png')} onPress={() => navigation.navigate('B2BTermsConditions')} text="Terms & Conditions" />
        <IconBtnList ListStyle={{borderRadius:10, marginBottom:5 }} iconImageStyle={{width:rw(4), height:rw(5)}} icon={require('../../../../assets/account/Group.png')} onPress={() => navigation.navigate('B2BPrivacyPolicy')} text="Privacy Policy" />
        
        {/* Delete Account Button */}
        <IconBtnList ListStyle={{borderRadius:10, marginBottom:5 }} icon={require('../../../../assets/account/user-remove.png')}text="Delete Account" onPress={toggleDeleteAccountAlertModal} />

        {/* Logout Button */}
        <IconBtnList ListStyle={{borderRadius:10, marginBottom:5 }} icon={require('../../../../assets/account/Power.png')} text="Logout" onPress={toggleLogOutAlertModal} />
      </View>

      {/* Show the LogOut Alert Modal */}
      <LogOutAlert isModalVisible={isModalVisibleLogOut} toggleModal={toggleLogOutAlertModal} />

      {/* Show the Delete Account Alert Modal */}
      <DeleteAccountAlert isModalVisible={isModalVisibleDeleteAccount} toggleModal={toggleDeleteAccountAlertModal} />
    </View>
  );
};

// Define styles
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: rw(1),
    paddingVertical: rh(1),
    borderRadius: 10,
    marginTop: rh(1.5),
  },
  headerText: {
    fontSize: rw(4),
    fontWeight: "bold",
    marginLeft: rw(3),
  },
  menuList: {
    paddingVertical: rh(1),
  },
});

// Make this component available to the app
export default B2BAccountMenuList;

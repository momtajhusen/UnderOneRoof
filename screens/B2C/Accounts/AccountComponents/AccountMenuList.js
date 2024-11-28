// Import libraries
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { rw, rh } from '../../../../Service/responsive';
import IconBtnList from '../../../../components/List/IconBtnList';
import { useNavigation } from '@react-navigation/native';
import LogOutAlert from '../../../../components/PopupModal/LogoutAlert';
import DeleteAccountAlert from '../../../../components/PopupModal/DeleteAccountAlert';

// Create the component
const AccountMenuList = () => {
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
        <IconBtnList icon={require('../../../../assets/account/user.png')} onPress={() => navigation.navigate('MyProfile')} text="Your Profile" />
        <IconBtnList icon={require('../../../../assets/account/location.png')} onPress={() => navigation.navigate('AddressBook')} text="Address Book" />
        <IconBtnList icon={require('../../../../assets/account/HelpCircle.png')} onPress={() => navigation.navigate('HelpSupport')} text="Help & Support" />
        <IconBtnList icon={require('../../../../assets/account/Group26.png')} onPress={() => navigation.navigate('TermsConditions')} text="Terms & Conditions" />
        <IconBtnList icon={require('../../../../assets/account/Group.png')} onPress={() => navigation.navigate('PrivacyPolicy')} text="Privacy Policy" />
        
        {/* Delete Account Button */}
        <IconBtnList icon={require('../../../../assets/account/user-remove.png')}text="Delete Account" onPress={toggleDeleteAccountAlertModal} />

        {/* Logout Button */}
        <IconBtnList icon={require('../../../../assets/account/Power.png')} text="Logout" onPress={toggleLogOutAlertModal} />
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
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginTop: rh(1.5),
  },
  headerText: {
    fontSize: rw(4.5),
    fontWeight: "bold",
    marginLeft: rw(3),
  },
  menuList: {
    paddingVertical: rh(1),
  },
});

// Make this component available to the app
export default AccountMenuList;

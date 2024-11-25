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
        <IconBtnList icon="person-outline" text="Your Profile" />
        <IconBtnList icon="fmd-good" onPress={() => navigation.navigate('AddressBook')} text="Address Book" />
        <IconBtnList icon="help-outline" onPress={() => navigation.navigate('HelpSupport')} text="Help & Support" />
        <IconBtnList icon="receipt-long" onPress={() => navigation.navigate('TermsConditions')} text="Terms & Conditions" />
        <IconBtnList icon="privacy-tip" onPress={() => navigation.navigate('PrivacyPolicy')} text="Privacy Policy" />
        
        {/* Delete Account Button */}
        <IconBtnList icon="person-remove" text="Delete Account" onPress={toggleDeleteAccountAlertModal} />

        {/* Logout Button */}
        <IconBtnList icon="logout" text="Logout" onPress={toggleLogOutAlertModal} />
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

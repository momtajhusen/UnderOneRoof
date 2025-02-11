//import libraries
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Linking } from 'react-native';
import { rw, rh, rf } from '../../../../Service/responsive';
import { MaterialIcons } from '@expo/vector-icons';
import Header from '../../../../components/header';
import apiClient from '../../../../Service/apiClient';

// create a component
const AccountMenuList = ({ navigation }) => {

  // Function to handle "Email Us" button press
  const handleEmailPress = async () => {
    try {
      const response = await apiClient.get('/support_email');
      if (response.data.status === 1) {
        const email = response.data.data.support.email;
        // Opens the default mail client with the support email address
        Linking.openURL(`mailto:${email}`);
      }
    } catch (error) {
      console.error("Error fetching support email:", error);
    }
  };

  // Function to handle "Call Us" button press
  const handleCallPress = async () => {
    try {
      const response = await apiClient.get('/support_mobile');
      if (response.data.status === 1) {
        const mobile = response.data.data.support.mobile;
        // Opens the phone dialer with the fetched mobile number
        Linking.openURL(`tel:${mobile}`);
      }
    } catch (error) {
      console.error("Error fetching support mobile:", error);
    }
  };

  return (
    <View>
      <Header title="Help & Support" />
      <View style={styles.container}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: rw(5), marginBottom: rh(2) }}>
          <Image source={require('../../../../assets/support.png')} style={{ width: rw(14), height: rw(14) }} />
          <Text style={{ fontSize: rf(2.5), fontWeight: "bold" }}>
            How can we assist{'\n'}you today?
          </Text>
        </View>

        <View style={{ gap: rh(1) }}>
          {/* FAQs Navigation */}
          <TouchableOpacity
            onPress={() => navigation.navigate('FAQs')}
            style={styles.menuItem}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialIcons style={{ color: "#FF9100", marginRight: rw(2) }} name="contact-support" size={40} />
              <View>
                <Text style={{ fontWeight: "bold" }}>FAQs</Text>
                <Text style={{ color: "#717171" }}>Find answers to common questions</Text>
              </View>
            </View>
            <MaterialIcons name="arrow-forward-ios" size={rf(2)} style={{ color: "#717171" }} />
          </TouchableOpacity>

          {/* Email Us - opens email client */}
          <TouchableOpacity
            onPress={handleEmailPress}
            style={styles.menuItem}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialIcons style={{ color: "#FF9100", marginRight: rw(2) }} name="mark-email-unread" size={40} />
              <View>
                <Text style={{ fontWeight: "bold" }}>Email Us</Text>
                <Text style={{ width: rw(70), color: "#717171" }}>
                  For detailed queries, drop us an email and we'll get back to you soon.
                </Text>
              </View>
            </View>
            <MaterialIcons name="arrow-forward-ios" size={rf(2)} style={{ color: "#717171" }} />
          </TouchableOpacity>

          {/* Call Us - opens phone dialer */}
          <TouchableOpacity
            onPress={handleCallPress}
            style={styles.menuItem}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialIcons style={{ color: "#FF9100", marginRight: rw(2) }} name="wifi-calling-3" size={40} />
              <View>
                <Text style={{ fontWeight: "bold" }}>Call Us</Text>
                <Text style={{ color: "#717171", width: rw(60) }}>
                  Prefer to speak to us directly? Give us a call
                </Text>
              </View>
            </View>
            <MaterialIcons name="arrow-forward-ios" size={rf(2)} style={{ color: "#717171" }} />
          </TouchableOpacity>

        </View>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: rw(4),
    paddingVertical: rh(1),
    borderRadius: 10,
    marginTop: rh(1.5),
  },
  menuItem: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
});

// make this component available to the app
export default AccountMenuList;

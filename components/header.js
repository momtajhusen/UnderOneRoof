// import libraries
import React from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { rw, rh, rf } from '../Service/responsive';

// create a component
const Header = ({ title = '', rightContent = null }) => {
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={['#FADFDF', '#F0F0F0']} // Gradient from red to white
      style={styles.gradientBackground}
    >
      {/* StatusBar */}
       <StatusBar barStyle="dark-content" backgroundColor="#FADFDF" />

      {/* Back Header */}
      <View style={styles.backHeader}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {/* Back Button */}
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={rf(3)} color="black" />
          </TouchableOpacity>
          {/* Header Title */}
          <Text style={styles.headerText}>{title}</Text>
        </View>
          {/* Right Section: Custom Content */}
        <View>
            {rightContent && <View style={styles.rightContent}>{rightContent}</View>}
        </View>
      </View>
    </LinearGradient>
  );
};

// define your styles
const styles = StyleSheet.create({
  gradientBackground: {
    width: '100%',
    paddingTop: rh(1), // Add padding for StatusBar
    paddingBottom: rh(2),
  },
  backHeader: {
    flexDirection: 'row',
    paddingHorizontal: rw(4),
    alignItems: 'center',
    justifyContent:"space-between",
  },
  headerText: {
    marginLeft: rw(2),
    fontSize: rw(4.5),
    fontWeight: 'bold',
    color: 'black',
  },
});

export default Header;

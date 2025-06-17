import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { rw, rh, rf } from '../Service/responsive';

const Header = ({ title = '', rightContent = null }) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  useFocusEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('transparent'); 
    }
  });

  return (
    <LinearGradient
      colors={['#f9caca', '#F0F0F0']} 
      style={[
        styles.gradientBackground,
        {
          paddingTop: insets.top + rh(1),
          paddingBottom: rh(2),
        },
      ]}
    >
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      <View style={styles.backHeader}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={rf(3)} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerText}>{title}</Text>
        </View>

        <View>{rightContent && <View style={styles.rightContent}>{rightContent}</View>}</View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientBackground: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#E9E9E9',
  },
  backHeader: {
    flexDirection: 'row',
    paddingHorizontal: rw(4),
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: rh(2),
  },
  headerText: {
    marginLeft: rw(2),
    fontSize: rw(4),
    fontWeight: 'bold',
    color: '#272727',
  },
  rightContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Header;

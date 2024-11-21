import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { rw, rh, rf } from '../../Service/responsive';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';


const ShoppingMode = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.replace('SignupOrLogin')}>
        <MaterialIcons 
          name="arrow-back" 
          size={22} 
          style={styles.backButton} 
        />
      </TouchableOpacity>

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

        {/* <TouchableOpacity 
          onPress={()=> navigation.navigate('BottomNavigator')}
          style={styles.listContainer}
        >
          <View style={styles.iconRow}>
            <MaterialIcons name="storefront" size={rf(5)} style={{color:"#FF9100"}} />
            <MaterialIcons name="arrow-forward" size={rf(4)} style={{fontSize:rf(3)}} />
          </View>
          <Text style={styles.listTitle}>Wholesale for Businesses</Text>
          <Text style={styles.listDescription}>
            Buy large quantities at lower prices, just for businesses!
          </Text>
        </TouchableOpacity> */}

        <TouchableOpacity 
          onPress={()=> navigation.navigate('BottomNavigator')}
        >
            <LinearGradient
              colors={['#FFF0DC', '#FFFFFF']}  // Light beige to white gradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}  // Diagonal gradient from top-left to bottom-right
              style={styles.listContainer}
            >
              <View style={styles.iconRow}>
                <MaterialIcons name="storefront" size={rf(5)} style={{ color: "#FF9100" }} />
                <MaterialIcons name="arrow-forward" size={rf(4)} style={{ color: "#000000" }} />
              </View>
              <Text style={styles.listTitle}>Wholesale for Businesses</Text>
              <Text style={styles.listDescription}>
                Buy large quantities at lower prices, just for businesses!
              </Text>
            </LinearGradient>
          </TouchableOpacity>

        {/* Retail Mode */}
        <TouchableOpacity 
          onPress={()=> navigation.navigate('BottomNavigator')}
        >

          <LinearGradient
              colors={['#FFDCDC', '#FFFFFF']}  // Light beige to white gradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}  // Diagonal gradient from top-left to bottom-right
              style={styles.listContainer}
            >
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="cart" size={rf(5)} style={{color:"#FF5454"}} />
              <MaterialIcons name="arrow-forward" size={rf(4)} style={{fontSize:rf(3)}} />
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
  },
  backButton: {
    fontSize: rf(3),
    marginBottom: rh(1.5),
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
    padding:10,
    marginVertical: rh(1),
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 3,
    shadowRadius: 1.41,
    elevation: 2,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: rh(1),
  },
  icon: {
    color: '#4C4CDB',
  },
  listTitle: {
    fontSize: rf(2.5),
    fontWeight: 'bold',
    color: '#272727',
  },
  listDescription: {
    fontSize: rf(2.2),
    color: '#717171',
    marginTop:rh(0.5)
  },
});

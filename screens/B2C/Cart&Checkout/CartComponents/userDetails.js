import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { rw, rh, rf } from '../../../../Service/responsive';
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '../../../../context/AppContext';
import { Menu, MenuTrigger, MenuOptions, MenuOption } from 'react-native-popup-menu';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const UserDetails = ({ type, style, addresType = "Home", userData = [] }) => {
  const navigation = useNavigation();
  const { dispatch, state } = useContext(AppContext);

  const [selectedId, setSelectedId] = useState(null);

  // Set selectedId based on state.selectAddressData[0].aid
  useEffect(() => {
    if (state.selectAddressData.length > 0) {
      setSelectedId(state.selectAddressData[0].aid);
    }
  }, [state.selectAddressData]);

  // Function to handle Edit action
  const handleEdit = (item) => {
    alert(`Editing address of ${item.fname} ${item.lname}`);
  };

  // Function to handle Delete action
  const handleDelete = (item) => {
    alert(`Deleting address of ${item.fname} ${item.lname}`);
  };

  const handleAddressSelect = async (item) => {
    if (type === "view_all") {
      setSelectedId(selectedId === item.aid ? null : item.aid);

      dispatch({
        type: 'SELECT_ADDRESS_DATA',
        payload: { selectAddressData: item },
      });

      try {
        await AsyncStorage.setItem('selectedAddress', JSON.stringify(item));
        console.log("Address saved to local storage");
      } catch (error) {
        console.error("Error saving address to local storage", error);
      }
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      disabled={type === "selected_view"}
      style={[ 
        styles.container,
        style,
        type === "view_all" && styles.radioContainer,
        type === "selected_view" && styles.selectedViewContainer,
        selectedId === item.aid && styles.selectedCard,
      ]}
      onPress={() => handleAddressSelect(item)} 
    >
      <View style={styles.headerRow}>
        <View style={styles.locationContainer}>
          {type === "view_all" ? (
            <MaterialIcons
              name={selectedId === item.aid ? "radio-button-checked" : "radio-button-unchecked"}
              size={rw(6)}
              color={selectedId === item.aid ? "#FF3131" : "#717171"}
            />
          ) : (
            <Image
              source={require('../../../../assets/location-tick.png')}
              style={{ width: rw(6), height: rw(6), marginRight: rw(2) }}
            />
          )}
          {type !== "view_all" && <Text style={styles.boldText}>Delivery To:</Text>}
          <Text style={styles.locationText}>{addresType}</Text>
        </View>

        {/* More-Vert Icon and MenuTrigger */}
        {type === "view_all" && 
        <Menu>
          <MenuTrigger>
            <MaterialIcons name="more-vert" size={rw(6)} color="#717171" />
          </MenuTrigger>
          <MenuOptions>
            {/* Edit Option */}
            <MenuOption onSelect={() => handleEdit(item)}>
              <Text style={styles.menuOption}>Edit</Text>
            </MenuOption>
            {/* Delete Option */}
            <MenuOption onSelect={() => handleDelete(item)}>
              <Text style={styles.menuOption}>Delete</Text>
            </MenuOption>
          </MenuOptions>
        </Menu>
       }

        {type === "selected_change" && (
          <TouchableOpacity onPress={() => navigation.navigate("AddressBook")} style={{ paddingRight: rw(3) }}>
            <Text style={styles.changeText}>Change</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.userName}>
          {item.fname} {item.lname}
        </Text>
        <Text style={styles.address}>
          {item.address_line1}, {item.address_line2}, {item.city}, {item.state}, {item.pincode}, {item.country}
        </Text>
        <View style={styles.contactRow}>
          <Text style={styles.contactName}>Phone number:</Text>
          <Text style={styles.contactNumber}>
            {item.mobile_prefix} {item.mobile}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={userData}
      renderItem={renderItem}
      keyExtractor={(item) => item.aid.toString()}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "white",
    paddingHorizontal: rw(1),
    paddingVertical: rh(1),
    borderRadius: rw(5),
  },
  radioContainer: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  selectedCard: {
    backgroundColor: "#F9F9F9",
  },
  selectedViewContainer: {
    backgroundColor: "#F9F9F9",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: rw(1),
    paddingRight: rw(3),
  },
  locationText: {
    paddingHorizontal: rw(2),
    backgroundColor: "#E9E9E9",
    borderRadius: rw(1),
    color: "#4A4A4A",
    fontWeight: "bold",
  },
  boldText: {
    fontWeight: "bold",
    marginRight: rw(1),
  },
  changeText: {
    color: "#FF3131",
    fontWeight: "500",
    fontSize: rf(2),
  },
  detailsContainer: {
    paddingVertical: rh(0),
    paddingHorizontal: rw(8),
  },
  userName: {
    fontWeight: "bold",
    fontSize: rf(2),
    color: "#333",
    marginBottom: rh(0.5),
  },
  address: {
    fontSize: rf(1.8),
    color: "#717171",
    lineHeight: rh(2.5),
  },
  contactRow: {
    flexDirection: "row",
    marginTop: rh(1),
    alignItems: "center",
  },
  contactName: {
    fontWeight: "bold",
    color: "#333",
    marginRight: rw(2),
  },
  contactNumber: {
    color: "#717171",
    fontSize: rf(1.8),
  },
  menuOption: {
    padding: rw(2),
    fontSize: rf(2),
    color: "#333",
  },
});

export default UserDetails;

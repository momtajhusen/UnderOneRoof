import React, { useState } from 'react';
import {Text, View, StyleSheet, Button, Image, TouchableOpacity } from 'react-native';
import TextInputField from '../../../components/Inputs/TextInputField';
import SelectInputField from '../../../components/Inputs/SelectInputField';
import DateInputField from '../../../components/Inputs/DateInputField';
import Header from '../../../components/header';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { rw, rh, rf } from '../../../Service/responsive';


const B2BMyProfile = () => {
  const [name, setName] = useState('Aman Shukla');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState(null);
  const [address, setAddress] = useState('');

  return (
    <View>
        <Header title="My Profile" />
      <View style={styles.container}>

        <View style={styles.ImageContainer}>
          <Image style={styles.userImage} source={require('../../../assets/user.png')} />
            <TouchableOpacity style={styles.IconContainer}>
               <MaterialIcons style={styles.cameraIcon} name="photo-camera" size={18} color="black" />
            </TouchableOpacity>
          <Image style={styles.Rectangleprofile} source={require('../../../assets/Rectangleprofile.png')} />
          <View style={styles.inputContainer}>
                <TextInputField
                value={name}
                onChange={setName}
                placeholder="Enter your name"
              />

              <TextInputField
                value={phone}
                onChange={setPhone}
                placeholder="+91 - 1234567891"
                keyboardType="phone-pad"
              />

              <SelectInputField
                // label="Gender"
                selectedValue={gender}
                onValueChange={setGender}
                options={[
                  { label: 'Male', value: 'male' },
                  { label: 'Female', value: 'female' },
                  { label: 'Other', value: 'other' },
                ]}
              />

              <DateInputField
                date={dob}
                onChange={setDob}
              />

              <TextInputField
                  value={address}
                  onChange={setAddress}
                  placeholder="Address"
              />
          </View>
        </View>

        {/* <Button title="Update" onPress={() => console.log('Profile Updated')} /> */}

        <TouchableOpacity style={styles.updateBtn}>
            <Text style={{fontWeight:"bold", textAlign:"center", color:"white"}}>Update</Text>
        </TouchableOpacity>

      </View>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    height:rh(95),
    padding: 20,
    position:"relative",
    alignItems:"center",
  },
  Rectangleprofile:{
    width:rw(90),
    height:rh(53),
  },
  IconContainer:{
    color:"#FF9100", 
    marginRight:rw(2),
    position:"absolute",
    left:rw(32),
    top:rh(6),
    zIndex:100,
    borderWidth:2.5,
    borderColor:"white",
    backgroundColor:"#FFF4E6",
    padding:rw(1),
    borderRadius:20,
  },
  cameraIcon:{
    color:"#FF9100", 
  },
  userImage:{
    width:rw(19),
    height:rw(19),
    position:"absolute",
    left:rw(19),
    top:rh(1),
    zIndex:100,
  },
  inputContainer:{
    zIndex:100,
    width:rw(90),
    position:"absolute",
    top:rh(10),
    paddingHorizontal:rw(2)
  },
  updateBtn:{
    backgroundColor:"#FF3131",
    position:'absolute',
    bottom:0,
    width:rw(90),
    paddingVertical:rh(1.7),
    borderRadius:10,
    marginBottom:rh(5)
  }
});

export default B2BMyProfile;

import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import TextInputField from '../../../components/Inputs/TextInputField';
import SelectInputField from '../../../components/Inputs/SelectInputField';
import DateInputField from '../../../components/Inputs/DateInputField';
import Header from '../../../components/header';
import { MaterialIcons } from '@expo/vector-icons';
import { rw, rh, rf } from '../../../Service/responsive';
import apiClient from '../../../Service/apiClient';
import { AppContext } from '../../../context/AppContext';

const B2BMyProfile = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState(null);
  const [address, setAddress] = useState('');
  const [profileImage, setProfileImage] = useState(require('../../../assets/user.png'));

  const { state, dispatch } = useContext(AppContext);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get('/viewprofile');
        const profile = response.data.data.viewProfile;

        setName(profile.name || '');
        setPhone(profile.mobile || '');
        setGender(profile.gender || '');
        setAddress(profile.address || '');
        if (profile.image) {
          setProfileImage({ uri: profile.image });
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [state.reFresh]);

  const handleImagePick = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert('Permission Denied', 'You need to enable permissions to access the gallery.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        const selectedImage = result.assets[0];
        setProfileImage({ uri: selectedImage.uri });
        await uploadProfileImage(selectedImage.uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'An error occurred while selecting an image.');
    }
  };

  const uploadProfileImage = async (imageUri) => {
    try {
      const formData = new FormData();
 
      formData.append('itemimage', {
        uri: imageUri, 
        name: 'profile.jpg', 
        type: 'image/jpeg',
      });
  
      const response = await apiClient.post('/profileImageupdate', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log(response);
  
      if (response.status === 200) {
        Alert.alert('Success', 'Profile image updated successfully');
        dispatch({
          type: 'GLOBAL_REFRESH',
          payload: {
            reFresh: Math.ceil(Math.random() * 100),
          },
        });
      } else {
        Alert.alert('Error', 'Failed to update profile image');
      }
    } catch (error) {
      console.error('Error uploading profile image:', error);
      Alert.alert('Error', 'An error occurred while uploading the image.');
    }
  };
  

  const handleUpdate = async () => {
    try {
      const payload = {
        name,
        email: phone,
        gender,
        address,
      };

      const response = await apiClient.post('/updateProfile', payload);
      if (response.status === 200) {
        Alert.alert('Success', 'Profile updated successfully');
        dispatch({
          type: 'GLOBAL_REFRESH',
          payload: {
            reFresh: Math.ceil(Math.random() * 100),
          },
        });
      } else {
        Alert.alert('Error', 'Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', 'An error occurred while updating your profile.');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View>
      <Header title="My Profile" />
      <View style={styles.container}>
        <View style={styles.ImageContainer}>
          <Image style={styles.userImage} source={profileImage} />
          <TouchableOpacity style={styles.IconContainer} onPress={handleImagePick}>
            <MaterialIcons style={styles.cameraIcon} name="photo-camera" size={18} color="black" />
          </TouchableOpacity>
          <Image style={styles.Rectangleprofile} source={require('../../../assets/Rectangleprofile.png')} />
          <View style={styles.inputContainer}>
            <TextInputField
              value={name}
              onChange={(value) => setName(value)}
              placeholder="Enter your name"
            />
            <TextInputField
              value={phone}
              onChange={(value) => setPhone(value)}
              placeholder="Enter your phone"
              keyboardType="phone-pad"
            />
            <SelectInputField
              selectedValue={gender}
              onValueChange={(value) => setGender(value)}
              options={[
                { label: 'Male', value: 'male' },
                { label: 'Female', value: 'female' },
                { label: 'Other', value: 'other' },
              ]}
            />
            <DateInputField date={dob} onChange={(date) => setDob(date)} />
            <TextInputField
              value={address}
              onChange={(value) => setAddress(value)}
              placeholder="Enter your address"
            />
          </View>
        </View>
        <TouchableOpacity style={styles.updateBtn} onPress={handleUpdate}>
          <Text style={{ fontWeight: 'bold', textAlign: 'center', color: 'white' }}>Update</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: rh(95),
    padding: 20,
    position: 'relative',
    alignItems: 'center',
  },
  Rectangleprofile: {
    width: rw(90),
    height: rh(53),
  },
  IconContainer: {
    color: '#FF9100',
    marginRight: rw(2),
    position: 'absolute',
    left: rw(32),
    top: rh(6),
    zIndex: 100,
    borderWidth: 2.5,
    borderColor: 'white',
    backgroundColor: '#FFF4E6',
    padding: rw(1),
    borderRadius: 20,
  },
  cameraIcon: {
    color: '#FF9100',
  },
  userImage: {
    width: rw(19),
    height: rw(19),
    position: 'absolute',
    left: rw(19),
    top: rh(1),
    zIndex: 100,
    borderRadius: rw(19) / 2,
  },
  inputContainer: {
    zIndex: 100,
    width: rw(90),
    position: 'absolute',
    top: rh(10),
    paddingHorizontal: rw(2),
  },
  updateBtn: {
    backgroundColor: '#FF3131',
    position: 'absolute',
    bottom: 0,
    width: rw(90),
    paddingVertical: rh(1.7),
    borderRadius: 10,
    marginBottom: rh(5),
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default B2BMyProfile;

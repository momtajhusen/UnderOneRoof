import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { rw, rh, rf } from '../../../../Service/themes/responsive';
import apiClient from '../../../../Service/apiClient';
import { AppContext } from '../../../../context/AppContext';
import { useNavigation } from '@react-navigation/native';

const Essentials = () => {
  const { state, dispatch } = useContext(AppContext);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  // Fetch categories from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get('/home');
        const category = response.data.data.essentialcategory;
        setCategories(category);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [state.isHomeRefresh]);

  // Fallback check for missing data
  const getCategoryImage = (index) => categories[index]?.image || '../../../../assets/placeholder.png';
  const getCategoryName = (index) => categories[index]?.cname || 'No Name';

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View>
        <Text
          style={{
            position: 'absolute',
            left: '33%',
            top: rh(0.5),
            zIndex: 100,
            color: '#FF9100',
            fontSize: rf(2.5),
            fontWeight: 'bold',
          }}
        >
          Essentials
        </Text>
        <Image source={require('../../../../assets/Rectangle 27.png')} style={styles.image} />
        <View
          style={{
            position: 'absolute',
            gap: rh(1),
            top: '10%',
            width: rw(90),
            paddingHorizontal: rw(2),
          }}
        >
          {/* List Items */}
          <View style={{ flexDirection: 'row', gap: 20 }}>
            {[0, 1, 2].map((index) => (
              <TouchableOpacity
                key={index}
                style={{ width: rw(25), justifyContent: 'center', alignItems: 'center' }}
                onPress={() =>
                  navigation.navigate('ProductListing', {
                    selectCategoryId: categories[index]?.sid,
                    selectCategoryName: categories[index]?.cname,
                    selectCategorySlug: categories[index]?.cslug,
                  })
                }
              >
                <View
                  style={{
                    backgroundColor: '#FFFFFF',
                    width: rw(25),
                    height: rh(11),
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 10,
                  }}
                >
                  <Image
                    source={{ uri: getCategoryImage(index) }}
                    style={{ width: rw(18), height: rw(20), marginTop: rh(1) }}
                  />
                </View>
                <Text style={{ textAlign: 'center', marginTop: rh(0.5), fontSize: rf(1.8), fontWeight: '500' }}>
                  {getCategoryName(index)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Container List Items */}
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10, gap: 20 }}>
            {[3, 4].map((index) => (
              <TouchableOpacity
                key={index}
                style={{ width: '45%', justifyContent: 'center' }}
                onPress={() =>
                  navigation.navigate('ProductListing', {
                    selectCategoryId: categories[index]?.sid,
                    selectCategoryName: categories[index]?.cname,
                    selectCategorySlug: categories[index]?.cslug,
                  })
                }
              >
                <View
                  style={{
                    backgroundColor: '#FFFFFF',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 10,
                  }}
                >
                  <Image
                    source={{ uri: getCategoryImage(index) }}
                    style={{ width: rw(35), height: rw(25), marginTop: rh(1) }}
                  />
                </View>
                <Text style={{ textAlign: 'center', marginTop: rh(1), fontSize: rf(1.8), fontWeight: '500' }}>
                  {getCategoryName(index)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: rf(2),
    color: '#FF9100',
  },
  image: {
    width: rw(90),
    height: rw(90),
    resizeMode: 'cover',
  },
});

export default Essentials;

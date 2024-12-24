import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import CategoryList from '../../../components/List/CategoryList';
import { rw, rh, rf } from '../../../Service/responsive';
import Header from '../../../components/header';
import apiClient from '../../../Service/apiClient';

const CategoryScreen = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true); // loading state

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiClient.get('/allcategory');
        const category = response.data.data.category;
        setCategories(category);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false); // set loading to false after fetching
      }
    };

    fetchCategories();
  }, []);

  return (
    <View>
      {/* Back Container */}
      <Header
        title="Categories"
        rightContent={
          <View style={{ flexDirection: "row", gap: rw(4) }}>
            <TouchableOpacity>
              <Image source={require('../../../assets/Search.png')} style={{ width: rw(5.5), height: rw(5.5) }} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={require('../../../assets/Cart.png')} style={{ width: rw(5.5), height: rw(5.5) }} />
            </TouchableOpacity>
          </View>
        }
      />

      {/* Loading indicator */}
      {loading ? (
        <View style={styles.categoryListContainer}>
          {/* Dummy loading card */}
          <CategoryList
            cimage='' 
            text='Loading...'
          />
          <CategoryList
            cimage='' 
            text='Loading...'
          />
          <CategoryList
            cimage='' 
            text='Loading...'
          />
        </View>
      ) : (
        <View style={styles.categoryListContainer}>
          {categories.map((category, index) => (
            <Animatable.View
              key={category.sid}
              animation="fadeInUp"
              duration={800}
              delay={index * 20}
            >
              <CategoryList
                cimage={category.image}
                text={category.cname}
                onPress={() => navigation.navigate('ProductListing',
                  {
                    selectCategoryId: category.sid,
                    selectCategoryName: category.cname,
                    selectCategorySlug: category.cslug,
                  })}
              />
            </Animatable.View>
          ))}
        </View>
      )}
    </View>
  );
};

export default CategoryScreen;

const styles = StyleSheet.create({
  categoryListContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: rw(5),
    marginTop: rh(2),
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: '#0000ff',
  },
});

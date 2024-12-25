import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import CategoryList from '../../../components/List/CategoryList';
import { rw, rh } from '../../../Service/responsive';
import Header from '../../../components/header';
import apiClient from '../../../Service/apiClient';
import CategoryListLoader from '../../../components/ShimmerLoader/CategoryListLoader';

const CategoryScreen = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

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
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header Component */}
      <Header
        title="Categories"
        rightContent={
          <View style={styles.headerIcons}>
            <TouchableOpacity>
              <Image
                source={require('../../../assets/Search.png')}
                style={styles.icon}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={require('../../../assets/Cart.png')}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        }
      />

      <View style={{justifyContent:"center", alignItems:"center", paddingHorizontal:rw(3.9)}}>
        {/* Main Content */}
        {loading ? (
          // Shimmer Loaders while data is being fetched
          <View style={styles.categoryListContainer}>
            {Array.from({ length: 16 }).map((_, index) => (
              <CategoryListLoader key={index} />
            ))}
          </View>
        ) : (
          // Categories List after data is loaded
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
                  onPress={() =>
                    navigation.navigate('ProductListing', {
                      selectCategoryId: category.sid,
                      selectCategoryName: category.cname,
                      selectCategorySlug: category.cslug,
                    })
                  }
                />
              </Animatable.View>
            ))}
          </View>
        )}
      </View>

    </View>
  );
};

export default CategoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerIcons: {
    flexDirection: 'row',
    gap: rw(4),
  },
  icon: {
    width: rw(5.5),
    height: rw(5.5),
  },
  categoryListContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: rh(2),
  },
});

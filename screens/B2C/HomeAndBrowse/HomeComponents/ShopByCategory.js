import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CategoryList from '../../../../components/List/CategoryList';
import { rw, rf, rh } from '../../../../Service/responsive';
import { useNavigation } from '@react-navigation/native';
import apiClient from '../../../../Service/apiClient';
import CategoryListLoader from '../../../../components/ShimmerLoader/CategoryListLoader';
import { AppContext } from '../../../../context/AppContext';

const ShopByCategory = () => {
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const { state } = useContext(AppContext);

  const fetchHomeCategories = async () => {
    try {
      const response = await apiClient.get('/home');
      const category = response.data.data.category;

      // Filter home categories based on state.shoppingMode
      const filteredCategories = category.filter((cat) => {
        if (state.shoppingMode === 'wholesale') {
          return cat.role_type === 3 || cat.role_type === null;
        } else if (state.shoppingMode === 'retail') {
          return cat.role_type === 2;
        }
        return false;
      });

      setCategories(filteredCategories);
      console.log('Shop Category:', filteredCategories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories when the component mounts
  useEffect(() => {
    fetchHomeCategories();
  }, []);

  // Also re-fetch categories when state.isHomeRefresh changes (e.g., on pull-to-refresh)
  useEffect(() => {
    fetchHomeCategories();
  }, [state.isHomeRefresh]);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Shop By Category</Text>
      {loading ? (
        <View style={styles.categoryListContainer}>
          {Array.from({ length: 8 }).map((_, index) => (
            <CategoryListLoader key={index} />
          ))}
        </View>
      ) : (
        <View style={styles.categoryListContainer}>
          {categories.map((category) => (
            <CategoryList
              key={category.sid}
              cimage={category.image}
              text={category.cname}
              onPress={() => {
                navigation.navigate('ProductListing', {
                  selectCategoryId: category.sid,
                  selectCategoryName: category.cname,
                  selectCategorySlug: category.cslug,
                });
              }}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: rw(2),
    paddingLeft: rw(2),
  },
  headerText: {
    fontSize: rf(2),
    fontWeight: 'bold',
    marginBottom: rw(2),
    marginLeft: rw(2),
  },
  categoryListContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: rw(3),
  },
});

export default ShopByCategory;

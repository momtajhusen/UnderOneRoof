import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CategoryList from '../../../../components/List/CategoryList';  
import { rw, rf, rh } from '../../../../Service/responsive';
import { useNavigation } from '@react-navigation/native';
import apiClient from '../../../../Service/apiClient';  
import CategoryListLoader from '../../../../components/ShimmerLoader/CategoryListLoader';
import { AppContext } from '../../../../context/AppContext';

const BestSellers = () => {
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const { state } = useContext(AppContext);

  const fetchHomeCategories = async () => {
    try {
      const response = await apiClient.get('/home');  
      const bestCategories = response.data.data.bestcategory;

      // Filter best categories based on state.shoppingMode
      const filteredBestCategories = bestCategories.filter(category => {
        if (state.shoppingMode === 'wholesale') {
          return category.role_type === 3 || category.role_type === null;
        } else if (state.shoppingMode === 'retail') {
          return category.role_type === 2;
        }
        return false;
      });

      setCategories(filteredBestCategories);
      console.log('Shop Best Categories:', filteredBestCategories);
    } catch (error) {
      console.error('Error fetching best categories:', error);
    } finally {
      setLoading(false);  
    }
  };

  // Fetch categories on mount so they load immediately
  useEffect(() => {
    fetchHomeCategories();
  }, []);

  // Also re-fetch categories when state.isHomeRefresh changes (i.e., on pull-to-refresh)
  useEffect(() => {
    fetchHomeCategories();
  }, [state.isHomeRefresh]);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Bestsellers</Text>
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

export default BestSellers;

import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CategoryList from '../../../../components/List/CategoryList';  
import { rw, rf, rh } from '../../../../Service/responsive';
import { useNavigation } from '@react-navigation/native';
import CategoryListLoader from '../../../../components/ShimmerLoader/CategoryListLoader';
import { AppContext } from '../../../../context/AppContext';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import { LinearGradient } from 'expo-linear-gradient';

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const ShopByCategory = ({ data }) => {
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const { state } = useContext(AppContext);

  useEffect(() => {
    if (!data) {
      setLoading(true);
      return;
    }

    if (data && data.category && Array.isArray(data.category)) {
      if (data.category.length === 0) {
        setCategories([]);
        setLoading(false);
      } else {
        const filteredBestCategories = data.category.filter(category => {
          if (state.shoppingMode === 'wholesale') {
            return category.role_type === 3 || category.role_type === null;
          } else if (state.shoppingMode === 'retail') {
            return category.role_type === 2;
          }
          return false;
        });
        setCategories(filteredBestCategories);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [data, state.shoppingMode]);

  if (!loading && categories.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <ShimmerPlaceholder style={[styles.headerText, { width: '50%' }]} />
      ) : (
        <Text style={styles.headerText}>Shop By Category</Text>
      )}
      
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
  noDataContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: rh(5),
  },
  noDataText: {
    fontSize: rf(2),
    color: 'gray',
  },
});

export default ShopByCategory;

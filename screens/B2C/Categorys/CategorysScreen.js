import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, RefreshControl, FlatList } from 'react-native';
import * as Animatable from 'react-native-animatable';
import CategoryList from '../../../components/List/CategoryList';
import { rw, rh } from '../../../Service/responsive';
import Header from '../../../components/header';
import apiClient from '../../../Service/apiClient';
import CategoryListLoader from '../../../components/ShimmerLoader/CategoryListLoader';

const CategoryScreen = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Fetch categories from API
  const fetchCategories = async () => {
    try {
      const response = await apiClient.get('/allcategory');
      const category = response.data.data.category;
      setCategories(category);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
      setIsRefreshing(false); // Stop refresh animation
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const onRefresh = async () => {
    setIsRefreshing(true);
    await fetchCategories();
  };

  const renderCategory = ({ item, index }) => (
    <Animatable.View
      key={item.sid}
      animation="fadeInUp"
      duration={800}
      delay={index * 20}
    >
      <CategoryList
        cimage={item.image}
        text={item.cname}
        onPress={() =>
          navigation.navigate('ProductListing', {
            selectCategoryId: item.sid,
            selectCategoryName: item.cname,
            selectCategorySlug: item.cslug,
          })
        }
      />
    </Animatable.View>
  );

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

      <View style={{ justifyContent: "center", alignItems: "center", paddingHorizontal: rw(3.9) }}>
        {/* FlatList for Categories */}
        {loading ? (
          <View style={styles.categoryListContainer}>
            {Array.from({ length: 16 }).map((_, index) => (
              <CategoryListLoader key={index} />
            ))}
          </View>
        ) : (
          <FlatList
            data={categories}
            renderItem={renderCategory}
            keyExtractor={(item) => item.sid.toString()}
            numColumns={2}
            contentContainerStyle={styles.categoryListContainer}
            refreshControl={
              <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
            }
            showsVerticalScrollIndicator={false} 
            showsHorizontalScrollIndicator={false}  
          />
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
    paddingBottom:rh(7)
  },
});  

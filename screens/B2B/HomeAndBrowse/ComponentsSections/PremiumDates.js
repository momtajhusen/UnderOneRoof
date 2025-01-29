import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { rw, rh, rf } from '../../../../Service/themes/responsive';
import { AppContext } from '../../../../context/AppContext';
import apiClient from '../../../../Service/apiClient';
import { useNavigation } from '@react-navigation/native';

const DateCard = ({ name, image, category }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.dateCard}
      onPress={() =>
        navigation.navigate('ProductListing', {
          selectCategoryId: category.sid,
          selectCategoryName: category.cname,
          selectCategorySlug: category.cslug,
        })
      }
    >
      <Image source={{ uri: image }} style={styles.dateImage} accessibilityLabel={`Image of ${name}`} />
      <Text style={styles.dateName} numberOfLines={2}>{name}</Text>
    </TouchableOpacity>
  );
};

const PremiumDates = () => {
  const { state } = useContext(AppContext);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get('/home');  
        const category = response.data.data.premiumcategory;
        setCategories(category);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [state.isHomeRefresh]);

  return (
    <View style={styles.premiumDatesContainer}>
      <LinearGradient
        colors={['#FFBEBE', '#FFE4E4']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.gradientContainer}
      >
        <Text style={styles.sectionTitle}>Savor the Sweetness of {'\n'}Premium Dates!</Text>
        <Text style={styles.sectionSubtitle}>
          A handpicked selection of the finest dates, perfect for every occasion.
        </Text>
        {loading ? (
          <Text style={styles.loadingText}>Loading...</Text>
        ) : (
          <FlatList
            data={categories}
            ListEmptyComponent={<Text style={styles.emptyListText}>No dates available.</Text>}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.sid.toString()}
            renderItem={({ item }) => <DateCard name={item.cname} image={item.image} category={item} />}
            contentContainerStyle={styles.flatListContainer}
          />
        )}
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  premiumDatesContainer: {
    paddingHorizontal: rw(5),
  },
  gradientContainer: {
    padding: rw(3),
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: rf(2.5),
    fontWeight: 'bold',
    color: '#FF3131',
  },
  sectionSubtitle: {
    color: '#FF5454',
    marginBottom: rh(2),
    fontSize: rf(2),
  },
  flatListContainer: {
    gap: rw(2),
  },
  dateCard: {
    backgroundColor: '#FFFFFF',
    paddingVertical: rh(1),
    width: rw(19.5),
    justifyContent: 'center',
    borderRadius: 10,
    alignItems: 'center',
  },
  dateImage: {
    width: rw(18),
    height: rw(18),
    resizeMode: 'contain',
  },
  dateName: {
    textAlign: 'center',
    marginTop: rh(1),
    fontWeight: '500',
    fontSize: rf(1.8),
    color: '#333',
    flexWrap: 'wrap',
    width: "95%",
  },
  loadingText: {
    fontSize: rf(2),
    color: '#888',
    textAlign: 'center',
    marginTop: rh(2),
  },
  emptyListText: {
    fontSize: rf(2),
    color: '#888',
    textAlign: 'center',
    marginTop: rh(2),
  },
});

export default PremiumDates;

// B2BCatSectionProducts.js

// import libraries
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import B2BProductCard from '../../../../components/List/B2BProductCard';
import { rw, rf, rh } from '../../../../Service/responsive';

const B2BCatSectionProducts = ({ data }) => {
  // If data is null/undefined or no categories exist, return nothing
  if (!data || Object.keys(data).length === 0) {
    return null;
  }

  // Get all category names (keys of the data object)
  const categoryNames = Object.keys(data);

  return (
    <View>
      {categoryNames.map((categoryName, index) => {
        const productList = data[categoryName];

        // If no products in this category, skip rendering this section
        if (!productList || productList.length === 0) {
          return null;
        }

        return (
          <View key={index} style={styles.horizontalListContainer}>
            <Text style={styles.listTitle}>{categoryName}</Text>
            <View style={{ flexDirection: 'row' }}>
              <B2BProductCard
                items={productList}
                styleCardContainer={{
                  width: "100%",
                  marginRight: rw(3),
                }}
                layout="vertical"
              />
            </View>
          </View>
        );
      })}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  horizontalListContainer: {
    paddingTop: rh(1),
    marginBottom: rh(2),
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    overflow: 'hidden',
    paddingHorizontal: rw(1),
  },
  listTitle: {
    fontSize: rf(2),
    fontWeight: 'bold',
    color: '#272727',
    marginLeft: rw(4),
    marginBottom: rh(1),
  },
});

export default B2BCatSectionProducts;

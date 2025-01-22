//import liraries
import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import B2BProductCard from '../../../../components/List/B2BProductCard';
import { rw, rf, rh } from '../../../../Service/responsive';
import { AppContext } from '../../../../context/AppContext';
import apiClient from '../../../../Service/apiClient';

// create a component
const B2BSimilarProducts = ({data}) => {

  // Use data from props directly for productList
  const productList = data || []; 

  // Only render if productList has items
  if (productList.length === 0) {
      return null;  
  }

    return (
        <View>
            {/* Horizontal Product List */}
            <View style={styles.horizontalListContainer}>
            <Text style={styles.listTitle}>Similar Products</Text>
             <View style={{flexDirection:"row"}}>
             <B2BProductCard
                items={productList}
                styleCardContainer={{
                  width: rw(77),
                  height:rh(30),
                }}
                layout="horizontal"
              />
             </View>

            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    horizontalListContainer: {
        paddingTop:rh(1),
        marginVertical: rh(2),
        backgroundColor:"#FFFFFF",
        borderRadius:10,
        overflow:"hidden",
        paddingHorizontal:rw(1)
      },
      listTitle: {
        fontSize: rf(2),
        fontWeight: 'bold',
        color: '#272727',
        marginLeft: rw(4),
        marginBottom: rh(1),
      },
});

//make this component available to the app
export default B2BSimilarProducts;

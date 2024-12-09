//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import B2BProductCard from '../../../../components/List/B2BProductCard';
import { rw, rf, rh } from '../../../../Service/responsive';

// create a component
const B2BSimilarProducts = () => {

    const productList = [
        {
          id: '1',
          name: 'Premium Roasted Almonds',
          image: require('../../../../assets/items/image343002.png'),
          price: '999',
          discountedPrice: '699',
          sizes: '1kg, 5kg, 10kg',
          packets: ['₹679/kg for 5 kg packet', '₹659/kg for 10 kg packet'],
        },
        {
          id: '2',
          name: 'Organic Cashews',
          image: require('../../../../assets/items/image343002.png'),
          price: '1299',
          discountedPrice: '1099',
          sizes: '500g, 1kg',
          packets: ['₹999/kg for 1 kg packet'],
        },
      ];

    return (
        <View>
            {/* Horizontal Product List */}
            <View style={styles.horizontalListContainer}>
            <Text style={styles.listTitle}>Similar Products</Text>
            <FlatList
                data={productList}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: rw(2) }}
                renderItem={({ item }) => (
                <B2BProductCard
                    items={item}
                    name={item.name}
                    image={item.image}
                    price={item.price}
                    discountedPrice={item.discountedPrice}
                    sizes={item.sizes}
                    packets={item.packets}
                    onAdd={() => console.log('Add pressed')}
                    onIncrement={() => console.log('Increment pressed')}
                    onDecrement={() => console.log('Decrement pressed')}
                    styleCardContainer={{ width:rw(75) }}
                />
                )}
            />
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

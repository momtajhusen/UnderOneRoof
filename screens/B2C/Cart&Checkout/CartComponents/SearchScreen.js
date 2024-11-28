//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { rw, rh, rf } from '../../../../Service/responsive';
import Header from '../../../../components/header';
import SearchInput from '../../../../components/Search/SearchInput';

// create a component
const PrivacyPolicy = ({navigation}) => {
    return (
        <View style={{flex:1, backgroundColor:"#F3F3F3"}}>
            <Header 
                rightContent={
                    <View style={{ flexDirection: "row", width:rw(80)}}>
                        <SearchInput placeholder="Search here.." autoFocus={true} />
                    </View>
                }
            />
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>
                        Trending Search
                    </Text>
                </View>

                {/* Items container */}
                <View style={styles.itemsContainer}>
                    <View style={styles.searhedContainer}>
                        <Image style={styles.image} source={require('../../../../assets/items/image5.png')} />
                        <Text>Edible Oils</Text>
                    </View>
                    <View style={styles.searhedContainer}>
                        <Image style={styles.image} source={require('../../../../assets/items/image42.png')} />
                        <Text>Dry Fruits</Text>
                    </View>
                    <View style={styles.searhedContainer}>
                        <Image style={styles.image} source={require('../../../../assets/items/image1.png')} />
                        <Text>Spices</Text>
                    </View>
                    <View style={styles.searhedContainer}>
                        <Image style={styles.image} source={require('../../../../assets/items/image1.png')} />
                        <Text>Snacks</Text>
                    </View>
                    <View style={styles.searhedContainer}>
                        <Image style={styles.image} source={require('../../../../assets/items/image1.png')} />
                        <Text>Beverages sdsdsd</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

//make this component available to the app
export default PrivacyPolicy;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: rw(5),
    },
    title: {
        marginTop: rh(1),
        color: "#272727",
        fontSize: rf(2),
        fontWeight: "bold",
    },
    itemsContainer: {
        flexDirection: "row", // Align items in a row
        flexWrap: "wrap", // Enable wrapping to the next line
        gap: rw(3), // Space between items
        marginTop: rh(1),
    },
    searhedContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ddd",
        paddingHorizontal: rw(1.5),
        paddingVertical: rh(1),
        borderRadius: 10,
        marginBottom: rh(1), // Adds space between rows
    },
    image: {
        width: rw(8),
        height: rw(8),
        marginRight:rw(1)
    },
});

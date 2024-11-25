import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import { rw, rh, rf } from '../../Service/responsive';
import { MaterialIcons } from '@expo/vector-icons';



const ItemsList = ({ items }) => {


    const handleAdd = () => {
       alert("Hello");
    };

    return (
        <FlatList
            data={items}
            keyExtractor={(item, index) => index.toString()}
            horizontal={true} // Enable horizontal scrolling
            showsHorizontalScrollIndicator={false} // Hide horizontal scrollbar
            contentContainerStyle={styles.listContainer} // Add some padding
            renderItem={({ item }) => (
                <TouchableOpacity style={styles.itemContainer}>
                    <View style={styles.ImageContainer}>
                        <TouchableOpacity style={styles.likeIcon}>
                           <MaterialIcons name="favorite-border" size={rf(3)} style={{color:"#BCBCBC"}}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleAdd()} style={styles.addbtn}>
                            <Text style={styles.btntext}>Add</Text>
                        </TouchableOpacity>

                        {/* Local image */}
                        <Image
                            source={item.image}
                            style={styles.image}
                        />
                    </View>
                    <View style={styles.details}>
                        <View style={{flexDirection:"row", alignItems:"center", paddingHorizontal:rw(2)}}>
                            <Text style={styles.weight}>{item.weight}</Text>
                            <Text style={styles.type}>{item.type}</Text>
                        </View>
                        <View style={{paddingHorizontal:rw(2), paddingVertical:rh(0.5)}}>
                            <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
                            <View style={{flexDirection:"row"}}>
                                    <MaterialIcons name="star-rate" size={rf(2)} style={styles.starIcon}/>
                                    <MaterialIcons name="star-rate" size={rf(2)} style={styles.starIcon}/>
                                    <MaterialIcons name="star-rate" size={rf(2)} style={styles.starIcon}/>
                                    <MaterialIcons name="star-rate" size={rf(2)} style={styles.starIcon}/>
                                    <MaterialIcons name="star-rate" size={rf(2)} style={styles.starIcon}/>
                                <Text>({item.likes})</Text>
                            </View>
                            <Text style={styles.discount}>{item.discount}</Text>
                            <Text style={styles.price}>
                                ₹{item.price} <Text style={styles.mpr}>MPR <Text style={styles.mprPrice}>₹{item.mpr}</Text></Text>
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )}
        />
    );
};

export default ItemsList;

const styles = StyleSheet.create({
    listContainer: {
        paddingHorizontal: rw(0),
    },
    itemContainer: {
        width: rw(39), // Set fixed width for each card
        marginRight: 10, // Space between cards
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    ImageContainer:{
      justifyContent:"center",
       alignItems:"center",
       backgroundColor:"#FFF4E6",
       paddingHorizontal:rw(2),
       paddingTop:rh(0.5), 
       borderRadius:10, 
    },
    image: {
        width: 100,
        height: 110,
        borderRadius: 10,
        resizeMode: 'cover',
    },
    likeIcon:{
      position:"absolute",
      left:rw(1),
      top:rh(0.5),
      padding:rw(1),
    },
    addbtn:{
        position:"absolute",
        width:rw(20),
        height:rh(4),
        right:rw(1),
        bottom:rh(0.5),
        padding:rw(1),
        borderWidth:2,
        borderColor:"#FF3131",
        zIndex:100,
        backgroundColor:"white",
        borderRadius:8,
        justifyContent:"center",
    },
    btntext:{
      textAlign:"center",
      color:"#FF3131",
    },
    details: {
        marginTop: 10,
    },
    name: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },
    weight: {
        fontSize: rf(1.5),
        color: '#FF9100',
        backgroundColor: '#FFF4E6',
        alignSelf: 'flex-start',
        paddingHorizontal: 6,
        borderRadius: 5,
    },
    type: {
        fontSize: rf(1.5),
        color: '#FF9100',
        backgroundColor: '#FFF4E6',
        alignSelf: 'flex-start',
        paddingHorizontal: 5,
        borderRadius: 5,
        marginVertical: 3,
        marginLeft:rw(2)
    },
    price: {
        fontSize: rf(2.5),
        color: '#000',
        marginTop: 5,
        fontWeight:"bold"
    },
    mpr: {
        fontSize: rf(1.8),
        color: '#999',
        fontWeight:"normal"
    },
    mprPrice:{
        fontSize: rf(1.8),
        textDecorationLine: 'line-through',
        color: '#999',
    },
    discount: {
        fontSize: 12,
        color: '#FF9100',
    },
    rating: {
        fontSize: 12,
        color: '#717171',
        marginVertical: 3,
        alignContent:"center",
        alignItems:"center",
    },
    starIcon:{
        color:"red",
    },
});
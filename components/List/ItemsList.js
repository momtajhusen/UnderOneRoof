import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import { rw, rh, rf } from '../../Service/responsive';
import { MaterialIcons } from '@expo/vector-icons';



const ItemsList = ({ items, listContainerStyle, layout = 'horizontal' }) => {


    const handleAdd = () => {
       alert("Hello");
    };

    return (
        <FlatList
            data={items}
            keyExtractor={(item, index) => index.toString()}
            horizontal={layout === 'horizontal' ? true : false}
            vertical={true}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.listContainer} 
            renderItem={({ item }) => (
                <TouchableOpacity  disabled={item.stock === 0} style={[styles.itemContainer, listContainerStyle, item.stock === 0 && styles.disabledItem]}>
                    <View  style={styles.ImageContainer}>
                        <TouchableOpacity style={styles.likeIcon}>
                        <MaterialIcons name="favorite-border" size={rf(3)} style={{color:"#BCBCBC"}}/>
                        </TouchableOpacity>
                        <TouchableOpacity disabled={item.stock === 0} onPress={() => handleAdd()} style={styles.addbtn}>
                            <Text style={styles.btntext}>Add</Text>
                        </TouchableOpacity>
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
                                    <Text style={{fontSize:rf(1.5)}}>({item.likes})</Text>
                                    
                              {/* "Out of Stock" Message */}
                                {item.stock == 0 ? (
                                    <View style={styles.OutOfStock}>
                                    <Text style={{ color: "white", textAlign: "center" }}>Out Of Stock</Text>
                                    </View>
                                ) : null}
          
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
        flexDirection:"row",
        flexWrap: 'wrap',
        marginBottom:rh(2),
        overflow:"hidden"
    },
    itemContainer: {
        width: rw(39), // Set fixed width for each card
        marginRight: rw(1.5), // Space between cards
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
        width:rw(19),
        height:rh(3.5),
        right:rw(1),
        bottom:rh(0.5),
        borderWidth:2,
        borderColor:"#FF3131",
        zIndex:100,
        backgroundColor:"white",
        borderRadius:8,
        justifyContent:"center",
    },
    OutOfStock:{
        position:"absolute",
        width:rw(25),
        height:rh(3),
        lefy:rw(1),
        bottom:rh(0.5),
        top:rh(-8),
        backgroundColor:"#FF3131",
        justifyContent:"center",
        borderRadius:10,
        opacity:100,
    },  
    disabledItem: {
        opacity:0.5
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
        height:rh(5),
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
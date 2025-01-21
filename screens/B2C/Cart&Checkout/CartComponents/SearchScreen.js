//import liraries
import { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import { rw, rh, rf } from '../../../../Service/responsive';
import Header from '../../../../components/header';
import SearchInput from '../../../../components/Search/SearchInput';
import apiClient from '../../../../Service/apiClient';
import { AppContext } from '../../../../context/AppContext';

// create a component
const PrivacyPolicy = ({ navigation }) => {
    const { dispatch, state } = useContext(AppContext);

    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLaading] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [trendingData, setTreandingData] = useState([]);


    const fetchSearchResults = async (query) => {
        setIsLaading(true);
        try {
            const payload = { name: query };
            const response = await apiClient.post(`/search`, payload);
            setSearchResults(response.data.data.searchProduct);
        } catch (error) {
            console.error('Error fetching search results:', error);
        } finally{
          setIsLaading(false);
        }
    };

    const fetchTreandingSearchResults = async () => {
        setIsLaading(true);
        try {
            const response = await apiClient.get(`/trending_search`);
            setTreandingData(response.data.data.product);
            console.log(response.data.data.product);
        } catch (error) {
            console.error('Error fetching search results:', error);
        } finally{
          setIsLaading(false);
        }
    };

    // Debounce the API call
    useEffect(() => {
        fetchTreandingSearchResults();
    }, []);
    
    // Debounce the API call
    useEffect(() => {
        fetchTreandingSearchResults
        if (searchQuery.trim() !== '') {
            const timer = setTimeout(() => {
                fetchSearchResults(searchQuery);
            }, 200);

            return () => clearTimeout(timer);
        } else {
            setSearchResults([]);
        }
    }, [searchQuery]);

    const renderSearchItem = ({ item }) => (
        <TouchableOpacity 
        //   onPress={() =>
        //     navigation.navigate('B2BProductListing', {
        //       selectCategoryId: item.category,
        //       selectCategoryName: item.catname,
        //       selectCategorySlug: item.cslug,
        //     })
        //   }
        //   onPress={() =>
        //     navigation.navigate('ProductDetail', {
        //       item: item,
        //       itemImage: item.itemimage,
        //       itemQty:state.viewCartData.cartProduct.find(cartItem => cartItem.pid === item.pid)?.qty || 0,
        //     })
        //   }

          onPress={() =>
            navigation.navigate('ProductDetail', {
              item: item,
              itemImage: item.itemimage,
              itemQty:state.viewCartData.cartProduct.find(cartItem => cartItem.pid === item.pid)?.qty || 0,
            })
          }

          style={styles.searchItemContainer}>
            <Image style={styles.fullWidthImage} source={{ uri: item.itemimage }} />
            <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={{ flex: 1, backgroundColor: "#F3F3F3" }}>
            <Header
                rightContent={
                    <View style={{ flexDirection: "row", width: rw(80) }}>
                        <SearchInput
                            loading={isLoading}
                            placeholder="Search here.."
                            autoFocus={true}
                            onChange={setSearchQuery}
                        />
                    </View>
                }
            />
            <View style={styles.container}>
            {searchQuery.trim() !== '' ? (
                searchResults.length > 0 ? (
                    <FlatList
                        data={searchResults}
                        renderItem={renderSearchItem}
                        keyExtractor={(item, index) => index.toString()}
                        contentContainerStyle={{ paddingBottom: 20 }} 
                        showsVerticalScrollIndicator={false}
                    />
                ) : (
                    isLoading ? (
                        <Text style={styles.noResultsText}>Loading...</Text>
                    ) : (
                        <Text style={styles.noResultsText}>No results found for "{searchQuery}"</Text>
                    )
                )
            ) : (
                <>
                    <Text style={styles.title}>Trending Search</Text>
                     <View style={styles.itemsContainer}>
                    {trendingData.map((item, index) => (
                        <TouchableOpacity 
                        onPress={() =>
                            navigation.navigate('ProductListing', {
                              selectCategoryId: item.cid,
                              selectCategoryName: item.catname,
                              selectCategorySlug: item.cslug,
                            })
                          }

                        //   onPress={() =>
                        //     navigation.navigate('ProductDetail', {
                        //       item: item,
                        //       itemImage: item.itemimage,
                        //       itemQty:state.viewCartData.cartProduct.find(cartItem => cartItem.pid === item.pid)?.qty || 0,
                        //     })
                        //   }
                        key={index} style={styles.searhedContainer}>
                        <Image style={styles.image}  source={{ uri: item.itemimage }} />
                        <Text>{item.name}</Text>
                        </TouchableOpacity>
                    ))}
                    </View>
                </>
            )}
            </View>
        </View>
    );
};

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
        flexDirection: "row",
        flexWrap: "wrap",
        gap: rw(3),
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
    },
    image: {
        width: rw(8),
        height: rw(8),
        marginRight: rw(1),
    },
    searchItemContainer: {
        width:rw(100),
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderColor: "#ddd",
        padding: rw(1),
        backgroundColor: "#fff",
    },
    fullWidthImage: {
        width: rw(15),
        height: rw(15),
        borderRadius: 10,
        marginRight: rw(3),
    },
    itemInfo: {
        flex: 1,
    },
    itemName: {
        fontSize: rf(2),
        fontWeight: "bold",
        color: "#272727",
    },
    noResultsText: {
        fontSize: rf(2),
        color: "#999",
        textAlign: "center",
        marginTop: rh(5),
    },
});

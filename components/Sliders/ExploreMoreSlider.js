import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, Image, View, Text } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { rw, rh, rf } from '../../Service/responsive';
import apiClient from '../../Service/apiClient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import { LinearGradient } from 'expo-linear-gradient';

const Shimmer = createShimmerPlaceholder(LinearGradient);
const { width: screenWidth } = Dimensions.get('window');

const ExploreMoreSlider = () => {
    const [activeSlide, setActiveSlide] = useState(0); 
    const [sliderData, setHomeSliderData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch slider image from API
    useEffect(() => {
        const fetchSliderData = async () => {
            try {
                const response = await apiClient.get('/home');
                const slider = response.data.data.slider; 
                setHomeSliderData(slider);
            } catch (error) {
                console.error('Error fetching slider data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchSliderData();
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.slide}>
            <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
        </View>
    );

    return (
        <View>
            {/* Header with Slide Number */}
            <View
                style={{
                    paddingLeft: rw(4.5),
                    marginBottom: rh(1),
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Text style={styles.headerText}>Explore More</Text>
                <View
                    style={{
                        marginRight: rw(3),
                        width: rw(14),
                        backgroundColor: 'black',
                        paddingVertical: rh(0.8),
                        borderRadius: 10,
                    }}
                >
                    <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>
                        {`${activeSlide + 1}/${sliderData.length}`} {/* Show current slide */}
                    </Text>
                </View>
            </View>

            {/* Shimmer Loader or Carousel */}
            {loading ? (
                <Shimmer style={styles.shimmer} />
            ) : (
                <Carousel
                    data={sliderData}
                    renderItem={renderItem}
                    sliderWidth={screenWidth}
                    itemWidth={rw(80)}  
                    inactiveSlideScale={0.9} 
                    inactiveSlideOpacity={0.7} 
                    autoplay={true}
                    autoplayInterval={2000}
                    loop={true}
                    onSnapToItem={(index) => setActiveSlide(index)} 
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    slide: {
        width: rw(80),
        height: rw(45),
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    headerText: {
        fontSize: rf(2),
        fontWeight: 'bold',
    },
    shimmer: {
        width: rw(80),
        height: rw(45),
        borderRadius: 10,
        justifyContent: 'center',
        marginLeft: rw(10),
    },
});

export default ExploreMoreSlider;

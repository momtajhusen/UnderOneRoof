import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, Image, View } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { rw, rh } from '../../Service/responsive';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import { LinearGradient } from 'expo-linear-gradient';

const { width: screenWidth } = Dimensions.get('window');

// Shimmer Placeholder component
const Shimmer = createShimmerPlaceholder(LinearGradient);

const HomeSlider = ({ sliderData, sliderStyle }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (sliderData && sliderData.length > 0) {
            setLoading(false); 
        }
    }, [sliderData]);

    const renderItem = ({ item }) => (
        <View style={[styles.slide, sliderStyle]}>
            <Image source={{ uri: item.image }} style={[styles.image]} resizeMode="cover" />  
        </View>
    );

    return (
        <View>

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
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    slide: {
        width: rw(80),
        height: rw(4),
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    shimmer: {
        width: rw(80),
        height: rw(35),
        borderRadius: 10,
        justifyContent:"center",
        marginLeft:rw(10)
    },
});

export default HomeSlider;

import React from 'react';
import { StyleSheet, Dimensions, Image, View } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { rw, rh } from '../../Service/responsive';

const { width: screenWidth } = Dimensions.get('window');

const HomeSlider = () => {
    const sliderData = [
        require('../../assets/Slider/Banner1.png'),
        require('../../assets/Slider/Banner2.png'),
        require('../../assets/Slider/Banner3.png'),
        require('../../assets/Slider/Banner4.png'),
        require('../../assets/Slider/Banner5.png'),
    ];

    const renderItem = ({ item }) => (
        <View style={styles.slide}>
            <Image source={item} style={styles.image} resizeMode="cover" />
        </View>
    );

    return (
        <Carousel
            data={sliderData}
            renderItem={renderItem}
            sliderWidth={screenWidth}
            itemWidth={rw(80)} // Make item width smaller to show adjacent slides
            inactiveSlideScale={0.9} // Slightly shrink inactive slides
            inactiveSlideOpacity={0.7} // Make inactive slides slightly transparent
            autoplay={true}
            autoplayInterval={2000}
            loop={true}
        />
    );
};

const styles = StyleSheet.create({
    slide: {
        width: rw(80), // Same as itemWidth
        height: rh(17),
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10, // Optional: Rounded corners
    },
});

export default HomeSlider;

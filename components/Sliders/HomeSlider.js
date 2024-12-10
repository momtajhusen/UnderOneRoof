import React from 'react';
import { StyleSheet, Dimensions, Image, View } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { rw, rh } from '../../Service/responsive';

const { width: screenWidth } = Dimensions.get('window');

const HomeSlider = ({ sliderData, sliderStyle }) => {
 
    const renderItem = ({ item }) => (
        <View style={[styles.slide, sliderStyle]}>
            <Image source={item} style={[styles.image]} resizeMode="cover" />
        </View>
    );

    return (
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
    );
};

const styles = StyleSheet.create({
    slide: {
        width: rw(80),  
        height: rh(19),
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10, 
    },
});

export default HomeSlider;

import React, { useState } from 'react';
import { StyleSheet, Dimensions, Image, View, Text } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { rw, rh, rf } from '../../Service/responsive';

const { width: screenWidth } = Dimensions.get('window');

const ExploreMoreSlider = () => {
    const [activeSlide, setActiveSlide] = useState(0); // State to track current slide

    const sliderData = [
        require('../../assets/Slider/Banner8.png'),
        require('../../assets/Slider/Banner8.png'),
        require('../../assets/Slider/Banner8.png'),
        require('../../assets/Slider/Banner8.png'),
        require('../../assets/Slider/Banner8.png'),
    ];

    const renderItem = ({ item }) => (
        <View style={styles.slide}>
            <Image source={item} style={styles.image} resizeMode="cover" />
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

            {/* Carousel Component */}
            <Carousel
                data={sliderData}
                renderItem={renderItem}
                sliderWidth={screenWidth}
                itemWidth={rw(80)} // Adjusted item width
                inactiveSlideScale={0.9} // Shrink inactive slides
                inactiveSlideOpacity={0.7} // Reduce inactive slide opacity
                autoplay={true}
                autoplayInterval={2000}
                loop={true}
                onSnapToItem={(index) => setActiveSlide(index)} // Update active slide index
            />
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
});

export default ExploreMoreSlider;

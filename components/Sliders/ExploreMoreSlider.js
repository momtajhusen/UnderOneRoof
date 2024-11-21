import React from 'react';
import { StyleSheet, Dimensions, Image, View, Text} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { rw, rh } from '../../Service/responsive';

const { width: screenWidth } = Dimensions.get('window');

const ExploreMoreSlider = () => {
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
        <View style={{paddingHorizontal:rw(4.5), paddingBottom:rh(1), flexDirection:"row"}}>
            <Text style={styles.headerText}>Explore More</Text>
            {/* <View style={{marginRight:rw(15), backgroundColor:"black" }}>
               <Text style={{color:"white", textAlign:"center"}}>1/10</Text>
            </View> */}
        </View>
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
        </View>
    );
};

const styles = StyleSheet.create({
    slide: {
        width: rw(80), // Same as itemWidth
        height: rh(20),
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10, // Optional: Rounded corners
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default ExploreMoreSlider;

//import libraries
import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import Header from '../../../../components/header';
import { rw, rh } from '../../../../Service/responsive';
import ReviewCard from '../../../../components/List/ReviewCard';
import RatingProductCard from '../../../../components/List/RatingProductCard';

// create a component
const AllRating = () => {
    const reviews = [
        {
            image: require('../../../../assets/RatingImage/image5.png'),
            rating: 4,
            reviewText: 'Taste is very good.',
            reviewer: 'Mr. Aman Shukla',
            date: '24/March/2024',
        },
        {
            image: require('../../../../assets/RatingImage/image6.png'),
            rating: 5,
            reviewText: 'Value for money product',
            reviewer: 'Mr. Aman Shukla',
            date: '24/March/2024',
        },
        {
            image: require('../../../../assets/RatingImage/image7.png'),
            rating: 5,
            reviewText: 'Value for money product',
            reviewer: 'Mr. Aman Shukla',
            date: '24/March/2024',
        },
        {
            image: require('../../../../assets/RatingImage/image8.png'),
            rating: 5,
            reviewText: 'Value for money product',
            reviewer: 'Mr. Aman Shukla',
            date: '24/March/2024',
        },
        {
            image: require('../../../../assets/RatingImage/image9.png'),
            rating: 5,
            reviewText: 'Value for money product',
            reviewer: 'Mr. Aman Shukla',
            date: '24/March/2024',
        },
    ];

    const reviewData = {
        rating: 4.5,
        reviewCount: 22500,
        images: [
            require('../../../../assets/RatingImage/image.png'),
            require('../../../../assets/RatingImage/image-1.png'),
            require('../../../../assets/RatingImage/image-2.png'),
            require('../../../../assets/RatingImage/image5.png'),
        ],
    };

    return (
        <View style={styles.container}>
            <Header title="All Ratings" />
            <FlatList
                data={reviews}
                renderItem={({ item }) => <ReviewCard {...item} />}
                keyExtractor={(item, index) => index.toString()}
                ListHeaderComponent={
                    <RatingProductCard
                        rating={reviewData.rating}
                        reviewCount={reviewData.reviewCount}
                        images={reviewData.images}
                    />
                }
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listContainer: {
        paddingHorizontal: rw(3),
        paddingBottom: rh(2),
    },
});

//make this component available to the app
export default AllRating;

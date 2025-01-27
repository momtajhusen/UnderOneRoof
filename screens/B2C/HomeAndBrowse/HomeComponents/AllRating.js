//import libraries
import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import Header from '../../../../components/header';
import { rw, rh } from '../../../../Service/responsive';
import ReviewCard from '../../../../components/List/ReviewCard';
import RatingProductCard from '../../../../components/List/RatingProductCard';
import { useRoute } from "@react-navigation/native";

// create a component
const AllRating = () => {
    const route = useRoute();
    const { review, reviewData } = route.params;

    // const reviews = [
    //     {
    //         image: require('../../../../assets/RatingImage/image5.png'),
    //         rating: 4,
    //         reviewText: 'Taste is very good.',
    //         reviewer: 'Mr. Aman Shukla',
    //         date: '24/March/2024',
    //     },
    //     {
    //         image: require('../../../../assets/RatingImage/image6.png'),
    //         rating: 5,
    //         reviewText: 'Value for money product',
    //         reviewer: 'Mr. Aman Shukla',
    //         date: '24/March/2024',
    //     },
    //     {
    //         image: require('../../../../assets/RatingImage/image7.png'),
    //         rating: 5,
    //         reviewText: 'Value for money product',
    //         reviewer: 'Mr. Aman Shukla',
    //         date: '24/March/2024',
    //     },
    //     {
    //         image: require('../../../../assets/RatingImage/image8.png'),
    //         rating: 5,
    //         reviewText: 'Value for money product',
    //         reviewer: 'Mr. Aman Shukla',
    //         date: '24/March/2024',
    //     },
    //     {
    //         image: require('../../../../assets/RatingImage/image9.png'),
    //         rating: 5,
    //         reviewText: 'Value for money product',
    //         reviewer: 'Mr. Aman Shukla',
    //         date: '24/March/2024',
    //     }, {
    //         "rid": 70,
    //         "p_id": 123,
    //         "user_id": 496,
    //         "name": "Yshzhs Hshshs",
    //         "email": null,
    //         "rating": 0,
    //         "review": "Hszvvsgs",
    //         "image": [
    //             ""
    //         ],
    //         "status": 1,
    //         "created_at": "2025-01-27T05:29:58.000000Z",
    //         "updated_at": "2025-01-27T05:30:02.000000Z"
    //     },
    //     {
    //         "rid": 71,
    //         "p_id": 123,
    //         "user_id": 434,
    //         "name": "vijay",
    //         "email": "momdsf@gmail.com",
    //         "rating": 3,
    //         "review": "Hehshv",
    //         "image": [
    //             "https://u1rfoods.com/reviewImage/28113vvx5meUX9UmlhjsipcsWqJFDcKHGaHKwaTZsKOA.jpg",
    //             "https://u1rfoods.com/reviewImage/1348ttgaJbciBMlHxmPR6CiyfLYdn2nArAKXu44ypQ9.jpg"
    //         ],
    //         "status": 1,
    //         "created_at": "2025-01-27T05:51:30.000000Z",
    //         "updated_at": "2025-01-27T05:51:30.000000Z"
    //     }
    // ];

    // const reviewData = {
    //     rating: 4.5,
    //     reviewCount: 22500,
    //     images: [
    //         require('../../../../assets/RatingImage/image.png'),
    //         require('../../../../assets/RatingImage/image-1.png'),
    //         require('../../../../assets/RatingImage/image-2.png'),
    //         require('../../../../assets/RatingImage/image5.png'),
    //     ],
    // };

    return (
        <View style={styles.container}>
            <Header title="All Ratings" />
            <FlatList
                data={review}
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

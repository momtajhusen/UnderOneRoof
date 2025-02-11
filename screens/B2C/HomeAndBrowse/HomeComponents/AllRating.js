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

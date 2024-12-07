import React from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { rw, rh, rf } from '../../../../Service/themes/responsive';

// Reusable Card Component
const DateCard = ({ name, image }) => (
  <View style={styles.dateCard}>
    <Image source={image} style={styles.dateImage} />
    <Text style={styles.dateName}>{name}</Text>
  </View>
);

// Premium Dates Section
const PremiumDates = ({ data }) => {
  return (
    <View style={styles.premiumDatesContainer}>
      <LinearGradient
        colors={['#FFBEBE', '#FFE4E4']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.gradientContainer}
      >
        <Text style={styles.sectionTitle}>Savor the Sweetness of {'\n'}Premium Dates!</Text>
        <Text style={styles.sectionSubtitle}>
          A handpicked selection of the finest dates, perfect for every occasion.
        </Text>
        <FlatList
          data={data}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <DateCard name={item.name} image={item.image} />}
          contentContainerStyle={styles.flatListContainer}
        />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  premiumDatesContainer: {
    paddingHorizontal: rw(5),
    marginBottom: rh(2),
  },
  gradientContainer: {
    padding: rw(3),
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: rf(2.5),
    fontWeight: 'bold',
    color: '#FF3131',
  },
  sectionSubtitle: {
    color: '#FF5454',
    marginBottom: rh(2),
    fontSize: rf(2),
  },
  flatListContainer: {
    gap: rw(2),
  },
  dateCard: {
    backgroundColor: '#FFFFFF',
    paddingVertical: rh(1),
    width: rw(23),
    justifyContent: 'center',
    borderRadius: 10,
    alignItems: 'center',
  },
  dateImage: {
    width: rw(18),
    height: rw(18),
    resizeMode: 'contain',
  },
  dateName: {
    textAlign: 'center',
    marginTop: rh(1),
    fontWeight: '500',
    fontSize: rf(1.8),
    color: '#333',
  },
});

export default PremiumDates;

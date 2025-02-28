import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { rw, rh } from '../../Service/responsive';
import { LinearGradient } from 'expo-linear-gradient';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';

const ItemsListLoader = ({ count = 4, itemContainerStyle, layout = 'vertical' }) => {
  const renderLoaderItem = () => (
    <View style={[styles.itemContainer, itemContainerStyle]}>
      {/* Image Placeholder */}
      <ShimmerPlaceholder
        style={styles.image}
        shimmerColors={['#f0f0f0', '#e0e0e0', '#f0f0f0']}  
        shimmerStyle={{ borderRadius: rw(4) }}
        LinearGradient={(props) => (
          <LinearGradient
            {...props}
            colors={['#f0f0f0', '#e0e0e0', '#f0f0f0']} 
            start={[0, 0]}
            end={[1, 0]}
          />
        )}
      />

      {/* Text Placeholder */}
      <View style={styles.textContainer}>
        <ShimmerPlaceholder
          style={styles.title}
          shimmerColors={['#f0f0f0', '#e0e0e0', '#f0f0f0']} 
          LinearGradient={(props) => (
            <LinearGradient
              {...props}
              colors={['#f0f0f0', '#e0e0e0', '#f0f0f0']} 
              start={[0, 0]}
              end={[1, 0]}
            />
          )}
        />
        <ShimmerPlaceholder
          style={styles.subtitle}
          shimmerColors={['#f0f0f0', '#e0e0e0', '#f0f0f0']}
          LinearGradient={(props) => (
            <LinearGradient
              {...props}
              colors={['#f0f0f0', '#e0e0e0', '#f0f0f0']} 
              start={[0, 0]}
              end={[1, 0]}
            />
          )}
        />
        <ShimmerPlaceholder
          style={styles.subtitle}
          shimmerColors={['#f0f0f0', '#e0e0e0', '#f0f0f0']}
          LinearGradient={(props) => (
            <LinearGradient
              {...props}
              colors={['#f0f0f0', '#e0e0e0', '#f0f0f0']} 
              start={[0, 0]}
              end={[1, 0]}
            />
          )}
        />
        <ShimmerPlaceholder
          style={styles.start}
          shimmerColors={['#f0f0f0', '#e0e0e0', '#f0f0f0']}
          LinearGradient={(props) => (
            <LinearGradient
              {...props}
              colors={['#f0f0f0', '#e0e0e0', '#f0f0f0']} 
              start={[0, 0]}
              end={[1, 0]}
            />
          )}
        />
        <ShimmerPlaceholder
          style={styles.offer}
          shimmerColors={['#f0f0f0', '#e0e0e0', '#f0f0f0']}
          LinearGradient={(props) => (
            <LinearGradient
              {...props}
              colors={['#f0f0f0', '#e0e0e0', '#f0f0f0']} 
              start={[0, 0]}
              end={[1, 0]}
            />
          )}
        />
        <ShimmerPlaceholder
          style={styles.price}
          shimmerColors={['#f0f0f0', '#e0e0e0', '#f0f0f0']}
          LinearGradient={(props) => (
            <LinearGradient
              {...props}
              colors={['#f0f0f0', '#e0e0e0', '#f0f0f0']} 
              start={[0, 0]}
              end={[1, 0]}
            />
          )}
        />
      </View>
    </View>
  );

  return (
    <FlatList
      data={Array.from({ length: count })}
      keyExtractor={(_, index) => index.toString()}
      horizontal={layout === 'horizontal'}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[
        styles.listContainer, 
        layout === 'vertical' && { flexWrap: 'wrap', flexDirection: 'row' }
      ]}
      renderItem={renderLoaderItem}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    justifyContent:"center",
    height:"100%",
    justifyContent:"space-around",
    width:"100%"
  },
  itemContainer: {
    width: rw(41),
    backgroundColor: '#FFF',
    borderRadius: rw(2),
    padding: rw(1),
    marginBottom:rw(2),
  },
  image: {
    width: '100%',
    height: rh(15),
    borderRadius: rw(2),
    overflow: 'hidden',
    backgroundColor: '#F0F0F0',
  },
  textContainer: {
    marginTop: rh(1),
  },
  title: {
    width: '30%',
    height: rh(2),
    borderRadius: rw(1),
    backgroundColor: '#F0F0F0',
  },
  subtitle: {
    width: '90%',
    height: rh(1.5),
    marginTop: rh(0.5),
    borderRadius: rw(1),
    backgroundColor: '#F0F0F0',
  },
  start: {
    width: '50%',
    height: rh(1.2),
    marginVertical: rh(1.2),
    borderRadius: rw(2),
    backgroundColor: '#F0F0F0',
  },
  offer: {
    width: '35%',
    height: rh(1.2),
    borderRadius: rw(2),
    backgroundColor: '#F0F0F0',
    marginTop: rh(0.5),
  },
  price: {
    width: '60%',
    height: rh(1.2),
    borderRadius: rw(2),
    backgroundColor: '#F0F0F0',
    marginVertical: rh(0.5),
  },
});

export default ItemsListLoader;

import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { rw, rh, rf } from '../../../../Service/responsive';
import ItemsList from '../../../../components/List/ItemsList';
import ItemsListLoader from '../../../../components/ShimmerLoader/ItemsListLoader';
import { AppContext } from '../../../../context/AppContext';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import { LinearGradient } from 'expo-linear-gradient';

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const Section1 = ({ data }) => {
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sectionTitle, setSectionTitle] = useState(null);

  const { state } = useContext(AppContext);

  useEffect(() => {
    if (data && data.section1) {
      if (Array.isArray(data.section1) && data.section1.length > 0) {
        const filteredData = data.section1.filter(item => {
          if (state.shoppingMode === 'wholesale') {
            return item.role_type === 3 || item.role_type === null;
          } else if (state.shoppingMode === 'retail') {
            return item.role_type === 2;
          }
          return false;
        });

        setProductData(filteredData);

        if (filteredData.length > 0) {
          setSectionTitle(filteredData[0].section_title);
        } else {
          setSectionTitle(null);
        }
        setLoading(false);
      } else {
        setLoading(false);
      }
    }
  }, [data, state.shoppingMode]);

  if (!loading && data && data.section1 && Array.isArray(data.section1) && data.section1.length === 0) {
    return null;
  }

  return (
    <View style={{ paddingLeft: rw(4), marginTop: rh(3) }}>
      {loading ? (
        <ShimmerPlaceholder style={[styles.headerText, { width: '50%' }]} />
      ) : (
        <Text style={styles.headerText}>{sectionTitle}</Text>
      )}

      <View>
        {loading ? (
          <ItemsListLoader layout="horizontal" />
        ) : (
          <ItemsList items={productData} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerText: {
    fontSize: rf(2),
    fontWeight: 'bold',
    marginBottom: rw(2),
  },
});

export default Section1;

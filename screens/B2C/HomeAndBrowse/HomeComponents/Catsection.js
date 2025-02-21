import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { rw, rh, rf } from '../../../../Service/responsive';
import ItemsList from '../../../../components/List/ItemsList';
import ItemsListLoader from '../../../../components/ShimmerLoader/ItemsListLoader';
import { AppContext } from '../../../../context/AppContext';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import { LinearGradient } from 'expo-linear-gradient';

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const Catsection = ({ data }) => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const { state } = useContext(AppContext);

  useEffect(() => {
    if (!data) {
      return;
    }

    if (data.catsection) {
      const catSectionData = data.catsection;
      const sectionsArr = [];

      Object.entries(catSectionData).forEach(([sectionName, items]) => {
        const filteredItems = items.filter(item => {
          if (state.shoppingMode === 'wholesale') {
            return item.role_type === 3 || item.role_type === null;
          } else if (state.shoppingMode === 'retail') {
            return item.role_type === 2;
          }
          return false;
        });
        if (filteredItems.length > 0) {
          sectionsArr.push({ sectionTitle: sectionName, items: filteredItems });
        }
      });

      setSections(sectionsArr);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [data, state.shoppingMode]);

  if (!loading && sections.length === 0) {
    return null;
  }

  return (
    <View style={{ paddingLeft: rw(4) }}>
      {loading ? (
        <>
          <ShimmerPlaceholder style={[styles.headerText, { width: '50%' }]} />
          <ItemsListLoader layout="horizontal" />
        </>
      ) : (
        sections.map(section => (
          <View key={section.sectionTitle}>
            <Text style={styles.headerText}>{section.sectionTitle}</Text>
            <ItemsList 
              listContainerStyle={{ width: rw(44), marginLeft: rw(0.5), marginBottom: rh(1) }} 
              layout="vertical" 
              items={section.items} 
            />
          </View>
        ))
      )}
    </View>
  );
};

export default Catsection;

const styles = StyleSheet.create({
  headerText: {
    fontSize: rf(2),
    fontWeight: 'bold',
    marginBottom: rw(2),
    marginLeft: rw(2),
  },
});

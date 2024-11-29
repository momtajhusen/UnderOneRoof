import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  LayoutAnimation,
} from "react-native";
import { rh, rw, rf } from "../../Service/responsive";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const CollapseItem = ({ title, content }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const animation = useRef(new Animated.Value(0)).current; 
  const [contentHeight, setContentHeight] = useState(0);  

 
  const toggleExpand = () => {
    if (isExpanded) {
 
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,  
      }).start(() => setIsExpanded(false));
    } else {
 
      setIsExpanded(true);  
      Animated.timing(animation, {
        toValue: contentHeight,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  return (
    <View style={styles.itemContainer}>
      
      <TouchableOpacity style={styles.titleContainer} onPress={toggleExpand}>
        <Text style={styles.titleText}>{title}</Text>
        <MaterialIcons
          name={isExpanded ? "expand-less" : "expand-more"}
          size={rf(2.5)}  
          color="#000"
        />
      </TouchableOpacity>

     
      <Animated.View style={[styles.contentContainer, { height: animation }]}>
        <View
          style={styles.hiddenContent}
          onLayout={(event) =>
            setContentHeight(event.nativeEvent.layout.height)
          }
        >
        
          <Text style={styles.contentText}>{content}</Text>
        </View>
      </Animated.View>
    </View>
  );
};

export default CollapseItem;

const styles = StyleSheet.create({
  itemContainer: {
    borderRadius: rw(1.5), 
    marginBottom: rh(1), 
    overflow: "hidden",
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: rh(2), 
    backgroundColor: "#FFFFFF",
  },
  titleText: {
    fontWeight: "bold",
    fontSize: rf(2), 
  },
  contentContainer: {
    overflow: "hidden",  
    backgroundColor: "#FFFFFF",
  },
  hiddenContent: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  contentText: {
    paddingHorizontal: rh(2),
    paddingBottom:rh(2),
    fontSize: rf(1.8),
    color: "#717171",
  },
});

import React from "react";
import { View, StyleSheet } from "react-native";
import CollapseItem from "../../../../components/List/CollapseItem";
import Header from "../../../../components/header";
import { rw, rh, rf } from '../../../../Service/responsive';

const FAQ = () => {
  const data = [
    {
      title: "What is UnderOneRoof?",
      content:
        "TurantLo is a fast and reliable delivery service that brings your favorite products right to your doorstep. Whether you need groceries, restaurant meals, or household essentials, we’ve got you covered.",
    },
    {
      title: "How do I place an order?",
      content:
        "To place an order, simply browse our app, add items to your cart, and proceed to checkout. Select your preferred payment method and confirm your order.",
    },
    {
      title: "How can I track my order?",
      content:
        "You can track your order in real-time from the 'My Orders' section in our app. You'll also receive updates via notifications.",
    },
    {
      title: "What payment methods do you accept?",
      content:
        "We accept a variety of payment methods, including credit/debit cards, digital wallets, and cash on delivery.",
    },
  ];

  return (
    <View style={styles.container}>
        <Header title="FAQs" />
        <View style={{padding:rw(4)}}>
            {data.map((item, index) => (
                <CollapseItem key={index} title={item.title} content={item.content} />
            ))}
        </View>
    </View>
  );
};

export default FAQ;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F5F5",
    // flex: 1,
  },
});

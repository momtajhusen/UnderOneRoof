// cartUtils.js
import { useState } from 'react';
import apiClient from '../Service/apiClient';

export const useAddToCart = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [cartQuantity, setCartQuantity] = useState(0);

  const addToCart = async (productDetails, ProductVarient, ProductDetails) => {
    try {
      setIsLoading(true);
      const payload = {
        pid: productDetails.pid,
        qty: 1,
        var_id: ProductVarient[0].psid,
      };

      const response = await apiClient.post('/addCart', payload);
      const product = response.data;

      if (product.status === 1) {
        setCartQuantity(product.cartcount);
        ProductDetails();
      } else {
        console.error('Failed to update cart');
      }
    } catch (error) {
      console.error('Error while adding to cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    cartQuantity,
    addToCart,
  };
};

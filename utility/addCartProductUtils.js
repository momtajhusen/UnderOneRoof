// addCartProductUtils.js
import { useState, useContext } from 'react';
import apiClient from '../Service/apiClient';
import { AppContext } from '../context/AppContext';

export const useAddFromCart = () => {
  const [isCartAddLoading, setIsLoading] = useState(false);
  const { dispatch } = useContext(AppContext);

  const addFromCart = async (pid, var_id) => {
    try {
      setIsLoading(true);

      const payload = {
        pid: pid,
        qty: 1,
        var_id: var_id,
      };

      const response = await apiClient.post('/addCart', payload);
      const product = response.data;

      if (product.status === 1) {
        dispatch({
          type: 'GLOBAL_REFRESH',
          payload: {
            reFresh: Math.ceil(Math.random() * 100),
          },
        });

        return { success: true }; // Success return kar raha hai
      } else {
        console.error('Failed to update cart');
        return { success: false, error: 'Failed to update cart' }; // Failure status return
      }
    } catch (error) {
      console.error('Error while adding to cart:', error);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isCartAddLoading,
    addFromCart,
  };
};

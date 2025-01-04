// addCartProductUtils.js
import { useState, useContext, useEffect } from 'react';
import apiClient from '../Service/apiClient';
import { AppContext } from '../context/AppContext';
import { useViewCartData } from './viewCardDataUtils';


export const useAddFromCart = () => {
  const [isCartAddLoading, setIsLoading] = useState(false);
  const { dispatch, state } = useContext(AppContext);

  const { isViewCartLoading, viewCartData } = useViewCartData();


  const addFromCart = async (pid, var_id, moq) => {
    try {
      setIsLoading(true);
      console.log('Request /addCart');
  
      // If moq is null or undefined, set it to 1
      const quantity = moq ?? 1;  
  
      const payload = {
        pid: pid,
        qty: quantity,
        var_id: var_id,
      };
  
      const response = await apiClient.post('/addCart', payload);
      const product = response.data;
  
      if (product.status === 1) {
        const result = await viewCartData();
        if (isViewCartLoading) {
          setTimeout(() => {
            setIsLoading(false);
          }, 300);
          dispatch({ type: 'SET_LOADER', payload: false });
        }
  
        return { success: true }; // Success return
      } else {
        console.error('Failed to update cart');
        return { success: false, error: 'Failed to update cart' }; // Failure status return
      }
    } catch (error) {
      console.error('Error while adding to cart:', error);
      return { success: false, error: error.message };
    }
  };
  

  return {
    isCartAddLoading,
    addFromCart,
  };
};

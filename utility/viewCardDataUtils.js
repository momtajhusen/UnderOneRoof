import { useState, useContext, useEffect } from 'react';
import apiClient from '../Service/apiClient';
import { AppContext } from '../context/AppContext';

export const useViewCartData = () => {
  const [isViewCartLoading, setIsLoading] = useState(false);
  const { dispatch, state } = useContext(AppContext);

  const viewCartData = async () => {
    try {
      setIsLoading(true);
      dispatch({ type: 'SET_LOADER', payload: true });

      console.log('Request /viewCart');
      const response = await apiClient.get('/viewCart');
      const cartProduct = response.data?.data?.cartProduct || {};
      const cartData = response.data?.data;

      if (cartData) {
        // Dispatch updated cart data
        dispatch({
          type: 'VIEW_CART_DATA',
          payload: { viewCartData: cartData },
        });

        return { success: true, cartProduct, cartData };
      } else {
        console.error('Failed to fetch cart data');
        return { success: false, error: 'Failed to fetch cart data' };
      }
    } catch (error) {
      console.error('Error fetching cart data:', error);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
      dispatch({ type: 'SET_LOADER', payload: false });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await viewCartData();
    };
    fetchData();
  }, []);  

  return {
    isViewCartLoading,
    viewCartData,
  };
};

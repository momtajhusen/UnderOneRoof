import { useState, useContext } from 'react';
import apiClient from '../Service/apiClient';
import { AppContext } from '../context/AppContext';

export const useRemoveFromCart = () => {
  const {state, dispatch } = useContext(AppContext);
  const [isCartDeleteLoading, setIsLoading] = useState(false);

  const removeFromCart = async (pid, var_id) => {

    try {
      setIsLoading(true);
      dispatch({ type: 'SET_LOADER', payload: true });
      const payload = { pid, vid: var_id};
      const response = await apiClient.post('/deleteCart', payload);

      if (response.data.status === 1) {  
        dispatch({
          type: 'GLOBAL_REFRESH',
          payload: {
            reFresh: Math.floor(Math.random() * 100) + 1,  
          },
        });

        return { success: true };
      } else {
        console.error('Failed to remove item from cart');
        return { success: false, error: 'Failed to remove item from cart' };
      }
    } catch (error) {
      console.error('Error while removing from cart:', error);
      return { success: false, error: error.message }; 
    } finally {
      setIsLoading(false);
      dispatch({ type: 'SET_LOADER', payload: false });

    }
  };

  return {
    isCartDeleteLoading,
    removeFromCart,
  };
};

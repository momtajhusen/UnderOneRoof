import { useState, useContext } from 'react';
import apiClient from '../Service/apiClient';
import { AppContext } from '../context/AppContext';
import { useViewCartData } from './viewCardDataUtils';


export const useRemoveFromCart = () => {
  const {state, dispatch } = useContext(AppContext);
  const [isCartDeleteLoading, setIsLoading] = useState(false);

  const { isViewCartLoading, viewCartData } = useViewCartData();

  const removeFromCart = async (pid, var_id) => {

    try {
      console.log('Request /deleteCart');
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

 
        const result = await viewCartData();
        if (isViewCartLoading) {
          setTimeout(()=>{
            setIsLoading(false);
          },300);
          dispatch({ type: 'SET_LOADER', payload: false });
        } 
        
        return { success: true };
      } else {
        console.error('Failed to remove item from cart');
        return { success: false, error: 'Failed to remove item from cart' };
      }
    } catch (error) {
      console.error('Error while removing from cart:', error);
      return { success: false, error: error.message }; 
    }
  };

  return {
    isCartDeleteLoading,
    removeFromCart,
  };
};

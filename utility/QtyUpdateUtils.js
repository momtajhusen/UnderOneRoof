import { useState, useContext, useEffect } from 'react';
import apiClient from '../Service/apiClient';
import { AppContext } from '../context/AppContext';
import { useViewCartData } from './viewCardDataUtils';


export const useQtyUpdate = () => {
  const [isQtyUpdateLoading, setIsLoading] = useState(false);

  const { isViewCartLoading, viewCartData } = useViewCartData();

  
    const { dispatch, state } = useContext(AppContext);

  const qtyUpdate = async (pid, qty, var_id) => {
    try {
      setIsLoading(true);
      dispatch({ type: 'SET_LOADER', payload: true });
      const payload = { pid, qty, var_id};

      const response = await apiClient.post('/qtyupdate', payload);
      const result = response.data;

      if (result.status === 1) {
        dispatch({
          type: 'GLOBAL_REFRESH',
          payload: {
            reFresh: Math.ceil(Math.random() * 100),
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
        console.error('Failed to update quantity');
        return { success: false, error: 'Failed to update quantity' };  
      }
    } catch (error) {
      console.error('Error while updating quantity:', error);
      return { success: false, error: error.message }; 
    }
  };   

  return {
    isQtyUpdateLoading,
    qtyUpdate,
  };
};

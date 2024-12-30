import { useState, useContext } from 'react';
import apiClient from '../Service/apiClient';
import { AppContext } from '../context/AppContext';

export const useQtyUpdate = () => {
  const [isQtyUpdateLoading, setIsLoading] = useState(false);
  const { dispatch } = useContext(AppContext);

  const qtyUpdate = async (pid, qty, var_id) => {
    try {
      setIsLoading(true);

      const payload = { pid, qty, var_id};

      console.log(payload);

      const response = await apiClient.post('/qtyupdate', payload);
      const result = response.data;

      console.log(result);

      if (result.status === 1) {
        dispatch({
          type: 'GLOBAL_REFRESH',
          payload: {
            reFresh: Math.ceil(Math.random() * 100),
          },
        });

        return { success: true };  
      } else {
        console.error('Failed to update quantity');
        return { success: false, error: 'Failed to update quantity' };  
      }
    } catch (error) {
      console.error('Error while updating quantity:', error);
      return { success: false, error: error.message }; 
    } finally {
      setIsLoading(false);
    }
  };   

  

  return {
    isQtyUpdateLoading,
    qtyUpdate,
  };
};

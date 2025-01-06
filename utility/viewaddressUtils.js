import { useState, useContext, useEffect } from 'react';
import apiClient from '../Service/apiClient';
import { AppContext } from '../context/AppContext';

export const useViewAddressData = () => {
  const [isViewAddressLoading, setIsLoading] = useState(false);
  const { dispatch, state } = useContext(AppContext);

  const viewAddressData = async () => {
    try {
      setIsLoading(true);
      console.log('Request /viewaddress');
      
      const response = await apiClient.get('/viewaddress');
      const addressData = response.data;
      console.log("viewaddressUtils");
      console.log(addressData);

      if (addressData) {
        // Dispatch updated address data
        dispatch({
          type: 'VIEW_ADDRESS_DATA',
          payload: { viewAddressData: addressData },
        });

        return { success: true, addressData };
      } else {
        console.error('Failed to fetch address data');
        return { success: false, error: 'Failed to fetch address data' };
      }
    } catch (error) {
      console.error('Error fetching address data:', error);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await viewAddressData();
    };
    fetchData();
  }, []);

  return {
    isViewAddressLoading,
    viewAddressData,
  };
};

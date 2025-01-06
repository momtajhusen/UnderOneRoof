// toggleWishlistUtils.js
import { useState, useContext } from 'react';
import apiClient from '../Service/apiClient';
import { AppContext } from '../context/AppContext';

export const useToggleWishlist = () => {
  const [isWishlistLoading, setIsLoading] = useState(false);
  const { dispatch } = useContext(AppContext);

  const toggleWishlist = async (pid, isInWishlist, uid) => {
    try {
      setIsLoading(true);

      console.log(isInWishlist);

      const payload = isInWishlist
        ? { pid: pid }
        : { pid: pid, uid: uid }; 


      const endpoint = isInWishlist ? '/deleteWishlist' : '/addWishlist';

      const response = await apiClient.post(endpoint, payload);

      if (response.data.status === 1) {
        return { success: true, isInWishlist: !isInWishlist }; 
      } else {
        console.error('Failed to update wishlist:', response.data.title);
        return { success: false, error: response.data.title };
      }
    } catch (error) {
      console.error('Error handling wishlist:', error);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isWishlistLoading,
    toggleWishlist,
  };
};

import React, { createContext, useReducer, useEffect } from 'react';
import AppReducer from './AppReducer';
import initialState from './initialState';
import { registerForPushNotificationsAsync } from '../Service/pushNotificationService';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    (async () => {
      try {
        const token = await registerForPushNotificationsAsync();
        if (token) {
          console.log('✅ Fetched Expo Push Token:', token);
          dispatch({ type: 'SET_PUSH_TOKEN', payload: token });
        } else {
          console.warn('❌ Push Token is NULL.');
        }
      } catch (error) {
        console.error('❌ Error fetching push token:', error);
      }
    })();
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

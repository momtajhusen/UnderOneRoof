import { all } from "axios";

const initialState = {
  
  // User-related state
  userId: null,
  userNumber: null,
  shoppingMode: null,


    // Cart Data
    viewCartData: {},

    // user address 
    viewAddressData: [],

    // user select address 
    selectAddressData: [],


  // Refresh or Loader
  reFresh: false,
  isLoader: false,


};

export default initialState;

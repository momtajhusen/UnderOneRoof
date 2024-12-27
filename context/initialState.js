import { all } from "axios";

const initialState = {
  
  // User-related state
  userId: null,
  userNumber: null,

    // Cart Data
    viewCartData: {},

    // user address 
    viewAddressData: [],

    // user select address 
    selectAddressData: [],


  // Note
  reFresh: false,
};

export default initialState;

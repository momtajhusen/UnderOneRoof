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

  isWishlishRefresh: false,


  isCartLoader: false,


  productFilter: null,

  // order navigation 
  orderNavigation: null,


};

export default initialState;

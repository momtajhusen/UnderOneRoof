// Action Types
const SET_USER = 'SET_USER';
const CLEAR_USER = 'CLEAR_USER';

const GLOBAL_REFRESH = 'GLOBAL_REFRESH';

const VIEW_CART_DATA = 'VIEW_CART_DATA';

const VIEW_ADDRESS_DATA = 'VIEW_ADDRESS_DATA';

const SELECT_ADDRESS_DATA = 'SELECT_ADDRESS_DATA';




// Reducer
export default (state, action) => {
  switch (action.type) {
    // User actions
    case SET_USER:
      return {
        ...state,
        userId: action.payload.userId,
        userNumber: action.payload.userNumber,
      };

    case CLEAR_USER:
      return {
        ...state,
        userId: null,
        userNumber: null,
      };

    case GLOBAL_REFRESH:
        return {
          ...state,
          reFresh: action.payload,
        };


        case VIEW_CART_DATA:
          return {
            ...state,
            viewCartData: action.payload.viewCartData, 
          };

          case VIEW_ADDRESS_DATA:
            return {
              ...state,
              viewAddressData: action.payload.viewAddressData, 
            };

            case SELECT_ADDRESS_DATA:
              return {
                ...state,
                selectAddressData: [action.payload.selectAddressData],  
              };
            

    default:
      return state;
  }
};

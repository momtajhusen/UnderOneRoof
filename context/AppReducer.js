// Action Types
const SET_USER = 'SET_USER';
const CLEAR_USER = 'CLEAR_USER';

const GLOBAL_REFRESH = 'GLOBAL_REFRESH';


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

    default:
      return state;
  }
};

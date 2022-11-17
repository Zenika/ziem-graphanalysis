import { CHANGE_TABS_VALUE } from '../actions/tabs';

  
  export const initialState = {
    tabsValue: '1'
  };
  
  const reducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case CHANGE_TABS_VALUE:
          return {
            ...state,
            tabsValue: action.value,
          };
        
      default:
        return state;

    }
  };
  
  export default reducer;
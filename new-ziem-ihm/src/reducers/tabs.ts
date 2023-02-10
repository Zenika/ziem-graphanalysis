import { PayloadAction } from '@reduxjs/toolkit';
import { CHANGE_TABS_VALUE } from '../actions/tabs';

  
  export const initialState = {
    tabsValue: '1'
  };
  
  const reducer = (state = initialState, action: PayloadAction<boolean>) => {
    switch (action.type) {
        case CHANGE_TABS_VALUE:
          return {
            ...state,
            tabsValue: action.payload,
          };
        
      default:
        return state;

    }
  };
  
  export default reducer;
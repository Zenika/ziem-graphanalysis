import { SAVE_NEO4J_DATAS } from '../actions/graphDatas';


  
  export const initialState = {
    
  };
  
  const reducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case SAVE_NEO4J_DATAS:
          return {
            ...state,
            value: action.value,
          };
        
      default:
        return state;

    }
  };
  
  export default reducer;
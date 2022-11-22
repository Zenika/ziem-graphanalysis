import { PayloadAction } from '@reduxjs/toolkit';
import { GRAPH_IS_READY, SAVE_GRAPH_DATAS } from '../actions/graphDatas';
import { GraphDatas } from '../models/GraphDatas';


  export const initialState = {
    graphParameters: {
        curvature: 0.2,
        particleSpeedRange: [0.005, 0.03],
        exteriorNodeOpacity: 0.2,
        showArrowHead: false,
      },
    
    gDatas: 
    {},

    graphIsReady : false,
  };
  
  const reducer = (state = initialState, action: PayloadAction<GraphDatas>) => {
    switch (action.type) {
        case SAVE_GRAPH_DATAS:
          return {
            ...state,
            gDatas: action.payload,
          };

        case GRAPH_IS_READY:
          return {
            ...state,
            graphIsReady : action.payload
          };
        
      default:
        return state;

    }
  };
  
  export default reducer;
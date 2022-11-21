import { GRAPH_IS_READY, SAVE_GRAPH_DATAS } from '../actions/graphDatas';



  
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
  
  const reducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case SAVE_GRAPH_DATAS:
          return {
            ...state,
            gDatas: action.value,
          };

        case GRAPH_IS_READY:
          return {
            ...state,
            graphIsReady : action.graphIsReady
          };
        
      default:
        return state;

    }
  };
  
  export default reducer;
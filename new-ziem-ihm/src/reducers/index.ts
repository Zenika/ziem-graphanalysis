
import { combineReducers } from 'redux';
import tabsReducer from './tabs';
import graphDatasReducer from './graphDatas';


const rootReducer = combineReducers({
    tabs : tabsReducer,
    graphDatas : graphDatasReducer

});

export default rootReducer;
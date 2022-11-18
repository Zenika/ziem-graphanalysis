
import { combineReducers } from 'redux';
import tabsReducer from './tabs';
import neo4jDatasReducer from './neo4jDatas';


const rootReducer = combineReducers({
    tabs : tabsReducer,
    neo4jDatas : neo4jDatasReducer

});

export default rootReducer;
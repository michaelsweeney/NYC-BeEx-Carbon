import { combineReducers } from 'redux';

import uiReducer from './uireducer';
import buildingReducer from './buildingreducer';

const rootReducer = combineReducers({
	ui: uiReducer,
	building: buildingReducer,
});

export default rootReducer;

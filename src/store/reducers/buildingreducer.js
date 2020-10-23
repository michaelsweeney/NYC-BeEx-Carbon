import { compileBuilding } from '../../components/compilebuilding.js';
import { createDefaultBuilding, createDemoBuilding } from '../../components/defaultbuilding.js';

const initialState = {
	inputs: createDefaultBuilding(),
	compiled: compileBuilding(createDefaultBuilding()),
};

export default function buildingReducer(state = initialState, action) {
	switch (action.type) {
		case 'SET_BUILDING': {
			return {
				...state,
				inputs: action.payload,
				compiled: compileBuilding(action.payload),
			};
		}
		case 'SET_DEMO_BUILDING': {
			return {
				...state,
				inputs: createDemoBuilding(),
				compiled: compileBuilding(createDemoBuilding()),
			};
		}
		case 'SET_DEFAULT_BUILDING': {
			return {
				...initialState,
			};
		}
		default:
			return state;
	}
}

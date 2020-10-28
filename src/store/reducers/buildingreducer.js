import { compileBuilding } from '../../components/compilebuilding.js';
import { createDefaultBuilding, createDemoBuilding } from '../../components/defaultbuilding.js';

const initialState = {
	inputs: createDefaultBuilding(),
	compiled: compileBuilding(createDefaultBuilding()),
	isDefaultRates: false,
	loadedResponse: {},
};

export default function buildingReducer(state = initialState, action) {
	switch (action.type) {
		case 'SET_IS_DEFAULT_RATES': {
			return {
				...state,
				isDefaultRates: action.payload,
			};
		}

		case 'USE_DEFAULT_RATES': {
			let tempinputs = { ...state.inputs };
			tempinputs.utilities.elec.rate = '0.22';
			tempinputs.utilities.gas.rate = '0.997';
			tempinputs.utilities.steam.rate = '35';
			tempinputs.utilities.fuel_two.rate = '1.65';
			tempinputs.utilities.fuel_four.rate = '1.65';
			let tempbuilding = compileBuilding(tempinputs);
			return {
				...state,
				inputs: tempinputs,
				compiled: tempbuilding,
			};
		}
		case 'USE_NULL_RATES': {
			let tempinputs = { ...state.inputs };
			tempinputs.utilities.elec.rate = '';
			tempinputs.utilities.gas.rate = '';
			tempinputs.utilities.steam.rate = '';
			tempinputs.utilities.fuel_two.rate = '';
			tempinputs.utilities.fuel_four.rate = '';
			let tempbuilding = compileBuilding(tempinputs);
			return {
				...state,
				inputs: tempinputs,
				compiled: tempbuilding,
			};
		}

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

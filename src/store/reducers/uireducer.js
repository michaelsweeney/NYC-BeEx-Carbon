const initialState = {
	dims: {
		height: window.innerHeight,
		width: window.innerWidth,
	},
	isDemoMode: false,
	isLoadMode: false,

	infoModalActive: true,
	loadBldgModalActive: false,

	loadInputValue: '',
	loadInputResponse: [{}],
	loadTableData: [{}],
};

export default function uiReducer(state = initialState, action) {
	switch (action.type) {
		case 'SET_LOAD_TABLE_DATA': {
			return {
				...state,
				loadTableData: action.payload,
			};
		}
		case 'SET_LOAD_INPUT_VALUE': {
			return {
				...state,
				loadInputValue: action.payload,
			};
		}
		case 'SET_LOAD_INPUT_RESPONSE': {
			return {
				...state,
				loadInputResponse: action.payload,
			};
		}

		case 'SET_DIMENSIONS': {
			return {
				...state,
				dims: action.payload,
			};
		}
		case 'SET_IS_LOAD_MODE': {
			return {
				...state,
				isDemoMode: action.payload,
			};
		}

		case 'SET_IS_DEMO_MODE': {
			return {
				...state,
				isDemoMode: action.payload,
			};
		}
		case 'SET_LOAD_MODAL_ACTIVE': {
			return {
				...state,
				loadBldgModalActive: action.payload,
			};
		}
		case 'SET_INFO_MODAL_ACTIVE': {
			return {
				...state,
				infoModalActive: action.payload,
			};
		}
		default:
			return state;
	}
}

// ui actions
export function setDimensions(dims) {
	return {
		type: 'SET_DIMENSIONS',
		payload: dims,
	};
}

export function setIsDemoMode(bool) {
	return {
		type: 'SET_IS_DEMO_MODE',
		payload: bool,
	};
}

export function setIsLoadMode(bool) {
	return {
		type: 'SET_IS_LOAD_MODE',
		payload: bool,
	};
}

export function setLoadBldgModalActive(bool) {
	return {
		type: 'SET_LOAD_MODAL_ACTIVE',
		payload: bool,
	};
}

export function setInfoModalActive(bool) {
	return {
		type: 'SET_INFO_MODAL_ACTIVE',
		payload: bool,
	};
}

export function setBuilding(inputs) {
	return {
		type: 'SET_BUILDING',
		payload: inputs,
	};
}

export function setDefaultBuilding() {
	return {
		type: 'SET_DEFAULT_BUILDING',
	};
}
export function setDemoBuilding() {
	return {
		type: 'SET_DEMO_BUILDING',
	};
}
export function setIsSmallScreen(bool) {
	return {
		type: 'SET_IS_SMALL_SCREEN',
		payload: bool,
	};
}
// LOAD INPUT FUNCTIONS

export function setLoadTableData(data) {
	return {
		type: 'SET_LOAD_TABLE_DATA',
		payload: data,
	};
}

export function setLoadInputValue(value) {
	return {
		type: 'SET_LOAD_INPUT_VALUE',
		payload: value,
	};
}

export function setLoadInputResponse(response) {
	return {
		type: 'SET_LOAD_INPUT_RESPONSE',
		payload: response,
	};
}

// DEFAULT RATES

export function setIsDefaultRates(bool) {
	return {
		type: 'SET_IS_DEFAULT_RATES',
		payload: bool,
	};
}

export function useDefaultRates() {
	return {
		type: 'USE_DEFAULT_RATES',
	};
}

export function useNullRates() {
	return {
		type: 'USE_NULL_RATES',
	};
}

import { translateBuildingType } from './ll84buildingtypelookup';

const handleResponse = (val, callback) => {
	let fields = [
		'property_name',
		'property_id',
		'bbl_10_digits',
		'largest_property_use_type_1',
		'largest_property_use_type',
		'_2nd_largest_property_use',
		'_2nd_largest_property_use_1',
		'_3rd_largest_property_use',
		'_3rd_largest_property_use_1',
		'fuel_oil_2_use_kbtu',
		'fuel_oil_4_use_kbtu',
		'district_steam_use_kbtu',
		'natural_gas_use_kbtu',
		'electricity_use_grid_purchase',
	];
	let source = 'qb3v-bbre';
	// source = '28fi-3us3';
	let query =
		'https://data.cityofnewyork.us/resource/' +
		source +
		'.json?$query= SELECT ' +
		fields.toString() +
		" WHERE property_name LIKE '%25" +
		val +
		"%25' OR property_id LIKE '%25" +
		val +
		"%25' OR bbl_10_digits LIKE '%25" +
		val +
		"%25' OR address_1_self_reported LIKE '%25" +
		val +
		"%25' LIMIT 8";
	console.log(query);
	let xmlhttp = new XMLHttpRequest();
	xmlhttp.open('GET', query, true);
	xmlhttp.onreadystatechange = (d) => {
		console.log(d);
		let res = xmlhttp.response;
		console.log(res);
		let parsed;
		try {
			parsed = JSON.parse(res);
		} catch {
			parsed = JSON.parse(`"${res}"`);
		}
		if (parsed == '') {
			callback([{}]);
		} else {
			callback(parsed);
		}
		console.log(parsed);
	};
	xmlhttp.send();
};

const parseResponse = (response) => {
	let bldg = {
		types: {},
		utilities: {
			elec: {
				cons: 0,
				rate: 0,
			},
			gas: {
				cons: 0,
				rate: 0,
			},
			steam: {
				cons: 0,
				rate: 0,
			},
			fuel_two: {
				cons: 0,
				rate: 0,
			},
			fuel_four: {
				cons: 0,
				rate: 0,
			},
		},
	};

	const roundNum = (n) => {
		return Math.round(+n);
	};

	let steam_kbtu = response['district_steam_use_kbtu'];
	let gas_kbtu = response['natural_gas_use_kbtu'];
	let fuel_two_kbtu = response['fuel_oil_2_use_kbtu'];
	let fuel_four_kbtu = response['fuel_oil_4_use_kbtu'];
	let elec_kbtu = response['electricity_use_grid_purchase'];

	let elec = roundNum(elec_kbtu / 3.412);
	let steam = roundNum(steam_kbtu / 1194);
	let gas = roundNum(gas_kbtu / 100);
	let fuel_two = roundNum(fuel_two_kbtu / 138);
	let fuel_four = roundNum(fuel_four_kbtu / 146);

	bldg.utilities.elec = { cons: +elec || 0, rate: 0 };
	bldg.utilities.steam = { cons: +steam || 0, rate: 0 };
	bldg.utilities.gas = { cons: +gas || 0, rate: 0 };
	bldg.utilities.fuel_two = { cons: +fuel_two || 0, rate: 0 };
	bldg.utilities.fuel_four = { cons: +fuel_four || 0, rate: 0 };

	let bldg_type_one = response['largest_property_use_type'];
	let bldg_type_one_area = response['largest_property_use_type_1'];
	let bldg_type_two = response['_2nd_largest_property_use'];
	let bldg_type_two_area = response['_2nd_largest_property_use_1'];
	let bldg_type_three = response['_3rd_largest_property_use'];
	let bldg_type_three_area = response['_3rd_largest_property_use_1'];

	bldg.types = {
		1: {
			type: translateBuildingType(bldg_type_one).ll97_short,
			area: roundNum(bldg_type_one_area),
			id: 1,
		},
		2: {
			type: translateBuildingType(bldg_type_two).ll97_short,
			area: roundNum(bldg_type_two_area),
			id: 2,
		},
		3: {
			type: translateBuildingType(bldg_type_three).ll97_short,
			area: roundNum(bldg_type_three_area),
			id: 3,
		},
	};

	if (bldg_type_one === 'Not Available' || !bldg_type_one_area || bldg_type_one_area == 0) {
		delete bldg.types[1];
	}
	if (bldg_type_two === 'Not Available' || !bldg_type_two_area || bldg_type_two_area == 0) {
		delete bldg.types[2];
	}
	if (bldg_type_three === 'Not Available' || !bldg_type_three_area || bldg_type_three_area == 0) {
		delete bldg.types[3];
	}

	return bldg;
};

export { handleResponse, parseResponse };

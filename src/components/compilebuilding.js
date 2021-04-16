const compileBuilding = (building) => {
	const co2limitsbybuildingtype = {
		A: [0.01074, 0.0042, 0.0014],
		B_health: [0.02381, 0.0133, 0.0014],
		B_norm: [0.00846, 0.00453, 0.0014],
		E: [0.00758, 0.00344, 0.0014],
		F: [0.00574, 0.00167, 0.0014],
		H: [0.02381, 0.0133, 0.0014],
		I1: [0.01138, 0.00598, 0.0014],
		I2: [0.02381, 0.0133, 0.0014],
		I3: [0.02381, 0.0133, 0.0014],
		I4: [0.00758, 0.00344, 0.0014],
		M: [0.01181, 0.00403, 0.0014],
		R1: [0.00987, 0.00526, 0.0014],
		R2: [0.00675, 0.00407, 0.0014],
		S: [0.00426, 0.0011, 0.0014],
		U: [0.00426, 0.0011, 0.0014],
	};

	let area = 0;
	let co2limit_2024 = 0;
	let co2limit_2030 = 0;
	let co2limit_2035 = 0;
	let fine_per_ton_co2 = 268;

	let types = building.types;
	let utilities = building.utilities;

	Object.values(types).forEach((type) => {
		let limit_2024 = +co2limitsbybuildingtype[type.type][0] * +type.area;
		let limit_2030 = +co2limitsbybuildingtype[type.type][1] * +type.area;
		let limit_2035 = +co2limitsbybuildingtype[type.type][2] * +type.area;
		co2limit_2024 = co2limit_2024 + limit_2024;
		co2limit_2030 = co2limit_2030 + limit_2030;
		co2limit_2035 = co2limit_2035 + limit_2035;
		area = area + +type.area;
	});

	let elec_kbtu = +utilities.elec.cons * 3.412;
	let gas_kbtu = +utilities.gas.cons * 100;
	let steam_kbtu = +utilities.steam.cons * 1194;
	let fuel_two_kbtu = +utilities.fuel_two.cons * 138;
	let fuel_four_kbtu = +utilities.fuel_four.cons * 146;

	let elec_carbon = elec_kbtu * 0.000084689;
	let gas_carbon = gas_kbtu * 0.00005311;
	let steam_carbon = steam_kbtu * 0.00004493;
	let fuel_two_carbon = fuel_two_kbtu * 0.00007421;
	let fuel_four_carbon = fuel_four_kbtu * 0.00007529;

	let elec_cost = +utilities.elec.cons * +utilities.elec.rate;
	let gas_cost = +utilities.gas.cons * +utilities.gas.rate;
	let steam_cost = +utilities.steam.cons * +utilities.steam.rate;
	let fuel_two_cost = +utilities.fuel_two.cons * +utilities.fuel_two.rate;
	let fuel_four_cost = +utilities.fuel_four.cons * +utilities.fuel_four.rate;

	let elec_kbtu_norm = elec_kbtu / area;
	let gas_kbtu_norm = gas_kbtu / area;
	let steam_kbtu_norm = steam_kbtu / area;
	let fuel_two_kbtu_norm = fuel_two_kbtu / area;
	let fuel_four_kbtu_norm = fuel_four_kbtu / area;

	let elec_carbon_norm = elec_carbon / area;
	let gas_carbon_norm = gas_carbon / area;
	let steam_carbon_norm = steam_carbon / area;
	let fuel_two_carbon_norm = fuel_two_carbon / area;
	let fuel_four_carbon_norm = fuel_four_carbon / area;

	let elec_cost_norm = elec_cost / area;
	let gas_cost_norm = gas_cost / area;
	let steam_cost_norm = steam_cost / area;
	let fuel_two_cost_norm = fuel_two_cost / area;
	let fuel_four_cost_norm = fuel_four_cost / area;

	let total_cost = elec_cost + gas_cost + steam_cost + fuel_two_cost + fuel_four_cost;

	let total_carbon = elec_carbon + gas_carbon + steam_carbon + fuel_two_carbon + fuel_four_carbon;
	let fine_2024 = total_carbon > co2limit_2024 ? (total_carbon - co2limit_2024) * fine_per_ton_co2 : 0;
	let fine_2030 = total_carbon > co2limit_2030 ? (total_carbon - co2limit_2030) * fine_per_ton_co2 : 0;
	let fine_2035 = total_carbon > co2limit_2035 ? (total_carbon - co2limit_2035) * fine_per_ton_co2 : 0;

	if (area < 25000) {
		fine_2024 = 0;
		fine_2030 = 0;
		fine_2035 = 0;
		co2limit_2024 = 0;
		co2limit_2030 = 0;
		co2limit_2035 = 0;
	}

	let compiled = {
		summary: {
			total_carbon: total_carbon,
			total_cost: total_cost,
			total_area: area,
			co2limit_2024: co2limit_2024,
			co2limit_2030: co2limit_2030,
			co2limit_2035: co2limit_2035,
			fine_2024: fine_2024,
			fine_2030: fine_2030,
			fine_2035: fine_2035,
		},

		utilities: {
			native: {
				elec: +utilities.elec.cons,
				gas: +utilities.gas.cons,
				steam: +utilities.steam.cons,
				fuel_two: +utilities.fuel_two.cons,
				fuel_four: +utilities.fuel_four.cons,
			},

			rates: {
				elec: +utilities.elec.rate,
				gas: +utilities.gas.rate,
				steam: +utilities.steam.rate,
				fuel_two: +utilities.fuel_two.rate,
				fuel_four: +utilities.fuel_four.rate,
			},

			kbtu: {
				elec: elec_kbtu,
				gas: gas_kbtu,
				steam: steam_kbtu,
				fuel_two: fuel_two_kbtu,
				fuel_four: fuel_four_kbtu,
			},

			carbon: {
				elec: elec_carbon,
				gas: gas_carbon,
				steam: steam_carbon,
				fuel_two: fuel_two_carbon,
				fuel_four: fuel_four_carbon,
			},

			cost: {
				elec: elec_cost,
				gas: gas_cost,
				steam: steam_cost,
				fuel_two: fuel_two_cost,
				fuel_four: fuel_four_cost,
			},

			cost_sf: {
				elec: elec_cost_norm,
				gas: gas_cost_norm,
				steam: steam_cost_norm,
				fuel_two: fuel_two_cost_norm,
				fuel_four: fuel_four_cost_norm,
			},

			kbtu_sf: {
				elec: elec_kbtu_norm,
				gas: gas_kbtu_norm,
				steam: steam_kbtu_norm,
				fuel_two: fuel_two_kbtu_norm,
				fuel_four: fuel_four_kbtu_norm,
			},
			carbon_sf: {
				elec: elec_carbon_norm,
				gas: gas_carbon_norm,
				steam: steam_carbon_norm,
				fuel_two: fuel_two_carbon_norm,
				fuel_four: fuel_four_carbon_norm,
			},
		},
	};

	return compiled;
};

export { compileBuilding };

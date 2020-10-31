const LL84BuildingTypeLookup = {
	Office: 'B (Business)',
	'K-12 School': 'E (Educational)',
	Hotel: 'R-1 (Residential)',
	'Worship Facility': 'A (Assembly)',
	'Other - Lodging/Residential': 'R-1 (Residential)',
	'Distribution Center': 'M (Mercantile)',
	'Non-Refrigerated Warehouse': 'M (Mercantile)',
	'Refrigerated Warehouse': 'M (Mercantile)',
	'Manufacturing/Industrial Plant': 'M (Mercantile)',
	'Multifamily Housing': 'R-2 (Residential)',
	'Hospital (General Medical & Surgical)': 'I-2 (Institutional)',
	Other: 'A (Assembly)',
	'Other - Education': 'A (Assembly)',
	Museum: 'A (Assembly)',
	'Other - Entertainment/Public Assembly': 'A (Assembly)',
	'Retail Store': 'B (Business)',
	'College/University': 'E (Educational)',
	'Food Service': 'B (Business)',
	'Residence Hall/Dormitory': 'R-1 (Residential)',
	Laboratory: 'I-2 (Institutional)',
	'Medical Office': 'B (Business)',
	'Urgent Care/Clinic/Other Outpatient': 'I-2 (Institutional)',
	'Ambulatory Surgical Center': 'I-2 (Institutional)',
	'Other - Specialty Hospital': 'I-2 (Institutional)',
	'Other - Mall': 'B (Business)',
	'Senior Care Community': 'I-1 (Institutional)',
	'Pre-school/Daycare': 'E (Educational)',
	'Social/Meeting Hall': 'A (Assembly)',
	'Performing Arts': 'A (Assembly)',
	Parking: 'U (Utility/Misc)',
	'Adult Education': 'E (Educational)',
	'Self-Storage Facility': 'U (Utility/Misc)',
	'Financial Office': 'B (Business)',
	'Strip Mall': 'B (Business)',
	'Prison/Incarceration': 'I-3 (Institutional)',
	'Fitness Center/Health Club/Gym': 'B (Business)',
	'Bank Branch': 'B (Business)',
	'Wholesale Club/Supercenter': 'B (Business)',
	'Data Center': 'B (Business)',
	'Other - Services': 'U (Utility/Misc)',
	'Outpatient Rehabilitation/Physical Therapy': 'B (Business)',
	Library: 'A (Assembly)',
	'Other - Recreation': 'A (Assembly)',
	'Supermarket/Grocery Store': 'B (Business)',
	'Convenience Store without Gas Station': 'B (Business)',
	'Residential Care Facility': 'I-4 (Institutional)',
	'Movie Theater': 'A (Assembly)',
	'Enclosed Mall': 'A (Assembly)',
	'Automobile Dealership': 'B (Business)',
	'Mailing Center/Post Office': 'B (Business)',
	'Personal Services (Health/Beauty, Dry Cleaning, etc.)': 'B (Business)',
	Courthouse: 'A (Assembly)',
	'Other - Technology/Science': 'B (Business)',
	'Other - Public Services': 'B (Business)',
	'Repair Services (Vehicle, Shoe, Locksmith, etc.)': 'B (Business)',
	'Fire Station': 'B (Business)',
	'Police Station': 'B (Business)',
	'Wastewater Treatment Plant': 'F (Factory/Industrial)',
	'Veterinary Office': 'B (Business)',
	'Ice/Curling Rink': 'B (Business)',
	Zoo: 'A (Assembly)',
	'Transportation Terminal/Station': 'A (Assembly)',
	'Stadium (Open)': 'A (Assembly)',
	Restaurant: 'B (Business)',
	'Vocational School': 'E (Educational)',
	'Other - Restaurant/Bar': 'B (Business)',
	'Fast Food Restaurant': 'B (Business)',
	'Swimming Pool': 'A (Assembly)',
	'Bar/Nightclub': 'B (Business)',
	'Food Sales': 'B (Business)',
	'Other - Utility': 'U (Utility/Misc)',
	'Bowling Alley': 'B (Business)',
	'Single Family Home': 'R-2 (Residential)',
};

const buildingTypeAbbreviations = {
	'A (Assembly)': 'A',
	'B (Business)': 'B_norm',
	'B (Healthcare)': 'B_health',
	'E (Educational)': 'E',
	'F (Factory/Industrial)': 'F',
	'H (High Hazard)': 'H',
	'I-1 (Institutional)': 'I1',
	'I-2 (Institutional)': 'I2',
	'I-3 (Institutional)': 'I3',
	'I-4 (Institutional)': 'I4',
	'M (Mercantile)': 'M',
	'R-1 (Residential)': 'R1',
	'R-2 (Residential)': 'R2',
	'S (Storage)': 'S',
	'U (Utility/Misc)': 'U',
};

const translateBuildingType = ll84type => {
	const ll97_type_long = LL84BuildingTypeLookup[ll84type];
	const ll97_type_short = buildingTypeAbbreviations[ll97_type_long];
	return {
		ll84: ll84type,
		ll97_long: ll97_type_long ? ll97_type_long : 'A (Assembly)',
		ll97_short: ll97_type_short ? ll97_type_short : 'A',
	};
};

export { translateBuildingType };

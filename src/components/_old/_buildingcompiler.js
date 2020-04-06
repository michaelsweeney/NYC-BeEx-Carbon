
const co2limitsbybuildingtype = {
    A: [0.01074, 0.0042, 0.0014],
    B_health: [0.02381, 0.0133, 0.0014],
    B_norm: [0.00846, 0.00453, 0.0014],
    E: [0.00758, 0.00344, 0.0014],
    F: [0.00574, 0.00167, 0.0014],
    H: [0.02381, 0.01193, 0.0014],
    I1: [0.01138, 0.00598, 0.0014],
    I2: [0.02381, 0.01193, 0.0014],
    I3: [0.02381, 0.01193, 0.0014],
    I4: [0.00758, 0.00344, 0.0014],
    M: [0.01181, 0.00403, 0.0014],
    R1: [0.00987, 0.00526, 0.0014],
    R2: [0.00675, 0.00407, 0.0014],
    S: [0.00426, 0.0011, 0.0014],
    U: [0.00426, 0.0011, 0.0014],
}



/* compiler for a single building type. receives includes all user inputs and returns various metrics / fine info*/

class BuildingType {
    constructor(opts) {
        this.id = opts.id
        this.type = opts.type || 'A'
        this.area = opts.area || 0

        this.elec_cons = opts.elec_kwh || 0
        this.gas_cons = opts.gas_cons || 0
        this.steam_cons = opts.steam_cons || 0
        this.fuel_two_cons = opts.fuel_two_cons || 0
        this.fuel_four_cons = opts.fuel_four_cons || 0

        this.elec_rate = opts.elec_rate || 0.22
        this.gas_rate = opts.gas_rate || 0.997
        this.steam_rate = opts.steam_rate || 35
        this.fuel_two_rate = opts.fuel_two_rate || 1.65
        this.fuel_four_rate = opts.fuel_four_rate || 1.65

        this.update()
    }

    update() {
        this.normalizeconsumption()
        this.carbonbyutility()
        this.costbyutility()
        this.carbonlimits()
    }

    normalizeconsumption() {
        this.elec_kbtu = this.elec_cons * 3.412
        this.gas_kbtu = this.gas_cons * 100
        this.steam_kbtu = this.steam_cons * 1194
        this.fuel_two_kbtu = this.fuel_two_cons * 138
        this.fuel_four_kbtu = this.fuel_four_cons * 146

    }

    carbonbyutility() {
        this.elec_carbon = this.elec_kbtu * 0.000084689
        this.gas_carbon = this.gas_kbtu * 0.00005311
        this.steam_carbon = this.steam_kbtu * 0.00004493
        this.fuel_two_carbon = this.fuel_two_kbtu * 0.00007421
        this.fuel_four_carbon = this.fuel_four_kbtu * 0.00007529

    }

    costbyutility() {
        this.elec_cost = this.elec_cons * this.elec_rate
        this.gas_cost = this.gas_cons * this.gas_rate
        this.steam_cost = this.steam_cons * this.steam_rate
        this.fuel_two_cost = this.fuel_two_cons * this.fuel_two_rate
        this.fuel_four_cost = this.fuel_four_cons * this.fuel_four_rate

    }

    carbonlimits() {
        this.limit_2024 = this.area * co2limitsbybuildingtype[this.type][0]
        this.limit_2030 = this.area * co2limitsbybuildingtype[this.type][1]
        this.limit_2035 = this.area * co2limitsbybuildingtype[this.type][2]
    }
}





export { BuildingType }
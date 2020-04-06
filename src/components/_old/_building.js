


const fine_per_ton_co2 = 268;




/* compiler for a single building type. receives includes all user inputs and returns various metrics / fine info*/


// compiles multiple types, accepts an array of 'BuildingType' objects
class Building {
    constructor(opts) {
        this.types = opts.types || {}
        this.compile()
    }

    compile() {

        this.area = 0;

        this.limit_2024 = 0
        this.limit_2030 = 0
        this.limit_2035 = 0;

        this.elec_cost = 0;
        this.gas_cost = 0;
        this.steam_cost = 0;
        this.fuel_two_cost = 0;
        this.fuel_four_cost = 0;

        this.elec_cons = 0;
        this.gas_cons = 0;
        this.steam_cons = 0;
        this.fuel_two_cons = 0;
        this.fuel_four_cons = 0;

        this.elec_kbtu = 0;
        this.gas_kbtu = 0;
        this.steam_kbtu = 0;
        this.fuel_two_kbtu = 0;
        this.fuel_four_kbtu = 0;

        this.elec_carbon = 0;
        this.gas_carbon = 0;
        this.steam_carbon = 0;
        this.fuel_two_carbon = 0;
        this.fuel_four_carbon = 0;


        for (let i = 0; i < Object.keys(this.types).length; i++) {
            let key = Object.keys(this.types)[i]
            let type = this.types[key]

            type.update()

            this.area += type.area

            this.limit_2024 += type.limit_2024
            this.limit_2030 += type.limit_2030
            this.limit_2035 += type.limit_2035

            this.elec_carbon += type.elec_carbon
            this.gas_carbon += type.gas_carbon
            this.steam_carbon += type.steam_carbon
            this.fuel_two_carbon += type.fuel_two_carbon
            this.fuel_four_carbon += type.fuel_four_carbon

            this.elec_kbtu += type.elec_kbtu
            this.gas_kbtu += type.gas_kbtu
            this.steam_kbtu += type.steam_kbtu
            this.fuel_two_kbtu += type.fuel_two_kbtu
            this.fuel_four_kbtu += type.fuel_four_kbtu

            this.elec_cost += type.elec_cost
            this.gas_cost += type.gas_cost
            this.steam_cost += type.steam_cost
            this.fuel_two_cost += type.fuel_two_cost
            this.fuel_four_cost += type.fuel_four_cost

            this.elec_cons += type.elec_cons
            this.gas_cons += type.gas_cons
            this.steam_cons += type.steam_cons
            this.fuel_two_cons += type.fuel_two_cons
            this.fuel_four_cons += type.fuel_four_cons
        }

        // totals
        this.total_kbtu = this.elec_kbtu + this.gas_kbtu + this.steam_kbtu + this.fuel_two_kbtu + this.fuel_four_kbtu
        this.total_cost = this.elec_cost + this.gas_cost + this.steam_cost + this.fuel_two_cost + this.fuel_four_cost
        this.total_carbon = this.elec_carbon + this.gas_carbon + this.steam_carbon + this.fuel_two_carbon + this.fuel_four_carbon


        // bulding eui
        this.elec_eui = this.elec_kbtu / this.area
        this.gas_eui = this.gas_kbtu / this.area
        this.steam_eui = this.steam_kbtu / this.area
        this.fuel_two_eui = this.fuel_two_kbtu / this.area
        this.fuel_four_eui = this.fuel_four_kbtu / this.area
        this.total_eui = this.total_kbtu / this.area

        // building cost/sf
        this.elec_cost_per_sf = this.elec_cost / this.area
        this.gas_cost_per_sf = this.gas_cost / this.area
        this.steam_cost_per_sf = this.steam_cost / this.area
        this.fuel_two_cost_per_sf = this.fuel_two_cost / this.area
        this.fuel_four_cost_per_sf = this.fuel_four_cost / this.area
        this.total_cost_per_sf = this.total_cost / this.area


        // building carbon/sf
        this.elec_carbon_per_sf = this.elec_carbon / this.area
        this.gas_carbon_per_sf = this.gas_carbon / this.area
        this.steam_carbon_per_sf = this.steam_carbon / this.area
        this.fuel_two_carbon_per_sf = this.fuel_two_carbon / this.area
        this.fuel_four_carbon_per_sf = this.fuel_four_carbon / this.area

        this.total_carbon_per_sf = this.total_carbon / this.area

        // carbon total and fine
        this.carbon_fine_2024 = this.total_carbon <= this.limit_2024 ? 0 : (this.total_carbon - this.limit_2024) * fine_per_ton_co2
        this.carbon_fine_2030 = this.total_carbon <= this.limit_2030 ? 0 : (this.total_carbon - this.limit_2030) * fine_per_ton_co2
        this.carbon_fine_2035 = this.total_carbon <= this.limit_2035 ? 0 : (this.total_carbon - this.limit_2035) * fine_per_ton_co2
    }
}


export { Building }
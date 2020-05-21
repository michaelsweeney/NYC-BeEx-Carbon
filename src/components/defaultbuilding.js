
const defaultbuilding = {
    types: {
      1: {
        type: 'A',
        area: '',
        id: 1,
      }
    },
    utilities: {
      elec: {
        cons: '',
        rate: ''
      },
      gas: {
        cons: '',
        rate: ''
      },
      steam: {
        cons: '',
        rate: ''
      },
      fuel_two: {
        cons: '',
        rate: ''
      },
      fuel_four: {
        cons: '',
        rate: ''
      },
    },
  }


const demobuilding = {
  types: {
    1: {
      type: 'A',
      area: 60000,
      id: 1,
    },
  },
  utilities: {
    elec: {
      cons: 750000,
      rate: 0.193,
    },
    gas: {
      cons: 10000,
      rate: 1.001 
    },
    steam: {
      cons: 250,
      rate: 32.8,
    },
    fuel_two: {
      cons: 500,
      rate: 1.43
    },
    fuel_four: {
      cons: 0,
      rate: 1.43
    },
  },
}


  export {defaultbuilding, demobuilding}
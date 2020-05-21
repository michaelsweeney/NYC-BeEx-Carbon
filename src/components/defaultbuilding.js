
const defaultbuilding = {
    types: {
      1: {
        type: 'A',
        area: 0,
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
      area: 0,
      id: 1,
    }
  },
  utilities: {
    elec: {
      cons: 40,
      rate: 0.22,
    },
    gas: {
      cons: 30,
      rate: 1.0
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


  export {defaultbuilding, demobuilding}
const trips = [
  {
    departure: 'Zurich',
    destination: 'Wroclaw',
    airlines: 'Swiss',
    price: 300
  },
  {
    departure: 'Zurich',
    destination: 'Wroclaw',
    airlines: 'Luftwaffe',
    price: 350
  },
  {
    departure: 'Zurich',
    destination: 'Wroclaw',
    airlines: 'PL Lot',
    price: 900
  }
]

const extras = [
  { name: 'Drinks', price: 30 },
  { name: 'Less crapy movies', price: 15 },
  { name: 'No children in 3 seats proximity', price: 120 }
];

const insurances = [];

export function fetchData() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ trips, extras, insurances });
    }, 2000)
  })
}

export function submitPayment() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, 1500);
  });
}

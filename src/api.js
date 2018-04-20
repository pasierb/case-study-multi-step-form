const trips = [
  {
    id: 1,
    departure: 'Zurich',
    destination: 'Wroclaw',
    airlines: 'Swiss',
    price: 300
  },
  {
    id: 2,
    departure: 'Zurich',
    destination: 'Wroclaw',
    airlines: 'Luftwaffe',
    price: 350
  },
  {
    id: 3,
    departure: 'Zurich',
    destination: 'Wroclaw',
    airlines: 'PL Lot',
    price: 900
  }
]

const extras = [
  { id: 1, name: 'Drinks', price: 30 },
  { id: 2, name: 'Less crapy movies', price: 15 },
  { id: 3, name: 'No children in 3 seats proximity', price: 120 }
];

export function fetchData() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ trips, extras });
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

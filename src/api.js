const trips = [
  {
    id: 1,
    departure: 'Zurich',
    destination: 'Wroclaw',
    airlines: 'Swiss',
    logoUrl: 'https://www.webdesignerdepot.com/cdn-origin/uploads/2009/03/swissair3.gif',
    price: 300
  },
  {
    id: 2,
    departure: 'Zurich',
    destination: 'Wroclaw',
    airlines: 'Luftwaffe',
    logoUrl: 'https://www.webdesignerdepot.com/cdn-origin/uploads/2009/03/lufthansa4.gif',
    price: 350
  },
  {
    id: 3,
    departure: 'Zurich',
    destination: 'Wroclaw',
    airlines: 'PL Lot',
    logoUrl: 'https://www.webdesignerdepot.com/cdn-origin/uploads/2009/03/lot2.gif',
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
    }, 500)
  })
}

export function submitPayment() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      Math.random() * 100 < 70 ? resolve() : reject('Payment gateway timeout');
    }, 1500);
  });
}

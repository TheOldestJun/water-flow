import Dexie from 'dexie';

const db = new Dexie('waterDB');
db.version(2).stores({
  readings: '++id, hotKitchen, coldKitchen, hotBathroom, coldBathroom, sewer, date',
  tariffs: '++id, hot, cold, sewer, date',
  payments: '++id, hotFact, coldFact, sewerFact, date, calcHot, calcCold, calcSewer',
});

export default db
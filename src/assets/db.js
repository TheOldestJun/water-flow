import Dexie from 'dexie';

const db = new Dexie('waterDB');
db.version(1).stores({
  readings: '++id, hotKitchen, coldKitchen, hotBathroom, coldBathroom, date',
  tariffs: '++id, hot, cold, sewer, date',
  payments: '++id, hotFact, coldFact, sewerFact, date, calcHot, calcCold, calcSewer',
});

export default db
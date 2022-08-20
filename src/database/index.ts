import { createPool } from 'mysql';
import { optionDb } from './config';

const db = createPool(optionDb);

export default db;

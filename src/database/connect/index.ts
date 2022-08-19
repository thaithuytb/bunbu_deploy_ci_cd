import { Connection, createConnection } from 'mysql';

const connectDB: Connection = createConnection({
  //why do i have a error when i use hot, port and password in .env
  host: 'btlfgd71ynsj9onwruxf-mysql.services.clever-cloud.com',
  port: 3306,
  user: 'uzwxvd90orwjy3fx',
  password: 'zuYAfNhCObtLYhVv6LPp',
  database: 'btlfgd71ynsj9onwruxf',
});

export default connectDB;

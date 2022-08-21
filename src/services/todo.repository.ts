import { Pool } from 'mysql';

const todoService = (database: Pool, cb: any) => {
  return {
    getAll: async () => {
      await database.query('select * from todos', (err, result) => {
        if (err) {
          cb(err, null);
        }
        cb(null, result);
      });
    },
    getOne: async (id: string) => {
      await database.query(
        `select * from todos where id = ${id}`,
        (err, result) => {
          if (err) {
            cb(err, null);
          }
          cb(null, result[0]);
        }
      );
    },
  };
};

export default todoService;

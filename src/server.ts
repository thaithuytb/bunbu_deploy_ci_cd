import makeApp from './app';
import db from './database';

const PORT = process.env.PORT || 8888;

const app = makeApp(db);

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));

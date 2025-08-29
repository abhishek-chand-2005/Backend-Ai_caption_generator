const app = require('./src/app');
const connectTODB = require('./src/db/db')
require('dotenv').config()


connectTODB();

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at https://localhost:${PORT}`)
});
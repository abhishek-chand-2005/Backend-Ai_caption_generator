const express = require('express');
const authRoutes = require('./routes/auth.routes')
const cookieParser = require('cookie-parser')
const app = express();


app.use(express.json());
app.use(cookieParser())

app.use('/auth', authRoutes)
/*
app.use('/product', productRoutes)
app.use('/customer', customerRoutes)
*/

app.post('/todos', (req, res) => {
    const {title, description} = req.body;
    console.log(title, description);
});


module.exports = app;


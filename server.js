require('dotenv').config();
require('./config/database');
const cors = require('cors');
const express = require('express');
const server = require('http').createServer();
const port =  3000;

//load in the routes
const authRouter = require('./routes/auth');
const outcomesRouter = require('./routes/outcome');
const perfRouter = require('./routes/performance');
const proRouter = require('./routes/process');

const app = express();

//middleware
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//use routers
app.use('/', authRouter);
app.use('/outcomes', outcomesRouter);
app.use('/', perfRouter);
app.use('/', proRouter);

app.get('/', (req, res)=> {
    res.send('Welcome to the goal app')
})

app.listen(port, () => {
    console.log(`Connected to ${port}`)
});
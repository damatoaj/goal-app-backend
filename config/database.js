require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//shortcut to mongoose.connection object
const db = mongoose.connection;

db.on('connected', ()=> {
    console.log(`Connected to MongoDB at ${db.host}:${db.port}`)
})


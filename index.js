const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const {MONGODB_URI} = require('./keys');

const app = express();

app.use(cors());
app.use(express.json({limit: '50mb'}));  

app.use('/guns', require('./routes/guns'));
app.use('/categories', require('./routes/categories'));

async function start() {
    try {
       await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        app.listen(5555, () => {
            console.log('Server is running...');
        })
    } catch (e) {
        console.log(e);
    }
}

start();


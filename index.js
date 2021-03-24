const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongodb-session')(session);

const { MONGODB_URI, SESSION_SECRET } = require('./keys');

const app = express();

const store = MongoStore({
    collection: 'sessions',
    uri: MONGODB_URI,
});

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 31536000000,
        },
        store,
    }),
);

app.use('/guns', require('./routes/guns'));
app.use('/categories', require('./routes/categories'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/favorites', require('./routes/favorites'));
app.use('/api/cart', require('./routes/cart'));

async function start() {
    try {
        const db = await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        });

        app.listen(5555, () => {
            console.log('Server is running...');
        });
    } catch (e) {
        console.log(e);
    }
}

start();

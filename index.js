const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongodb-session")(session);

const { MONGODB_URI, SESSION_SECRET } = require("./keys");

const app = express();

const store = MongoStore({
    collection: "sessions",
    uri: MONGODB_URI,
});

app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.enable("trust proxy");
app.use(
    session({
        secret: SESSION_SECRET,
        saveUninitialized: false,
        cookie: {
            maxAge: 31536000000,
            secure: true,
            domain: "guns-store.herokuapp.com",
            sameSite: "none",
        },
        store,
    }),
);

app.get("/", async (req, res) => {
    res.end("Hello, it is api for guns store. Example /api/products");
});
app.use("/api/products", require("./routes/products"));
app.use("/api/categories", require("./routes/categories"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/favorites", require("./routes/favorites"));
app.use("/api/cart", require("./routes/cart"));
app.use("/api/orders", require("./routes/orders"));
app.use("/api/recei-options", require("./routes/receiOptions"));
app.use("/api/pay-options", require("./routes/payOptions"));
app.use("/api/types", require("./routes/types"));
app.use("/api/kinds", require("./routes/kinds"));
app.use("/api/filters", require("./routes/filters"));

async function start() {
    try {
        const db = await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        });

        app.listen(process.env.PORT || 5555, () => {
            console.log("Server is running...");
        });
    } catch (e) {
        console.log(e);
    }
}

start();

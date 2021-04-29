const session = require("express-session");
const MongoStore = require("connect-mongo");

const DBURL = process.env.DBURL

module.exports = (app) => {
    app.use(
        session({
            secret: process.env.SECRET,
            resave: true,
            saveUninitialized: false,
            cookie: {
                maxAge: 3600000
            },
            store: MongoStore.create({
                mongoUrl: DBURL
            })
        })
    )
}
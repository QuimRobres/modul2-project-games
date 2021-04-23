require("dotenv").config();
const express = require("express");

//Database
require("./configs/db.config");
//Debbuger
require('./configs/debbuger.config');

const app = express();

// Middleware Setup
require('./configs/middleware.config')(app)

//Configs
require('./configs/views.config')(app);
require('./configs/locals.config')(app);
require('./configs/session.config')(app);
require('./configs/passport.config')(app);

//Routes
const index = require("./routes/index");
const authRoutes = require('./routes/auth.routes')

app.use("/", index);
app.use('/public', authRoutes);

module.exports = app;
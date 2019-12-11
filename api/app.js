const express = require('express');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
const db = require('./config/database');

app.use(express.json());
app.use(cookieParser());

const studentsRoutes = require('./routes/students.routes');
const updatesRoutes = require('./routes/updates.routes');

app.use('/', studentsRoutes);
app.use('/', updatesRoutes);

db();
const port = 3000 || process.env.PORT;

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
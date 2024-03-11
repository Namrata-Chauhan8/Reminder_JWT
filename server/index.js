const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const route = require("../server/route/Route.js");
const Route = require("../server/route/reminderList.js");
const cookieParser=require("cookie-parser");

app.use(cors({ credentials: true , origin: "http://localhost:3000" }));
// Middleware to parse JSON data
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

require ("./database/Db.js");
const port = 8000;

require("./model/User.js");


app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.use('/api',route);
app.use('/api2',Route);

app.use((err, req, res, next) => {
  console.error(err.stack);   
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ error: err.message || 'Internal Server Error' });
});

app.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
});

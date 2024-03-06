const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongodb = require('./db/connect');

const port = process.env.PORT || 8080;
const app = express();


const userRoutes = require('./routes/users');
const addressRoutes = require('./routes/addresses');
const relationshipRoutes = require('./routes/relationships')

app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Z-Key');
  next();
});


app.use('/', require('./routes'));
app.use('/users', userRoutes);
app.use('/addresses', addressRoutes);
app.use('/relationship', relationshipRoutes)


process.on('uncaughtException', (err, origin) => {
  console.error(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});


//app
  //.use(bodyParser.json())
  //.use((req, res, next) => {
   // res.setHeader('Access-Control-Allow-Origin', '*');
    //next();
 // })
 // .use('/', require('./routes'));

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});

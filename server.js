const express = require('express');
const cors = require('cors');
const timeStamp = require('./middleware/timestamp');
const app = express();

app.use(cors());
app.use(express.static('public'));

app.set("view engine", "ejs");

app.get('/', (req, res) => {
  res.render('index');
})

app.get('/api/:date_string?', timeStamp)

app.listen(process.env.PORT || 3500, () => {
  console.log('Server is running');
})
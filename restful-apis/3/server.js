const express = require('express');
const fetch = require('node-fetch');

const app = express();
const port = 4002;

let apiKey = 'a6aa191acc94e4aa44c22802be8d7b85';
let city = 'craiova';
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`


app.get('/', async (req, res) => {
  const apiRes = await fetch(url);
  const body = await apiRes.json();
  res.json(body);

  console.log(body);
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
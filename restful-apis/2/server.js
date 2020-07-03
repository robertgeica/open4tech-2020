const express = require('express');
const cors = require('cors');
const bp = require('body-parser');
const fs = require('fs');

const DATA_FILE = 'data.json';
const port = 4002;
var app = express();
app.use(bp.json());

var data;
try {
  var dataBuffer = fs.readFileSync(DATA_FILE);
  data = JSON.parse(dataBuffer);
} catch (err) {
  console.log('error:', err);
  data = [];
}

const saveToFile = (file, dataArray, callback) => {
  fs.writeFile(file, JSON.stringify(dataArray), callback);
};

app.get('/data', (req, res) => {
  res.json(data);
});

app.post('/add', (req, res) => {
  data.push(req.body);

  saveToFile(DATA_FILE, data, (err) => {
    if (err)
      return res.status(500).send();
    return res.json(data);
  });
});

app.delete('/data/:id', (req, res) => {
	let index = parseInt(req.params.id);
	if(index > data.length -1)
		return res.status(400).end();

	data.splice(index, 1);
	saveToFile(DATA_FILE, data, (err) => {
		if(err)
			return res.status(500).send();
		return res.json(data);
	});
});

app.put('/data/:id', (req, res) => {
	let index = parseInt(req.params.id);
	if(index > data.length -1) 
		return res.status(400).end();
	data[index] = req.body;

	saveToFile(DATA_FILE, data, err => {
		if(err)
			return res.status(500).send();
		return res.json(data);
	});
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
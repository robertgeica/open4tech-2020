const express = require('express');
const cors = require('cors');
const bp = require('body-parser');
const port = 4002;

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

var app = express();
app.use(bp.json());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/review', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const dataSchema = new Schema({
	review: {type: String, required: true}
});

const Data = mongoose.model('Data', dataSchema);


app.get('/data', (req, res) => {
	Data.find(function(err, data) {
		if(err)
			console.error('error', err);
		
  	res.json(data);

	});
});

app.post('/add', (req, res) => {
	let d = new Data(req.body);
	
  d.save()
		.then(data => {
			res.status(200).json({'message': 'added successfully'});
		})
		.catch(err => {
			res.status(400).send('added new qa failed');
		});

});


app.delete('/data/:id', (req, res) => {
	let id = req.params.id;

	Data.findByIdAndRemove({_id: id})
		.then(doc => {
			res.send(doc)
		})
		.catch(err => {
			console.log('error', err);
		})
})


app.put('/data/:id', (req, res) => {
	let id = req.params.id;

	Data.findById(req.params.id, function(err, data) {
		
		if(!data) {
			res.status(404).send('data not found');
		} else {

			data.review = req.body.review;

			data.save()
			.then(data => {
				res.status(200).json(data);
			})
			.catch(err => {
				res.status(400).send('update failed');
			});

		}
	})
})


app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: '10780d471875486c940000ebf757f3ce'
});

const handleAPI = (req,res) => {
	app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(data => {
      	res.json(data)
      })
      .catch(err => res.status(400).json('Unable to handle API'))
}

const handleImage = (req,res,db) => {
	const { id } = req.body;
	db('user').where('id','=',id)
	.increment('entries',1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0])
	})
	.then(err => res.status(400).json('No such user'))
}

module.exports = {
	handleImage:handleImage,
	handleAPI:handleAPI
};
const handleReset = (req,res,bcrypt,db) => {
	const {email,password,password2} = req.body;
	if(!email || !password || !password2){
		return res.status(400).json("Field values cannot be empty")
	}
	var hash = bcrypt.hashSync(password);
	//console.log(hash)
	db.select('email','hash').from('login')
	.where('email','=',email)
	.then(data => {
		//console.log(data)
		if(data[0].email){
			db('login')
			  .where({ email: email })
			  .update({ hash: hash }, ['email', 'hash'])
				.then(data => {
					db.select('*').from('user')
					.where('email','=',email)
					.then(user => {
						res.json(user[0])
				})
			})
		} else {
			res.status(400).json('Email not found')
		}
	})
	.catch(err => res.status(400).json('Invalid Email'))
}

module.exports = {
	handleReset:handleReset
};
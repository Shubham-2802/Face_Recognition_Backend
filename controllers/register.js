const handleRegister = (req,res,bcrypt,db) => {
	const {name, email, password} = req.body;
	if (!name || !email || !password){
		return res.status(400).json("Unable to register")
	}
	var hash = bcrypt.hashSync(password);
	db.transaction(trx => {
		trx.insert({
			hash:hash,
			email:email
		})
	.into('login')
	.returning('email')
	.then(loginEmail => {
		return trx('user')
		.returning('*')
		.insert({
				email:loginEmail[0],
				name:name,
				joined:new Date()
			})
		.then(user => {
		 res.json(user[0])
		})
		.then(trx.commit)
		.catch(trx.rollback)
	})
    })
	
	.catch(err => res.status(400).json('Unable to Register'))
}

module.exports = {
	handleRegister: handleRegister
};
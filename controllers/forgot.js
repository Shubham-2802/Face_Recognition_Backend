const handleForgot = (req,res,db) => {
	const {email} = req.body;
	if(!email){
		return res.status(400).json("Email field cannot be empty")
	}
	db.select('email','hash').from('login')
	.where('email','=',email)
	.then(data => {
		if(data[0].email){
			return db.select('*').from('user')
			.where('email','=',email)
			.then(user =>{
				res.json(user[0])
			})
			.catch(err => res.status(400).json('No such user'))
		} else {
			res.status(400).json('wrong user email')
		}
	})
	.catch(err => res.status(400).json('No such User'))
}

module.exports = {
	handleForgot:handleForgot
};
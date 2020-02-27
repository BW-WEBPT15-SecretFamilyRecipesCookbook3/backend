const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../.config/secrets.js');
const Users = require('../users/user-model.js');

router.post('/register', (req, res) => {
	const user = req.body;

	const hash = bcrypt.hashSync(user.password, 10);

	user.password = hash;

	Users.add(req.body)
		.then(saved => {
			console.log(saved);
			const token = generateToken(saved);
			res.status(201).json({ user: saved, token: token });
		})
		.catch(err => {
			res.status(500).json({ message: "Failed to add user.", error: err});
		});
});

router.post('/login', (req, res) => {
	const {email, password} = req.body;

	Users.findBy({email})
		.first()
		.then(user => {
			if (user && bcrypt.compareSync(password, user.password)) {
				req.session.user = user;
				const token = generateToken(user);
				res.status(200).json({ message: `Welcome ${user.email}!`, token: token });
			} else {
				res.status(401).json({ message: 'Invalid Credentials' });
			}
		})
		.catch(error => {
			console.log(error);
			res.status(500).json(error);
		});
});

router.get('/logout', (req, res) => {
	if (req.session.user) {
		req.session.destroy(err => {
			if (err) {
				res.json({ message: "failed to logout"});
			} else {
				res.status(200).json({ message: "Logged Out"});
			}
		})
	} else {
		res.status(400).json({ message: "You weren't logged in."});
	}
})

function generateToken(user) {
	const payload = {
		subject: user.id,
		email: user.email
	};
	const options = {
		expiresIn: '1h'
	};
	return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;

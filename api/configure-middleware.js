const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');

const sessionConfig = {
	name: "SessionName",
	secret: "Could be anything.",
	cookie: {
		maxAge: 1000 * 60 * 60,
		secure: true, // true in production
		httpOnly: true,
	},
	resave: false,
	saveUninitialized: false, // GDPR Compliance
};

module.exports = server => {
	server.use(helmet());
	server.use(express.json());
	server.use(cors());
	server.use(session(sessionConfig));
}

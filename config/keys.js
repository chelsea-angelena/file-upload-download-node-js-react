//do not commit keys_dev.js

if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
	module.exports = () => {
		const dev_keys = require('./keys_dev.js');
	};
}

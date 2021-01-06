//do not commit keys_dev.js
if (process.env.NODE_ENV !== 'production') {
	module.exports = () => {
		const dev_keys = require('./keys_dev.js');
	};
}

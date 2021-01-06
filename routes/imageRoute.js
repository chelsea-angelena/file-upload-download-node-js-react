const fs = require('fs');
const multer = require('multer');
const path = require('path');

module.exports = (app) => {
	const storage = multer.diskStorage({
		// destination: './images',
		destination: (req, file, cb) => {
			cb(null, 'uploads');
		},
		filename: (req, file, cb) => {
			cb(null, Date.now() + '-' + file.originalname);
		},
	});

	const upload = multer({ storage: storage }).array('file');

	app.post('/api/images', (req, res) => {
		console.log(req.body);
		upload(req, res, function (err) {
			if (err instanceof multer.MulterError) {
				return res.status(500).json(err);
			} else if (err) {
				return res.status(500).json(err);
			}
			return res.status(200).send(req.file);
		});
	});
};

var fs = require('fs');
// const tinify = require('tinify');
// tinify.key = process.env.TINIIFY_API;
// tinify.proxy = `http://user:${tinify.key}@192.168.0.1:8080`;
var multer = require('multer');
const path = require('path');

module.exports = (app) => {
	var storage = multer.diskStorage({
		// destination: './images',
		destination: (req, file, cb) => {
			cb(null, 'uploads');
		},
		filename: (req, file, cb) => {
			cb(null, file.name + '-' + Date.now());
		},
	});

	var upload = multer({ storage: storage });
	var Image = require('../../../models/image');

	app.post('/api/images', upload.single('file'), (req, res, next) => {
		var obj = {
			name: req.body.name,
			// desc: req.body.desc,

			img: {
				data: fs.readFileSync(
					path.join(__dirname + '../../../../uploads/' + req.file.filename)
				),
				contentType: 'image/png',
			},
		};
		Image.create(obj, (err, item) => {
			console.log(obj, 'object');
			if (err) {
				console.log(err, 'imgModel Err');
			} else if (obj) {
				item.save();
			}
		});
		res.send('uploaded');
	});
	// fs.readFile(img, function (err, sourceData) {
	// 	if (err) throw err;
	// 	tinify.fromBuffer(sourceData).toBuffer(function (err, resultData) {
	// 		if (err) throw err;
	// 		// ...
	// 	});
	// });

	app.get('/api/images', (req, res) => {
		Image.find({}, (err, items) => {
			if (err) {
				console.log(err);
			} else {
				res.json({ items: items });
				// res.render('app', { items: items });
			}
		});
	});
};

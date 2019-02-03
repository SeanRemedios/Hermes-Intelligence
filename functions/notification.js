const lib = require('lib')({token: process.env.STDLIB_TOKEN});
/**
* A basic app
* @returns {Buffer}
*/
module.exports = (objectid='', context, callback) => {
	lib[`${context.service.identifier}.read`]({
			read: true,
			id: objectid
		},
		(err, result) => {
			// if (err) console.log(err);
			// console.log(result);
			return callback(null, result);
		}
	);
};
/**
* A basic app
* @returns {Buffer}
*/
module.exports = (objectid='', context, callback) => {
	console.log(objectid);
	return callback(null, objectid);
};
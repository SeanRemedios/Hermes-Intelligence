const ejs = require('ejs');
const fs = require('fs');
const templatePath = __dirname + '/../static/index.ejs';

/**
* A basic app
* @returns {Buffer}
*/
module.exports = (objectid='', context, callback) => {
	if (objectid != '') {
		const NOTIFICATION = 'notificiations.notification';
		lib[`${context.service.identifier}.${NOTIFICATION}`](
			objectid,
			(err, result) => {
				let message = err ? err.message : result;
				send(
					from.number,
					message,
					to.number,
					callback
				);
			});
	}

  	return ejs.renderFile(
		templatePath,
		{
			SERVICE_PATH: context.service.identifier
		},
		{},
		(err, response) =>
			callback(err, new Buffer.from(response || ''), { 'Content-Type': 'text/html' })
  	);
};

const ejs = require('ejs');
const fs = require('fs');
const templatePath = __dirname + '/../static/index.ejs';

/**
* A basic app
* @returns {Buffer}
*/
module.exports = (context, callback) => {
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

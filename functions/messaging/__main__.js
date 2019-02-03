const lib = require('lib')({token: process.env.STDLIB_TOKEN});
const request = require('request');
const send = require('../../helpers/send.js');

const HANDLER 		= 0;
const ACTION 		= 1;
const PHONE 		= 2;
const FROM_ADDRESS 	= 3;
const TO_ADDRESS 	= 4;
const MINUTE 		= -5;
const HOUR 			= -4;
const DAY_OF_MONTH	= -3;
const MONTH			= -2;
const DAY_OF_WEEK 	= -1;
const MAX			= 10;

const DEV_ENVIRONMENT = '@dev';
const RELEASE_ENVIRONMENT = '@0.01';
const ENVIRONMENT = DEV_ENVIRONMENT;

const SERIVCE = 'seanr/hia';
const CREATE_ACTION = 'create';
const DELETE_ACTION = 'delete';
const FUNCTION_NAME = 'notifications';

const DATABASE_HANDLER = 'database';

/**
* Main messaging (SMS/MMS) handler. Upon receiving a message, first check to
*		see if there's media (MMS), if so, invoke __notfound__ handler with a media
*		object, otherwise, check to see if message corresponds to a handler (more,
*		whoami), invoke that if possible, or invoke __notfound__ with raw contents
*		of message body.
* @param {string} Body The message contents
* @param {string} From The inbound number
* @param {string} FromZip The zip associated with inbound number
* @param {string} FromCity The city associated with inbound number
* @param {string} FromState The state associated with inbound number
* @param {string} FromCountry The country associated with inbound number
* @param {string} To The outbound number, i.e. your Twilio Number
* @param {string} ToZip The zip associated with outbound number
* @param {string} ToCity The city associated with outbound number
* @param {string} ToState The state associated with outbound number
* @param {string} ToCountry The country associated with outbound number
* @param {string} AccountSid The Twilio Account SID - sent from Twilio, used to verify webhook authenticity
* @returns {object}
*/
module.exports = (
	Body = '',
	From = '',
	FromZip = '',
	FromCity = '',
	FromState = '',
	FromCountry = '',
	To = '',
	ToZip = '',
	ToCity = '',
	ToState = '',
	ToCountry = '',
	AccountSid = '',
	context,
	callback
) => {

	if (context.service.environment !== 'local' && process.env.TWILIO_ACCOUNT_SID !== AccountSid) {
		return callback(new Error('Can only invoke from valid Twilio Webhook'));
	}

	console.log(context);

	// Create some developer-friendly to / from objects
	let from = {
		number: From,
		zip: FromZip,
		city: FromCity,
		state: FromState,
		country: FromCountry
	};

	let to = {
		number: To,
		zip: ToZip,
		city: ToCity,
		state: ToState,
		country: ToCountry
	};

	let numMedia = parseInt(context.params.NumMedia);

	if (numMedia > 0) {
		message = 'No media allowed';
		send(from.number, message, to.number, callback);
		return callback(new Error(message));
	} else {

		text = Body.split(" ");
	  	action = text[ACTION] // Identifies create, delete, update or read
	  	
	  	// TODO : Get parameters based on action
	  	createResult = parseCreate(text, Body);

		var item = {
			text: createResult,
			completed: false
		};

		// No image, try to find a handler for the message, default to __notfound__
		let handler = Body.toLowerCase().split(" ")[HANDLER].trim().replace(/[^a-z0-9_-]/gi, '_');
		if (handler === DATABASE_HANDLER) {
			lib[`${context.service.identifier}.${action}`](
				item, 
				(err, result) => {
					createResult.id = result;
					const tasks_wrapper = lib.seanr.taskswrapper[ENVIRONMENT];
					let task_result = tasks_wrapper({
						data: createResult, 
						service: SERIVCE, 
						action: CREATE_ACTION, 
						functionName: ''
					}, (err, tasksresult) => {

						let message = err ? err.message : result;
						send(
							from.number,
							message,
							to.number,
							callback
						);

					});

			});
		}

	}

};

parseCreate = (text, full_text) => {
	addresses = getAddress(full_text);
	console.log(addresses)

  	// CREATE
  	let create = {
		phone: text[PHONE],
		fromAddress: addresses[0],
		toAddress: addresses[1],
		cron: text[text.length+MINUTE] + " " + text[text.length+HOUR] + " " + text[text.length+DAY_OF_MONTH] + " " + text[text.length+MONTH] + " " + text[text.length+DAY_OF_WEEK]
	};

	return create;
}

getAddress = (text) => {
	var regex  = /\[([^\]]*)]/g;

	var matches = [];
	while (m = regex.exec(text)) {
		matches.push(m[1]);
	}
	console.log(matches);
	console.log('-----');
	return matches;
}
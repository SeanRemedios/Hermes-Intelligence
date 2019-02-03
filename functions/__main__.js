const lib = require('lib')({token: process.env.STDLIB_TOKEN});
const ejs = require('ejs');
const fs = require('fs');
const templatePath = __dirname + '/../static/index.ejs';

var ObjectID = require('mongodb').ObjectID;   
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const send = require('../helpers/send.js');

let cache = null;

/**
* A basic app
* @returns {Buffer}
*/
module.exports = (objectid='', context, callback) => {
	if (objectid) {
		console.log(objectid);
		connectDB(objectid, callback);
		
		// lib[`${context.service.identifier}.notification`](
		// 	objectid,
		// 	(err, result) => {
		// 		// if (err) console.log(err);
		// 		// console.log('test');
		// 		return callback(null, result);
		// 	});
	} else {

	  	return ejs.renderFile(
			templatePath,
			{
				SERVICE_PATH: context.service.identifier
			},
			{},
			(err, response) =>
				callback(err, new Buffer.from(response || ''), { 'Content-Type': 'text/html' })
	  	);
  	}
};


connectDB = (id, callback) => {
	let uri = process.env['MONGO_URI'];

	try {
		if (cache === null) {
			MongoClient.connect(uri, (error, db) => {
				if (error) {
					console.log(error['errors']);
					return callback(error);
				}
				cache = db;
				readID(id, db, callback);
			});
		} else {
			readID(id, cache, callback);			
		}
	} catch (error) {
		console.log(error);
		return callback(error);
	}
}

const readID = (id, db, callback) => {
	db.collection('reminders').findOne({_id: new ObjectID(id)}, (err, result) => {
		if (err) console.log(err);
		// console.log(result);
		task = {
			phone: result.phone + "",
			fromAddress: result.fromAddress + "",
			toAddress: result.toAddress + "",
			cron: result.cron + ""
		};
		console.log(task);

		send(
			task.phone,
			task.cron, // Message here
			process.env.TWILIO_NUMBER,
			callback
		);

		// return callback(null, task);
	});
}

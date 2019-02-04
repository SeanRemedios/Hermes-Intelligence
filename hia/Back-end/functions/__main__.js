const lib = require('lib')({token: process.env.STDLIB_TOKEN});
const ejs = require('ejs');
const fs = require('fs');
const templatePath = __dirname + '/../static/index.ejs';

const striptags = require('striptags');

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
	console.log(objectid);

	if (objectid) {
		console.log(objectid);
		connectDB(objectid, context, callback);
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


connectDB = (id, context, callback) => {
	let uri = process.env['MONGO_URI'];

	try {
		if (cache === null) {
			MongoClient.connect(uri, (error, db) => {
				if (error) {
					console.log(error['errors']);
					return callback(error);
				}
				cache = db;
				readID(id, db, context, callback);
			});
		} else {
			readID(id, cache, context, callback);			
		}
	} catch (error) {
		console.log(error);
		return callback(error);
	}
}

const readID = (id, db, context, callback) => {
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


		lib[`${context.service.identifier}.directions`]({
			body: 'direction drive from ' + task.fromAddress + ' to ' + task.toAddress
		}, (err, result) => {
			if (err) console.log(err);

			// console.log(result);

			baseTime = Math.floor(result.summary.baseTime/60);
			trafficTime = Math.floor(result.summary.trafficTime/60);
			distancekm = Math.floor(result.summary.distance/1000); 
			route = result.leg[0].maneuver;

			const RATIO = 1/6;
			if (baseTime <= trafficTime*RATIO) {
				console.log("TRAFFIC BITCHES");
				outText = "There is traffic from " + task.fromAddress + " to " + task.toAddress + ". It will take " + trafficTime + " mins to get there. \nFinding alternate route...\n"
				outText += getDirections(route);
			} else {
				console.log("No traffic");
				outText = "There is no traffic from " + task.fromAddress + " to " + task.toAddress + ". It will take " + baseTime + " mins to get there."
			}

			send(
				task.phone,
				outText, // Message here
				process.env.TWILIO_NUMBER,
				callback
			);
		});

		

		// return callback(null, task);
	});
}

getDirections = (leg) => {
	direction_List = [];
	leg.forEach(element => {
		let curr_step = element.instruction +" ("+ element.length+"m )";
		let regex = /(&nbsp;|<([^>]+)>)/ig;
		direction_List.push(striptags(curr_step,["div"]).replace(regex, " "));
		res = direction_List.join('\n\n');
	});
	return res;
}

"use strict";
const
	net = require('net'),
	client = net.connect({port:5432});

client.on('data', function(data) {
	let message = JSON.parse(data);
	if(message.type === 'watching') {
		console.log("Now watching: " + message.file);
	} else if (message.type === 'changed') {
		let date = new Date(message.timestamp);
		console.log("File '" + message.file + "' changed at " + date);
	} else {
		throw Error("Unrecognized message type: " + message.type);
	}
});

client.on('error', function(error) {
	console.log("Server had an error of some sort. Server will close connection shortly.");
	console.log(error.stack);
});

client.on('end', function() {
	console.log("Received FIN packet from server.  Client should end now.");
});

client.on('close', function(hadError) {
	console.log("Server has fully closed socket.");
	if(hadError) {
		throw Error("Server closed with a tranmission error.");
	}
});



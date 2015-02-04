"use strict";

const
	net = require('net'),
	ldj = require('./ldj.js'),
	netClient = net.connect({ port: 5432 }),
	ldjClient = ldj.connect(netClient);

ldjClient.on('message', function(message) {
	if (message.type === 'watching') {
		console.log("Now watching: " = message.file);
	} else if (message.type === 'changed') {
		console.log("File '" + message.file + "' changed at " + new Date(message.timestamp));
	} else {
		throw Error("Unrecognized message type: " + message.type);
	}
});

netClient.on('error', function(error) {
	console.log("Server had an error of some sort. Server will close connection shortly.");
	console.log(error.stack);
});

netClient.on('end', function() {
	console.log("Received FIN packet from server.  Client should end now.");
});

netClient.on('close', function(hadError) {
	console.log("Server has fully closed socket.");
	if(hadError) {
		throw Error("Server closed with a tranmission error.");
	}
});




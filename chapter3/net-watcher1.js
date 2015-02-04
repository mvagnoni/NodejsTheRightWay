'use strict';

const
	fs = require('fs'),
	net = require('net'),
	filename = process.argv[2],

	watcher = fs.watch(filename),
	server = net.createServer(function(connection) {
		//reporting
		console.log('Subscriber connected.');
		connection.write("Now watching '" + filename + "' for changes...\n");

		//watcher setup
		watcher.on('change', function(eventType, filename2){
		//let watcher = fs.watch(filename, function() {
			let now = new Date(Date.now());
			connection.write("File '" + filename2 + "' " + eventType + ": " + now + "\n");
		})
		
		//cleanup
		connection.on('close', function() {
			console.log('Subscriber disconnected.');
			watcher.close();
		});
	});

if(!filename) {
	throw Error('No target filename was specified.');
}

server.listen(5432, function() {
	console.log('Listening for subscribers...');
});



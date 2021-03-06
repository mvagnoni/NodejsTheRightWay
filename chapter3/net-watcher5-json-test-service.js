"use strict"

const
	net = require('net'),
	server = net.createServer(function(connection) {
		console.log('Subscriber connected');

		//send the first chunk immediately
		connection.write('{"type": "changed", "file":"targ');

		//after a one second delay, send the other chunk
		let timer = setTimeout(function() {
			connection.write('et.text", "timestamp": 1358175758495}' + "\n");
			connection.write('{"type": "changed", "file":"target.text", "timestamp": 1358175858495}' + "\n");
			connection.write('{"type": "changed", "file":"target.text", "timestamp": 1358179758596}' + "\n");
			connection.write('{"type": "changed", "file":"target.text", "timestamp": 1358185758697}' + "\n");
			connection.write('{"type": "changed", "file":"target.text", "timestamp": 1358195758798}' + "\n");
			connection.end();
		}, 1000);

		//clear time when the connection ends
		connection.on('end', function() {
			clearTimeout(timer);
			console.log('Subscriber disconnected');
		});
	});

server.listen(5432, function() {
	console.log('Test server listening for subscribers...');
});



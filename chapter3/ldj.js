"use strict";

const
	events = require('events'),
	util = require('util'),
	// client constructor
	LDJClient = function(stream) {
		events.EventEmitter.call(this);
		let 
			self = this,
			buffer = '';
		stream.on('data', function(data) {
			buffer += data;
			let boundary = buffer.indexOf('\n');
			while(boundary !== -1) {
				let input = buffer.substr(0, boundary);
				buffer = buffer.substr(boundary +1);
				
				try {	
					self.emit('message', JSON.parse(input));
				} catch(e) {
					self.emit('error', e);
				}	
				
				//incase there are more messages in the buffer.
				boundary = buffer.indexOf('\n'); 
			}
		});

		stream.on('close', function(hadError) {
			self.emit('close', hadError);
		});

		stream.on('error', function(error) {
			self.emit('error', error);
		});

		stream.on('end', function() {
			self.emit('end');
		}
	};
util.inherits(LDJClient, events.EventEmitter);

//expose module methods
exports.LDJClient = LDJClient;
exports.connect = function(stream) {
	return new LDJClient(stream);
};

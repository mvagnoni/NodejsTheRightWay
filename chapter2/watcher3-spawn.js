"use strict";

const fs = require('fs');
const filename = process.argv[2];
const spawn = require('child_process').spawn;

if(!filename) { 
	throw Error("A file to watch must be specified!");
}
fs.exists(filename, function(exists) {
	if(exists) {
		fs.watch(filename, function() {
			let ls = spawn('ls', ['-lh', filename]);
			ls.stdout.pipe(process.stdout);
		});
		console.log("Now watching '" + filename + "' for changes...");
	}
	else {
		throw Error("A file to watch must be specified!");
	}
});



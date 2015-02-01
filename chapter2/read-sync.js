const
  fs = require('fs'),
  data = fs.readFileSync(process.argv[2]);

process.stdout.write(data.toString());


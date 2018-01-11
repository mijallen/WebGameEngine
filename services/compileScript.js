var express = require('express');
var router = express.Router();

var exec = require('child_process').exec;

/*
    REST Service API:
      PUT /
        input: N/A
        output: N/A
        description: compiles script.ts to script.js
        statuses: 204 No Content
*/

router.put('/',
    function(request, response) {
        var command = "tsc";

        exec(command, function(error, stdout, stderr) {
            console.log("compiling source...");
            if (stdout) console.log(stdout);
            if (stderr) console.error(stderr);
            console.log("done compiling.");

            response.writeHead(204);
            response.end();
        });
    }
);

module.exports = router;

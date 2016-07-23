var express = require('express');
var router = express.Router();

var exec = require('child_process').execSync;

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
        exec("tsc ./scripts/script.ts ./engine/ShaderProgram.d.ts ./engine/VertexBufferSet.d.ts --outFile ./pages/scripts/script.js");

        response.writeHead(204);
        response.end();
    }
);

module.exports = router;

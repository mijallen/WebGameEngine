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
        //var command = "tsc ";

        //command += "./engine/ShaderProgram.d.ts "; // order of compilation matters
        //command += "./engine/VertexBufferSet.d.ts ";
        //command += "./engine/Matrix4f.ts ";
        //command += "./scripts/script.ts ";

        //command += "--outFile ./pages/scripts/script.js"

        // temporary workaround for development, will need to fix this to be more dynamic
        command = "compile";

        exec(command);

        response.writeHead(204);
        response.end();
    }
);

module.exports = router;

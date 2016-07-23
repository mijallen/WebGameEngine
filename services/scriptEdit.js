var fs = require('fs');
var express = require('express');
var router = express.Router();

/*
    REST Service API:
      GET /
        input: N/A
        output: {"scripts": [array_of_script_file_names]}
        description: lists all current script files
        statuses: 200 OK
      GET /:scriptName
        input: N/A
        output: {"contents": "current_contents_of_scriptName_file"}
        description: gets current contents of scriptName files
        statuses: 200 OK, 400 Bad Request, 404 Not Found
      PUT /:scriptName
        input: {"contents": "new_contents_of_scriptName_file"}
        output: N/A
        description: creates scriptName file with contents, or updates existing scriptName file
        statuses: 204 No Content, 400 Bad Request
      DELETE /:scriptName
        input: N/A
        output: N/A
        description: deletes scriptName file
        statuses: 204 No Content, 400 Bad Request, 404 Not Found
*/
/*
router.all('*',
    function(request, response, next) {
        response.setHeader('Content-Type', 'application/json');
        next();
    }
);*/

router.get('/',
    function(request, response) {
        fs.readdir('./scripts',
            function(error, files) {
                response.setHeader('Content-Type', 'application/json');
                response.end(JSON.stringify(files));
            }
        );
    }
);

// rejected characters should be \/:*?"<>| for Windows and maybe %.
function validateFileName(fileName) {
    // check that fileName ends with proper TypeScript extension
    if (!fileName.endsWith('.ts')) return false;

    var nameWithoutExtension = fileName.substring(0, fileName.length - 4);

    // check that name of file does not contain invalid characters
    var invalidCharacters = /[\\/:*?"<>|%.]/;
    if (invalidCharacters.test(nameWithoutExtension)) return false;

    return true;
}

router.use('/:scriptName', // look out for url-encoded characters like / -> %2F
    function(request, response, next) {
        var scriptName = request.params.scriptName;

        response.setHeader('Content-Type', 'text/plain');

        if (validateFileName(scriptName)) next();
        else {
            response.writeHead(400);
            response.end('please ensure filename does not contain invalid characters');
        }
    }
);

router.get('/:scriptName',
    function(request, response) {
        var scriptName = request.params.scriptName;
        var scriptPath = './scripts/' + scriptName;

        fs.readFile(scriptPath, "UTF-8",
            function(error, data) {
                if (error) {
                    response.writeHead(404);
                    response.end();
                    return;
                }

                response.end(data);
            }
        );
    }
);

function saveFileAndRespond(filePath, fileContents, response) {
    fs.writeFile(filePath, fileContents,
        function(error) {
            response.writeHead(204);
            response.end();
        }
    );
}

router.put('/:scriptName',
    function(request, response) {
        var scriptName = request.params.scriptName;
        var scriptPath = './scripts/' + scriptName;

        var contentLength = request.headers['content-length'];

        if (contentLength == 0) {
            saveFileAndRespond(scriptPath, '', response);
        }

        request.on('data', // doesn't occur on blank input
            function(data) {
                saveFileAndRespond(scriptPath, data, response);
            }
        );

    }
);

router.delete('/:scriptName',
    function(request, response) {
        var scriptName = request.params.scriptName;
        var scriptPath = './scripts' + scriptName;

        console.log('delete called on ' + scriptPath);

        response.writeHead(204);
        response.end();
    }
);

module.exports = router;

var express = require('express');
var app = express();

var server = app.listen(8080);

app.use('/static', express.static('pages'));

app.get('/',
    function(request, response) {
        response.redirect('/static/scriptEditorClient.html');
    }
);

var scriptEditorService = require('./services/scriptEdit');
app.use('/service/scripts', scriptEditorService);

var compileScriptService = require('./services/compileScript');
app.use('/service/compile', compileScriptService);

app.use('/media', express.static('media'));

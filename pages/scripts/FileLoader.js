function FileLoader() {
    var m_loadFile = function(fileName, callback, responseType) {
        var request = new XMLHttpRequest();
        request.open("GET", "/media/" + fileName);
        request.responseType = responseType;

        request.onload = function(error) {
            if (request.status == 200) {
                callback(request.response);
            }
        }

        request.send();
    };

    this.loadBinaryFile = function(fileName, callback) {
        return m_loadFile(fileName, callback, "arraybuffer");
    };

    this.loadTextFile = function(fileName, callback) {
        return m_loadFile(fileName, callback, "text");
    };
}

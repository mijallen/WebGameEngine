function HashTable() {
    var m_hashMap = {}; // MUST HAVE VAR IN FRONT, OTHERWISE MIGHT BE STATIC VARIABLE!!!

    this.insert = function(key, value) {
        m_hashMap[key] = value;
    };

    this.clear = function() {
        m_hashMap = {};
    };

    this.remove = function(key) {
        delete m_hashMap[key];
    };

    this.get = function(key) {
        return m_hashMap[key];
    };

    this.keys = function() {
        var keyArray = [];
        for (var key in m_hashMap) keyArray.push(key);
        return keyArray;
    };
}

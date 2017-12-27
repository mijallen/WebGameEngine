/*
ShaderProgram - contains handles for shaders and program, cached locations
 -create()
   -createShader
   -createProgram
   -attachShader
 -compileAndLink(vertexSource, fragmentSource)
   -shaderSource
   -compileShader
   -linkProgram
 -setAsCurrent()
   -useProgram
 -useAttributeVec(name, dimensions)
   -enableVertexAttribLocation (cached)
   -getAttribLocation (cached)
   -vertexAttribPointer
 -useUniform(name, type, value)
   -getUniformLocation (cached)
   -uniform*
   -uniformMatrix*
*/

function ShaderProgram() {
    var m_attributeLocations = new HashTable();
    var m_uniformLocations = new HashTable();

    var m_vertexHandle = gl.createShader(gl.VERTEX_SHADER);
    var m_fragmentHandle = gl.createShader(gl.FRAGMENT_SHADER);
    var m_programHandle = gl.createProgram();

    gl.attachShader(m_programHandle, m_vertexHandle);
    gl.attachShader(m_programHandle, m_fragmentHandle);

    this.compileAndLink = function(vertexShaderSource, fragmentShaderSource) {
        gl.shaderSource(m_vertexHandle, vertexShaderSource);
        gl.compileShader(m_vertexHandle)

        if (!gl.getShaderParameter(m_vertexHandle, gl.COMPILE_STATUS)) {
            console.error(gl.getShaderInfoLog(m_vertexHandle));
        }

        gl.shaderSource(m_fragmentHandle, fragmentShaderSource);
        gl.compileShader(m_fragmentHandle);

        if (!gl.getShaderParameter(m_fragmentHandle, gl.COMPILE_STATUS)) {
            console.error(gl.getShaderInfoLog(m_fragmentHandle));
        }

        gl.linkProgram(m_programHandle);

        if (!gl.getProgramParameter(m_programHandle, gl.LINK_STATUS)) {
            console.error(gl.getProgramInfoLog(m_programHandle));
        }

        // clear attribute locations on recompile?
        m_uniformLocations.clear();
    };

    this.setAsCurrent = function() {
        gl.useProgram(m_programHandle);
    };

    this.useAttributeVec = function(attributeName, dimensions) {
        var attributeLocation = m_attributeLocations.get(attributeName);

        // can validate dimensions in [1,4] and matches GLSL type

        if (attributeLocation === undefined) {
            attributeLocation = gl.getAttribLocation(m_programHandle, attributeName);
            gl.enableVertexAttribArray(attributeLocation);

            m_attributeLocations.insert(attributeName, attributeLocation);
        }

        gl.vertexAttribPointer(attributeLocation, dimensions, gl.FLOAT, false, 0, 0);
    };

    var m_uniformFunctionByType = {};
    m_uniformFunctionByType["int"] = function(uniformLocation, uniformValue) {
        gl.uniform1i(uniformLocation, uniformValue);
    };
    m_uniformFunctionByType["float"] = function(uniformLocation, uniformValue) {
        gl.uniform1f(uniformLocation, uniformValue);
    };
    m_uniformFunctionByType["vec3"] = function(uniformLocation, uniformValue) {
        gl.uniform3fv(uniformLocation, uniformValue);
    };
    m_uniformFunctionByType["mat4"] = function(uniformLocation, uniformValue) {
        gl.uniformMatrix4fv(uniformLocation, false, uniformValue);
    };
    m_uniformFunctionByType["sampler2D"] = function(uniformLocation, uniformValue) {
        gl.uniform1i(uniformLocation, uniformValue);
    };
    this.useUniform = function(uniformName, uniformType, uniformValue) {
        var uniformLocation = m_uniformLocations.get(uniformName);

        if (uniformLocation === undefined) {
            uniformLocation = gl.getUniformLocation(m_programHandle, uniformName);

            m_uniformLocations.insert(uniformName, uniformLocation);
        }

        m_uniformFunctionByType[uniformType](uniformLocation, uniformValue);
    };
}

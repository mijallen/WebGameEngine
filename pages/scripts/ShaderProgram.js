/*
ShaderProgram - contains handles for shaders and program, cached locations
 -create(vertexSource, fragmentSource)
   -createShader
   -shaderSource
   -compileShader
   -createProgram
   -attachShader
   -linkProgram
 -setAsCurrent()
   -useProgram
 -setUniformMatrix4fv(name, Float32Array)
   -getUniformLocation (cached)
   -uniformMatrix4fv
 -useAttributeVec3(name)
   -enableVertexAttribLocation (cached)
   -getAttribLocation (cached)
   -vertexAttribPointer
*/

function ShaderProgram(vertexShaderSource, fragmentShaderSource) {
    var m_attributeLocations = new HashTable();
    //m_uniformLocations = new HashTable();

    var m_vertexHandle = gl.createShader(gl.VERTEX_SHADER);
    var m_fragmentHandle = gl.createShader(gl.FRAGMENT_SHADER);
    var m_programHandle = gl.createProgram();

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

    gl.attachShader(m_programHandle, m_vertexHandle);
    gl.attachShader(m_programHandle, m_fragmentHandle);
    gl.linkProgram(m_programHandle);

    if (!gl.getProgramParameter(m_programHandle, gl.LINK_STATUS)) {
        console.error(gl.getProgramInfoLog(m_programHandle));
    }

    this.setAsCurrent = function() {
        gl.useProgram(m_programHandle);
    };

    this.useAttributeVec3 = function(attributeName) {
        var attributeLocation = m_attributeLocations.get(attributeName);

        if (attributeLocation === undefined) {
            attributeLocation = gl.getAttribLocation(m_programHandle, attributeName);
            gl.enableVertexAttribArray(attributeLocation);

            m_attributeLocations.insert(attributeName, attributeLocation);
        }

        gl.vertexAttribPointer(attributeLocation, 3, gl.FLOAT, false, 0, 0);
    };
}
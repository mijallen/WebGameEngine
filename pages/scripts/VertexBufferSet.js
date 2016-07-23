/*
VertexBufferSet - contains set of vertex buffers used for same object
 -create(Float32Array, type?) - for required "vertex" array
   -createBuffer
   -bindBuffer
   -bufferData
 -addNewAttribute(name, Float32Array, type?) - should validate length is correct
   -createBuffer
   -bindBuffer
   -bufferData
 -setAsCurrent(name)
   -bindBuffer
 -draw()
   -drawArrays()
*/

function VertexBufferSet(vertexArray, indexArray) {
    var m_bufferHandles = new HashTable();
    var m_indexBufferHandle = gl.createBuffer();

    var m_vertexCount = vertexArray.length / 3;
    var m_indexCount = indexArray.length;

    this.setAsCurrent = function(attributeName) {
        gl.bindBuffer(gl.ARRAY_BUFFER, m_bufferHandles.get(attributeName));
    };

    this.draw = function() {
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, m_indexBufferHandle);
        gl.drawElements(gl.TRIANGLES, m_indexCount, gl.UNSIGNED_SHORT, 0);
    };

    this.addNewAttribute = function(attributeName, attributeArray) {
        m_bufferHandles.insert(attributeName, gl.createBuffer());

        this.setAsCurrent(attributeName);

        gl.bufferData(gl.ARRAY_BUFFER, attributeArray, gl.STATIC_DRAW);
    };

    this.addNewAttribute("vertex", vertexArray);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, m_indexBufferHandle);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indexArray, gl.STATIC_DRAW);
}

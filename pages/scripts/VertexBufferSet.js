/*
VertexBufferSet - contains set of vertex buffers used for same object
 -create()
 -setindexArray(array)
   -createBuffer
   -bindBuffer
   -bufferData
 -setAsCurrent(name)
   -bindBuffer
 -draw()
   -drawElements
 -setAttribute(name, Float32Array, type?) - should validate length is correct
   -createBuffer
   -bindBuffer
   -bufferData
*/

function VertexBufferSet() {
    var m_bufferHandles = new HashTable();

    var m_indexBufferHandle = null;
    var m_indexCount = 0;

    this.setIndexArray = function(indexArray) {
        if (m_indexBufferHandle == null)
            m_indexBufferHandle = gl.createBuffer();

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, m_indexBufferHandle);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indexArray, gl.STATIC_DRAW);

        m_indexCount = indexArray.length;
    };

    this.setAsCurrent = function(attributeName) {
        gl.bindBuffer(gl.ARRAY_BUFFER, m_bufferHandles.get(attributeName));
    };

    this.draw = function() {
        // may also want to account for when indexArray not defined
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, m_indexBufferHandle);
        gl.drawElements(gl.TRIANGLES, m_indexCount, gl.UNSIGNED_SHORT, 0);
    };

    this.setAttribute = function(attributeName, attributeArray) {
        // could take dimensions as an argument for validation, maybe even optional
        if (m_bufferHandles.get(attributeName) === undefined)
            m_bufferHandles.insert(attributeName, gl.createBuffer());

        this.setAsCurrent(attributeName);

        gl.bufferData(gl.ARRAY_BUFFER, attributeArray, gl.STATIC_DRAW);
    };
}

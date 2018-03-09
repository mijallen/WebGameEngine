/*
Texture2D - contains handle for texture and allows layering
 -create()
   -createTexture
   -texParameteri
 -setAsCurrent(layer)
   -activeTexture
   -bindTexture
 -setPixels(width, height, data)
   -texImage2D
*/

function Texture2D() {
    var m_textureHandle = gl.createTexture();

    gl.bindTexture(gl.TEXTURE_2D, m_textureHandle);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);

    this.setAsCurrent = function(layer) {
        gl.activeTexture(gl.TEXTURE0 + layer);
        gl.bindTexture(gl.TEXTURE_2D, m_textureHandle);
    };

    this.setPixels = function(width, height, bitDepth, pixelData) {
        var format = gl.RGBA;
        if (bitDepth == 24) format = gl.RGB;

        this.setAsCurrent(0);
        gl.texImage2D(gl.TEXTURE_2D, 0, format, width, height, 0, format, gl.UNSIGNED_BYTE, pixelData);
    };
}

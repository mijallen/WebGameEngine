declare class VertexBufferSet {
    constructor(vertexArray: Float32Array, indexArray: Uint16Array);
    setAsCurrent(attributeName: string): void;
    draw(): void;
    addNewAttribute(attributeName: string, attributeArray: Float32Array): void;
}

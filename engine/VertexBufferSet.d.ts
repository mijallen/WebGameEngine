declare class VertexBufferSet {
    public constructor();

    public setIndexArray(indexArray: Uint16Array): void;
    public setAsCurrent(attributeName: string): void;
    public draw(): void;
    public setAttribute(attributeName: string, attributeArray: Float32Array): void;
}

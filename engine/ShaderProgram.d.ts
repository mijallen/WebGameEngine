declare class ShaderProgram {
    constructor (vertexShaderSource: string, fragmentShaderSource: string);
    setAsCurrent(): void;
    useAttributeVec3(attributeName: string): void;
}

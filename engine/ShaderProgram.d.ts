declare class ShaderProgram {
    constructor (vertexShaderSource: string, fragmentShaderSource: string);
    setAsCurrent(): void;
    useAttributeVec3(attributeName: string): void;
    useUniformFloat(uniformName: string, floatValue: number): void;
    useUniformMatrix4(uniformName: string, matrix: Float32Array): void;
    useUniform(uniformName: string, uniformType: string, uniformValue: any);
}

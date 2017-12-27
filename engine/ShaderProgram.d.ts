declare class ShaderProgram {
    public constructor();

    public compileAndLink(vertexShaderSource: string, fragmentShaderSource: string): void;
    public setAsCurrent(): void;
    public useAttributeVec(attributeName: string, dimensions: number): void;
    public useUniform(uniformName: string, uniformType: string, uniformValue: number|Float32Array|Int32Array|ArrayBuffer): void;
}

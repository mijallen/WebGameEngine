class Shader extends GameEntity {
    vertexSource: string;
    fragmentSource: string;

    attributeVariables: string[];
    uniformVariables: string[];

    constructor(vertexShader: string, fragmentShader: string) {
        super();

        this.vertexSource = vertexShader;
        this.fragmentSource = fragmentShader;

        this.attributeVariables = [];
        this.uniformVariables = [];
    }

    public getVertexShaderSource(): string {
        return this.vertexSource;
    }

    public getFragmentShaderSource(): string {
        return this.fragmentSource;
    }

    public addAttributeVariable(variableName: string): void {
        this.attributeVariables.push(variableName);
    }

    public getAttributeVariables(): string[] {
        return this.attributeVariables;
    }

    public addUniformVariable(variableName: string): void {
        this.uniformVariables.push(variableName);
    }

    public getUniformVariables(): string[] {
        return this.uniformVariables;
    }
}

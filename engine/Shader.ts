// -- SHADER -- //

class Shader {
    private shaderProgram: any;
    private vertexSource: string;
    private fragmentSource: string;

    private attributes: Map<string, string>;
    private uniforms: Map<string, string>;

    private dirty: boolean;

    public constructor() {
        this.shaderProgram = new ShaderProgram();
        this.fragmentSource = null;
        this.vertexSource = null;

        this.attributes = new Map<string, string>();
        this.uniforms = new Map<string, string>();

        this.dirty = false;
    }

    public setSource(vertexSource: string, fragmentSource: string): void {
        if (this.vertexSource != vertexSource) {
            this.vertexSource = vertexSource;
            this.dirty = true;
        }

        // possibly clear uniform and attribute sets if source code is different
        if (this.fragmentSource != fragmentSource) {
            this.fragmentSource = fragmentSource;
            this.dirty = true;
        }

        // REMOVE COMMENTED OUT GLSL CODE BEFORE RUNNING THIS
        let attributePattern: RegExp = /attribute\s+(float|(?:vec|mat)(?:2|3|4))\s+([^\W\d]\w*(?:\s*,\s*[^\W\d]\w*)*)\s*;/g;
        for (
            let declaration: string[] = attributePattern.exec(vertexSource);
            declaration != null;
            declaration = attributePattern.exec(vertexSource)
        ) {
            let GLSLType: string = declaration[1];
            let variables: string[] = declaration[2].split(",");

            // maybe look for variables with reserved words as names (like "float" or "for")
            for (let variableName of variables) {
                this.addAttribute(variableName.trim(), GLSLType);
            }
        }

        let uniformPattern: RegExp = /uniform\s+(float|int|bool|(?:b|i)?vec(?:2|3|4)|mat(?:2|3|4)|sampler(?:2D|Cube))\s+([^\W\d]\w*(?:\s*,\s*[^\W\d]\w*)*)\s*;/g;
        for (
            let declaration: string[] = uniformPattern.exec(vertexSource);
            declaration != null;
            declaration = uniformPattern.exec(vertexSource)
        ) {
            let GLSLType: string = declaration[1];
            let variables: string[] = declaration[2].split(",");

            for (let variableName of variables) {
                this.addUniform(variableName.trim(), GLSLType);
            }
        }
        for (
            let declaration: string[] = uniformPattern.exec(fragmentSource);
            declaration != null;
            declaration = uniformPattern.exec(fragmentSource)
        ) {
            let GLSLType: string = declaration[1];
            let variables: string[] = declaration[2].split(",");

            for (let variableName of variables) {
                this.addUniform(variableName.trim(), GLSLType);
            }
        }
    }

    public getVertexSource(): string {
        return this.vertexSource;
    }

    public getFragmentSource(): string {
        return this.fragmentSource;
    }

    public addAttribute(name: string, GLSLType: string): void {
        this.attributes.set(name, GLSLType);
    }

    public addUniform(name: string, GLSLType: string): void {
        this.uniforms.set(name, GLSLType);
    }

    public getAttributes(): string[] {
        return Utility.getMapKeysArray<string, string>(this.attributes);
    }

    public getUniforms(): string[] {
        return Utility.getMapKeysArray<string, string>(this.uniforms);
    }

    // rewrite JS ShaderProgram to use different functions based on GLSL type
    public useAttribute(name: string): void {
        var GLSLType = this.attributes.get(name);
        switch (GLSLType) {
            case "float":
                this.shaderProgram.useAttributeVec(name, 1);
                break;
            case "vec2":
                this.shaderProgram.useAttributeVec(name, 2);
                break;
            case "vec3":
                this.shaderProgram.useAttributeVec(name, 3);
                break;
            case "vec4":
                this.shaderProgram.useAttributeVec(name, 4);
                break;
        }
    }

    public useUniform(name: string, value: UniformData): void {
        var GLSLType = this.uniforms.get(name);
        this.shaderProgram.useUniform(name, GLSLType, value);
    }

    public setAsCurrent(): void {
        if (this.dirty) {
            this.shaderProgram.compileAndLink(this.vertexSource, this.fragmentSource);
            this.dirty = false;
        }

        this.shaderProgram.setAsCurrent();
    }
}

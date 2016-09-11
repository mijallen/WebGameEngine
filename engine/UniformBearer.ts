class UniformBearer extends GameEntity {
    private uniforms: HashTable;

    constructor() {
        super();
        this.uniforms = new HashTable();
    }

    addBooleanValue(name: string, value: boolean) {
        this.uniforms.insert(name, new BooleanUniform(value));
    }

    addFloatValue(name: string, value: number) {
        this.uniforms.insert(name, new FloatUniform(value));
    }

    addTransform(name: string, value: CachedTransform) {
        this.uniforms.insert(name, value);
    }

    setBooleanValue(name: string, value: boolean) {
        this.uniforms.get(name).setValue(value);
    }

    setFloatValue(name: string, value: number) {
        this.uniforms.get(name).setValue(value);
    }

    getUniformValue(name: string): Object {
        return this.uniforms.get(name).getValue();
    }

    getUniformType(name: string): string {
        return this.uniforms.get(name).getGLSLType();
    }
}

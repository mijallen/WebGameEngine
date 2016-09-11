class Material extends UniformBearer {
    shad: Shader;

    constructor(effect: Shader) {
        super();
        this.shad = effect;
    }

    // need uniformset for things like shininess, diffuse, etc.
}

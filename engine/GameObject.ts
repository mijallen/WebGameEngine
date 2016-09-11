class GameObject extends UniformBearer {
    geom: Geometry;
    shad: Shader;
    tran: SpatialTransform;

    //unif: UniformSet;

    constructor(vertexData: Geometry, effect: Shader) {
        super();

        this.geom = vertexData;
        this.shad = effect;
        this.tran = new SpatialTransform();

        //this.unif = new UniformSet();
        //this.unif.addTransform("worldMatrix", this.tran);
        this.addTransform("worldMatrix", this.tran);
    }

    public getGeometry(): Geometry {
        return this.geom;
    }

    public getShader(): Shader {
        return this.shad;
    }

    public getTransform(): SpatialTransform {
        return this.tran;
    }
/*
    public getUniformSet(): UniformSet {
        return this.unif;
    }
*/
    // need to refactor to accept Material rather than Shader
    // need uniformset for things like worldMatrix, position, scale, etc.
    // may also have some overlap with Material uniforms (bumpiness, shininess, etc.)
}

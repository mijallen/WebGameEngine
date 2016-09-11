class Camera extends UniformBearer {
    fov: number;
    aspectRatio: number;

//    unif: UniformSet;

    view: InverseSpatialTransform;
    proj: PerspectiveTransform;

    constructor() {
        super();

        this.fov = 70.0;
        this.aspectRatio = 1.778;

        this.view = new InverseSpatialTransform();
        this.proj = new PerspectiveTransform(this.aspectRatio, this.fov, 1, 100);

        //this.proj.togglePerspective();

        //this.unif = new UniformSet();
        //this.unif.addInverseTransform("viewMatrix", this.view);
        //this.unif.addTransform("projectionMatrix", this.proj);
        this.addTransform("viewMatrix", this.view);
        this.addTransform("projectionMatrix", this.proj);
    }

    getViewTransform(): InverseSpatialTransform {
        return this.view;
    }

    getProjectionTransform(): PerspectiveTransform {
        return this.proj;
    }
/*
    public getUniformSet(): UniformSet {
        return this.unif;
    }
*/
    // need uniformset for things like viewMatrix, projectionMatrix, position, etc.
}

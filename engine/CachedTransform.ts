abstract class CachedTransform implements UniformVariable {
    protected transform: Matrix4f;
    protected needsRecomputation: boolean;

    constructor() {
        this.transform = new Matrix4f();
        this.needsRecomputation = true;
    }

    getValue(): Float32Array {
        if (this.needsRecomputation) {
            this.transform.identity();
            this.computeMatrix();
            this.needsRecomputation = false;
        }
        return this.transform.getEntries();
    }

    setValue(value: Matrix4f) {
        this.transform = value;
    }

    getGLSLType(): string {return "mat4";}
    abstract computeMatrix();
}

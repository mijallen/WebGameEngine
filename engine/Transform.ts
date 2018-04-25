// -- TRANSFORM -- //

class Transform implements AttributeVariable {
    protected matrix: Matrix4f;
    protected scale: Vector3f;
    protected position: Vector3f;
    protected rotation: number;

    public getData(): AttributeData {
        this.matrix = new Matrix4f();

        this.matrix = this.matrix.scale(this.scale.x, this.scale.y, this.scale.z);
        this.matrix = this.matrix.rotateY(this.rotation);
        this.matrix = this.matrix.translate(this.position.x, this.position.y, this.position.z);

        return this.matrix.getData();
    }
    public getTypeName(): string { return "mat4"; }

    public constructor() {
        this.scale = new Vector3f(1, 1, 1);
        this.position = new Vector3f(0, 0, 0);
        this.rotation = 0;
    }

    public getPosition(): Vector3f {
        return this.position.scale(1);
    }
    public setPosition(position: Vector3f): void {
        this.position = position.scale(1);
    }

    public getScale(): Vector3f {
        return this.scale.scale(1);
    }
    public setScale(scale: Vector3f): void {
        this.scale = scale.scale(1);
    }

    public getRotation(): number {
        return this.rotation;
    }
    public setRotation(rotation: number): void {
        this.rotation = rotation;
    }
}

class InverseTransform extends Transform {
    public getData(): AttributeData {
        this.matrix = new Matrix4f();

        this.matrix = this.matrix.translate(-this.position.x, -this.position.y, -this.position.z);
        this.matrix = this.matrix.rotateY(-this.rotation);
        this.matrix = this.matrix.scale(1.0 / this.scale.x, 1.0 / this.scale.y, 1.0 / this.scale.z);

        return this.matrix.getData();
    }
}

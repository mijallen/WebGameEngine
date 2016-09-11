class SpatialTransform extends CachedTransform {
    position: Vector3;
    scale: Vector3;
    rotation: Vector3;

    constructor() {
        super();

        this.position = new Vector3();
        this.scale = new Vector3(1.0, 1.0, 1.0);
        this.rotation = new Vector3();

        this.transform = new Matrix4f();
    }

    computeMatrix() {
        this.transform.scale(this.scale.x, this.scale.y, this.scale.z);
        this.transform.yRotate(this.rotation.y);
        this.transform.translate(this.position.x, this.position.y, this.position.z);
    }

    setPosition(x: number, y: number, z: number): void {
        this.position.x = x;
        this.position.y = y;
        this.position.z = z;

        this.needsRecomputation = true;
    }

    setScale(x: number, y: number, z: number): void {
        this.scale.x = x;
        this.scale.y = y;
        this.scale.z = z;

        this.needsRecomputation = true;
    }

    setRotation(x: number, y: number, z: number): void {
        this.rotation.x = x;
        this.rotation.y = y;
        this.rotation.z = z;

        this.needsRecomputation = true;
    }
}

class InverseSpatialTransform extends SpatialTransform {
    computeMatrix() {
        this.transform.translate(-this.position.x, -this.position.y, -this.position.z);
        this.transform.yRotate(-this.rotation.y);
        this.transform.scale(1.0 / this.scale.x, 1.0 / this.scale.y, 1.0 / this.scale.z);
    }
}

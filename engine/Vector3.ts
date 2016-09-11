class Vector3 { // could implement vector swizzling: get xy(): Vector2 {...}
    public x: number;
    public y: number;
    public z: number;

    constructor(x: number = 0.0, y: number = 0.0, z: number = 0.0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}

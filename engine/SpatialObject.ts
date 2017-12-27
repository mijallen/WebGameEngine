// -- SPATIALOBJECT -- //

class SpatialObject extends GameObject {
    protected transform: Transform;

    public constructor() {
        super();

        this.setMapping("worldMatrix",
            function (self: SpatialObject, name: string): Transform {
                return self.transform;
            }
        );

        this.transform = new Transform();
    }

    public getPosition(): Vector3f {
        return this.transform.getPosition();
    }
    public setPosition(position: Vector3f) {
        this.transform.setPosition(position);
    }

    public getRotation(): number {
        return this.transform.getRotation();
    }
    public setRotation(rotation: number): void {
        this.transform.setRotation(rotation);
    }
}

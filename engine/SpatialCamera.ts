// -- SPATIALCAMERA -- //

class SpatialCamera extends Camera {
    protected viewTransform: Transform;
    protected projectionMatrix: Matrix4f;

    public constructor() {
        super();

        this.setMapping("viewMatrix",
            function (self: SpatialCamera, name: string): Transform {
                return self.viewTransform;
            }
        );
        this.setMapping("projectionMatrix",
            function (self: SpatialCamera, name: string): Matrix4f {
                return self.projectionMatrix;
            }
        );

        this.viewTransform = new InverseTransform();
        // need to allow changing of aspect ratio and FOV
        this.projectionMatrix = new Matrix4f().perspective(1.333, 70, 1, 100);
    }

    public getPosition(): Vector3f {
        return this.viewTransform.getPosition();
    }
    public setPosition(position: Vector3f) {
        this.viewTransform.setPosition(position);
    }

    public getRotation(): number {
        return this.viewTransform.getRotation();
    }
    public setRotation(rotation: number): void {
        this.viewTransform.setRotation(rotation);
    }
}

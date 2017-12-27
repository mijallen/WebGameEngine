// -- RENDERCONTEXT -- //

class RenderContext {
    private scene: Scene;
    private camera: Camera;
    private gameObject: GameObject;
    private material: Material;

    constructor() {
    }

    public getScene(): Scene {
        return this.scene;
    }

    public setScene(scene: Scene): void {
        this.scene = scene;
    }

    public getCamera(): Camera {
        return this.camera;
    }

    public setCamera(camera: Camera): void {
        this.camera = camera;
    }

    public getGameObject(): GameObject {
        return this.gameObject;
    }

    public setGameObject(gameObject: GameObject): void {
        this.gameObject = gameObject;
    }

    public getMaterial(): Material {
        return this.material;
    }

    public setMaterial(material: Material): void {
        this.material = material;
    }
}

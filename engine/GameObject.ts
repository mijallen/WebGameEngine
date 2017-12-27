// -- GAMEOBJECT -- //

class GameObject extends UniformContainer {
    private geometry: Geometry;
    private material: Material;

    constructor() {
        super();

        this.geometry = null;
        this.material = null;
    }

    public getGeometry(): Geometry {
        return this.geometry;
    }

    public setGeometry(geometry: Geometry): void {
        this.geometry = geometry;
    }

    public getMaterial(): Material {
        return this.material;
    }

    public setMaterial(material: Material): void {
        this.material = material;
    }
}

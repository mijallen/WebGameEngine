// -- MATERIAL -- //

class Material extends UniformContainer {
    private shader: Shader;
    private textures: Map<string, Texture>;
    private textureLayers: Map<string, number>;
    private currentLayer: number;

    public constructor() {
        super();

        this.shader = null;
        this.textures = new Map<string, Texture>();
        this.textureLayers = new Map<string, number>();
        this.currentLayer = 0;
    }

    public getShader(): Shader {
        return this.shader;
    }

    public setShader(shader: Shader): void {
        this.shader = shader;
    }

    public setTexture(name: string, texture: Texture): void {
        let alreadySet: boolean = this.textures.has(name);
        this.textures.set(name, texture);

        if (!alreadySet) {
            this.textureLayers.set(name, this.currentLayer++);

            this.setMapping(name, function (self: Material, name: string): number {
                let layer: number = self.textureLayers.get(name);
                self.textures.get(name).setAsCurrent(layer);
                return layer;
            });
        }
    }

    // could enforce texture identifiers for retrieving (layer # or name)
    public getTexture(name: string): Texture {
        return this.textures.get(name);
    }
}

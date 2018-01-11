// -- MATERIAL -- //

class Material extends UniformContainer {
    private shader: Shader;
    private textures: Map<string, Texture>;

    public constructor() {
        super();

        this.shader = null;
        this.textures = new Map<string, Texture>();
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
            this.setMapping(name, function (self: Material, name: string): Texture {
                return self.textures.get(name);
            });
        }
    }

    // could enforce texture identifiers for retrieving (layer # or name)
    public getTexture(name: string): Texture {
        return this.textures.get(name);
    }
}

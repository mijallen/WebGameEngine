// -- UNIFORMCONTAINER -- //

abstract class UniformContainer {
    private uniformMapping: Map<string, (self: UniformContainer, name: string) => UniformVariable | number>;

    public constructor() {
        this.uniformMapping = new Map<string, (self: UniformContainer, name: string) => UniformVariable | number>();
    }

    public getValue(name: string): UniformData {
        let uniform = null;

        if (this.uniformMapping.has(name)) {
            uniform = this.uniformMapping.get(name)(this, name);
        }
        else {
            uniform = <UniformVariable>this[name];
            if (uniform == undefined) return undefined; // more elegant solution?
        }

        if (typeof uniform == "number") return uniform;
        return uniform.getData();
    }

    protected setMapping(name: string, mapFunc: (self: UniformContainer, name: string) => UniformVariable | number) {
        this.uniformMapping.set(name, mapFunc);
    }
}

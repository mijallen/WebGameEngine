// -- UNIFORMCONTAINER -- //

abstract class UniformContainer {
    private uniformMapping: Map<string, (self: UniformContainer, name: string) => UniformVariable | number>;

    public constructor() {
        this.uniformMapping = new Map<string, (self: UniformContainer, name: string) => UniformVariable | number>();
    }

    public getUniform(name: string): UniformVariable | number {
        if (this.uniformMapping.has(name)) {
            return this.uniformMapping.get(name)(this, name);
        }
        else {
            return <UniformVariable>this[name];
        }
    }

    protected setMapping(name: string, mapFunc: (self: UniformContainer, name: string) => UniformVariable | number): void {
        this.uniformMapping.set(name, mapFunc);
    }
}

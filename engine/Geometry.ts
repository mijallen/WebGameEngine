// -- GEOMETRY -- //

class Geometry {
    private vertexBufferSet: any;
    private dataMap: Map<string, Float32Array>;
    private indexArray: Uint16Array;

    private dirtySet: Set<string>;
    private dirtyIndex: boolean;

    public constructor() {
        this.vertexBufferSet = new VertexBufferSet();
        this.dataMap = new Map<string, Float32Array>();
        this.indexArray = null;

        this.dirtySet = new Set<string>();
        this.dirtyIndex = false;
    }

    public setAttribute(name: string, data: Float32Array): void {
        this.dataMap.set(name, data);

        this.dirtySet.add(name);
    }

    public setIndexArray(indices: Uint16Array): void {
        this.indexArray = indices;

        this.dirtyIndex = true;
    }

    public useAttribute(name: string): void {
        if (this.dirtySet.has(name)) {
            let data = this.dataMap.get(name);
            this.vertexBufferSet.setAttribute(name, data);

            this.dirtySet.delete(name);
        }

        this.vertexBufferSet.setAsCurrent(name);
    }

    public draw(): void {
        if (this.dirtyIndex) {
            this.vertexBufferSet.setIndexArray(this.indexArray);
            this.dirtyIndex = false;
        }

        this.vertexBufferSet.draw();
    }
}

class Geometry extends GameEntity {
    //vertexPosition: Float32Array;
    indices: Uint16Array;
    vertexCount: number;

    attributeSet: HashTable;

    /*
        Need a method to retrieve all attribute names (to write to vertex buffer)
        Need all optional parameters in constructor: can have 0 vertices, next attribute determines count
        Consider renaming class to VertexData and have newDataSet methods to take arrays
        Need to refactor VertexBuferSet to perform only simplest OpenGL/WebGL calls
    */

    constructor(vertexArray: number[], indexArray: number[], vertexDimensions: number = 3) {
        super();
        //this.vertexPosition = new Float32Array(vertexArray);
        this.indices = new Uint16Array(indexArray);
        this.vertexCount = vertexArray.length / vertexDimensions;
        this.attributeSet = new HashTable();

        this.addFloatAttribute("vertex", vertexArray, vertexDimensions);
    }

    //public getVertexPosition(): Float32Array {
        //return this.vertexPosition;
    //}

    public getIndices(): Uint16Array {
        return this.indices;
    }

    public addFloatAttribute(name: string, valueSet: number[], dimensions: number): void {
        this.attributeSet.insert(name, new Float32Array(valueSet));
    }

    public getFloatAttribute(name: string): Float32Array {
        return this.attributeSet.get(name);
    }

    public getAttributeNames(): string[] {
        return this.attributeSet.keys();
    }
}

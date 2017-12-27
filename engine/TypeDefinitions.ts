// -- BASIC TYPE DEFINITIONS -- //

type AttributeAggregateData = Float32Array;
type AttributeData = AttributeAggregateData | number;

type UniformAggregateData = AttributeAggregateData | Int32Array;
type UniformData = UniformAggregateData | number;

interface UniformVariable {
    getTypeName(): string;
    getData(): UniformData;
    toString(): string;
}

interface AttributeVariable extends UniformVariable {
    getData(): AttributeData;
}

interface Vector extends UniformVariable {
    getData(): UniformAggregateData;
    readonly dimensions: number;
    length(): number;
    normalize(): Vector;
    scale(number): Vector;
    x, y: number;
}

interface Matrix extends AttributeVariable {
    getData(): AttributeAggregateData;
    readonly rows: number;
    readonly columns: number;
    transpose(): Matrix;
    determinant(): number;
    //inverse(): Matrix;
}

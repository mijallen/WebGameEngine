// -- MATRIX2F -- //

class Matrix2f implements Matrix {
    // AttributeVariable interface
    protected data: Float32Array;
    public getData(): AttributeAggregateData { return this.data; }
    public getTypeName(): string { return "mat2"; }
    public toString(): string {
        return "[<" + this.data[0] + "," + this.data[1] + ">,<"
            + this.data[2] + "," + this.data[3] + ">]"
        ;
    }

    // Matrix interface
    public get rows(): number { return 2; }
    public get columns(): number { return 2; }
    public transpose(): Matrix2f { return this; } // unimplemented
    public determinant(): number {
        return (this.data[0] * this.data[3] - this.data[1] * this.data[2]);
    }

    public constructor(e00: number, e01: number, e10: number, e11: number) {
        this.data = new Float32Array(
            [e00, e01, // transpose of mathematical representation
            e10, e11]
        );
    }
    public rotate(angle: number): Matrix2f {
        let cosAngle = Math.cos(angle);
        let sinAngle = Math.sin(angle);
        return new Matrix2f(
            this.data[0] * cosAngle  + this.data[2] * sinAngle,
            this.data[1] * cosAngle  + this.data[3] * sinAngle,
            -this.data[0] * sinAngle + this.data[2] * cosAngle,
            -this.data[1] * sinAngle + this.data[3] * cosAngle
        );
    }
    public scale(sX: number, sY: number): Matrix2f {
        return new Matrix2f(
            this.data[0] * sX, this.data[1] * sX,
            this.data[2] * sY, this.data[3] * sY
        );
    }
    public multiplyVector(v: Vector2): Vector2f { // return Vector2 of same type?
        return new Vector2f(
            this.data[0] * v.x + this.data[2] * v.y,
            this.data[1] * v.x + this.data[3] * v.y
        );
    }
}

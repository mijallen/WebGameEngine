// -- MATRIX4F -- //

class Matrix4f implements Matrix {
    // AttributeVariable interface
    protected data: Float32Array;
    public getData(): AttributeAggregateData { return this.data; }
    public getTypeName(): string { return "mat4"; }
    public toString(): string {
        return "[" +
            "<" + this.data[0] + ", " + this.data[1] + ", " + this.data[2] + ", " + this.data[3] + " >, " +
            "<" + this.data[4] + ", " + this.data[5] + ", " + this.data[6] + ", " + this.data[7] + " >, " +
            "<" + this.data[8] + ", " + this.data[9] + ", " + this.data[10] + ", " + this.data[11] + " >, " +
            "<" + this.data[12] + ", " + this.data[13] + ", " + this.data[14] + ", " + this.data[15] + " >" +
        "]";
    }

    // Matrix interface
    public get rows(): number { return 4; }
    public get columns(): number { return 4; }
    public transpose(): Matrix4f { return this; } // unimplemented
    public determinant(): number {
        return 0; // unimplemented
    }

    public constructor() {
        this.data = new Float32Array([
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ]);
    }

    public copy(): Matrix4f {
        let output = new Matrix4f();
        output.data = new Float32Array(this.data);
        return output;
    }

/*
[c 0 s 0]   [a b c d]   [ca+si cb+sj cc+sk cd+sl]
[0 1 0 0] * [e f g h] = [e f g h]
[n 0 c 0]   [i j k l]   [na+ci nb+cj nc+ck nd+cl]
[0 0 0 1]   [m n o p]   [m n o p]
*/
    public rotateY(angle: number): Matrix4f {
        let cosAngle = Math.cos(angle);
        let sinAngle = Math.sin(angle);
        let output = this.copy();

        output.data[0] = cosAngle * this.data[0] + sinAngle * this.data[2];
        output.data[2] = -sinAngle * this.data[0] + cosAngle * this.data[2];

        output.data[4] = cosAngle * this.data[4] + sinAngle * this.data[6];
        output.data[6] = -sinAngle * this.data[4] + cosAngle * this.data[6];

        output.data[8] = cosAngle * this.data[8] + sinAngle * this.data[10];
        output.data[10] = -sinAngle * this.data[8] + cosAngle * this.data[10];

        output.data[12] = cosAngle * this.data[12] + sinAngle * this.data[14];
        output.data[14] = -sinAngle * this.data[12] + cosAngle * this.data[14];

        return output;
    }

/*
[1 0 0 x]   [a b c d]   [a+xm b+xn c+xo d+xp]
[0 1 0 y] * [e f g h] = [e+ym f+yn g+yo h+yp]
[0 0 1 z]   [i j k l]   [i+zm j+zn k+zo l+zp]
[0 0 0 1]   [m n o p]   [m n o p]
*/
    public translate(tX: number, tY: number, tZ: number): Matrix4f {
        let output = this.copy();

        output.data[0] += tX * this.data[3];
        output.data[1] += tY * this.data[3];
        output.data[2] += tZ * this.data[3];

        output.data[4] += tX * this.data[7];
        output.data[5] += tY * this.data[7];
        output.data[6] += tZ * this.data[7];

        output.data[8] += tX * this.data[11];
        output.data[9] += tY * this.data[11];
        output.data[10] += tZ * this.data[11];

        output.data[12] += tX * this.data[15];
        output.data[13] += tY * this.data[15];
        output.data[14] += tZ * this.data[15];

        return output;
    }

/*
[x 0 0 0]   [a b c d]   [xa xb xc xd]
[0 y 0 0] * [e f g h] = [ye yf yg yh]
[0 0 z 0]   [i j k l]   [zi zj zk zl]
[0 0 0 1]   [m n o p]   [m n o p]
*/
    public scale(sX: number, sY: number, sZ: number): Matrix4f {
        let output = this.copy();

        output.data[0] *= sX;
        output.data[1] *= sY;
        output.data[2] *= sZ;

        output.data[4] *= sX;
        output.data[5] *= sY;
        output.data[6] *= sZ;

        output.data[8] *= sX;
        output.data[9] *= sY;
        output.data[10] *= sZ;

        output.data[12] *= sX;
        output.data[13] *= sY;
        output.data[14] *= sZ;

        return output;
    }
/*
[x 0  0 0]   [a b c d]   [xa xb xc xd]
[0 y  0 0] * [e f g h] = [ye yf yg yh]
[0 0  z w]   [i j k l]   [zi+wm zj+wn zk+wo zl+wp]
[0 0 -1 0]   [m n o p]   [-i -j -k -l]
*/
    public perspective(
        aspectRatio: number, fieldOfViewDegrees: number,
        nearDistance: number, farDistance: number
    ): Matrix4f {
        let fovDenominator = Math.tan(fieldOfViewDegrees * Math.PI / 360.0);
        let yScale = nearDistance / fovDenominator;
        let xScale = yScale / aspectRatio;

        let perspectiveDenominator = -1.0 / (farDistance - nearDistance);
        let zScale = (farDistance + nearDistance) * perspectiveDenominator;
        let wTerm = 2.0 * farDistance * nearDistance * perspectiveDenominator;

        let output = this.copy();

        output.data[0] *= xScale;
        output.data[4] *= xScale;
        output.data[8] *= xScale;
        output.data[12] *= xScale;

        output.data[1] *= yScale;
        output.data[5] *= yScale;
        output.data[9] *= yScale;
        output.data[13] *= yScale;

        output.data[2] = zScale * this.data[2] + wTerm * this.data[3];
        output.data[6] = zScale * this.data[6] + wTerm * this.data[7];
        output.data[10] = zScale * this.data[10] + wTerm * this.data[11];
        output.data[14] = zScale * this.data[14] + wTerm * this.data[15];

        output.data[3] = -this.data[2];
        output.data[7] = -this.data[6];
        output.data[11] = -this.data[10];
        output.data[15] = -this.data[14];

        return output;
    }
}

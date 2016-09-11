class Matrix4f {
    entries: Float32Array;

    constructor() {
        this.entries = new Float32Array(16);

        this.identity();
    }

    public getEntries(): Float32Array {
        return this.entries;
    }

/*
Identity Operation:
m[0] m[4] m[ 8] m[12]   1 0 0 0
m[1] m[5] m[ 9] m[13] = 0 1 0 0
m[2] m[6] m[10] m[14]   0 0 1 0
m[3] m[7] m[11] m[15]   0 0 0 1
*/

    public identity(): void {
        this.entries[0] = 1.0;
        this.entries[1] = 0.0;
        this.entries[2] = 0.0;
        this.entries[3] = 0.0;

        this.entries[4] = 0.0;
        this.entries[5] = 1.0;
        this.entries[6] = 0.0;
        this.entries[7] = 0.0;

        this.entries[8]  = 0.0;
        this.entries[9]  = 0.0;
        this.entries[10] = 1.0;
        this.entries[11] = 0.0;

        this.entries[12] = 0.0;
        this.entries[13] = 0.0;
        this.entries[14] = 0.0;
        this.entries[15] = 1.0;
    }

/*
Scale Operation:
x 0 0 0   a e i m   xa xe xi xm
0 y 0 0 * b f j n = yb yf yj yn
0 0 z 0   c g k o   zc zg zk zo
0 0 0 1   d h l p   1d 1h 1l 1p
*/

    public scale(xScale: number, yScale: number, zScale: number): void {
        this.entries[0] *= xScale;
        this.entries[1] *= yScale;
        this.entries[2] *= zScale;

        this.entries[4] *= xScale;
        this.entries[5] *= yScale;
        this.entries[6] *= zScale;

        this.entries[8]  *= xScale;
        this.entries[9]  *= yScale;
        this.entries[10] *= zScale;

        this.entries[12] *= xScale;
        this.entries[13] *= yScale;
        this.entries[14] *= zScale;
    }

/*
Y-Rotate Operation:
c 0 s 0   a e i m   ca+sc ce+sg ci+sk cm+so
0 1 0 0 * b f j n =   b     f     j     n  
n 0 c 0   c g k o   na+cc ne+cg ni+ck nm+co
0 0 0 1   d h l p     d     h     l     p  
*/

    public yRotate(angle: number): void {
        let cosAngle: number = Math.cos(angle);
        let sinAngle: number = Math.sin(angle);
        let temp: number = 0.0;

        temp = this.entries[0];
        this.entries[0] =  cosAngle * temp + sinAngle * this.entries[2];
        this.entries[2] = -sinAngle * temp + cosAngle * this.entries[2];

        temp = this.entries[4];
        this.entries[4] =  cosAngle * temp + sinAngle * this.entries[6];
        this.entries[6] = -sinAngle * temp + cosAngle * this.entries[6];

        temp = this.entries[8];
        this.entries[8]  =  cosAngle * temp + sinAngle * this.entries[10];
        this.entries[10] = -sinAngle * temp + cosAngle * this.entries[10];

        temp = this.entries[12];
        this.entries[12] =  cosAngle * temp + sinAngle * this.entries[14];
        this.entries[14] = -sinAngle * temp + cosAngle * this.entries[14];
    }

/*
Translate Operation:
1 0 0 x   a e i m   a+xd e+xh i+xl m+xp
0 1 0 y * b f j n = b+yd f+yh j+yl n+yp
0 0 1 z   c g k o   c+zd g+zh k+zl o+zp
0 0 0 1   d h l p    1d   1h   1l   1p
*/

    public translate(xTranslate: number, yTranslate: number, zTranslate: number): void {
        this.entries[0] += xTranslate * this.entries[3];
        this.entries[1] += yTranslate * this.entries[3];
        this.entries[2] += zTranslate * this.entries[3];

        this.entries[4] += xTranslate * this.entries[7];
        this.entries[5] += yTranslate * this.entries[7];
        this.entries[6] += zTranslate * this.entries[7];

        this.entries[8]  += xTranslate * this.entries[11];
        this.entries[9]  += yTranslate * this.entries[11];
        this.entries[10] += zTranslate * this.entries[11];

        this.entries[12] += xTranslate * this.entries[15];
        this.entries[13] += yTranslate * this.entries[15];
        this.entries[14] += zTranslate * this.entries[15];
    }

/*
Perspective Operation:
x 0 0 0   a e i m    x*a   x*e   x*i   x*m
0 y 0 0 * b f j n =  y*b   y*f   y*j   y*n
0 0 z w   c g k o   zc+wd zg+wh zk+wl zo+wp
0 0 n 0   d h l p    n*c   n*g   n*k   n*o
*/

    public perspective(aspectRatio: number, fieldOfViewDegrees: number,
        nearDistance: number, farDistance: number)
    {
        let fovDenominator: number = Math.tan(fieldOfViewDegrees * Math.PI / 360.0);
        let yScale: number = nearDistance / fovDenominator;
        let xScale: number = yScale / aspectRatio;

        let perspectiveDenominator: number = -1.0 / (farDistance - nearDistance);
        let zScale: number = (farDistance + nearDistance) * perspectiveDenominator;
        let otherTerm: number = 2.0 * farDistance * nearDistance * perspectiveDenominator;

        let originalThirdRow: number[] = [
            this.entries[2], this.entries[6], this.entries[10], this.entries[14]
        ];

        this.scale(xScale, yScale, zScale);
        this.entries[2]  += otherTerm * this.entries[3];
        this.entries[6]  += otherTerm * this.entries[7];
        this.entries[10] += otherTerm * this.entries[11];
        this.entries[14] += otherTerm * this.entries[15];

        this.entries[3]  = -originalThirdRow[0];
        this.entries[7]  = -originalThirdRow[1];
        this.entries[11] = -originalThirdRow[2];
        this.entries[15] = -originalThirdRow[3];
    }
}

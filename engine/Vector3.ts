// -- VECTOR3 -- //

abstract class Vector3 implements Vector {
    // UniformVariable interface
    protected data: UniformAggregateData;
    public getData(): UniformAggregateData { return this.data; }
    public abstract getTypeName(): string;
    public toString(): string {
        return "<" + this.data[0] + "," + this.data[1] + "," + this.data[2] + ">";
    }

    // allow for return-by-copy in abstract class (performance hack)
    protected abstract copyAndSet(x: number, y: number, z: number): Vector3;

    // Vector interface
    public get dimensions(): number { return 3; }
    public length(): number {
        return Math.sqrt(this.data[0] * this.data[0]
            + this.data[1] * this.data[1] + this.data[2] * this.data[2]
        );
    }
    public normalize(): Vector3 {
        let divisor = 1.0 / this.length();
        return this.copyAndSet(this.data[0] * divisor,
            this.data[1] * divisor, this.data[2] * divisor
        );
    }
    public scale(s: number): Vector3 {
        return this.copyAndSet(this.data[0] * s, this.data[1] * s, this.data[2] * s);
    }
    public get x(): number { return this.data[0]; }
    public set x(x: number) { this.data[0] = x; }
    public get y(): number { return this.data[1]; }
    public set y(y: number) { this.data[1] = y; }
    public get z(): number { return this.data[2]; }
    public set z(z: number) { this.data[2] = z; }

    public add(v: Vector3): Vector3 {
        return this.copyAndSet(this.data[0] + v.data[0],
            this.data[1] + v.data[1], this.data[2] + v.data[2]
        );
    }
    public subtract(v: Vector3): Vector3 {
        return this.copyAndSet(this.data[0] - v.data[0],
            this.data[1] - v.data[1], this.data[2] - v.data[2]
        );
    }
    public multiply(v: Vector3): Vector3 {
        return this.copyAndSet(this.data[0] * v.data[0],
            this.data[1] * v.data[1], this.data[2] * v.data[2]
        );
    }
    public divide(v: Vector3): Vector3 {
        return this.copyAndSet(this.data[0] / v.data[0],
            this.data[1] / v.data[1], this.data[2] / v.data[2]
        );
    }
    public dot(v: Vector3): number {
        return (this.data[0] * v.data[0]
            + this.data[1] * v.data[1] + this.data[2] * v.data[2]
        );
    }

    public cross(v: Vector3): Vector3 {
        return this.copyAndSet(
            this.data[1] * v.data[2] - this.data[2] * v.data[1],
            this.data[2] * v.data[0] - this.data[0] * v.data[2],
            this.data[0] * v.data[1] - this.data[1] * v.data[0]
        );
    }
}

class Vector3f extends Vector3 implements AttributeVariable {
    public getData(): AttributeAggregateData { return <AttributeAggregateData>this.data; }
    public getTypeName(): string { return "vec3"; }

    public constructor(x: number, y: number, z: number) {
        super();
        this.data = new Float32Array([x, y, z]);
    }
    protected copyAndSet(x: number, y: number, z: number): Vector3f {
        return new Vector3f(x, y, z);
    }

    public scale(s: number): Vector3f { return <Vector3f>super.scale(s); }
    public normalize(): Vector3f { return <Vector3f>super.normalize(); }
    public add(v: Vector3): Vector3f { return <Vector3f>super.add(v); }
    public subtract(v: Vector3): Vector3f { return <Vector3f>super.subtract(v); }
    public multiply(v: Vector3): Vector3f { return <Vector3f>super.multiply(v); }
    public divide(v: Vector3): Vector3f { return <Vector3f>super.divide(v); }

    public cross(v: Vector3): Vector3f { return <Vector3f>super.cross(v); }
}

class Vector3i extends Vector3 {
    public getTypeName(): string { return "vec3i"; }

    public constructor(x: number, y: number, z: number) {
        super();
        this.data = new Int32Array([x, y, z]);
    }
    protected copyAndSet(x: number, y: number, z: number): Vector3i {
        return new Vector3i(x, y, z);
    }

    public scale(s: number): Vector3i { return <Vector3i>super.scale(s); }
    public normalize(): Vector3i { return <Vector3i>super.normalize(); }
    public add(v: Vector3): Vector3i { return <Vector3i>super.add(v); }
    public subtract(v: Vector3): Vector3i { return <Vector3i>super.subtract(v); }
    public multiply(v: Vector3): Vector3i { return <Vector3i>super.multiply(v); }
    public divide(v: Vector3): Vector3i { return <Vector3i>super.divide(v); }

    public cross(v: Vector3): Vector3i { return <Vector3i>super.cross(v); }
}

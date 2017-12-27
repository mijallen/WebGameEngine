// -- VECTOR2 -- //

abstract class Vector2 implements Vector {
    // UniformVariable interface
    protected data: UniformAggregateData;
    public getData(): UniformAggregateData { return this.data; }
    public abstract getTypeName(): string;
    public toString(): string {
        return "<" + this.data[0] + "," + this.data[1] + ">";
    }

    // allow for return-by-copy in abstract class (performance hack)
    protected abstract copyAndSet(x: number, y: number): Vector2;

    // Vector interface
    public get dimensions(): number { return 2; }
    public length(): number {
        return Math.sqrt(this.data[0] * this.data[0] + this.data[1] * this.data[1]);
    }
    public normalize(): Vector2 {
        let divisor = 1.0 / this.length();
        return this.copyAndSet(this.data[0] * divisor, this.data[1] * divisor);
    }
    public scale(s: number): Vector2 {
        return this.copyAndSet(this.data[0] * s, this.data[1] * s);
    }
    public get x(): number { return this.data[0]; }
    public set x(x: number) { this.data[0] = x; }
    public get y(): number { return this.data[1]; }
    public set y(y: number) { this.data[1] = y; }

    public add(v: Vector2): Vector2 {
        return this.copyAndSet(this.data[0] + v.data[0], this.data[1] + v.data[1]);
    }
    public subtract(v: Vector2): Vector2 {
        return this.copyAndSet(this.data[0] - v.data[0], this.data[1] - v.data[1]);
    }
    public multiply(v: Vector2): Vector2 {
        return this.copyAndSet(this.data[0] * v.data[0], this.data[1] * v.data[1]);
    }
    public divide(v: Vector2): Vector2 {
        return this.copyAndSet(this.data[0] / v.data[0], this.data[1] / v.data[1]);
    }
    public dot(v: Vector2): number {
        return (this.data[0] * v.data[0] + this.data[1] * v.data[1]);
    }
}

class Vector2f extends Vector2 implements AttributeVariable {
    public getData(): AttributeAggregateData { return <AttributeAggregateData>this.data; }
    public getTypeName(): string { return "vec2"; }

    public constructor(x: number, y: number) {
        super();
        this.data = new Float32Array([x, y]);
    }
    protected copyAndSet(x: number, y: number): Vector2f { return new Vector2f(x, y); }

    public scale(s: number): Vector2f { return <Vector2f>super.scale(s); }
    public normalize(): Vector2f { return <Vector2f>super.normalize(); }
    public add(v: Vector2): Vector2f { return <Vector2f>super.add(v); }
    public subtract(v: Vector2): Vector2f { return <Vector2f>super.subtract(v); }
    public multiply(v: Vector2): Vector2f { return <Vector2f>super.multiply(v); }
    public divide(v: Vector2): Vector2f { return <Vector2f>super.divide(v); }
}

class Vector2i extends Vector2 {
    public getTypeName(): string { return "vec2i"; }

    public constructor(x: number, y: number) {
        super();
        this.data = new Int32Array([x, y]);
    }
    protected copyAndSet(x: number, y: number): Vector2i { return new Vector2i(x, y); }

    public scale(s: number): Vector2i { return <Vector2i>super.scale(s); }
    public normalize(): Vector2i { return <Vector2i>super.normalize(); }
    public add(v: Vector2): Vector2i { return <Vector2i>super.add(v); }
    public subtract(v: Vector2): Vector2i { return <Vector2i>super.subtract(v); }
    public multiply(v: Vector2): Vector2i { return <Vector2i>super.multiply(v); }
    public divide(v: Vector2): Vector2i { return <Vector2i>super.divide(v); }
}

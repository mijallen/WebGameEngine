interface UniformVariable {
    getValue(): Object;
    setValue(value: Object): void;
    getGLSLType(): string;
}

abstract class PrimitiveUniform<T> implements UniformVariable {
    protected value: T;
    getValue(): T {
        return this.value;
    }
    setValue(value: T): void {
        this.value = value;
    }
    abstract getGLSLType(): string;
}

class FloatUniform extends PrimitiveUniform<number> {
    constructor(value? : number) {
        super();
        //value = value || 0.0;
        this.setValue(value || 0.0);
    }
    getGLSLType(): string {return "float";}
}

class IntegerUniform extends PrimitiveUniform<number> {
    constructor(value? : number) {
        super();
        //value = value || 0;
        this.setValue(value || 0);
    }
    setValue(value: number): void {
        this.value = Math.floor(value);
    }
    getGLSLType(): string {return "int"};
}

class BooleanUniform extends PrimitiveUniform<boolean> {
    constructor(value? : boolean) {
        super();
        //if (value) this.value = true;
        //else this.value = false;
        this.setValue(value || false);
    }
    getGLSLType(): string {return "bool"};
}

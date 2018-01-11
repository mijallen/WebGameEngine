// -- TEXTURE -- //

class Texture implements UniformVariable {
    // UniformVariable interface
    public getData(): AttributeAggregateData { return null; }
    public getTypeName(): string { return "sampler2D"; }
    public toString(): string {
        return (this.width + "x" + this.height + " texture");
    }

    private texture2D: any;
    private pixelData: Uint8Array;
    private width: number;
    private height: number;

    private dirty: boolean;

    public constructor() {
        this.texture2D = new Texture2D();
        this.pixelData = null;
        this.width = 0;
        this.height = 0;

        this.dirty = false;
    }

    public setPixels(width: number, height: number, pixelData: Uint8Array): void {
        this.pixelData = pixelData;
        this.width = width;
        this.height = height;

        this.dirty = true;
    }

    public setAsCurrent(layer: number): void {
        if (this.dirty) {
            this.texture2D.setPixels(this.width, this.height, this.pixelData);

            this.dirty = false;
        }

        this.texture2D.setAsCurrent(layer);
    }
}

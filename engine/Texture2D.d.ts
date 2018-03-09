declare class Texture2D {
    public constructor();

    public setAsCurrent(layer: number): void;
    public setPixels(width: number, height: number, bitDepth: number, pixelData: Uint8Array): void;
}

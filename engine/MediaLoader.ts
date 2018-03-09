// -- MEDIALOADER -- //

class MediaLoader {
    private fileLoader: any;

    public constructor() {
        this.fileLoader = new FileLoader();
    }

    public loadTextFile(fileName: string, callback: (data: string) => void): void {
        this.fileLoader.loadTextFile(fileName, callback);
    }

    public loadBinaryFile(fileName: string, callback: (data: ArrayBuffer) => void): void {
        this.fileLoader.loadBinaryFile(fileName, callback);
    }

    public loadTexture(fileName: string, texture: Texture): void {
        let filePath = "images/" + fileName + ".bintex";
        this.fileLoader.loadBinaryFile(filePath, function(data: ArrayBuffer) {
            let dimensions = new Uint16Array(data, 0, 3);
            let width = dimensions[0];
            let height = dimensions[1];
            let bitDepth = dimensions[2];

            let pixelData = new Uint8Array(data, 6);

            texture.setPixels(width, height, bitDepth, pixelData);
        });
    }
}

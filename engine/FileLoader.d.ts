declare class FileLoader {
    public constructor();

    public loadBinaryFile(fileName: string, callback: (data: ArrayBuffer) => void): void;
    public loadTextFile(fileName: string, callback: (data: string) => void): void;
}

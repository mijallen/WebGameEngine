declare class HashTable {
    constructor();

    public insert(key: string, value: any): void;
    public clear(): void;
    public remove(key: string): void;
    public get(key: string): any;
    public keys(): string[];
}

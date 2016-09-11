class GameEntity {
    private static currentId: number = 0;

    private id: number;

    constructor() {
        this.id = GameEntity.currentId++;
    }

    getId(): number {
        return this.id;
    }
}

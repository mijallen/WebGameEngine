// -- SCENE -- //

class Scene extends UniformContainer {
    private gameObjects: GameObject[];

    constructor() {
        super();

        this.gameObjects = [];
    }

    public addGameObject(gameObject: GameObject): void {
        this.gameObjects.push(gameObject);
    }

    // could use an array proxy to return abstracted view of scene objects
    public getGameObjects(): GameObject[] {
        return this.gameObjects;
    }
}

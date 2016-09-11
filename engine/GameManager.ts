class GameManager {
    gameObjs: GameObject[];

    geoms: Geometry[];
    vbsets: VertexBufferSet[];

    shads: Shader[];
    shpgs: ShaderProgram[];

    cam: Camera;

    /*
        Need a draw method to traverse all input gameobjects and do various other stuff
    */

    constructor() {
        this.gameObjs = [];

        this.geoms = [];
        this.vbsets = [];

        this.shads = [];
        this.shpgs = [];

        this.cam = new Camera();
    }

    public getCamera(): Camera {
        return this.cam;
    }

    public addGeometry(geom: Geometry): void { // name needed?
        if (this.geoms.indexOf(geom) == -1) {
            this.geoms.push(geom);
            this.processNewGeometry(geom);
        }
    }

    private processNewGeometry(geom: Geometry): void {
        let vbset: VertexBufferSet = new VertexBufferSet(
            geom.getFloatAttribute("vertex"), geom.getIndices()
        );

        for (let attribName of geom.getAttributeNames()) {
            vbset.addNewAttribute(attribName, geom.getFloatAttribute(attribName));
        }

        this.vbsets.push(vbset);
        console.log(geom);
        //console.log(this.vbsets[0]);
    }

    public addShader(shad: Shader): void {
        if (this.shads.indexOf(shad) == -1) {
            this.shads.push(shad);
            this.processNewShader(shad);
        }
    }

    private processNewShader(shad: Shader): void {
        let shprg: ShaderProgram = new ShaderProgram(
            shad.getVertexShaderSource(), shad.getFragmentShaderSource()
        );

        this.shpgs.push(shprg);
        console.log(shad);
    }

    public addGameObject(obj: GameObject): void { // name needed?
        if (this.gameObjs.indexOf(obj) == -1) {
            this.gameObjs.push(obj);
            this.addGeometry(obj.getGeometry());
            this.addShader(obj.getShader());
        }
    }

    public draw(): void {//console.log('here');
        for (let obj of this.gameObjs) {
            let shad: Shader = obj.getShader();
            let shpg: ShaderProgram = this.shpgs[this.shads.indexOf(shad)];
//console.log(this.shads.indexOf(shad));

            let geom: Geometry = obj.getGeometry();
            let vbset: VertexBufferSet = this.vbsets[this.geoms.indexOf(geom)];
//console.log(this.geoms.indexOf(geom));

            shpg.setAsCurrent();
//console.log(shad.getAttributeVariables());
            for (let attribName of shad.getAttributeVariables()) {
                vbset.setAsCurrent(attribName);
                shpg.useAttributeVec3(attribName);
            }

            for (let uniformName of shad.getUniformVariables()) {
                let value: any = null;
                let glslType: string = null;

                if (uniformName.indexOf("object_") == 0) {
                    //value = obj.getUniformSet().calculateValue(uniformName.substr(7));
                    value = obj.getUniformValue(uniformName.substr(7));
                    glslType = obj.getUniformType(uniformName.substr(7));
                    //shpg.useUniformMatrix4(uniformName, value);
                    shpg.useUniform(uniformName, glslType, value);
                }
                else if (uniformName.indexOf("camera_") == 0) {
                    //value = this.cam.getUniformSet().calculateValue(uniformName.substr(7));
                    value = this.cam.getUniformValue(uniformName.substr(7));
                    glslType = this.cam.getUniformType(uniformName.substr(7));
                    //shpg.useUniformMatrix4(uniformName, value);
                    shpg.useUniform(uniformName, glslType, value);
                }
            }
//shpg.useUniform("scale", "float", 0.5);
            vbset.draw();
        }
    }
}

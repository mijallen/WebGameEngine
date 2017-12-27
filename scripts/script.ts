/* create canvas
let canvas = document.createElement("canvas");
canvas.width = 800;
canvas.height = 600;
document.body.appendChild(canvas);

// initialize WebGL
let gl = canvas.getContext("experimental-webgl");
gl.clearColor(0, 0, 0.5, 1);
gl.clear(gl.COLOR_BUFFER_BIT);
gl.enable(gl.DEPTH_TEST);
gl.depthFunc(gl.LEQUAL);*/

// custom scene with a light
class TestLightScene extends Scene {
    private light: Vector3f;

    public constructor() {
        super();

        this.light = new Vector3f(-2, 0, -2);
    }
}

// custom object with a hue
class TestColorObject extends SpatialObject {
    private hue: number;

    public constructor() {
        super();

        this.transform.setScale(1.5);
        this.transform.setPosition(new Vector3f(0, 0, -5));

        this.hue = 0;
        this.setMapping("color",
            function (self: TestColorObject, name: string): Vector3f {
                let color = new Vector3f(
                    0.5 * Math.sin(self.hue + 0 * Math.PI / 3) + 0.5,
                    0.5 * Math.sin(self.hue + 2 * Math.PI / 3) + 0.5,
                    0.5 * Math.sin(self.hue + 4 * Math.PI / 3) + 0.5
                );
                self.hue += 0.01 * Math.PI;
                return color;
            }
        );
    }
}

// shader that supports texture and lighting
let textureColorLightShader = new Shader();
textureColorLightShader.setSource(
    "attribute vec3 pos, normal;\n" +
    "attribute vec2 texcoord;\n" +
    "uniform mat4 projectionMatrix, viewMatrix, worldMatrix;\n" +
    "uniform vec3 light;\n" +
    "varying vec3 vnormal, vlight;\n" +
    "varying vec2 vtex;\n" +
    "void main(void) {\n" +
    "    vec4 worldVec = worldMatrix * vec4(pos, 1.0);\n" +
    "    vnormal = mat3(worldMatrix) * normal;\n" +
    "    vlight = light - worldVec.xyz;\n" +
    "    vtex = texcoord;\n" +
    "    gl_Position = projectionMatrix * viewMatrix * worldVec;\n" +
    "}\n",
    "precision mediump float;\n" +
    "uniform vec3 color;\n" +
    "uniform sampler2D tex;\n" +
    "varying vec3 vnormal, vlight;\n" +
    "varying vec2 vtex;\n" +
    "void main(void) {\n" +
    "    vec3 n = normalize(vnormal);\n" +
    "    vec3 l = normalize(vlight);\n" +
    "    vec3 texture = texture2D(tex, vtex).rgb;\n" +
    "    float diffuse = max(dot(n, l), 0.0);\n" +
    "    gl_FragColor = vec4(texture * diffuse * color, 1.0);\n" +
    "}\n"
);

// a 24-vertex cube with texture coordinates and normals
let textureMappedCube = new Geometry();
textureMappedCube.setAttribute(
    "pos",
    new Float32Array([
        -1, +1, -1,  -1, -1, -1,  -1, -1, +1,  -1, +1, +1,
        -1, +1, +1,  -1, -1, +1,  +1, -1, +1,  +1, +1, +1,
        +1, +1, +1,  +1, -1, +1,  +1, -1, -1,  +1, +1, -1,
        +1, +1, -1,  +1, -1, -1,  -1, -1, -1,  -1, +1, -1
    ])
);
textureMappedCube.setAttribute(
    "normal",
    new Float32Array([
        -1, 0, 0,  -1, 0, 0,  -1, 0, 0,  -1, 0, 0,
        0, 0, +1,  0, 0, +1,  0, 0, +1,  0, 0, +1,
        +1, 0, 0,  +1, 0, 0,  +1, 0, 0,  +1, 0, 0,
        0, 0, -1,  0, 0, -1,  0, 0, -1,  0, 0, -1
    ])
);
textureMappedCube.setAttribute(
    "texcoord",
    new Float32Array([
        0, 1,  0, 0,  1, 0,  1, 1,
        0, 1,  0, 0,  1, 0,  1, 1,
        0, 1,  0, 0,  1, 0,  1, 1,
        0, 1,  0, 0,  1, 0,  1, 1
    ])
);
textureMappedCube.setIndexArray(
    new Uint16Array([
        0, 1, 2, 0, 2, 3,
        4, 5, 6, 4, 6, 7,
        8, 9, 10, 8, 10, 11,
        12, 13, 14, 12, 14, 15
    ])
);

// a black-and-white noise/static texture
let noiseTextureData = new Uint8Array(256 * 256 * 4);
for (let i = 0; i < noiseTextureData.length; i += 4) {
    let value = Math.round(255 * Math.random());
    noiseTextureData[i + 0] = value;
    noiseTextureData[i + 1] = value;
    noiseTextureData[i + 2] = value;
    noiseTextureData[i + 3] = 255;
}

let noiseTexture = new Texture();
noiseTexture.setPixels(256, 256, noiseTextureData);

let noiseColorLightMaterial = new Material();
noiseColorLightMaterial.setShader(textureColorLightShader);
noiseColorLightMaterial.setTexture("tex", noiseTexture);

let colorCube = new TestColorObject();
colorCube.setGeometry(textureMappedCube);
colorCube.setMaterial(noiseColorLightMaterial);

let lightScene = new TestLightScene();
lightScene.addGameObject(colorCube);

let perspectiveCamera = new SpatialCamera();
perspectiveCamera.setPosition(new Vector3f(-2, 0, 0));
perspectiveCamera.setRotation(-0.5);

drawScene(lightScene, perspectiveCamera);

let objectRotation = 0;

// perform render every 32ms (about 30FPS)
setInterval(function () {
    objectRotation += 0.01;
    colorCube.setRotation(objectRotation);
    drawScene(lightScene, perspectiveCamera);
}, 32);

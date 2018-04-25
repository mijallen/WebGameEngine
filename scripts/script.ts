// custom scene with a light
class TestLightScene extends Scene {
    private light: Vector3f;

    public constructor() {
        super();

        this.light = new Vector3f(0.0, 0.0, 0.0);
    }

    public getLight(): Vector3f {
        return this.light;
    }

    public setLight(light: Vector3f): void {
        this.light = light;
    }
}

// custom object that maps its scale for shaders
class ScalableObject extends SpatialObject {
    public constructor() {
        super();
        this.setMapping("objectScale",
            function (self: ScalableObject, name: string): Vector3f {
                return self.getScale();
            }
        );
    }
}

// normal map lighting shader that preserves texture scale
let scaledNormalMapShader = new Shader();
scaledNormalMapShader.setSource(
    "attribute vec3 position, normal, tangent, bitangent;\n" +
    "attribute vec2 texcoord;\n" +
    "uniform mat4 projectionMatrix, viewMatrix, worldMatrix;\n" +
    "uniform vec3 light, objectScale;\n" +
    "varying vec3 vnormal, vtangent, vbitangent, vlight, vcamera;\n" +
    "varying vec2 vtexcoord;\n" +
    "void main(void) {\n" +
    "    vec4 viewPos = viewMatrix * worldMatrix * vec4(position, 1.0);\n" +
    "    mat3 viewRotation = mat3(viewMatrix) * mat3(worldMatrix);\n" +
    "    vnormal = viewRotation * normal;\n" +
    "    vtangent = viewRotation * tangent;\n" +
    "    vbitangent = viewRotation * bitangent;\n" +
    "    vlight = (viewMatrix * vec4(light, 1.0)).xyz - viewPos.xyz;\n" +
    "    vcamera = -viewPos.xyz;\n" +
    "    vtexcoord = texcoord * vec2(dot(tangent, objectScale), dot(bitangent, objectScale));\n" +
    "    gl_Position = projectionMatrix * viewPos;\n" +
    "}\n",

    "precision mediump float;\n" +
    "uniform sampler2D colorTexture, normalTexture;\n" +
    "varying vec3 vnormal, vtangent, vbitangent, vlight, vcamera;\n" +
    "varying vec2 vtexcoord;\n" +
    "void main(void) {\n" +
    "    vec3 t = normalize(vtangent);\n" +
    "    vec3 b = normalize(vbitangent);\n" +
    "    vec3 n = normalize(vnormal);\n" +
    "    mat3 tangentSpace = mat3(t, b, n);\n" +
    "    vec3 l = normalize(vlight);\n" +
    "    vec3 c = normalize(vcamera);\n" +
    "    vec3 halfVector = normalize(l + c);\n" +
    "    vec3 color = texture2D(colorTexture, vtexcoord).rgb;\n" +
    "    vec3 texNormal = 2.0 * texture2D(normalTexture, vtexcoord).rgb - 1.0;\n" +
    "    vec3 newNormal = tangentSpace * texNormal;\n" +
    "    float diffuse = max(dot(newNormal, l), 0.0);\n" +
    "    float specular = pow(max(dot(newNormal, halfVector), 0.0), 10.0);\n" +
    "    gl_FragColor = vec4(diffuse * color + specular, 1.0);\n" +
    "}\n"
);

// 24-vertex cube with texture coordinates, normals, and tangents
let textureMappedCube = new Geometry();
textureMappedCube.setAttribute(
    "position",
    new Float32Array([
        -1, +1, -1,  -1, -1, -1,  -1, -1, +1,  -1, +1, +1, // left
        -1, +1, +1,  -1, -1, +1,  +1, -1, +1,  +1, +1, +1, // back
        +1, +1, +1,  +1, -1, +1,  +1, -1, -1,  +1, +1, -1, // right
        +1, +1, -1,  +1, -1, -1,  -1, -1, -1,  -1, +1, -1, // front
        -1, +1, -1,  -1, +1, +1,  +1, +1, +1,  +1, +1, -1, // top
        -1, -1, +1,  -1, -1, -1,  +1, -1, -1,  +1, -1, +1  // bottom
    ])
);
textureMappedCube.setAttribute(
    "normal",
    new Float32Array([
        -1, 0, 0,  -1, 0, 0,  -1, 0, 0,  -1, 0, 0, // left
        0, 0, +1,  0, 0, +1,  0, 0, +1,  0, 0, +1, // back
        +1, 0, 0,  +1, 0, 0,  +1, 0, 0,  +1, 0, 0, // right
        0, 0, -1,  0, 0, -1,  0, 0, -1,  0, 0, -1, // front
        0, +1, 0,  0, +1, 0,  0, +1, 0,  0, +1, 0, // top
        0, -1, 0,  0, -1, 0,  0, -1, 0,  0, -1, 0  // bottom
    ])
);
textureMappedCube.setAttribute(
    "tangent",
    new Float32Array([
        0, 0, +1,  0, 0, +1,  0, 0, +1,  0, 0, +1, // left
        +1, 0, 0,  +1, 0, 0,  +1, 0, 0,  +1, 0, 0, // back
        0, 0, -1,  0, 0, -1,  0, 0, -1,  0, 0, -1, // right
        -1, 0, 0,  -1, 0, 0,  -1, 0, 0,  -1, 0, 0, // front
        +1, 0, 0,  +1, 0, 0,  +1, 0, 0,  +1, 0, 0, // top
        +1, 0, 0,  +1, 0, 0,  +1, 0, 0,  +1, 0, 0  // bottom
    ])
);
textureMappedCube.setAttribute(
    "bitangent",
    new Float32Array([
        0, +1, 0,  0, +1, 0,  0, +1, 0,  0, +1, 0, // left
        0, +1, 0,  0, +1, 0,  0, +1, 0,  0, +1, 0, // back
        0, +1, 0,  0, +1, 0,  0, +1, 0,  0, +1, 0, // right
        0, +1, 0,  0, +1, 0,  0, +1, 0,  0, +1, 0, // front
        0, 0, -1,  0, 0, -1,  0, 0, -1,  0, 0, -1, // top
        0, 0, +1,  0, 0, +1,  0, 0, +1,  0, 0, +1  // bottom
    ])
);
textureMappedCube.setAttribute(
    "texcoord",
    new Float32Array([
        0, 1,  0, 0,  1, 0,  1, 1,
        0, 1,  0, 0,  1, 0,  1, 1,
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
        12, 13, 14, 12, 14, 15,
        16, 17, 18, 16, 18, 19,
        20, 21, 22, 20, 22, 23
    ])
);

// test pattern texture data (each row padded with 2 bytes, not entirely sure why)
let testPattern = new Uint8Array([255, 0, 0,  255, 255, 0,  1,1,  0, 255, 0,  0, 0, 255,  1,1]);

// diffuse color texture
let colorTexture = new Texture();
colorTexture.setPixels(2, 2, 24, testPattern);

// corresponding normal map texture
let normalTexture = new Texture();
normalTexture.setPixels(2, 2, 24, testPattern);

// the complete material
let normalMapLightMaterial = new Material();
normalMapLightMaterial.setShader(scaledNormalMapShader);
normalMapLightMaterial.setTexture("colorTexture", colorTexture);
normalMapLightMaterial.setTexture("normalTexture", normalTexture);

// convenience function to add objects in scene
function generateScalableObjectInScene(
    scene: Scene,
    geometry: Geometry,
    material: Material,
    position: Vector3f,
    rotation: number,
    scale: Vector3f
) {
    let generatedObject = new ScalableObject();

    generatedObject.setGeometry(geometry);
    generatedObject.setMaterial(material);
    generatedObject.setPosition(position);
    generatedObject.setRotation(rotation);
    generatedObject.setScale(scale);

    scene.addGameObject(generatedObject);
}

// generate scene
let lightScene = new TestLightScene();

generateScalableObjectInScene(lightScene, textureMappedCube, normalMapLightMaterial,
    new Vector3f(0.0, -1.0, 0.0), 0.0, new Vector3f(25.0, 1.0, 10.0));
generateScalableObjectInScene(lightScene, textureMappedCube, normalMapLightMaterial,
    new Vector3f(0.0, 11.0, 0.0), 0.0, new Vector3f(25.0, 1.0, 10.0));

generateScalableObjectInScene(lightScene, textureMappedCube, normalMapLightMaterial,
    new Vector3f(26.0, 5.0, 0.0), 0.0, new Vector3f(1.0, 5.0, 10.0));
generateScalableObjectInScene(lightScene, textureMappedCube, normalMapLightMaterial,
    new Vector3f(-26.0, 5.0, 0.0), 0.0, new Vector3f(1.0, 5.0, 10.0));

generateScalableObjectInScene(lightScene, textureMappedCube, normalMapLightMaterial,
    new Vector3f(0.0, 5.0, 11.0), 0.0, new Vector3f(25.0, 5.0, 1.0));
generateScalableObjectInScene(lightScene, textureMappedCube, normalMapLightMaterial,
    new Vector3f(0.0, 5.0, -11.0), 0.0, new Vector3f(25.0, 5.0, 1.0));

// setup camera
let perspectiveCamera = new SpatialCamera();
perspectiveCamera.setPosition(new Vector3f(0.0, 6.0, 0.0));
perspectiveCamera.setRotation(0.5 * Math.PI);

// initial render
drawScene(lightScene, perspectiveCamera);

let time = 0;
let lightCenter = new Vector3f(-15.0, 5.0, 0.0);

// perform render every 32ms (about 30FPS)
setInterval(function () {
    let horizontal = new Vector3f(Math.cos(time), 0.0, Math.sin(time));
    let vertical = new Vector3f(0.0, Math.sin(3.0 * time), 0.0);
    lightScene.setLight(lightCenter.add(horizontal.scale(8.0)).add(vertical.scale(2.0)));
    drawScene(lightScene, perspectiveCamera);
    time += 0.1;
}, 32);

// test BINTEX texture loading
let textureLoader = new MediaLoader();
textureLoader.loadTexture("Fieldstone.tga", colorTexture);
textureLoader.loadTexture("FieldstoneBumpDOT3.tga", normalTexture);

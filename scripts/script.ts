// sample program to test game engine code

let vertex: number[] = [
    -1.0, +1.0, 0.0,
    -1.0, -1.0, 0.0,
    +1.0, -1.0, 0.0,
    +1.0, +1.0, 0.0
];

let vertex2: number[] = [
    -0.5, +0.5, 0.0,
    -0.5, -0.5, 0.0,
    +0.5, -0.5, 0.0,
    +0.5, +0.5, 0.0
];

let color: number[] = [
    1.0, 0.0, 0.0,
    1.0, 1.0, 0.0,
    0.0, 1.0, 0.0,
    0.0, 0.0, 1.0
];

let testVS: string =
"attribute vec3 vertex;" +"\n"+
"attribute vec3 color;" +"\n"+
"" +"\n"+
"uniform mat4 object_worldMatrix;" +"\n"+
"uniform mat4 camera_viewMatrix;" +"\n"+
"uniform mat4 camera_projectionMatrix;" +"\n"+
"" +"\n"+
"varying vec3 vertexColor;" +"\n"+
"" +"\n"+
"void main(void) {" +"\n"+
"   vertexColor = color;" +"\n"+
"   gl_Position = camera_projectionMatrix * camera_viewMatrix * object_worldMatrix * vec4(vertex, 1.0);" +"\n"+
"}" +"\n"+
""
;

let testFS: string =
"precision mediump float;" +"\n"+
"uniform float camera_scale;" +"\n"+
"varying vec3 vertexColor;" +"\n"+
"" +"\n"+
"void main(void) {" +"\n"+
"   gl_FragColor = vec4(camera_scale * vertexColor, 1.0);" +"\n"+
"}" +"\n"+
""
;

let testGeometry: Geometry = new Geometry(vertex, [0,1,2,0,2,3]);
testGeometry.addFloatAttribute("color", color, 3);

let testGeometry2: Geometry = new Geometry(vertex2, [0,1,2,0,2,3]);
testGeometry2.addFloatAttribute("color", color, 3);

let testShader: Shader = new Shader(testVS, testFS);
testShader.addAttributeVariable("vertex");
testShader.addAttributeVariable("color");
testShader.addUniformVariable("object_worldMatrix");
testShader.addUniformVariable("camera_viewMatrix");
testShader.addUniformVariable("camera_projectionMatrix");
testShader.addUniformVariable("camera_scale");

let testObj: GameObject = new GameObject(testGeometry, testShader);
let testObj2: GameObject = new GameObject(testGeometry2, testShader);
testObj2.getTransform().setPosition(-0.5, 0.5, 0.0);

let testGameManager: GameManager = new GameManager();

testGameManager.addGameObject(testObj);
testGameManager.addGameObject(testObj2);

testGameManager.getCamera().getViewTransform().setPosition(-0.25, 0.0, 3.0);
testGameManager.getCamera().addFloatValue("scale", 0.75);

testGameManager.draw();

let frameCount: number = 0;

setInterval(
    function() {
        frameCount += 1;

        testObj2.getTransform().setPosition(Math.cos(0.1 * frameCount), Math.sin(0.1 * frameCount), 0.0);
        testObj2.getTransform().setRotation(0.0, 0.1 * frameCount, 0.0);
        testGameManager.draw();
    },
    100
);

document.onkeydown = function(e) {
    let keycode = e.which;

    if (keycode == 37) {testGameManager.getCamera().getViewTransform().setPosition(-1.0, 0.0, 3.0);}
    if (keycode == 39) {testGameManager.getCamera().getViewTransform().setPosition(+1.0, 0.0, 3.0);}
}
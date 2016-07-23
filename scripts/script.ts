// must decide whether to save number[] or Float32Array in GameObject class

let vertex: number[] = [
    -1.0, +1.0, 0.0,
    -1.0, -1.0, 0.0,
    +1.0, -1.0, 0.0,
    +1.0, +1.0, 0.0
];

let index: number[] = [
    0, 1, 2,
    0, 2, 3
];

let color: number[] = [
    1.0, 0.0, 0.0,
    1.0, 1.0, 0.0,
    0.0, 1.0, 0.0,
    0.0, 0.0, 1.0
];

let vertexShader: string = 
"attribute vec3 vertex;" +"\n"+
"attribute vec3 color;" +"\n"+
"" +"\n"+
"varying vec3 vertexColor;" +"\n"+
"" +"\n"+
"void main(void) {" +"\n"+
"   vertexColor = color;" +"\n"+
"   gl_Position = vec4(vertex, 1.0);" +"\n"+
"}" +"\n"+
""
;

let fragmentShader: string = 
"precision mediump float;" +"\n"+
"varying vec3 vertexColor;" +"\n"+
"" +"\n"+
"void main(void) {" +"\n"+
"   gl_FragColor = vec4(vertexColor, 1.0);" +"\n"+
"}" +"\n"+
""
;

let object: VertexBufferSet = new VertexBufferSet(new Float32Array(vertex), new Uint16Array(index));
object.addNewAttribute("color", new Float32Array(color));

let material: ShaderProgram = new ShaderProgram(vertexShader, fragmentShader);

function convenience(v: VertexBufferSet, s: ShaderProgram, name: string): void {
    v.setAsCurrent(name);
    s.useAttributeVec3(name);
}

function draw(v: VertexBufferSet, s: ShaderProgram) {
    s.setAsCurrent();
    convenience(v, s, "vertex");
    convenience(v, s, "color");
    v.draw();
}

draw(object, material);
draw(object, material);
draw(object, material);
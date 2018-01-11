// -- SCENE DRAWING FUNCTIONS -- //
// should this be put in a singleton or static class?

function getUniformVariable(uniformName: string, renderContext: RenderContext): UniformVariable | number {
    let value = renderContext.getGameObject().getUniform(uniformName);
    if (value != undefined) return value;

    value = renderContext.getMaterial().getUniform(uniformName);
    if (value != undefined) return value;

    value = renderContext.getCamera().getUniform(uniformName);
    if (value != undefined) return value;

    value = renderContext.getScene().getUniform(uniformName);
    if (value != undefined) return value;

    console.error("unable to find uniform variable for name " + uniformName);
    return undefined;
}

function render(renderContext: RenderContext): void {
    let geometry: Geometry = renderContext.getGameObject().getGeometry();
    let shader: Shader = renderContext.getMaterial().getShader();
    let currentTextureLayer = 0;

    shader.setAsCurrent();

    // support for aliasing geometry attributes to match shader attributes
    for (let attributeName of shader.getAttributes()) {
        geometry.useAttribute(attributeName);
        shader.useAttribute(attributeName);
    }

    // support for texture handling (determine type of uniform variable here or in getUniformValue)
    for (let uniformName of shader.getUniforms()) {
        let uniform = getUniformVariable(uniformName, renderContext);
        if (typeof uniform == "number") shader.useUniform(uniformName, uniform);
        else {
            if (uniform.getTypeName() != "sampler2D") shader.useUniform(uniformName, uniform.getData());
            else {
                let texture = <Texture>uniform;
                texture.setAsCurrent(currentTextureLayer);
                shader.useUniform(uniformName, currentTextureLayer);
                currentTextureLayer++;
            }
        }
    }

    geometry.draw();
}

function drawScene(scene: Scene, camera: Camera): void {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); // needs JS abstraction
    let renderContext: RenderContext = new RenderContext();
    renderContext.setScene(scene);
    renderContext.setCamera(camera);

    for (let gameObject of scene.getGameObjects()) {
        renderContext.setGameObject(gameObject);
        renderContext.setMaterial(gameObject.getMaterial());
        render(renderContext);
    }
}

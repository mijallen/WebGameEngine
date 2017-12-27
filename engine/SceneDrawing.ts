// -- SCENE DRAWING FUNCTIONS -- //
// should this be put in a singleton or static class?

// process to decode UVL strings and traverse given renderContext
function getUniformValue(uniformName: string, renderContext: RenderContext): UniformData {
    let value = renderContext.getGameObject().getValue(uniformName);
    if (value != undefined) return value;

    value = renderContext.getMaterial().getValue(uniformName);
    if (value != undefined) return value;

    value = renderContext.getCamera().getValue(uniformName);
    if (value != undefined) return value;

    value = renderContext.getScene().getValue(uniformName);
    if (value != undefined) return value;

    console.error("unable to find value for name " + uniformName);
    return value;
}

function render(renderContext: RenderContext): void {
    let geometry: Geometry = renderContext.getGameObject().getGeometry();
    let shader: Shader = renderContext.getMaterial().getShader();
    //let textures: Texture[] = renderContext.getMaterial().getTextures();

    shader.setAsCurrent();

    // support for aliasing geometry attributes to match shader attributes
    for (let attributeName of shader.getAttributes()) {
        geometry.useAttribute(attributeName);
        shader.useAttribute(attributeName);
    }

    // support for texture handling (determine type of uniform variable here or in getUniformValue)
    for (let uniformName of shader.getUniforms()) {
        let value = getUniformValue(uniformName, renderContext);
        shader.useUniform(uniformName, value);
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

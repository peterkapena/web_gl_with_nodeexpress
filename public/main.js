const canvas = document.querySelector("canvas");
const gl = canvas.getContext("webgl");

if (!gl) throw new Error("not supported here");

/**
 * Set the vertex data
 */
const vertexData = [0, 1, 0, 1, -1, 0 - 1, -1, 0];

/**
 * Create a buffer
 */
const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW);

/**
 * Create vertex shader
 */
const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(
  vertexShader,
  `
  attribute vec3 position;
void main(){
    gl_Position = vec4(position, 1);
}
`
);
gl.compileShader(vertexShader);

/**
 * Create fragmment shader
 */
const fragmmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(
  fragmmentShader,
  `
  void main(){
      gl_FragColor = vec4(1, 0, 0, 1);
  }`
);
gl.compileShader(fragmmentShader);

/**
 * Create program and attach shaders
 */
const program = gl.createProgram();
gl.attachShader(program, fragmmentShader);
gl.attachShader(program, vertexShader);
gl.linkProgram(program);

/**
 * Enable vertex attributes
 */
const positionLocation = gl.getAttribLocation(program, "position");
gl.enableVertexAttribArray(positionLocation);
gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);

gl.useProgram(program);
gl.drawArrays(gl.TRIANGLES, 0, 3);

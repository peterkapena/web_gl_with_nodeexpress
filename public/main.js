const canvas = document.querySelector("canvas");
const gl = canvas.getContext("webgl");

if (!gl) throw new Error("not supported here");

/**
 * Set the vertex data
 */
const vertexData = [0, 1, 0, 1, -1, 0 - 1, -1, 0];

/**
 * Set the color data
 */
const colorData = [1, 0, 0, 0, 1, 0, 0, 0, 1];

/**
 * Create a buffer
 */
const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW);

/**
 * Create color buffer
 */
const colorBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorBuffer), gl.STATIC_DRAW);

/**
 * Create vertex shader
 */
const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(
  vertexShader,
  `
  precision mediump float;
  attribute vec3 position;
  attribute vec3 color;
  varying vec3 vColor;

void main(){
    vColor = color;
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
  precision mediump float;
  varying vec3 vColor;

  void main(){
      gl_FragColor = vec4(vColor, 1);
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
 * Enable vertex attributes for position
 */
const positionLocation = gl.getAttribLocation(program, "position");
gl.enableVertexAttribArray(positionLocation);
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);

/**
 * Enable vertex attributes for color
 */
const colorLocation = gl.getAttribLocation(program, "color");
gl.enableVertexAttribArray(colorLocation);
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false, 0, 0);

gl.useProgram(program);
gl.drawArrays(gl.TRIANGLES, 0, 3);

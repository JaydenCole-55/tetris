// Initalize some global variables and constants
var dropBool = false;

const X_MIN = -10;
const X_MAX = 10;
const Y_MIN = -20;
const Y_MAX = 20;

  // Now create an array of positions for the tetris board.
  var positions = [
     X_MIN, Y_MAX,
     X_MAX, Y_MAX,
     X_MAX, Y_MIN,
     X_MIN, Y_MIN,
     X_MIN, Y_MAX,
     X_MIN, Y_MAX*0.9,
     X_MAX, Y_MAX*0.9,
     X_MIN, Y_MAX*0.8,
     X_MAX, Y_MAX*0.8,
     X_MIN, Y_MAX*0.7,
     X_MAX, Y_MAX*0.7,
     X_MIN, Y_MAX*0.6,
     X_MAX, Y_MAX*0.6,
     X_MIN, Y_MAX*0.5,
     X_MAX, Y_MAX*0.5,
     X_MIN, Y_MAX*0.4,
     X_MAX, Y_MAX*0.4,
     X_MIN, Y_MAX*0.3,
     X_MAX, Y_MAX*0.3,
     X_MIN, Y_MAX*0.2,
     X_MAX, Y_MAX*0.2,
     X_MIN, Y_MAX*0.1,
     X_MAX, Y_MAX*0.1,
     X_MIN, 0,
     X_MAX, 0,
     X_MIN, Y_MIN*0.9,
     X_MAX, Y_MIN*0.9,
     X_MIN, Y_MIN*0.8,
     X_MAX, Y_MIN*0.8,
     X_MIN, Y_MIN*0.7,
     X_MAX, Y_MIN*0.7,
     X_MIN, Y_MIN*0.6,
     X_MAX, Y_MIN*0.6,
     X_MIN, Y_MIN*0.5,
     X_MAX, Y_MIN*0.5,
     X_MIN, Y_MIN*0.4,
     X_MAX, Y_MIN*0.4,
     X_MIN, Y_MIN*0.3,
     X_MAX, Y_MIN*0.3,
     X_MIN, Y_MIN*0.2,
     X_MAX, Y_MIN*0.2,
     X_MIN, Y_MIN*0.1,
     X_MAX, Y_MIN*0.1,
     X_MIN*0.8, Y_MAX,
     X_MIN*0.8, Y_MIN,
     X_MIN*0.6, Y_MAX,
     X_MIN*0.6, Y_MIN,
     X_MIN*0.4, Y_MAX,
     X_MIN*0.4, Y_MIN,
     X_MIN*0.2, Y_MAX,
     X_MIN*0.2, Y_MIN,
     X_MIN*0, Y_MAX,
     X_MIN*0, Y_MIN,
     X_MIN*-0.2, Y_MAX,
     X_MIN*-0.2, Y_MIN,
     X_MIN*-0.4, Y_MAX,
     X_MIN*-0.4, Y_MIN,
     X_MIN*-0.6, Y_MAX,
     X_MIN*-0.6, Y_MIN,
     X_MIN*-0.8, Y_MAX,
     X_MIN*-0.8, Y_MIN,
  ];
  // Now set up the colors for the vertices
  var colors = [
    1.0,  1.0,  1.0,  1.0,    // white
    1.0,  1.0,  1.0,  1.0,    // white
    1.0,  1.0,  1.0,  1.0,    // white
    1.0,  1.0,  1.0,  1.0,    // white
    1.0,  1.0,  1.0,  1.0,    // white
    1.0,  1.0,  1.0,  1.0,    // white
    1.0,  1.0,  1.0,  1.0,    // white
    1.0,  1.0,  1.0,  1.0,    // white
    1.0,  1.0,  1.0,  1.0,    // white
    1.0,  1.0,  1.0,  1.0,    // white
    1.0,  1.0,  1.0,  1.0,    // white
    1.0,  1.0,  1.0,  1.0,    // white
    1.0,  1.0,  1.0,  1.0,    // white
    1.0,  1.0,  1.0,  1.0,    // white
    1.0,  1.0,  1.0,  1.0,    // white
    1.0,  1.0,  1.0,  1.0,    // white
    1.0,  1.0,  1.0,  1.0,    // white
    1.0,  1.0,  1.0,  1.0,    // white
    1.0,  1.0,  1.0,  1.0,    // white
    1.0,  1.0,  1.0,  1.0,    // white
    1.0,  1.0,  1.0,  1.0,    // white
    1.0,  1.0,  1.0,  1.0,    // white
    1.0,  1.0,  1.0,  1.0,    // white
    1.0,  1.0,  1.0,  1.0,    // white
    1.0,  1.0,  1.0,  1.0,    // white
    1.0,  1.0,  1.0,  1.0,    // white
    1.0,  1.0,  1.0,  1.0,    // white
    1.0,  1.0,  1.0,  1.0,    // white
    1.0,  1.0,  1.0,  1.0,    // white
    1.0,  1.0,  1.0,  1.0,    // white
    1.0,  1.0,  1.0,  1.0,    // white
    1.0,  1.0,  1.0,  1.0,    // white
    1.0,  1.0,  1.0,  1.0,    // white
    1.0,  1.0,  1.0,  1.0,    // white
    1.0,  1.0,  1.0,  1.0,    // white
    1.0,  1.0,  1.0,  1.0,    // white
    1.0,  1.0,  1.0,  1.0,    // white
    1.0,  1.0,  1.0,  1.0,    // white
    1.0,  1.0,  1.0,  1.0,    // white
    1.0,  1.0,  1.0,  1.0,    // white
    1.0,  1.0,  1.0,  1.0,    // white
    1.0,  1.0,  1.0,  1.0,    // white
    1.0,  1.0,  1.0,  1.0,    // white
    1.0,  1.0,  1.0,  1.0,    // white
    1.0,  1.0,  1.0,  1.0,    // white
    1.0,  1.0,  1.0,  1.0,    // white
    1.0,  1.0,  1.0,  1.0,    // white
    1.0,  1.0,  1.0,  1.0,    // white
    1.0,  1.0,  1.0,  1.0,    // white
    1.0,  1.0,  1.0,  1.0,    // white
    1.0,  1.0,  1.0,  1.0,    // white
    1.0,  1.0,  1.0,  1.0,    // white
    1.0,  1.0,  1.0,  1.0,    // white
    1.0,  1.0,  1.0,  1.0,    // white
    1.0,  1.0,  1.0,  1.0,    // white
    1.0,  1.0,  1.0,  1.0,    // white
    1.0,  1.0,  1.0,  1.0,    // white
    1.0,  1.0,  1.0,  1.0,    // white
    1.0,  1.0,  1.0,  1.0,    // white
    1.0,  1.0,  1.0,  1.0,    // white
    1.0,  1.0,  1.0,  1.0,    // white
    ];

//
// Start here
//
function main() {
  const canvas = document.querySelector('#glcanvas');
  const gl = canvas.getContext('webgl');

  // If we don't have a GL context, give up now

  if (!gl) {
    alert('Unable to initialize WebGL. Your browser or machine may not support it.');
    return;
  }

  // Vertex shader program

  const vsSource = `
    attribute vec4 aVertexPosition;
    attribute vec4 aVertexColor;

    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;

    varying lowp vec4 vColor;

    void main(void) {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
      vColor = aVertexColor;
    }
  `;

  // Fragment shader program

  const fsSource = `
    varying lowp vec4 vColor;

    void main(void) {
      gl_FragColor = vColor;
    }
  `;

  // Initialize a shader program; this is where all the lighting
  // for the vertices and so forth is established.
  const shaderProgram = initShaderProgram(gl, vsSource, fsSource);

  // Collect all the info needed to use the shader program.
  // Look up which attributes our shader program is using
  // for aVertexPosition, aVevrtexColor and also
  // look up uniform locations.
  const programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
      vertexColor: gl.getAttribLocation(shaderProgram, 'aVertexColor'),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
      modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
    },
  };

  // Here's where we call the routine that builds all the
  // objects we'll be drawing.
  const buffers = initBuffers(gl);

  // Draw the scene
  drawScene(gl, programInfo, buffers);
}

//
// initBuffers
//
// Initialize the buffers we'll need. For this demo, we just
// have one object -- a simple two-dimensional square.
//
function initBuffers(gl) {

  // Create a buffer for the square's positions.

  const positionBuffer = gl.createBuffer();

  // Select the positionBuffer as the one to apply buffer
  // operations to from here out.

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // Now create an array of positions for the square.

  // Now pass the list of positions into WebGL to build the
  // shape. We do this by creating a Float32Array from the
  // JavaScript array, then use it to fill the current buffer.

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  const colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

  return {
    position: positionBuffer,
    color: colorBuffer,
  };
}

// Draw the shape one grid tile lower
function moveShapeDown() {
    square_pos = 0;
    for(var i = 1; i < 32; i+=2){
        positions[square_pos+i] = positions[square_pos+i] - 0.1*Y_MAX;
    }

    main();
}

// Draw the shape one grid tile to the right
function moveShapeRight(){
    square_pos = 0;
    for( var i = 0; i < 32; i+= 2){
        positions[square_pos+i] = positions[square_pos+i] + 0.1*(X_MAX-X_MIN);
    }
    main();
}


// Draw the shape one grid tile to the left
function moveShapeLeft(){
    square_pos = 0;
    for( var i = 0; i < 32; i+= 2){
        positions[square_pos+i] = positions[square_pos+i] - 0.1*(X_MAX-X_MIN);
    }
    main();
}

//
// Takes an x, y coordinate from the tetris board and converts it to CANVAS coordinates
// Returns the positions of the four verticies of the square
//
function convertXYtoCanvas(x, y){
    var xLeft = X_MIN + x * (X_MAX - X_MIN) * 0.1;
    var xRight = xLeft + (X_MAX - X_MIN) * 0.1;
    var yLow = Y_MIN + y * (Y_MAX-Y_MIN) * 0.05;
    var yHigh = yLow + (Y_MAX-Y_MIN) * 0.05;

    var squareVerticies = [xLeft, yLow, xRight, yLow, xLeft, yHigh, xRight, yHigh];

    return squareVerticies;
}

//
// Updates the front of the position buffer with the passed xy coordinate parameter
//
function repositionShape(newXYCoords){
    // Convert newPositions coordinates to canvas coordinates
    var newPositions = [];
    for(var i = 0; i < newXYCoords.length; i+=2){
        newPositions = newPositions.concat( convertXYtoCanvas(newXYCoords[i], newXYCoords[i+1]) );
    }

    // Remove old positions from position buffer and immediately add new positions
    positions = positions.slice(newPositions.length, positions.length);
    positions = newPositions.concat(positions);

    // Position array has been updated. Redraw shape
    main();
}

//
// Draw the scene.
//
function drawScene(gl, programInfo, buffers) {
  gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Clear to black, fully opaque
  gl.clearDepth(1.0);                 // Clear everything
  gl.enable(gl.DEPTH_TEST);           // Enable depth testing
  gl.depthFunc(gl.LEQUAL);            // Near things obscure far things
  
  

  // Clear the canvas before we start drawing on it.

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // Create a perspective matrix, a special matrix that is
  // used to simulate the distortion of perspective in a camera.
  // Our field of view is 45 degrees, with a width/height
  // ratio that matches the display size of the canvas
  // and we only want to see objects between 0.1 units
  // and 100 units away from the camera.

  const fieldOfView = 45 * Math.PI / 180;   // in radians
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  const zNear = 0.1;
  const zFar = 100.0;
  const projectionMatrix = mat4.create();

  
  // note: glmatrix.js always has the first argument
  // as the destination to receive the result.
  mat4.perspective(projectionMatrix,
                   fieldOfView,
                   aspect,
                   zNear,
                   zFar);

	/*			   
  // What if we use an orthogonal matrix instead? It's ugly!
  mat4.ortho(projectionMatrix,
                -3,
				3,
				-3,
				3,
                zNear,
                zFar);
   */
				   
  // Set the drawing position to the "identity" point, which is
  // the center of the scene.
  const modelViewMatrix = mat4.create();

  // Now move the drawing position a bit to where we want to
  // start drawing the square.

  mat4.translate(modelViewMatrix,     // destination matrix
                 modelViewMatrix,     // matrix to translate
                 [0.0, 0.0, -50.0]);  // amount to translate

  // Tell WebGL how to pull out the positions from the position
  // buffer into the vertexPosition attribute
  {
    const numComponents = 2;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexPosition,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(
        programInfo.attribLocations.vertexPosition);
  }

  // Tell WebGL how to pull out the colors from the color buffer
  // into the vertexColor attribute.
  {
    const numComponents = 4;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color);
    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexColor,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(
        programInfo.attribLocations.vertexColor);
  }

  // Tell WebGL to use our program when drawing

  gl.useProgram(programInfo.program);

  // Set the shader uniforms

  gl.uniformMatrix4fv(
      programInfo.uniformLocations.projectionMatrix,
      false,
      projectionMatrix);
  gl.uniformMatrix4fv(
      programInfo.uniformLocations.modelViewMatrix,
      false,
      modelViewMatrix);

  {
    const offset = 0;
    const vertexCount = 4;

    // Draw shapes first
    if (positions.length > 61*2){
        for( var i = 0; i < numShapeVerticies; i+=4){
            gl.drawArrays(gl.TRIANGLE_STRIP, i, 4);
        }
    }
    
    // Draw board perimeter
    gl.drawArrays(gl.LINE_STRIP, positions.length-122-numShapeVerticies, 5);

    // Draw grid
    for( var i = 117; i >= 0; i-=2)
    {
        gl.drawArrays(gl.LINE_STRIP, positions.length-i-numShapeVerticies, 2);
    }
  }
}

//
// Initialize a shader program, so WebGL knows how to draw our data
//
function initShaderProgram(gl, vsSource, fsSource) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

  // Create the shader program

  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  // If creating the shader program failed, alert

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
    return null;
  }

  return shaderProgram;
}

//
// creates a shader of the given type, uploads the source and
// compiles it.
//
function loadShader(gl, type, source) {
  const shader = gl.createShader(type);

  // Send the source to the shader object

  gl.shaderSource(shader, source);

  // Compile the shader program

  gl.compileShader(shader);

  // See if it compiled successfully

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}


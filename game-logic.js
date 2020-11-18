const SHAPE_CREATION_ERROR = -1;
const SHAPE_CREATED = 0;

function keyEventListener(){
    document.addEventListener ('keydown', (event) => {
        
        const keyName = event.key;
        switch(keyName) {
            case 'ArrowDown':
                increaseSpeed();
                break;
            case 'ArrowRight':
                myTetris.moveShapeRight();
                break;
            case 'ArrowLeft':
                myTetris.moveShapeLeft();
                break;
            case 'ArrowUp':
                myTetris.rotateShapeCCW();
                break;
            case 'r':
                location.reload(true);
                break;
            case 'R':
                location.reload(true);
                break;
            case 'p':
                if(paused){
                    paused = false;
                    playingSpeed = setInterval(intervalDrop, speed);
                } else{
                    paused = true;
                    clearInterval(playingSpeed);
                }
                break;
            case 'P':
                if(paused){
                    paused = false;
                    playingSpeed = setInterval(intervalDrop, speed);
                } else{
                    paused = true;
                    clearInterval(playingSpeed);
                }
                break;
        }
    });
}

//
// Creates a new O piece
//
function newO(){
    var x = 0

    col = 2*Math.floor(Math.random()*9)
    x = col/2;
    
    // Ensure the piece can be added to the board
    if( !(myTetris.checkSquareEmpty(x, 19) & myTetris.checkSquareEmpty(x+1, 19) & 
    myTetris.checkSquareEmpty(x, 18) & myTetris.checkSquareEmpty(x+1, 18))){
        return SHAPE_CREATION_ERROR;
    } else {
        myTetris.board[x+0][19] = true;
        myTetris.board[x+1][19] = true;
        myTetris.board[x+0][18] = true;
        myTetris.board[x+1][18] = true;

        myTetris.fallingShape.xyPts[0] = x+0;
        myTetris.fallingShape.xyPts[1] = 19;
        myTetris.fallingShape.xyPts[2] = x+1;
        myTetris.fallingShape.xyPts[3] = 19;
        myTetris.fallingShape.xyPts[4] = x+0;
        myTetris.fallingShape.xyPts[5] = 18;
        myTetris.fallingShape.xyPts[6] = x+1;
        myTetris.fallingShape.xyPts[7] = 18;
    }
    
    // Position the O piece
    OPositions = [  X_MIN + col, Y_MAX,  
        X_MIN + (col+2), Y_MAX,
        X_MIN + col, Y_MAX*0.9,
        X_MIN + (col+2), Y_MAX*0.9,
        X_MIN + (col+2), Y_MAX,  
        X_MIN + (col+4), Y_MAX,
        X_MIN + (col+2), Y_MAX*0.9,
        X_MIN + (col+4), Y_MAX*0.9,
        X_MIN + col, Y_MAX*0.9,  
        X_MIN + (col+2), Y_MAX*0.9,
        X_MIN + col, Y_MAX*0.8,
        X_MIN + (col+2), Y_MAX*0.8,
        X_MIN + (col+2), Y_MAX*0.9,  
        X_MIN + (col+4), Y_MAX*0.9,
        X_MIN + (col+2), Y_MAX*0.8,
        X_MIN + (col+4), Y_MAX*0.8
    ]

    // Concatenate the rest of the board behind where the positions for this shape
    positions = OPositions.concat( positions );

    // Define its colors
    Ocolors = [];
    for(var i = 0; i <= 15; i++){
        Ocolors = Ocolors.concat([0, 0, 1, 1]);
    }

    colors = Ocolors.concat(colors);

    myTetris.fallingShape.name = "O";

    return SHAPE_CREATED;
}

//
// Creates a new I piece
//
function newI(){
    //pieceOrientation = Math.floor(Math.random()*2);
    pieceOrientation = 0;

    // Orientation is N-S
    if(pieceOrientation){
        col = 2*Math.floor(Math.random()*10);
        x = col/2;

        // Check board is open in that spot
        if(!( myTetris.checkSquareEmpty(x, 19) & myTetris.checkSquareEmpty(x, 18) &
              myTetris.checkSquareEmpty(x, 17) & myTetris.checkSquareEmpty(x, 16) )){
            return SHAPE_CREATION_ERROR;
        } else {
            myTetris.board[x][19] = true;
            myTetris.board[x][18] = true;
            myTetris.board[x][17] = true;
            myTetris.board[x][16] = true;

            myTetris.fallingShape.xyPts[0] = x;
            myTetris.fallingShape.xyPts[1] = 19;
            myTetris.fallingShape.xyPts[2] = x;
            myTetris.fallingShape.xyPts[3] = 18;
            myTetris.fallingShape.xyPts[4] = x;
            myTetris.fallingShape.xyPts[5] = 17;
            myTetris.fallingShape.xyPts[6] = x;
            myTetris.fallingShape.xyPts[7] = 16;
        }

        Ipositions = [ 
            X_MIN + col + 0, Y_MAX,
            X_MIN + col + 2, Y_MAX,
            X_MIN + col + 0, Y_MAX*0.9,
            X_MIN + col + 2, Y_MAX*0.9,
            X_MIN + col + 0, Y_MAX*0.9,
            X_MIN + col + 2, Y_MAX*0.9,
            X_MIN + col + 0, Y_MAX*0.8,
            X_MIN + col + 2, Y_MAX*0.8,
            X_MIN + col + 0, Y_MAX*0.8,
            X_MIN + col + 2, Y_MAX*0.8,
            X_MIN + col + 0, Y_MAX*0.7,
            X_MIN + col + 2, Y_MAX*0.7,
            X_MIN + col + 0, Y_MAX*0.7,
            X_MIN + col + 2, Y_MAX*0.7,
            X_MIN + col + 0, Y_MAX*0.6,
            X_MIN + col + 2, Y_MAX*0.6
        ];
    } else { // Orientation is E-W
        col = 2*Math.floor(Math.random()*7);
        x = col/2;

        if(!( myTetris.checkSquareEmpty(x, 19) & myTetris.checkSquareEmpty(x+1, 19) &
              myTetris.checkSquareEmpty(x+2, 19) & myTetris.checkSquareEmpty(x+3, 19) )){
            return SHAPE_CREATION_ERROR;
        } else {
            myTetris.board[x+0][19] = true;
            myTetris.board[x+1][19] = true;
            myTetris.board[x+2][19] = true;
            myTetris.board[x+3][19] = true;

            myTetris.fallingShape.xyPts[0] = x+0;
            myTetris.fallingShape.xyPts[1] = 19;
            myTetris.fallingShape.xyPts[2] = x+1;
            myTetris.fallingShape.xyPts[3] = 19;
            myTetris.fallingShape.xyPts[4] = x+2;
            myTetris.fallingShape.xyPts[5] = 19;
            myTetris.fallingShape.xyPts[6] = x+3;
            myTetris.fallingShape.xyPts[7] = 19;
        }

        Ipositions = [ X_MIN + col, Y_MAX,
            X_MIN + col + 2, Y_MAX,
            X_MIN + col, Y_MAX*0.9,
            X_MIN + col + 2, Y_MAX*0.9,
            X_MIN + col + 2, Y_MAX,
            X_MIN + col + 4, Y_MAX,
            X_MIN + col + 2, Y_MAX*0.9,
            X_MIN + col + 4, Y_MAX*0.9,
            X_MIN + col + 4, Y_MAX,
            X_MIN + col + 6, Y_MAX,
            X_MIN + col + 4, Y_MAX*0.9,
            X_MIN + col + 6, Y_MAX*0.9,
            X_MIN + col + 6, Y_MAX,
            X_MIN + col + 8, Y_MAX,
            X_MIN + col + 6, Y_MAX*0.9,
            X_MIN + col + 8, Y_MAX*0.9
        ];
    }
    // Add positions
    positions = Ipositions.concat(positions);

    // Define its colors
    Icolors = [];
    for(var i = 0; i <= 15; i++){
        Icolors = Icolors.concat([1, 0, 0, 1]);
    }

    colors = Icolors.concat(colors);

    myTetris.fallingShape.name = "I";
    myTetris.fallingShape.orientation = pieceOrientation;

    return SHAPE_CREATED;
}

//
// Creates a new Z piece
//
function newZ(){
    pieceOrientation = Math.floor(Math.random()*2);

    // Orientation is N-S
    //        |
    //       ||
    //       |
    if(pieceOrientation){
        col = 2*(Math.floor(Math.random()*9));
        x = col/2;

        // Check board is open in that spot
        if(!( myTetris.checkSquareEmpty(x+1, 19) & myTetris.checkSquareEmpty(x+1, 18) &
              myTetris.checkSquareEmpty(x+0, 18) & myTetris.checkSquareEmpty(x+0, 17) )){
            return SHAPE_CREATION_ERROR;
        } else {
            myTetris.board[x+1][19] = true;
            myTetris.board[x+1][18] = true;
            myTetris.board[x+0][18] = true;
            myTetris.board[x+0][17] = true;

            myTetris.fallingShape.xyPts[0] = x+1;
            myTetris.fallingShape.xyPts[1] = 19;
            myTetris.fallingShape.xyPts[2] = x+1;
            myTetris.fallingShape.xyPts[3] = 18;
            myTetris.fallingShape.xyPts[4] = x;
            myTetris.fallingShape.xyPts[5] = 18;
            myTetris.fallingShape.xyPts[6] = x;
            myTetris.fallingShape.xyPts[7] = 17;
        }

        Zpositions = [ 
            X_MIN + col + 2, Y_MAX,
            X_MIN + col + 4, Y_MAX,
            X_MIN + col + 2, Y_MAX*0.9,
            X_MIN + col + 4, Y_MAX*0.9,
            X_MIN + col + 2, Y_MAX*0.9,
            X_MIN + col + 4, Y_MAX*0.9,
            X_MIN + col + 2, Y_MAX*0.8,
            X_MIN + col + 4, Y_MAX*0.8,
            X_MIN + col, Y_MAX*0.9,
            X_MIN + col + 2, Y_MAX*0.9,
            X_MIN + col, Y_MAX*0.8,
            X_MIN + col + 2, Y_MAX*0.8,
            X_MIN + col, Y_MAX*0.8,
            X_MIN + col + 2, Y_MAX*0.8,
            X_MIN + col, Y_MAX*0.7,
            X_MIN + col + 2, Y_MAX*0.7
        ];
    } else { // Orientation is E-W
        //
        // --
        //  --

        col = 2*Math.floor(Math.random()*8+1);
        x = col/2;

        // Check board is open in that spot
        if(!( myTetris.checkSquareEmpty(x-1, 19) & myTetris.checkSquareEmpty(x+0, 19) &
              myTetris.checkSquareEmpty(x+0, 18) & myTetris.checkSquareEmpty(x+1, 18) )){
            return SHAPE_CREATION_ERROR;
        } else {
            myTetris.board[x-1][19] = true;
            myTetris.board[x+0][19] = true;
            myTetris.board[x+0][18] = true;
            myTetris.board[x+1][18] = true;

            myTetris.fallingShape.xyPts[0] = x-1;
            myTetris.fallingShape.xyPts[1] = 19;
            myTetris.fallingShape.xyPts[2] = x+0;
            myTetris.fallingShape.xyPts[3] = 19;
            myTetris.fallingShape.xyPts[4] = x+0;
            myTetris.fallingShape.xyPts[5] = 18;
            myTetris.fallingShape.xyPts[6] = x+1;
            myTetris.fallingShape.xyPts[7] = 18;
        }

        Zpositions = [ 
            X_MIN + col, Y_MAX,
            X_MIN + col + 2, Y_MAX,
            X_MIN + col, Y_MAX*0.9,
            X_MIN + col + 2, Y_MAX*0.9,
            X_MIN + col, Y_MAX,
            X_MIN + col - 2, Y_MAX,
            X_MIN + col, Y_MAX*0.9,
            X_MIN + col - 2, Y_MAX*0.9,
            X_MIN + col, Y_MAX*0.9,
            X_MIN + col + 2, Y_MAX*0.9,
            X_MIN + col, Y_MAX*0.8,
            X_MIN + col + 2, Y_MAX*0.8,
            X_MIN + col + 2, Y_MAX*0.9,
            X_MIN + col + 4, Y_MAX*0.9,
            X_MIN + col + 2, Y_MAX*0.8,
            X_MIN + col + 4, Y_MAX*0.8,
        ];
    }
    positions = Zpositions.concat(positions);

    // Define its colors
    Zcolors = [];
    for(var i = 0; i <= 15; i++){
        Zcolors = Zcolors.concat([1, 0, 1, 1]);
    }

    colors = Zcolors.concat(colors);

    myTetris.fallingShape.name = "Z";
    myTetris.fallingShape.orientation = pieceOrientation;

    return SHAPE_CREATED;
}

//
// Creates a new S piece
//
function newS(){
    pieceOrientation = Math.floor(Math.random()*2);

    // Orientation is N-S
    //   |
    //   ||
    //    |
    if(pieceOrientation){
        col = 2*(Math.floor(Math.random()*9));
        x = col/2;

        // Check board is open in that spot
        if(!( myTetris.checkSquareEmpty(x, 19) & myTetris.checkSquareEmpty(x, 18) &
              myTetris.checkSquareEmpty(x+1, 18) & myTetris.checkSquareEmpty(x+1, 17) )){
            return SHAPE_CREATION_ERROR;
        } else {
            myTetris.board[x+0][19] = true;
            myTetris.board[x+0][18] = true;
            myTetris.board[x+1][18] = true;
            myTetris.board[x+1][17] = true;

            myTetris.fallingShape.xyPts[0] = x;
            myTetris.fallingShape.xyPts[1] = 19;
            myTetris.fallingShape.xyPts[2] = x;
            myTetris.fallingShape.xyPts[3] = 18;
            myTetris.fallingShape.xyPts[4] = x+1;
            myTetris.fallingShape.xyPts[5] = 18;
            myTetris.fallingShape.xyPts[6] = x+1;
            myTetris.fallingShape.xyPts[7] = 17;
        }

        Spositions = [
            X_MIN + col + 0, Y_MAX,
            X_MIN + col + 2, Y_MAX,
            X_MIN + col + 0, Y_MAX*0.9,
            X_MIN + col + 2, Y_MAX*0.9,
            X_MIN + col + 2, Y_MAX*0.9,
            X_MIN + col + 4, Y_MAX*0.9,
            X_MIN + col + 2, Y_MAX*0.8,
            X_MIN + col + 4, Y_MAX*0.8,
            X_MIN + col + 0, Y_MAX*0.9,
            X_MIN + col + 2, Y_MAX*0.9,
            X_MIN + col + 0, Y_MAX*0.8,
            X_MIN + col + 2, Y_MAX*0.8,
            X_MIN + col + 2, Y_MAX*0.8,
            X_MIN + col + 4, Y_MAX*0.8,
            X_MIN + col + 2, Y_MAX*0.7,
            X_MIN + col + 4, Y_MAX*0.7
        ];
    } else { // Orientation is E-W
        col = 2*Math.floor(Math.random()*8+1);
        x = col/2;

        // Check board is open in that spot
        if(!( myTetris.checkSquareEmpty(x, 19) & myTetris.checkSquareEmpty(x+1, 19) &
              myTetris.checkSquareEmpty(x, 18) & myTetris.checkSquareEmpty(x-1, 18) )){
            return SHAPE_CREATION_ERROR;
        } else {
            myTetris.board[x+0][19] = true;
            myTetris.board[x+1][19] = true;
            myTetris.board[x+0][18] = true;
            myTetris.board[x-1][18] = true;

            myTetris.fallingShape.xyPts[0] = x;
            myTetris.fallingShape.xyPts[1] = 19;
            myTetris.fallingShape.xyPts[2] = x+1;
            myTetris.fallingShape.xyPts[3] = 19;
            myTetris.fallingShape.xyPts[4] = x;
            myTetris.fallingShape.xyPts[5] = 18;
            myTetris.fallingShape.xyPts[6] = x-1;
            myTetris.fallingShape.xyPts[7] = 18;
        }

        Spositions = [ 
            X_MIN + col + 0, Y_MAX,
            X_MIN + col + 2, Y_MAX,
            X_MIN + col + 0, Y_MAX*0.9,
            X_MIN + col + 2, Y_MAX*0.9,
            X_MIN + col + 2, Y_MAX,
            X_MIN + col + 4, Y_MAX,
            X_MIN + col + 2, Y_MAX*0.9,
            X_MIN + col + 4, Y_MAX*0.9,
            X_MIN + col + 0, Y_MAX*0.9,
            X_MIN + col + 2, Y_MAX*0.9,
            X_MIN + col + 0, Y_MAX*0.8,
            X_MIN + col + 2, Y_MAX*0.8,
            X_MIN + col + 0, Y_MAX*0.9,
            X_MIN + col - 2, Y_MAX*0.9,
            X_MIN + col + 0, Y_MAX*0.8,
            X_MIN + col - 2, Y_MAX*0.8,
        ];
    }
    positions = Spositions.concat(positions);

    // Define its colors
    Scolors = [];
    for(var i = 0; i <= 15; i++){
        Scolors = Scolors.concat([1, 1, 0, 1]);
    }

    colors = Scolors.concat(colors);

    myTetris.fallingShape.name = "S";
    myTetris.fallingShape.orientation = pieceOrientation;

    return SHAPE_CREATED;
}

//
// Creates a new T piece
//
function newT() {
    pieceOrientation = Math.floor(Math.random()*4);

    //
    // Orientation is ---
    //                 -
    if(pieceOrientation == 0){
        col = 2*(Math.floor(Math.random()*8+1));
        x = col/2;

        // Check board is open in that spot
        if(!( myTetris.checkSquareEmpty(x+0, 19) & myTetris.checkSquareEmpty(x+1, 19) &
              myTetris.checkSquareEmpty(x-1, 18) & myTetris.checkSquareEmpty(x+0, 18) )){
            return SHAPE_CREATION_ERROR;
        } else {
            myTetris.board[x][19] = true;
            myTetris.board[x+1][19] = true;
            myTetris.board[x-1][19] = true;
            myTetris.board[x][18] = true;

            myTetris.fallingShape.xyPts[0] = x+0;
            myTetris.fallingShape.xyPts[1] = 19;
            myTetris.fallingShape.xyPts[2] = x+1;
            myTetris.fallingShape.xyPts[3] = 19;
            myTetris.fallingShape.xyPts[4] = x-1;
            myTetris.fallingShape.xyPts[5] = 19;
            myTetris.fallingShape.xyPts[6] = x;
            myTetris.fallingShape.xyPts[7] = 18;
        }

        Tpositions = [ 
            X_MIN + col + 0, Y_MAX,
            X_MIN + col + 2, Y_MAX,
            X_MIN + col + 0, Y_MAX*0.9,
            X_MIN + col + 2, Y_MAX*0.9,
            X_MIN + col + 0, Y_MAX,
            X_MIN + col - 2, Y_MAX,
            X_MIN + col + 0, Y_MAX*0.9,
            X_MIN + col - 2, Y_MAX*0.9,
            X_MIN + col + 2, Y_MAX,
            X_MIN + col + 4, Y_MAX,
            X_MIN + col + 2, Y_MAX*0.9,
            X_MIN + col + 4, Y_MAX*0.9,
            X_MIN + col + 0, Y_MAX*0.9,
            X_MIN + col + 2, Y_MAX*0.9,
            X_MIN + col + 0, Y_MAX*0.8,
            X_MIN + col + 2, Y_MAX*0.8
        ];
    } else if(pieceOrientation == 1){ 
        //                |
        // Orientation is ||
        //                |
        col = 2*Math.floor(Math.random()*9);
        x = col/2;

        // Check board is open in that spot
        if(!( myTetris.checkSquareEmpty(x+0, 19) & myTetris.checkSquareEmpty(x+0, 18) &
              myTetris.checkSquareEmpty(x+0, 17) & myTetris.checkSquareEmpty(x+1, 18) )){
            return SHAPE_CREATION_ERROR;
        } else {
            myTetris.board[x][19] = true;
            myTetris.board[x][18] = true;
            myTetris.board[x][17] = true;
            myTetris.board[x+1][18] = true;

            myTetris.fallingShape.xyPts[0] = x+0;
            myTetris.fallingShape.xyPts[1] = 19;
            myTetris.fallingShape.xyPts[2] = x+0;
            myTetris.fallingShape.xyPts[3] = 18;
            myTetris.fallingShape.xyPts[4] = x;
            myTetris.fallingShape.xyPts[5] = 17;
            myTetris.fallingShape.xyPts[6] = x+1;
            myTetris.fallingShape.xyPts[7] = 18;
        }

        Tpositions = [ 
            X_MIN + col + 0, Y_MAX,
            X_MIN + col + 2, Y_MAX,
            X_MIN + col + 0, Y_MAX*0.9,
            X_MIN + col + 2, Y_MAX*0.9,
            X_MIN + col + 0, Y_MAX*0.9,
            X_MIN + col + 2, Y_MAX*0.9,
            X_MIN + col + 0, Y_MAX*0.8,
            X_MIN + col + 2, Y_MAX*0.8,
            X_MIN + col + 0, Y_MAX*0.8,
            X_MIN + col + 2, Y_MAX*0.8,
            X_MIN + col + 0, Y_MAX*0.7,
            X_MIN + col + 2, Y_MAX*0.7,
            X_MIN + col + 2, Y_MAX*0.9,
            X_MIN + col + 4, Y_MAX*0.9,
            X_MIN + col + 2, Y_MAX*0.8,
            X_MIN + col + 4, Y_MAX*0.8,
        ];
    } else if(pieceOrientation == 2) { 
        
        //                 |
        // Orientation is ||
        //                 |
        col = 2*Math.floor(Math.random()*9+1);
        x = col/2;

        // Check board is open in that spot
        if(!( myTetris.checkSquareEmpty(x+0, 19) & myTetris.checkSquareEmpty(x+0, 18) &
              myTetris.checkSquareEmpty(x+0, 17) & myTetris.checkSquareEmpty(x-1, 18) )){
            return SHAPE_CREATION_ERROR;
        } else {
            myTetris.board[x+0][19] = true;
            myTetris.board[x+0][18] = true;
            myTetris.board[x+0][17] = true;
            myTetris.board[x-1][18] = true;

            myTetris.fallingShape.xyPts[0] = x+0;
            myTetris.fallingShape.xyPts[1] = 19;
            myTetris.fallingShape.xyPts[2] = x+0;
            myTetris.fallingShape.xyPts[3] = 18;
            myTetris.fallingShape.xyPts[4] = x+0;
            myTetris.fallingShape.xyPts[5] = 17;
            myTetris.fallingShape.xyPts[6] = x-1;
            myTetris.fallingShape.xyPts[7] = 18;
        }

        Tpositions = [ 
            X_MIN + col + 0, Y_MAX,
            X_MIN + col + 2, Y_MAX,
            X_MIN + col + 0, Y_MAX*0.9,
            X_MIN + col + 2, Y_MAX*0.9,
            X_MIN + col + 0, Y_MAX*0.9,
            X_MIN + col + 2, Y_MAX*0.9,
            X_MIN + col + 0, Y_MAX*0.8,
            X_MIN + col + 2, Y_MAX*0.8,
            X_MIN + col + 0, Y_MAX*0.8,
            X_MIN + col + 2, Y_MAX*0.8,
            X_MIN + col + 0, Y_MAX*0.7,
            X_MIN + col + 2, Y_MAX*0.7,
            X_MIN + col + 0, Y_MAX*0.9,
            X_MIN + col - 2, Y_MAX*0.9,
            X_MIN + col + 0, Y_MAX*0.8,
            X_MIN + col - 2, Y_MAX*0.8,
        ];
    } else {

        //                 -
        // Orientation is ---
        //                
        col = 2*Math.floor(Math.random()*8+1);
        x = col/2;

        // Check board is open in that spot
        if(!( myTetris.checkSquareEmpty(x+0, 19) & myTetris.checkSquareEmpty(x+1, 18) &
              myTetris.checkSquareEmpty(x-1, 18) & myTetris.checkSquareEmpty(x+0, 18) )){
            return SHAPE_CREATION_ERROR;
        } else {
            myTetris.board[x+0][19] = true;
            myTetris.board[x+1][18] = true;
            myTetris.board[x-1][18] = true;
            myTetris.board[x+0][18] = true;

            myTetris.fallingShape.xyPts[0] = x+0;
            myTetris.fallingShape.xyPts[1] = 19;
            myTetris.fallingShape.xyPts[2] = x+1;
            myTetris.fallingShape.xyPts[3] = 18;
            myTetris.fallingShape.xyPts[4] = x-1;
            myTetris.fallingShape.xyPts[5] = 18;
            myTetris.fallingShape.xyPts[6] = x;
            myTetris.fallingShape.xyPts[7] = 18;
        }

        Tpositions = [ 
            X_MIN + col + 0, Y_MAX,
            X_MIN + col + 2, Y_MAX,
            X_MIN + col + 0, Y_MAX*0.9,
            X_MIN + col + 2, Y_MAX*0.9,
            X_MIN + col + 0, Y_MAX*0.9,
            X_MIN + col - 2, Y_MAX*0.9,
            X_MIN + col + 0, Y_MAX*0.8,
            X_MIN + col - 2, Y_MAX*0.8,
            X_MIN + col + 2, Y_MAX*0.9,
            X_MIN + col + 4, Y_MAX*0.9,
            X_MIN + col + 2, Y_MAX*0.8,
            X_MIN + col + 4, Y_MAX*0.8,
            X_MIN + col + 0, Y_MAX*0.9,
            X_MIN + col + 2, Y_MAX*0.9,
            X_MIN + col + 0, Y_MAX*0.8,
            X_MIN + col + 2, Y_MAX*0.8
        ];
    }
    positions = Tpositions.concat(positions);

    // Define its colors
    Tcolors = [];
    for(var i = 0; i <= 15; i++){
        Tcolors = Tcolors.concat([0, 1, 1, 1]);
    }

    colors = Tcolors.concat(colors);

    myTetris.fallingShape.name = "T";
    myTetris.fallingShape.orientation = pieceOrientation;

    return SHAPE_CREATED;
}

//
// Creates a new L piece
//
function newL(){
    pieceOrientation = Math.floor(Math.random()*4);

    //
    // Orientation is ---
    //                -
    if(pieceOrientation == 0){
        col = 2*(Math.floor(Math.random()*8+1));
        x = col/2;

        // Check board is open in that spot
        if(!( myTetris.checkSquareEmpty(x+0, 19) & myTetris.checkSquareEmpty(x+1, 19) &
              myTetris.checkSquareEmpty(x-1, 19) & myTetris.checkSquareEmpty(x-1, 18) )){
            return SHAPE_CREATION_ERROR;
        } else {
            myTetris.board[x+0][19] = true;
            myTetris.board[x+1][19] = true;
            myTetris.board[x-1][19] = true;
            myTetris.board[x-1][18] = true;

            myTetris.fallingShape.xyPts[0] = x+0;
            myTetris.fallingShape.xyPts[1] = 19;
            myTetris.fallingShape.xyPts[2] = x+1;
            myTetris.fallingShape.xyPts[3] = 19;
            myTetris.fallingShape.xyPts[4] = x-1;
            myTetris.fallingShape.xyPts[5] = 19;
            myTetris.fallingShape.xyPts[6] = x-1;
            myTetris.fallingShape.xyPts[7] = 18;
        }

        Lpositions = [ 
            X_MIN + col + 0, Y_MAX,
            X_MIN + col + 2, Y_MAX,
            X_MIN + col + 0, Y_MAX*0.9,
            X_MIN + col + 2, Y_MAX*0.9,
            X_MIN + col + 0, Y_MAX,
            X_MIN + col - 2, Y_MAX,
            X_MIN + col + 0, Y_MAX*0.9,
            X_MIN + col - 2, Y_MAX*0.9,
            X_MIN + col + 2, Y_MAX,
            X_MIN + col + 4, Y_MAX,
            X_MIN + col + 2, Y_MAX*0.9,
            X_MIN + col + 4, Y_MAX*0.9,
            X_MIN + col + 0, Y_MAX*0.9,
            X_MIN + col - 2, Y_MAX*0.9,
            X_MIN + col + 0, Y_MAX*0.8,
            X_MIN + col - 2, Y_MAX*0.8
        ];
    } else if(pieceOrientation == 1){ 
        //                |
        // Orientation is |
        //                ||
        col = 2*Math.floor(Math.random()*9);
        x = col/2;

        // Check board is open in that spot
        if(!( myTetris.checkSquareEmpty(x+0, 19) & myTetris.checkSquareEmpty(x+0, 18) &
              myTetris.checkSquareEmpty(x+0, 17) & myTetris.checkSquareEmpty(x+1, 17) )){
            return SHAPE_CREATION_ERROR;
        } else {
            myTetris.board[x+0][19] = true;
            myTetris.board[x+0][18] = true;
            myTetris.board[x+0][17] = true;
            myTetris.board[x+1][17] = true;

            myTetris.fallingShape.xyPts[0] = x+0;
            myTetris.fallingShape.xyPts[1] = 19;
            myTetris.fallingShape.xyPts[2] = x+0;
            myTetris.fallingShape.xyPts[3] = 18;
            myTetris.fallingShape.xyPts[4] = x+0;
            myTetris.fallingShape.xyPts[5] = 17;
            myTetris.fallingShape.xyPts[6] = x+1;
            myTetris.fallingShape.xyPts[7] = 17;
        }

        Lpositions = [ 
            X_MIN + col + 0, Y_MAX,
            X_MIN + col + 2, Y_MAX,
            X_MIN + col + 0, Y_MAX*0.9,
            X_MIN + col + 2, Y_MAX*0.9,
            X_MIN + col + 0, Y_MAX*0.9,
            X_MIN + col + 2, Y_MAX*0.9,
            X_MIN + col + 0, Y_MAX*0.8,
            X_MIN + col + 2, Y_MAX*0.8,
            X_MIN + col + 0, Y_MAX*0.8,
            X_MIN + col + 2, Y_MAX*0.8,
            X_MIN + col + 0, Y_MAX*0.7,
            X_MIN + col + 2, Y_MAX*0.7,
            X_MIN + col + 2, Y_MAX*0.8,
            X_MIN + col + 4, Y_MAX*0.8,
            X_MIN + col + 2, Y_MAX*0.7,
            X_MIN + col + 4, Y_MAX*0.7,
        ];
    }else if(pieceOrientation == 2){ 
        //                ||
        // Orientation is  |
        //                 |
        col = 2*Math.floor(Math.random()*9+1);
        x = col/2;

        // Check board is open in that spot
        if(!( myTetris.checkSquareEmpty(x+0, 19) & myTetris.checkSquareEmpty(x+0, 18) &
              myTetris.checkSquareEmpty(x+0, 17) & myTetris.checkSquareEmpty(x-1, 19) )){
            return SHAPE_CREATION_ERROR;
        } else {
            myTetris.board[x+0][19] = true;
            myTetris.board[x+0][18] = true;
            myTetris.board[x+0][17] = true;
            myTetris.board[x-1][19] = true;

            myTetris.fallingShape.xyPts[0] = x+0;
            myTetris.fallingShape.xyPts[1] = 19;
            myTetris.fallingShape.xyPts[2] = x+0;
            myTetris.fallingShape.xyPts[3] = 18;
            myTetris.fallingShape.xyPts[4] = x+0;
            myTetris.fallingShape.xyPts[5] = 17;
            myTetris.fallingShape.xyPts[6] = x-1;
            myTetris.fallingShape.xyPts[7] = 19;
        }

        Lpositions = [ 
            X_MIN + col + 0, Y_MAX,
            X_MIN + col + 2, Y_MAX,
            X_MIN + col + 0, Y_MAX*0.9,
            X_MIN + col + 2, Y_MAX*0.9,
            X_MIN + col + 0, Y_MAX*0.9,
            X_MIN + col + 2, Y_MAX*0.9,
            X_MIN + col + 0, Y_MAX*0.8,
            X_MIN + col + 2, Y_MAX*0.8,
            X_MIN + col + 0, Y_MAX*0.8,
            X_MIN + col + 2, Y_MAX*0.8,
            X_MIN + col + 0, Y_MAX*0.7,
            X_MIN + col + 2, Y_MAX*0.7,
            X_MIN + col + 0, Y_MAX,
            X_MIN + col - 2, Y_MAX,
            X_MIN + col + 0, Y_MAX*0.9,
            X_MIN + col - 2, Y_MAX*0.9,
        ];
    } else {
        //                  -
        // Orientation is ---
        //                
        col = 2*Math.floor(Math.random()*8+1);
        x = col/2;

        // Check board is open in that spot
        if(!( myTetris.checkSquareEmpty(x+0, 18) & myTetris.checkSquareEmpty(x+1, 18) &
              myTetris.checkSquareEmpty(x-1, 18) & myTetris.checkSquareEmpty(x+1, 19) )){
            return SHAPE_CREATION_ERROR;
        } else {
            myTetris.board[x+0][18] = true;
            myTetris.board[x+1][18] = true;
            myTetris.board[x-1][18] = true;
            myTetris.board[x+1][19] = true;

            myTetris.fallingShape.xyPts[0] = x+0;
            myTetris.fallingShape.xyPts[1] = 18;
            myTetris.fallingShape.xyPts[2] = x+1;
            myTetris.fallingShape.xyPts[3] = 18;
            myTetris.fallingShape.xyPts[4] = x-1;
            myTetris.fallingShape.xyPts[5] = 18;
            myTetris.fallingShape.xyPts[6] = x+1;
            myTetris.fallingShape.xyPts[7] = 19;
        }

        Lpositions = [ 
            X_MIN + col + 4, Y_MAX,
            X_MIN + col + 2, Y_MAX,
            X_MIN + col + 4, Y_MAX*0.9,
            X_MIN + col + 2, Y_MAX*0.9,
            X_MIN + col + 0, Y_MAX*0.9,
            X_MIN + col - 2, Y_MAX*0.9,
            X_MIN + col + 0, Y_MAX*0.8,
            X_MIN + col - 2, Y_MAX*0.8,
            X_MIN + col + 2, Y_MAX*0.9,
            X_MIN + col + 4, Y_MAX*0.9,
            X_MIN + col + 2, Y_MAX*0.8,
            X_MIN + col + 4, Y_MAX*0.8,
            X_MIN + col + 0, Y_MAX*0.9,
            X_MIN + col + 2, Y_MAX*0.9,
            X_MIN + col + 0, Y_MAX*0.8,
            X_MIN + col + 2, Y_MAX*0.8
        ];
    }
    // Add the positions to the position matrix
    positions = Lpositions.concat(positions);

    // Define its colors
    Lcolors = [];
    for(var i = 0; i <= 15; i++){
        Lcolors = Lcolors.concat([0.25, 0, 0.75, 1]);
    }

    colors = Lcolors.concat(colors);

    myTetris.fallingShape.name = "L";
    myTetris.fallingShape.orientation = pieceOrientation;

    return SHAPE_CREATED;
}

//
// Creates a new J piece
//
function newJ() {
    pieceOrientation = Math.floor(Math.random()*4);

    //
    // Orientation is ---
    //                  -
    if(pieceOrientation == 0){
        col = 2*(Math.floor(Math.random()*8+1));
        x = col/2;

        // Check board is open in that spot
        if(!( myTetris.checkSquareEmpty(x+0, 19) & myTetris.checkSquareEmpty(x+1, 19) &
              myTetris.checkSquareEmpty(x-1, 19) & myTetris.checkSquareEmpty(x+1, 18) )){
            return SHAPE_CREATION_ERROR;
        } else {
            myTetris.board[x+0][19] = true;
            myTetris.board[x+1][19] = true;
            myTetris.board[x-1][19] = true;
            myTetris.board[x+1][18] = true;

            myTetris.fallingShape.xyPts[0] = x+0;
            myTetris.fallingShape.xyPts[1] = 19;
            myTetris.fallingShape.xyPts[2] = x+1;
            myTetris.fallingShape.xyPts[3] = 19;
            myTetris.fallingShape.xyPts[4] = x-1;
            myTetris.fallingShape.xyPts[5] = 19;
            myTetris.fallingShape.xyPts[6] = x+1;
            myTetris.fallingShape.xyPts[7] = 18;
        }

        Jpositions = [ 
            X_MIN + col + 0, Y_MAX,
            X_MIN + col + 2, Y_MAX,
            X_MIN + col + 0, Y_MAX*0.9,
            X_MIN + col + 2, Y_MAX*0.9,
            X_MIN + col + 0, Y_MAX,
            X_MIN + col - 2, Y_MAX,
            X_MIN + col + 0, Y_MAX*0.9,
            X_MIN + col - 2, Y_MAX*0.9,
            X_MIN + col + 2, Y_MAX,
            X_MIN + col + 4, Y_MAX,
            X_MIN + col + 2, Y_MAX*0.9,
            X_MIN + col + 4, Y_MAX*0.9,
            X_MIN + col + 2, Y_MAX*0.9,
            X_MIN + col + 4, Y_MAX*0.9,
            X_MIN + col + 2, Y_MAX*0.8,
            X_MIN + col + 4, Y_MAX*0.8
        ];
    } else if(pieceOrientation == 1){ 
        //                ||
        // Orientation is |
        //                |
        col = 2*Math.floor(Math.random()*9);
        x = col/2;

        // Check board is open in that spot
        if(!( myTetris.checkSquareEmpty(x+0, 19) & myTetris.checkSquareEmpty(x+0, 18) &
              myTetris.checkSquareEmpty(x+0, 17) & myTetris.checkSquareEmpty(x+1, 19) )){
            return SHAPE_CREATION_ERROR;
        } else {
            myTetris.board[x+0][19] = true;
            myTetris.board[x+0][18] = true;
            myTetris.board[x+0][17] = true;
            myTetris.board[x+1][19] = true;

            myTetris.fallingShape.xyPts[0] = x+0;
            myTetris.fallingShape.xyPts[1] = 19;
            myTetris.fallingShape.xyPts[2] = x+0;
            myTetris.fallingShape.xyPts[3] = 18;
            myTetris.fallingShape.xyPts[4] = x+0;
            myTetris.fallingShape.xyPts[5] = 17;
            myTetris.fallingShape.xyPts[6] = x+1;
            myTetris.fallingShape.xyPts[7] = 19;
        }

        Jpositions = [ 
            X_MIN + col + 0, Y_MAX,
            X_MIN + col + 2, Y_MAX,
            X_MIN + col + 0, Y_MAX*0.9,
            X_MIN + col + 2, Y_MAX*0.9,
            X_MIN + col + 0, Y_MAX*0.9,
            X_MIN + col + 2, Y_MAX*0.9,
            X_MIN + col + 0, Y_MAX*0.8,
            X_MIN + col + 2, Y_MAX*0.8,
            X_MIN + col + 0, Y_MAX*0.8,
            X_MIN + col + 2, Y_MAX*0.8,
            X_MIN + col + 0, Y_MAX*0.7,
            X_MIN + col + 2, Y_MAX*0.7,
            X_MIN + col + 2, Y_MAX*0.9,
            X_MIN + col + 4, Y_MAX*0.9,
            X_MIN + col + 2, Y_MAX,
            X_MIN + col + 4, Y_MAX,
        ];
    }else if(pieceOrientation == 2){ 
        //                 |
        // Orientation is  |
        //                ||
        col = 2*Math.floor(Math.random()*9+1);
        x = col/2;

        // Check board is open in that spot
        if(!( myTetris.checkSquareEmpty(x+0, 19) & myTetris.checkSquareEmpty(x+0, 18) &
              myTetris.checkSquareEmpty(x+0, 17) & myTetris.checkSquareEmpty(x-1, 17) )){
            return SHAPE_CREATION_ERROR;
        } else {
            myTetris.board[x+0][19] = true;
            myTetris.board[x+0][18] = true;
            myTetris.board[x+0][17] = true;
            myTetris.board[x-1][17] = true;

            myTetris.fallingShape.xyPts[0] = x+0;
            myTetris.fallingShape.xyPts[1] = 19;
            myTetris.fallingShape.xyPts[2] = x+0;
            myTetris.fallingShape.xyPts[3] = 18;
            myTetris.fallingShape.xyPts[4] = x+0;
            myTetris.fallingShape.xyPts[5] = 17;
            myTetris.fallingShape.xyPts[6] = x-1;
            myTetris.fallingShape.xyPts[7] = 17;
        }
        

        Jpositions = [ 
            X_MIN + col + 0, Y_MAX,
            X_MIN + col + 2, Y_MAX,
            X_MIN + col + 0, Y_MAX*0.9,
            X_MIN + col + 2, Y_MAX*0.9,
            X_MIN + col + 0, Y_MAX*0.9,
            X_MIN + col + 2, Y_MAX*0.9,
            X_MIN + col + 0, Y_MAX*0.8,
            X_MIN + col + 2, Y_MAX*0.8,
            X_MIN + col + 0, Y_MAX*0.8,
            X_MIN + col + 2, Y_MAX*0.8,
            X_MIN + col + 0, Y_MAX*0.7,
            X_MIN + col + 2, Y_MAX*0.7,
            X_MIN + col + 0, Y_MAX*0.8,
            X_MIN + col - 2, Y_MAX*0.8,
            X_MIN + col + 0, Y_MAX*0.7,
            X_MIN + col - 2, Y_MAX*0.7,
        ];
    } else {
        //                -
        // Orientation is ---
        //                
        col = 2*Math.floor(Math.random()*8+1);
        x = col/2;

        // Check board is open in that spot
        if(!( myTetris.checkSquareEmpty(x+0, 18) & myTetris.checkSquareEmpty(x+1, 18) &
              myTetris.checkSquareEmpty(x-1, 18) & myTetris.checkSquareEmpty(x-1, 19) )){
            return SHAPE_CREATION_ERROR;
        } else {
            myTetris.board[x+0][18] = true;
            myTetris.board[x+1][18] = true;
            myTetris.board[x-1][18] = true;
            myTetris.board[x-1][19] = true;

            myTetris.fallingShape.xyPts[0] = x+0;
            myTetris.fallingShape.xyPts[1] = 18;
            myTetris.fallingShape.xyPts[2] = x+1;
            myTetris.fallingShape.xyPts[3] = 18;
            myTetris.fallingShape.xyPts[4] = x-1;
            myTetris.fallingShape.xyPts[5] = 18;
            myTetris.fallingShape.xyPts[6] = x-1;
            myTetris.fallingShape.xyPts[7] = 19;
        }

        Jpositions = [ 
            X_MIN + col + 0, Y_MAX,
            X_MIN + col - 2, Y_MAX,
            X_MIN + col + 0, Y_MAX*0.9,
            X_MIN + col - 2, Y_MAX*0.9,
            X_MIN + col + 0, Y_MAX*0.9,
            X_MIN + col - 2, Y_MAX*0.9,
            X_MIN + col + 0, Y_MAX*0.8,
            X_MIN + col - 2, Y_MAX*0.8,
            X_MIN + col + 2, Y_MAX*0.9,
            X_MIN + col + 4, Y_MAX*0.9,
            X_MIN + col + 2, Y_MAX*0.8,
            X_MIN + col + 4, Y_MAX*0.8,
            X_MIN + col + 0, Y_MAX*0.9,
            X_MIN + col + 2, Y_MAX*0.9,
            X_MIN + col + 0, Y_MAX*0.8,
            X_MIN + col + 2, Y_MAX*0.8
        ];
    }
    positions = Jpositions.concat(positions);

    // Define its colors
    Lcolors = [];
    for(var i = 0; i <= 15; i++){
        Lcolors = Lcolors.concat([0.75, 0.0, 0.25, 1]);
    }

    colors = Lcolors.concat(colors);

    myTetris.fallingShape.name = "J";
    myTetris.fallingShape.orientation = pieceOrientation;

    return SHAPE_CREATED;
}

var paused = false;
class tetris {

    constructor(){
        // Make the board and generate first piece
        main();
        var i;
        this.fallingShape = {
            name : "",
            orientation : 0,
            xyPts : [-1, -1, -1, -1, -1, -1, -1,-1],
            stopFalling : true
        };
        this.board = [];
        this.gameOn = true;

        // Create 10 by 20 matrix to store where tiles are
        for (i = 1; i <= 10; i++){
            var boardCol = [false,false,false,false,false,false,false,false,false,false,
                false,false,false,false,false,false,false,false,false,false];
            this.board.push(boardCol);
        }
    }

    playGame(){        
        // Runs through the sequence of playing a game of tetris

        //for(var i = 0; i < 10; i++){
            if( !paused ){
                if( !gameOver){
                    if (this.fallingShape.stopFalling){
                        clearInterval(playingSpeed)
                        // Now check for lines to clear
                        var filledLines = this.checkFilledLines();
                        // Start at top of board, move down clearing full lines and moving the rest of the board down
                        for( var i = filledLines.length-1; i >= 0; i--){
                            if( filledLines[i] ){
                                this.clearLine(i)
                                score++;
                                document.getElementById("scoreValue").innerHTML = score;
                            }
                        }
                        
                        // Restart dropping on a new shape
                        generateShape();
                        this.fallingShape.stopFalling = false;
                        playingSpeed = setInterval(intervalDrop, speed);
                    }
                } else{
                    clearInterval(playingSpeed)
                    document.getElementById("gameOver").innerHTML = "Game Over. Thanks for playing";
                }
            }

        return;
    }

    checkBelowShapeEmpty(){
        // Checks that the squares below the shape are empty
        var columnsSeen = [];
        var yValsInCols = [];

        // Use an array to keep track of which columns the shape is in and what height it is at
        for( var i = 0; i < 10; i++){
            columnsSeen.push(false);
            yValsInCols.push(-1);
        }
        
        // Check every x column in the shape and see if it is the lowest y value.
        for( var index = 0; index < this.fallingShape.xyPts.length; index+=2){
            var xCol = this.fallingShape.xyPts[index];
            var yVal = this.fallingShape.xyPts[index+1];

            // If we have seen this column
            if( columnsSeen[xCol] ){

                // Check if it is the lowest y value we have seen so far
                if( yVal <= yValsInCols[xCol] ){

                    // Keep track of the lowest y value we have seen so far.
                    yValsInCols[xCol] = yVal;
                }
            } else{
                // If we have not seen this column, track the height of the shape
                columnsSeen[xCol] = true;
                yValsInCols[xCol] = yVal;
            }
        }

        // Now we know what columns and heights need to be checked for emptiness
        for( var col = 0; col < columnsSeen.length; col++){
            // For every column the shape occupies
            if(columnsSeen[col]){
                // Check the square below it
                if(!this.checkSquareEmpty(col, yValsInCols[col]-1))
                {
                    // Square is not empty. Stop the shape from falling!
                    this.fallingShape.stopFalling = true;
                    return false;
                }
            }            
        }

        // All columns checked, the shape can be dropped
        return true;
    }

    moveShapeRight(){
        // Check to the right of shape is empty and in bounds
        if( this.checkRightEmpty() ){
            // Make empty the previously occupied squares
            for(var index = 0; index < myTetris.fallingShape.xyPts.length; index+= 2){
                var x = this.fallingShape.xyPts[index];
                var y = this.fallingShape.xyPts[index+1];
                this.board[x][y] = false
            }

            // Move the shape right 1 square
            for( var index = 0; index < this.fallingShape.xyPts.length; index+=2){
                this.fallingShape.xyPts[index] += 1;
            }

            // Make full the newly occupated sqaures
            for(var index = 0; index < this.fallingShape.xyPts.length; index+= 2){
                var x = this.fallingShape.xyPts[index];
                var y = this.fallingShape.xyPts[index+1];
                this.board[x][y] = true
            }

            // Call to redraw positions on screen
            moveShapeRight();
        }
    }

    moveShapeLeft(){
        // Check to the left of shape is empty and in bounds
        if( this.checkLeftEmpty() ){
            // Make empty the previously occupied squares
            for(var index = 0; index < myTetris.fallingShape.xyPts.length; index+= 2){
                var x = this.fallingShape.xyPts[index];
                var y = this.fallingShape.xyPts[index+1];
                this.board[x][y] = false
            }

            // Move the shape left 1 square
            for( var index = 0; index < this.fallingShape.xyPts.length; index+=2){
                this.fallingShape.xyPts[index] -= 1;
            }

            // Make full the newly occupated sqaures
            for(var index = 0; index < this.fallingShape.xyPts.length; index+= 2){
                var x = this.fallingShape.xyPts[index];
                var y = this.fallingShape.xyPts[index+1];
                this.board[x][y] = true
            }

            // Call to redraw positions on screen
            moveShapeLeft();
        }
    }

    checkRightEmpty(){
        // Checks if to the right of the shape is empty
        var rowsSeen = [];
        var xValInRow = [];

        // Keep track of where the right most edge of the shape is
        for(var i = 0; i < 20; i++){
            rowsSeen.push(false);
            xValInRow.push(false);
        }

        // Find which rows the shape occupies and find the right most edge
        for(var index = 0; index < this.fallingShape.xyPts.length; index+=2){
            var xVal = this.fallingShape.xyPts[index];
            var yVal = this.fallingShape.xyPts[index+1];

            if( rowsSeen[yVal] ){
                if( xVal >= xValInRow[yVal] ){
                    xValInRow[yVal] = xVal;
                }
            } else{
                rowsSeen[yVal] = true;
                xValInRow[yVal] = xVal;
            }
        }

        // Now check the squares next to the shape are empty
        for (var row = 0; row < rowsSeen.length; row++){
            if( rowsSeen[row] ){
                if(!this.checkSquareEmpty(xValInRow[row]+1, row)){
                    return false;
                }
            }
        }
        return true;
    }

    checkLeftEmpty(){
        // Checks if to the left of the shape is empty
        var rowsSeen = [];
        var xValInRow = [];

        // Keep track of where the left most edge of the shape is
        for(var i = 0; i < 20; i++){
            rowsSeen.push(false);
            xValInRow.push(false);
        }

        // Find which rows the shape occupies and find the left most edge
        for(var index = 0; index < this.fallingShape.xyPts.length; index+=2){
            var xVal = this.fallingShape.xyPts[index];
            var yVal = this.fallingShape.xyPts[index+1];

            if( rowsSeen[yVal] ){
                if( xVal <= xValInRow[yVal] ){
                    xValInRow[yVal] = xVal;
                }
            } else{
                rowsSeen[yVal] = true;
                xValInRow[yVal] = xVal;
            }
        }

        // Now check the squares next to the shape are empty
        for (var row = 0; row < rowsSeen.length; row++){
            if( rowsSeen[row] ){
                if(!this.checkSquareEmpty(xValInRow[row]-1, row)){
                    return false;
                }
            }
        }
        return true;
    }

    checkFilledLines(){
        // For every line, check if the line is all trues
        var filledLines = [];
        for( var i= 0; i < 20; i++){
            filledLines.push(true);
        }

        // Starting at the bottom of the screen move up the board checking the lines
        for( var y = 0; y < 20; y++){

            // Move accross the line checking each square
            for( var x = 0; x < 10; x++){
                if( this.checkSquareEmpty(x, y) ){
                    // When a square is empty, this line is not filled
                    filledLines[y] = false;
                    break;
                }
            }
        }

        return filledLines;
    }

    clearLine(y) {
        // Clear the line of trues at height y
        // First clear clear trues of line off board
        for( var x = 0; x < 10; x++ ){
            this.board[x][y] =  false;
            //find in buffer square with these four verticies
        }

        // Initialize the heights of the yvalues of the squares in this row
        var y1 = -50;
        var y2 = -50;

        // Ensure both top and bottom y value of line to be cleared are known
        var squareVerticies = convertXYtoCanvas(x, y);
        if( squareVerticies[1] == squareVerticies[3]){
            y1 = squareVerticies[1];
            y2 = squareVerticies[5];
        } else {
            y1 = squareVerticies[1];
            y2 = squareVerticies[3];
        }

        var indiciesToRemove = [];
        // For every shape in positions buffer
        for(var i = 0; i <= positions.length-63; i+=8){
            var isInThisLine = true;

            // Iterate through all verticies of this shape
            for( var ii = 1; ii <= 7; ii+=2){

                // Compare the y value of this vertex to the line y value to be cleared
                var yVal = positions[i+ii];

                if( !(yVal == y1 || yVal == y2) ){
                    // The y value of this square is not in this line to be cleared. Skip this square
                    isInThisLine = false;
                    break; 
                }
            }

            if( isInThisLine ){
                // Store the index of this square to remove shortly
                indiciesToRemove.push(i);
            }
        }

        // Now remove the 8 position values for each square and its corresponding 16 colour values
        // Sort the array from highest to lowest. Important to ensure indicies are removed highest to lowest
        indiciesToRemove.sort(function(a, b){return b - a});
        var coloursToRemove = [];

        for( var i = 0; i < indiciesToRemove.length; i++){
            coloursToRemove.push(indiciesToRemove[i] * 2);
        }

        for(var i = 0; i < indiciesToRemove.length; i++ ){
            // Splice the positions array to remove verticies
            var index = indiciesToRemove[i];

            var beforeSquare = positions.slice(0, index);
            var afterSquare = positions.slice(index+8);

            positions = beforeSquare.concat(afterSquare);

            numShapeVerticies-=4;

            // Get index to remove the colour
            var colourIndex = coloursToRemove[i];
            var beforeColours = colors.slice(0,colourIndex);
            var afterColours = colors.slice(colourIndex + 16);

            colors = beforeColours.concat(afterColours);
        }

        // Now move all other shape positions down
        if( y1 > y2){
            this.moveAboveDown(y1, y);
        } else {
            this.moveAboveDown(y2, y);
        }
    }

    moveAboveDown(topClearedLine, yOfClearedLine){
        // Moves any pieces above a row down one row
        for( var i = 1; i < positions.length-122; i+=2){
            if(positions[i] >= topClearedLine ){
                positions[i] -= (Y_MAX-Y_MIN)*0.05;
            }
        }

        // Update the board as well
        for( var y = yOfClearedLine; y < 19; y++){
            for(var x = 0; x < 10; x++){
                // For every line, take the value of the line above
                this.board[x][y] = this.board[x][y+1];
            }
        }

        // Set the top row of the board to false
        for( var x = 0; x < 10; x++){
            this.board[x][19] = false;
        }
    }

    checkSquareEmpty(x, y){
        // Checks if the square is empty and on the board

        if( y <= -1 || y >= 20){
            // Off the board
            return false;
        } else if( x > 9 || x < 0){
            return false;
        } else {
            return !this.board[x][y];
        }
    }

    updateShapePosition(newXYPts){
        // Takes the current falling shapes position, sets it to false
        // Then adds the new coordingates to the current falling shape
        // Then tells the screen to redraw the shape

        
        for(var i = 0; i < this.fallingShape.xyPts.length; i+=2){
            var x = this.fallingShape.xyPts[i];
            var y = this.fallingShape.xyPts[i+1];
            this.board[x][y] = false;
        }

        // Move the shape to the new squares
        this.fallingShape.xyPts = newXYPts;

        // Update the board with the new position of the shape
        for(var i = 0; i < this.fallingShape.xyPts.length; i+=2){
            var x = this.fallingShape.xyPts[i];
            var y = this.fallingShape.xyPts[i+1];
            this.board[x][y] = true;
        }

        // Draw the new shape
        repositionShape(this.fallingShape.xyPts);
    }

    rotateShapeCCW(){
        // Rotates the current falling shape CCW

        switch(this.fallingShape.name){
            case "O":
                break;
            case "I":
                var canRotate = true;

                if(this.fallingShape.orientation == 1){ // North South orientation
                    var pivotXIndex = 4;
                    var pivotX = this.fallingShape.xyPts[pivotXIndex];
                    var pivotY = this.fallingShape.xyPts[pivotXIndex+1];

                    // Calculate the squares to rotate to
                    var newXYPts = [];
                    for( var i = -2; i <= 1; i++){
                        newXYPts.push(pivotX+i);
                        newXYPts.push(pivotY);
                    }

                    // Check those squares are empty
                    for( var i = 0; i < newXYPts.length; i+=2 ){
                        // Check all the squares are empty except the pivot square
                        if( i == 4){
                            continue;
                        } else if(!this.checkSquareEmpty(newXYPts[i], newXYPts[i+1])){
                            canRotate = false;
                        }
                    }
                    
                    if(!canRotate){
                        break;
                    }

                    this.updateShapePosition(newXYPts);

                    // Switch shape orientation
                    this.fallingShape.orientation = 0;
                } else { 
                    var pivotXIndex = 4;
                    var pivotX = this.fallingShape.xyPts[pivotXIndex];
                    var pivotY = this.fallingShape.xyPts[pivotXIndex+1];

                    // Calculate the squares to rotate to
                    var newXYPts = [];
                    for( var i = -2; i <= 1; i++){
                        newXYPts.push(pivotX);
                        newXYPts.push(pivotY+i);
                    }

                    // Check those squares are empty
                    for( var i = 0; i < newXYPts.length; i+=2 ){
                        // Check all the squares are empty except the pivot square
                        if( i == 4){
                            continue;
                        } else if(!this.checkSquareEmpty(newXYPts[i], newXYPts[i+1])){
                            canRotate = false;
                        }
                    }
                    
                    if(!canRotate){
                        break;
                    }

                    // Shape is ready to be rotated
                    this.updateShapePosition(newXYPts);

                    // Switch shape orientation
                    this.fallingShape.orientation = 1;
                }
                break;
            case "S":
                var canRotate = true;

                if(this.fallingShape.orientation){ // N-S orientation
                    // Determine what is the pivot point
                    var pivotIndex = 2;
                    pivotX = this.fallingShape.xyPts[pivotIndex];
                    pivotY = this.fallingShape.xyPts[pivotIndex+1];

                    // Create new points for shape to go to
                    var newXYPts = [];
                    newXYPts.push(pivotX);
                    newXYPts.push(pivotY);
                    newXYPts.push(pivotX+1);
                    newXYPts.push(pivotY);
                    newXYPts.push(pivotX);
                    newXYPts.push(pivotY-1);
                    newXYPts.push(pivotX-1);
                    newXYPts.push(pivotY-1);

                    // Check squares not occupied by current shape are empty
                    for(var i = 4; i < newXYPts.length; i+=2){
                        if( !this.checkSquareEmpty(newXYPts[i], newXYPts[i+1]) ){
                            canRotate = false;
                        }
                    }

                    // Exit if it cannot rotate
                    if(!canRotate){
                        break;
                    }

                    // Redraw shape if it can
                    this.updateShapePosition(newXYPts);

                    // Keep track of pieces orientation
                    this.fallingShape.orientation = 0;

                } else {
                    // Determine what is the pivot point
                    var pivotIndex = 0;
                    pivotX = this.fallingShape.xyPts[pivotIndex];
                    pivotY = this.fallingShape.xyPts[pivotIndex+1];

                    // Create new points for shape to go to
                    var newXYPts = [];
                    newXYPts.push(pivotX);
                    newXYPts.push(pivotY+1);
                    newXYPts.push(pivotX);
                    newXYPts.push(pivotY);
                    newXYPts.push(pivotX+1);
                    newXYPts.push(pivotY);
                    newXYPts.push(pivotX+1);
                    newXYPts.push(pivotY-1);

                    // Check squares not occupied by current shape are empty
                    for(var i = 0; i < newXYPts.length; i+=6){
                        if( !this.checkSquareEmpty(newXYPts[i], newXYPts[i+1]) ){
                            canRotate = false;
                        }
                    }

                    // Exit if it cannot rotate
                    if(!canRotate){
                        break;
                    }

                    // Redraw shape if it can
                    this.updateShapePosition(newXYPts);

                    // Keep track of pieces orientation
                    this.fallingShape.orientation = 1;
                }
                break;
            case "Z":
                var canRotate = true;

                if(this.fallingShape.orientation){ // N-S orientation
                    // Determine what is the pivot point
                    var pivotIndex = 4;
                    pivotX = this.fallingShape.xyPts[pivotIndex];
                    pivotY = this.fallingShape.xyPts[pivotIndex+1];

                    // Create new points for shape to go to
                    var newXYPts = [];
                    newXYPts.push(pivotX-1);
                    newXYPts.push(pivotY);

                    newXYPts.push(pivotX);
                    newXYPts.push(pivotY);

                    newXYPts.push(pivotX);
                    newXYPts.push(pivotY-1);

                    newXYPts.push(pivotX+1);
                    newXYPts.push(pivotY-1);

                    // Check squares not occupied by current shape are empty
                    for(var i = 0; i < newXYPts.length; i+=6){
                        if( !this.checkSquareEmpty(newXYPts[i], newXYPts[i+1]) ){
                            canRotate = false;
                        }
                    }

                    // Exit if it cannot rotate
                    if(!canRotate){
                        break;
                    }

                    // Redraw shape if it can
                    this.updateShapePosition(newXYPts);

                    // Keep track of pieces orientation
                    this.fallingShape.orientation = 0;

                } else {
                    // Determine what is the pivot point of E-W orientation
                    var pivotIndex = 2;
                    pivotX = this.fallingShape.xyPts[pivotIndex];
                    pivotY = this.fallingShape.xyPts[pivotIndex+1];

                    // Create new points for shape to go to
                    var newXYPts = [];
                    newXYPts.push(pivotX+1);
                    newXYPts.push(pivotY+1);

                    newXYPts.push(pivotX+1);
                    newXYPts.push(pivotY);

                    newXYPts.push(pivotX);
                    newXYPts.push(pivotY);

                    newXYPts.push(pivotX);
                    newXYPts.push(pivotY-1);

                    // Check squares not occupied by current shape are empty
                    for(var i = 0; i < newXYPts.length-4; i+=2){
                        if( !this.checkSquareEmpty(newXYPts[i], newXYPts[i+1]) ){
                            canRotate = false;
                        }
                    }

                    // Exit if it cannot rotate
                    if(!canRotate){
                        break;
                    }

                    // Redraw shape if it can
                    this.updateShapePosition(newXYPts);

                    // Keep track of pieces orientation
                    this.fallingShape.orientation = 1;
                }
                break;
            case "L":
                var canRotate = true;

                if(this.fallingShape.orientation == 0){ // N-S orientation
                    // Determine what is the pivot point
                    var pivotIndex = 0;
                    pivotX = this.fallingShape.xyPts[pivotIndex];
                    pivotY = this.fallingShape.xyPts[pivotIndex+1];

                    // Create new points for shape to go to
                    var newXYPts = [];
                    newXYPts.push(pivotX);
                    newXYPts.push(pivotY+1);

                    newXYPts.push(pivotX);
                    newXYPts.push(pivotY);

                    newXYPts.push(pivotX);
                    newXYPts.push(pivotY-1);

                    newXYPts.push(pivotX+1);
                    newXYPts.push(pivotY-1);

                    // Check squares not occupied by current shape are empty
                    for(var i = 0; i < newXYPts.length; i+=2){
                        if ( newXYPts[i] == pivotX ){
                            continue;
                        } else if ( !this.checkSquareEmpty(newXYPts[i], newXYPts[i+1]) ){
                            canRotate = false;
                        }
                    }

                    // Exit if it cannot rotate
                    if(!canRotate){
                        break;
                    }

                    // Redraw shape if it can
                    this.updateShapePosition(newXYPts);

                    // Keep track of pieces orientation
                    this.fallingShape.orientation = 1;

                } else if(this.fallingShape.orientation == 1){
                    // Determine what is the pivot point of E-W orientation
                    var pivotIndex = 2;
                    pivotX = this.fallingShape.xyPts[pivotIndex];
                    pivotY = this.fallingShape.xyPts[pivotIndex+1];

                    // Create new points for shape to go to
                    var newXYPts = [];

                    newXYPts.push(pivotX);
                    newXYPts.push(pivotY);

                    newXYPts.push(pivotX+1);
                    newXYPts.push(pivotY);

                    newXYPts.push(pivotX-1);
                    newXYPts.push(pivotY);

                    newXYPts.push(pivotX+1);
                    newXYPts.push(pivotY+1);

                    // Check squares not occupied by current shape are empty
                    for(var i = 2; i < newXYPts.length; i+=2){
                        if( !this.checkSquareEmpty(newXYPts[i], newXYPts[i+1]) ){
                            canRotate = false;
                        }
                    }

                    // Exit if it cannot rotate
                    if(!canRotate){
                        break;
                    }

                    // Redraw shape if it can
                    this.updateShapePosition(newXYPts);

                    // Keep track of pieces orientation
                    this.fallingShape.orientation = 3;
                } else if(this.fallingShape.orientation == 2){
                    // Determine what is the pivot point of E-W orientation
                    var pivotIndex = 2;
                    pivotX = this.fallingShape.xyPts[pivotIndex];
                    pivotY = this.fallingShape.xyPts[pivotIndex+1];

                    // Create new points for shape to go to
                    var newXYPts = [];
                    newXYPts.push(pivotX);
                    newXYPts.push(pivotY);

                    newXYPts.push(pivotX+1);
                    newXYPts.push(pivotY);

                    newXYPts.push(pivotX-1);
                    newXYPts.push(pivotY);

                    newXYPts.push(pivotX-1);
                    newXYPts.push(pivotY-1);

                    // Check squares not occupied by current shape are empty
                    for(var i = 2; i < newXYPts.length; i+=2){
                        if( !this.checkSquareEmpty(newXYPts[i], newXYPts[i+1]) ){
                            canRotate = false;
                        }
                    }

                    // Exit if it cannot rotate
                    if(!canRotate){
                        break;
                    }

                    // Redraw shape if it can
                    this.updateShapePosition(newXYPts);

                    // Keep track of pieces orientation
                    this.fallingShape.orientation = 0;
                } else {
                    // Determine what is the pivot point of E-W orientation
                    var pivotIndex = 0;
                    pivotX = this.fallingShape.xyPts[pivotIndex];
                    pivotY = this.fallingShape.xyPts[pivotIndex+1];

                    // Create new points for shape to go to
                    var newXYPts = [];
                    newXYPts.push(pivotX);
                    newXYPts.push(pivotY+1);

                    newXYPts.push(pivotX);
                    newXYPts.push(pivotY);

                    newXYPts.push(pivotX);
                    newXYPts.push(pivotY-1);

                    newXYPts.push(pivotX-1);
                    newXYPts.push(pivotY+1);

                    // Check squares not occupied by current shape are empty
                    for(var i = 0; i < newXYPts.length; i+=2){
                        if ( newXYPts[i] == pivotX ){
                            continue;
                        }
                        if( !this.checkSquareEmpty(newXYPts[i], newXYPts[i+1]) ){
                            canRotate = false;
                        }
                    }

                    // Exit if it cannot rotate
                    if(!canRotate){
                        break;
                    }

                    // Redraw shape if it can
                    this.updateShapePosition(newXYPts);

                    // Keep track of pieces orientation
                    this.fallingShape.orientation = 2;
                }
                break;
            case "J":
                var canRotate = true;

                if(this.fallingShape.orientation == 0){
                    // Determine what is the pivot point
                    var pivotIndex = 0;
                    pivotX = this.fallingShape.xyPts[pivotIndex];
                    pivotY = this.fallingShape.xyPts[pivotIndex+1];

                    // Create new points for shape to go to
                    var newXYPts = [];
                    newXYPts.push(pivotX);
                    newXYPts.push(pivotY+1);

                    newXYPts.push(pivotX);
                    newXYPts.push(pivotY);

                    newXYPts.push(pivotX);
                    newXYPts.push(pivotY-1);

                    newXYPts.push(pivotX+1);
                    newXYPts.push(pivotY+1);

                    // Check squares not occupied by current shape are empty
                    for(var i = 0; i < newXYPts.length; i+=2){
                        if ( newXYPts[i] == pivotX ){
                            continue;
                        } else if ( !this.checkSquareEmpty(newXYPts[i], newXYPts[i+1]) ){
                            canRotate = false;
                        }
                    }

                    // Exit if it cannot rotate
                    if(!canRotate){
                        break;
                    }

                    // Redraw shape if it can
                    this.updateShapePosition(newXYPts);

                    // Keep track of pieces orientation
                    this.fallingShape.orientation = 1;

                } else if(this.fallingShape.orientation == 1){
                    // Determine what is the pivot point of E-W orientation
                    var pivotIndex = 2;
                    pivotX = this.fallingShape.xyPts[pivotIndex];
                    pivotY = this.fallingShape.xyPts[pivotIndex+1];

                    // Create new points for shape to go to
                    var newXYPts = [];

                    newXYPts.push(pivotX);
                    newXYPts.push(pivotY);

                    newXYPts.push(pivotX+1);
                    newXYPts.push(pivotY);

                    newXYPts.push(pivotX-1);
                    newXYPts.push(pivotY);

                    newXYPts.push(pivotX-1);
                    newXYPts.push(pivotY+1);

                    // Check squares not occupied by current shape are empty
                    for(var i = 2; i < newXYPts.length; i+=2){
                        if( !this.checkSquareEmpty(newXYPts[i], newXYPts[i+1]) ){
                            canRotate = false;
                        }
                    }

                    // Exit if it cannot rotate
                    if(!canRotate){
                        break;
                    }

                    // Redraw shape if it can
                    this.updateShapePosition(newXYPts);

                    // Keep track of pieces orientation
                    this.fallingShape.orientation = 3;
                } else if(this.fallingShape.orientation == 2){
                    // Determine what is the pivot point of E-W orientation
                    var pivotIndex = 2;
                    pivotX = this.fallingShape.xyPts[pivotIndex];
                    pivotY = this.fallingShape.xyPts[pivotIndex+1];

                    // Create new points for shape to go to
                    var newXYPts = [];
                    newXYPts.push(pivotX);
                    newXYPts.push(pivotY);

                    newXYPts.push(pivotX+1);
                    newXYPts.push(pivotY);

                    newXYPts.push(pivotX-1);
                    newXYPts.push(pivotY);

                    newXYPts.push(pivotX+1);
                    newXYPts.push(pivotY-1);

                    // Check squares not occupied by current shape are empty
                    for(var i = 2; i < newXYPts.length; i+=2){
                        if( !this.checkSquareEmpty(newXYPts[i], newXYPts[i+1]) ){
                            canRotate = false;
                        }
                    }

                    // Exit if it cannot rotate
                    if(!canRotate){
                        break;
                    }

                    // Redraw shape if it can
                    this.updateShapePosition(newXYPts);

                    // Keep track of pieces orientation
                    this.fallingShape.orientation = 0;
                } else {
                    // Determine what is the pivot point of E-W orientation
                    var pivotIndex = 0;
                    pivotX = this.fallingShape.xyPts[pivotIndex];
                    pivotY = this.fallingShape.xyPts[pivotIndex+1];

                    // Create new points for shape to go to
                    var newXYPts = [];
                    newXYPts.push(pivotX);
                    newXYPts.push(pivotY+1);

                    newXYPts.push(pivotX);
                    newXYPts.push(pivotY);

                    newXYPts.push(pivotX);
                    newXYPts.push(pivotY-1);

                    newXYPts.push(pivotX-1);
                    newXYPts.push(pivotY-1);

                    // Check squares not occupied by current shape are empty
                    for(var i = 0; i < newXYPts.length; i+=2){
                        if ( newXYPts[i] == pivotX ){
                            continue;
                        }
                        if( !this.checkSquareEmpty(newXYPts[i], newXYPts[i+1]) ){
                            canRotate = false;
                        }
                    }

                    // Exit if it cannot rotate
                    if(!canRotate){
                        break;
                    }

                    // Redraw shape if it can
                    this.updateShapePosition(newXYPts);

                    // Keep track of pieces orientation
                    this.fallingShape.orientation = 2;
                }
                break;
            case "T":
                var canRotate = true;

                if(this.fallingShape.orientation == 0){
                    // Determine what is the pivot point
                    var pivotIndex = 0;
                    pivotX = this.fallingShape.xyPts[pivotIndex];
                    pivotY = this.fallingShape.xyPts[pivotIndex+1];

                    // Create new points for shape to go to
                    var newXYPts = [];
                    newXYPts.push(pivotX);
                    newXYPts.push(pivotY+1);

                    newXYPts.push(pivotX);
                    newXYPts.push(pivotY);

                    newXYPts.push(pivotX);
                    newXYPts.push(pivotY-1);

                    newXYPts.push(pivotX+1);
                    newXYPts.push(pivotY);

                    // Because of the T shape, only need to check one position to be empty
                    if ( !this.checkSquareEmpty(newXYPts[0], newXYPts[1]) ){
                        canRotate = false;
                        //.log("I am breaking out of rotate shape")
                        break;
                    }

                    // Redraw shape if it can
                    this.updateShapePosition(newXYPts);

                    // Keep track of pieces orientation
                    this.fallingShape.orientation = 1;

                } else if(this.fallingShape.orientation == 1){
                    // Determine what is the pivot point of E-W orientation
                    var pivotIndex = 2;
                    pivotX = this.fallingShape.xyPts[pivotIndex];
                    pivotY = this.fallingShape.xyPts[pivotIndex+1];

                    // Create new points for shape to go to
                    var newXYPts = [];

                    newXYPts.push(pivotX+1);
                    newXYPts.push(pivotY);

                    newXYPts.push(pivotX);
                    newXYPts.push(pivotY);

                    newXYPts.push(pivotX-1);
                    newXYPts.push(pivotY);

                    newXYPts.push(pivotX);
                    newXYPts.push(pivotY+1);

                    // Because of the T shape, only need to check one position to be empty
                    if( !this.checkSquareEmpty(newXYPts[4], newXYPts[5]) ){
                        canRotate = false;
                        break;
                    }

                    // Redraw shape if it can
                    this.updateShapePosition(newXYPts);

                    // Keep track of pieces orientation
                    this.fallingShape.orientation = 3;
                } else if(this.fallingShape.orientation == 2){
                    // Determine what is the pivot point of E-W orientation
                    var pivotIndex = 2;
                    pivotX = this.fallingShape.xyPts[pivotIndex];
                    pivotY = this.fallingShape.xyPts[pivotIndex+1];

                    // Create new points for shape to go to
                    var newXYPts = [];
                    newXYPts.push(pivotX);
                    newXYPts.push(pivotY);

                    newXYPts.push(pivotX+1);
                    newXYPts.push(pivotY);

                    newXYPts.push(pivotX-1);
                    newXYPts.push(pivotY);

                    newXYPts.push(pivotX);
                    newXYPts.push(pivotY-1);

                    // Because of the T shape, only need to check one position to be empty
                    if( !this.checkSquareEmpty(newXYPts[2], newXYPts[3]) ){
                        canRotate = false;
                        break;
                    }

                    // Redraw shape if it can
                    this.updateShapePosition(newXYPts);

                    // Keep track of pieces orientation
                    this.fallingShape.orientation = 0;
                } else {
                    // Determine what is the pivot point
                    var pivotIndex = 2;
                    pivotX = this.fallingShape.xyPts[pivotIndex];
                    pivotY = this.fallingShape.xyPts[pivotIndex+1];

                    // Create new points for shape to go to
                    var newXYPts = [];
                    newXYPts.push(pivotX);
                    newXYPts.push(pivotY+1);

                    newXYPts.push(pivotX);
                    newXYPts.push(pivotY);

                    newXYPts.push(pivotX);
                    newXYPts.push(pivotY-1);

                    newXYPts.push(pivotX-1);
                    newXYPts.push(pivotY);

                    if( !this.checkSquareEmpty(newXYPts[4], newXYPts[5]) ){
                        canRotate = false;
                        break;
                    }

                    // Redraw shape if it can
                    this.updateShapePosition(newXYPts);

                    // Keep track of pieces orientation
                    this.fallingShape.orientation = 2;
                }
                break;
            default: // Should never be here
                break;
        }
    }
}

function generateShape(){
    // Pick a shape to generate next and put on the screen
    shapeNotGenerated = true;
    loopCounter = 0;

    while(shapeNotGenerated){
        shapeNum = Math.floor((Math.random() * 7) + 1)

        switch(shapeNum){
            case 1:
                // Generate O shape
                retVal = newO();
                break;
            case 2:
                // Generate I shape
                retVal = newI();
                break; 
            case 3:
                // Generate S shape
                retVal = newS();
                break;
            case 4:
                // Generate Z shape
                retVal = newZ();
                break;
            case 5:
                // Generate L shape
                retVal = newL();
                break;
            case 6:
                // Generate J shape
                retVal = newJ();
                break;
            default:
                // Generate T shape if not one of the others
                retVal = newT();
                break;
        }

        // If the shape was not created we have to try again
        if(retVal == SHAPE_CREATED){
            shapeNotGenerated = false;
            numShapeVerticies+=16;
            main();
        } else {
            loopCounter++;
        }

        // Tries 10 times to make a shape that will fit in the screen, otherwise it will quit the game
        if(loopCounter > 10){
            gameOver = true;
            break;
        }
    }
}

//
// Drops the shape at regular intervals until it cannot anymore
//
function intervalDrop(){
    // Drops a shape at an interval specified below until it cannot be dropped further
    if(myTetris.fallingShape.stopFalling){
        myTetris.playGame();
    }

    if( myTetris.checkBelowShapeEmpty() ){

        // Make empty the previously occupied squares
        for(var index = 0; index < myTetris.fallingShape.xyPts.length; index+= 2){
            var x = myTetris.fallingShape.xyPts[index];
            var y = myTetris.fallingShape.xyPts[index+1];
            myTetris.board[x][y] = false
        }

        // Move shape down 1 square
        for( var index = 1; index < myTetris.fallingShape.xyPts.length; index+=2){
            myTetris.fallingShape.xyPts[index] -= 1;
        }
        
        // Make full the newly occupated sqaures
        for(var index = 0; index < myTetris.fallingShape.xyPts.length; index+= 2){
            var x = myTetris.fallingShape.xyPts[index];
            var y = myTetris.fallingShape.xyPts[index+1];
            myTetris.board[x][y] = true
        }

        // Visually move the shape down one level
        moveShapeDown();

        if(paused){
            // wait until unpaused
            clearInterval(playingSpeed)
        }
    }
}
var speed = 1024
playingSpeed = setInterval(intervalDrop, speed);

//
// Increase the rate at which shapes drop
//
function increaseSpeed(){
    clearInterval(playingSpeed)
    speed = speed / 2;
    playingSpeed = setInterval(intervalDrop, speed)
}

//
// Decrease the speed at which shapes drop
//
function decreaseSpeed(){
    clearInterval(playingSpeed)
    speed = speed * 2;
    if( speed > 100000){
        speed = 100000
    }
    playingSpeed = setInterval(intervalDrop, speed)
}

// Keep track of score
score = 0
document.getElementById("scoreValue").innerHTML = score;

// Keep track of when the game is over
var gameOver = false;

// Keep track of the number of shape verticies
numShapeVerticies = 0;

// Start the game
keyEventListener();
let myTetris = new tetris();
myTetris.playGame()
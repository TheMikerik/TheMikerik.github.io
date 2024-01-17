var grid = new Array(rows);

var start;
var end;
var drawingObstacle = false;
var running = false;
var queue = [];
var current = undefined;
var created = false;

function setup() {
    var canvas = createCanvas(cols * tile + 1, rows * tile + 1);

    frameRate(150);

    for (var i = 0; i < rows; i++) {
        grid[i] = new Array(cols);
    }

    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            grid[i][j] = new Spot(i, j);
        }
    }

    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            grid[i][j].addNeighbor(grid);
        }
    }

    start = grid[0][0];

    end = grid[rows - 1][cols - 1];
    end.color = [255, 0, 0]
    end.show()
    

    canvas.parent('canvas-container');

    if (!created) {
        createButtons();
        created = true;
    }

    console.log(grid);
}


function printGrid(){
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            grid[i][j].show();
        }
    }
}
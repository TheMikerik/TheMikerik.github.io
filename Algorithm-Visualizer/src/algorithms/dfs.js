var rows = 30;
var cols = 60;
var g_size = 25;

var grid = new Array(rows);

var start;
var end;
var drawingObstacle = false;
var running = false;
var queue = []

function setup() {
    // Create the canvas within the canvas-container div
    var canvas = createCanvas(cols * g_size + 1, rows * g_size + 1);

    // frameRate(40);

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

    canvas.parent('canvas-container');

    startBtn = createButton('Start');
    startBtn.size(100, 50)
    startBtn.mousePressed(startAlgorithm);
    startBtn.parent('buttons-container');

    stopBtn = createButton('Stop');
    stopBtn.size(100, 50)
    stopBtn.mousePressed(stopAlgorithm);
    stopBtn.parent('buttons-container');

    undoBtn = createButton('Undo');
    undoBtn.size(100, 50)
    undoBtn.mousePressed(() => clearObstacles(grid, rows, cols));
    undoBtn.parent('buttons-container');

    rstrtBtn = createButton('Restart');
    rstrtBtn.size(100, 50)
    rstrtBtn.mousePressed(() => clearGrid());
    rstrtBtn.parent('buttons-container');

    console.log(grid);
}


function printGrid(){
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            grid[i][j].show();
        }
    }
}

function savePath(){
    path = [];
    var temp = current;
    path.push(temp);
    while (temp.previous !== undefined) {
        path.push(temp.previous);
        temp = temp.previous;
    }
}


function draw() {
    if (drawingObstacle) {
        return;
    }

    if (queue.length !== 0) {
        var current = queue.pop();   // shift for bfs
        current.status = Status.VISITED;
        current.color = Colors.CHECKED;

        if (current === end) {
            noLoop();
            console.log("Done");
        }

        for(i=0; i<current.neighbors.length; i++) {
            var neighbor = current.neighbors[i];
            if(neighbor.status === Status.UNVISITED){
                queue.push(neighbor);
                neighbor.status = Status.PROCESSING;
                neighbor.color = Colors.INQUEUE;
            }
        }
    }

    background(0);

    printGrid();

    //save path
}
var rows = 15;
var cols = 30;
var g_size = 50;

var grid = new Array(rows);

var blocks = []
var start;
var end;
var drawingObstacle = false;
var running = false;
var queue = []

function setup() {
    createCanvas(cols * g_size + 1, rows * g_size + 1);
    console.log("DFS");

    // frameRate(100);

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
    //end = grid[rows - 1][cols - 1];

    startBtn = createButton('Start');
    startBtn.position(width + 50, 28);
    startBtn.size(100, 50)
    startBtn.mousePressed(startAlgorithm);

    stopBtn = createButton('Stop');
    stopBtn.position(width + 50, 108);
    stopBtn.size(100, 50)
    stopBtn.mousePressed(stopAlgorithm);

    undoBtn = createButton('Undo');
    undoBtn.position(width + 50, 188);
    undoBtn.size(100, 50)
    undoBtn.mousePressed(clearObstacles);

    undoBtn = createButton('Restart');
    undoBtn.position(width + 50, 268);
    undoBtn.size(100, 50)
    undoBtn.mousePressed(clearGrid);

    console.log(grid);
}

function paintGrid(){
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
        var current = queue.pop();
        current.status = Status.VISITED;
        current.color = Colors.CHECKED;

        if (current === end) {
            noLoop();
            console.log("Done");
        }

        for(i=0; i<current.neighbors.length; i++) {
            var neighbor = current.neighbors[i];
            if( neighbor.status === Status.UNVISITED){
                queue.push(neighbor);
                neighbor.status = Status.PROCESSING;
                neighbor.color = Colors.INQUEUE;
            }
        }
    }

    background(0);

    paintGrid();

    //save path
}
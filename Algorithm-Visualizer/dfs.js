var rows = 30;
var cols = 60;
var g_size = 25;

var grid = new Array(rows);

const Colors = {
    BACKGROUND: [0],
    TRANSPARENT: [255],
    OBSTACLE: [0],
    INQUEUE: [72, 202, 228],
    CHECKED: [0, 119, 182],
    PATH: [3, 4, 94],
}

const Status = {
    VISITED: 1,
    UNVISITED: 2,
    PROCESSING: 3,
    BARRIER: 4,
    PATH: 5,
}


var blocks = []
var start;
var end;
var drawingObstacle = false;
var running = false;
var queue = []

function Spot(i, j) {
    this.x = j;
    this.y = i;
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.neighbors = [];
    this.previous = undefined;
    this.status = Status.UNVISITED
    this.color = Colors.TRANSPARENT

    this.show = function () {
        fill(this.color);
        noStroke(0);
        
        rect(this.x * g_size + 1, this.y * g_size + 1, g_size - 1, g_size - 1);
    };

    this.addNeighbor = function (grid) {
        if (this.y < rows - 1) {
            this.neighbors.push(grid[this.y + 1][this.x]);
        }
        if (this.y > 0) {
            this.neighbors.push(grid[this.y - 1][this.x]);
        }
        if (this.x < cols - 1) {
            this.neighbors.push(grid[this.y][this.x + 1]);
        }
        if (this.x > 0) {
            this.neighbors.push(grid[this.y][this.x - 1]);
        }
    };
}

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


function startAlgorithm() {
    blocks = [];
    drawingObstacle = false;
    queue.push(start);
    loop();
    running = true;
}

function stopAlgorithm() {
    if ( running ) {
        noLoop();
        running = false;
    }
    else {
        loop();
        running = true;
    }
}

function clearObstacles() {
    blocks = [];
}

function clearGrid() {
    blocks = [];
    drawingObstacle = false;
    loop();
    noLoop();
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


function mousePressed() {
    drawingObstacle = !drawingObstacle;
}

function mouseDragged() {
    if (drawingObstacle) {
        var i = floor(mouseY / g_size);
        var j = floor(mouseX / g_size);
        if (i >= 0 && i < rows && j >= 0 && j < cols) {
            grid[i][j].show(Colors.OBSTACLE)
            // obstacle.push(grid[i][j]);
        }
    }
}

function mouseReleased() {
    drawingObstacle = false;
}
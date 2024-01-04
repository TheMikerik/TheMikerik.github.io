import {startAlgorithm, stopAlgorithm, clearObstacles, clearGrid} from "src/buttons.js";

var rows = 30;
var cols = 60;
var g_size = 25;

var grid = new Array(rows);

const Colors = {
    BACKGROUND: [0],
    TRANSPARENT: [255],
    OBSTACLE: [0],
    UNCHECKED: [72, 202, 228],
    CHECKED: [0, 119, 182],
    PATH: [3, 4, 94],
}


var unchecked = [];
var checked = [];
var obstacle = [];
var path = [];
var start;
var end;
var drawingObstacle = false;
var running = false;

function calculateDist(a, b) {
    var dis = dist(a.x, a.y, b.x, b.y);
    return dis;
}

function Spot(i, j) {
    this.x = j;
    this.y = i;
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.neighbors = [];
    this.previous = undefined;

    this.show = function (col) {
        fill(col);
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
    console.log("A*");

    frameRate(100);

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
    unchecked = [];
    checked = [];
    path = [];
    drawingObstacle = false;
    unchecked.push(start);
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
    for (var i = 0; i < obstacle.length; i++) {
        obstacle[i].show(Colors.OBSTACLE);
    }
    var tmp = [];
    obstacle = tmp;
}

function clearGrid() {
    unchecked = [];
    checked = [];
    path = [];
    obstacle = []
    drawingObstacle = false;
    loop();
    noLoop();
}


function draw() {
    if (drawingObstacle) {
        return;
    }

    if (unchecked.length > 0) {
        var lowest = 0;
        for (var i = 0; i < unchecked.length; i++) {
            if (unchecked[i].f < unchecked[lowest].f) {
                lowest = i;
            }
        }

        var current = unchecked[lowest];

        if (current === end) {
            noLoop();
            console.log("Done");
        }

        for (var i = unchecked.length - 1; i >= 0; i--) {
            if (unchecked[i] === current) {
                unchecked.splice(i, 1);
            }
        }

        checked.push(current);

        var neighbors = current.neighbors;
        for (var i = 0; i < neighbors.length; i++) {
            var neighbor = neighbors[i];

            if (!checked.includes(neighbor) && !obstacle.includes(neighbor)) {
                var tmp_g = current.g + 1;

                if (unchecked.includes(neighbor)) {
                    if (tmp_g < neighbor.g) {
                        neighbor.g = tmp_g;
                    }
                } else {
                    neighbor.g = tmp_g;
                    unchecked.push(neighbor);
                }

                neighbor.h = calculateDist(neighbor, end);
                neighbor.f = neighbor.g + neighbor.h;
                neighbor.previous = current;
            }
        }
    }

    background(0);

    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            grid[i][j].show(Colors.TRANSPARENT);
        }
    }

    for (var i = 0; i < checked.length; i++) {
        checked[i].show(Colors.CHECKED);
    }
    for (var i = 0; i < unchecked.length; i++) {
        unchecked[i].show(Colors.UNCHECKED);
    }
    for (var i = 0; i < obstacle.length; i++) {
        obstacle[i].show(Colors.OBSTACLE);
    }

    path = [];
    var temp = current;
    path.push(temp);
    while (temp.previous !== undefined) {
        path.push(temp.previous);
        temp = temp.previous;
    }

    for (var i = 0; i < path.length; i++) {
        path[i].show(Colors.PATH);
    }
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
            obstacle.push(grid[i][j]);
        }
    }
}

function mouseReleased() {
    drawingObstacle = false;
}

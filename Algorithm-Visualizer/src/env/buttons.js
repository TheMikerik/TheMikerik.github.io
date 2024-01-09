function createButtons() {
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
    
    gridBtn = createButton('Change Grid');
    gridBtn.size(100, 50)
    gridBtn.mousePressed(() => changeGrid());
    gridBtn.parent('buttons-container');

    // algorithmButton = createButton('Switch Algorithm');
    // algorithmButton.size(100, 50)
    // algorithmButton.mousePressed(() => changeAlgorithm());
    // algorithmButton.parent('buttons-container');
}

function startAlgorithm() {
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
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            if(grid[i][j].status === Status.BARRIER) {
                grid[i][j].color = Colors.TRANSPARENT;
                grid[i][j].status = Status.UNVISITED;
                grid[i][j].show();
            }
        }
    }
}

function clearGrid() {
    drawingObstacle = false;
    while (queue.length > 0) {
        queue.pop();
    }
    queue.push(start);
    running = false;
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            grid[i][j].color = Colors.TRANSPARENT;
            grid[i][j].status = Status.UNVISITED;
            grid[i][j].show();
        }
    }
    noLoop();
}

function changeGrid() {
    pressedCounter = pressedCounter >= 3 ? 0 : ++pressedCounter;
    console.log("Grid changed " + pressedCounter);
    
    switch (pressedCounter) {
        case 1:
            rows = 28;
            cols = 60;
            tile = 24;
            fps = 200;
            break;
        case 2:
            rows = 56;
            cols = 120;
            tile = 12;
            fps = 200;
            break;
        case 3:
            rows = 7;
            cols = 15;
            tile = 96;
            fps = 200;
            break;
        default:
            rows = 14;
            cols = 30;
            tile = 48;
            fps = 200;
            break;
    }

    setup();
    loop();
}
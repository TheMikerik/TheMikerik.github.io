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

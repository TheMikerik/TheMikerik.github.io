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
            if(grid[i][j].color === Colors.INQUEUE) {
                grid[i][j].color = Colors.OBSTACLE;
                grid[i][j].status = Status.BARRIER;
                grid[i][j].show();

            }
        }
    }
}

function clearGrid() {
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            grid[i][j].color = Colors.TRANSPARENT
            grid[i][j].status = Status.UNVISITED
        }
    }

    drawingObstacle = false;
    queue.push(start);
    loop();
    running = true;
}

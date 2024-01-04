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
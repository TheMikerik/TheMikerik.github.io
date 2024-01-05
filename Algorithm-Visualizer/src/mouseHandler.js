function mousePressed() {
    drawingObstacle = !drawingObstacle;
}

function mouseDragged() {
    if (drawingObstacle) {
        var i = floor(mouseY / g_size);
        var j = floor(mouseX / g_size);
        if (i >= 0 && i < rows && j >= 0 && j < cols) {
            grid[i][j].color = Colors.OBSTACLE;
            grid[i][j].status = Status.BARRIER;
            grid[i][j].show();
        }
    }
}

function mouseReleased() {
    drawingObstacle = false;
}
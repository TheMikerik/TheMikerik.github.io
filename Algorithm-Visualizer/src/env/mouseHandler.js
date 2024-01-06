function mousePressed() {
    drawingObstacle = !drawingObstacle;
}

function mouseDragged() {
    if (drawingObstacle) {
        var i = floor(mouseY / tile);
        var j = floor(mouseX / tile);
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
function draw() {
    if (drawingObstacle) {
        return;
    }

    if (queue.length !== 0) {
        current = queue.shift();
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
}
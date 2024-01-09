function calculateDist(a, b) {
    var dis = dist(a.x, a.y, b.x, b.y);
    return dis;
}

function draw() {
    if (drawingObstacle) {
        return;
    }

    if (queue.length !== 0) {
        var lowest = 0;
        for (var i = 0; i < queue.length; i++) {
            if (queue[i].f < queue[lowest].f) {
                lowest = i;
            }
        }

        var current = queue[lowest];

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

    printGrid();

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
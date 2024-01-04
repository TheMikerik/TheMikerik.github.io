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
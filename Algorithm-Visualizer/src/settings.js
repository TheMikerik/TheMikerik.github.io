var rows;
var cols;
var tile;
var fps = 150;

var pressedCounter = -1;
var current_algo = Algo.DFS;
changeGrid();

function showAlgorithmList() {
    var algorithmList = document.getElementById("algorithm-list");
    algorithmList.style.display = "block";
}

function hideAlgorithmList() {
    var algorithmList = document.getElementById("algorithm-list");
    algorithmList.style.display = "none";
}

function redirectToAlgorithm(algorithm) {
    window.location.href = algorithm + ".html";
}
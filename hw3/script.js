$(function() {
    var $canvas;
    var context;

    const CELL_DIM = 25; // Length and width dimension of one square cell.
    const DEAD = false;
    const LIVE = true;

    // Matrix of cells. Each cell is true (live) or false (dead).
    var cells = [];

    if ($('#canvas').length) {
        $canvas = $('#canvas');
        context = $('#canvas')[0].getContext("2d");
    } else {
        console.error('Could not find canvas object.');
    }

    var canvasOffset = $canvas.offset();

    function getCol(xCoord) {
        return Math.floor((xCoord - canvasOffset.left) / CELL_DIM);
    }

    function getRow(yCoord) {
        return Math.floor((yCoord- canvasOffset.top) / CELL_DIM);
    }

    $canvas.click(function(e) {
        console.log('click(' + getRow(e.clientY) + ', ' + getCol(e.clientX) + ')');
    });

    $canvas.mousemove(function(e) {
        console.log('mouseover (' + getRow(e.clientY) + ', ' + getCol(e.clientX) + ')');
    });
    

    function drawGrid() {

        for (var i = 0; i < $canvas.width(); i += CELL_DIM) {
            // Draw vertical lines.
            context.moveTo(i, 0);
            context.lineTo(i, $canvas.height());
            context.stroke();
        }

        for (var i = 0; i < $canvas.height(); i += CELL_DIM) {
            // Draw horizontal lines.
            context.moveTo(0, i);
            context.lineTo($canvas.width(), i);
            context.stroke();
        }
    }

    function initializeCells() {
        for (var r = 0; r < $canvas.height(); r+= CELL_DIM) {
            var temp_row = []
            for (var c = 0; c < $canvas.width(); c+= CELL_DIM) {
                // All cells start out dead.
                temp_row.push(false);
            }
            cells.push(temp_row);
        }
    }

    function draw() {
        drawGrid();


        requestAnimationFrame(draw);
    }

    initializeCells();
    draw();
});

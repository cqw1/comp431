$(function() {
    var $canvas;
    var context;

    const CELL_DIM = 25; // Length and width dimension of one square cell.

    if ($('#canvas').length) {
        $canvas = $('#canvas');
        context = $('#canvas')[0].getContext("2d");
    } else {
        console.error('Could not find canvas object.');
    }
    

    function drawGrid() {

        for (var i = 0; i <= $canvas.width(); i += CELL_DIM) {
            // Draw vertical lines.
            context.moveTo(i, 0);
            context.lineTo(i, $canvas.height());
            context.stroke();
        }

        for (var i = 0; i <= $canvas.height(); i += CELL_DIM) {
            // Draw vertical lines.
            context.moveTo(0, i);
            context.lineTo($canvas.width(), i);
            context.stroke();
        }
    }

    function draw() {
        drawGrid();


        requestAnimationFrame(draw);
    }
    draw();
});

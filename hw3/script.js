$(function() {

    if ($('#canvas').length) {
        $canvas = $('#canvas');
        context = $('#canvas')[0].getContext("2d");
        canvasOffset = $canvas.offset();
    } else {
        console.error('Could not find canvas object.');
    }

    const NUM_START = 12;
    const WIDTH = $canvas.width();
    const HEIGHT = $canvas.height();
    const CELL_DIM = 25; // Length and width dimension of one square cell.
    const ROWS = HEIGHT / CELL_DIM;
    const COLS = WIDTH / CELL_DIM;

    /* Game states */
    // Before starting the game, player still setting NUM_START cells.
    const GAME_STATE_INITIAL = 0;     
    // Cells are updating on life cycle.
    const GAME_STATE_RUNNING = 1;
    // Game has started, but paused in the middle of life cycles.
    const GAME_STATE_PAUSED = 2;

    var $canvas;
    var $numLeftSpan = $('#num-left');
    var context;
    var canvasOffset;
    var numLeft = NUM_START;
    var timerId;

    var gameState = GAME_STATE_INITIAL;

    // Matrix of cells. Each cell is true (live) or false (dead).
    var cells = [];


    $numLeftSpan.text(numLeft);

    $canvas.click(function(e) {
        console.log('click(' + getRow(e.clientY) + ', ' + getCol(e.clientX) + ')');
        var r = getRow(e.clientY);
        var c = getCol(e.clientX);

        if (gameState != GAME_STATE_RUNNING && numLeft > 0 && validCell(r, c)) {
            numLeft -= 1;
            $numLeftSpan.text(numLeft);
            toggleCell(r, c);
        }
    });

    $canvas.mousemove(function(e) {
        console.log('mouseover (' + getRow(e.clientY) + ', ' + getCol(e.clientX) + ')');
    })

    $('#play').click(function() {
        if (gameState != GAME_STATE_RUNNING) {
            timerId = setInterval(updateCells, 1000);
            gameState = GAME_STATE_RUNNING;
        }
    })

    $('#pause').click(function() {
        if (gameState == GAME_STATE_RUNNING) {
            clearInterval(timerId);
            gameState = GAME_STATE_PAUSED;
        }
    })

    $('#restart').click(function() {
        clearInterval(timerId);
        initGame();
    })

    function initGame() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        drawGrid();
        gameState = GAME_STATE_INITIAL;
    }

    /* Actual functions */
    function getCol(xCoord) {
        return Math.floor((xCoord - canvasOffset.left) / CELL_DIM);
    }

    function getRow(yCoord) {
        return Math.floor((yCoord- canvasOffset.top) / CELL_DIM);
    }
    
    function toggleCell(r, c) {
        // Toggle between 0 and 1.
        cells[r][c] = (cells[r][c] + 1) % 2;
    }

    function validCell(r, c) {
        return (r > 0 && r < (ROWS-1) && c > 0 && c < (COLS-1));
    }

    

    function drawGrid() {
        for (var c = 1; c < COLS - 1; c++) {
            // Draw vertical lines.
            context.moveTo(c * CELL_DIM, CELL_DIM);
            context.lineTo(c * CELL_DIM, HEIGHT - CELL_DIM);
            context.stroke();
        }

        for (var r = 1; r < ROWS - 1; r++) {
            // Draw horizontal lines.
            context.moveTo(CELL_DIM, r * CELL_DIM);
            context.lineTo(WIDTH - CELL_DIM, r * CELL_DIM);
            context.stroke();
        }
    }

    function initializeCells() {
        /*
         * Indexing goes until +2 to provide buffer rows and columns
         * surrounding actual matrix. Buffer rows/cols let us check
         * neighbors without having to special case edge cells later.
         * Need to index from 1 to < (length - 1) to ignore touching
         * buffer cells.
         */
        for (var r = 0; r < ROWS; r++) {
            var temp_row = []
            for (var c = 0; c < COLS; c++) {
                // All cells start out dead.
                temp_row.push(0);
            }

            cells.push(temp_row);
        }
    }

    function getNumLiveNeighbors(r, c) {
        // Returns the number of live neighbors of given cell.
        var count = 0;
        count += cells[r-1][c-1];
        count += cells[r-1][c];
        count += cells[r-1][c+1];
        count += cells[r][c-1];
        count += cells[r][c+1];
        count += cells[r+1][c-1];
        count += cells[r+1][c];
        count += cells[r+1][c+1];

        //console.log('getNumLiveNeighbors(' + r + ', ' + c + '): ' + count);
        return count;
    }

    function updateCells() {
        console.log('updateCells');
        for (var r = 1; r < ROWS - 1; r++) {
            for (var c = 1; c < COLS -1; c++) {
                var liveNeighbors = getNumLiveNeighbors(r, c);

                if (cells[r][c] && (liveNeighbors < 2 || liveNeighbors > 3)) {
                    // Any live cell with fewer than 2 live neighbors dies, as 
                    // if by underpopulation. Any live cell with more than 3 
                    // live neighbors dies, as if by overpopulation.
                    
                    cells[r][c] = 0;
                } else if (!cells[r][c] && liveNeighbors == 3) {
                    // Any dead cell with exactly 3 live neighbors becomes a live 
                    // cell, as if by reproduction.
                    
                    cells[r][c] = 1;
                }

                // Any live cell with two or three live neighbors lives on 
                // to the next generation.
            }
        }
    }

    function drawCells() {
        for (var r = 1; r < ROWS - 1; r++) {
            for (var c = 1; c < COLS -1; c++) {
                if (cells[r][c]) {
                    context.fillRect(c * CELL_DIM, r * CELL_DIM, CELL_DIM, CELL_DIM);
                }
            }
        }
    }

    initializeCells();
    initGame();
    draw();

    function draw() {
        if (gameState == GAME_STATE_RUNNING) {
            context.clearRect(0, 0, canvas.width, canvas.height);
        }

        drawCells();
        drawGrid();

        requestAnimationFrame(draw);
    }
});

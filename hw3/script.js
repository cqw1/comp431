$(function() {
    // Opt in to bootstrap javascript features.
    $('[data-toggle="popover"]').popover();

    var $canvas;
    var $cyclesLeftSpan = $('#cycles-left');
    var $togglesLeftSpan = $('#toggles-left');
    var $currentScoreSpan = $('#current-score');
    var $maxScoreSpan = $('#max-score');
    var $play = $('#play');
    var $pause = $('#pause');
    var $restart = $('#restart');
    var $save = $('#save');
    var $populated = $('#populated');
    var context;
    var canvasOffset;
    var canvasBoundingRect;
    var timerId;

    var populated = [];
    var populatedCount = 0;

    // Matrix of cells. Each cell is true (live) or false (dead).
    var cells = [];

    if ($('#canvas').length) {
        $canvas = $('#canvas');
        context = $('#canvas')[0].getContext("2d");
        canvasOffset = $canvas.offset();
        canvasBoundingRect = $('#canvas')[0].getBoundingClientRect();
    } else {
        console.error('Could not find canvas object.');
    }

    const CYCLES_START = 60;
    const TOGGLES_START = 12;
    const WIDTH = $canvas.width();
    const HEIGHT = $canvas.height();
    const CELL_DIM = 25; // Length and width dimension of one square cell.
    const ROWS = Math.floor(HEIGHT / CELL_DIM);
    const COLS = Math.floor(WIDTH / CELL_DIM);


    /* Game states */
    // Before starting the game, player still setting TOGGLES_START cells.
    const GAME_STATE_INITIAL = 0;     
    // Cells are updating on life cycle.
    const GAME_STATE_RUNNING = 1;
    // Game has started, but paused in the middle of life cycles.
    const GAME_STATE_PAUSED = 2;
    // Ran out of cycles.
    const GAME_STATE_FINISHED = 3;

    var gameState = GAME_STATE_INITIAL;
    var cyclesLeft = CYCLES_START;
    var togglesLeft = TOGGLES_START;
    var currentScore = 0;
    var maxScore = 0;

    $canvas.click(function(e) {
        console.log('click client(' + e.clientX + ', ' + e.clientY + ')');
        console.log('click page(' + e.pageX + ', ' + e.pageY + ')');

        var r = getRow(e.pageY);
        var c = getCol(e.pageX);

        console.log('click (' + r + ', ' + c + ')');

        if (gameState != GAME_STATE_RUNNING && togglesLeft > 0 && validCell(r, c)) {
            if (cells[r][c]) {
                // Was alive, now dead - have one more cell to allocate
                togglesLeft += 1;
            } else {
                // Was dead, now alive - have one less cell to allocate
                togglesLeft -= 1;
            }
            toggleCell(r, c);
            updatePopulatedCount();

            draw();
        }
    });

    /* Play button. */
    $play.click(function() {
        if (gameState != GAME_STATE_RUNNING) {
            timerId = setInterval(run, 1000);
            gameState = GAME_STATE_RUNNING;
            $play.addClass('active');
            $pause.removeClass('active');
        }
    })

    /* Pause button. */
    $pause.click(function() {
        if (gameState == GAME_STATE_RUNNING) {
            clearInterval(timerId);
            gameState = GAME_STATE_PAUSED;
            $pause.addClass('active');
            $play.removeClass('active');
        }
    })

    /* Restart button. */
    $restart.click(function() {
        clearInterval(timerId);
        initGame();
        $play.removeClass('active');
        $pause.removeClass('active');
    })

    /* Save button. */
    $save.click(function() {
        if (gameState == GAME_STATE_INITIAL) {
            console.error("Cannot save scores before starting.");
            return;
        }  else if (gameState == GAME_STATE_RUNNING) {
            console.error("Cannot save scores while game is running.");
            return;
        }

        if (window.localStorage) {
            var saveData = {
                'maxScore': maxScore,
                'populatedCount': populatedCount,
            }
            var name = Math.random() * 100;

            localStorage.setItem(name, JSON.stringify(saveData));
            $('#highscores tr:last').after('<tr><td class="text-center">' + name +'</td><td class="text-center">' + maxScore + '</td><td class="text-center">' + populatedCount + '</td></tr>');
        } else {
                // TODO: generate alert.
            console.error("localStorage is not supported.");
        }
    }) 

    /* Initializes all game variables and other setup. */
    function initGame() {
        gameState = GAME_STATE_INITIAL;
        cyclesLeft = CYCLES_START;
        togglesLeft = TOGGLES_START;
        currentScore = 0;
        maxScore = 0;
        populatedCount = 0;
        initializeCells();
        draw();
    }

    /* Column of cell, in which top left clickable cell is (1, 1) */
    function getCol(xCoord) {
        //return Math.floor((xCoord - canvasOffset.left) /CELL_DIM);
        return Math.floor((xCoord - canvasBoundingRect.left) / CELL_DIM);
    }

    /* Row of cell, in which top left clickable cell is (1, 1) */
    function getRow(yCoord) {
        return Math.floor((yCoord - canvasBoundingRect.top) / CELL_DIM);
    }

    /* Toggle between 0 and 1. */
    function toggleCell(r, c) {
        cells[r][c] = (cells[r][c] + 1) % 2;

        if (cells[r][c]) {
            populated[r][c] = cells[r][c];
        }
    }

    /* Checks if it's within our buffer bounds of matrix. */
    function validCell(r, c) {
        return (r > 0 && r < (ROWS-1) && c > 0 && c < (COLS-1));
    }

    function drawGrid() {
        context.beginPath();
        for (var c = 1; c < COLS; c++) {
            // Draw vertical lines.
            context.moveTo(c * CELL_DIM, CELL_DIM);
            context.lineTo(c * CELL_DIM, HEIGHT - CELL_DIM);
            context.stroke();
        }

        for (var r = 1; r < ROWS; r++) {
            // Draw horizontal lines.
            context.moveTo(CELL_DIM, r * CELL_DIM);
            context.lineTo(WIDTH - CELL_DIM, r * CELL_DIM);
            context.stroke();
        }
        context.closePath();
    }

    function initializeCells() {
        /*
         * Indexing goes until +2 to provide buffer rows and columns
         * surrounding actual matrix. Buffer rows/cols let us check
         * neighbors without having to special case edge cells later.
         * Need to index from 1 to < (length - 1) to ignore touching
         * buffer cells.
         */
        cells = [];
        populated = [];
        for (var r = 0; r < ROWS; r++) {
            var temp_row = []
                for (var c = 0; c < COLS; c++) {
                    // All cells start out dead.
                    temp_row.push(0);
                }

            cells.push(temp_row);
            populated.push(temp_row.splice());
        }
    }

    function updatePopulatedCount() {
        populatedCount = 0;
        populated.forEach(function(row) {
            row.forEach(function(cell) {
                populatedCount += cell;
            })
        })
    }

    function loadHighscores() {
        if (window.localStorage) {
            for (var i = 0; i < localStorage.length; i++) {
                var saveData = JSON.parse(localStorage.getItem(localStorage.key(i)));
                $('#highscores tr:last').after('<tr><td class="text-center">' + localStorage.key(i) + '</td><td class="text-center">' + saveData.maxScore + '</td><td class="text-center">' + saveData.populatedCount + '</td></tr>');
            }
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

    function deepCopyCells(cells) {
        var new_cells = [];
        for (var r = 0; r < cells.length; r++) {
            new_cells.push(cells[r].slice());
        }

        return new_cells;
    }

    function updateCells() {
        console.log('updateCells');

        var new_cells = deepCopyCells(cells);
        for (var r = 1; r < ROWS - 1; r++) {
            for (var c = 1; c < COLS -1; c++) {
                var liveNeighbors = getNumLiveNeighbors(r, c);

                if (cells[r][c] && (liveNeighbors < 2 || liveNeighbors > 3)) {
                    // Any live cell with fewer than 2 live neighbors dies, as 
                    // if by underpopulation. Any live cell with more than 3 
                    // live neighbors dies, as if by overpopulation.

                    new_cells[r][c] = 0;
                    currentScore -= 1;
                } else if (!cells[r][c] && liveNeighbors == 3) {
                    // Any dead cell with exactly 3 live neighbors becomes a live 
                    // cell, as if by reproduction.

                    new_cells[r][c] = 1;
                    populated[r][c] = 1;
                    currentScore += 1;
                }
            }
        }

        if (currentScore > maxScore) {
            maxScore = currentScore;
        }

        cells = new_cells;
    }

    function drawCells() {
        context.beginPath();
        for (var r = 1; r < ROWS - 1; r++) {
            for (var c = 1; c < COLS -1; c++) {
                if (cells[r][c]) {
                    context.fillStyle = "black";
                } else {
                    context.fillStyle = "white";
                }
                context.fillRect(c * CELL_DIM, r * CELL_DIM, CELL_DIM, CELL_DIM);
            }
        }
        context.closePath();
    }

    function run() {
        if (cyclesLeft == 0) {
            gameState = GAME_STATE_FINISHED;

        } else {
            context.clearRect(0, 0, canvas.width, canvas.height);
            updateCells();
            updatePopulatedCount();
            cyclesLeft -= 1;

            draw();
        }
    }

    function draw() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        drawCells();
        drawGrid();
        $cyclesLeftSpan.text(cyclesLeft);
        $togglesLeftSpan.text(togglesLeft);
        $currentScoreSpan.text(currentScore);
        $maxScoreSpan.text(maxScore);
        $populated.text(populatedCount);
    }

    initGame();
    loadHighscores();

});

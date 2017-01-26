'use strict'

var createApp = function(canvas) { 
	var c = canvas.getContext("2d");

    var floor = canvas.height/2
    var grad = c.createLinearGradient(0,floor,0,canvas.height)


	// common size for windows
	var windowSpacing = 2, floorSpacing = 3
	var windowHeight = 5, windowWidth = 3

	// colors of buildings
	var blgColors = [ 'red', 'blue', 'gray', 'orange'] 

    var buildings = [];

	//build a building
	var build = function() { 
		var x0 = Math.random()*canvas.width
		var blgWidth = (windowWidth+windowSpacing) * Math.floor(Math.random()*10)
		var blgHeight = Math.random()*canvas.height/2

		var fillColor = blgColors[ Math.floor(Math.random()*blgColors.length)]
        buildings.push({x: x0, width: blgWidth, height: blgHeight, color: fillColor})
	}

    function drawBuildings() {
        buildings.forEach(function(building) {
            c.fillStyle = building.color;
            c.fillRect(building.x, floor - building.height, building.width, building.height);

            for (var y = floor - floorSpacing; y > floor - building.height; y -= floorSpacing + windowHeight) {
                for (var x = windowSpacing; x < building.width- windowWidth; x += windowSpacing + windowWidth) {
                    var on = Math.floor(Math.random() * 2);
                    if (on) {
                        c.fillStyle = 'yellow';
                    } else {
                        c.fillStyle = 'black';
                    }
                    c.fillRect(building.x + x, y - windowHeight, windowWidth, windowHeight)
                }
            }

        });
    }

	// Create the ground
    function drawGround() {
        grad.addColorStop(0, "green")
        grad.addColorStop(1, "black")
        c.fillStyle=grad
        c.fillRect(0, floor, canvas.width, canvas.height)
    }

    var sun = {
        x: 50,
        y: 50,
        r: 50,
    };

    var car = {
        x: 0,
        y: floor - 30, // height of car + wheelRadius = 30
        width: 50,
        height: 20,
        wheelRadius: 10,
    }

    function drawCar() {
        // Body of car
        c.strokeStyle = 'black';
        c.fillStyle = 'black';
        c.fillRect(car.x, car.y, car.width, car.height);

        // Two wheels
        c.strokeStyle = 'red';
        c.fillStyle = 'red';
        c.beginPath();
        c.arc(car.x, car.y + car.height, car.wheelRadius, 0, 2 * Math.PI);
        c.fill();
        c.stroke();

        c.beginPath();
        c.arc(car.x + car.width, car.y + car.height, car.wheelRadius, 0, 2 * Math.PI);
        c.fill();
        c.stroke();
    }

    function moveCar() {
        car.x += 3;
        car.x %= canvas.width;
    }

    function moveSun() {
        sun.x += 1;
        sun.x %= canvas.width;
    };


    function drawSun() {
        c.beginPath();
        c.fillStyle = 'yellow';
        c.strokeStyle = 'yellow';
        c.arc(sun.x, sun.y, sun.r, 0, 2*Math.PI);
        c.fill();
        c.stroke();
        c.closePath();
    };

    function draw() {
        c.clearRect(0, 0, canvas.width, canvas.height);
        drawGround();

        moveSun();
        drawSun();

        drawBuildings();

        moveCar();
        drawCar();

        requestAnimationFrame(draw);
    }
    draw();

	return {
		build: build
	}
}

window.onload = function() {
	var app = createApp(document.querySelector("canvas"))
	document.getElementById("build").onclick = app.build
}



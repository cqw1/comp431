
function getRandomIntInclusive(min, max) {
  var interval = Math.floor(Math.random() * (max - min + 1)) + min;
  return interval;
}
	

window.onload = function() {

  var red = {
    index: 0,
    images: [
  		'images/red1.png',
  		'images/red2.png',
  		'images/red3.png',
  		'images/red4.png',
  		'images/red5.png',
  	],
  	id: 'red-image',
  }
  
  var green = {
    index: 0,
    images: [
  		'images/green1.png',
  		'images/green2.png',
  		'images/green3.png',
  		'images/green4.png',
  		'images/green5.png',
  	],
  	id: 'green-image',
  }
  
  var blue = {
    index: 0,
    images: [
  		'images/blue1.png',
  		'images/blue2.png',
  		'images/blue3.png',
  		'images/blue4.png',
  		'images/blue5.png',
  	],
  	id: 'blue-image',
  }
  
  var yellow = {
    index: 0,
    images: [
  		'images/yellow1.png',
  		'images/yellow2.png',
  		'images/yellow3.png',
  		'images/yellow4.png',
  		'images/yellow5.png',
  	],
  	id: 'yellow-image',
  }
  
  function loopImages(obj) {
    obj.index = (obj.index + 1) % obj.images.length;
    document.getElementById(obj.id).src = obj.images[obj.index];
  }
	
	var redIntervalId = setInterval(loopImages, getRandomIntInclusive(1 , 5) * 1000, red);
	var greenIntervalId = setInterval(loopImages, getRandomIntInclusive(1 , 5) * 1000, green);
	var blueIntervalId = setInterval(loopImages, getRandomIntInclusive(1 , 5) * 1000, blue);
	var yellowIntervalId = setInterval(loopImages, getRandomIntInclusive(1 , 5) * 1000, yellow);
	
	window.toggleButton = function(id) {
	  var button = document.getElementById(id);
	  
	  if (button.innerHTML == 'Stop') {
	    button.innerHTML = 'Start';
	    switch (id) {
	      case 'red-button':
	        clearInterval(redIntervalId);
	        break;
	      case 'green-button':
	        clearInterval(greenIntervalId);
	        break;
	      case 'blue-button':
	        clearInterval(blueIntervalId);
	        break;
	      case 'yellow-button':
	        clearInterval(yellowIntervalId);
	        break;
	    }
	  } else if (button.innerHTML == 'Start') {
	    button.innerHTML = 'Stop';
	    switch (id) {
	      case 'red-button':
        	redIntervalId = setInterval(loopImages, getRandomIntInclusive(1 , 5) * 1000, red);
	        break;
	      case 'green-button':
        	greenIntervalId = setInterval(loopImages, getRandomIntInclusive(1 , 5) * 1000, green);
	        break;
	      case 'blue-button':
        	blueIntervalId = setInterval(loopImages, getRandomIntInclusive(1 , 5) * 1000, blue);
	        break;
	      case 'yellow-button':
        	yellowIntervalId = setInterval(loopImages, getRandomIntInclusive(1 , 5) * 1000, yellow);
	        break;
	    }
	  }
	}

}

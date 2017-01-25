
$(function() {
  
  var button = $('#click-button');
  var div = $('#congrats-out-div');
  div.toggle();
  
  function move() {
    var w = $(window).width() - button.width();
    var h = $(window).height() - button.height();
    
    var left = Math.floor(Math.random() * w) + 1;
    var top = Math.floor(Math.random() * h) + 1;
    
    button.css('left', left);
    button.css('top', top);
  }
  
  function clicked() {
    if (button.text() == 'Click Me') {
      button.unbind('mouseover');
      button.text('Play Again');
      div.toggle();
    } else if (button.text() == 'Play Again') {
      button.mouseover(move);
      button.text('Click Me');
      div.toggle();
    }
    
  }
  
  button.mouseover(move);
  
  button.click(clicked);
  
  $(document).keydown(function(e) {
    if (e.which == 16) {
      button.unbind('mouseover');
    }
  });
  
  $(document).keyup(function(e) {
    if (e.which == 16) {
      if (button.text() == 'Click Me!') {
        button.mouseover(move);
      }
    }
  });
  

});
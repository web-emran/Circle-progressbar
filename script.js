//* progressbar 
var Loader = {
  isPause: false,
  currentTime: 0,
  stopTime: 0,
  interval: null, 
  start: function(duration, stopTime){
    duration = parseInt(duration);
    Loader.currentTime = duration;

    //Check if user want to use percent for stop time
    hasPercent = (stopTime.indexOf('%') > 0) ? true : false;

    //Check time and get proper value
    stopTime = isNaN(parseInt(stopTime)) ? 0 : parseInt(stopTime);

    //Get stop time
    Loader.stopTime = hasPercent ? (duration - (stopTime/100) * duration) : stopTime;

    //Set right value time if stoptime greater than duraion
    if ( Loader.stopTime > duration ) {
      Loader.stopTime = duration;
    }

    //Put duration into counter element
    $('.loader .count').html(duration);

    //use duration for animation
    $('.ticker').css('animation-duration', duration+'s');

    //Run interval 
    Loader.interval = setInterval(function(){
      if ( Loader.isPause) return;
      Loader.counter();									
    }, 1000);
  }, 

  pause: function(){
    Loader.isPause = true;

    //Stop css animation
    $('.ticker').css('animation-play-state', 'paused');
  },

  resume: function(){
    Loader.isPause = false;
    $('.ticker').css('animation-play-state', 'running');
  },

  counter: function(){
    //Decrement currentTime
    Loader.currentTime--;

    //Output current time
    $('.loader .count').html(Loader.currentTime);

    if ( Loader.currentTime <= 0) {
      clearInterval(Loader.interval);
    }

    //Pause timer
    if ( Loader.stopTime == Loader.currentTime || Loader.isPause || Loader.currentTime <= 0) {
      Loader.pause();
    }							
  }
}

Loader.start(100, '30%');

setTimeout(function(){
  Loader.resume(100, '30%');
}, 0);
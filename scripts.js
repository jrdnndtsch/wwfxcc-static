//smartresize function (to deal with window maximize button and resize)
(function($,sr){
  var debounce = function (func, threshold, execAsap) {
      var timeout;

      return function debounced () {
          var obj = this, args = arguments;
          function delayed () {
              if (!execAsap)
                  func.apply(obj, args);
              timeout = null;
          };

          if (timeout)
              clearTimeout(timeout);
          else if (execAsap)
              func.apply(obj, args);

          timeout = setTimeout(delayed, threshold || 100);
      };
  }
  // smartresize 
  jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };

})(jQuery,'smartresize');
//hamburger nav
$('.main--toggle').on('click', function(e){
	e.preventDefault();
	$(this).toggleClass('active');
	$('.menu--main').slideToggle('normal')
})

$('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
var windowSize = $(window).innerWidth()

function mainMenuSmall(){
	if(windowSize <= 960){
		$('.menu--main').css({'width': '100%', 'margin-left': '0', 'left' : '0', 'display' : 'none'});
		$('.generic-story').each(function(i){
			i > 0 ? $(this).addClass('off') : null
			i == 0 ? $(this).addClass('active') : null
		});
	}else{
		$('.menu--main').css({'width': 'auto', 'margin-left': '140px', 'display': 'flex'})
	}
}

var theWidth = $(window).width();
$(window).smartresize(function(){
	if($(this).width() != theWidth){
		windowSize = $(window).innerWidth()
		mainMenuSmall()
		theWidth = $(this).width()
	}
});
mainMenuSmall()

function preloadImage(source, destElem) {
    var image = new Image();

    image.src = source;

    image.onload = function () {
        var cssBackground = 'url(' + image.src + ')';

        $(destElem).css('background-image', cssBackground);
        console.log('loaded')
    };
}

preloadImage('https://s3.amazonaws.com/carolinian/bg-shovel.jpg', '#bg-fade-2')

//Header image fade
var bgImageArray = [ "butterfly-header.jpg", "bg-bee.jpg", "bg-frog.jpg", "bg-gardener.jpg", "bg-plants.jpg"],
base = "https://s3.amazonaws.com/carolinian/",
secs = 4;
bgImageArray.forEach(function(img){
    var image = new Image().src = base + img;
    // caches images, avoiding white flash between background replacements
});


var imageSet1 = ["bg-chipmunk.jpg", "bg-bee.jpg", "bg-frog.jpg"];
var currentImageSet1 = 0;

var imageSet2 = ["bg-gardener.jpg", "bg-plants.jpg", 'bg-shovel.jpg'];
var currentImageSet2 = 0;
imageSet1.forEach(function(img){
    var image = new Image().src = base + img;
    // caches images, avoiding white flash between background replacements
});
imageSet2.forEach(function(img){
    var image = new Image().src = base + img;
    // caches images, avoiding white flash between background replacements
});

function changeBackgroundImages() {
    img1Fade();
    setTimeout(img2Fade, 5000);

}

function img1Fade(){

    console.log('img1')
    $('#bg-fade-1').fadeOut('slow', function(){
    	$('#bg-fade-1').css({background: 'url('+ base + imageSet1[++currentImageSet1] + ')  no-repeat center center fixed', 'background-size': 'cover'})
	});
    $('#bg-fade-2').fadeIn('slow');
    if (currentImageSet1 >= imageSet1.length - 1) {

            currentImageSet1 -= imageSet1.length;
        };
}

function img2Fade(){
	console.log('img2')
    $('#bg-fade-2').fadeOut('slow', function(){$('#bg-fade-2').css({background: 'url('+ base + imageSet2[++currentImageSet2] + ') no-repeat center center fixed', 'background-size': 'cover'})});
    $('#bg-fade-1').fadeIn('slow');
    if (currentImageSet2 >= imageSet2.length - 1) {

            currentImageSet2 -= imageSet2.length;
        };
}
var photoInterval
function startInterval(){
	 photoInterval = setInterval(function(){
	 	console.log('starting')
	 	changeBackgroundImages();
	 }, 10000);
}
changeBackgroundImages();

if(typeof photoInterval == "number") {
	
}else {
	
	startInterval()
}
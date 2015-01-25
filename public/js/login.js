var image = '/img/code.jpg';
var img   = $('<img />');

img.bind('load', function() {
   // Background image has loaded.
   $('html').css('background', 'url(' + image + ') no-repeat center center fixed');
   $('body').css('transition', 'background-color 1s linear');
   $('body').css('background-color', 'rgba(0,0,0,.7)');
});

img.attr('src', image);
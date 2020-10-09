//smooth scroll
// Select all links with hashes
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function() {
          // Callback after animation          
        });
      }
    }
  });

//show nav as stick on scroll up

// should start at 0

// $(window).scroll(function() {
//     var scroll = $(window).scrollTop();
//     if(scroll < position && scroll >= 107) {
//         $('.top').addClass('sticky');
//     } else {
//          $('.top').removeClass('sticky');
//     }
//     position = scroll;
// });

var p = $('.top');

var position = $(window).scrollTop(); 

$(window).scroll(function() {
    var e = $(window).scrollTop()
      , t = p.height()/2;
    if (e > position && e > t) {
      p.addClass('scroll-up');
    }
    else {
      p.removeClass('scroll-up');
    }
    position = e;
});

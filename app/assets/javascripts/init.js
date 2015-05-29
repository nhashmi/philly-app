var ready;
ready = function() {
    addressModel = new Address();
    addressView = new AddressView(addressModel);

    // Call Refills parallax component
    // I'm confused, is this a refills function? Or did you write the function
    // below?
    if ($("#js-parallax-window").length) {
      parallax();
    }

  $(window).scroll(function(e) {
    if ($("#js-parallax-window").length) {
      parallax();
    }
  });
}

$(document).ready(ready);
$(document).on('page:load', ready);

function parallax(){
  if( $("#js-parallax-window").length > 0 ) {
    var plxBackground = $("#js-parallax-background");
    var plxWindow = $("#js-parallax-window");

    var plxWindowTopToPageTop = $(plxWindow).offset().top;
    var windowTopToPageTop = $(window).scrollTop();
    var plxWindowTopToWindowTop = plxWindowTopToPageTop - windowTopToPageTop;

    var plxBackgroundTopToPageTop = $(plxBackground).offset().top;
    var windowInnerHeight = window.innerHeight;
    var plxBackgroundTopToWindowTop = plxBackgroundTopToPageTop - windowTopToPageTop;
    var plxBackgroundTopToWindowBottom = windowInnerHeight - plxBackgroundTopToWindowTop;
    var plxSpeed = 0.35;

    plxBackground.css('top', - (plxWindowTopToWindowTop * plxSpeed) + 'px');
  }
}

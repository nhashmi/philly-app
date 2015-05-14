var ready;
ready = function() {

    console.log("The document is ready")
    console.log("Creating a new Address")
    addressModel = new Address();
    console.log("Created a new Address")
    console.log("Creating a new AddressView")
    addressView = new AddressView(addressModel);
    console.log("Created a new AddressView")

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

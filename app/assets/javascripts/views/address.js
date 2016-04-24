

var AddressView = function(addressModel){
  this.housingData = document.querySelector(".housing-data");
  this.open311Data = document.querySelector(".open311-data");
  this.specificRequestData = document.querySelector(".specific-request");
  this.model = addressModel;
}


AddressView.prototype = {
  withinRadius: function(request, radius) {
      return request.lat < (latitude + radius) &&
             request.lat > (latitude - radius) &&
             request.lon < (longitude + radius) &&
             request.lon > (longitude - radius))
  },

  addCard: function() {
    // Add info to card
    $(this.open311Data).append('<div class="card card' + requestsRendered + '"></div>');
    // Default image
    if (this.model.serviceRequests[i].image_thumbnail === "") {this.model.serviceRequests[i].image_thumbnail = "https://s169923.gridserver.com/images/whiteplanks.jpg"};
    // Add image and status ribbon
    $(".card" + requestsRendered).append('<div class="card-image"><div class="ribbon-box"><img src="' + this.model.serviceRequests[i].image_thumbnail + '" alt="Photo of service request (if it exists). Wood photo courtesy of Jay Mantri."><div class="ribbon-wrapper"><div class="ribbon">' + this.model.serviceRequests[i].status + '</div></div></div></div>');
    // Change color of ribbon based on service request status
    if (this.model.serviceRequests[i].status === "in progress") {$(".ribbon").last().css("background-color", "#FACF08")};
    if (this.model.serviceRequests[i].status === "completed") {$(".ribbon").last().css("background-color", "#009E60")};

  }

  render: function(){
    // Delete any existing cards (resolves a bug that was causing
    // cards to be created within other cards)
    $(".card").detach();
    var requestsRendered = 0
    var searchRadius = 0.01
    var latitude = $('.housing-data').data('latitude');
    var longitude = $('.housing-data').data('longitude');

    for (var i = 0; i < this.model.serviceRequests.length && requestsRendered < 20; i++) {
      // Only display service requests that are in a searchRadius * searchRadius
      // box around the address

      // I'd extract this long if statement into a method
      // if (withinRadius(this.model.serviceRequest[i], searchRadius) {...
      // In general, I'd take each logical block of code below and do the same
      // thing for readability purposes.
      // In other words, each section of code here is nice and clean, but as
      // a whole, it gets quite messy and hard to read, just because of size.
      if (this.withinRadius(this.mode.serviceRequest[i], searchRadius)) {

          var unix_timestamp = this.model.serviceRequests[i].date_created
          var dateCreated = new Date(unix_timestamp * 1000); // convert unix timestamp
          var dateString = moment(dateCreated).calendar() // format date

          addCard(this.model.serviceRequests[i], );

          
          // Format address to output in service request card
          // Remove superfluous "Philadelphia, PA [zipcode], USA"
          var longAddress = this.model.serviceRequests[i].address;
          var shortAddressRegex = longAddress.match(/.(?= Philadelphia, PA)/);
          if (shortAddressRegex) {
            var requestLocation = longAddress.slice(0, shortAddressRegex.index);
          } else {
            var requestLocation = longAddress;
          }
          // Add address and service request title
          $(".card" + requestsRendered).append('<div class="card-header">' + dateString + ' one of your neighbors reported: ' + this.model.serviceRequests[i].title + ' at ' + requestLocation + '</div>');
          if (this.model.serviceRequests[i].description === "") { this.model.serviceRequests[i].description = "No description provided." }

          // Get the user's id from the url
          var pathArray = window.location.pathname.split('/');
          var userId = pathArray[2];

          // Add get in touch and track request buttons
          $(".card" + requestsRendered).append('<div class="card-copy">' +
              '<p>' +
                this.model.serviceRequests[i].description +
              '</p>' +
              '<a href="/contact" id="get-in-touch">Get in touch</a>' +
              '<button id="track-request">Track request</button>' +
            '</div>');

          // Add service id to track request button
          $(".card" + requestsRendered + " #track-request").append('<div class="hidden-service-id">' + this.model.serviceRequests[i].id + '</div>');

          // When the user clicks on "Track request", change the style
          // of the button and submit a post request to users#requests,
          // i.e. the create route in the requests Rails controller
          $(".card" + requestsRendered).find(":button").on('click', function(evt){
            evt.preventDefault();
            var serviceRequestId = this.children[0].innerText;
            // Track a request
            var nowTracking = $.post("/users/" + userId + "/requests", {request: {service_id: serviceRequestId, notes: ""}});

            $(this).attr("id", "tracked");
            this.innerText = "Tracked";

            nowTracking.fail(function(){
              alert("We're sorry, but service request #" + serviceRequestId + " could not be tracked at this time.");
            })

          });

         requestsRendered++

      }
    }
  },

  renderFailure: function(){
    this.housingData.innerHTML = "API could not find address";
  },

  renderServiceRequest: function(){
    var request = this.model.specificRequest;
    $(".specific-request").prepend('<h3>' + request.title + ' at ' + request.address + '.</h3><h3>' + moment(request.date_created * 1000).calendar() + '<h3>');
    $(".specific-request").append('<h4>Status: ' + request.request_status + '</h4>');
    if (request.image === "") {
      $(".specific-request").append('<p>The neighbor who submitted this service request did not submit a photo.</p>')
    } else {
      $(".specific-request").append('<img src="' + request.image + '" alt="Photo associated with service request">');
    }
    $(".specific-request").append('<h4>Description</h4><p>' + request.description + '</p>');
  },

  renderServiceRequestFailure: function(){
    console.log("inside the render failure function")
    this.specificRequestData.innerHTML = "API could not find address";
  }

}

var AddressView = function(addressModel){
  console.log("Inside the AddressView constructor function");
  this.housingData = document.querySelector(".housing-data");
  this.open311Data = document.querySelector(".open311-data");
  this.specificRequestData = document.querySelector(".specific-request");
  console.log("this.housingData is " + this.housingData);
  console.dir(this.specificRequestData);
  this.model = addressModel;
  console.log("this.model is" + this.model);
  console.log("rendering...")
  // this.render()
}

AddressView.prototype = {

  render: function(){
    $(".card").detach();
    console.log("Inside the render function")
    console.log(this.housingData);
    // this.housingData.innerHTML = "Property ID: " + this.model.propertyId;
    console.log("Now console.dir this.model.serviceRequests")
    console.dir(this.model.serviceRequests)
    console.log("this.model.serviceRequests.length = " + this.model.serviceRequests.length);
    var requestsRendered = 0
    var searchRadius = 0.01
    var latitude = $('.housing-data').data('latitude');
    var longitude = $('.housing-data').data('longitude');
    for (var i = 0; i < this.model.serviceRequests.length && requestsRendered < 20; i++) {
      // console.log("LAT AND LONG")
      // console.dir(this.model.serviceRequests[i])
      if (this.model.serviceRequests[i].lat < (latitude + searchRadius) &&
          this.model.serviceRequests[i].lat > (latitude - searchRadius) && 
          this.model.serviceRequests[i].lon < (longitude + searchRadius) && 
          this.model.serviceRequests[i].lon > (longitude - searchRadius)) {
        // jQuery("#main_class:not(:has(.new_class))").append('<span class="new_class">hello</span>');
        // $(".open311-data"):not(:has(".card" + requestsRendered)
        var unix_timestamp = this.model.serviceRequests[i].date_created
        // console.log("Unix time: " + unix_timestamp)
        var dateCreated = new Date(unix_timestamp * 1000); // moment.js will do this, but keeping it in for clarity
        var dateString = moment(dateCreated).calendar()
        // Add info to card
          $(this.open311Data).append('<div class="card card' + requestsRendered + '"></div>');
          // Default image
          // if (this.model.serviceRequests[i].image_thumbnail === "") {this.model.serviceRequests[i].image_thumbnail = "https://c3.staticflickr.com/3/2160/2457815776_38b3a10fa8_b.jpg"};
          if (this.model.serviceRequests[i].image_thumbnail === "") {this.model.serviceRequests[i].image_thumbnail = "https://s169923.gridserver.com/images/whiteplanks.jpg"};
          $(".card" + requestsRendered).append('<div class="card-image"><div class="ribbon-box"><img src="' + this.model.serviceRequests[i].image_thumbnail + '" alt="Photo of service request"><div class="ribbon-wrapper"><div class="ribbon">' + this.model.serviceRequests[i].status + '</div></div></div></div>');
          if (this.model.serviceRequests[i].status === "in progress") {$(".ribbon").last().css("background-color", "#FACF08")};
          if (this.model.serviceRequests[i].status === "completed") {$(".ribbon").last().css("background-color", "#009E60")};
          $(".card" + requestsRendered).append('<div class="card-header">' + dateString + ' one of your neighbors reported: ' + this.model.serviceRequests[i].title + '</div>');
          if (this.model.serviceRequests[i].description === "") { this.model.serviceRequests[i].description = "No description provided." }
          // Get the user's id from the url 
          var pathArray = window.location.pathname.split('/');
          var userId = pathArray[2];
          $(".card" + requestsRendered).append('<div class="card-copy">' + 
              '<p>' + 
                this.model.serviceRequests[i].description + 
              '</p>' + 
              '<a href="/contact" id="get-in-touch">Get in touch</a>' + 
              '<button id="track-request">Track request</button>' + 
            '</div>');
          $(".card" + requestsRendered + " #track-request").append('<div class="hidden-service-id">' + this.model.serviceRequests[i].id + '</div>'); 
          $(".card" + requestsRendered).find(":button").on('click', function(evt){
            evt.preventDefault();
            // console.log("inside track request");
            // console.log("This service request ID is: ");
            // console.log(this.children[0].innerText);
            var serviceRequestId = this.children[0].innerText;
            // Track a request
            var nowTracking = $.post("/users/" + userId + "/requests", {request: {service_id: serviceRequestId, notes: ""}});

            $(this).attr("id", "tracked");
            // this.removeAttribute("id");
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
    console.log("inside the render failure function")
    this.housingData.innerHTML = "API could not find address";
  },

  renderServiceRequest: function(){
    console.log("Inside the renderServiceRequest function")
    console.log(this.specificRequestData);
    console.dir(this.model.specificRequest);
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
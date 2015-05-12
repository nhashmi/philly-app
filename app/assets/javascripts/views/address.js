var AddressView = function(addressModel){
  console.log("Inside the AddressView constructor function");
  this.housingData = document.querySelector(".housing-data");
  this.open311Data = document.querySelector(".open311-data");
  console.log("this.housingData is " + this.housingData);
  this.model = addressModel;
  console.log("this.model is" + this.model);
  console.log("rendering...")
  // this.render()
}

AddressView.prototype = {

  render: function(){
    console.log("Inside the render function")
    console.log(this.housingData);
    // this.housingData.innerHTML = "Property ID: " + this.model.propertyId;
    console.log("Now console.dir this.model.serviceRequests")
    console.dir(this.model.serviceRequests)
    console.log("this.model.serviceRequests.length = " + this.model.serviceRequests.length);
    var requestsRendered = 0
    for (var i = 0; i < this.model.serviceRequests.length && requestsRendered < 20; i++) {
      var unix_timestamp = this.model.serviceRequests[i].date_created
      console.log("Unix time: " + unix_timestamp)
      var dateCreated = new Date(unix_timestamp * 1000); // moment.js will do this, but keeping it in for clarity
      var dateString = moment(dateCreated).calendar()
      // Add info to card
        $(this.open311Data).append('<div class="card card' + requestsRendered + '"></div>');
        // Default image
        if (this.model.serviceRequests[i].image_thumbnail === "") {this.model.serviceRequests[i].image_thumbnail = "https://c3.staticflickr.com/3/2160/2457815776_38b3a10fa8_b.jpg"};
        $(".card" + requestsRendered).append('<div class="card-image"><div class="ribbon-box"><img src="' + this.model.serviceRequests[i].image_thumbnail + '" alt="Photo of service request"><div class="ribbon-wrapper"><div class="ribbon">' + this.model.serviceRequests[i].status + '</div></div></div></div>');
        if (this.model.serviceRequests[i].status === "in progress") {$(".ribbon").last().css("background-color", "#FACF08")};
        $(".card" + requestsRendered).append('<div class="card-header"> ' + dateString + ' one of your neighbors reported: ' + this.model.serviceRequests[i].title + '</div>');
        if (this.model.serviceRequests[i].description === "") { this.model.serviceRequests[i].description = "No description provided." }
        $(".card" + requestsRendered).append('<div class="card-copy">' + 
            '<p>' + 
              this.model.serviceRequests[i].description + 
            '</p>' + 
            '<button id="get-in-touch">Get in touch</button>' + 
            '<button id="track-request">Track request</button>' + 
          '</div>');
      requestsRendered++ 
    };
  },

  renderFailure: function(){
    console.log("inside the render failure function")
    this.housingData.innerHTML = "API could not find address";
  }
}
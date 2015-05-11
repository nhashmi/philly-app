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
      var dateCreated = new Date(unix_timestamp * 1000);
      // Add info to card
        // <div class="card">
        $(this.open311Data).append('<div class="card card' + requestsRendered + '"></div>');
        // Default image
        if (this.model.serviceRequests[i].image_thumbnail === "") {this.model.serviceRequests[i].image_thumbnail = "https://c3.staticflickr.com/3/2160/2457815776_38b3a10fa8_b.jpg"};
        $(".card" + requestsRendered).append('<div class="card-image"><img src="' + this.model.serviceRequests[i].image_thumbnail + '" alt="Photo of service request"></div>');
          // <div class="card-image">
          //   <img src="https://raw.githubusercontent.com/thoughtbot/refills/master/source/images/mountains-3.png" alt="">
          // </div>
        $(".card" + requestsRendered).append('<div class="card-header">' + this.model.serviceRequests[i].title + '</div>');
          // <div class="card-header">
          //   The Last Card
          // </div>
        // Default description 
        if (this.model.serviceRequests[i].description === "") { this.model.serviceRequests[i].description = "No description provided." }
        $(".card" + requestsRendered).append('<div class="card-copy"><p>' + this.model.serviceRequests[i].description + '</p></div>');
          // <div class="card-copy">
          //   <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          // </div>
        // </div>
      // </div>




      // $(this.open311Data).append("<li>" + dateCreated + "&mdash;" + this.model.serviceRequests[i].address + ": " + this.model.serviceRequests[i].description + "</li>");
      // $(this.open311Data).append("<img src=" + this.model.serviceRequests[i].image_thumbnail + ">")
      requestsRendered++ 
    };
  },

  renderFailure: function(){
    console.log("inside the render failure function")
    this.housingData.innerHTML = "API could not find address";
  }
}
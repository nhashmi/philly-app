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
      $(this.open311Data).append("<li>" + dateCreated + "&mdash;" + this.model.serviceRequests[i].address + ": " + this.model.serviceRequests[i].description + "</li>");
      $(this.open311Data).append("<img src=" + this.model.serviceRequests[i].image_thumbnail + ">")
      requestsRendered++ 
    };
  },

  renderFailure: function(){
    console.log("inside the render failure function")
    this.housingData.innerHTML = "API could not find address";
  }
}
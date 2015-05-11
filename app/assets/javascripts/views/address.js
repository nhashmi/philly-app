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
    this.housingData.innerHTML = "Property ID: " + this.model.propertyId;
    console.log("Now console.dir this.model.serviceRequests")
    console.dir(this.model.serviceRequests)
    console.log("this.model.serviceRequests.length = " + this.model.serviceRequests.length);
    for (var i = 0; i < this.model.serviceRequests.length; i++) {
      $(this.open311Data).append("<li>" + this.model.serviceRequests[i].address + ": " + this.model.serviceRequests[i].description + "</li>")
    };
  },

  renderFailure: function(){
    console.log("inside the render failure function")
    this.housingData.innerHTML = "API could not find address";
  }
}
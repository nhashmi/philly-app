var Address = function() {
  console.log("Starting the Address constructor function")
  this.propertyId;
  console.log("Getting the property ID")
  this.getPropertyId();
  this.getOpen311();
  console.log("The property ID is: " + this.propertyId)
  console.log("Finished the Address constructor function")
}

Address.prototype = {

  getPropertyId: function(callback) {
    console.log("Inside getPropertyId")
    var streetAddress = $('.housing-data').data('streetaddress');
    var unit = $('.housing-data').data('unit')
    $.ajax({
      type: 'GET',
      dataType: 'json',
      url: "http://api.phila.gov/opa/v1.1/address/" + encodeURIComponent(streetAddress) + "/" + encodeURIComponent(unit) + "?format=json"
    }).done(function(response) {
      console.log("Successfully completed the ajax call. Now loading the property id");
      console.log("The response was: " + response);
      addressModel.loadPropertyData(response);
      console.log("Now rendering")
      // addressView.render();
    }).fail(function(response) {
      console.log("Could not retreive address")
      console.log("Now rendering a failed attempt")
      addressView.renderFailure();
    })
  },

  loadPropertyData: function(response) {
    console.log("Inside the loadPropertyData method");
    this.propertyId = response.data.properties[0].property_id;
    this.longitude = response.data.properties[0].geometry.x;
    this.latitude = response.data.properties[0].geometry.y;
    this.zipcode = response.data.properties[0].zip.slice(0,5)
    console.dir(this);
    console.log("this's propertyId is" + this.propertyId);
  },

  getOpen311: function(callback) {
    console.log("Inside getOpen311");
    $.ajax({
      type: 'GET',
      dataType: 'json',
      // url: "http://www.publicstuff.com/api/open311/requests.json?jurisdiction_id=philadelphia-pa&lat=" + encodeURIComponent(this.latitude) + "&long=" + encodeURIComponent(this.longitude)
      url: "http://www.publicstuff.com/api/open311/requests.json?jurisdiction_id=philadelphia-pa&zipcode=" + encodeURIComponent(this.zipcode)
    }).done(function(response) {
      console.dir(response);
      addressModel.load311Data(response);
      console.log("Now rendering")
      addressView.render();
    }).fail(function(response) {
      console.log("Could not retreive 311 calls");
    })
  }, 

  load311Data: function(response) {
    console.log("Inside the load311Data method");
    this.serviceRequests = [];
    b = response
    for (var i = 0; i < response.length; i++) {
      var serviceRequest = response[i];
      this.serviceRequests.push(serviceRequest);
    }
    console.dir(this.serviceRequests)
  }

}
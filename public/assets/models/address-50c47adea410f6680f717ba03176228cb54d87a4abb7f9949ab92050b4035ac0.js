var Address = function() {
  console.log("Starting the Address constructor function")
  this.propertyId;
  console.log("Getting the property ID")
  if (window.location.pathname.includes('addresses')){
    this.getPropertyData();
    this.getOpen311();
  }
  if (window.location.pathname.includes('requests')){
    this.getServiceRequest();  
  }
  console.log("The property ID is: " + this.propertyId);
  console.log("Finished the Address constructor function");
}

Address.prototype = {

  getPropertyData: function(callback) {
    console.log("Inside getPropertyData");
    var streetAddress = $('.housing-data').data('streetaddress');
    var unit = $('.housing-data').data('unit');
    console.log("URL: " + "https://api.phila.gov/opa/v1.1/address/" + encodeURIComponent(streetAddress) + "/" + encodeURIComponent(unit) + "?format=json")
    $.ajax({
      type: 'GET',
      dataType: 'json',
      url: "https://api.phila.gov/opa/v1.1/address/" + encodeURIComponent(streetAddress) + "/" + encodeURIComponent(unit) + "?format=json"
    }).done(function(response) {
      console.log("Successfully completed the ajax call. Now loading the property id");
      console.log("The response was: " + response);
      console.dir(response)
      addressModel.loadPropertyData(response);
      console.log("Now rendering")
      addressView.render();
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
      url : "https://www.publicstuff.com/api/2.0/requests_list?client_id=242&client_requests=1&limit=100&lat=" + encodeURIComponent(this.latitude) + "&lon=" + encodeURIComponent(this.longitude)
    }).done(function(response) {
      console.dir(response);
      addressModel.load311Data(response);
      console.log("Now rendering")
      addressView.render();
    }).fail(function(response) {
      console.log("Could not retreive 311 calls");
      addressView.renderFailure();
    })
  }, 

  load311Data: function(response) {
    console.log("Inside the load311Data method");
    this.serviceRequests = [];
    var allRequests = response.response.requests
    // var searchRadius = 0.025; 
    for (var i = 0; i < allRequests.length; i++) {
      // if (allRequests[i] === undefined) {continue;}
      var serviceRequest = allRequests[i].request //.request;
      console.dir(serviceRequest);
      // if (serviceRequest.lat > this.latitude - searchRadius && serviceRequest.lat < this.latitude + searchRadius && serviceRequest.lon > this.longitude - searchRadius && serviceRequest.lon < this.longitude + searchRadius){
        this.serviceRequests.push(serviceRequest);
    }
  },

  getServiceRequest: function(callback) {
    console.log("Inside getServiceRequest");
    var requestClasses = $(".specific-request")
    console.dir(requestClasses)
    requestClass = $(requestClasses)[0].classList[1]
    console.dir(requestClass)
    regexpId = /[0-9]+/;
    var requestId = requestClass.match(regexpId);
    console.log("The requestId is " + requestId);
    $.ajax({
      type: 'GET',
      dataType: 'json',
      url: "https://www.publicstuff.com/api/2.0/request_view?return_type=json&request_id=" + requestId 
    }).done(function(response) {
      console.dir(response);
      addressModel.loadServiceRequest(response);
      console.log("Now rendering")
      addressView.renderServiceRequest();
    }).fail(function(response) {
      console.log("Could not retreive this 311 service request.");
      addressView.renderServiceRequestFailure();
    })
  }, 

  loadServiceRequest: function(response) {
    console.log("Inside the loadServiceRequest method");
    this.specificRequest = response.response
    console.dir(this.specificRequest);
  }

}

var Address = function() {
  this.propertyId;
  // Addresses show 
  if (window.location.pathname.includes('addresses')){
    this.getPropertyData();
    this.getOpen311();
  }
  // Request pages
  if (window.location.pathname.includes('requests')){
    this.getServiceRequest();  
  }
}

Address.prototype = {

  getPropertyData: function(callback) {
    var streetAddress = $('.housing-data').data('streetaddress');
    var unit = $('.housing-data').data('unit');
    $.ajax({
      type: 'GET',
      dataType: 'json',
      url: "https://api.phila.gov/opa/v1.1/address/" + encodeURIComponent(streetAddress) + "/" + encodeURIComponent(unit) + "?format=json"
    }).done(function(response) {
      addressModel.loadPropertyData(response);
      addressView.render();
    }).fail(function(response) {
      addressView.renderFailure();
    })
  },

  loadPropertyData: function(response) {
    this.propertyId = response.data.properties[0].property_id;
  },

  getOpen311: function(callback) {
    $.ajax({
      type: 'GET',
      dataType: 'json',
      // The API is supposed to support latitude and longtitude parameters,
      // but as of May 15, 2015 it returns the same results regardless of 
      // coordinates and search radius entered. 
      url : "https://www.publicstuff.com/api/2.0/requests_list?client_id=242&client_requests=1&limit=400"
    }).done(function(response) {
      addressModel.load311Data(response);
      addressView.render();
    }).fail(function(response) {
      addressView.renderFailure();
    })
  }, 

  load311Data: function(response) {
    this.serviceRequests = [];
    var allRequests = response.response.requests 
    for (var i = 0; i < allRequests.length; i++) {
      var serviceRequest = allRequests[i].request
        this.serviceRequests.push(serviceRequest);
    }
  },

  getServiceRequest: function(callback) {
    // Fetch the service request ID from each card
    // and get more information about each request
    var requestClasses = $(".specific-request")
    requestClass = $(requestClasses)[0].classList[1]
    regexpId = /[0-9]+/;
    var requestId = requestClass.match(regexpId);
    $.ajax({
      type: 'GET',
      dataType: 'json',
      url: "https://www.publicstuff.com/api/2.0/request_view?return_type=json&request_id=" + requestId 
    }).done(function(response) {
      addressModel.loadServiceRequest(response);
      addressView.renderServiceRequest();
    }).fail(function(response) {
      addressView.renderServiceRequestFailure();
    })
  }, 

  loadServiceRequest: function(response) {
    this.specificRequest = response.response
  }

}
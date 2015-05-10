// var Trillo = function(){
//   this.cards = []
//   this.fetchCards();
// }

var Address = function() {
  console.log("Starting the Address constructor function")
  this.propertyId;
  console.log("Getting the property ID")
  this.getPropertyId();
  console.log("The property ID is: " + this.propertyId)
  console.log("Finished the Address constructor function")
}

Address.prototype = {

  getPropertyId: function(callback) {
    console.log("Inside getPropertyId")
    // a = "http://api.phila.gov/opa/v1.1/address/" + $('housing-data').data('streetAddress') + "/" + $('housing-data').data('unit') + "?format=json"
    streetAddress = $('.housing-data').data('streetaddress'); // make local
    unit = $('.housing-data').data('unit') //.toString();  make local
    url = "http://api.phila.gov/opa/v1.1/address/" + encodeURIComponent(streetAddress) + "/" + encodeURIComponent(unit) + "?format=json"
    $.ajax({
      type: 'GET',
      dataType: 'json',
      // url: "http://api.phila.gov/opa/v1.1/address/2001%20Hamilton%20St/503?format=json" 
      url: "http://api.phila.gov/opa/v1.1/address/" + streetAddress + "/" + unit + "?format=json"
    }).done(function(response) {
      console.log("Successfully completed the ajax call. Now loading the property id");
      console.log("The response was: " + response);
      addressModel.loadPropertyId(response);
      console.log("Now rendering")
      addressView.render();
    }).fail(function(response) {
      console.log("Could not retreive address")
      console.log("Now rendering a failed attempt")
      addressView.renderFailure();
    })
  },

  loadPropertyId: function(response) {
    console.log("Inside the loadPropertyId method");
    this.propertyId = response.data.properties[0].property_id;
    console.log("This is " + this);
    console.log("this's propertyId is" + this.propertyId);
  }

}

// Trillo.prototype = {
//   fetchCards: function(callback) {
//     $.ajax({
//       type: 'GET',
//       dataType: 'json',
//       url: "http://localhost:3000/cards"
//     }).done(function(response) {
//       trilloModel.loadCards(response);
//       trilloView.render();
//     }).fail(function(response){
//       console.log("js failed to load")
//     })
//   },
//   loadCards: function(response) {
//     this.cards = [];
//     for(var i = 0; i < response.length; i++){
//       var card = new Card(response[i].id, response[i].description, response[i].completed);
//       this.cards.push(card);
//     }
//   }

// }

//   console.log("hello from js");

//   function getHousingData(){

//     $.ajax({
//       // url: "http://api.phila.gov/opa/v1.1/address/" + <%= @address_encoded %> + "/" + <%= @unit_encoded %> + "?format=json",
//       url: "http://api.phila.gov/opa/v1.1/address/2001%20Hamilton%20St/503?format=json",
//       type: "GET"
//     }).done(function(response){
//       render(response);
//     }).fail(function(){
//       render_failure();
//     });

//   }

//   function render(response){
//     var housingData = $(".housing-data")[0];
//     console.log("response = " + response);
//     housingData.innerHTML = response.data.properties[0].property_id
//     globalResponse = response.data.properties[0].property_id; // delete
//   }

//   function render_failure(){
//     var housingData = $(".housing-data")[0];
//     housingData.innerHTML = "Sorry, we could not find that adddress."
//   }

//   getHousingData();

  // http://api.phila.gov/opa/v1.1/address/123%20S%20broad/1?format=json
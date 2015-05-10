var AddressView = function(addressModel){
  console.log("Inside the AddressView constructor function");
  this.housingData = document.querySelector(".housing-data");
  console.log("this.housingData is " + this.housingData);
  this.model = addressModel;
  console.log("this.model is" + this.model);
  console.log("rendering...")
  this.render()
}

AddressView.prototype = {

  render: function(){
    console.log("Inside the render function")
    console.log(this.housingData);
    // this.housingData.innerHTML = "";
    this.housingData.innerHTML = this.model.propertyId;
  },

  renderFailure: function(){
    console.log("inside the render failure function")
    this.housingData.innerHTML = "API could not find address";
  }
}

// var TrilloView = function(trilloModel){
//   var newCardButton = document.querySelector("#new-card-button")
//   this.newCardText = document.querySelector("#new-card-text")
//   this.toDoList = document.querySelector("#todo-column .card-list")
//   this.doneList = document.querySelector("#completed-column .card-list")
//   this.model = trilloModel
//   newCardButton.addEventListener("click", this.addCard.bind(this))
//   this.render()
// }

// TrilloView.prototype = {
//   addCard: function(event){
//     event.preventDefault();
//     var description = this.newCardText.value;
//     var card = new Card(null, description, false);
//     card.save();
//     this.render()
//   },
//   render: function(){
//     this.toDoList.innerHTML = ""
//     this.doneList.innerHTML = ""
//     for(var i = 0; i < this.model.cards.length; i++){
//       var cardView = new CardView(this.model.cards[i])
//       if(this.model.cards[i].completed){
//         this.doneList.appendChild(cardView)
//       }
//       else{
//         this.toDoList.appendChild(cardView)
//       }
//     }
//   }
// }
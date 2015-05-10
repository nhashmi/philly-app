$(document).ready(function(){
  console.log("The document is ready")
  console.log("Creating a new Address")
  addressModel = new Address();
  console.log("Created a new Address")
  console.log("Creating a new AddressView")
  addressView = new AddressView(addressModel);
  console.log("Created a new AddressView")
})
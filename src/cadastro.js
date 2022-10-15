function createStates(){

  fetch('./src/brazil-states.json')
    .then((response) => response.json())
    .then((json) => {

      var options = "<option class=\"option\" value='0'>Selecionar</option>"

      for(var i=1; i < json.length ; i++){
        options += "<option class=\"option\" value='"+i+"'>"+json[i].nome+"</option>"
      }
      document.getElementById('states').innerHTML = options;
      });
}

// if (typeof(Storage) !== "undefined") {
//   // Store
//   sessionStorage.setItem("lastname", "Smith");
//   // Retrieve
//   document.getElementById("result").innerHTML = sessionStorage.getItem("lastname");
// } else {
//   document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
// }
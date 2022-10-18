// Contains funtion to encrypt password
var crypt = {
  secret : "CIPHERKEY",   
  encrypt : (string) => {
    var cipher = CryptoJS.AES.encrypt(string, crypt.secret);
    return cipher.toString();
  } 
};

// Populate select component with Brazil States names
function createStates(){

  fetch('./json/brazil-states.json')
    .then((response) => response.json())
    .then((json) => {

      var options = `<option class="option" disabled selected value>Selecionar</option>`

      for(var i=1; i < json.length ; i++){
        options += `<option class="option" value='${i}'>${json[i].nome}</option>`
      }
      document.getElementById('estado').innerHTML = options;
      });
}

// Verify if password and confirmPassword match
function validatePassword(){
  if(senha.value != confirmarSenha.value) {
    confirmarSenha.setCustomValidity("As senhas devem ser iguais");
  } else {
    confirmarSenha.setCustomValidity('');
  }
}

// Runs when the DOM content is loaded
document.addEventListener("DOMContentLoaded", () => {

  var senha = document.getElementById("senha");
  var confirmarSenha = document.getElementById("confirmarSenha");
  senha.onchange = validatePassword;
  confirmarSenha.onkeyup = validatePassword;


  // Saves Email and Password in sessionStorage
  const signupForm = document.querySelector("#signup");

  signupForm.addEventListener("submit", e => {
    e.preventDefault();

    const email = document.getElementById("email").value
    const senha = document.getElementById("senha").value
    const senhaCripto = crypt.encrypt(senha);

    sessionStorage.setItem("email", email);
    sessionStorage.setItem("senha", senhaCripto);
    
    window.location.href= "./../../index.html";
  });

});
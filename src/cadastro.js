var crypt = {

  secret : "CIPHERKEY", 
  
  encrypt : (string) => {
    var cipher = CryptoJS.AES.encrypt(string, crypt.secret);
    return cipher.toString();
  } 
};

function createStates(){

  fetch('./src/brazil-states.json')
    .then((response) => response.json())
    .then((json) => {

      var options = "<option disabled selected value>Selecionar</option>"

      for(var i=1; i < json.length ; i++){
        options += "<option class=\"option\" value='"+i+"'>"+json[i].nome+"</option>"
      }
      document.getElementById('estado').innerHTML = options;
      });
}

function setFormMessage(formElement, type, message) {
  const messageElement = formElement.querySelector(".form__message");

  messageElement.textContent = message;
  messageElement.classList.remove("form__message--success", "form__message--error");
  messageElement.classList.add(`form__message--${type}`);
}

function validarSenha(){
  if(senha.value != confirmarSenha.value) {
    confirmarSenha.setCustomValidity("As senhas devem ser iguais");
  } else {
    confirmarSenha.setCustomValidity('');
  }
}

document.addEventListener("DOMContentLoaded", () => {

  var senha = document.getElementById("senha");
  var confirmarSenha = document.getElementById("confirmarSenha");
  senha.onchange = validarSenha;
  confirmarSenha.onkeyup = validarSenha;

  const signupForm = document.querySelector("#signup");

  signupForm.addEventListener("submit", e => {
    e.preventDefault();

    const email = document.getElementById("email").value
    const senha = document.getElementById("senha").value
    const senhaCripto = crypt.encrypt(senha);

    sessionStorage.setItem("email", email);
    sessionStorage.setItem("senha", senhaCripto);
    
    window.location.href= "./index.html";
  });

});
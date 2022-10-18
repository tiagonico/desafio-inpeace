// Contains funtion to decrypt password
var crypt = {
  secret : "CIPHERKEY", 
 
  decrypt : (cipher) => {
    var decipher = CryptoJS.AES.decrypt(cipher, crypt.secret);
    return decipher.toString(CryptoJS.enc.Utf8);
  }
};

// Modifies a form element
function setFormMessage(formElement, type, message) {
  const messageElement = formElement.querySelector(".form__message");

  messageElement.textContent = message;
  messageElement.classList.add(`form__message--${type}`);
}

// Runs when the DOM content is loaded
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector("#login");

  // Verifies if email and password matches with email and password in sessionStore
  loginForm.addEventListener("submit", e => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    const emailStorage = sessionStorage.getItem("email");
    const senhaStorage = sessionStorage.getItem("senha");
    
    if(email == emailStorage && senha == crypt.decrypt(senhaStorage)){
      window.location.href= "/pages/lista-usuarios/lista-usuarios.html";
    }else{
      setFormMessage(loginForm, "error", "Email ou senha incorretos");
    }   
  });
});
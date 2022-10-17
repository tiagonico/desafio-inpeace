var crypt = {

  secret : "CIPHERKEY", 
 
  decrypt : (cipher) => {
    var decipher = CryptoJS.AES.decrypt(cipher, crypt.secret);
    return decipher.toString(CryptoJS.enc.Utf8);
  }
};

function setFormMessage(formElement, type, message) {
  const messageElement = formElement.querySelector(".form__message");

  messageElement.textContent = message;
  messageElement.classList.remove("form__message--success", "form__message--error");
  messageElement.classList.add(`form__message--${type}`);
}


document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector("#login");

  loginForm.addEventListener("submit", e => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    const emailStorage = sessionStorage.getItem("email");
    const senhaStorage = sessionStorage.getItem("senha");

    
    if(email == emailStorage && senha == crypt.decrypt(senhaStorage)){
      window.location.href= "./lista-usuarios.html";
    }else{
      setFormMessage(loginForm, "error", "Email ou senha incorretos");
    }
   
  });

});
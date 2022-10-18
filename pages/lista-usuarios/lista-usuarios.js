var modalId;

function hideLoading() {
  var loader = document.getElementById("preloader");
  loader.style.display = "none"
};

function showLoading() {
  var loader = document.getElementById("preloader");
  loader.style.display = "flex"
};

function openModal(id) {

  modalId = id;
  var modal = document.getElementById("myModal");
  
  var span = document.getElementsByClassName("close")[0];
  span.onclick = function () {
    modal.style.display = "none";
  }
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

  var emailModal = document.getElementById("email-modal");
  emailModal.value = document.getElementById("email-"+id).textContent;

  var nomeModal = document.getElementById("nome-modal");
  nomeModal.value = document.getElementById("name-"+id).textContent;

  modal.style.display = "flex";
};

function changeUser(){
  var modal = document.getElementById("myModal");

  var nome = document.getElementById("nome-modal").value;
  var email = document.getElementById("email-modal").value;

  document.getElementById("name-"+modalId).textContent = nome;
  document.getElementById("email-"+modalId).textContent = email;

  modal.style.display = "none";
}

function setData(page) {
  axios.get('https://reqres.in/api/users?page=' + page).then(res => {

    var data = res.data.data

    var htmlCode = "<div class='parent'>"

    for (var i = 0; i < data.length; i++) {
      htmlCode += `
          <div class='child'>
            <div class="container">
              <div class="item item__button">
                <input onclick="openModal(${i})" id=${"button-" + i} type="image" src="/assets/edit-icon.png" class="button__edit"></button>
              </div>
              <div class="item">
                <img class="img" src="${data[i].avatar}">
              </div>
              <div class="item" style="padding: 10px;">
                <label id="${"name-" + i}" class="label__name">${data[i].first_name + " " + data[i].last_name}</label>
              </div>
              <div class="item" style="padding-bottom: 20px;">
                <label id="${"email-" + i}" class="label__email">${data[i].email}</label> 
              </div>              
            </div>
          </div>
        `
    }
    document.getElementById('upper-div').innerHTML = htmlCode;

    setTimeout(() => { hideLoading() }, 2000);

  })
};

function backButton() {
  setData(1);
  document.getElementById('label-footer').innerHTML = 'Mostrando de 1 a 6'
};

function forwardButton() {
  setData(2);
  document.getElementById('label-footer').innerHTML = 'Mostrando de 7 a 12'
};

/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
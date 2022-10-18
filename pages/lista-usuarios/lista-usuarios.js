// Global variable to store the ID of the user to be modified
var modalId;

// Hide the loading animation
function hideLoading() {
  var loader = document.getElementById("preloader");
  loader.style.display = "none"
};

// Show the loading animation
function showLoading() {
  var loader = document.getElementById("preloader");
  loader.style.display = "flex"
};

// Open modal passing the userId
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

  var nameModal = document.getElementById("name-modal");
  nameModal.value = document.getElementById("name-"+id).textContent;

  modal.style.display = "flex";
};

// Change user name and email
function changeUser(){
  var modal = document.getElementById("myModal");

  var name = document.getElementById("name-modal").value;
  var email = document.getElementById("email-modal").value;

  document.getElementById("name-"+modalId).textContent = name;
  document.getElementById("email-"+modalId).textContent = email;

  modal.style.display = "none";
}

// Set user cards according to the passing page (1 or 2)
function setData(page) {
  axios.get('https://reqres.in/api/users?page=' + page).then(res => {

    var data = res.data.data

    var htmlCode = "<div class='parent'>"

    for (var i = 0; i < data.length; i++) {
      htmlCode += `
          <div class='child'>
            <div class="container">
              <div class="item item__button">
                <input onclick="openModal(${i})" id=${"button-" + i} type="image" src="/assets/edit-icon.png" class="edit-button"></button>
              </div>
              <div class="item">
                <img class="img" src="${data[i].avatar}">
              </div>
              <div class="item" style="padding: 10px;">
                <label id="${"name-" + i}" class="name-label">${data[i].first_name + " " + data[i].last_name}</label>
              </div>
              <div class="item" style="padding-bottom: 20px;">
                <label id="${"email-" + i}" class="email-label">${data[i].email}</label> 
              </div>              
            </div>
          </div>
        `
    }
    document.getElementById('upper-div').innerHTML = htmlCode;

    // 2 seconds delay, just to show the loading screen
    setTimeout(() => { hideLoading() }, 2000);
  })
};

// Set user cards with data of page 1
function backButton() {
  setData(1);
  document.getElementById('label-footer').innerHTML = 'Mostrando de 1 a 6'
  document.getElementById('forwardButton').style.visibility = 'visible'
  document.getElementById('backButton').style.visibility = 'hidden'
};

// Set user cards with data of page 2
function forwardButton() {
  setData(2);
  document.getElementById('label-footer').innerHTML = 'Mostrando de 7 a 12'
  document.getElementById('forwardButton').style.visibility = 'hidden'
  document.getElementById('backButton').style.visibility = 'visible'
};

// When the user clicks on the button, toggle between hiding and showing the dropdown content 
function toggleDropdown() {
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
const hideLoading = () => {
  var loader = document.getElementById("preloader");
  loader.style.display = "none"
}

const showLoading = () => {
  var loader = document.getElementById("preloader");
  loader.style.display = "flex"
}

const getData = () => {
  axios.get('https://reqres.in/api/users').then(res => {
 
    var data = res.data.data
    
    var htmlCode = "<div class='parent'>"

      for(var i=0; i < data.length ; i++){
        htmlCode += `
          <div class='child'>
            <div class="container">
              <div class="item item__button">
                <input type="image" src="/assets/edit-icon.png" class="button__edit"></button>
              </div>
              <div class="item">
                <img class="img" src="${data[i].avatar}">
              </div>
              <div class="item" style="padding: 10px;">
                <label class="label__name">${data[i].first_name + " " + data[i].last_name}</label>
              </div>
              <div class="item" style="padding-bottom: 20px;">
                <label class="label__email">${data[i].email}</label> 
              </div>              
            </div>
          </div>
        `
      }
      document.getElementById('upper-div').innerHTML = htmlCode;

      setTimeout(() => { hideLoading() }, 2000);
      
  })
};





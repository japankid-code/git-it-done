let userFormEl = document.getElementById("user-form");
let nameInputEl = document.getElementById("username");

const getUserRepos = function(user) {
    // format the github api url
    let apiUrl = `https://api.github.com/users/${user}/repos`

    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            console.log(data);
        })
  });
}

const formSubmitHandler = function(e) {
    e.preventDefault();
    // get the val from the input element
    let username = nameInputEl.value.trim();
    if (username) {
        getUserRepos(username);
        nameInputEl.value = '';
    } else {
        alert("Please enter a Github username");
    }
}


userFormEl.addEventListener("submit", formSubmitHandler);

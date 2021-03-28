let userFormEl = document.getElementById("user-form");
let nameInputEl = document.getElementById("username");
let repoContainerEl = document.getElementById("repos-container");
let repoSearchTerm = document.getElementById("repo-search-term");

const getUserRepos = function(user) {
    // format the github api url
    let apiUrl = `https://api.github.com/users/${user}/repos`
    fetch(apiUrl)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    renderRepos(data, user);
                });
            } else {
                alert(`ERROR: there was a problem with your request!`);
            }
        })
        .catch(function(error) {
            alert("Unable to connect to Github");
        })
  };


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

const renderRepos = function(repos, searchTerm) {
    repoContainerEl.textContent = '';
    repoSearchTerm.textContent = searchTerm;
    if (repos.length === 0) {
        repoContainerEl.textContent = "no repos found.";
        return;
    }
    for (let i = 0; i < repos.length; i++) {
        // format repo name
        let repoName = `${repos[i].owner.login}/${repos[i].name}`;
        // create a container for each repo
        let repoEl = document.createElement("div");
        repoEl.classList = "list-item flex-row justify-space-between align-center";
        // create span ele to hold repo name
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;
        repoEl.appendChild(titleEl);
        repoContainerEl.appendChild(repoEl);

        // display repo issues
        let statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";
        if (repos[i].open_issues_count > 0) {
            statusEl.innerHTML = `<i class='fas fa-times status-icon icon-danger'></i>${repos[i].open_issues_count} issue(s)`;  
        } else {
            statusEl.innerHTML = `<i class='fas fa-check-square status-icon icon-success'></i>`
        }
        repoEl.appendChild(statusEl);
    }
}

userFormEl.addEventListener("submit", formSubmitHandler);

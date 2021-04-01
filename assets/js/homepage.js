const userFormEl = document.getElementById("user-form");
const nameInputEl = document.getElementById("username");
const repoContainerEl = document.getElementById("repos-container");
const repoSearchTerm = document.getElementById("repo-search-term");
const languageButtonsEl = document.getElementById("language-buttons");

const buttonClickHandler = (e) => {
    let language = e.target.getAttribute("data-language");
    if (language) {
        getFeaturedRepos(language);
        // clear old content
        repoContainerEl.textContent = '';
    }
}

const getUserRepos = function(user) {
    // format the github api url
    let apiUrl = `https://api.github.com/users/${user}/repos`
    fetch(apiUrl)
        .then(response => response.ok ? 
            (response.json().then(data => renderRepos(data, user)))
            :(alert(`ERROR: there was a problem with your request!`))
        .catch(function(error) {
            alert("Unable to connect to Github");
        }))

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

const getFeaturedRepos = function(language) {
    let apiUrl = `https://api.github.com/search/repositories?q=${language}+is:featured&sort=help-wanted-issues`
    fetch(apiUrl).
        then(response => response.ok ? 
            (response.json().then(dataObj => renderRepos(dataObj.items, language)))
            :(alert(`error! ${response.statusText}`)))
        
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
        let repoEl = document.createElement("a");
        repoEl.classList = "list-item flex-row justify-space-between align-center";
        repoEl.setAttribute("href", `./single-repo.html?repo=${repoName}`)
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
languageButtonsEl.addEventListener("click", buttonClickHandler);
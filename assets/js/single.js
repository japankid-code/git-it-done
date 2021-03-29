let issueContainerEl = document.getElementById("issues-container");
var limitWarningEl = document.getElementById("limit-warning");


const getRepoIssues = function(repo) {
    let apiUrl = `https://api.github.com/repos/${repo}/issues?direction=asc`;

    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                renderIssues(data);
                if (response.headers.get("Link")) {
                    displayWarning(repo);
                }
            });
        } else {
            alert(`ERROR: there was a problem with your request!`);
        }
    });
}

const renderIssues = function(issues) {
    if (issues.length === 0) {
        issueContainerEl.textContent = "This repo has no open issues!";
        return;
    }
    for (let i = 0; i < issues.length; i++) {
        // create a link element to take users to the issue on github
        let issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute("href", issues[i].html_url);
        issueEl.setAttribute("target", "_blank");
        // create span to hold issue title
        let titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;
        issueEl.appendChild(titleEl);
        // create type element
        let typeEl = document.createElement("span");
        if (issues[i].pull_request) {
            typeEl.textContent = "(PR)";
        } else {
            typeEl.textContent = "(issue)";
        }
        issueEl.appendChild(typeEl);
        issueContainerEl.appendChild(issueEl);
    }
}

var displayWarning = function(repo) {
    // add text to warning container
    limitWarningEl.textContent = "To see more than 30 issues, visit ";
    // create a link for it to github
    let linkEl = document.createElement("a");
    linkEl.textContent = "See More Issues on GitHub.com";
    linkEl.setAttribute("href", `https://github.com/${repo}/issues`);
    linkEl.setAttribute("target", "_blank");
    // append to warning container
    limitWarningEl.appendChild(linkEl);
};

getRepoIssues("facebook/react");
const getRepoIssues = function(repo) {
    let apiUrl = `https://api.github.com/repos/${repo}/issues?direction=asc`;

    fetch(apiUrl).then(function() {
        if (response.ok) {
            response.json().then(function(data) {
                renderRepos(data, user);
            });
        } else {
            alert(`ERROR: there was a problem with your request!`);
        }
    });
}

getRepoIssues("facebook/react");
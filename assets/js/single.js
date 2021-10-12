var issueContainerEl = document.querySelector('#issues-container');

var getRepoIssues = function (repo) {
    console.log(repo)
    var apiUrl = 'https://api.github.com/repos/' + repo + '/issues?direction=asc';
    fetch(apiUrl).then(function (response) {
        //When request is successful
        if (response.ok) {
            response.json().then(function (data) {
                displayIssues(data);
            });
        }
        else {
            alert('There was a problem with your request!');
        }
    });
};

getRepoIssues('facebook/react');

var displayIssues = function(issues) {

    //Check to see if there are any issues
    if (issues.length === 0) {
        issueContainerEl.textContent = 'This repo has no open issues!';
        return;
      }

    for (var i = 0; i < issues.length; i++) {
        //Create a link element to take users to the issues on github
        var issueEl = document.createElement('a');
        issueEl.classList = 'list-item flex-row justify-space-between align-center';
        issueEl.setAttribute('href', issues[i].html_url);
        issueEl.setAttribute('target', '_blank');

        //Create a span to hold the title
        var titleEl = document.createElement('span');
        titleEl.textContent = issues[i].title;

        //Append to the container
        issueEl.appendChild(titleEl);

        //Create a type element
        var typeEl = document.createElement('span');

        //Check to see if an issue is an actual issue or a pull request
        if (issues[i].pull_request) {
            typeEl.textContent = '(Pull Request)';
        }
        else {
            typeEl.textContent = '(Issue)';
        }

        //Append to the container
        issueEl.appendChild(typeEl);
        issueContainerEl.appendChild(issueEl);
    }
}
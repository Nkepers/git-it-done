var userFormEl = document.querySelector('#user-form');
var nameInputEl = document.querySelector('#username');
var repoContainerEl = document.querySelector('#repos-container');
var repoSearchTerm = document.querySelector('#repo-search-term');

//Executes when a form is submitted
var formSubmitHandler = function (event) {
    event.preventDefault();
    //Get the value from the user input element
    var username = nameInputEl.value.trim();

    if (username) {
        getUserRepos(username);
        nameInputEl.value = "";
    }
    else[
        alert('Please enter a GitHub username')
    ]
};

//This function will be used to display the repo's!
var displayRepos = function (repos, searchTerm) {
    console.log(repos);
    console.log(searchTerm);

    //Check if the API returned any repos
    if (repos.length === 0) {
        repoContainerEl.textContent = 'No repositories found.';
        return;
    }

    //Clear the old content
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;

    //Loop over the repos
    for (var i = 0; i < repos.length; i++) {
        //Format the repo name
        var repoName = repos[i].owner.login + '/' + repos[i].name;

        //Create container for each repo
        var repoEl = document.createElement('a');
        repoEl.classList = 'list-item flex-row justifiy-space-between align-center';
        repoEl.setAttribute('href', './single-repo.html');

        //Create a span element to hold repo name
        var titleEl = document.createElement('span');
        titleEl.textContent = repoName;

        //Append these to the container
        repoEl.appendChild(titleEl);

        //Create a status element
        var statusEl = document.createElement('span');
        statusEl.classList = 'flex-row align-center'

        //This will check if the current repos have issues or not
        if (repos[i].open_issues_count > 0) {
            statusEl.innerHTML = '<i class="fas fa-times status-icon icon-danger"></i>' + repos[i].open_issues_count + ' issue(s)';
        }
        else {
            statusEl.innerHTML = '<i class="fas fa-check-square status-icon icon-success"></i>';
        }

        //Append to the container
        repoEl.appendChild(statusEl);

        //Append the container to the DOM
        repoContainerEl.appendChild(repoEl);
    }
};

//This function gets the user's repo
var getUserRepos = function (user) {
    // format the github api url
    var apiUrl = 'https://api.github.com/users/' + user + '/repos';

    // make a request to the url
    fetch(apiUrl)
    .then(function(response) {
      // request was successful
      if (response.ok) {
        response.json().then(function(data) {
          displayRepos(data, user);
        });
      } else {
        alert('Error: GitHub User Not Found');
      }
    })
    .catch(function(error) {
      // Notice this `.catch()` getting chained onto the end of the `.then()` method
      alert("Unable to connect to GitHub");
    });
};

userFormEl.addEventListener('submit', formSubmitHandler);
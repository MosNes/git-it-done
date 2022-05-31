var userFormEl = document.getElementById("user-form");

var nameInputEl = document.getElementById("username");

var repoContainerEl = document.getElementById("repos-container");

var repoSearchTerm = document.getElementById("repo-search-term");

var formSubmitHandler = function(event){
    event.preventDefault();
    //get value from input element
    var username = nameInputEl.value.trim();

    if (username) {
        getUserRepos(username);
        nameInputEl.value = "";
    }
    else {
        alert("Please enter a GitHub username");
    }
    
};

var getUserRepos = function (user) {
    
    //format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    //fetch returns a Promise
    //.then executes whatever is in the parentheses when the Promise is fulfilled
    fetch(apiUrl).then(function(response) {

        //the .json() method returns another promise
        //.then will execute whenever the promise is fulfilled
        response.json().then(function(data) {
            displayRepos(data,user);
        });
    });
};

var displayRepos = function(repos,searchTerm) {
    //clear old content
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;

    //loop over repos
    for (var i = 0; i < repos.length; i++) {
        //format repo name
        var repoName = repos[i].owner.login + "/" + repos[i].name;
    }
};

userFormEl.addEventListener("submit", formSubmitHandler);

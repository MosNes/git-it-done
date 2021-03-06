var getRepoName = function() {
    //gets the ?repo=repo/name string from the URL
var queryString = document.location.search;

//splits the string at '=' and grabs 'repo/name'
var repoName = queryString.split("=")[1];

//selects container that will hold the repo name on the top of the page
var repoNameEl = document.getElementById("repo-name");

if (repoName){
    //adds the repo name to the top of the page
    repoNameEl.textContent = repoName;
    //calls function to display all the issues associated with the repo
    getRepoIssues(repoName);
}
//if query string not valid, redirect back to the home page
else{
    document.location.replace("./index.html");
}

};


var issueContainerEl = document.getElementById("issues-container");

var limitWarningEl = document.getElementById("limit-warning");

var getRepoIssues = function (repo) {
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";

    fetch(apiUrl).then(function (response) {
        //request was successful
        if (response.ok) {
            response.json().then(function (data) {
                //pass response to the dom function
                displayIssues(data);

                //check if api has paginated issues
                if (response.headers.get("Link")) {
                    displayWarning(repo);
                }
            });
        } else {
            //if not successful, redirect to home page
            document.location.replace("./index.html");
        }
    });
};

var displayIssues = function (issues) {

    if (issues.length === 0) {
        issueContainerEl.textContent = "This repo has no open issues!";
        return;
    }

    for (var i = 0; i < issues.length; i++) {
        //create a link element to take users to the issue on github
        var issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute("href", issues[i].html_url);
        //target="_blank" forces the browser to open a new tab instead of replacing the current webpage
        issueEl.setAttribute("target", "_blank");

        //create span element to hold title
        var titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;

        //append to container
        issueEl.appendChild(titleEl);

        //create a type element
        var typeEl = document.createElement("span");

        //check if issue is actual issue or pull request
        if (issues[i].pull_request) {
            typeEl.textContent = "(Pull request)";
        }else{
            typeEl.textContent = "(Issue)";
        }

        //append to container
        issueEl.appendChild(typeEl);

        //append to DOM
        issueContainerEl.appendChild(issueEl);
    }

};

var displayWarning = function(repo) {
    //add text to warning container
    limitWarningEl.textContent = "To see more than 30 issues, visit ";

    var linkEl = document.createElement("a");
    linkEl.textContent = "this repo on GitHub.com";
    linkEl.setAttribute("href","https://github.com/"+repo+"/issues");
    linkEl.setAttribute("target","_blank");

    //append to warning container
    limitWarningEl.appendChild(linkEl);
};

getRepoName();
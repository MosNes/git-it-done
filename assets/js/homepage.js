var userFormEl = document.getElementById("user-form");

var nameInputEl = document.getElementById("username");

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
            console.log(data);
        });
    });
};

userFormEl.addEventListener("submit", formSubmitHandler);

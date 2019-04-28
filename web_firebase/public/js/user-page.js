var justRegistered = false;

function toggleUserPageLayout() {
    var loginTab = document.getElementById("login_tab");
    var registerTab = document.getElementById("register_tab");

    if (loginTab.style.display === "block") {
        loginTab.style.display = "none";
        registerTab.style.display = "block";
    } else if (registerTab.style.display === "block") {
        loginTab.style.display = "block";
        registerTab.style.display = "none";
    }
}

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in. 

        document.getElementById("user_div").style.display = "block";
        document.getElementById("login_tab").style.display = "none";
        document.getElementById("register_tab").style.display = "none";

        var user = firebase.auth().currentUser;

        if (justRegistered) {
            // create display name for new user
            var firstName = document.getElementById("FirstName").value;
            var lastName = document.getElementById("LastName").value;
            var displayName;
            if (firstName === undefined || firstName === "") {
                displayName = lastName;
            } else {
                displayName = firstName + " " + lastName;
            }
            user.updateProfile({
                displayName: displayName
            }).then(function () {
                // Update successful.
                console.log("update profile succeeded!");
                console.log(JSON.stringify(user));

            }).catch(function (error) {
                // An error happened.
            });
            justRegistered = false;
        }

        if (user != null) {
            setTimeout(function () {
                window.location = '/dashboard';
            }, 3000);
        }
    } else {
        // No user is signed in.

        document.getElementById("user_div").style.display = "none";
        document.getElementById("login_div").style.display = "block";
    }
});

function login() {

    var userEmail = document.getElementById("email_field").value;
    var userPassword = document.getElementById("password_field").value;

    firebase.auth().signInWithEmailAndPassword(userEmail, userPassword).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert("Error: " + errorMessage);
    });
}

function logout() {
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
        window.location = '/';
    }).catch(function (error) {
        // An error happened.
    });
}

function register() {
    var email = document.getElementById('InputEmail').value;
    var password = document.getElementById('InputPassword').value;
    var repeatPassword = document.getElementById('RepeatPassword').value;
    if (email.length < 4) {
        alert('Please enter an email address.');
        return;
    }
    if (password.length < 4) {
        alert('Please enter a password.');
        return;
    }
    if (password !== repeatPassword) {
        alert('Please check your passwords are matched.');
        return;
    }
    // Sign in with email and pass.
    // [START createwithemail]
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/weak-password') {
            alert('The password is too weak.');
        } else {
            alert(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
    });
    justRegistered = true;
    // [END createwithemail]
}

window.onload = function () {
    document.getElementById("login_tab").style.display = "block";;
    document.getElementById("register_tab").style.display = "none";;
};
function initApp() {

    // TODO: populate user account info, post info, initialize dashboard page
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            // console.log("entered!");
            // console.log(user);
            document.getElementById("user_details").innerHTML = JSON.stringify(user);
            window.alert("okay");
        } else {
            // User is signed out.
        }

    });
    // var user = firebase.auth().currentUser;
    // window.alert("inside initApp()");
    // if (user != null) {
    //     window.alert(JSON.stringify(user));
    // }
}

window.onload = function () {


    initApp();
};

// var email_id = user.email;

//             document.getElementById("user_para").innerHTML = "Welcome user " + email_id;
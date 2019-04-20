function initApp() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            // console.log("entered!");
            // console.log(user);
            document.getElementById("user_details").innerHTML = JSON.stringify(user)

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
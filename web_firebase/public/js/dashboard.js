function logout() {
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
        window.location = '/';
    }).catch(function (error) {
        // An error happened.
    });
};

function convertTimeFormat(unixTimestamp) {
    // helper function to convert any unix timestamps into human readable format
    var date = new Date(unixTimestamp * 1000); // Javascript stores dates as milliseconds
    // // Hours part from the timestamp
    // var hours = date.getHours();
    // // Minutes part from the timestamp
    // var minutes = "0" + date.getMinutes();
    // // Seconds part from the timestamp
    // var seconds = "0" + date.getSeconds();
    // // Will display time in 10:30:23 format
    // var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    return date.toDateString();
}

function generatePostCard(dbEntry) {
    if (!dbEntry) {
        return null;
    } else {
        var displayTime = convertTimeFormat(dbEntry.data.adDate);
        var userID = dbEntry.data.idUser;
        // db.collection("user").
        var parser = new DOMParser();
        var domString =
            '<div class="row"><div class="col-lg-12 mb-4">' +
            '<div class="card shadow mb-4">' +
            '<div class="card-header py-3">' + '<h6 class="m-0 font-weight-bold text-primary">' + dbEntry.data().adTitle + '</h6>' + '</div>' +
            '<div class="card-body">' +
            '<div class="text-center">' +
            '<img class="img-fluid px-3 px-sm-4 mt-3 mb-4" style="width: 25rem;" src="img/undraw_posting_photo.svg" alt="">' +
            '</div>' +
            '<p>' + dbEntry.data().adDescription + '</p>' +
            '</div>' + '<div class="card-footer py-3">' +
            '<a target="_blank" rel="nofollow" href="#">Contact by Email &rarr;</a>' +
            '</div></div></div></div></div>';
        var newHtml = parser.parseFromString(domString, 'text/html');
        // var newElement = document.createElement('div');
        //     "</h1><h2>Category: " + doc.data().adCategory +
        //     "</h2><h2>Status: " + doc.data().adStatus +
        //     "</h2><h2>Price: " + doc.data().adPrice +
        //     "</h2><h2>Posted on: " + formattedTime + "</h2></li>";

        return newHtml;
    }
}

function pullPosts(category, targetColumn) {
    db.collection(category).orderBy('adDate', "desc").get().then(function (snapshot) {
        var times = 0;
        snapshot.docs.forEach(function (doc) {
            var pageContent = document.getElementById(targetColumn);
            console.log(doc.data());
            var newElementToInsert = generatePostCard(doc).body.firstChild;
            console.log(newElementToInsert);

            pageContent.appendChild(newElementToInsert);
            times++;
        })
    });
}

function initApp() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            console.log(JSON.stringify(user));
            var currentUserFromFirebase = user; // save current user's information for other usage
            var userEmail = user.email;
            var userId = user.uid;
            var displayName = user.displayName;
            if (displayName === "" || displayName == undefined) {
                document.getElementById("user_display").innerHTML = userEmail;
            } else {
                document.getElementById("user_display").innerHTML = displayName;
            }


            pullPosts("marketplace_posts", "marketplace");
            pullPosts("housing_posts", "housing");
            pullPosts("social_posts", "socialplace");

            var marketplace_posts = document.getElementById("marketplace_posts");


            // db.collection("marketplace_posts").onSnapshot(function (querySnapshot) {

            //     querySnapshot.forEach(function (doc) {

            //         const storageRef = firebase.storage().refFromURL(doc.data().imageOne);
            //         storageRef.getDownloadURL().then(function (url) {
            //             // document.getElementById("marketplace-post-image").src = url;
            //             marketplace_posts.innerHTML = " <div class=marketplace-posts><h1>Title: " + doc.data().adTitle +
            //                 "</h1><h2>Category: " + doc.data().adCategory +
            //                 "</h2><h2>Description: " + doc.data().adDescription +
            //                 "</h2><h2>Status: " + doc.data().adStatus +
            //                 "</h2><h2>Price: " + doc.data().adPrice +
            //                 "</h2><h2>Posted on: " + doc.data().adDate + "</h2></div>"
            //         })
            //     })
            // })

            // db.collection("marketplace_posts")
            //     .orderBy("editDate", "desc")
            //     .limit(1).get().then(function (prevSnapshot) {

            //         prevSnapshot.forEach(function (doc1) {

            //             const storageRef = firebase.storage().refFromURL(doc1.data().imageOne);
            //             storageRef.getDownloadURL().then(function (url) {
            //                 // document.getElementById("marketplace-post-image1").src = url;
            //                 marketplace_posts.innerHTML = " <div class=marketplace-posts1><h1>Title: " + doc1.data().adTitle +
            //                     "</h1><h2>Category: " + doc1.data().adCategory +
            //                     "</h2><h2>Description: " + doc1.data().adDescription +
            //                     "</h2><h2>Status: " + doc1.data().adStatus +
            //                     "</h2><h2>Price: " + doc1.data().adPrice +
            //                     "</h2><h2>Posted on: " + doc1.data().adDate + "</h2></div>"
            //             })
            //         })
            //     })


            //------------------------------------------------------------------------//


            const marketplace_form = document.querySelector('#add_marketplace');
            const housing_form = document.querySelector('#add_housing');
            const social_form = document.querySelector('#add_social');

            var time = new Date();
            var date = time.getTime();
            var userEmail = user.email;
            var userId = user.uid;

            // saving data for marketplace
            marketplace_form.addEventListener('submit', (e) => {
                e.preventDefault();

                const ref = firebase.storage().ref();
                //Select the file
                const file = document.querySelector('#marketplace_picture').files[0];
                //Set file name
                const name = file.name;
                //Create the task
                const task = ref.child("/marketplace_posts/" + name).put(file);
                //Put the pic to firebase 
                task
                    .then(snapshort => snapshort.ref.getDownloadURL())
                    .then((url) => {
                        console.log(url);

                        db.collection('marketplace_posts').add({
                            adTitle: marketplace_form.title.value,
                            adDescription: marketplace_form.description.value,
                            adPrice: marketplace_form.price.value,
                            imageOne: url,
                            imageTwo: "null",
                            imageThree: "null",
                            adCategory: marketplace_form.category.value,
                            adStatus: "active",
                            adDate: date,
                            editDate: date,
                            idUser: userId,
                            emailUser: userEmail,
                            imageOne: url,


                        });
                    })
                    .catch(console.error);
            })

            // saving data for housing
            housing_form.addEventListener('submit', (e) => {
                //Prevent the default action
                e.preventDefault();

                //Create root reference
                const ref = firebase.storage().ref();

                //Select the file
                const file = document.querySelector('#housing_picture').files[0];

                //Set file name
                const name = file.name;

                //Create the task
                const task = ref.child("/housing_posts/" + name).put(file);

                //Put the pic to firebase 
                task
                    .then(snapshort => snapshort.ref.getDownloadURL())
                    .then((url) => {
                        console.log(url);
                        //Create record on firestore
                        db.collection('housing_posts').add({
                            adTitle: housing_form.title.value,
                            adDescription: housing_form.description.value,
                            adRent: housing_form.rent.value,
                            imageOne: url,
                            imageTwo: "null",
                            imageThree: "null",
                            adCategory: housing_form.category.value,
                            adStatus: "active",
                            adDate: date,
                            editDate: date,
                            idUser: userId,
                            emailUser: userEmail,

                        });
                    })
                    .catch(console.error);


            })



            // saving data for social
            social_form.addEventListener('submit', (e) => {
                //Prevent the default action
                e.preventDefault();

                //Create root reference
                const ref = firebase.storage().ref();

                //Select the file
                const file = document.querySelector('#social_picture').files[0];

                //Set file name
                const name = file.name;

                //Create the task
                const task = ref.child("/social_posts/" + name).put(file);

                //Put the pic to firebase 
                task
                    .then(snapshort => snapshort.ref.getDownloadURL())
                    .then((url) => {
                        console.log(url);


                        //Create record on firestore
                        db.collection('social_posts').add({
                            adTitle: social_form.title.value,
                            adDescription: social_form.description.value,
                            imageOne: url,
                            imageTwo: "null",
                            imageThree: "null",
                            adCategory: social_form.category.value,
                            adStatus: "active",
                            adDate: date,
                            editDate: date,
                            idUser: userId,
                            eventDate: social_form.datetime.valueAsNumber,
                            emailUser: userEmail,

                        });
                    })
                    .catch(console.error);


            })
        } else {
            // User is signed out.
        }

    });
    // var user = firebase.auth().currentUser;
    // window.alert("inside initApp()");
    // if (user != null) {
    //     window.alert(JSON.stringify(user));
    // }
};

window.onload = function () {

    initApp();

};

// var email_id = user.email;

//             document.getElementById("user_para").innerHTML = "Welcome user " + email_id;


// /**
//  * Handles the sign in button press.
//  */
// function toggleSignIn() {
//     if (firebase.auth().currentUser) {
//         // [START signout]
//         firebase.auth().signOut();
//         // [END signout]
//     } else {
//         var email = document.getElementById('email').value;
//         var password = document.getElementById('password').value;
//         if (email.length < 4) {
//             alert('Please enter an email address.');
//             return;
//         }
//         if (password.length < 4) {
//             alert('Please enter a password.');
//             return;
//         }
//         // Sign in with email and pass.
//         // [START authwithemail]
//         firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
//             // Handle Errors here.
//             var errorCode = error.code;
//             var errorMessage = error.message;
//             // [START_EXCLUDE]
//             if (errorCode === 'auth/wrong-password') {
//                 alert('Wrong password.');
//             } else {
//                 alert(errorMessage);
//             }
//             console.log(error);
//             document.getElementById('quickstart-sign-in').disabled = false;
//             // [END_EXCLUDE]
//         });
//         // [END authwithemail]
//     }
//     document.getElementById('quickstart-sign-in').disabled = true;
//     console.log(user);
// }

// /**
//  * Handles the sign up button press.
//  */
// function handleSignUp() {
//     var email = document.getElementById('email').value;
//     var password = document.getElementById('password').value;
//     if (email.length < 4) {
//         alert('Please enter an email address.');
//         return;
//     }
//     if (password.length < 4) {
//         alert('Please enter a password.');
//         return;
//     }
//     // Sign in with email and pass.
//     // [START createwithemail]
//     firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
//         // Handle Errors here.
//         var errorCode = error.code;
//         var errorMessage = error.message;
//         // [START_EXCLUDE]
//         if (errorCode == 'auth/weak-password') {
//             alert('The password is too weak.');
//         } else {
//             alert(errorMessage);
//         }
//         console.log(error);
//         // [END_EXCLUDE]
//     });
//     // [END createwithemail]
// }

// /**
//  * Sends an email verification to the user.
//  */
// function sendEmailVerification() {
//     // [START sendemailverification]
//     firebase.auth().currentUser.sendEmailVerification().then(function () {
//         // Email Verification sent!
//         // [START_EXCLUDE]
//         alert('Email Verification Sent!');
//         // [END_EXCLUDE]
//     });
//     // [END sendemailverification]
// }

// function sendPasswordReset() {
//     var email = document.getElementById('email').value;
//     // [START sendpasswordemail]
//     firebase.auth().sendPasswordResetEmail(email).then(function () {
//         // Password Reset Email Sent!
//         // [START_EXCLUDE]
//         alert('Password Reset Email Sent!');
//         // [END_EXCLUDE]
//     }).catch(function (error) {
//         // Handle Errors here.
//         var errorCode = error.code;
//         var errorMessage = error.message;
//         // [START_EXCLUDE]
//         if (errorCode == 'auth/invalid-email') {
//             alert(errorMessage);
//         } else if (errorCode == 'auth/user-not-found') {
//             alert(errorMessage);
//         }
//         console.log(error);
//         // [END_EXCLUDE]
//     });
//     // [END sendpasswordemail];
// }

// /**
//  * initApp handles setting up UI event listeners and registering Firebase auth listeners:
//  *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
//  *    out, and that is where we update the UI.
//  */
// function initApp() {
//     // Listening for auth state changes.
//     // [START authstatelistener]
//     console.log("reached here");
//     var displayName = user.displayName;
//     document.getElementById('username').textContent = displayName;
//     firebase.auth().onAuthStateChanged(function (user) {
//         // [START_EXCLUDE silent]
//         document.getElementById('quickstart-verify-email').disabled = true;
//         // [END_EXCLUDE]
//         if (user) {
//             // User is signed in.
//             console.log("entered!");
//             console.log(user);
//             var displayName = user.displayName;
//             var email = user.email;
//             var emailVerified = user.emailVerified;
//             var photoURL = user.photoURL;
//             var isAnonymous = user.isAnonymous;
//             var uid = user.uid;
//             var providerData = user.providerData;
//             // [START_EXCLUDE]
//             document.getElementById('username').textContent = displayName;
//             document.getElementById('quickstart-sign-in').textContent = 'Sign out';
//             document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');
//             if (!emailVerified) {
//                 document.getElementById('quickstart-verify-email').disabled = false;
//             }
//             // [END_EXCLUDE]
//             window.location = '/main';
//         } else {
//             // User is signed out.
//             // [START_EXCLUDE]
//             document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
//             document.getElementById('quickstart-sign-in').textContent = 'Sign in';
//             document.getElementById('quickstart-account-details').textContent = 'null';
//             // [END_EXCLUDE]
//         }
//         // [START_EXCLUDE silent]
//         document.getElementById('quickstart-sign-in').disabled = false;
//         // [END_EXCLUDE]
//     });
//     // [END authstatelistener]

//     document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
//     document.getElementById('quickstart-sign-up').addEventListener('click', handleSignUp, false);
//     document.getElementById('quickstart-verify-email').addEventListener('click', sendEmailVerification, false);
//     document.getElementById('quickstart-password-reset').addEventListener('click', sendPasswordReset, false);
// }

// window.onload = function () {
//     initApp();
// };
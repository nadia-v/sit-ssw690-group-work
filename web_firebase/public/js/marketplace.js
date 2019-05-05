function logout() {
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
        window.location = '/';
    }).catch(function (error) {
        // An error happened.
    });
};


function timeSince(date) {

    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
        return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + " minutes";
    }
    return Math.floor(seconds) + " seconds";
}
var aDay = 24 * 60 * 60 * 1000
console.log(timeSince(new Date(Date.now() - aDay)));
console.log(timeSince(new Date(Date.now() - aDay * 2)));

function convertTimeFormat(unixTimestamp) {
    // helper function to convert any unix timestamps into human readable format
    var date = new Date(unixTimestamp); // Javascript stores dates as milliseconds
    // console.log("time:");
    console.log(date.toDateString());
    // // Hours part from the timestamp
    // var hours = date.getHours();
    // // Minutes part from the timestamp
    // var minutes = "0" + date.getMinutes();
    // // Seconds part from the timestamp
    // var seconds = "0" + date.getSeconds();
    // // Will display time in 10:30:23 format
    // var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    console.log(Date.now());
    console.log(unixTimestamp);
    return timeSince(unixTimestamp);
}

function generatePostCard(dbEntry) {
    if (!dbEntry) {
        return null;
    } else {
        var displayTime = convertTimeFormat(dbEntry.data().adDate);
        var userID = dbEntry.data().idUser;
        var url = dbEntry.data().imageOne;

        var email = dbEntry.data().emailUser;
        var emailButton = '<a class="btn btn-primary my-2" target="_blank" rel="nofollow" href="mailto:' + email + '">Email Me &rarr;</a>';
        if (email === undefined) {
            emailButton = '<a class="btn btn-primary my-2" target="_blank" rel="nofollow" disabled>Email Me &rarr;</a>';
        }

        // db.collection("user").
        var parser = new DOMParser();
        var domString =
            '<div class="row"><div class="col-lg-12 mb-4">' +
            '<div class="card shadow mb-4">' +
            '<div class="card-header py-3">' + '<h6 class="m-0 font-weight-bold text-danger">' + '[' + dbEntry.data().adCategory + '] ' + dbEntry.data().adTitle + '</h6>' + '<h6 class="m-0 text-right">' + displayTime + ' ago</h6>' +
            '</div>' +
            '<div class="card-body">' +
            '<div class="text-center">' +
            '<img class="img-fluid px-3 px-sm-4 mt-3 mb-4" style="width: 25rem;" src="' + url + '" alt="">' +
            '</div>' +
            '<p>' + dbEntry.data().adDescription + '</p>' +
            '</div>' + '<div class="card-footer py-3">' +
            emailButton +
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
            // console.log(doc.data());
            var newElementToInsert = generatePostCard(doc).body.firstChild;
            // console.log(newElementToInsert);

            pageContent.appendChild(newElementToInsert);
            times++;
        })
    });
}

//------------------------------------------------------------------------//

function initApp() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            // console.log(JSON.stringify(user));
            var currentUserFromFirebase = user; // save current user's information for other usage
            var userEmail = user.email;
            var userId = user.uid;
            var displayName = user.displayName;
            if (displayName === "" || displayName == undefined) {
                document.getElementById("user_display").innerHTML = userEmail;
            } else {
                document.getElementById("user_display").innerHTML = displayName;
            }

            // rendering posts to the DOM from database queries (for all pages)
            if (document.getElementById("marketplace")) {
                pullPosts("marketplace_posts", "marketplace");
            }


            const marketplace_form_book = document.querySelector('#add_marketplace_book');
            const marketplace_form_furniture = document.querySelector('#add_marketplace_furniture');
            const marketplace_form_electronic = document.querySelector('#add_marketplace_electronic');
            const marketplace_form_miscellaneous = document.querySelector('#add_marketplace_miscellaneous');



            var time = new Date();
            var date = time.getTime();
            var userEmail = user.email;
            var userId = user.uid;

            // saving data for marketplace_book
            marketplace_form_book.addEventListener('submit', (e) => {
                e.preventDefault();

                const ref = firebase.storage().ref();
                //Select the file
                const file = document.querySelector('#marketplace_picture_book').files[0];
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
                            adTitle: marketplace_form_book.title.value,
                            adDescription: marketplace_form_book.description.value,
                            adPrice: marketplace_form_book.price.value,
                            adCategory: "Books",
                            adStatus: "active",
                            adDate: date,
                            editDate: date,
                            idUser: userId,
                            emailUser: userEmail,
                            imageOne: url,
                            imageTwo: 'null',
                            imageThree: 'null',

                        });
                    })
                    .catch(console.error);
            })


            // saving data for marketplace_furniture
            marketplace_form_furniture.addEventListener('submit', (e) => {
                e.preventDefault();

                const ref = firebase.storage().ref();
                //Select the file
                const file = document.querySelector('#marketplace_picture_furniture').files[0];
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
                            adTitle: marketplace_form_furniture.title.value,
                            adDescription: marketplace_form_furniture.description.value,
                            adPrice: marketplace_form_furniture.price.value,
                            adCategory: "Furniture",
                            adStatus: "active",
                            adDate: date,
                            idUser: userId,
                            editDate: date,
                            emailUser: userEmail,
                            imageOne: url,
                            imageTwo: 'null',
                            imageThree: 'null',

                        });
                    })
                    .catch(console.error);
            })


            // saving data for marketplace_electronic
            marketplace_form_electronic.addEventListener('submit', (e) => {
                e.preventDefault();

                const ref = firebase.storage().ref();
                //Select the file
                const file = document.querySelector('#marketplace_picture_electronic').files[0];
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
                            adTitle: marketplace_form_electronic.title.value,
                            adDescription: marketplace_form_electronic.description.value,
                            adPrice: marketplace_form_electronic.price.value,
                            adCategory: "Electronics",
                            adStatus: "active",
                            adDate: date,
                            editDate: date,
                            idUser: userId,
                            emailUser: userEmail,
                            imageOne: url,
                            imageTwo: 'null',
                            imageThree: 'null',

                        });
                    })
                    .catch(console.error);
            })


            // saving data for marketplace_miscellaneous
            marketplace_form_miscellaneous.addEventListener('submit', (e) => {
                e.preventDefault();

                const ref = firebase.storage().ref();
                //Select the file
                const file = document.querySelector('#marketplace_picture_miscellaneous').files[0];
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
                            adTitle: marketplace_form_miscellaneous.title.value,
                            adDescription: marketplace_form_miscellaneous.description.value,
                            adPrice: marketplace_form_miscellaneous.price.value,
                            adCategory: "Miscellaneous",
                            adStatus: "active",
                            adDate: date,
                            editDate: date,
                            idUser: userId,
                            emailUser: userEmail,
                            imageOne: url,
                            imageTwo: 'null',
                            imageThree: 'null',

                        });
                    })
                    .catch(console.error);
            })


        } else {
            // User is signed out.
            window.location = "/";
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








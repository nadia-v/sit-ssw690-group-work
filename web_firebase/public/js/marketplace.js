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
                adCategory: marketplace_form.category.value,
                adStatus: "active",
                adDate: date,
                idUser: userId,
                emailUser: userEmail,
                imageOne: url,
                imageTwo: '',
                imageThree: '',

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







})
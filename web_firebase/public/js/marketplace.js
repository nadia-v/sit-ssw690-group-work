


db.collection("marketplace_posts")
    .orderBy("adDate", "desc")
    .get().then(snapshot => {

        snapshot.forEach(doc => {
        console.log(doc.id, '=>', doc.data()); {     

        var storageRef = firebase.storage().refFromURL(doc.data().imageOne);
        storageRef.getDownloadURL().then(function(url) {  
            //document.getElementById("marketplace-post-image").src = url

            var date = new Date(doc.data().adDate);
            var day = date.getDate();
            var months = new Array("January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
            var month = months[date.getMonth() + 1]; 
            var year = date.getFullYear();
            var hours = date.getHours();
            var min = date.getMinutes();
            var sec = date.getSeconds();
            var myDate =  month + ' ' + day + ', ' + year + ', ' + hours + ':' + min + ':' + sec;


            marketplace_posts.innerHTML += '<div class="col-lg-8 mb-4">';
            marketplace_posts.innerHTML += '<div class="card shadow mb-4">';
            marketplace_posts.innerHTML += '<div class="card-header py-3">';
            marketplace_posts.innerHTML += '<h3 class="m-0 font-weight-bold text-primary"<b>' + doc.data().adTitle + '</b></h3>';
            marketplace_posts.innerHTML += '</div>';
            marketplace_posts.innerHTML += '<div class="card-body">';
            marketplace_posts.innerHTML += '<div class="text-center">';
            marketplace_posts.innerHTML += '<img class="img-fluid px-3 px-sm-4 mt-3 mb-4" style="width: 25rem"; id="marketplace-post-image" src=' + url + 'alt="">';
            marketplace_posts.innerHTML += '<p><b>Category: </b>'+ doc.data().adCategory +'</p>'; 
            marketplace_posts.innerHTML += '<p><b>Date: </b>' + myDate +'</p>';   
            marketplace_posts.innerHTML += '<p><b>Description: </b>' + doc.data().adDescription +'</p>';   
            marketplace_posts.innerHTML += '<p><b>Price: </b>' + doc.data().adPrice +'</p>';   
            marketplace_posts.innerHTML += '<p><b>Price: </b>' + doc.data().emailUser +'</p>'; 
            marketplace_posts.innerHTML += '<p><b>Status: </b>' + doc.data().adStatus +'</p></div>';
            marketplace_posts.innerHTML += '<ul id="posts"></ul>';
            marketplace_posts.innerHTML += '<div class="card-footer py-3">';  
            marketplace_posts.innerHTML += '<a target="_blank" rel="nofollow" href="mailto:' + doc.data().emailUser + '"class="btn btn-primary my-2">Email Me</a></div></div></div></div>';
            
        })       
    }
        })   
})



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








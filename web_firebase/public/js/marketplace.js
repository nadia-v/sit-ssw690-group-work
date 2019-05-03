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
                adCategory: housing_form.category.value,
                adStatus: "active",
                adDate: date,

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
                adCategory: social_form.category.value,
                adStatus: "active",
                adDate: date,
                eventDate: social_form.datetime.valueAsNumber,

            });
        })
        .catch(console.error);


})
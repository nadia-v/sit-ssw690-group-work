


db.collection("social_posts")
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
//Duplicate code to be fixed
        var eventDate = new Date(doc.data().eventDate);
        var day = eventDate.getDate();
        var months = new Array("January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
        var month = months[eventDate.getMonth() + 1]; 
        var year = eventDate.getFullYear();
        var hours = eventDate.getHours();
        var min = eventDate.getMinutes();
        var sec = eventDate.getSeconds();
        var myEventDate =  month + ' ' + day + ', ' + year + ', ' + hours + ':' + min + ':' + sec;

    

        social_posts.innerHTML += '<div class="col-lg-8 mb-4">';
        social_posts.innerHTML += '<div class="card shadow mb-4">';
        social_posts.innerHTML += '<div class="card-header py-3">';
        social_posts.innerHTML += '<h3 class="m-0 font-weight-bold text-primary"<b>' + doc.data().adTitle + '</b></h3>';
        social_posts.innerHTML += '</div>';
        social_posts.innerHTML += '<div class="card-body">';
        social_posts.innerHTML += '<div class="text-center">';
        social_posts.innerHTML += '<img class="img-fluid px-3 px-sm-4 mt-3 mb-4" style="width: 25rem"; id="social-post-image" src=' + url + 'alt="">';
        social_posts.innerHTML += '<p><b>Category: </b>'+ doc.data().adCategory +'</p>'; 
        social_posts.innerHTML += '<p><b>Date: </b>' + myDate +'</p>';   
        social_posts.innerHTML += '<p><b>Description: </b>' + doc.data().adDescription +'</p>';   
        social_posts.innerHTML += '<p><b>Date of The Event: </b>' + myEventDate +'</p>';   
        social_posts.innerHTML += '<p><b>Status: </b>' + doc.data().adStatus +'</p></div>';
        social_posts.innerHTML += '<ul id="posts"></ul>';
        social_posts.innerHTML += '<div class="card-footer py-3">';  
        social_posts.innerHTML += '<a target="_blank" rel="nofollow" href="mailto:' + doc.data().emailUser + '"class="btn btn-primary my-2">Email Me</a></div></div></div></div>';
        
    })       
}
    })   
})



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








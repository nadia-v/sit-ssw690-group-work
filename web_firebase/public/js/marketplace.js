
// db.collection("marketplace_posts").onSnapshot(function(querySnapshot) {
    
//     querySnapshot.forEach(function(doc) {     

//         const storageRef = firebase.storage().refFromURL(doc.data().imageOne);
//         storageRef.getDownloadURL().then(function(url) {       
//             document.getElementById("marketplace-post-image").src = url;  
//             marketplace_posts.innerHTML = " <div class=marketplace-posts><h1>Title: " + doc.data().adTitle +
//             "</h1><h2>Category: " + doc.data().adCategory + 
//             "</h2><h2>Description: " + doc.data().adDescription + 
//             "</h2><h2>Status: " + doc.data().adStatus + 
//             "</h2><h2>Price: " + doc.data().adPrice + 
//             "</h2><h2>Posted on: " + doc.data().adDate+ "</h2></div>"  
//           })
//     })
// })


db.collection("marketplace_posts")
    .orderBy("editDate", "desc")
    .get().then(snapshot => {

        snapshot.forEach(doc => {
        console.log(doc.id, '=>', doc.data()); {     

        var storageRef = firebase.storage().refFromURL(doc.data().imageOne);
        storageRef.getDownloadURL().then(function(url) {  
            //document.getElementById("marketplace-post-image").src = url

            marketplace_posts.innerHTML += '<div class=col-lg-8 mb-4>';
            marketplace_posts.innerHTML += "<div class=card shadow mb-4>";
            marketplace_posts.innerHTML += '<div class=card-header py-3>';
            marketplace_posts.innerHTML += '<h3 class=m-0 font-weight-bold text-primary<b>' + doc.data().adTitle + '</b></h3>';
            marketplace_posts.innerHTML += '</div';
            marketplace_posts.innerHTML += '<img class=img-fluid px-3 px-sm-4 mt-3 mb-4 style=width: 25rem; id="marketplace-post-image" src=' + url + 'alt="">';
            marketplace_posts.innerHTML += '<div class=card-body>';
            marketplace_posts.innerHTML += '<div class=text-center>';
            marketplace_posts.innerHTML += '<p><b>Category: </b>'+ doc.data().adCategory +'</p>'; 
            marketplace_posts.innerHTML += '<p><b>Date: </b>' + doc.data().adDate +'</p>';   
            marketplace_posts.innerHTML += '<p><b>Description: </b>' + doc.data().adDescription +'</p>';   
            marketplace_posts.innerHTML += '<p><b>Price: </b>' + doc.data().adPrice +'</p>';   
            marketplace_posts.innerHTML += '<p><b>Status: </b>' + doc.data().adStatus +'</p></div>';
            marketplace_posts.innerHTML += '<ul id="posts"></ul>';
            marketplace_posts.innerHTML += '<div class="card-footer py-3">';  
            marketplace_posts.innerHTML += '<a target="_blank" rel="nofollow" href="" class="btn btn-primary my-2">Email Me</a></div></div></div></div>';
            
        })
          
    }

        })
    
})


//------------------------------------------------------------------------//
const housing_form  = document.querySelector('#add_housing');
const market_form = document.querySelector('#add_marketplace');
const social_form = document.querySelector('#add_social')
var time = new Date();
var date = time.getTime();

//saving data for marketplace
market_form.addEventListener('submit', (e) => {
    //Prevent the default action
    e.preventDefault();
    
    //Create root reference
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
            //Create record on firestore
            db.collection('marketplace_posts').add({
                adTitle: market_form.title.value,
                adDescription: market_form.description.value,
                adPrice: market_form.price.value,
                imageOne: url,
                adCategory: market_form.category.value,
                adStatus: "active",
                adDate: date,
                idUser: "fkFTTR55iyakzpy8FlD8BXUGkuF3",
        
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
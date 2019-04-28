var collect = new Array("marketplace_posts", "housing_posts", "social_posts");


var arrayLength = collect.length;
    for (var i = 0; i < arrayLength; i++) {
        console.log(collect[i]);
        //Do something
        
    db.collection(collect[i])
    .orderBy("editDate", "desc")
        .get().then(snapshot => {

            snapshot.forEach(doc => {
            console.log(doc.id, '=>', doc.data()); {     

            var storageRef = firebase.storage().refFromURL(doc.data().imageOne);
            storageRef.getDownloadURL().then(function(url) {  
        
                
                all_posts.innerHTML += "<div class=card mb-4>";
                all_posts.innerHTML += '<img class="card-img-top" id="all-post-image" src=' + url + 'alt="Card image cap" style="width:500px">'; 
                
                all_posts.innerHTML += '<div class="card-body>';
                
                all_posts.innerHTML += '<h5>Category: '+ doc.data().adCategory +'</h5>'; 
                all_posts.innerHTML += '<h5>Date: ' + doc.data().adDate +'</h5>';   
                all_posts.innerHTML += '<h5>Description: ' + doc.data().adDescription +'</h5>';   
                all_posts.innerHTML += '<h5>Price: ' + doc.data().adPrice +'</h5>';   
                all_posts.innerHTML += '<h5>Status: ' + doc.data().adStatus +'</h5>';   
                all_posts.innerHTML += '<h5>Title: ' + doc.data().adTitle +'</h5>';
                all_posts.innerHTML += '<a href="" class="btn btn-primary my-2">Email Me</a>';
                all_posts.innerHTML += '<div class="card-footer text-muted"></div></div>';  
            
        })
          
    }

        })
    
})
}

// var db = firebase.firestore();

// db.settings({timestampsInSnapshots: true});

// const collection = db.collection('user_dat');

// collection.get().then(snapshot => {

//   snapshot.forEach(doc => {

//     console.log( doc.data().name );    
//     console.log( doc.data().mail );

//   });

// });
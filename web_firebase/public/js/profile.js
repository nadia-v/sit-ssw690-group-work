
// function pullPosts() {
//     db.collection("marketplace_posts").where("idUser", "==", "SxBECXFKVjQcc4XCD4aEdhXMy5u2").orderBy('adDate', "desc").get().then(function (snapshot) {
//         snapshot.docs.forEach(function (doc) {
//             console.log(doc.data());
//             var postsElement = document.getElementById("posts");

//             var unix_timestamp = doc.data().adDate;
//             var date = new Date(unix_timestamp * 1000);
//             // Hours part from the timestamp
//             var hours = date.getHours();
//             // Minutes part from the timestamp
//             var minutes = "0" + date.getMinutes();
//             // Seconds part from the timestamp
//             var seconds = "0" + date.getSeconds();

//             // Will display time in 10:30:23 format
//             var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

//             var newElement =
//                 "<li><h1>Title: " + doc.data().adTitle +
//                 "</h1><h2>Category: " + doc.data().adCategory +
//                 "</h2><h2>Description: " + doc.data().adDescription +
//                 "</h2><h2>Status: " + doc.data().adStatus +
//                 "</h2><h2>Price: " + doc.data().adPrice +
//                 "</h2><h2>Posted on: " + formattedTime + "</h2></li>"
//             postsElement.append(newElement);
//         })
//     });
// }

function initApp() {

    // TODO: populate user account info, post info, initialize dashboard page
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            console.log(JSON.stringify(user));
            var currentUserFromFirebase = user; // save current user's information for other usage
            var userEmail = user.email;
            var userId = user.uid;
            var displayName = user.displayName;

            var marketplace = db.collection("marketplace_posts").where("idUser", "==", "SxBECXFKVjQcc4XCD4aEdhXMy5u2");
                marketplace.get()
                .then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                        // doc.data() is never undefined for query doc snapshots
                        console.log(doc.id, " => ", doc.data());

                        var postsElement = document.getElementById("market_posts");

                        var newElement = 
                        "<li><h1>ID: " + doc.id + "</h1></li>"
                
                        postsElement.append(newElement);
                    });
                
                    
                })
                .catch(function(error) {
                    console.log("Error getting documents: ", error);
                });
            
            var social = db.collection("social_posts").where("idUser", "==", "SxBECXFKVjQcc4XCD4aEdhXMy5u2");
                social.get()
                .then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                        // doc.data() is never undefined for query doc snapshots
                        console.log(doc.id, " => ", doc.data());

                        var postsElement = document.getElementById("social_event_posts");
                        var newElement = 
                        "<li><h1>ID: " + doc.id + "</h1></li>"
                        postsElement.append(newElement);
                    });
                })
                .catch(function(error) {
                    console.log("Error getting documents: ", error);
                });

            var housing = db.collection("housing_posts").where("idUser", "==", "SxBECXFKVjQcc4XCD4aEdhXMy5u2");
                housing.get()
                .then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                        // doc.data() is never undefined for query doc snapshots
                        console.log(doc.id, " => ", doc.data());

                        var postsElement = document.getElementById("house_posts");
                        var newElement = 
                        "<li><h1>ID: " + doc.id + "</h1></li>"
                        postsElement.append(newElement);
                    });
                })
                .catch(function(error) {
                    console.log("Error getting documents: ", error);
                });

                



        }
    });
}

window.onload = function () {
    initApp();
    // pullPosts();
};
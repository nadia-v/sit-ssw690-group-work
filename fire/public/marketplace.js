
function initialize(){
  console.log("marketplace.js is loaded!");
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDb9Ez0_utcuIrj8LZz4iyufABSSbpiaGw",
    authDomain: "quack-f1544.firebaseapp.com",
    databaseURL: "https://quack-f1544.firebaseio.com",
    projectId: "quack-f1544",
    storageBucket: "quack-f1544.appspot.com",
    messagingSenderId: "740005547099"
  };
  console.log("passed config varirable");
  
  firebase.initializeApp(config);
  console.log("passed the line of config");

  var firestore = firebase.firestore();
  const preObject = document.getElementById('object');
  const dbRefObject = firebase.firestore().ref().child('object');
  console.log("passed the line of firebase.firestore()");
  console.log(dbRefObject);
  dbRefObject.on('value', snap => {
    preObject.innerText = JSON.stringify(snap.val(), null, 3)
  });
}

window.onload = function() {
  console.log("window onload is called");
  initialize();
};
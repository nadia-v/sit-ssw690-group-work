// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
const firebase = require('firebase/app');
const firebase_auth = require('firebase/auth');

// Cloud Functions: https://firebase.google.com/docs/functions/write-firebase-functions
const functions = require('firebase-functions');
const path = require("path");
const express = require('express');
const app = express();

const hbs = require("express-handlebars");

app.use(express.static(path.join(__dirname, '/public')));
app.set('views', __dirname + '/views');
app.engine("handlebars", hbs({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");


let firebaseConfig = {
    apiKey: "AIzaSyCC78yv8F0WtVctcQJrleAwyK3J9CLLf-I",
    authDomain: "raymond-firebase-exer.firebaseapp.com",
    databaseURL: "https://raymond-firebase-exer.firebaseio.com",
    projectId: "raymond-firebase-exer",
    storageBucket: "raymond-firebase-exer.appspot.com",
    messagingSenderId: "1038252815830"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Route and API functions below

app.get('/app', (request, response) => {
    // or use 
    // let user = firebase.auth.Auth.user;
    let user = firebase.auth().currentUser;
    if (user) {
        console.log("user signed in:");
        console.log(user);
        response.render('dashboard', {});
    } else {
        console.log("user is probably null:");
        console.log(user);
        response.render('user_page', {
            item: {
                name: "raymond"
            }
        });
    }
})

exports.app = functions.https.onRequest(app);
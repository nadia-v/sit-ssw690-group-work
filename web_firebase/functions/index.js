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


// Route and API functions below

app.get('/', (request, response) => {
    response.render('login', {
        item: {
            name: "raymond"
        }
    })
})

exports.app = functions.https.onRequest(app);
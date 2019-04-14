const functions = require('firebase-functions');
const express = require('express');
const app = express();

const hbs = require("express-handlebars");

// const static = express.static(__dirname + "/public");
// app.use("/public", static);

app.set('views', __dirname + '/views');
app.engine("handlebars", hbs({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");







app.get('/', (request, response) => {
    response.render('index', {
        item: {
            name: "raymond"
        }
    })
})

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.app = functions.https.onRequest(app);
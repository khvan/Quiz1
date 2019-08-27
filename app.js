// required packages and modules for the project 
const express = require('express');
const cookies =require('cookie-parser');
const path = require ('path');
const knex = require ('./db/client');

const rootRouter = require("./routes/root");
const clucksRouter = require("./routes/clucks");

// const rootRouter = require("./routes/root");

// initializing express
const app = express();
app.use(express.static('public'));

app.use(cookies());

app.use(express.urlencoded({ extended: true }));
// setting the view engine to ejs

app.use(express.static(path.join(__dirname, 'public')));

app.set ('view engine', 'ejs');
// initializing cookieParser, morgan



// custom middleware to make username available globally
function getUsernameMiddleware(request, response, next) {
  response.locals.username = request.cookies.username;
  next();
}

app.use(getUsernameMiddleware);

app.use(express.static(path.join(__dirname, 'public')));



app.use(clucksRouter);
app.use(rootRouter);


const ADDRESS = 'localhost';
const PORT = 4141;

app.listen(PORT, ADDRESS, () => {
  console.log(`Server started on ${ADDRESS}:${PORT}`);
});


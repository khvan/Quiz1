const express = require("express");

const knex = require("../db/client");

const router = express.Router();

router.get("/", (req, res) => {
  knex("clucks")
    .select("*")
    // data is what is being returned from the knex/sql query
    .then((data) => {
      res.render("clucks", {
        articles: data,
      });
    });
});

router.get("/new", (req, res) => {
  res.render("clucks/new");
});

// article show page. id is dynamic url parameter
router.get("/:id", (req, res) => {
  // if we go to localhost:4535/articles/6007
  // req.params looks like this object: 
  // {
  //   id: 6007
  // }
  knex("clucks")
    .select("*")
    .where({id: req.params.id})
    .then((data) => {
      res.send(data);
    })
})

router.post("/clucks", (req, res, next) => {
  const articlesParams = {
    title: req.body.title,
    content: req.body.content,
    image_url: req.body.image_url,
    username: res.locals.username, 
    // is provided by our custom middleware
    
  };
console.log("******************");
  // save a article to database

  knex("clucks")
    .insert(articlesParams)
    .returning("*")
    .then((data) => {
     
      res.redirect('/')
    });
  //res.redirect('/')
});



module.exports = router;

const express = require("express");

const knex = require("../db/client");

const router = express.Router();

router.get("/clucks", (req, res) => {
  knex("clucks")
    .select("*")
    .then((data) => {
      res.render("clucks/clucks", {
        clucks: data,
      });
    });
});


router.get("/new", (req, res) => {
  res.render("clucks/new");
});


router.post("/clucks", (req, res, next) => {
  const articlesParams = {
    title: req.body.title,
    content: req.body.content,
    image_url: req.body.image_url,
    username: res.locals.username,
     };
console.log("******************");
  
  knex("clucks")
    .insert(articlesParams)
    .returning("*")
    .then((data) => {
     
      res.redirect('/')
    });
  //res.redirect('/')
});




module.exports = router;

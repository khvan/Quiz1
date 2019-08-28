const express = require("express");
const router = express.Router();



router.get("/",(req, res)=>{
 res.redirect("/clucks")
})


router.post('/sign_in', (req, res) =>{
  console.log(req.body.username)
  res.cookie('username', req.body.username)
  res.redirect('/')
})

router.post("/sign_out", (req, res) => {
  res.clearCookie("username"); 
  res.redirect('/')
})

module.exports = router;
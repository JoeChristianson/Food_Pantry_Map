const router = require('express').Router();
const loginRoutes = require("./login.js");

router.use("/login",loginRoutes)

router.get("/",(req,res)=>{
    res.render('homepage')
})

router.get("/pantry",(req,res)=>{
    res.render('pantry')
});
module.exports = router;
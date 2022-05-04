const router = require('express').Router();
const loginRoutes = require("./login.js");
const stocksRoutes = require("./stocks.js");

router.use("/login",loginRoutes)
router.use("/stocks", stocksRoutes)

router.get("/",(req,res)=>{
    const local = true;
    res.render('homepage',{loggedIn:req.session.loggedIn});
})

router.get("/pantry",(req,res)=>{
    if (req.session.loggedIn){
        res.render('pantry',{loggedIn:req.session.loggedIn})
    }
    else{
        res.redirect("/login")
    }
});
module.exports = router;
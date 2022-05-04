const router = require('express').Router();
const loginRoutes = require("./login.js");
const stocksRoutes = require("./stocks.js");

router.use("/login",loginRoutes)
router.use("/stocks", stocksRoutes)

router.get("/",(req,res)=>{
    res.render('homepage')
})

router.get("/pantry",(req,res)=>{
    res.render('pantry')
});
module.exports = router;
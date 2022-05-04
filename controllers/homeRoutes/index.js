const router = require('express').Router();
const loginRoutes = require("./login.js");
const stocksRoutes = require("./stocks.js");

router.use("/login",loginRoutes)
router.use("/stocks", stocksRoutes)

router.get("/",(req,res)=>{
    console.log(req); 
    const local = true;
    res.render('homepage',{data:{local:local}});
})

router.get("/pantry",(req,res)=>{
    res.render('pantry')
});
module.exports = router;
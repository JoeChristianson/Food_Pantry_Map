const router = require('express').Router();
const loginRoutes = require("./login.js");

router.use("/login",loginRoutes)

router.get("/",(req,res)=>{
    res.send("Hello World")
})

module.exports = router;
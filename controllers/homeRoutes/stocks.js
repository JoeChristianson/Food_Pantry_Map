const router = require('express').Router();
// const {User} = require('../../models');

router.get('/',(req,res)=>{
    if (req.session.loggedIn){
        res.render('editStock',{loggedIn:req.session.loggedIn})    }
    else{
        res.redirect("/login")
    }
})

module.exports = router;
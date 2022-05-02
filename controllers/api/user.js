const router = require('express').Router()
// const { DataTypes } = require('sequelize/types');
const {User,Pantry} = require("../../models")

// this is registering
router.post("/",async (req,res)=>{
    try{
        console.log(req.body)
        const newUser = await User.create({
            user_name:req.body.userName,
            email:req.body.email,
            password:req.body.password
        });
        const newPantry = await Pantry.create({
            pantry_name:req.body.pantry_name,
            street_address: req.body.street_address,
            city:req.body.city,
            latitude:req.body.latitude,
            longitude:req.body.longitude,
            contact_phone:req.body.contact_phone,
            user_id:newUser.id
        })
        console.log(typeof newPantry)
        res.json({newUser,newPantry})
    }catch(err){
        res.status(500).json(err)
    }
})

router.post('/login',async (req,res)=>{
    try{
        const userData = await User.findOne({
            where:{
                email: req.body.email,
            }
        });

        if(!userData){
            res.status(400).json({message:"Incorrect email or password."});
            return;
        }
        const validPassword = userData.checkPassword(req.body.password)
        if (!validPassword){
            res.status(400).json({message:'Incorrect email or password'});
            return;
        }
        const pantryData = await Pantry.findOne({
            where:{
                user_id:userData.getDataValue("id")
            }
        });
        req.session.save(async ()=>{
            req.session.loggedIn = true;
            req.session.userId = userData.getDataValue("id");
            req.session.pantryId = pantryData.getDataValue("id")
            res.status(200).json({user:userData,message: 'You are now logged in'})
        })
    }catch(err){
        console.log(err);
        res.status(500).json(err)
    }
})

router.post("/logout",(req,res)=>{
    req.session.loggedIn = false;
    res.status(200).json({message:'You are now logged out.'})
})

module.exports = router;
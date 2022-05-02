const router = require('express').Router()
const {Pantry} = require("../../models")

router.get("/", async (req,res) => {
    try{
        const results = await Pantry.findByPk(req.session.pantryId);
        const pantryData = results.dataValues;
        console.log(pantryData)
        res.json(pantryData)
    }catch(err){
        res.status(500).json({message:"bad request"})
    }
})

router.get("/all",async(req,res)=>{
    try{
        const results = await Pantry.findAll();
        res.json(results)
    }catch(err){
        res.status(500).json({message:'bad request'})
    }
})

module.exports = router
const router = require('express').Router()
const {Pantry,Request} = require("../../models")

// This gets the logged in users pantry data
router.get("/", async (req,res) => {
    try{
        console.log(req.session.pantryId)
        const results = await Pantry.findByPk(req.session.pantryId,{
            include:[{model:Request, where: {open: true},}]
        });
        console.log(results)
        const pantryData = results.dataValues;
        console.log(pantryData)
        res.json(pantryData)
    }catch(err){
        res.status(500).json({message:"bad request"})
    }
})

router.get("/all",async(req,res)=>{
    try{
        const results = await Pantry.findAll({
            include:[{model:Request, where: {open: true},}]
        });
        res.json(results)
    }catch(err){
        res.status(500).json({message:'bad request1'})
    }
})

module.exports = router
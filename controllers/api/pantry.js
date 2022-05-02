const router = require('express').Router()
const {Pantry} = require("../../models")

router.get("/all", async (req,res) => {
    try{
        const results = await Pantry.findAll();
        res.json(results)
    }catch(err){
        res.status(500).json({message:"bad request"})
    }
})


module.exports = router
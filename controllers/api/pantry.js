const router = require('express').Router()
const {Pantry,Request} = require("../../models")
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const distance = require("../../util/distance")

// This gets the logged in users pantry data
router.get("/", async (req,res) => {
    try{
        console.log(req.session.pantryId)
        const results = await Pantry.findByPk(req.session.pantryId,{
            include:[{model:Request, where: {open: true}, required:false}]
        });
        const pantryData = results.dataValues;
        res.json(pantryData)
    }catch(err){
        res.status(500).json({message:"bad request"})
    }
})

router.get("/all",async(req,res)=>{
    try{
        const results = await Pantry.findAll({
            include:[{model:Request, where: {open: true}, required:false}]
        });
        res.json(results)
    }catch(err){
        res.status(500).json({message:'bad request1'})
    }
})

router.get("/search/:item/:latitude/:longitude",async(req,res)=>{
    try{
        const item = req.params.item;
        console.log(item)
        const requests = await Request.findAll({
            where:{
                product_name: {
                    [Op.like]: `%${req.params.item}%`
                  }
            }
        })
        const set = new Set()
        let pantryIds = requests.map(req=>req.pantry_id);
        pantryIds.forEach(item=>set.add(item))
        pantryIds = Array.from(set);
        const pantries = await Pantry.findAll({
            where:{
                id:{
                    [Op.or]:pantryIds
                }
                },
                include:{model:Request}
        })
        const pantryData = pantries.map(pantry=>pantry.dataValues);
        pantryData.forEach(pantry=>{
            pantry.distance = distance({latitude:pantry.latitude,longitude:pantry.longitude},{latitude:req.params.latitude,longitude:req.params.longitude});
        })
        const sortedPantryData = pantryData.sort((a,b)=>{
            return a.distance-b.distance;
        })
        console.log(sortedPantryData.map(pantry=>pantry.distance))
        res.json(sortedPantryData)
    }catch(err){
        res.json(err)
    }
})

module.exports = router

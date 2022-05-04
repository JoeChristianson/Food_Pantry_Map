const router = require('express').Router()
const {Pantry,Request} = require("../../models")
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// This gets the logged in users pantry data
router.get("/", async (req,res) => {
    try{
        console.log(req.session.pantryId)
        const results = await Pantry.findByPk(req.session.pantryId,{
            include:[{model:Request, where: {open: true}, required:false}]
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
            include:[{model:Request, where: {open: true}, required:false}]
        });
        res.json(results)
    }catch(err){
        res.status(500).json({message:'bad request1'})
    }
})

router.get("/search/:item",async(req,res)=>{
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

        res.json(pantries)
    }catch(err){
        res.json(err)
    }
})

module.exports = router

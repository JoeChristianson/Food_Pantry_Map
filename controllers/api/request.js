const router = require('express').Router()
const {Request} = require("../../models")

router.post("/", async (req,res) => {
    try{
        console.log(req.body);
        const newRequest = await Request.create({
    
            product_name: req.body.productName,
            amount: req.body.amount,
            pantry_id: req.session.pantryId,
            open: true,
        })
        res.json(newRequest)
    }catch(err){
        res.status(500).json(err)
    }
})

router.put("/:id", async (req,res) => {
    try{
        console.log(req.body);
        const requestData = await Request.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        if (!requestData[0]){
            res.status(404).json({message: 'No request with this ID.'});
            return;
        }
        res.status(200).json(requestData);
    }catch (err) {
        res.status(500).json(err);
    }
})

router.get("/", async (req,res) => {
    try{
        const results = await Request.findAll({
            where: {
                open: true,
                pantry_id: req.session.pantryId,
            }
        });
        const requestData = results.dataValues;
        console.log(requestData)
        res.json(requestData)
    }catch(err){
        res.status(500).json({message:"bad request"})
    }
})

module.exports = router;
const router = require('express').Router()
const {Request} = require("../../models")

router.post("/", async (req,res) => {
    try{
        console.log(req.body);
        const newRequest = await Request.create({
    
            product_name: req.body.productName,
            amount: req.body.amount

        })
    }catch{

    }
})

module.exports = router;
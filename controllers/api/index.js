const router = require('express').Router();
const userRoutes = require("./user")
const requestRoutes = require("./request")
const pantryRoutes = require("./pantry")

router.use("/user",userRoutes)
router.use("/request",requestRoutes)
router.use("/pantry",pantryRoutes)

module.exports = router;
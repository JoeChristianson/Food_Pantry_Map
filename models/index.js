const User = require("./User.js");
const Pantry = require("./Pantry");
const Request = require("./Request");

Pantry.belongsTo(User,{
    foreignKey: "user_id",
});

User.hasOne(Pantry, {
    foreignKey: "user_id",
});

Pantry.hasMany(Request, {
    foreignKey: "pantry_id",
});

Request.belongsTo(Pantry, {
    foreignKey: "pantry_id",
});



module.exports = {User, Pantry, Request};
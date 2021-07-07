const bcrypt = require("bcryptjs");

exports.seed = function(knex) {
  // Deletes ALL existing entries


  const users = [
    {
      username: "chung", 
      password:  bcrypt.hashSync("Pa5swordIs5ecure", 10), 
      role: 1,
    }, 
    {
      username: "Biggie_Chung", 
      password:  bcrypt.hashSync("Pa5swordIs5ecure", 12), 
      role: 1,
    }, 
    {
      username: "LLCool_chung", 
      password:  bcrypt.hashSync("Pa5swordIs5ecure", 12), 
      role: 2,
    }, 
    {
      username: "Pulga", 
      password:  bcrypt.hashSync("Pa5swordIs5ecure", 12),
    }
  ]
  return knex('users').insert(users)
};

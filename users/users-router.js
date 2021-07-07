const router = require("express").Router();

const Users = require("./users-model.js");

const { restricted } = require('../middleware/global-middleware'); 

router.use(restricted); 

router.get("/", (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

module.exports = router;

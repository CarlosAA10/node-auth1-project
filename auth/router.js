const bcryptjs = require('bcryptjs'); 

const router = require('express').Router(); 

const Users = require('../users/users-model'); 

router.post('/register', (req,res) => {
    const credentials = req.body; 

    if(isValid(credentials)) {
        // hash the password
        const rounds = process.env.BCRYPT_ROUNDS || 12; 

        const hash = bcryptjs.hashSync(credentials.password, rounds); 
        credentials.password = hash; 

        Users.add(credentials)
        .then(user => {
            req.session.loggedIn === true; 
            res.status(201).json({data: user})
        })
        .catch(err => {
           console.log(err)
           res.status(500).json({ error: err.message})
        })

    }
    else {
        res.status(400).json({ message: 'please provide username and pasword'})
    }
 
    // save the user to the database 

}); 

router.post('/login', (req,res) => {
    const { username, password } = req.body; 

    if(isValid(req.body)) {

        Users.findBy({ username })
        .then(([user]) => {
            // compare the password and the has store din the db
            if(user && bcryptjs.compareSync(password, user.password)) {
                // we can save information about the client inside the session (req.session)
                req.session.loggedIn = true; 
                req.session.user = user; 

                res.status(200).json({ message: 'Welcome to our API'})
            } else {
                res.status(401).json({ message: 'Invalid credentials'})
            }
        })
        .catch(err => {
            console.log(err); 
            res.status(500).json({ message: err.message })
        })

    }
    else {
        res.status(400).json({ message: 'please provide username and pasword'})
    }
 
    // save the user to the database 
})

router.get('/logout', (req,res) => {
    if (req.session) {
        req.session.destroy(err => {
            if(err) {
                res.status(500).json({message: "we could not log you out, try again at a later time"})
            }
            else {
                res.status(204).end(); 
            }
        })
    }
    else {
        res.status(204).end(); 
    }
})

function isValid(user) {
    return Boolean(user.username && user.password && typeof user.password === "string"); 
}

module.exports = router; 
const express = require('express'); 
const helmet = require('helmet'); 
const cors = require("cors"); 
const session = require('express-session'); 

const authRouter = require('../auth/router'); 
const usersRouter = require('../users/users-router'); 

const server = express(); 

const sessionConfig = {
    cookie: {
        maxAge: 1000 * 60 * 60, 
        secure: process.env.SECURE_COOKIE || false, // send the cookie only over https, true in production
        httpOnly: true , // true means client JS cannot access the cookie
    }, 
    resave: false, 
    saveUnitialized: process.env.USER_ALLOWED_COOKIES || true, // true during development
    name: 'Chungus', 
    secret: process.env.COOKIE_SECRET || 'thisissecretenough', 
}
// creat a session and send a cookie back (the cookie will store the session id)

server.use(helmet()); 
server.use(express.json()); 
server.use(cors()); 
server.use(session(sessionConfig)); 

server.use('/api/auth', authRouter); 
server.use('/api/users', usersRouter); 

server.get('/', (req,res) => {
    res.json({ api: "up and running"})
})

module.exports = server; 

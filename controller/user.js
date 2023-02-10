const User = require('../models/user');
const { v4: uuidv4 } = require('uuid');
const { setUser, getUser} = require('../services/auth');

async function handleUserSignup(req, res) {
    const { name, email, password } = req.body;
    await User.create({
        name: name,
        email: email,
        password: password
    });

    res.redirect('/');
}

async function handleUserLogin(req, res) {
    const {  email, password } = req.body;
    const user = await User.findOne({ email: email, password: password });
    // console.log(user);
    if (!user) {
        console.log("User not found");
        return res.render('login');
    } 

    // const sessionId = uuidv4();
    const token=setUser(user);
    // const usr = getUser(sessionId);
    // console.log(usr);
    res.cookie("uid", token);
    res.redirect('/');

}


module.exports = { handleUserSignup ,handleUserLogin};
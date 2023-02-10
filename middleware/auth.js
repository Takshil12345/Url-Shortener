const { getUser,setUser} = require('../services/auth');

async function restrictLoggedInUser(req, res, next) {
    // console.log(req);
    const userId = req.cookies?.uid;

    if (!userId) return res.redirect('/login');

    // console.log(userId);
  const user = getUser(userId);
  console.log(user);
    // console.log(user);

    if (!user) return res.redirect('/login');

    req.user = user;
    // console.log(user);
    next();
}

async function checkAuth(req, res, next) {
  // console.log(req);
  const userId = req.cookies?.uid;

  // console.log(userId);
  const user = getUser(userId);
  // console.log(user);

//   if (!user) return res.redirect('/login');

  req.user = user;
  // console.log(user);
  next();
}

module.exports = { restrictLoggedInUser,checkAuth };
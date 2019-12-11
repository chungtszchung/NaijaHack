const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const { token } = req.cookies;
    console.log(`Token gotten successfully ${token}`);
    console.log(process.env.jwtSecret);
    const decoded = jwt.verify(token, process.env.jwtSecret);
    console.log(`Token decoded user data is ${decoded.matric_no}`);
    req.profile = decoded;
  }catch(err){
    console.log(err)
    return res.status(401).json({
        message: 'Auth failed'
    })
  }
  next();
}

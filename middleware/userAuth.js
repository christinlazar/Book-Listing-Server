const jwt = require('jsonwebtoken')
const userAuth = async (req,res,next) =>{
    try {
        console.log("reached ehreeeeee")
        const token = req.headers.authorization.split(' ')[1]
                console.log("tok",token)
        if(!token){
            return res.status(401).json({token:false})
        }
        const secKey = process.env.JWT_SECRET_KEY
        console.log("seckey",secKey)
        const isverified =  jwt.verify(token,secKey)
       console.log("isverified",isverified)
        if(isverified){
            next()
        }else{
            return res.status(401).json({success:false,authorized:false})
        }
    } catch (error) {
        return res.status(401).json({success:false,authorized:false})
        console.error(error)
    }
}

module.exports = userAuth
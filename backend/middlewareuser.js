const jwt=require('jsonwebtoken');
const authMiddleware=(req,res,next)=>{
    const authHeader=req.headers.authorization;
    if (!authHeader||!authHeader.startsWith('Bearer ')) {
        return res.status(411).json({
            message:"not a perfect token"
        });
    }
    const token=authHeader.split(" ")[1];

    try {
        const decode=jwt.verify(token,process.env.JWTSCR);
        if (decode) {
             req.userId=decode.userId;
        next();
        return;
        }
        res.status(403).json({
            message:'something is wrong'
        })
      
    } catch (error) {

        res.status(403).json({
            error
        })
    }

}

module.exports={authMiddleware};
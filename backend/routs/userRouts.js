const userRouter=require('express').Router();
const jwt=require('jsonwebtoken');
const zod=require('zod');
const UserModel = require('../schema/userSchema');
const { authMiddleware } = require('../middlewareuser');

const signupSchema=zod.object({
    firstname:zod.string(),
    lastname:zod.string(),
    email:zod.string(),
    password:zod.string()

})
userRouter.post('/signup',async(req,res)=>{
try {
    const bodydata=req.body;
    const {success}=signupSchema.safeParse(req.body);
    
    if (!success) {
        console.log(success);
        
        return res.status(411).json({
            message:'Incorrect inputs'
        })
    }
            console.log(req.body);

    const user=await UserModel.findOne({
       email:bodydata.email
    })


    if(user){
        return res.status(411).json({
            message:'email already exists'
        })
    }
        // console.log('hi');

    const dbuser=new UserModel(bodydata);
    await dbuser.save();
    const token=jwt.sign({
        userId:dbuser._id
    },process.env.JWTSCR);
        // console.log("dbuser");

    res.status(200).json({
        message:'user resistered succsessfully',
        token:token
    });
    
} catch (error) {
    res.status(500).json({
        error
    })
}
});
userRouter.post('/signin',async(req,res)=>{
try {
    const body=req.body;
 const isuser =await UserModel.findOne({
    email:body.email
 })
 if(!isuser){
     return res.status(411).json({
            message:'please signup'
        })
 }
 if (isuser.password!=body.password) {
     return res.status(411).json({
            message:'wrong password'
        })
 }
 const token=jwt.sign({
        userId:isuser._id
    },process.env.JWTSCR);
    res.status(200).json({
        message:'user login succsessfully',
        token:token
    });
    
} catch (error) {
    res.status(500).json({
        error
    })
}
});

userRouter.put('/update',async(req,res)=>{

try {
    
const updateSchema=zod.object({
    firstname:zod.string().optional,
    lastname:zod.string().optional,
    email:zod.string().optional,
    
})
const userdata=req.body;
const {success}= updateSchema.safeParse(userdata);
  if (!success) {
        return res.status(411).json({
            message:'Incorrect inputs'
        })
    }
    await UserModel.updateOne(req.body,{
        _id:req.userId
    })
    res.status(200).json({
        message:'user updated succsessfully'
    })
} catch (error) {
    res.status(500).json({
        error
    })
}
});
userRouter.get('/userinfo',authMiddleware,async function (req,res) {
    try {
        const user=await UserModel.findOne({
            _id:req.userId
        })
        console.log(user);
        
        if (!user) {
            return res.status(411).json({
              message:'please cheak youhave  login or not'
            });
        }
        res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({
        error
    })
    }
})
userRouter.get('/bulk',authMiddleware,async(req,res)=>{
    try {
const userQueries = req.query.userquaries || ""; // Default search term if none provided

    const users = await UserModel.find({
      $or: [
        { firstname: { "$regex": userQueries, "$options": "i" } }, // Case-insensitive search
        { lastname: { "$regex": userQueries, "$options": "i" } }
      ]
    });

    res.status(200).json({
      users: users.map(user => ({
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        _id: user._id
      }))
    });
    } catch (error) {
       res.status(500).json({
        error
    }) 
    }
})
module.exports=userRouter;
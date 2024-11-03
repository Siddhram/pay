const mongoose = require('mongoose');
const { authMiddleware } = require('../middlewareuser');
const AccountModel = require('../schema/AccountSchema');
const UserModel = require('../schema/userSchema');

const paymentRouter=require('express').Router();

paymentRouter.post('/recharge',authMiddleware,async (req,res) => {
   try {
   const { balance } = req.body;
        const userId = req.userId ;

        // Validate and parse balance
        const balanceInt = parseInt(balance, 10);
        if (isNaN(balanceInt) || balanceInt < 0) {
            return res.status(400).json({ error: "Balance must be a non-negative integer." });
        }
        console.log(userId);
        

        // Check if the user's account already exists
        let userAccount = await AccountModel.findOne({ userId });

        if (userAccount) {
            // Update the existing balance
            userAccount.balance += balanceInt;
            await userAccount.save();
        } else {
            // Create a new account document
            userAccount = new AccountModel({
                userId,
                balance: balanceInt
            });
            await userAccount.save();
        }

        // Populate user details for userId reference
        await userAccount.populate('userId', 'firstname lastname email');

        console.log(userAccount);
        res.status(200).json(userAccount);
   } catch (error) {
    console.log();
    
    res.status(200).json({
        error
    })
   } 
});
paymentRouter.get('/balance',authMiddleware,async(req,res)=>{
    try {
        const userAccount=await AccountModel.findOne({
            userId:req.userId
        });
        //    await userAccount.populate('userId', 'firstname lastname email');
        console.log(req.userId+" "+userAccount);
        
        res.status(200).json(userAccount)
    } catch (error) {
        res.status(200).json({
        error
    })
    }
});
paymentRouter.post('/transfer',authMiddleware,async(req,res)=>{
    const session=await mongoose.startSession();
    session.startTransaction();
    try {
                // console.log('hello');

        
        const{friendId,amount}=req.body;
                // console.log(req.userId);
if (amount<0) {
    return res.status(200).json({
            message:'Balance cannot be negative'
        });
}
        const useraccount=await AccountModel.findOne({
            userId:req.userId
        }).session(session);
        console.log(req.userId);
        

      if(!useraccount||useraccount.balance<amount){
        await session.abortTransaction();
                    session.endSession();

        return res.status(200).json({
            message:'Insufficiient balance'
        });
      }
            //   console.log('hello');

      const friendaccount=await UserModel.findOne({
        _id:friendId
      }).session(session);
      console.log(friendaccount);
      
      if (!friendaccount) {
       await session.abortTransaction();
            session.endSession();

        return res.status(200).json({
            message:'Not Active Account'
        })
      }
       await AccountModel.updateOne({userId:req.userId},{$inc:{balance:-amount}}).session(session);
       await AccountModel.updateOne({userId:friendId},{$inc:{balance:amount}}).session(session);
       await session.commitTransaction();
      res.status(200).json({
        message:'succesful payment'
      });

        
    } catch (error) {
        
        res.status(500).json({
            error
        })
    }
})
paymentRouter.get('/history',authMiddleware,async(req,res)=>{
    try {
       const detail=await AccountModel.find({
        userId:req.userId
       });
       if (!detail) {
        return res.status(400).json({
            message:'No Transitions'
        });
       }
       res.status(200).json({
        history:detail
       }); 
    } catch (error) {
         res.status(500).json({
            error
        })
    }
})
module.exports=paymentRouter;
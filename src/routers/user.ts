import { Router } from "express";
import { authenticateUserJwtAdmin, authenticateUserJwtUser } from "../middleware";
import { PrismaClient } from "@prisma/client";

const router = Router() ; 
const prismaClient = new PrismaClient

// get user details (admin only or authenticated user)
router.get("/users/:id" ,authenticateUserJwtAdmin , async(req , res)=>{
    
    const id = req.params.id ; 

    try{

        const user = await prismaClient.user.findFirst({
            where: {id: parseInt(id, 10)}
            
        })
        res.status(200).json(user); 
    }catch(err){
        res.status(400).json({message: "unable to get user details"}) 
    }
}) 

router.get("/users" , authenticateUserJwtUser , async(req , res)=>{

    const userId  = req.headers.userId;
    if(typeof(userId) == 'number'){
        try{
        
            const user = await prismaClient.user.findFirst({
                where: {id: userId}
            })
            res.status(200).json(user); 
        }catch(err){
            res.status(400).json({message : "unable to get user details"}); 
        }
    }else{
        res.status(500).json({message: "unable to get user details if else"})
    }
        
    

    
})


// update user details 
router.patch("/users/:id" ,authenticateUserJwtUser , async(req , res)=>{
    const userId = req.headers.userId ;

    try{
        
    }catch(err){
        res.status(400).json("unable to update user details") ;
    }
})


export default router ; 
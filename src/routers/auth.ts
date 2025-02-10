import { Router } from "express";
import { PrismaClient  } from '@prisma/client'
import jwt from 'jsonwebtoken' ;

import { JWT_SECRET_CREATOR , JWT_SECRET_ADMIN } from "../config";

const userSecret = JWT_SECRET_CREATOR ;
const adminSecret = JWT_SECRET_ADMIN ; 

const prismaClient = new PrismaClient() ; 

const router = Router() ; 


router.post('/register' , async(req , res)=>{

    const {name , email , password} = req.body ; 
    
    const existingUser = await prismaClient.user.findFirst({
        where:{
            email
        }
    })

    if(existingUser){
        res.status(403).json({message: "user already exist"})
    }else{

        try{

            const user = await prismaClient.user.create({
                data: {
                     name , 
                    email , 
                    passwordHash : password , 
                }
            })
            
            const token = jwt.sign(
                {
                    userId : user.id
                } , 
                
                userSecret
            )

            res.status(201).json({
                token ,userId: user.id , message : "user create successfully"
            })
        }catch(err){
            res.status(550).json({error : "failed to register user" , details : err}) ; 
        }
    }
    
})

router.post('/login' , async(req , res)=>{

    const {email , password} = req.body ; 

    try{
        
        const user = await prismaClient.user.findFirst({
            where:{
                email : email , 
                passwordHash : password
            }
        })

        if(user){

            const token = jwt.sign({
                userId : user.id
            } , 

            userSecret
        )

        res.status(200).json({token , userId: user.id , message:"user logged successfully"})

        }else{
            res.status(401).json("wrong username or password");
        }

    }catch(err){
        res.status(550).json({error : "failed to login user" , details : err})
    }
})

router.post('/adminRegister' , async(req , res)=>{

    const {name , email , password} = req.body ; 
    
    const existingUser = await prismaClient.user.findFirst({
        where:{
            email
        }
    })

    if(existingUser){
        res.status(403).json({message: "ADMIN already exist"})
    }else{

        try{
            
            const user = await prismaClient.user.create({
                data: {
                    name : name , 
                    email : email , 
                    passwordHash : password , 
                    role : 'ADMIN' , 
                }
            })

            const token = jwt.sign(
                {
                    userId : user.id
                } , 
                
                adminSecret
            )

            res.status(201).json({
                token , userId: user.id ,  message : "Admin create successfully"
            })
        }catch(err){
            res.status(550).json({error : "failed to register admin" , details : err}) ; 
        }
    }
    
})

router.post('/adminLogin' , async(req , res)=>{

    const {email , password} = req.body ; 

    try{
        
        const user = await prismaClient.user.findFirst({
            where:{
                email : email , 
                passwordHash : password
            }
        })

        if(user){

            const token = jwt.sign({
                userId : user.id
            } , 

            adminSecret
        )

        res.status(200).json({token ,userId : user.id ,  message: "user logged successfully"})

        }else{
            res.status(401).json("wrong username or password");
        }

    }catch(err){
        res.status(550).json({error : "failed to login user" , details : err})
    }
})

export default router ; 
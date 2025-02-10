import { Request , Response , NextFunction } from "express";
import jwt from 'jsonwebtoken' ; 
import { JWT_SECRET_CREATOR , JWT_SECRET_ADMIN } from "../config";
const userSecret = JWT_SECRET_CREATOR ;
const adminSecret = JWT_SECRET_ADMIN ; 

export const authenticateUserJwtUser = (req:Request , res:Response , next: NextFunction)=>{

    const authHeader = req.headers.authorization; 
    
    if(authHeader){
        const token = authHeader.split(" ")[1]; 
        try{
            jwt.verify(token , userSecret , (err , payload)=>{
                
                if(err){
                    return res.status(403).json({message:"invalid token"}) ;
                }

                if(!payload){
                    return res.status(403).json({message: "null payload"}) ; 
                }

                if(typeof payload == 'string'){
                    return res.status(403).json({message: "payload is of type string"})
                }

                req.headers.userId = payload.userId ; 
                next() ; 
            })
        }catch(err){
            res.status(401).json({message: "invalid token"})
        }
       
        
    }else{
        res.status(401).json({message: "unauthorized"})
    }
}

export const authenticateUserJwtAdmin = (req: Request , res:Response , next: NextFunction)=>{

    const authHeader = req.headers.authorization ; 
    if(authHeader){
        const token = authHeader.split(" ")[1]; 
        try{
            jwt.verify(token , adminSecret , (err , payload)=>{

                if(err){
                    return res.status(403).json({message:"invalid token"}) ;
                }

                if(!payload){
                    return res.status(403).json({message: "null payload"}) ; 
                }

                if(typeof payload == 'string'){
                    return res.status(403).json({message: "payload is of type string"})
                }

                req.headers.userId = payload.userId ; 
                next(); 
            })
        }catch(err){
            res.status(401).json({message: "invalid token"})
        }
       
        
    }else{
        res.status(401).json({message: "unauthorized"})
    }
}
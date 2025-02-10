import { PrismaClient } from "@prisma/client";
import { Router } from "express";
const router = Router() ; 
const prismaClient = new PrismaClient ;

router.get("/collections/:id" , async(req , res)=>{

    const {id} = req.params ; 

    try{
        if(parseInt(id,10) == 9){
            const collections = await prismaClient.product.findMany() ; 
            res.status(200).json(collections) ; 
        }else{
            const collections = await prismaClient.product.findMany({
                where:{
                    categoryId : parseInt(id,10) 
                }
            })
    
            res.status(200).json(collections) ; 
        }
        
    }catch(error){
        res.status(400).json({message: "unable to fetch collections" , error}); 
    }
    
})

export default router
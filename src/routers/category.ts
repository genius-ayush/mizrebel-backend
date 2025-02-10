import { Router } from "express";
import { authenticateUserJwtAdmin , authenticateUserJwtUser } from "../middleware";
import { PrismaClient } from "@prisma/client";
const router = Router() ; 
const prismaClient = new PrismaClient ; 

// create a new category(admin)
router.post("/categories" ,authenticateUserJwtAdmin ,  async(req , res)=>{

    const {name} = req.body ;
    
    const existingName = await prismaClient.category.findFirst({
        where:{
            name : name
        }
    })

    if(existingName){
        res.status(403).json({message: "category already exist"})
    }else{
        try{
        
        
            const newCategory = await prismaClient.category.create({
                data:{
                    name
                }
            })
    
            res.status(201).json({newCategory , message:"new category create successfully"})
    
        }catch(err){
            res.status(550).json({message: "unable to create categories"})
        }
    }
    
})


// update a categorory(admin)
router.patch("/categories/:id" , authenticateUserJwtAdmin , async(req , res)=>{
    
    const { id } = req.params; 
    
    try{
        const {name} = req.body ; 
        const updatedCategory = await prismaClient.category.update({
            where:{
                 id: parseInt(id, 10)  
            } , 
            data : {
                name
            }

        })

        res.json(updatedCategory)
    }catch(err){
        res.status(400).json({message: "unable to edit category"})
    }
})


// delete a category(admin)
router.delete("/categories/:id" , authenticateUserJwtAdmin , async(req , res)=>{

    const id = req.params.id ; 

    try{
        await prismaClient.category.delete({
            where:{id: parseInt(id, 10)}
        })

        res.status(200).json({message: "category deleted successfully"})
    }catch(err){
        res.status(400).json({message : "unable to delete category"}) ;
    }

})

// get all categories
router.get("/categories" , async(req , res)=>{

    
    try{
        const categories = await prismaClient.category.findMany() ; 
        res.json(categories); 
    }catch(err){
        res.status(404).json({message : "unable to get categories" , err})
    }

})

export default router ; 
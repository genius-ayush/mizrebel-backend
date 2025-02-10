import { Router } from "express";
import { authenticateUserJwtAdmin } from "../middleware";
import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient ; 
const router = Router() ; 

// create a new product(admin only)
router.post("/products" , authenticateUserJwtAdmin ,  async(req ,res)=>{
    
    const prodData = req.body ;

    try{

        const newProd = await prismaClient.product.create({
            data: prodData
        })

        res.status(201).json({ message: "product create successfully" , newProd})
    }catch(error){
        res.status(400).json("unable to create product") ; 
    }
})

// update product details(admin only)
router.patch("/products/:id" , authenticateUserJwtAdmin ,  async(req ,res)=>{

    const {id} = req.params ; 
    try{
        const prodData = req.body ; 

        const  updatedProduct = await prismaClient.product.update({
            where:{id : parseInt(id , 10)} , 
            data: prodData
        })

        res.json(updatedProduct) ; 
    }catch(err){
        res.status(202).json("unable to edit product deatils")
    }
})

// delete product (admin only )
router.delete("/products/:id" , authenticateUserJwtAdmin ,  async(req , res)=>{
    const {id} = req.params ;

    try{
        await prismaClient.product.delete({
            where: {id : parseInt(id , 10)} 
        })
        res.json("deleted")
    }catch(err){
        res.status(202).json("unable to delete product") ; 
    }
})

// get a  list of products(pagination  , filtering , search)
router.get("/productsSearch" , (req , res)=>{

})

// get all products 
router.get("/products" , async(req , res)=>{

    try {
        const products = await prismaClient.product.findMany()
        res.json({products})
    } catch (error) {
        res.status(202).json("unable to get products") ; 
    }
})

// get a details of single product
router.get("/products/:id" , async(req , res)=>{
    const {id} = req.params ; 

    try {
        const product = await prismaClient.product.findFirst({
            where:{ id : parseInt(id , 10)}
        })
        res.json(product) ; 
    } catch (error) {
        res.status(202).json("unable to get the product details") ; 
    }
})



export default router ; 
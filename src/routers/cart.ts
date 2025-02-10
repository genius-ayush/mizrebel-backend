import { Router } from "express";
import { authenticateUserJwtUser } from "../middleware";
import { PrismaClient } from "@prisma/client";
const prismaClient = new PrismaClient ; 
const router = Router() ; 

//add to cart to authtnticate user cart
router.post("/cart" , authenticateUserJwtUser , async(req , res)=>{
    
    // const userId = req.headers.userId ; 
    // const {productId , quantity} = req.body ; 

    // try {
        
    //     const product = await prismaClient.product.findUnique({where:{id: productId}}) ; 
        
    //     if(!product){
    //         res.status(404).json({error:"product not found"}) ; 
    //     }

    //     if(typeof(product?.stock) == 'number' && product?.stock < quantity){
    //         res.status(400).json({error:"insuffecient product stock"})
    //     }

    //     if(typeof userId == 'number'){  
    //         let cart = await prismaClient.cart.findFirst({
    //             where:{userId} , 
    //             include:{
    //                 cartItems:{
    //                     include:{product:true}
    //                 }
    //             }
    //         })

    //         if(!cart){
    //             // cart = await prismaClient.cart.create({
    //             //     data:{userId}
    //             // })
    //         }
    //     }

        
        

    //     res.status(500).json("hello world")
    // } catch (error) {
    //     res.status(500).json({err : "failed to add the items to the cart" , details : error})
    // }
    
})


// update the quantity of an item in cart
router.patch("/cart/:cartItemId" , authenticateUserJwtUser , (req , res)=>{

})


// remove item from the cart
router.delete("/cart/:cartItemId" , authenticateUserJwtUser , (req , res)=>{

})

//get authenticated user's cart
router.get("/cart" ,authenticateUserJwtUser ,  (req , res)=>{

})

export default router ; 

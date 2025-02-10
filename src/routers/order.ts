import { Router } from "express";
import { authenticateUserJwtUser } from "../middleware";

const router = Router() ; 

//create a new order
router.post("/order" , authenticateUserJwtUser , (req , res)=>{
    
})


// get the details of specific order
router.get("/cart/:id" , authenticateUserJwtUser , (req , res)=>{

})

//get the list of order of  authenticated user
router.get("/orders" ,authenticateUserJwtUser ,  (req , res)=>{

})

export default router ; 

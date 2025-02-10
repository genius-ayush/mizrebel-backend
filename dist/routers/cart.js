"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middleware_1 = require("../middleware");
const client_1 = require("@prisma/client");
const prismaClient = new client_1.PrismaClient;
const router = (0, express_1.Router)();
//add to cart to authtnticate user cart
router.post("/cart", middleware_1.authenticateUserJwtUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
}));
// update the quantity of an item in cart
router.patch("/cart/:cartItemId", middleware_1.authenticateUserJwtUser, (req, res) => {
});
// remove item from the cart
router.delete("/cart/:cartItemId", middleware_1.authenticateUserJwtUser, (req, res) => {
});
//get authenticated user's cart
router.get("/cart", middleware_1.authenticateUserJwtUser, (req, res) => {
});
exports.default = router;

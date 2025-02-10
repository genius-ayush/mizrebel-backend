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
// create a new product(admin only)
router.post("/products", middleware_1.authenticateUserJwtAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const prodData = req.body;
    try {
        const newProd = yield prismaClient.product.create({
            data: prodData
        });
        res.status(201).json({ message: "product create successfully", newProd });
    }
    catch (error) {
        res.status(400).json("unable to create product");
    }
}));
// update product details(admin only)
router.patch("/products/:id", middleware_1.authenticateUserJwtAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const prodData = req.body;
        const updatedProduct = yield prismaClient.product.update({
            where: { id: parseInt(id, 10) },
            data: prodData
        });
        res.json(updatedProduct);
    }
    catch (err) {
        res.status(202).json("unable to edit product deatils");
    }
}));
// delete product (admin only )
router.delete("/products/:id", middleware_1.authenticateUserJwtAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield prismaClient.product.delete({
            where: { id: parseInt(id, 10) }
        });
        res.json("deleted");
    }
    catch (err) {
        res.status(202).json("unable to delete product");
    }
}));
// get a  list of products(pagination  , filtering , search)
router.get("/productsSearch", (req, res) => {
});
// get all products 
router.get("/products", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield prismaClient.product.findMany();
        res.json({ products });
    }
    catch (error) {
        res.status(202).json("unable to get products");
    }
}));
// get a details of single product
router.get("/products/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const product = yield prismaClient.product.findFirst({
            where: { id: parseInt(id, 10) }
        });
        res.json(product);
    }
    catch (error) {
        res.status(202).json("unable to get the product details");
    }
}));
exports.default = router;

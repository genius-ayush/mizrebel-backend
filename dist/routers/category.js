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
const router = (0, express_1.Router)();
const prismaClient = new client_1.PrismaClient;
// create a new category(admin)
router.post("/categories", middleware_1.authenticateUserJwtAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    const existingName = yield prismaClient.category.findFirst({
        where: {
            name: name
        }
    });
    if (existingName) {
        res.status(403).json({ message: "category already exist" });
    }
    else {
        try {
            const newCategory = yield prismaClient.category.create({
                data: {
                    name
                }
            });
            res.status(201).json({ newCategory, message: "new category create successfully" });
        }
        catch (err) {
            res.status(550).json({ message: "unable to create categories" });
        }
    }
}));
// update a categorory(admin)
router.patch("/categories/:id", middleware_1.authenticateUserJwtAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const { name } = req.body;
        const updatedCategory = yield prismaClient.category.update({
            where: {
                id: parseInt(id, 10)
            },
            data: {
                name
            }
        });
        res.json(updatedCategory);
    }
    catch (err) {
        res.status(400).json({ message: "unable to edit category" });
    }
}));
// delete a category(admin)
router.delete("/categories/:id", middleware_1.authenticateUserJwtAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        yield prismaClient.category.delete({
            where: { id: parseInt(id, 10) }
        });
        res.status(200).json({ message: "category deleted successfully" });
    }
    catch (err) {
        res.status(400).json({ message: "unable to delete category" });
    }
}));
// get all categories
router.get("/categories", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield prismaClient.category.findMany();
        res.json(categories);
    }
    catch (err) {
        res.status(404).json({ message: "unable to get categories", err });
    }
}));
exports.default = router;
